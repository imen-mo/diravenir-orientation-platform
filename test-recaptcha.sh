#!/bin/bash

# 🧪 Script de Test reCAPTCHA v3 - Diravenir
# Ce script teste l'intégration complète reCAPTCHA v3

echo "🧪 Test reCAPTCHA v3 - Diravenir"
echo "=================================="

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
BACKEND_URL="http://localhost:8084"
FRONTEND_URL="http://localhost:5173"
API_ENDPOINT="${BACKEND_URL}/api/recaptcha"

# Fonction pour afficher les résultats
print_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
    fi
}

print_info() {
    echo -e "${BLUE}ℹ️ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

# Vérifier que les services sont démarrés
echo -e "\n${BLUE}🔍 Vérification des services...${NC}"

# Test du backend
if curl -s "${BACKEND_URL}/actuator/health" > /dev/null 2>&1; then
    print_result 0 "Backend Spring Boot démarré"
else
    print_result 1 "Backend Spring Boot non accessible"
    print_warning "Démarrez le backend avec: cd src && mvn spring-boot:run"
    exit 1
fi

# Test du frontend
if curl -s "${FRONTEND_URL}" > /dev/null 2>&1; then
    print_result 0 "Frontend React démarré"
else
    print_result 1 "Frontend React non accessible"
    print_warning "Démarrez le frontend avec: cd frontend && npm run dev"
fi

# Test des endpoints reCAPTCHA
echo -e "\n${BLUE}🔍 Test des endpoints reCAPTCHA...${NC}"

# Test de l'endpoint info
if curl -s "${API_ENDPOINT}/info" > /dev/null 2>&1; then
    print_result 0 "Endpoint /api/recaptcha/info accessible"
    
    # Afficher les informations
    echo -e "\n${BLUE}📊 Informations reCAPTCHA:${NC}"
    curl -s "${API_ENDPOINT}/info" | jq '.' 2>/dev/null || curl -s "${API_ENDPOINT}/info"
else
    print_result 1 "Endpoint /api/recaptcha/info non accessible"
fi

# Test avec un token factice
echo -e "\n${BLUE}🔍 Test avec token factice...${NC}"

TEST_TOKEN="test_token_123"
TEST_ACTION="submit"

# Test basique
if curl -s -X POST "${API_ENDPOINT}/test" \
    -H "Content-Type: application/json" \
    -d "{\"token\":\"${TEST_TOKEN}\",\"action\":\"${TEST_ACTION}\"}" > /dev/null 2>&1; then
    print_result 0 "Endpoint /api/recaptcha/test accessible"
else
    print_result 1 "Endpoint /api/recaptcha/test non accessible"
fi

# Test signup
if curl -s -X POST "${API_ENDPOINT}/test/signup" \
    -H "Content-Type: application/json" \
    -d "{\"token\":\"${TEST_TOKEN}\"}" > /dev/null 2>&1; then
    print_result 0 "Endpoint /api/recaptcha/test/signup accessible"
else
    print_result 1 "Endpoint /api/recaptcha/test/signup non accessible"
fi

# Test signin
if curl -s -X POST "${API_ENDPOINT}/test/signin" \
    -H "Content-Type: application/json" \
    -d "{\"token\":\"${TEST_TOKEN}\"}" > /dev/null 2>&1; then
    print_result 0 "Endpoint /api/recaptcha/test/signin accessible"
else
    print_result 1 "Endpoint /api/recaptcha/test/signin non accessible"
fi

# Test strict
if curl -s -X POST "${API_ENDPOINT}/test/strict" \
    -H "Content-Type: application/json" \
    -d "{\"token\":\"${TEST_TOKEN}\",\"action\":\"${TEST_ACTION}\"}" > /dev/null 2>&1; then
    print_result 0 "Endpoint /api/recaptcha/test/strict accessible"
else
    print_result 1 "Endpoint /api/recaptcha/test/strict non accessible"
fi

# Vérification des variables d'environnement
echo -e "\n${BLUE}🔍 Vérification de la configuration...${NC}"

# Vérifier le fichier .env
if [ -f ".env" ]; then
    print_result 0 "Fichier .env trouvé"
    
    # Vérifier les variables reCAPTCHA
    if grep -q "RECAPTCHA_SECRET" .env; then
        print_result 0 "RECAPTCHA_SECRET configuré"
    else
        print_warning "RECAPTCHA_SECRET manquant dans .env"
    fi
    
    if grep -q "RECAPTCHA_SCORE_THRESHOLD" .env; then
        print_result 0 "RECAPTCHA_SCORE_THRESHOLD configuré"
    else
        print_warning "RECAPTCHA_SCORE_THRESHOLD manquant dans .env"
    fi
else
    print_warning "Fichier .env non trouvé"
    print_info "Copiez env.example vers .env et configurez vos variables"
fi

# Vérifier le frontend .env
if [ -f "frontend/.env" ]; then
    print_result 0 "Fichier frontend/.env trouvé"
    
    if grep -q "VITE_RECAPTCHA_SITE_KEY" frontend/.env; then
        print_result 0 "VITE_RECAPTCHA_SITE_KEY configuré"
    else
        print_warning "VITE_RECAPTCHA_SITE_KEY manquant dans frontend/.env"
    fi
else
    print_warning "Fichier frontend/.env non trouvé"
    print_info "Copiez frontend/env.example vers frontend/.env et configurez vos variables"
fi

# Instructions de test
echo -e "\n${BLUE}📋 Instructions de test manuel:${NC}"
echo -e "${GREEN}1.${NC} Ouvrez votre navigateur sur: ${FRONTEND_URL}/recaptcha-test"
echo -e "${GREEN}2.${NC} Utilisez l'interface de test pour valider reCAPTCHA"
echo -e "${GREEN}3.${NC} Vérifiez les logs du backend pour les détails"
echo -e "${GREEN}4.${NC} Testez l'inscription et la connexion avec reCAPTCHA"

# Test de l'authentification
echo -e "\n${BLUE}🔍 Test de l'authentification...${NC}"

# Test de l'endpoint signup
if curl -s -X POST "${BACKEND_URL}/api/auth/signup" \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"test@example.com\",\"password\":\"Test123!\",\"confirmPassword\":\"Test123!\",\"nom\":\"Test\",\"prenom\":\"User\",\"recaptchaToken\":\"${TEST_TOKEN}\"}" > /dev/null 2>&1; then
    print_result 0 "Endpoint /api/auth/signup accessible"
else
    print_result 1 "Endpoint /api/auth/signup non accessible"
fi

# Test de l'endpoint signin
if curl -s -X POST "${BACKEND_URL}/api/auth/signin" \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"test@example.com\",\"password\":\"Test123!\",\"recaptchaToken\":\"${TEST_TOKEN}\"}" > /dev/null 2>&1; then
    print_result 0 "Endpoint /api/auth/signin accessible"
else
    print_result 1 "Endpoint /api/auth/signin non accessible"
fi

echo -e "\n${GREEN}🎉 Test reCAPTCHA v3 terminé !${NC}"
echo -e "${BLUE}📚 Consultez RECAPTCHA_V3_COMPLETE_GUIDE.md pour plus de détails${NC}"
echo -e "${BLUE}🧪 Utilisez l'interface de test pour valider l'intégration complète${NC}"
