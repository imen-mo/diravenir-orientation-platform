@echo off
echo ========================================
echo    TEST SIMPLE - Diagnostic MySQL
echo ========================================
echo.

echo Test 1: Verification des droits...
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Pas de droits administrateur
    echo SOLUTION: Clic droit → "Executer en tant qu'administrateur"
) else (
    echo ✅ Droits administrateur OK
)

echo.
echo Test 2: Recherche de MySQL...
echo.

REM Chercher MySQL dans les emplacements communs
if exist "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqldump.exe" (
    echo ✅ MySQL trouve: C:\Program Files\MySQL\MySQL Server 8.0\bin\
    set MYSQL_FOUND=1
    set MYSQL_PATH=C:\Program Files\MySQL\MySQL Server 8.0\bin\
) else if exist "C:\Program Files (x86)\MySQL\MySQL Server 8.0\bin\mysqldump.exe" (
    echo ✅ MySQL trouve: C:\Program Files (x86)\MySQL\MySQL Server 8.0\bin\
    set MYSQL_FOUND=1
    set MYSQL_PATH=C:\Program Files (x86)\MySQL\MySQL Server 8.0\bin\
) else if exist "C:\xampp\mysql\bin\mysqldump.exe" (
    echo ✅ MySQL trouve: C:\xampp\mysql\bin\
    set MYSQL_FOUND=1
    set MYSQL_PATH=C:\xampp\mysql\bin\
) else if exist "C:\wamp64\bin\mysql\mysql8.0.21\bin\mysqldump.exe" (
    echo ✅ MySQL trouve: C:\wamp64\bin\mysql\mysql8.0.21\bin\
    set MYSQL_FOUND=1
    set MYSQL_PATH=C:\wamp64\bin\mysql\mysql8.0.21\bin\
) else (
    echo ❌ MySQL non trouve automatiquement
    set MYSQL_FOUND=0
)

echo.
echo Test 3: Test de connexion MySQL...
if "%MYSQL_FOUND%"=="1" (
    echo Utilisation du chemin: %MYSQL_PATH%
    "%MYSQL_PATH%mysql.exe" --version
    if %errorlevel% neq 0 (
        echo ❌ MySQL ne fonctionne pas
    ) else (
        echo ✅ MySQL fonctionne
    )
) else (
    echo ❌ Impossible de tester MySQL (non trouve)
)

echo.
echo Test 4: Test de la base diravenir...
if "%MYSQL_FOUND%"=="1" (
    echo Test de connexion a la base diravenir...
    "%MYSQL_PATH%mysql.exe" -u root -p -e "USE diravenir; SELECT COUNT(*) FROM programs;" 2>nul
    if %errorlevel% neq 0 (
        echo ❌ Base diravenir inaccessible
        echo CAUSES POSSIBLES:
        echo - Mot de passe incorrect
        echo - Base diravenir n'existe pas
        echo - MySQL non demarre
    ) else (
        echo ✅ Base diravenir accessible
    )
)

echo.
echo ========================================
echo    RESUME DU DIAGNOSTIC
echo ========================================
echo.

if "%MYSQL_FOUND%"=="1" (
    echo ✅ MySQL INSTALLE: %MYSQL_PATH%
    echo.
    echo PROCHAINES ETAPES:
    echo 1. Assurez-vous que MySQL est demarre
    echo 2. Verifiez votre mot de passe root
    echo 3. Executez le script de backup
) else (
    echo ❌ MySQL NON TROUVE
    echo.
    echo SOLUTIONS:
    echo 1. Installez MySQL: https://dev.mysql.com/downloads/mysql/
    echo 2. Ou installez XAMPP: https://www.apachefriends.org/
    echo 3. Ou ajoutez MySQL au PATH systeme
)

echo.
pause
