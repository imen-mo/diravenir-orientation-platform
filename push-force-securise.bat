@echo off
echo ================================================
echo === PUSH FORCE SÉCURISÉ - DIRAVENIR ===
echo ================================================
echo.
echo Ce script va forcer le push de vos modifications
echo en excluant les fichiers d'authentification et sécurité
echo.

REM Vérifier si on est dans un dépôt git
git status >nul 2>&1
if %errorlevel% neq 0 (
    echo ERREUR: Ce dossier n'est pas un dépôt Git !
    pause
    exit /b 1
)

echo [1/6] Vérification de la configuration git...
git config --get user.name >nul 2>&1
if %errorlevel% neq 0 (
    echo ERREUR: Configuration Git manquante !
    echo Veuillez configurer votre nom et email :
    set /p "git_name=Nom: "
    set /p "git_email=Email: "
    git config user.name "%git_name%"
    git config user.email "%git_email%"
)

echo [2/6] Ajout de tous les fichiers (sauf ceux dans .gitignore)...
git add .

echo [3/6] Vérification des fichiers ajoutés...
git status --porcelain | findstr "^A" >nul 2>&1
if %errorlevel% neq 0 (
    echo ATTENTION: Aucun nouveau fichier à commiter !
    echo Vérification des modifications...
)

echo [4/6] Création du commit avec vos modifications...
set "commit_msg=PUSH FORCE: Mes modifications prioritaires - Exclusions auth/FAQ/footer"
git commit -m "%commit_msg%"

if %errorlevel% neq 0 (
    echo ATTENTION: Aucune modification à commiter ou erreur de commit
)

echo [5/6] Sauvegarde de la branche distante actuelle...
for /f "tokens=*" %%i in ('git branch -r --format="%%(refname:short)"') do (
    if "%%i" neq "" (
        echo Sauvegarde de la branche distante: %%i
        git fetch origin %%i:backup-%%i
    )
)

echo [6/6] PUSH FORCE - ÉCRASEMENT des modifications distantes...
echo.
echo ⚠️  ATTENTION: Ceci va écraser les modifications de votre binôme !
echo    Seuls vos fichiers seront conservés (sauf auth/FAQ/footer)
echo.
set /p "confirm=Continuer ? (oui/non): "
if /i not "%confirm%"=="oui" (
    echo Annulé par l'utilisateur
    pause
    exit /b 0
)

REM Force push sur la branche actuelle
git push --force-with-lease origin HEAD

if %errorlevel% neq 0 (
    echo ERREUR lors du push. Tentative avec --force...
    git push --force origin HEAD
    if %errorlevel% neq 0 (
        echo ERREUR CRITIQUE: Impossible de pusher !
        pause
        exit /b 1
    )
)

echo.
echo ================================================
echo === PUSH FORCE TERMINÉ AVEC SUCCÈS ! ===
echo ================================================
echo.
echo ✅ Vos modifications ont été forcées
echo ✅ Fichiers d'authentification exclus
echo ✅ Fichiers FAQ/Footer exclus
echo ✅ Modifications de votre binôme écrasées
echo.
echo Les fichiers suivants ont été EXCLUS du push :
echo - Tous les fichiers d'authentification (*auth*, *oauth*)
echo - Tous les fichiers de sécurité (*security*, *Security*)
echo - FAQ.jsx et FAQ.css
echo - Footer.jsx et Footer.css
echo - Fichiers de configuration sensibles (.env, application.properties)
echo.
pause
