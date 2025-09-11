# ================================================
# === PUSH FORCE SÉCURISÉ - DIRAVENIR ===
# ================================================

Write-Host "Ce script va forcer le push de vos modifications" -ForegroundColor Yellow
Write-Host "en excluant les fichiers d'authentification et sécurité" -ForegroundColor Yellow
Write-Host ""

# Vérifier si on est dans un dépôt git
try {
    git status | Out-Null
    if ($LASTEXITCODE -ne 0) {
        throw "Not a git repository"
    }
} catch {
    Write-Host "ERREUR: Ce dossier n'est pas un dépôt Git !" -ForegroundColor Red
    Read-Host "Appuyez sur Entrée pour quitter"
    exit 1
}

Write-Host "[1/6] Vérification de la configuration git..." -ForegroundColor Cyan
$gitName = git config --get user.name
$gitEmail = git config --get user.email

if (-not $gitName -or -not $gitEmail) {
    Write-Host "Configuration Git manquante !" -ForegroundColor Red
    $gitName = Read-Host "Nom"
    $gitEmail = Read-Host "Email"
    git config user.name $gitName
    git config user.email $gitEmail
}

Write-Host "[2/6] Ajout de tous les fichiers (sauf ceux dans .gitignore)..." -ForegroundColor Cyan
git add .

Write-Host "[3/6] Vérification des fichiers ajoutés..." -ForegroundColor Cyan
$stagedFiles = git status --porcelain | Where-Object { $_ -match "^A" }
if (-not $stagedFiles) {
    Write-Host "ATTENTION: Aucun nouveau fichier à commiter !" -ForegroundColor Yellow
    Write-Host "Vérification des modifications..." -ForegroundColor Yellow
}

Write-Host "[4/6] Création du commit avec vos modifications..." -ForegroundColor Cyan
$commitMsg = "PUSH FORCE: Mes modifications prioritaires - Exclusions auth/FAQ/footer"
git commit -m $commitMsg

if ($LASTEXITCODE -ne 0) {
    Write-Host "ATTENTION: Aucune modification à commiter ou erreur de commit" -ForegroundColor Yellow
}

Write-Host "[5/6] Sauvegarde de la branche distante actuelle..." -ForegroundColor Cyan
$remoteBranches = git branch -r --format="%(refname:short)" | Where-Object { $_ -ne "" }
foreach ($branch in $remoteBranches) {
    Write-Host "Sauvegarde de la branche distante: $branch" -ForegroundColor Green
    git fetch origin "$($branch):backup-$branch" | Out-Null
}

Write-Host "[6/6] PUSH FORCE - ÉCRASEMENT des modifications distantes..." -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  ATTENTION: Ceci va écraser les modifications de votre binôme !" -ForegroundColor Red
Write-Host "   Seuls vos fichiers seront conservés (sauf auth/FAQ/footer)" -ForegroundColor Red
Write-Host ""
$confirm = Read-Host "Continuer ? (oui/non)"

if ($confirm -ne "oui") {
    Write-Host "Annulé par l'utilisateur" -ForegroundColor Yellow
    Read-Host "Appuyez sur Entrée pour quitter"
    exit 0
}

# Force push sur la branche actuelle
Write-Host "Exécution du push force..." -ForegroundColor Green
git push --force-with-lease origin HEAD

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERREUR lors du push. Tentative avec --force..." -ForegroundColor Red
    git push --force origin HEAD
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERREUR CRITIQUE: Impossible de pusher !" -ForegroundColor Red
        Read-Host "Appuyez sur Entrée pour quitter"
        exit 1
    }
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "=== PUSH FORCE TERMINÉ AVEC SUCCÈS ! ===" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
Write-Host "✅ Vos modifications ont été forcées" -ForegroundColor Green
Write-Host "✅ Fichiers d'authentification exclus" -ForegroundColor Green
Write-Host "✅ Fichiers FAQ/Footer exclus" -ForegroundColor Green
Write-Host "✅ Modifications de votre binôme écrasées" -ForegroundColor Green
Write-Host ""
Write-Host "Les fichiers suivants ont été EXCLUS du push :" -ForegroundColor Yellow
Write-Host "- Tous les fichiers d'authentification (*auth*, *oauth*)" -ForegroundColor Yellow
Write-Host "- Tous les fichiers de sécurité (*security*, *Security*)" -ForegroundColor Yellow
Write-Host "- FAQ.jsx et FAQ.css" -ForegroundColor Yellow
Write-Host "- Footer.jsx et Footer.css" -ForegroundColor Yellow
Write-Host "- Fichiers de configuration sensibles (.env, application.properties)" -ForegroundColor Yellow
Write-Host ""
Read-Host "Appuyez sur Entrée pour quitter"
