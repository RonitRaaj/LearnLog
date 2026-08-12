@echo off
title Learn Log

echo.
echo ==========================================
echo             LEARN LOG
echo ==========================================
echo.
echo Starting backend...
echo.

start "Learn Log - Backend" cmd /k "cd /d "%~dp0backend" && npm run dev"

echo Waiting for backend to become ready...

:WAIT_BACKEND
powershell -Command "try { $c = New-Object Net.Sockets.TcpClient; $c.Connect('localhost',3000); $c.Close(); exit 0 } catch { exit 1 }"

if errorlevel 1 (
    timeout /t 1 /nobreak >nul
    goto WAIT_BACKEND
)

echo Backend is ready!
echo.
echo Starting frontend...
echo.

start "Learn Log - Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"

timeout /t 3 /nobreak >nul

echo.
echo ==========================================
echo        LEARN LOG IS LIVE!
echo ==========================================
echo.
echo Backend  : http://localhost:3000
echo Frontend : http://localhost:5173
echo.
echo Opening Learn Log...
echo ==========================================
echo.

start http://localhost:5173

pause