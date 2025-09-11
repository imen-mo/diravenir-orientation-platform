#!/bin/bash

echo "========================================"
echo "   Script de Partage de Base de Donnees"
echo "   DIRAVENIR ORIENTATION SYSTEM"
echo "========================================"
echo

# Configuration des variables
DB_NAME="diravenir"
BACKUP_DIR="backup"
SHARE_DIR="shared_database"

echo "[1/4] Creation du dossier de partage..."
mkdir -p "$SHARE_DIR"

echo "[2/4] Creation du backup de la base de donnees..."
mkdir -p "$BACKUP_DIR"

# Export de la structure et des donnees
echo "Export de la structure de la base de donnees..."
mysqldump -u root -p --routines --triggers --single-transaction --add-drop-database --databases "$DB_NAME" > "$BACKUP_DIR/diravenir_complete_backup.sql"

if [ $? -ne 0 ]; then
    echo "ERREUR: Impossible de creer le backup de la base de donnees"
    echo "Verifiez que MySQL est demarre et que les identifiants sont corrects"
    exit 1
fi

echo "[3/4] Creation du script de restauration..."
cat > "$SHARE_DIR/restore-database.sh" << 'EOF'
#!/bin/bash

echo "========================================"
echo "   Script de Restauration de Base de Donnees"
echo "   DIRAVENIR ORIENTATION SYSTEM"
echo "========================================"
echo
echo "Ce script va restaurer la base de donnees DIRAVENIR"
echo
read -p "Appuyez sur Entree pour continuer..."

echo "[1/3] Connexion a MySQL..."
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS diravenir_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

echo "[2/3] Restauration des donnees..."
mysql -u root -p diravenir_db < diravenir_complete_backup.sql

echo "[3/3] Verification de la restauration..."
mysql -u root -p -e "USE diravenir_db; SHOW TABLES;"

echo
echo "Base de donnees restauree avec succes!"
echo "Vous pouvez maintenant demarrer l'application."
EOF

chmod +x "$SHARE_DIR/restore-database.sh"

echo "[4/4] Copie des fichiers de partage..."
cp "$BACKUP_DIR/diravenir_complete_backup.sql" "$SHARE_DIR/"
cp "README_DATABASE_SHARE.md" "$SHARE_DIR/" 2>/dev/null

echo
echo "========================================"
echo "   PARTAGE TERMINE AVEC SUCCES!"
echo "========================================"
echo
echo "Fichiers crees dans le dossier: $SHARE_DIR/"
echo "- diravenir_complete_backup.sql (backup complet)"
echo "- restore-database.sh (script de restauration)"
echo "- README_DATABASE_SHARE.md (instructions)"
echo
echo "Instructions pour votre binome:"
echo "1. Copiez tout le dossier '$SHARE_DIR' sur votre ordinateur"
echo "2. Executez 'chmod +x restore-database.sh' pour rendre le script executable"
echo "3. Executez './restore-database.sh'"
echo "4. Suivez les instructions a l'ecran"
echo
echo "Vous pouvez maintenant partager le dossier '$SHARE_DIR' avec votre binome."
echo
