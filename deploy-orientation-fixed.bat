@echo off
echo ========================================
echo DEPLOIEMENT SYSTEME D'ORIENTATION CORRIGE
echo ========================================
echo.

echo 1. Nettoyage des tables existantes...
echo    - Suppression des contraintes de clé étrangère
echo    - Suppression des tables dans le bon ordre
echo.

echo 2. Creation des nouvelles tables...
echo    - orientation_majors (50 majeures)
echo    - ideal_profiles (profils idéaux)
echo    - major_program_mapping (mappings)
echo.

echo 3. Insertion des donnees...
echo    - 50 majeures d'orientation
echo    - Profils idéaux pour 10 majeures principales
echo    - Mappings d'exemple
echo.

echo 4. Verification de la cohérence...
echo.

echo Appuyez sur une touche pour continuer...
pause > nul

echo.
echo Execution de la migration corrigee...
mysql -u root -p diravenir1 < "src\main\resources\db\migration\V4_2_FIXED__Create_Orientation_Majors.sql"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo SUCCES: Migration terminee avec succes!
    echo ========================================
    echo.
    echo Verification des resultats...
    echo.
    
    echo - Tables creees:
    mysql -u root -p -e "USE diravenir1; SHOW TABLES LIKE '%orientation%';"
    mysql -u root -p -e "USE diravenir1; SHOW TABLES LIKE '%ideal%';"
    mysql -u root -p -e "USE diravenir1; SHOW TABLES LIKE '%mapping%';"
    
    echo.
    echo - Contenu des tables:
    mysql -u root -p -e "USE diravenir1; SELECT COUNT(*) as total_majeures FROM orientation_majors;"
    mysql -u root -p -e "USE diravenir1; SELECT COUNT(*) as total_profils FROM ideal_profiles;"
    mysql -u root -p -e "USE diravenir1; SELECT COUNT(*) as total_mappings FROM major_program_mapping;"
    
    echo.
    echo ========================================
    echo SYSTEME D'ORIENTATION PRET!
    echo ========================================
    echo.
    echo Prochaines etapes:
    echo 1. Tester l'API REST
    echo 2. Passer a la Phase 2 (Frontend)
    echo.
) else (
    echo.
    echo ========================================
    echo ERREUR: La migration a echoue!
    echo ========================================
    echo.
    echo Verifiez:
    echo - Que MySQL est accessible
    echo - Que la base diravenir1 existe
    echo - Que vous avez les droits d'administration
    echo.
)

echo Appuyez sur une touche pour terminer...
pause > nul
