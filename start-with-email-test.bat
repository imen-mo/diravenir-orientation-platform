@echo off
echo ========================================
echo   DIRAVENIR - DEMARRAGE AVEC TEST EMAIL
echo ========================================
echo.

echo 🔧 Configuration du mode email...
echo.

REM Vérifier si le mode email est défini
if "%EMAIL_MODE%"=="" (
    echo 📧 Mode email non défini, utilisation du mode MOCK par défaut
    set EMAIL_MODE=mock
)

if "%EMAIL_MODE%"=="mock" (
    echo 📧 Mode MOCK activé - Les emails seront affichés dans les logs
    echo 💡 Pour activer le mode RÉEL, définissez EMAIL_MODE=real
) else (
    echo 📧 Mode RÉEL activé - Les emails seront envoyés via SMTP
    echo ⚠️  Assurez-vous que la configuration SMTP est correcte
)

echo.
echo 🚀 Démarrage du backend...
echo.

REM Démarrer le backend
start "Backend DirAvenir" cmd /k "cd /d %~dp0 && mvnw spring-boot:run -Dspring-boot.run.profiles=dev"

echo ⏳ Attente du démarrage du backend (15 secondes)...
timeout /t 15 /nobreak > nul

echo.
echo 🌐 Démarrage du frontend...
echo.

REM Démarrer le frontend
start "Frontend DirAvenir" cmd /k "cd /d %~dp0\frontend && npm run dev"

echo.
echo ✅ Applications démarrées !
echo.
echo 📋 URLs disponibles :
echo   - Frontend: http://localhost:5173
echo   - Backend:  http://localhost:8084
echo   - Test Email: http://localhost:5173/test/email
echo   - API Health: http://localhost:8084/api/health
echo.
echo 📧 Mode email: %EMAIL_MODE%
echo.
echo 💡 Pour tester les emails :
echo   1. Visitez http://localhost:5173/test/email
echo   2. Entrez une adresse email de test
echo   3. Cliquez sur les boutons de test
echo   4. Vérifiez les logs du serveur pour voir les emails
echo.
echo 🔧 Pour changer le mode email :
echo   - Mode MOCK: set EMAIL_MODE=mock && restart
echo   - Mode RÉEL: set EMAIL_MODE=real && restart
echo.
pause
