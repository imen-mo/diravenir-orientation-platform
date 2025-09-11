@echo off
echo ================================================
echo === TEST PUSH SÉCURISÉ - DRY RUN ===
echo ================================================
echo.

echo Ce script va simuler le push sans rien envoyer
echo pour vérifier que tout est correct
echo.

REM Vérifier si on est dans un dépôt git
git status >nul 2>&1
if %errorlevel% neq 0 (
    echo ERREUR: Ce dossier n'est pas un dépôt Git !
    pause
    exit /b 1
)

echo [1/4] Test d'ajout des fichiers (simulation)...
git add . --dry-run

echo.
echo [2/4] Vérification des fichiers qui seront exclus...
echo.
echo Fichiers d'authentification (DOIVENT être exclus) :
git status --ignored | findstr /i "auth"
git status --ignored | findstr /i "oauth"
git status --ignored | findstr /i "security"

echo.
echo Fichiers FAQ/Footer (DOIVENT être exclus) :
git status --ignored | findstr /i "faq"
git status --ignored | findstr /i "footer"

echo.
echo [3/4] Test de commit (simulation)...
git add .
git status --porcelain

echo.
echo [4/4] Fichiers qui seront inclus dans le commit :
git diff --cached --name-only

echo.
echo ================================================
echo === SIMULATION TERMINÉE ===
echo ================================================
echo.
echo Si vous voyez des fichiers d'auth/FAQ/footer dans la liste ci-dessus,
echo c'est qu'ils ne sont PAS correctement exclus !
echo.
echo Pour lancer le vrai push force, exécutez :
echo - push-force-securise.bat
echo - ou push-force-securise.ps1
echo.
pause
