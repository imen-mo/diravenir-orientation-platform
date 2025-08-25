@echo off
echo ========================================
echo 🔐 TEST COMPLET OAUTH2 DIRAVENIR
echo ========================================
echo.

echo 📋 Vérification de la configuration...
echo.

echo 🔍 Vérification des variables d'environnement...
if defined GOOGLE_CLIENT_ID (
    echo ✅ GOOGLE_CLIENT_ID: %GOOGLE_CLIENT_ID%
) else (
    echo ❌ GOOGLE_CLIENT_ID: Non défini
)

if defined GOOGLE_CLIENT_SECRET (
    echo ✅ GOOGLE_CLIENT_SECRET: Configuré
) else (
    echo ❌ GOOGLE_CLIENT_SECRET: Non défini
)

echo.

echo 🌐 Test de connectivité backend...
echo Test de l'endpoint de santé...
curl -s -o nul -w "Status: %%{http_code}\n" http://localhost:8084/api/health
if %errorlevel% equ 0 (
    echo ✅ Backend accessible sur le port 8084
) else (
    echo ❌ Backend inaccessible sur le port 8084
    echo.
    echo 🔧 Solutions:
    echo 1. Démarrer le backend: mvn spring-boot:run
    echo 2. Vérifier le port 8084
    echo 3. Vérifier les logs Spring Boot
)

echo.

echo 🔐 Test de l'endpoint OAuth2...
echo Test de l'endpoint d'autorisation Google...
curl -s -o nul -w "Status: %%{http_code}\n" http://localhost:8084/oauth2/authorization/google
if %errorlevel% equ 0 (
    echo ✅ Endpoint OAuth2 accessible
) else (
    echo ❌ Endpoint OAuth2 inaccessible
)

echo.

echo 📱 Test de connectivité frontend...
echo Test de l'endpoint de santé depuis le frontend...
curl -s -o nul -w "Status: %%{http_code}\n" http://localhost:3000
if %errorlevel% equ 0 (
    echo ✅ Frontend accessible sur le port 3000
) else (
    echo ❌ Frontend inaccessible sur le port 3000
    echo.
    echo 🔧 Solutions:
    echo 1. Démarrer le frontend: npm run dev
    echo 2. Vérifier le port 3000
    echo 3. Vérifier les logs Vite
)

echo.

echo 🔍 Vérification des fichiers de configuration...
if exist "frontend\.env" (
    echo ✅ Fichier .env trouvé dans frontend/
) else (
    echo ❌ Fichier .env manquant dans frontend/
    echo.
    echo 🔧 Solution: Copier env.example vers .env
    echo cd frontend && copy env.example .env
)

if exist "src\main\resources\application.properties" (
    echo ✅ Fichier application.properties trouvé
) else (
    echo ❌ Fichier application.properties manquant
)

echo.

echo 📊 Résumé des tests...
echo.
echo ✅ Tests terminés
echo.
echo 🔧 Prochaines étapes:
echo 1. Vérifier que le backend est démarré sur le port 8084
echo 2. Vérifier que le frontend est démarré sur le port 3000
echo 3. Tester la connexion OAuth2 sur http://localhost:3000/login
echo 4. Utiliser le composant OAuth2ConnectivityTest pour plus de détails
echo.
echo 📚 Documentation: OAUTH2_TROUBLESHOOTING_GUIDE.md
echo.

pause
