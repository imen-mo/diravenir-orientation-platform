@echo off
echo ========================================
echo    BACKUP SECURISE - Base de Donnees DIRAVENIR
echo    (Version corrigee pour les erreurs communes)
echo ========================================
echo.

REM Configuration des variables
set DB_NAME=diravenir
set BACKUP_DIR=backup_secure
set SHARE_DIR=shared_database_safe
set ZIP_FILE=diravenir_safe_backup.zip
set TIMESTAMP=%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set TIMESTAMP=%TIMESTAMP: =0%

echo [1/7] Verification des droits administrateur...
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo ERREUR: Ce script doit etre execute en tant qu'administrateur
    echo.
    echo SOLUTION:
    echo 1. Clic droit sur ce fichier
    echo 2. Selectionnez "Executer en tant qu'administrateur"
    echo 3. Cliquez sur "Oui" dans la fenetre UAC
    echo.
    pause
    exit /b 1
) else (
    echo ✓ Droits administrateur confirmes
)

echo [2/7] Verification de MySQL...
echo Test de la commande mysqldump...
mysqldump --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERREUR: mysqldump n'est pas trouve dans le PATH
    echo.
    echo SOLUTIONS POSSIBLES:
    echo 1. MySQL n'est pas installe
    echo 2. MySQL n'est pas dans le PATH systeme
    echo 3. MySQL est installe mais pas demarre
    echo.
    echo ESSAYONS DE TROUVER MYSQL...
    
    REM Essayer les chemins communs de MySQL
    set MYSQL_PATH=
    if exist "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqldump.exe" (
        set MYSQL_PATH=C:\Program Files\MySQL\MySQL Server 8.0\bin\
        echo ✓ MySQL trouve dans: %MYSQL_PATH%
    ) else if exist "C:\Program Files (x86)\MySQL\MySQL Server 8.0\bin\mysqldump.exe" (
        set MYSQL_PATH=C:\Program Files (x86)\MySQL\MySQL Server 8.0\bin\
        echo ✓ MySQL trouve dans: %MYSQL_PATH%
    ) else if exist "C:\xampp\mysql\bin\mysqldump.exe" (
        set MYSQL_PATH=C:\xampp\mysql\bin\
        echo ✓ MySQL trouve dans: %MYSQL_PATH%
    ) else if exist "C:\wamp64\bin\mysql\mysql8.0.21\bin\mysqldump.exe" (
        set MYSQL_PATH=C:\wamp64\bin\mysql\mysql8.0.21\bin\
        echo ✓ MySQL trouve dans: %MYSQL_PATH%
    ) else (
        echo ERREUR: MySQL n'a pas ete trouve automatiquement
        echo.
        echo SOLUTIONS MANUELLES:
        echo 1. Installez MySQL depuis https://dev.mysql.com/downloads/mysql/
        echo 2. Ou installez XAMPP depuis https://www.apachefriends.org/
        echo 3. Ou ajoutez MySQL au PATH systeme
        echo.
        echo CHEMIN MYSQL PERSONNALISE:
        set /p MYSQL_PATH="Entrez le chemin vers le dossier bin de MySQL (ex: C:\Program Files\MySQL\MySQL Server 8.0\bin\): "
        if not exist "%MYSQL_PATH%mysqldump.exe" (
            echo ERREUR: mysqldump.exe non trouve dans: %MYSQL_PATH%
            pause
            exit /b 1
        )
    )
    
    REM Ajouter MySQL au PATH pour cette session
    set PATH=%MYSQL_PATH%;%PATH%
    echo ✓ MySQL ajoute au PATH pour cette session
) else (
    echo ✓ MySQL est accessible dans le PATH
)

echo [3/7] Test de connexion a MySQL...
echo Test de connexion a la base de donnees...
mysql -u root -p -e "SELECT 1;" >nul 2>&1
if %errorlevel% neq 0 (
    echo ERREUR: Impossible de se connecter a MySQL
    echo.
    echo SOLUTIONS:
    echo 1. Verifiez que MySQL est demarre
    echo 2. Verifiez votre mot de passe root
    echo 3. Essayez de demarrer MySQL manuellement
    echo.
    echo DEMARRAGE MYSQL:
    echo - Windows: Services.msc → MySQL → Demarrer
    echo - XAMPP: Demarrer MySQL dans le panneau de controle
    echo - WAMP: Clic sur l'icone WAMP → MySQL → Demarrer
    echo.
    pause
    exit /b 1
) else (
    echo ✓ Connexion MySQL reussie
)

echo [4/7] Verification de la base 'diravenir'...
mysql -u root -p -e "USE diravenir; SELECT COUNT(*) as 'Programmes' FROM programs;" 2>nul
if %errorlevel% neq 0 (
    echo ERREUR: Base de donnees 'diravenir' non trouvee ou inaccessible
    echo.
    echo SOLUTIONS:
    echo 1. Verifiez que la base 'diravenir' existe
    echo 2. Verifiez les permissions sur la base
    echo 3. Essayez de vous connecter manuellement: mysql -u root -p
    echo.
    pause
    exit /b 1
) else (
    echo ✓ Base 'diravenir' accessible
)

echo [5/7] Creation des dossiers de sauvegarde...
if not exist "%BACKUP_DIR%" (
    mkdir "%BACKUP_DIR%"
    if %errorlevel% neq 0 (
        echo ERREUR: Impossible de creer le dossier %BACKUP_DIR%
        pause
        exit /b 1
    )
    echo ✓ Dossier %BACKUP_DIR% cree
) else (
    echo ✓ Dossier %BACKUP_DIR% existe deja
)

if not exist "%SHARE_DIR%" (
    mkdir "%SHARE_DIR%"
    if %errorlevel% neq 0 (
        echo ERREUR: Impossible de creer le dossier %SHARE_DIR%
        pause
        exit /b 1
    )
    echo ✓ Dossier %SHARE_DIR% cree
) else (
    echo ✓ Dossier %SHARE_DIR% existe deja
)

echo [6/7] Creation du backup de SECURITE...
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
    echo.
    echo CAUSES POSSIBLES:
    echo 1. Mot de passe MySQL incorrect
    echo 2. Base de donnees verrouillee
    echo 3. Permissions insuffisantes
    echo.
    echo ESSAYEZ:
    echo 1. Verifiez votre mot de passe
    echo 2. Fermez toutes les applications utilisant MySQL
    echo 3. Redemarrez MySQL
    echo.
    pause
    exit /b 1
) else (
    echo ✓ Backup de securite cree: backup_securite_%TIMESTAMP%.sql
)

echo Creation du backup pour partage...
mysqldump -u root -p --routines --triggers --single-transaction --add-drop-database --databases %DB_NAME% > "%BACKUP_DIR%\diravenir_share_backup.sql"

if %errorlevel% neq 0 (
    echo ERREUR: Impossible de creer le backup pour partage
    pause
    exit /b 1
) else (
    echo ✓ Backup pour partage cree: diravenir_share_backup.sql
)

echo [7/7] Creation des scripts et guides...
echo Creation du script de restauration pour votre binome...
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

echo Creation du guide de configuration...
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
echo 2. Verifiez les ports 8080 et 3000
echo 3. Consultez les logs de l'application
echo 4. Contactez votre binome pour assistance
) > "%SHARE_DIR%\GUIDE_INSTALLATION.txt"

echo Copie des fichiers et creation de l'archive...
copy "%BACKUP_DIR%\diravenir_share_backup.sql" "%SHARE_DIR%\"
copy "README_BINOME_DISTANT.md" "%SHARE_DIR%\" 2>nul

REM Creation de l'archive ZIP
powershell -command "Compress-Archive -Path '%SHARE_DIR%\*' -DestinationPath '%ZIP_FILE%' -Force"

echo.
echo ========================================
echo    BACKUP SECURISE TERMINE AVEC SUCCES!
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
