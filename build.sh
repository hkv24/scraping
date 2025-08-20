#!/bin/bash

# Install dependencies
npm install

# Set Puppeteer to skip downloading Chromium
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

echo "Build completed successfully"
