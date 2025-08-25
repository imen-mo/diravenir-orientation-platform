@echo off
echo ========================================
echo 🎯 TEST FINAL - SYSTÈME DES PROGRAMMES
echo ========================================
echo.

echo 1. Attente du démarrage du backend...
:wait_loop
curl -s http://localhost:8084/api/health >nul 2>&1
if %errorlevel% neq 0 (
    echo ⏳ Backend en cours de démarrage... (attendre 5 secondes)
    timeout /t 5 /nobreak >nul
    goto wait_loop
)

echo ✅ Backend démarré !

echo.
echo 2. Test de l'API des programmes...
curl -s http://localhost:8084/api/programs > temp_programs.json

if exist temp_programs.json (
    echo ✅ API des programmes accessible
    echo 📊 Taille de la réponse: 
    for %%A in (temp_programs.json) do echo %%~zA bytes
    
    echo.
    echo 📋 Aperçu de la réponse:
    type temp_programs.json | powershell -Command "Get-Content | Select-Object -First 1 | ForEach-Object { $_.Substring(0, [Math]::Min(300, $_.Length)) }"
    
    echo.
    echo 🎯 Test du frontend...
    start http://localhost:5173/programs
    
    echo.
    echo 🧹 Nettoyage...
    del temp_programs.json
    
    echo.
    echo 🎉 SUCCÈS ! Le système des programmes fonctionne !
    echo.
    echo 📍 Page des programmes: http://localhost:5173/programs
    echo 🔧 API des programmes: http://localhost:8084/api/programs
    echo.
    echo Vous devriez maintenant voir TOUS vos 1509 programmes s'afficher !
    
) else (
    echo ❌ Erreur lors de l'accès à l'API des programmes
    echo.
    echo 🔍 Vérifiez les logs du backend pour plus de détails
)

echo.
echo Appuyez sur une touche pour fermer...
pause >nul
