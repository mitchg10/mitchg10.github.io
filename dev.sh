#!/bin/bash
# Build Jekyll site and serve with CORS-enabled server

echo "Building Jekyll site..."
bundle exec jekyll build

echo ""
echo "Starting server with CORS support..."
echo "Site will be available at http://localhost:4000"
echo ""
cd _site
python3 ../serve.py
