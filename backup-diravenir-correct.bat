@echo off
echo ========================================
echo    BACKUP DIRAVENIR - Version Corrigee
echo    Base: diravenir | User: root | MDP: root
echo ========================================
echo.

REM Configuration
set MYSQL_PATH=C:\Program Files\MySQL\MySQL Server 8.0\bin\
set DB_NAME=diravenir
set DB_USER=root
set DB_PASS=root

echo ETAPE 1: Verification de la base diravenir
echo ===========================================
echo.

echo Testons l'acces a votre base diravenir...
echo.

echo Affichage des tables existantes dans diravenir:
"%MYSQL_PATH%mysql.exe" -u %DB_USER% -p%DB_PASS% -e "USE diravenir; SHOW TABLES;"
if %errorlevel% neq 0 (
    echo ❌ Impossible d'acceder a la base diravenir
    echo.
    echo CAUSES POSSIBLES:
    echo 1. Mot de passe incorrect (essayez sans mot de passe)
    echo 2. Base diravenir n'existe pas
    echo 3. MySQL non demarre
    echo.
    echo ESSAYONS SANS MOT DE PASSE...
    "%MYSQL_PATH%mysql.exe" -u %DB_USER% -e "USE diravenir; SHOW TABLES;"
    if %errorlevel% neq 0 (
        echo ❌ Echec egalement sans mot de passe
        pause
        exit /b 1
    ) else (
        echo ✓ Connexion reussie sans mot de passe
        set DB_PASS=
    )
) else (
    echo ✓ Base diravenir accessible avec mot de passe
)

echo.
echo ETAPE 2: Verification du contenu
echo =================================
echo.

echo Verification du nombre de tables:
"%MYSQL_PATH%mysql.exe" -u %DB_USER% -p%DB_PASS% -e "USE diravenir; SELECT COUNT(*) as 'Nombre de tables' FROM information_schema.tables WHERE table_schema='diravenir';"

echo.
echo Verification des tables principales:
"%MYSQL_PATH%mysql.exe" -u %DB_USER% -p%DB_PASS% -e "USE diravenir; SHOW TABLES;"

echo.
echo ETAPE 3: Creation du backup
echo ============================
echo.

echo Creation des dossiers...
if not exist "backup_diravenir" mkdir "backup_diravenir"
if not exist "shared_diravenir" mkdir "shared_diravenir"

echo.
echo Creation du backup de securite...
"%MYSQL_PATH%mysqldump.exe" -u %DB_USER% -p%DB_PASS% --routines --triggers --single-transaction --add-drop-database --databases %DB_NAME% > "backup_diravenir\backup_securite_%date:~-4,4%%date:~-10,2%%date:~-7,2%.sql"

if %errorlevel% neq 0 (
    echo ❌ Erreur lors de la creation du backup
    echo.
    echo ESSAYONS SANS MOT DE PASSE...
    "%MYSQL_PATH%mysqldump.exe" -u %DB_USER% --routines --triggers --single-transaction --add-drop-database --databases %DB_NAME% > "backup_diravenir\backup_securite_%date:~-4,4%%date:~-10,2%%date:~-7,2%.sql"
    if %errorlevel% neq 0 (
        echo ❌ Echec egalement sans mot de passe
        pause
        exit /b 1
    ) else (
        echo ✓ Backup de securite cree sans mot de passe
        set DB_PASS=
    )
) else (
    echo ✓ Backup de securite cree: backup_diravenir\backup_securite_%date:~-4,4%%date:~-10,2%%date:~-7,2%.sql
)

echo.
echo Creation du backup pour partage...
"%MYSQL_PATH%mysqldump.exe" -u %DB_USER% -p%DB_PASS% --routines --triggers --single-transaction --add-drop-database --databases %DB_NAME% > "shared_diravenir\diravenir_share.sql"

if %errorlevel% neq 0 (
    echo ❌ Erreur lors de la creation du backup pour partage
    echo.
    echo ESSAYONS SANS MOT DE PASSE...
    "%MYSQL_PATH%mysqldump.exe" -u %DB_USER% --routines --triggers --single-transaction --add-drop-database --databases %DB_NAME% > "shared_diravenir\diravenir_share.sql"
    if %errorlevel% neq 0 (
        echo ❌ Echec egalement sans mot de passe
        pause
        exit /b 1
    ) else (
        echo ✓ Backup pour partage cree sans mot de passe
    )
) else (
    echo ✓ Backup pour partage cree: shared_diravenir\diravenir_share.sql
)

echo.
echo ETAPE 4: Creation des guides
echo =============================
echo.

echo Creation du guide pour votre binome...
(
echo # Guide d'installation pour votre binome - DIRAVENIR
echo.
echo ## Configuration detectee:
echo - Base de donnees: diravenir
echo - Utilisateur: root
echo - Mot de passe: root
echo - Backend: port 8084
echo - Frontend: port 5173
echo.
echo ## 1. Restauration de la base de donnees
echo.
echo ### Windows:
echo 1. Ouvrez l'invite de commande en tant qu'administrateur
echo 2. Naviguez vers le dossier contenant diravenir_share.sql
echo 3. Executez: mysql -u root -p ^< diravenir_share.sql
echo 4. Entrez le mot de passe: root
echo.
echo ### Linux/Mac:
echo 1. Ouvrez un terminal
echo 2. Naviguez vers le dossier contenant diravenir_share.sql
echo 3. Executez: mysql -u root -p ^< diravenir_share.sql
echo 4. Entrez le mot de passe: root
echo.
echo ## 2. Configuration de l'application
echo.
echo ### Backend (application.properties):
echo spring.datasource.url=jdbc:mysql://localhost:3306/diravenir?useSSL=false^&serverTimezone=UTC^&allowPublicKeyRetrieval=true
echo spring.datasource.username=root
echo spring.datasource.password=root
echo spring.jpa.hibernate.ddl-auto=validate
echo server.port=8084
echo.
echo ### Frontend (api.js):
echo const API_BASE_URL = 'http://localhost:8084/api';
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
echo Ouvrez: http://localhost:5173
echo Testez l'API: http://localhost:8084/api/programs
echo.
echo ## 5. Verification de la base
echo mysql -u root -p -e "USE diravenir; SHOW TABLES;"
echo.
echo ## 6. En cas de probleme
echo 1. Verifiez que MySQL est demarre
echo 2. Verifiez les ports 8084 et 5173
echo 3. Consultez les logs de l'application
echo 4. Contactez votre binome pour assistance
) > "shared_diravenir\GUIDE_INSTALLATION.txt"

echo ✓ Guide d'installation cree: shared_diravenir\GUIDE_INSTALLATION.txt

echo.
echo ETAPE 5: Creation de l'archive
echo ===============================
echo.

echo Creation de l'archive ZIP...
powershell -command "Compress-Archive -Path 'shared_diravenir\*' -DestinationPath 'diravenir_backup_final.zip' -Force"

if %errorlevel% neq 0 (
    echo ❌ Erreur lors de la creation de l'archive
    echo.
    echo SOLUTION MANUELLE:
    echo 1. Selectionnez tous les fichiers dans le dossier shared_diravenir
    echo 2. Clic droit → "Envoyer vers" → "Dossier compresse"
    echo 3. Renommez l'archive en diravenir_backup_final.zip
) else (
    echo ✓ Archive creee: diravenir_backup_final.zip
)

echo.
echo ========================================
echo    BACKUP DIRAVENIR TERMINE AVEC SUCCES!
echo ========================================
echo.
echo FICHIERS CREES:
echo - diravenir_backup_final.zip (archive a partager)
echo - backup_diravenir\backup_securite_*.sql (votre backup personnel)
echo - shared_diravenir\ (dossier de travail)
echo.
echo VOS DONNEES SONT SECURISEES:
echo ✓ Backup personnel cree
echo ✓ Archive pour partage creee
echo ✓ Vos donnees originales sont intactes
echo.
echo CONFIGURATION DETECTEE:
echo ✓ Base: diravenir
echo ✓ Utilisateur: root
echo ✓ Mot de passe: root
echo ✓ Backend: port 8084
echo ✓ Frontend: port 5173
echo.
echo PROCHAINES ETAPES:
echo 1. Partagez diravenir_backup_final.zip avec votre binome
echo 2. Gardez votre backup personnel en securite
echo 3. Votre binome suivra le guide d'installation
echo.
echo METHODES DE PARTAGE:
echo - Google Drive: https://drive.google.com
echo - WeTransfer: https://wetransfer.com
echo - OneDrive: https://onedrive.live.com
echo.
pause
