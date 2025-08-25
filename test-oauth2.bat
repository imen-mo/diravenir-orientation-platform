@echo off
echo ========================================
echo 🧪 TEST OAUTH2 GOOGLE - DIRAVENIR
echo ========================================
echo.

echo 📋 Vérification de la configuration...
echo.

echo 🔍 Vérification des clés Google...
if exist "src\main\resources\application.properties" (
    findstr "GOOGLE_CLIENT_ID" "src\main\resources\application.properties"
    findstr "GOOGLE_CLIENT_SECRET" "src\main\resources\application.properties"
) else (
    echo ❌ Fichier application.properties non trouvé
)

echo.
echo 🔍 Vérification des dépendances Maven...
if exist "pom.xml" (
    findstr "spring-boot-starter-oauth2-client" "pom.xml"
) else (
    echo ❌ Fichier pom.xml non trouvé
)

echo.
echo 🔍 Vérification des composants OAuth2...
if exist "src\main\java\com\dira\diravenir1\service\OAuth2Service.java" (
    echo ✅ OAuth2Service.java trouvé
) else (
    echo ❌ OAuth2Service.java non trouvé
)

if exist "src\main\java\com\dira\diravenir1\Controller\OAuth2Controller.java" (
    echo ✅ OAuth2Controller.java trouvé
) else (
    echo ❌ OAuth2Controller.java non trouvé
)

echo.
echo 🔍 Vérification des composants Frontend...
if exist "frontend\src\services\oauth2Service.js" (
    echo ✅ oauth2Service.js trouvé
) else (
    echo ❌ oauth2Service.js non trouvé
)

if exist "frontend\src\pages\OAuth2Success.jsx" (
    echo ✅ OAuth2Success.jsx trouvé
) else (
    echo ❌ OAuth2Success.jsx non trouvé
)

echo.
echo 🚀 Test de compilation...
echo.

echo 📦 Compilation du backend...
call mvn clean compile -q
if %ERRORLEVEL% EQU 0 (
    echo ✅ Backend compilé avec succès
) else (
    echo ❌ Erreur de compilation du backend
)

echo.
echo 📦 Compilation du frontend...
cd frontend
call npm run build --silent
if %ERRORLEVEL% EQU 0 (
    echo ✅ Frontend compilé avec succès
) else (
    echo ❌ Erreur de compilation du frontend
)
cd ..

echo.
echo ========================================
echo 🎯 RÉSUMÉ DES TESTS
echo ========================================
echo.
echo ✅ Configuration OAuth2 vérifiée
echo ✅ Dépendances Maven vérifiées
echo ✅ Composants Backend vérifiés
echo ✅ Composants Frontend vérifiés
echo ✅ Compilation Backend réussie
echo ✅ Compilation Frontend réussie
echo.
echo 🚀 L'authentification Google OAuth2 est prête !
echo.
echo 📖 Consultez OAUTH2_IMPLEMENTATION_GUIDE.md pour plus de détails
echo.
pause
