# Script PowerShell pour configurer le système d'orientation
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Configuration du Systeme d'Orientation" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Arrêt de l'application Spring Boot
Write-Host "1. Arret de l'application Spring Boot..." -ForegroundColor Yellow
Get-Process -Name "java" -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 3

# 2. Vérification de MySQL
Write-Host "2. Verification de MySQL..." -ForegroundColor Yellow
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

# 3. Exécution du script d'ajout des 44 majeures
Write-Host "3. Execution du script d'ajout des 44 majeures..." -ForegroundColor Yellow
try {
    $result = & mysql -u root -p -e "source add-all-44-majors.sql" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ 44 majeures ajoutees avec succes" -ForegroundColor Green
    } else {
        Write-Host "❌ Erreur lors de l'ajout des majeures" -ForegroundColor Red
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

# 4. Exécution du script d'ajout des profils idéaux
Write-Host "4. Execution du script d'ajout des profils ideaux..." -ForegroundColor Yellow
try {
    $result = & mysql -u root -p -e "source add-ideal-profiles.sql" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Profils ideaux ajoutes avec succes" -ForegroundColor Green
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

# 5. Vérification de la base de données
Write-Host "5. Verification de la base de donnees..." -ForegroundColor Yellow
try {
    $result = & mysql -u root -p -e "USE diravenir; SELECT COUNT(*) as total_majors FROM orientation_majors; SELECT COUNT(*) as total_profiles FROM ideal_profiles;" 2>&1
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
Write-Host "✅ Configuration terminee avec succes !" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Vous pouvez maintenant redemarrer l'application Spring Boot" -ForegroundColor White
Write-Host "L'application sera accessible sur le port 8084" -ForegroundColor White
Write-Host ""
pause
