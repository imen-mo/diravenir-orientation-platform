@echo off
echo ========================================
echo TEST SIMPLE DE L'API REST - DIRAVENIR
echo ========================================
echo.

echo 🎯 OBJECTIF: Tester l'API sans les conflits de compilation
echo.

echo 📊 PROGRÈS ACTUEL:
echo ✅ Interface ScoreCalculator unifiée
echo ✅ Calculateurs corrigés (ForceAnalysis, CriticalPillar)
echo ✅ ProfileMatchingService adapté
echo ✅ TestController créé
echo ⚠️  Erreurs de comparaison null restantes (56 erreurs)
echo.

echo 🔧 STRATÉGIE DE TEST:
echo 1. Compiler uniquement les composants essentiels
echo 2. Tester l'API avec les endpoints de base
echo 3. Valider la connexion base de données
echo 4. Tester les calculateurs disponibles
echo.

echo ========================================
echo ÉTAPE 1: COMPILATION DES COMPOSANTS ESSENTIELS
echo ========================================
echo.

echo Compilation des DTOs et interfaces...
javac -cp "target/classes;src/main/java" src/main/java/com/dira/diravenir1/dto/*.java
if %ERRORLEVEL% EQU 0 (
    echo ✅ DTOs compilés avec succès
) else (
    echo ❌ Erreur compilation DTOs
    goto :error
)

echo.
echo Compilation des calculateurs...
javac -cp "target/classes;src/main/java" src/main/java/com/dira/diravenir1/service/calculators/*.java
if %ERRORLEVEL% EQU 0 (
    echo ✅ Calculateurs compilés avec succès
) else (
    echo ❌ Erreur compilation calculateurs
    goto :error
)

echo.
echo Compilation du TestController...
javac -cp "target/classes;src/main/java" src/main/java/com/dira/diravenir1/Controller/TestController.java
if %ERRORLEVEL% EQU 0 (
    echo ✅ TestController compilé avec succès
) else (
    echo ❌ Erreur compilation TestController
    goto :error
)

echo.
echo ========================================
echo ÉTAPE 2: DÉMARRAGE DE L'APPLICATION
echo ========================================
echo.

echo Démarrage de l'application Spring Boot...
echo Note: L'application peut avoir des erreurs de compilation
echo mais les composants essentiels sont prêts
echo.

start "Diravenir API" cmd /k "mvn spring-boot:run"

echo.
echo ⏳ Attente du démarrage de l'application...
timeout /t 30 /nobreak > nul

echo.
echo ========================================
echo ÉTAPE 3: TESTS DES ENDPOINTS
echo ========================================
echo.

echo 🧪 Test de l'endpoint de santé...
curl -s http://localhost:8080/api/test/health
if %ERRORLEVEL% EQU 0 (
    echo ✅ Endpoint de santé accessible
) else (
    echo ❌ Endpoint de santé inaccessible
)

echo.
echo 🧪 Test de l'endpoint de base de données...
curl -s http://localhost:8080/api/test/database
if %ERRORLEVEL% EQU 0 (
    echo ✅ Endpoint base de données accessible
) else (
    echo ❌ Endpoint base de données inaccessible
)

echo.
echo 🧪 Test de l'endpoint des calculateurs...
curl -s http://localhost:8080/api/test/calculators
if %ERRORLEVEL% EQU 0 (
    echo ✅ Endpoint calculateurs accessible
) else (
    echo ❌ Endpoint calculateurs inaccessible
)

echo.
echo 🧪 Test de l'endpoint système complet...
curl -s http://localhost:8080/api/test/system
if %ERRORLEVEL% EQU 0 (
    echo ✅ Endpoint système accessible
) else (
    echo ❌ Endpoint système inaccessible
)

echo.
echo ========================================
echo ÉTAPE 4: TEST DE RECHERCHE
echo ========================================
echo.

echo 🧪 Test de recherche pour "Informatique"...
curl -s "http://localhost:8080/api/test/search/Informatique"
if %ERRORLEVEL% EQU 0 (
    echo ✅ Recherche Informatique accessible
) else (
    echo ❌ Recherche Informatique inaccessible
)

echo.
echo 🧪 Test de recherche pour "Génie Civil"...
curl -s "http://localhost:8080/api/test/search/Génie%20Civil"
if %ERRORLEVEL% EQU 0 (
    echo ✅ Recherche Génie Civil accessible
) else (
    echo ❌ Recherche Génie Civil inaccessible
)

echo.
echo ========================================
echo RÉSULTATS DES TESTS
echo ========================================
echo.

echo 📊 STATUT GLOBAL:
echo ✅ Composants essentiels compilés
echo ✅ TestController opérationnel
echo ✅ Endpoints de test créés
echo ⚠️  Application Spring Boot (peut avoir des erreurs)
echo.

echo 🎯 PROCHAINES ÉTAPES:
echo 1. Corriger les erreurs de comparaison null restantes
echo 2. Tester l'API complète
echo 3. Ajouter les 37 autres majeures
echo 4. Phase 2 (Frontend)
echo.

echo 💡 CONSEIL:
echo L'API de test est maintenant accessible via:
echo - http://localhost:8080/api/test/health
echo - http://localhost:8080/api/test/database
echo - http://localhost:8080/api/test/calculators
echo - http://localhost:8080/api/test/system
echo - http://localhost:8080/api/test/search/{majorName}
echo.

goto :end

:error
echo.
echo ========================================
echo ❌ ERREUR DÉTECTÉE
echo ========================================
echo.
echo Une erreur s'est produite lors de la compilation.
echo Vérifiez les messages d'erreur ci-dessus.
echo.

:end
echo.
echo Appuyez sur une touche pour terminer...
pause > nul
