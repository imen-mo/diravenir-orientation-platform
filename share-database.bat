@echo off
echo ========================================
echo    Script de Partage de Base de Donnees
echo    DIRAVENIR ORIENTATION SYSTEM
echo ========================================
echo.

REM Configuration des variables
set DB_NAME=diravenir
set BACKUP_DIR=backup
set SHARE_DIR=shared_database

echo [1/4] Creation du dossier de partage...
if not exist "%SHARE_DIR%" mkdir "%SHARE_DIR%"

echo [2/4] Creation du backup de la base de donnees...
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

echo [3/4] Creation du script de restauration...
(
echo @echo off
echo echo ========================================
echo echo    Script de Restauration de Base de Donnees
echo echo    DIRAVENIR ORIENTATION SYSTEM
echo echo ========================================
echo echo.
echo echo Ce script va restaurer la base de donnees DIRAVENIR
echo echo.
echo pause
echo echo [1/3] Connexion a MySQL...
echo mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS diravenir_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
echo echo [2/3] Restauration des donnees...
echo mysql -u root -p diravenir_db ^< diravenir_complete_backup.sql
echo echo [3/3] Verification de la restauration...
echo mysql -u root -p -e "USE diravenir_db; SHOW TABLES;"
echo echo.
echo echo Base de donnees restauree avec succes!
echo echo Vous pouvez maintenant demarrer l'application.
echo pause
) > "%SHARE_DIR%\restore-database.bat"

echo [4/4] Copie des fichiers de partage...
copy "%BACKUP_DIR%\diravenir_complete_backup.sql" "%SHARE_DIR%\"
copy "README_DATABASE_SHARE.md" "%SHARE_DIR%\" 2>nul

echo.
echo ========================================
echo    PARTAGE TERMINE AVEC SUCCES!
echo ========================================
echo.
echo Fichiers crees dans le dossier: %SHARE_DIR%\
echo - diravenir_complete_backup.sql (backup complet)
echo - restore-database.bat (script de restauration)
echo - README_DATABASE_SHARE.md (instructions)
echo.
echo Instructions pour votre binome:
echo 1. Copiez tout le dossier '%SHARE_DIR%' sur votre ordinateur
echo 2. Executez 'restore-database.bat' en tant qu'administrateur
echo 3. Suivez les instructions a l'ecran
echo.
echo Vous pouvez maintenant partager le dossier '%SHARE_DIR%' avec votre binome.
echo.
pause
