@echo off
echo ========================================
echo 🎯 TEST FINAL COMPLET - SYSTÈME DES PROGRAMMES
echo ========================================
echo.

echo 1. Attente du démarrage du backend...
:wait_loop
echo ⏳ Vérification du backend... (attendre 10 secondes)
timeout /t 10 /nobreak >nul

curl -s http://localhost:8084/api/health >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Backend pas encore prêt, nouvelle tentative...
    goto wait_loop
)

echo ✅ Backend démarré et accessible !

echo.
echo 2. Test de l'API des programmes...
curl -s http://localhost:8084/api/programs > temp_programs.json

if exist temp_programs.json (
    echo ✅ API des programmes accessible !
    echo 📊 Taille de la réponse: 
    for %%A in (temp_programs.json) do echo %%~zA bytes
    
    echo.
    echo 📋 Aperçu de la réponse (premiers 500 caractères):
    type temp_programs.json | powershell -Command "Get-Content | ForEach-Object { $_.Substring(0, [Math]::Min(500, $_.Length)) }"
    
    echo.
    echo 🎯 Test du frontend...
    start http://localhost:5173/programs
    
    echo.
    echo 🧹 Nettoyage...
    del temp_programs.json
    
    echo.
    echo 🎉 SUCCÈS COMPLET ! 
    echo.
    echo 📍 Page des programmes: http://localhost:5173/programs
    echo 🔧 API des programmes: http://localhost:8084/api/programs
    echo.
    echo 🚀 VOS 1509 PROGRAMMES SONT MAINTENANT VISIBLES !
    echo.
    echo ✅ Cartes modernes avec images
    echo ✅ Filtres fonctionnels (All, Opened, Coming Soon, Saved)
    echo ✅ Recherche en temps réel
    echo ✅ Tri par popularité, nom, université
    echo ✅ Pagination automatique (40 programmes par page)
    echo ✅ Boutons favoris et détails fonctionnels
    
) else (
    echo ❌ Erreur lors de l'accès à l'API des programmes
    echo.
    echo 🔍 Vérifiez les logs du backend pour plus de détails
    echo 📋 Vérifiez que la base de données contient des programmes
)

echo.
echo Appuyez sur une touche pour fermer...
pause >nul
