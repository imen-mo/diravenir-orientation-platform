# Script PowerShell pour ajouter TOUS les profils idéaux des 44 majeures
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Ajout de TOUS les profils ideaux (44 majeures)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Vérification de MySQL
Write-Host "1. Verification de MySQL..." -ForegroundColor Yellow
try {
    $mysqlPath = Get-Command mysql -ErrorAction Stop
    Write-Host "✅ MySQL trouve: $($mysqlPath.Source)" -ForegroundColor Green
} catch {
    Write-Host "❌ MySQL non trouve dans le PATH" -ForegroundColor Red
    Write-Host "Veuillez ajouter MySQL au PATH ou specifier le chemin complet" -ForegroundColor Red
    Write-Host "Exemple: C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -ForegroundColor Yellow
    pause
    exit 1
}

# 2. Exécution du script complet des profils idéaux
Write-Host "2. Execution du script complet des profils ideaux..." -ForegroundColor Yellow
try {
    $result = & mysql -u root -p -e "source add-all-44-ideal-profiles.sql" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Tous les profils ideaux ajoutes avec succes" -ForegroundColor Green
    } else {
        Write-Host "❌ Erreur lors de l'ajout des profils ideaux" -ForegroundColor Red
        Write-Host $result -ForegroundColor Red
        pause
        exit 1
    }
} catch {
    Write-Host "❌ Erreur lors de l'execution de MySQL" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    pause
    exit 1
}

# 3. Vérification de la base de données
Write-Host "3. Verification de la base de donnees..." -ForegroundColor Yellow
try {
    $result = & mysql -u root -p -e "USE diravenir; SELECT COUNT(*) as total_majors FROM orientation_majors; SELECT COUNT(*) as total_profiles FROM ideal_profiles; SELECT m.major_name, COUNT(p.id) as profiles_count FROM orientation_majors m LEFT JOIN ideal_profiles p ON m.id = p.major_id GROUP BY m.id, m.major_name ORDER BY m.id;" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Verification reussie" -ForegroundColor Green
        Write-Host $result -ForegroundColor White
    } else {
        Write-Host "❌ Erreur lors de la verification" -ForegroundColor Red
        Write-Host $result -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Erreur lors de la verification" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ Configuration complete des 44 majeures !" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Vous pouvez maintenant redemarrer l'application Spring Boot" -ForegroundColor White
Write-Host "L'application sera accessible sur le port 8084" -ForegroundColor White
Write-Host ""
pause
