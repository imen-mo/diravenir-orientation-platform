@echo off
echo ========================================
echo   DIRAVENIR - DEMARRAGE SIMPLE
echo ========================================
echo.

cd frontend

echo Demarrage de l'application React/Vite...
echo.

REM Demarrer sur le port 5173 (port Vite par defaut)
echo URL d'acces: http://localhost:5173
echo.

REM Demarrer Vite
npm run dev

pause
