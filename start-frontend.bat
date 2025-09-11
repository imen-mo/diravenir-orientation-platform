@echo off
echo ========================================
echo   DIRAVENIR - DEMARRAGE FRONTEND
echo ========================================
echo.

cd frontend

echo Verification des ports disponibles...
echo.

REM Tester les ports 3000, 5173, 5174, 5175
set PORT_FOUND=0

echo Test du port 3000...
netstat -an | findstr ":3000" >nul
if %errorlevel% neq 0 (
    echo Port 3000 disponible
    set PORT=3000
    set PORT_FOUND=1
) else (
    echo Port 3000 occupe
)

if %PORT_FOUND%==0 (
    echo Test du port 5173...
    netstat -an | findstr ":5173" >nul
    if %errorlevel% neq 0 (
        echo Port 5173 disponible
        set PORT=5173
        set PORT_FOUND=1
    ) else (
        echo Port 5173 occupe
    )
)

if %PORT_FOUND%==0 (
    echo Test du port 5174...
    netstat -an | findstr ":5174" >nul
    if %errorlevel% neq 0 (
        echo Port 5174 disponible
        set PORT=5174
        set PORT_FOUND=1
    ) else (
        echo Port 5174 occupe
    )
)

if %PORT_FOUND%==0 (
    echo Test du port 5175...
    netstat -an | findstr ":5175" >nul
    if %errorlevel% neq 0 (
        echo Port 5175 disponible
        set PORT=5175
        set PORT_FOUND=1
    ) else (
        echo Port 5175 occupe
    )
)

if %PORT_FOUND%==0 (
    echo Aucun port disponible, utilisation du port par defaut
    set PORT=5173
)

echo.
echo ========================================
echo   DEMARRAGE SUR LE PORT %PORT%
echo ========================================
echo.

REM Creer un fichier .env.local avec le port
echo VITE_PORT=%PORT% > .env.local
echo VITE_API_URL=http://localhost:8084 >> .env.local

echo Configuration creee:
echo - Port frontend: %PORT%
echo - API backend: http://localhost:8084
echo.

echo Demarrage de l'application...
echo.
echo URL d'acces: http://localhost:%PORT%
echo.
echo Appuyez sur Ctrl+C pour arreter
echo.

REM Demarrer Vite avec le port specifique
npm run dev -- --port %PORT% --host

pause
