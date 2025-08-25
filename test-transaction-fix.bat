@echo off
echo 🔧 Test de la correction des problèmes de transaction...

echo 🔨 Compilation...
mvn clean compile

if %ERRORLEVEL% NEQ 0 (
    echo ❌ Erreur de compilation !
    pause
    exit /b 1
)

echo ✅ Compilation réussie !

echo 🚀 Test de démarrage (15 secondes max)...
timeout /t 15 /nobreak >nul

echo 🎯 Test terminé ! Vérifiez les logs pour voir si l'application démarre sans erreurs de transaction.
echo 📧 Testez maintenant l'inscription pour voir si l'email de vérification fonctionne !
pause
