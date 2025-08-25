@echo off
echo ========================================
echo Ajout de TOUS les profils ideaux (44 majeures)
echo ========================================
echo.

echo 1. Execution du script complet des profils ideaux...
mysql -u root -p -e "source add-all-44-ideal-profiles.sql"

if %errorlevel% neq 0 (
    echo ❌ Erreur lors de l'ajout des profils ideaux
    pause
    exit /b 1
)

echo ✅ Tous les profils ideaux ajoutes avec succes !

echo 2. Verification de la base de donnees...
mysql -u root -p -e "USE diravenir; SELECT COUNT(*) as total_majors FROM orientation_majors; SELECT COUNT(*) as total_profiles FROM ideal_profiles; SELECT m.major_name, COUNT(p.id) as profiles_count FROM orientation_majors m LEFT JOIN ideal_profiles p ON m.id = p.major_id GROUP BY m.id, m.major_name ORDER BY m.id;"

echo.
echo ========================================
echo ✅ Configuration complete des 44 majeures !
echo ========================================
echo.
echo Vous pouvez maintenant redemarrer l'application Spring Boot
echo L'application sera accessible sur le port 8084
echo.
pause
