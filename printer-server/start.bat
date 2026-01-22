@echo off
REM POS Julia Print Server - Windows Startup Script
REM This script starts the WebSocket print server

echo ======================================
echo   POS Julia Print Server
echo ======================================
echo.

REM Check if vendor folder exists
if not exist "%~dp0vendor\" (
    echo [!] Dependencies not installed!
    echo [!] Please run: composer install
    echo.
    pause
    exit /b 1
)

REM Check if PHP is available
where php >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [!] PHP is not installed or not in PATH
    echo [!] Please install PHP and add it to your PATH
    echo.
    pause
    exit /b 1
)

echo [*] Starting print server...
echo [*] WebSocket URL: ws://localhost:9100
echo [*] Press Ctrl+C to stop the server
echo.

REM Start the server
php "%~dp0index.php" start

pause
