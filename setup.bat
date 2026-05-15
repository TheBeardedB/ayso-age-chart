@echo off
REM AYSO Age Chart - Setup Script for Windows

echo.
echo 🚀 Setting up AYSO Age Chart Application...
echo.

REM Check if Node.js is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    echo    Visit: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✅ Node.js version: %NODE_VERSION%

REM Check if npm is installed
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo ✅ npm version: %NPM_VERSION%
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if %errorlevel% equ 0 (
    echo.
    echo ✅ Setup complete!
    echo.
    echo To start the development server, run:
    echo   npm run dev
    echo.
    echo The application will be available at:
    echo   http://localhost:5173
) else (
    echo.
    echo ❌ Failed to install dependencies. Please check the error messages above.
    pause
    exit /b 1
)

pause
