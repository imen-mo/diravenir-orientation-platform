@echo off
echo 🌍 Démarrage du test du système de traduction DirAvenir
echo.

echo 📋 Vérification des fichiers de traduction...
if exist "src\translations\index.js" (
    echo ✅ Fichier de traductions trouvé
) else (
    echo ❌ Fichier de traductions manquant
    pause
    exit /b 1
)

echo.
echo 🔧 Vérification des composants...
if exist "src\components\LanguageSelector.jsx" (
    echo ✅ Sélecteur de langue trouvé
) else (
    echo ❌ Sélecteur de langue manquant
)

if exist "src\contexts\ThemeContext.jsx" (
    echo ✅ Contexte de thème trouvé
) else (
    echo ❌ Contexte de thème manquant
)

echo.
echo 📄 Ouverture du test de traduction...
start "" "test-translation-system.html"

echo.
echo 🚀 Démarrage du serveur de développement...
echo Appuyez sur Ctrl+C pour arrêter le serveur
echo.
npm run dev
