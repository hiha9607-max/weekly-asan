@echo off
setlocal
cd /d "%~dp0"

echo ==========================================
echo Weekly Asan Upload
echo ==========================================
echo.

git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
  echo ERROR: Run this file from the project root.
  pause
  exit /b 1
)

set /p MSG=Commit message (Enter=default): 
if "%MSG%"=="" set "MSG=Update Weekly Asan content"

git add . || goto error
git commit -m "%MSG%" || goto error
git push origin main || goto error

echo.
echo Upload complete.
echo Wait 1-3 minutes, then refresh:
echo https://weekly-asan-app.vercel.app
pause
exit /b 0

:error
echo.
echo Upload failed.
pause
