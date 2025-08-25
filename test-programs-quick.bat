@echo off
echo ========================================
echo 🧪 TEST RAPIDE DU SYSTÈME DES PROGRAMMES
echo ========================================
echo.

echo 1. Démarrage du backend...
start "Backend" cmd /k "mvn spring-boot:run"
timeout /t 10 /nobreak >nul

echo 2. Démarrage du frontend...
start "Frontend" cmd /k "cd frontend && npm run dev"
timeout /t 15 /nobreak >nul

echo 3. Ouverture du navigateur...
start http://localhost:5173/programs

echo.
echo ✅ Système démarré !
echo.
echo 📍 Page des programmes: http://localhost:5173/programs
echo 🔧 Admin dashboard: http://localhost:5173/admin
echo.
echo 🧪 Tests à effectuer:
echo - Vérifier que tous les programmes s'affichent
echo - Tester les filtres (All, Opened, Coming Soon, Saved)
echo - Tester la recherche
echo - Tester le tri
echo - Cliquer sur "Détails" d'une carte
echo - Tester le bouton "Favori"
echo.
echo Appuyez sur une touche pour fermer...
pause >nul
