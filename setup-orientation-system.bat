@echo off
echo ========================================
echo Configuration du Systeme d'Orientation
echo ========================================
echo.

echo 1. Arret de l'application Spring Boot...
taskkill /F /IM java.exe 2>nul
timeout /t 3 /nobreak >nul

echo 2. Execution du script d'ajout des 44 majeures...
mysql -u root -p -e "source add-all-44-majors.sql"

if %errorlevel% neq 0 (
    echo ❌ Erreur lors de l'ajout des majeures
    pause
    exit /b 1
)

echo ✅ 44 majeures ajoutees avec succes

echo 3. Execution du script d'ajout des profils ideaux...
mysql -u root -p -e "source add-ideal-profiles.sql"

if %errorlevel% neq 0 (
    echo ❌ Erreur lors de l'ajout des profils ideaux
    pause
    exit /b 1
)

echo ✅ Profils ideaux ajoutes avec succes

echo 4. Verification de la base de donnees...
mysql -u root -p -e "USE diravenir; SELECT COUNT(*) as total_majors FROM orientation_majors; SELECT COUNT(*) as total_profiles FROM ideal_profiles;"

echo.
echo ========================================
echo ✅ Configuration terminee avec succes !
echo ========================================
echo.
echo Vous pouvez maintenant redemarrer l'application Spring Boot
echo L'application sera accessible sur le port 8084
echo.
pause
