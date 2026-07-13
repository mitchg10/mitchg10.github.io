#!/usr/bin/env python3
"""
HTTP server with CORS headers and live reload for local Jekyll development.
Fixes font loading issues and auto-refreshes browser on file changes.
"""

import http.server
import json
import os
import socketserver
import threading
import time
from io import BytesIO
from pathlib import Path

WATCH_DIR = Path(__file__).parent / '_site'
PORT = 4000

_version = time.time()
_version_lock = threading.Lock()

LIVERELOAD_JS = (
    b'<script>(function(){'
    b'var v=null;'
    b'setInterval(function(){'
    b"fetch('/_livereload')"
    b'.then(function(r){return r.json();})'
    b'.then(function(d){if(v===null)v=d.v;else if(d.v!==v)location.reload();})'
    b'.catch(function(){});'
    b'},1000);'
    b'})();</script>'
)


def _scan_mtimes(directory):
    mtimes = {}
    try:
        for root, _, files in os.walk(directory):
            for name in files:
                path = os.path.join(root, name)
                try:
                    mtimes[path] = os.path.getmtime(path)
                except OSError:
                    pass
    except OSError:
        pass
    return mtimes


def watch_files():
    global _version
    prev = _scan_mtimes(WATCH_DIR)
    while True:
        time.sleep(0.5)
        curr = _scan_mtimes(WATCH_DIR)
        if curr != prev:
            with _version_lock:
                _version = time.time()
            prev = curr


class DevHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        if self.path == '/_livereload':
            self._serve_livereload()
            return
        super().do_GET()

    def _serve_livereload(self):
        with _version_lock:
            v = _version
        body = json.dumps({'v': v}).encode()
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', 'no-cache')
        self.end_headers()
        self.wfile.write(body)

    def send_head(self):
        path = self.translate_path(self.path)

        # Directory: handle redirect (no trailing slash) via parent,
        # otherwise look for index.html to inject into.
        if os.path.isdir(path):
            if not self.path.endswith('/'):
                return super().send_head()
            for index in ('index.html', 'index.htm'):
                candidate = os.path.join(path, index)
                if os.path.exists(candidate):
                    path = candidate
                    break
            else:
                return super().send_head()
        elif not os.path.isfile(path) and not path.endswith(('.html', '.htm')):
            # Mirror GitHub Pages: extensionless permalinks (e.g. /publication/foo)
            # resolve to foo.html on disk.
            candidate = path + '.html'
            if os.path.isfile(candidate):
                path = candidate

        if path.endswith(('.html', '.htm')) and os.path.isfile(path):
            try:
                with open(path, 'rb') as f:
                    content = f.read()
                idx = content.rfind(b'</body>')
                if idx != -1:
                    content = content[:idx] + LIVERELOAD_JS + content[idx:]
                self.send_response(200)
                self.send_header('Content-Type', 'text/html; charset=utf-8')
                self.send_header('Content-Length', str(len(content)))
                self.send_header('Last-Modified', self.date_time_string(os.path.getmtime(path)))
                self.send_header('Cache-Control', 'no-cache, must-revalidate')
                self.end_headers()
                return BytesIO(content)
            except OSError:
                pass

        return super().send_head()

    def log_message(self, format, *args):
        if args and '/_livereload' not in str(args[0]):
            super().log_message(format, *args)


if __name__ == '__main__':
    threading.Thread(target=watch_files, daemon=True).start()

    os.chdir(WATCH_DIR)
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(('127.0.0.1', PORT), DevHandler) as httpd:
        print(f'Serving at http://localhost:{PORT}')
        print('Live reload enabled — browser auto-refreshes on file changes')
        print('Press Ctrl+C to stop')
        httpd.serve_forever()
