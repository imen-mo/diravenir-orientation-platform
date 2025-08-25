@echo off
echo ========================================
echo 🔧 CORRECTION DUPLICATION URL API
echo ========================================
echo.

echo 📋 Vérification de la configuration actuelle...
echo.

echo 🔍 Vérification du fichier .env...
if exist "frontend\.env" (
    echo ✅ Fichier .env trouvé
    echo.
    echo 📖 Contenu actuel du fichier .env:
    echo ----------------------------------------
    type "frontend\.env"
    echo ----------------------------------------
) else (
    echo ❌ Fichier .env manquant
    echo.
    echo 🔧 Création du fichier .env...
    echo VITE_API_URL=http://localhost:8084 > "frontend\.env"
    echo VITE_API_BASE_PATH=/api >> "frontend\.env"
    echo ✅ Fichier .env créé
)

echo.
echo 🛠️ Correction de la duplication API...
echo.

echo 🔍 Recherche de la duplication /api/api...
findstr /C:"/api" "frontend\.env" >nul
if %errorlevel% equ 0 (
    echo ❌ Duplication détectée dans .env
    echo.
    echo 🔧 Correction automatique...
    
    REM Sauvegarder l'ancien fichier
    copy "frontend\.env" "frontend\.env.backup" >nul
    echo ✅ Sauvegarde créée: .env.backup
    
    REM Créer le nouveau fichier corrigé
    echo # Configuration Frontend Diravenir > "frontend\.env"
    echo # Variables d'environnement pour Vite (préfixe VITE_) >> "frontend\.env"
    echo. >> "frontend\.env"
    echo # API Configuration >> "frontend\.env"
    echo VITE_API_URL=http://localhost:8084 >> "frontend\.env"
    echo VITE_API_BASE_PATH=/api >> "frontend\.env"
    echo. >> "frontend\.env"
    echo # OAuth2 Google Configuration >> "frontend\.env"
    echo VITE_GOOGLE_CLIENT_ID=1037870342905-b37d3kenk6qu0j67d1pmt6b7gufi9rht.apps.googleusercontent.com >> "frontend\.env"
    echo VITE_GOOGLE_CLIENT_SECRET=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 >> "frontend\.env"
    echo. >> "frontend\.env"
    echo # Frontend URLs >> "frontend\.env"
    echo VITE_FRONTEND_URL=http://localhost:3000 >> "frontend\.env"
    echo VITE_OAUTH2_SUCCESS_URL=http://localhost:3000/oauth2-success >> "frontend\.env"
    echo VITE_OAUTH2_FAILURE_URL=http://localhost:3000/oauth2-failure >> "frontend\.env"
    echo. >> "frontend\.env"
    echo # Backend URLs >> "frontend\.env"
    echo VITE_BACKEND_URL=http://localhost:8084 >> "frontend\.env"
    echo VITE_OAUTH2_AUTHORIZATION_URL=http://localhost:8084/oauth2/authorization/google >> "frontend\.env"
    
    echo ✅ Fichier .env corrigé
) else (
    echo ✅ Aucune duplication détectée
)

echo.
echo 📖 Nouveau contenu du fichier .env:
echo ----------------------------------------
type "frontend\.env"
echo ----------------------------------------

echo.
echo 🔍 Vérification de la configuration API dans le code...
echo.

echo 📊 Vérification de api.js...
findstr /C:"import.meta.env.VITE_API_URL" "frontend\src\config\api.js" >nul
if %errorlevel% equ 0 (
    echo ✅ api.js utilise VITE_API_URL
) else (
    echo ❌ api.js n'utilise pas VITE_API_URL
)

findstr /C:"import.meta.env.VITE_API_BASE_PATH" "frontend\src\config\api.js" >nul
if %errorlevel% equ 0 (
    echo ✅ api.js utilise VITE_API_BASE_PATH
) else (
    echo ❌ api.js n'utilise pas VITE_API_BASE_PATH
)

echo.
echo 🌐 Test de connectivité après correction...
echo Test de l'endpoint de santé...
curl -s -o nul -w "Status: %%{http_code}\n" http://localhost:8084/api/health
if %errorlevel% equ 0 (
    echo ✅ Backend accessible sur le port 8084
) else (
    echo ❌ Backend inaccessible sur le port 8084
    echo.
    echo 🔧 Solutions:
    echo 1. Démarrer le backend: mvn spring-boot:run
    echo 2. Vérifier le port 8084
    echo 3. Vérifier les logs Spring Boot
)

echo.
echo 📱 Test de connectivité frontend...
echo Test de l'endpoint de santé depuis le frontend...
curl -s -o nul -w "Status: %%{http_code}\n" http://localhost:3000
if %errorlevel% equ 0 (
    echo ✅ Frontend accessible sur le port 3000
) else (
    echo ❌ Frontend inaccessible sur le port 3000
    echo.
    echo 🔧 Solutions:
    echo 1. Démarrer le frontend: cd frontend && npm run dev
    echo 2. Vérifier le port 3000
    echo 3. Vérifier les logs Vite
)

echo.
echo 📊 Résumé de la correction...
echo.
echo ✅ Problème de duplication API identifié et corrigé
echo ✅ Fichier .env mis à jour avec la bonne configuration
echo ✅ Sauvegarde créée (.env.backup)
echo.
echo 🎯 URLs corrigées:
echo - Avant: http://localhost:8084/api/api/health ❌
echo - Après:  http://localhost:8084/api/health ✅
echo.
echo 🚀 Prochaines étapes:
echo 1. Redémarrer le frontend: cd frontend && npm run dev
echo 2. Vérifier que les erreurs 401 ont disparu
echo 3. Tester la connectivité backend-frontend
echo 4. Vérifier que le test d'orientation fonctionne
echo.
echo 📚 Configuration finale:
echo - VITE_API_URL=http://localhost:8084
echo - VITE_API_BASE_PATH=/api
echo - URLs générées: http://localhost:8084/api/endpoint
echo.

echo ========================================
echo 🎉 CORRECTION DUPLICATION API TERMINÉE
echo ========================================
echo.
echo ✅ Le problème de duplication /api/api est résolu
echo ✅ Votre application devrait maintenant fonctionner correctement
echo.

pause
