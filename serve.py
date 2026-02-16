#!/usr/bin/env python3
"""
Simple HTTP server with CORS headers for local Jekyll development.
Fixes font loading issues by adding proper Access-Control-Allow-Origin headers.
"""

import http.server
import socketserver
from pathlib import Path

class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers for all responses
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

PORT = 4000
Handler = CORSRequestHandler

with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    print("Press Ctrl+C to stop")
    httpd.serve_forever()
