@echo off
echo ========================================
echo Test d'Import Excel - Diravenir
echo ========================================
echo.

echo 1. Test de connectivite backend...
curl -s http://localhost:8084/api/programs > nul
if %errorlevel% equ 0 (
    echo ✅ Backend accessible sur le port 8084
) else (
    echo ❌ Backend non accessible sur le port 8084
    echo    Verifiez que Spring Boot est demarre
    goto :end
)

echo.
echo 2. Test de l'endpoint d'import...
curl -s -X POST http://localhost:8084/api/programs/upload/import > nul
if %errorlevel% equ 0 (
    echo ✅ Endpoint d'import accessible
) else (
    echo ❌ Endpoint d'import non accessible
    echo    Verifiez la configuration du controller
)

echo.
echo 3. Test de la base de donnees...
curl -s http://localhost:8084/api/filieres > nul
if %errorlevel% equ 0 (
    echo ✅ Base de donnees accessible
) else (
    echo ❌ Base de donnees non accessible
    echo    Verifiez que MySQL est demarre et accessible
)

echo.
echo ========================================
echo Instructions de test:
echo ========================================
echo 1. Ouvrez l'AdminDashboard dans votre navigateur
echo 2. Cliquez sur "Lancer les Tests de Connectivite"
echo 3. Verifiez que tous les tests passent
echo 4. Téléchargez le template Excel
echo 5. Remplissez avec des données de test
echo 6. Importez le fichier
echo.
echo Si des erreurs persistent, consultez:
echo - DIAGNOSTIC_IMPORT_EXCEL.md
echo - Les logs du backend Spring Boot
echo - La console du navigateur (F12)
echo.

:end
pause
