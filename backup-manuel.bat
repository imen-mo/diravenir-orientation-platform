@echo off
echo ========================================
echo    BACKUP MANUEL - Base DIRAVENIR
echo ========================================
echo.

echo Ce script va vous guider pas a pas pour creer un backup manuel.
echo.

echo ETAPE 1: Verification de MySQL
echo ================================
echo.

echo Cherchons MySQL sur votre systeme...
echo.

REM Chercher MySQL
set MYSQL_PATH=
if exist "C:\xampp\mysql\bin\mysqldump.exe" (
    set MYSQL_PATH=C:\xampp\mysql\bin\
    echo ✓ MySQL trouve dans XAMPP: C:\xampp\mysql\bin\
) else if exist "C:\wamp64\bin\mysql\mysql8.0.21\bin\mysqldump.exe" (
    set MYSQL_PATH=C:\wamp64\bin\mysql\mysql8.0.21\bin\
    echo ✓ MySQL trouve dans WAMP: C:\wamp64\bin\mysql\mysql8.0.21\bin\
) else if exist "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqldump.exe" (
    set MYSQL_PATH=C:\Program Files\MySQL\MySQL Server 8.0\bin\
    echo ✓ MySQL trouve dans MySQL Server: C:\Program Files\MySQL\MySQL Server 8.0\bin\
) else (
    echo ❌ MySQL non trouve automatiquement
    echo.
    echo SOLUTIONS:
    echo 1. Installez XAMPP: https://www.apachefriends.org/
    echo 2. Ou installez MySQL: https://dev.mysql.com/downloads/mysql/
    echo 3. Ou entrez le chemin manuellement
    echo.
    set /p MYSQL_PATH="Entrez le chemin vers le dossier bin de MySQL: "
    if not exist "%MYSQL_PATH%mysqldump.exe" (
        echo ❌ mysqldump.exe non trouve dans: %MYSQL_PATH%
        pause
        exit /b 1
    )
)

echo.
echo ETAPE 2: Test de connexion
echo ===========================
echo.

echo Testons la connexion a MySQL...
"%MYSQL_PATH%mysql.exe" --version
if %errorlevel% neq 0 (
    echo ❌ MySQL ne fonctionne pas
    echo.
    echo SOLUTIONS:
    echo 1. Demarrez MySQL dans XAMPP/WAMP
    echo 2. Ou demarrez le service MySQL
    echo 3. Redemarrez votre ordinateur
    pause
    exit /b 1
) else (
    echo ✓ MySQL fonctionne
)

echo.
echo ETAPE 3: Test de la base diravenir
echo ===================================
echo.

echo Testons l'acces a votre base diravenir...
echo Entrez votre mot de passe MySQL quand demande:
"%MYSQL_PATH%mysql.exe" -u root -p -e "USE diravenir; SELECT COUNT(*) as 'Nombre de programmes' FROM programs;"
if %errorlevel% neq 0 (
    echo ❌ Impossible d'acceder a la base diravenir
    echo.
    echo CAUSES POSSIBLES:
    echo 1. Mot de passe incorrect
    echo 2. Base diravenir n'existe pas
    echo 3. MySQL non demarre
    echo.
    echo ESSAYEZ:
    echo 1. Verifiez votre mot de passe
    echo 2. Demarrez MySQL
    echo 3. Verifiez que la base diravenir existe
    pause
    exit /b 1
) else (
    echo ✓ Base diravenir accessible
)

echo.
echo ETAPE 4: Creation du backup
echo ============================
echo.

echo Creation des dossiers...
if not exist "backup_manual" mkdir "backup_manual"
if not exist "shared_manual" mkdir "shared_manual"

echo.
echo Creation du backup de securite...
echo Entrez votre mot de passe MySQL quand demande:
"%MYSQL_PATH%mysqldump.exe" -u root -p --routines --triggers --single-transaction --add-drop-database --databases diravenir > "backup_manual\backup_securite_%date:~-4,4%%date:~-10,2%%date:~-7,2%.sql"

if %errorlevel% neq 0 (
    echo ❌ Erreur lors de la creation du backup
    pause
    exit /b 1
) else (
    echo ✓ Backup de securite cree: backup_manual\backup_securite_%date:~-4,4%%date:~-10,2%%date:~-7,2%.sql
)

echo.
echo Creation du backup pour partage...
echo Entrez votre mot de passe MySQL quand demande:
"%MYSQL_PATH%mysqldump.exe" -u root -p --routines --triggers --single-transaction --add-drop-database --databases diravenir > "shared_manual\diravenir_share.sql"

if %errorlevel% neq 0 (
    echo ❌ Erreur lors de la creation du backup pour partage
    pause
    exit /b 1
) else (
    echo ✓ Backup pour partage cree: shared_manual\diravenir_share.sql
)

echo.
echo ETAPE 5: Creation des guides
echo =============================
echo.

echo Creation du guide pour votre binome...
(
echo # Guide d'installation pour votre binome
echo.
echo ## 1. Restauration de la base de donnees
echo.
echo ### Windows:
echo 1. Ouvrez l'invite de commande en tant qu'administrateur
echo 2. Naviguez vers le dossier contenant diravenir_share.sql
echo 3. Executez: mysql -u root -p ^< diravenir_share.sql
echo.
echo ### Linux/Mac:
echo 1. Ouvrez un terminal
echo 2. Naviguez vers le dossier contenant diravenir_share.sql
echo 3. Executez: mysql -u root -p ^< diravenir_share.sql
echo.
echo ## 2. Configuration de l'application
echo.
echo ### Backend (application.properties):
echo spring.datasource.url=jdbc:mysql://localhost:3306/diravenir?useSSL=false^&serverTimezone=UTC^&allowPublicKeyRetrieval=true
echo spring.datasource.username=root
echo spring.datasource.password=VOTRE_MOT_DE_PASSE_MYSQL
echo spring.jpa.hibernate.ddl-auto=validate
echo.
echo ### Frontend (api.js):
echo const API_BASE_URL = 'http://localhost:8080/api';
echo.
echo ## 3. Demarrage de l'application
echo.
echo ### Backend:
echo cd backend
echo mvn spring-boot:run
echo.
echo ### Frontend:
echo cd frontend
echo npm install
echo npm start
echo.
echo ## 4. Test
echo Ouvrez: http://localhost:3000
echo Testez l'API: http://localhost:8080/api/programs
) > "shared_manual\GUIDE_INSTALLATION.txt"

echo ✓ Guide d'installation cree: shared_manual\GUIDE_INSTALLATION.txt

echo.
echo ETAPE 6: Creation de l'archive
echo ===============================
echo.

echo Creation de l'archive ZIP...
powershell -command "Compress-Archive -Path 'shared_manual\*' -DestinationPath 'diravenir_manual_backup.zip' -Force"

if %errorlevel% neq 0 (
    echo ❌ Erreur lors de la creation de l'archive
    echo.
    echo SOLUTION MANUELLE:
    echo 1. Selectionnez tous les fichiers dans le dossier shared_manual
    echo 2. Clic droit → "Envoyer vers" → "Dossier compresse"
    echo 3. Renommez l'archive en diravenir_manual_backup.zip
) else (
    echo ✓ Archive creee: diravenir_manual_backup.zip
)

echo.
echo ========================================
echo    BACKUP MANUEL TERMINE AVEC SUCCES!
echo ========================================
echo.
echo FICHIERS CREES:
echo - diravenir_manual_backup.zip (archive a partager)
echo - backup_manual\backup_securite_*.sql (votre backup personnel)
echo - shared_manual\ (dossier de travail)
echo.
echo VOS DONNEES SONT SECURISEES:
echo ✓ Backup personnel cree
echo ✓ Archive pour partage creee
echo ✓ Vos donnees originales sont intactes
echo.
echo PROCHAINES ETAPES:
echo 1. Partagez diravenir_manual_backup.zip avec votre binome
echo 2. Gardez votre backup personnel en securite
echo 3. Votre binome suivra le guide d'installation
echo.
echo METHODES DE PARTAGE:
echo - Google Drive: https://drive.google.com
echo - WeTransfer: https://wetransfer.com
echo - OneDrive: https://onedrive.live.com
echo.
pause
