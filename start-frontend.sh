#!/bin/bash

echo "========================================"
echo "   DIRAVENIR - DEMARRAGE FRONTEND"
echo "========================================"
echo

cd frontend

echo "Verification des ports disponibles..."
echo

# Fonction pour tester un port
test_port() {
    local port=$1
    if ! lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo "Port $port disponible"
        return 0
    else
        echo "Port $port occupe"
        return 1
    fi
}

# Tester les ports dans l'ordre de preference
PORT=""

if test_port 3000; then
    PORT=3000
elif test_port 5173; then
    PORT=5173
elif test_port 5174; then
    PORT=5174
elif test_port 5175; then
    PORT=5175
else
    echo "Aucun port disponible, utilisation du port par defaut"
    PORT=5173
fi

echo
echo "========================================"
echo "   DEMARRAGE SUR LE PORT $PORT"
echo "========================================"
echo

# Creer un fichier .env.local avec le port
cat > .env.local << EOF
VITE_PORT=$PORT
VITE_API_URL=http://localhost:8084
EOF

echo "Configuration creee:"
echo "- Port frontend: $PORT"
echo "- API backend: http://localhost:8084"
echo

echo "Demarrage de l'application..."
echo
echo "URL d'acces: http://localhost:$PORT"
echo
echo "Appuyez sur Ctrl+C pour arreter"
echo

# Demarrer Vite avec le port specifique
npm run dev -- --port $PORT --host
