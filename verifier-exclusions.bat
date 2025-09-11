@echo off
echo ================================================
echo === VÉRIFICATION DES EXCLUSIONS ===
echo ================================================
echo.

echo Vérification des fichiers qui seront EXCLUS du push...
echo.

echo [AUTHENTIFICATION] Fichiers d'auth détectés :
dir /s /b *auth*.jsx *auth*.js *auth*.java *auth*.css 2>nul
dir /s /b *oauth*.jsx *oauth*.js *oauth*.java *oauth*.css 2>nul
dir /s /b *Auth*.jsx *Auth*.js *Auth*.java *Auth*.css 2>nul
dir /s /b *OAuth*.jsx *OAuth*.js *OAuth*.java *OAuth*.css 2>nul

echo.
echo [SÉCURITÉ] Fichiers de sécurité détectés :
dir /s /b *Security*.java *security*.java 2>nul
dir /s /b *Jwt*.java *jwt*.java 2>nul

echo.
echo [FAQ/FOOTER] Fichiers FAQ et Footer détectés :
dir /s /b *FAQ*.jsx *FAQ*.css 2>nul
dir /s /b *Footer*.jsx *Footer*.css 2>nul

echo.
echo [CONFIGURATION] Fichiers de config sensibles :
dir /b .env* 2>nul
dir /s /b application*.properties 2>nul

echo.
echo [TESTS AUTH] Fichiers de test d'authentification :
dir /b test-*auth*.* 2>nul
dir /b test-*oauth*.* 2>nul

echo.
echo ================================================
echo === VÉRIFICATION TERMINÉE ===
echo ================================================
echo.
echo Ces fichiers seront EXCLUS du push grâce au .gitignore
echo.
pause
