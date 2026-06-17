#!/bin/bash
# Build Jekyll site and serve with CORS support and live reload

echo "Building Jekyll site..."
bundle exec jekyll build --config _config.yml,_config.dev.yml

echo ""
echo "Starting live reload server at http://localhost:4000"
echo "Jekyll will watch for changes and rebuild automatically."
echo "Your browser will auto-refresh when files change."
echo "Press Ctrl+C to stop."
echo ""

# Run Jekyll in watch mode in the background
bundle exec jekyll build --watch --config _config.yml,_config.dev.yml &
JEKYLL_PID=$!

# Stop both processes on exit
trap "kill $JEKYLL_PID 2>/dev/null; exit" INT TERM

# Serve with live reload (blocks until Ctrl+C)
python3 serve.py

kill $JEKYLL_PID 2>/dev/null
