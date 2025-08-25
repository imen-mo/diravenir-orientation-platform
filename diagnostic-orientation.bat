@echo off
echo ========================================
echo DIAGNOSTIC SYSTEME D'ORIENTATION
echo ========================================
echo.

echo 1. Vérification des tables existantes...
mysql -u root -p -e "USE diravenir1; SHOW TABLES LIKE '%orientation%';"
echo.

echo 2. Vérification des tables existantes...
mysql -u root -p -e "USE diravenir1; SHOW TABLES LIKE '%ideal%';"
echo.

echo 3. Vérification des tables existantes...
mysql -u root -p -e "USE diravenir1; SHOW TABLES LIKE '%mapping%';"
echo.

echo 4. Vérification de la structure de la table program...
mysql -u root -p -e "USE diravenir1; DESCRIBE program;"
echo.

echo 5. Vérification du contenu de la table program...
mysql -u root -p -e "USE diravenir1; SELECT COUNT(*) as total_programs FROM program;"
echo.

echo 6. Vérification des contraintes existantes...
mysql -u root -p -e "USE diravenir1; SELECT CONSTRAINT_NAME, TABLE_NAME, COLUMN_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME FROM information_schema.KEY_COLUMN_USAGE WHERE TABLE_NAME IN ('ideal_profiles', 'major_program_mapping', 'orientation_majors') AND REFERENCED_TABLE_NAME IS NOT NULL;"
echo.

echo ========================================
echo DIAGNOSTIC TERMINE
echo ========================================
pause
