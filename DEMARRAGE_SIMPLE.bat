@echo off
echo ========================================
echo    DEMARRAGE SIMPLE - Partage Base DIRAVENIR
echo ========================================
echo.

echo Ce script va vous guider pas a pas pour partager votre base de donnees.
echo.
echo VOTRE SITUATION:
echo - Vous avez une base 'diravenir' avec des donnees importantes
echo - Vous voulez la partager avec votre binome distant
echo - Vous voulez garder vos donnees en securite
echo.
echo.

echo ETAPE 1: Verification de MySQL
echo ================================
echo.
echo Testons si MySQL fonctionne...
mysql --version
if %errorlevel% neq 0 (
    echo.
    echo ERREUR: MySQL n'est pas installe ou pas dans le PATH
    echo.
    echo SOLUTIONS:
    echo 1. Installez MySQL si ce n'est pas fait
    echo 2. Ajoutez MySQL au PATH systeme
    echo 3. Redemarrez votre ordinateur
    echo.
    pause
    exit /b 1
) else (
    echo ✓ MySQL est installe et accessible
)

echo.
echo ETAPE 2: Test de connexion a votre base
echo =======================================
echo.
echo Testons la connexion a votre base 'diravenir'...
mysql -u root -p -e "USE diravenir; SELECT COUNT(*) as 'Nombre de programmes' FROM programs;" 2>nul
if %errorlevel% neq 0 (
    echo.
    echo ERREUR: Impossible de se connecter a la base 'diravenir'
    echo.
    echo SOLUTIONS:
    echo 1. Verifiez que MySQL est demarre
    echo 2. Verifiez votre mot de passe
    echo 3. Verifiez que la base 'diravenir' existe
    echo.
    pause
    exit /b 1
) else (
    echo ✓ Connexion a la base 'diravenir' reussie
)

echo.
echo ETAPE 3: Creation du backup securise
echo =====================================
echo.
echo Nous allons maintenant creer un backup securise de vos donnees.
echo Ce processus va:
echo - Creer un backup personnel de vos donnees (avec timestamp)
echo - Creer une archive pour partager avec votre binome
echo - Garder vos donnees originales intactes
echo.
set /p confirm="Voulez-vous continuer? (O/N): "
if /i not "%confirm%"=="O" (
    echo Operation annulee.
    pause
    exit /b 0
)

echo.
echo Lancement du script de backup securise...
call backup-safe-database.bat

echo.
echo ETAPE 4: Partage avec votre binome
echo ==================================
echo.
echo Votre backup est maintenant pret!
echo.
echo FICHIER A PARTAGER: diravenir_safe_backup.zip
echo.
echo METHODES DE PARTAGE:
echo.
echo 1. GOOGLE DRIVE (Recommandé):
echo    - Allez sur https://drive.google.com
echo    - Cliquez sur "Nouveau" puis "Telechargement de fichiers"
echo    - Selectionnez diravenir_safe_backup.zip
echo    - Clic droit sur le fichier → "Obtenir le lien"
echo.
echo 2. WE TRANSFER (Simple):
echo    - Allez sur https://wetransfer.com
echo    - Glissez-deposez diravenir_safe_backup.zip
echo    - Entrez l'email de votre binome
echo    - Cliquez sur "Transferer"
echo.
echo 3. ONE DRIVE (Microsoft):
echo    - Allez sur https://onedrive.live.com
echo    - Uploadez diravenir_safe_backup.zip
echo    - Clic droit → "Partager"
echo.

echo Voulez-vous ouvrir une option de partage? (O/N)
set /p choice="Votre choix: "

if /i "%choice%"=="O" (
    echo.
    echo Quelle option voulez-vous ouvrir?
    echo 1. Google Drive
    echo 2. WeTransfer
    echo 3. OneDrive
    echo 4. Annuler
    echo.
    set /p option="Votre choix (1-4): "
    
    if "%option%"=="1" start https://drive.google.com
    if "%option%"=="2" start https://wetransfer.com
    if "%option%"=="3" start https://onedrive.live.com
)

echo.
echo ETAPE 5: Message pour votre binome
echo ===================================
echo.
echo Copiez ce message et envoyez-le a votre binome:
echo.
echo ========================================
echo 📊 Base de donnees DIRAVENIR prete!
echo.
echo 🔗 Lien de telechargement: [COLLEZ VOTRE LIEN ICI]
echo 📁 Fichier: diravenir_safe_backup.zip
echo 📋 Instructions: GUIDE_INSTALLATION.txt
echo.
echo ✅ Apres installation:
echo - Backend: http://localhost:8080
echo - Frontend: http://localhost:3000
echo.
echo ❓ Besoin d'aide? Contactez-moi!
echo ========================================
echo.
echo.
echo ETAPE 6: Instructions pour votre binome
echo =======================================
echo.
echo Votre binome doit:
echo 1. Telecharger diravenir_safe_backup.zip
echo 2. Extraire l'archive
echo 3. Executer restore-for-binome.bat
echo 4. Suivre GUIDE_INSTALLATION.txt
echo 5. Demarrer l'application
echo.
echo.
echo ========================================
echo    PROCESSUS TERMINE!
echo ========================================
echo.
echo ✓ Backup securise cree
echo ✓ Archive prete a partager
echo ✓ Vos donnees sont protegees
echo ✓ Instructions generees
echo.
echo Vous pouvez maintenant partager diravenir_safe_backup.zip
echo avec votre binome en toute securite!
echo.
pause
