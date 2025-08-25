@echo off
echo ========================================
echo 🔍 VÉRIFICATION CONFIGURATION OAUTH2
echo ========================================
echo.

echo 📋 Vérification des fichiers de configuration...
echo.

echo 🔍 Fichier .env dans frontend...
if exist "frontend\.env" (
    echo ✅ Fichier .env trouvé
    echo 📝 Contenu du fichier .env :
    type "frontend\.env"
) else (
    echo ❌ Fichier .env NON TROUVÉ
    echo 💡 Renommez frontend\env-oauth2.txt en frontend\.env
)

echo.
echo 🔍 Configuration application.properties...
if exist "src\main\resources\application.properties" (
    echo ✅ application.properties trouvé
    echo 📝 Vérification des clés Google :
    findstr "GOOGLE_CLIENT_ID" "src\main\resources\application.properties"
    findstr "GOOGLE_CLIENT_SECRET" "src\main\resources\application.properties"
) else (
    echo ❌ application.properties non trouvé
)

echo.
echo 🔍 Composants OAuth2...
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
echo 🔍 Composants Frontend...
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
echo ========================================
echo 🎯 RÉSUMÉ DE LA CONFIGURATION
echo ========================================
echo.

echo 📋 FICHIERS À CONFIGURER :
echo 1. ✅ Renommer frontend\env-oauth2.txt → frontend\.env
echo 2. ✅ Configurer Google Console (voir GOOGLE_CONSOLE_SETUP.md)
echo 3. ✅ Vérifier les URIs de redirection dans Google Console
echo 4. ✅ Démarrer le backend : mvn spring-boot:run
echo 5. ✅ Démarrer le frontend : cd frontend && npm start
echo.

echo 🚀 PROCHAINES ÉTAPES :
echo 1. Suivez le guide GOOGLE_CONSOLE_SETUP.md
echo 2. Testez l'authentification sur http://localhost:3000/login
echo 3. Cliquez sur "Login with Google"
echo.

echo 📖 DOCUMENTATION :
echo - Guide Google Console : GOOGLE_CONSOLE_SETUP.md
echo - Guide OAuth2 : OAUTH2_IMPLEMENTATION_GUIDE.md
echo - Tests OAuth2 : OAUTH2_TEST_CONFIG.md
echo.

pause
