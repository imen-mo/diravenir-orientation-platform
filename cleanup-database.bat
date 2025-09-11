@echo off
echo ========================================
echo 🧹 NETTOYAGE DE LA BASE DE DONNÉES DIRAVENIR
echo ========================================
echo.

echo ⚠️  ATTENTION: Ce script va supprimer TOUS les utilisateurs de test !
echo.
set /p confirm="Voulez-vous continuer ? (y/N): "
if /i not "%confirm%"=="y" (
    echo ❌ Nettoyage annulé.
    pause
    exit /b 0
)

echo.
echo 🔧 Arrêt du backend...
echo Appuyez sur Ctrl+C pour arrêter le backend si nécessaire
pause

echo.
echo 📋 Exécution du script de nettoyage...
mysql -u root -p diravenir < cleanup-test-users.sql
if %errorlevel% neq 0 (
    echo ❌ Erreur lors de l'exécution du script SQL
    echo Vérifiez vos credentials MySQL
    pause
    exit /b 1
)

echo.
echo ✅ Nettoyage terminé avec succès !
echo.

echo 🚀 Redémarrage du backend...
echo Dans un nouveau terminal, exécutez:
echo mvn spring-boot:run -Dspring-boot.run.profiles=dev
echo.

echo 📋 Pour tester:
echo 1. Ouvrir test-auth-endpoints.html
echo 2. Inscription avec un nouvel email
echo 3. Simulation de vérification
echo 4. Connexion
echo.

echo 🎉 Base de données nettoyée et prête pour les tests !
pause
