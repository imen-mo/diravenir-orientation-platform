@echo off
echo ========================================
echo    Script de Partage DISTANT de Base de Donnees
echo    DIRAVENIR ORIENTATION SYSTEM
echo ========================================
echo.

REM Configuration des variables
set DB_NAME=diravenir
set BACKUP_DIR=backup
set SHARE_DIR=shared_database_remote
set ZIP_FILE=diravenir_database_share.zip

echo [1/5] Creation du dossier de partage distant...
if not exist "%SHARE_DIR%" mkdir "%SHARE_DIR%"

echo [2/5] Creation du backup de la base de donnees...
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

REM Export de la structure et des donnees
echo Export de la structure de la base de donnees...
mysqldump -u root -p --routines --triggers --single-transaction --add-drop-database --databases %DB_NAME% > "%BACKUP_DIR%\diravenir_complete_backup.sql"

if %errorlevel% neq 0 (
    echo ERREUR: Impossible de creer le backup de la base de donnees
    echo Verifiez que MySQL est demarre et que les identifiants sont corrects
    pause
    exit /b 1
)

echo [3/5] Creation du script de restauration pour binome distant...
(
echo @echo off
echo echo ========================================
echo echo    Script de Restauration DISTANTE
echo echo    DIRAVENIR ORIENTATION SYSTEM
echo echo ========================================
echo echo.
echo echo Ce script va restaurer la base de donnees DIRAVENIR
echo echo sur votre ordinateur distant.
echo echo.
echo pause
echo echo [1/4] Verification de MySQL...
echo mysql --version
echo if %%errorlevel%% neq 0 ^(
echo     echo ERREUR: MySQL n'est pas installe ou pas dans le PATH
echo     echo Installez MySQL et ajoutez-le au PATH systeme
echo     pause
echo     exit /b 1
echo ^)
echo echo [2/4] Connexion a MySQL...
echo mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS diravenir CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
echo echo [3/4] Restauration des donnees...
echo mysql -u root -p diravenir ^< diravenir_complete_backup.sql
echo echo [4/4] Verification de la restauration...
echo mysql -u root -p -e "USE diravenir; SHOW TABLES; SELECT COUNT^(^*^) as 'Total Programs' FROM programs;"
echo echo.
echo echo ========================================
echo echo    RESTAURATION TERMINEE AVEC SUCCES!
echo echo ========================================
echo echo.
echo echo Votre base de donnees DIRAVENIR est maintenant prete.
echo echo Vous pouvez demarrer l'application backend.
echo echo.
echo pause
) > "%SHARE_DIR%\restore-database-remote.bat"

echo [4/5] Creation du guide de configuration...
(
echo # Configuration Backend pour Binome Distant
echo.
echo ## 1. Fichier application.properties
echo spring.datasource.url=jdbc:mysql://localhost:3306/diravenir?useSSL=false^&serverTimezone=UTC^&allowPublicKeyRetrieval=true
echo spring.datasource.username=root
echo spring.datasource.password=root
echo spring.jpa.hibernate.ddl-auto=validate
echo spring.jpa.show-sql=false
echo.
echo ## 2. Verification des ports
echo - Backend: http://localhost:8084
echo - Frontend: http://localhost:5173
echo - MySQL: localhost:3306
echo.
echo ## 3. Commandes de demarrage
echo Backend: mvn spring-boot:run
echo Frontend: npm start
echo.
echo ## 4. Test de connexion
echo curl http://localhost:8080/api/programs
) > "%SHARE_DIR%\CONFIGURATION_GUIDE.txt"

echo [5/5] Copie des fichiers et creation de l'archive...
copy "%BACKUP_DIR%\diravenir_complete_backup.sql" "%SHARE_DIR%\"
copy "README_DATABASE_SHARE.md" "%SHARE_DIR%\" 2>nul

REM Creation d'une archive ZIP pour faciliter le partage
powershell -command "Compress-Archive -Path '%SHARE_DIR%\*' -DestinationPath '%ZIP_FILE%' -Force"

echo.
echo ========================================
echo    PARTAGE DISTANT TERMINE AVEC SUCCES!
echo ========================================
echo.
echo Fichiers crees:
echo - %ZIP_FILE% (archive complete a partager)
echo - %SHARE_DIR%\ (dossier de travail)
echo.
echo METHODES DE PARTAGE AVEC VOTRE BINOME:
echo.
echo 1. GOOGLE DRIVE / DROPBOX:
echo    - Uploadez le fichier %ZIP_FILE%
echo    - Partagez le lien avec votre binome
echo.
echo 2. WE TRANSFER:
echo    - Allez sur https://wetransfer.com
echo    - Uploadez %ZIP_FILE%
echo    - Envoyez le lien par email/WhatsApp
echo.
echo 3. GITHUB (si vous avez un repo):
echo    - Commitez %ZIP_FILE% dans le repo
echo    - Partagez le lien de telechargement
echo.
echo 4. EMAIL (si fichier ^< 25MB):
echo    - Attachez %ZIP_FILE% a un email
echo.
echo INSTRUCTIONS POUR VOTRE BINOME:
echo 1. Telechargez et extrayez %ZIP_FILE%
echo 2. Executez restore-database-remote.bat
echo 3. Suivez CONFIGURATION_GUIDE.txt
echo 4. Demarrez l'application
echo.
echo Taille du fichier a partager:
dir "%ZIP_FILE%" | findstr "%ZIP_FILE%"
echo.
pause
