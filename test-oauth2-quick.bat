@echo off
echo ========================================
echo    TEST RAPIDE OAUTH2 GOOGLE
echo ========================================
echo.

echo [1/3] Test de l'endpoint OAuth2...
curl -s -o nul -w "HTTP Status: %%{http_code}\n" http://localhost:8084/oauth2/authorization/google
echo.

echo [2/3] Test de l'endpoint de sante...
curl -s -o nul -w "HTTP Status: %%{http_code}\n" http://localhost:8084/api/health
echo.

echo [3/3] Verification des variables d'environnement...
if defined GOOGLE_CLIENT_ID (
    echo ✅ GOOGLE_CLIENT_ID: Configuree
) else (
    echo ❌ GOOGLE_CLIENT_ID: Non configuree
)

if defined GOOGLE_CLIENT_SECRET (
    echo ✅ GOOGLE_CLIENT_SECRET: Configuree
) else (
    echo ❌ GOOGLE_CLIENT_SECRET: Non configuree
)
echo.

echo ========================================
echo    CONFIGURATION REQUISE
echo ========================================
echo.
echo 1. Allez sur Google Cloud Console
echo 2. Dans Credentials > OAuth 2.0 Client IDs
echo 3. Ajoutez EXACTEMENT cette URI de redirection:
echo    http://localhost:8084/oauth2/authorization/google
echo 4. Ajoutez aussi:
echo    http://localhost:3000/oauth2-success
echo    http://localhost:3000/oauth2-failure
echo 5. Sauvegardez et testez
echo.
echo L'erreur redirect_uri_mismatch disparaitra
echo apres cette configuration.
echo.
pause
