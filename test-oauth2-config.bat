@echo off
echo ========================================
echo    TEST CONFIGURATION OAUTH2 GOOGLE
echo ========================================
echo.

echo [1/4] Verification des variables d'environnement...
if defined GOOGLE_CLIENT_ID (
    echo ✅ GOOGLE_CLIENT_ID: %GOOGLE_CLIENT_ID%
) else (
    echo ❌ GOOGLE_CLIENT_ID non definie
)

if defined GOOGLE_CLIENT_SECRET (
    echo ✅ GOOGLE_CLIENT_SECRET: [MASQUEE]
) else (
    echo ❌ GOOGLE_CLIENT_SECRET non definie
)
echo.

echo [2/4] Test de connexion a l'application...
curl -s -o nul -w "HTTP Status: %%{http_code}\n" http://localhost:8084/api/health
echo.

echo [3/4] Test endpoint OAuth2...
curl -s -o nul -w "HTTP Status: %%{http_code}\n" http://localhost:8084/oauth2/authorization/google
echo.

echo [4/4] Verification des logs OAuth2...
echo Recherche des erreurs OAuth2 dans les logs...
echo.

echo ========================================
echo    INSTRUCTIONS DE CONFIGURATION
echo ========================================
echo.
echo 1. Allez sur Google Cloud Console
echo 2. Configurez l'URI de redirection:
echo    http://localhost:8084/oauth2/authorization/google
echo 3. Ajoutez aussi:
echo    http://localhost:3000/oauth2-success
echo    http://localhost:3000/oauth2-failure
echo 4. Redemarrez l'application
echo 5. Testez la connexion Google
echo.
echo Pour plus de details, consultez:
echo GOOGLE_CONSOLE_OAUTH2_SETUP.md
echo.
pause
