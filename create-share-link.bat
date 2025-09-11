@echo off
echo ========================================
echo    Creation de Lien de Partage
echo    DIRAVENIR ORIENTATION SYSTEM
echo ========================================
echo.

set ZIP_FILE=diravenir_database_share.zip
set SHARE_DIR=shared_database_remote

echo [1/3] Verification de l'archive...
if not exist "%ZIP_FILE%" (
    echo ERREUR: Archive %ZIP_FILE% non trouvee
    echo Executez d'abord share-database-remote.bat
    pause
    exit /b 1
)

echo [2/3] Affichage des informations de partage...
echo.
echo ========================================
echo    INFORMATIONS DE PARTAGE
echo ========================================
echo.
echo Fichier a partager: %ZIP_FILE%
for %%A in ("%ZIP_FILE%") do echo Taille: %%~zA octets
echo.
echo METHODES DE PARTAGE RECOMMANDEES:
echo.
echo 1. GOOGLE DRIVE (Recommandé):
echo    - Allez sur https://drive.google.com
echo    - Cliquez sur "Nouveau" puis "Téléchargement de fichiers"
echo    - Sélectionnez %ZIP_FILE%
echo    - Clic droit sur le fichier → "Obtenir le lien"
echo    - Partagez le lien avec votre binome
echo.
echo 2. WE TRANSFER (Simple):
echo    - Allez sur https://wetransfer.com
echo    - Glissez-déposez %ZIP_FILE%
echo    - Entrez l'email de votre binome
echo    - Cliquez sur "Transférer"
echo.
echo 3. ONE DRIVE (Microsoft):
echo    - Allez sur https://onedrive.live.com
echo    - Uploadez %ZIP_FILE%
echo    - Clic droit → "Partager"
echo.
echo 4. DROPBOX:
echo    - Uploadez sur https://dropbox.com
echo    - Clic droit → "Partager"
echo.

echo [3/3] Ouverture des options de partage...
echo.
echo Voulez-vous ouvrir une option de partage? (O/N)
set /p choice="Votre choix: "

if /i "%choice%"=="O" (
    echo.
    echo Quelle option voulez-vous ouvrir?
    echo 1. Google Drive
    echo 2. WeTransfer
    echo 3. OneDrive
    echo 4. Dropbox
    echo 5. Annuler
    echo.
    set /p option="Votre choix (1-5): "
    
    if "%option%"=="1" start https://drive.google.com
    if "%option%"=="2" start https://wetransfer.com
    if "%option%"=="3" start https://onedrive.live.com
    if "%option%"=="4" start https://dropbox.com
)

echo.
echo ========================================
echo    MESSAGE POUR VOTRE BINOME
echo ========================================
echo.
echo Copiez ce message et envoyez-le a votre binome:
echo.
echo 📊 Base de donnees DIRAVENIR prete!
echo.
echo 🔗 Lien de telechargement: [COLLEZ VOTRE LIEN ICI]
echo 📁 Fichier: diravenir_database_share.zip
echo 📋 Instructions: README_BINOME_DISTANT.md
echo.
echo ✅ Apres installation:
echo - Backend: http://localhost:8080
echo - Frontend: http://localhost:3000
echo.
echo ❓ Besoin d'aide? Contactez-moi!
echo.
echo ========================================
echo.
pause
