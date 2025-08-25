@echo off
echo ========================================
echo CORRECTION DES PROFILS IDÉAUX
echo ========================================
echo.

echo Problème identifié:
echo - La table orientation_majors contient 44 majeures (pas 50)
echo - Les IDs hardcodés (1,2,3,4,5,8,50) ne correspondent pas aux vrais IDs
echo - Erreur 1452: contrainte de clé étrangère échoue
echo.

echo Solution:
echo - Utiliser les vrais IDs des majeures existantes
echo - Créer ideal_profiles avec les bonnes références
echo - Créer major_program_mapping
echo.

echo Appuyez sur une touche pour continuer...
pause > nul

echo.
echo Execution de la correction...
mysql -u root -p diravenir1 < fix-ideal-profiles.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo SUCCES: Correction terminee!
    echo ========================================
    echo.
    echo Verification des resultats...
    echo.
    
    echo - Tables creees:
    mysql -u root -p -e "USE diravenir1; SHOW TABLES LIKE '%ideal%';"
    mysql -u root -p -e "USE diravenir1; SHOW TABLES LIKE '%mapping%';"
    
    echo.
    echo - Contenu des tables:
    mysql -u root -p -e "USE diravenir1; SELECT COUNT(*) as total_profils FROM ideal_profiles;"
    mysql -u root -p -e "USE diravenir1; SELECT COUNT(*) as total_mappings FROM major_program_mapping;"
    
    echo.
    echo - Verification des profils:
    mysql -u root -p -e "USE diravenir1; SELECT major_name, COUNT(*) as nombre_piliers FROM orientation_majors om JOIN ideal_profiles ip ON om.id = ip.major_id GROUP BY om.id, om.major_name ORDER BY om.id;"
    
    echo.
    echo ========================================
    echo SYSTÈME D'ORIENTATION CORRIGÉ!
    echo ========================================
    echo.
    echo Prochaines etapes:
    echo 1. Tester l'API REST
    echo 2. Passer a la Phase 2 (Frontend)
    echo.
) else (
    echo.
    echo ========================================
    echo ERREUR: La correction a echoue!
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
