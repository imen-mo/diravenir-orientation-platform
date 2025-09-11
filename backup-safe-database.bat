@echo off
echo ========================================
echo    BACKUP SECURISE - Base de Donnees DIRAVENIR
echo    (Conserve vos donnees importantes)
echo ========================================
echo.

REM Configuration des variables
set DB_NAME=diravenir
set BACKUP_DIR=backup_secure
set SHARE_DIR=shared_database_safe
set ZIP_FILE=diravenir_safe_backup.zip
set TIMESTAMP=%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set TIMESTAMP=%TIMESTAMP: =0%

echo [1/6] Creation des dossiers de sauvegarde...
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"
if not exist "%SHARE_DIR%" mkdir "%SHARE_DIR%"

echo [2/6] Creation d'un backup de SECURITE de vos donnees...
echo Ceci va creer une sauvegarde complete de votre base actuelle.
echo.
set /p confirm="Voulez-vous continuer? (O/N): "
if /i not "%confirm%"=="O" (
    echo Operation annulee.
    pause
    exit /b 0
)

echo Creation du backup de securite...
mysqldump -u root -p --routines --triggers --single-transaction --add-drop-database --databases %DB_NAME% > "%BACKUP_DIR%\backup_securite_%TIMESTAMP%.sql"

if %errorlevel% neq 0 (
    echo ERREUR: Impossible de creer le backup de securite
    echo Verifiez que MySQL est demarre et que les identifiants sont corrects
    pause
    exit /b 1
)

echo [3/6] Creation du backup pour partage...
mysqldump -u root -p --routines --triggers --single-transaction --add-drop-database --databases %DB_NAME% > "%BACKUP_DIR%\diravenir_share_backup.sql"

if %errorlevel% neq 0 (
    echo ERREUR: Impossible de creer le backup pour partage
    pause
    exit /b 1
)

echo [4/6] Creation du script de restauration pour votre binome...
(
echo @echo off
echo echo ========================================
echo echo    RESTAURATION BASE DIRAVENIR
echo echo    (Pour votre binome distant)
echo echo ========================================
echo echo.
echo echo ATTENTION: Ce script va creer une nouvelle base de donnees
echo echo Si vous avez deja une base 'diravenir', elle sera remplacee!
echo echo.
echo set /p confirm="Voulez-vous continuer? (O/N): "
echo if /i not "%%confirm%%"=="O" ^(
echo     echo Operation annulee.
echo     pause
echo     exit /b 0
echo ^)
echo echo.
echo echo [1/4] Verification de MySQL...
echo mysql --version
echo if %%errorlevel%% neq 0 ^(
echo     echo ERREUR: MySQL n'est pas installe ou pas dans le PATH
echo     echo Installez MySQL et ajoutez-le au PATH systeme
echo     pause
echo     exit /b 1
echo ^)
echo echo [2/4] Sauvegarde de l'ancienne base ^(si elle existe^)...
echo mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS diravenir_backup_old CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2^>nul
echo mysql -u root -p -e "DROP DATABASE IF EXISTS diravenir_backup_old;" 2^>nul
echo mysql -u root -p -e "CREATE DATABASE diravenir_backup_old CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2^>nul
echo mysqldump -u root -p diravenir ^> backup_old_diravenir.sql 2^>nul
echo mysql -u root -p diravenir_backup_old ^< backup_old_diravenir.sql 2^>nul
echo echo [3/4] Creation de la nouvelle base...
echo mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS diravenir CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
echo echo [4/4] Restauration des donnees...
echo mysql -u root -p diravenir ^< diravenir_share_backup.sql
echo echo.
echo echo ========================================
echo echo    RESTAURATION TERMINEE!
echo echo ========================================
echo echo.
echo echo Votre ancienne base est sauvegardee dans 'diravenir_backup_old'
echo echo La nouvelle base 'diravenir' est maintenant active.
echo echo.
echo echo Testez votre application maintenant!
echo pause
) > "%SHARE_DIR%\restore-for-binome.bat"

echo [5/6] Creation du guide de configuration...
(
echo # Configuration pour Binome Distant - DIRAVENIR
echo.
echo ## ETAPES D'INSTALLATION:
echo.
echo ### 1. Restauration de la Base de Donnees
echo Executez: restore-for-binome.bat
echo.
echo ### 2. Configuration Backend
echo Modifiez le fichier: src/main/resources/application.properties
echo.
echo Ajoutez ces lignes:
echo spring.datasource.url=jdbc:mysql://localhost:3306/diravenir?useSSL=false^&serverTimezone=UTC^&allowPublicKeyRetrieval=true
echo spring.datasource.username=root
echo spring.datasource.password=root
echo spring.jpa.hibernate.ddl-auto=validate
echo spring.jpa.show-sql=false
echo.
echo ### 3. Configuration Frontend
echo Verifiez le fichier: src/services/api.js
echo Assurez-vous que: const API_BASE_URL = 'http://localhost:8084/api';
echo.
echo ### 4. Demarrage de l'Application
echo.
echo Terminal 1 ^(Backend^):
echo cd backend
echo mvn spring-boot:run
echo.
echo Terminal 2 ^(Frontend^):
echo cd frontend
echo npm install
echo npm start
echo.
echo ### 5. Test de Fonctionnement
echo Ouvrez: http://localhost:5173
echo Testez l'API: http://localhost:8084/api/programs
echo.
echo ## VERIFICATION:
echo mysql -u root -p -e "USE diravenir; SHOW TABLES; SELECT COUNT^(^*^) FROM programs;"
echo.
echo ## EN CAS DE PROBLEME:
echo 1. Verifiez que MySQL est demarre
echo 2. Verifiez les ports 8084 et 5173
echo 3. Consultez les logs de l'application
echo 4. Contactez votre binome pour assistance
) > "%SHARE_DIR%\GUIDE_INSTALLATION.txt"

echo [6/6] Copie des fichiers et creation de l'archive...
copy "%BACKUP_DIR%\diravenir_share_backup.sql" "%SHARE_DIR%\"
copy "README_BINOME_DISTANT.md" "%SHARE_DIR%\" 2>nul

REM Creation de l'archive ZIP
powershell -command "Compress-Archive -Path '%SHARE_DIR%\*' -DestinationPath '%ZIP_FILE%' -Force"

echo.
echo ========================================
echo    BACKUP SECURISE TERMINE!
echo ========================================
echo.
echo FICHIERS CREES:
echo - %ZIP_FILE% (archive a partager avec votre binome)
echo - %BACKUP_DIR%\backup_securite_%TIMESTAMP%.sql (votre backup personnel)
echo - %SHARE_DIR%\ (dossier de travail)
echo.
echo VOS DONNEES SONT SECURISEES:
echo ✓ Backup personnel cree: backup_securite_%TIMESTAMP%.sql
echo ✓ Archive pour binome creee: %ZIP_FILE%
echo ✓ Vos donnees originales sont intactes
echo.
echo PROCHAINES ETAPES:
echo 1. Partagez %ZIP_FILE% avec votre binome
echo 2. Gardez votre backup personnel en securite
echo 3. Votre binome executera restore-for-binome.bat
echo.
echo METHODES DE PARTAGE:
echo - Google Drive: https://drive.google.com
echo - WeTransfer: https://wetransfer.com
echo - OneDrive: https://onedrive.live.com
echo.
echo Taille du fichier a partager:
dir "%ZIP_FILE%" | findstr "%ZIP_FILE%"
echo.
pause
