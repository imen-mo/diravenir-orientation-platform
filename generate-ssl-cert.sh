#!/bin/bash

# Script pour générer un certificat SSL auto-signé pour le développement

echo "🔐 Génération d'un certificat SSL auto-signé pour Diravenir..."

# Vérifier si keytool est disponible
if ! command -v keytool &> /dev/null; then
    echo "❌ Erreur: keytool n'est pas installé. Veuillez installer Java JDK."
    exit 1
fi

# Paramètres du certificat
KEYSTORE_FILE="keystore.p12"
ALIAS="diravenir"
PASSWORD="diravenir123"
VALIDITY_DAYS=3650

echo "📝 Paramètres du certificat:"
echo "   - Fichier keystore: $KEYSTORE_FILE"
echo "   - Alias: $ALIAS"
echo "   - Validité: $VALIDITY_DAYS jours"

# Générer le certificat
echo "🔨 Génération du certificat..."
keytool -genkeypair \
    -alias "$ALIAS" \
    -keyalg RSA \
    -keysize 2048 \
    -storetype PKCS12 \
    -keystore "$KEYSTORE_FILE" \
    -validity "$VALIDITY_DAYS" \
    -storepass "$PASSWORD" \
    -keypass "$PASSWORD" \
    -dname "CN=Diravenir Development, OU=IT, O=Diravenir, L=City, S=State, C=MA"

if [ $? -eq 0 ]; then
    echo "✅ Certificat généré avec succès!"
    echo ""
    echo "📋 Informations importantes:"
    echo "   - Mot de passe du keystore: $PASSWORD"
    echo "   - Fichier keystore: $KEYSTORE_FILE"
    echo ""
    echo "🔧 Configuration à ajouter dans votre .env:"
    echo "   SSL_ENABLED=true"
    echo "   SSL_KEYSTORE_PASSWORD=$PASSWORD"
    echo ""
    echo "⚠️  ATTENTION: Ce certificat est auto-signé et ne doit être utilisé qu'en développement!"
    echo "   Pour la production, utilisez un certificat SSL valide d'une autorité de certification."
else
    echo "❌ Erreur lors de la génération du certificat"
    exit 1
fi 