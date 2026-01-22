#!/bin/bash
# POS Julia Print Server - Linux/Mac Startup Script
# This script starts the WebSocket print server

echo "======================================"
echo "  POS Julia Print Server"
echo "======================================"
echo ""

# Check if vendor folder exists
if [ ! -d "$(dirname "$0")/vendor" ]; then
    echo "[!] Dependencies not installed!"
    echo "[!] Please run: composer install"
    echo ""
    exit 1
fi

# Check if PHP is available
if ! command -v php &> /dev/null; then
    echo "[!] PHP is not installed or not in PATH"
    echo "[!] Please install PHP"
    echo ""
    exit 1
fi

echo "[*] Starting print server..."
echo "[*] WebSocket URL: ws://localhost:9100"
echo "[*] Press Ctrl+C to stop the server"
echo ""

# Start the server
php "$(dirname "$0")/index.php" start
