@echo off
echo ========================================
echo 🧪 TEST RAPIDE - SYSTÈME DES PROGRAMMES
echo ========================================
echo.

echo 1. Test de l'API des programmes...
curl -s http://localhost:8084/api/programs > temp_response.json

echo.
echo 2. Vérification de la réponse...
if exist temp_response.json (
    echo ✅ API accessible
    echo 📊 Taille de la réponse: 
    for %%A in (temp_response.json) do echo %%~zA bytes
    echo.
    echo 📋 Premiers caractères de la réponse:
    type temp_response.json | powershell -Command "Get-Content | Select-Object -First 1 | ForEach-Object { $_.Substring(0, [Math]::Min(200, $_.Length)) }"
) else (
    echo ❌ API non accessible
)

echo.
echo 3. Test du frontend...
start http://localhost:5173/programs

echo.
echo 4. Nettoyage...
if exist temp_response.json del temp_response.json

echo.
echo ✅ Test terminé !
echo.
echo 📍 Page des programmes: http://localhost:5173/programs
echo 🔧 API des programmes: http://localhost:8084/api/programs
echo.
echo Appuyez sur une touche pour fermer...
pause >nul
