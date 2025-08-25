@echo off
echo ========================================
echo 🔧 CRÉATION DU FICHIER .ENV
echo ========================================
echo.

echo 📝 Création du fichier .env dans frontend...
echo.

cd frontend

echo # Configuration Frontend Diravenir - OAuth2 Google > .env
echo # Ce fichier contient les variables d'environnement pour l'authentification Google >> .env
echo. >> .env
echo # API Configuration >> .env
echo VITE_API_URL=http://localhost:8084/api >> .env
echo. >> .env
echo # OAuth2 Google Configuration >> .env
echo VITE_GOOGLE_CLIENT_ID=1037870342905-b37d3kenk6qu0j67d1pmt6b7gufi9rht.apps.googleusercontent.com >> .env
echo VITE_GOOGLE_CLIENT_SECRET=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 >> .env
echo. >> .env
echo # Configuration de l'environnement >> .env
echo NODE_ENV=development >> .env
echo. >> .env
echo # Note: Les variables VITE_* sont accessibles côté client >> .env
echo # Les autres variables sont pour la configuration serveur >> .env

if exist ".env" (
    echo ✅ Fichier .env créé avec succès !
    echo 📝 Contenu du fichier .env :
    echo.
    type .env
) else (
    echo ❌ Erreur lors de la création du fichier .env
)

cd ..

echo.
echo ========================================
echo 🎯 PROCHAINES ÉTAPES
echo ========================================
echo.
echo 1. ✅ Fichier .env créé
echo 2. ✅ Erreur setLoading corrigée dans Register.jsx
echo 3. 🚀 Démarrer le backend : mvn spring-boot:run
echo 4. 🚀 Démarrer le frontend : cd frontend && npm run dev
echo 5. 🧪 Tester sur http://localhost:3000/register
echo.
pause
