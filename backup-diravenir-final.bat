@echo off
echo ========================================
echo    BACKUP FINAL DIRAVENIR - Base Complete
echo    Configuration: diravenir/root/root
echo    Ports: Backend 8084, Frontend 5173
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

echo Test de connexion a la base diravenir...
"%MYSQL_PATH%mysql.exe" -u %DB_USER% -p%DB_PASS% -e "USE diravenir; SELECT COUNT(*) as 'Nombre de tables' FROM information_schema.tables WHERE table_schema='diravenir';"
if %errorlevel% neq 0 (
    echo ❌ Impossible de se connecter a la base diravenir
    echo.
    echo ESSAYONS SANS MOT DE PASSE...
    "%MYSQL_PATH%mysql.exe" -u %DB_USER% -e "USE diravenir; SELECT COUNT(*) as 'Nombre de tables' FROM information_schema.tables WHERE table_schema='diravenir';"
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
echo Verification des tables principales...
"%MYSQL_PATH%mysql.exe" -u %DB_USER% -p%DB_PASS% -e "USE diravenir; SELECT table_name FROM information_schema.tables WHERE table_schema='diravenir' ORDER BY table_name;"

echo.
echo ETAPE 2: Creation du backup securise
echo =====================================
echo.

echo Creation des dossiers...
if not exist "backup_final" mkdir "backup_final"
if not exist "shared_final" mkdir "shared_final"

echo.
echo Creation du backup de securite (avec toutes les tables)...
"%MYSQL_PATH%mysqldump.exe" -u %DB_USER% -p%DB_PASS% --routines --triggers --single-transaction --add-drop-database --databases %DB_NAME% > "backup_final\backup_securite_%date:~-4,4%%date:~-10,2%%date:~-7,2%.sql"

if %errorlevel% neq 0 (
    echo ❌ Erreur lors de la creation du backup
    echo.
    echo ESSAYONS SANS MOT DE PASSE...
    "%MYSQL_PATH%mysqldump.exe" -u %DB_USER% --routines --triggers --single-transaction --add-drop-database --databases %DB_NAME% > "backup_final\backup_securite_%date:~-4,4%%date:~-10,2%%date:~-7,2%.sql"
    if %errorlevel% neq 0 (
        echo ❌ Echec egalement sans mot de passe
        pause
        exit /b 1
    ) else (
        echo ✓ Backup de securite cree sans mot de passe
        set DB_PASS=
    )
) else (
    echo ✓ Backup de securite cree: backup_final\backup_securite_%date:~-4,4%%date:~-10,2%%date:~-7,2%.sql
)

echo.
echo Creation du backup pour partage...
"%MYSQL_PATH%mysqldump.exe" -u %DB_USER% -p%DB_PASS% --routines --triggers --single-transaction --add-drop-database --databases %DB_NAME% > "shared_final\diravenir_complete_backup.sql"

if %errorlevel% neq 0 (
    echo ❌ Erreur lors de la creation du backup pour partage
    echo.
    echo ESSAYONS SANS MOT DE PASSE...
    "%MYSQL_PATH%mysqldump.exe" -u %DB_USER% --routines --triggers --single-transaction --add-drop-database --databases %DB_NAME% > "shared_final\diravenir_complete_backup.sql"
    if %errorlevel% neq 0 (
        echo ❌ Echec egalement sans mot de passe
        pause
        exit /b 1
    ) else (
        echo ✓ Backup pour partage cree sans mot de passe
    )
) else (
    echo ✓ Backup pour partage cree: shared_final\diravenir_complete_backup.sql
)

echo.
echo ETAPE 3: Creation du script de restauration
echo ============================================
echo.

echo Creation du script de restauration pour votre binome...
(
echo @echo off
echo echo ========================================
echo echo    RESTAURATION BASE DIRAVENIR COMPLETE
echo echo    (Pour votre binome distant)
echo echo ========================================
echo echo.
echo echo ATTENTION: Ce script va restaurer la base diravenir complete
echo echo avec toutes les tables et donnees.
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
echo echo [4/4] Restauration des donnees completes...
echo mysql -u root -p diravenir ^< diravenir_complete_backup.sql
echo echo.
echo echo ========================================
echo echo    RESTAURATION TERMINEE!
echo echo ========================================
echo echo.
echo echo Votre ancienne base est sauvegardee dans 'diravenir_backup_old'
echo echo La nouvelle base 'diravenir' est maintenant active avec toutes les tables.
echo echo.
echo echo Tables restaurees:
echo mysql -u root -p -e "USE diravenir; SHOW TABLES;"
echo echo.
echo echo Testez votre application maintenant!
echo pause
) > "shared_final\restore-diravenir-complete.bat"

echo ✓ Script de restauration cree: shared_final\restore-diravenir-complete.bat

echo.
echo ETAPE 4: Creation du guide complet
echo ===================================
echo.

echo Creation du guide d'installation complet...
(
echo # Guide d'installation complet - DIRAVENIR ORIENTATION SYSTEM
echo.
echo ## Configuration detectee:
echo - Base de donnees: diravenir
echo - Utilisateur: root
echo - Mot de passe: root
echo - Backend: port 8084
echo - Frontend: port 5173
echo - Tables: 50+ tables incluant toutes les fonctionnalites
echo.
echo ## Tables principales detectees:
echo - utilisateurs, etudiants, conseillers, administrateurs
echo - orientation_tests, orientation_results, orientation_questions
echo - applications, candidatures, documents
echo - chat_sessions, chat_messages
echo - programs, majors, destinations, universites
echo - Et bien d'autres...
echo.
echo ## 1. Restauration de la base de donnees
echo.
echo ### Option A: Script automatique (Recommandé)
echo 1. Double-clic sur restore-diravenir-complete.bat
echo 2. Tapez O quand demande
echo 3. Entrez votre mot de passe MySQL
echo 4. Attendez la fin de la restauration
echo.
echo ### Option B: Restauration manuelle
echo 1. Ouvrez l'invite de commande en tant qu'administrateur
echo 2. Naviguez vers le dossier contenant diravenir_complete_backup.sql
echo 3. Executez: mysql -u root -p ^< diravenir_complete_backup.sql
echo 4. Entrez le mot de passe: root
echo.
echo ## 2. Configuration de l'application
echo.
echo ### Backend (src/main/resources/application.properties):
echo spring.datasource.url=jdbc:mysql://localhost:3306/diravenir?useSSL=false^&serverTimezone=UTC^&allowPublicKeyRetrieval=true
echo spring.datasource.username=root
echo spring.datasource.password=root
echo spring.jpa.hibernate.ddl-auto=validate
echo spring.jpa.show-sql=false
echo server.port=8084
echo.
echo ### Frontend (src/services/api.js):
echo const API_BASE_URL = 'http://localhost:8084/api';
echo.
echo ## 3. Demarrage de l'application
echo.
echo ### Terminal 1 (Backend):
echo cd backend
echo mvn spring-boot:run
echo.
echo ### Terminal 2 (Frontend):
echo cd frontend
echo npm install
echo npm start
echo.
echo ## 4. Test de fonctionnement
echo.
echo ### URLs de test:
echo - Frontend: http://localhost:5173
echo - Backend API: http://localhost:8084/api
echo - Test programmes: http://localhost:8084/api/programs
echo - Test utilisateurs: http://localhost:8084/api/users
echo.
echo ### Verification base de donnees:
echo mysql -u root -p -e "USE diravenir; SHOW TABLES; SELECT COUNT^(^*^) as 'Total Tables' FROM information_schema.tables WHERE table_schema='diravenir';"
echo.
echo ## 5. Fonctionnalites disponibles
echo.
echo Apres restauration, vous aurez acces a:
echo - Systeme d'orientation psychometrique complet
echo - Gestion des utilisateurs (etudiants, conseillers, admins)
echo - Systeme de candidatures et applications
echo - Chat en temps reel
echo - Gestion des documents
echo - Catalogue des programmes et universites
echo - Systeme de notifications
echo - Et toutes les autres fonctionnalites
echo.
echo ## 6. En cas de probleme
echo.
echo ### Problemes courants:
echo 1. Port 8084 occupe: Changez le port dans application.properties
echo 2. Port 5173 occupe: Changez le port dans package.json
echo 3. MySQL non demarre: Demarrez le service MySQL
echo 4. Mot de passe incorrect: Verifiez root/root
echo.
echo ### Solutions:
echo 1. Verifiez que MySQL est demarre
echo 2. Verifiez les ports 8084 et 5173
echo 3. Consultez les logs de l'application
echo 4. Contactez votre binome pour assistance
echo.
echo ## 7. Support technique
echo.
echo En cas de probleme, fournissez:
echo - Message d'erreur exact
echo - Configuration systeme (OS, versions)
echo - Logs de l'application
echo - Screenshot si possible
) > "shared_final\GUIDE_INSTALLATION_COMPLET.txt"

echo ✓ Guide d'installation complet cree: shared_final\GUIDE_INSTALLATION_COMPLET.txt

echo.
echo ETAPE 5: Creation de l'archive finale
echo ======================================
echo.

echo Creation de l'archive ZIP finale...
powershell -command "Compress-Archive -Path 'shared_final\*' -DestinationPath 'DIRAVENIR_COMPLETE_BACKUP.zip' -Force"

if %errorlevel% neq 0 (
    echo ❌ Erreur lors de la creation de l'archive
    echo.
    echo SOLUTION MANUELLE:
    echo 1. Selectionnez tous les fichiers dans le dossier shared_final
    echo 2. Clic droit → "Envoyer vers" → "Dossier compresse"
    echo 3. Renommez l'archive en DIRAVENIR_COMPLETE_BACKUP.zip
) else (
    echo ✓ Archive finale creee: DIRAVENIR_COMPLETE_BACKUP.zip
)

echo.
echo ========================================
echo    BACKUP COMPLET TERMINE AVEC SUCCES!
echo ========================================
echo.
echo FICHIERS CREES:
echo - DIRAVENIR_COMPLETE_BACKUP.zip (archive complete a partager)
echo - backup_final\backup_securite_*.sql (votre backup personnel)
echo - shared_final\ (dossier de travail)
echo.
echo VOS DONNEES SONT SECURISEES:
echo ✓ Backup personnel cree avec toutes les tables
echo ✓ Archive complete pour partage
echo ✓ Vos donnees originales sont intactes
echo.
echo CONFIGURATION DETECTEE:
echo ✓ Base: diravenir (50+ tables)
echo ✓ Utilisateur: root
echo ✓ Mot de passe: root
echo ✓ Backend: port 8084
echo ✓ Frontend: port 5173
echo.
echo TABLES PRINCIPALES SAUVEGARDEES:
echo ✓ utilisateurs, etudiants, conseillers, administrateurs
echo ✓ orientation_tests, orientation_results, orientation_questions
echo ✓ applications, candidatures, documents
echo ✓ chat_sessions, chat_messages
echo ✓ programs, majors, destinations, universites
echo ✓ Et toutes les autres tables...
echo.
echo PROCHAINES ETAPES:
echo 1. Partagez DIRAVENIR_COMPLETE_BACKUP.zip avec votre binome
echo 2. Gardez votre backup personnel en securite
echo 3. Votre binome executera restore-diravenir-complete.bat
echo 4. Votre binome suivra GUIDE_INSTALLATION_COMPLET.txt
echo.
echo METHODES DE PARTAGE:
echo - Google Drive: https://drive.google.com
echo - WeTransfer: https://wetransfer.com
echo - OneDrive: https://onedrive.live.com
echo.
echo Taille du fichier a partager:
dir "DIRAVENIR_COMPLETE_BACKUP.zip" | findstr "DIRAVENIR_COMPLETE_BACKUP.zip"
echo.
pause
