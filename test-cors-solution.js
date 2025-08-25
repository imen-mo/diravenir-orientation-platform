// Script de test pour la solution CORS ultime
console.log('🧪 Test de la solution CORS ultime pour Diravenir');

// Test de l'URL de l'API
const API_URL = 'http://localhost:8084';
const LOGIN_ENDPOINT = '/api/auth/login';

console.log('🔗 URL de test:', API_URL + LOGIN_ENDPOINT);

// Test de la requête CORS
async function testCORS() {
    try {
        console.log('🚀 Test de la requête CORS...');
        
        const response = await fetch(API_URL + LOGIN_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'admin@diravenir.com',
                password: 'test'
            }),
            credentials: 'include'
        });
        
        console.log('✅ Réponse reçue:', response.status, response.statusText);
        
        if (response.ok) {
            const data = await response.json();
            console.log('📦 Données reçues:', data);
        } else {
            console.log('⚠️ Erreur HTTP:', response.status);
        }
        
    } catch (error) {
        console.error('❌ Erreur CORS:', error.message);
        
        if (error.message.includes('CORS')) {
            console.log('🔧 Problème CORS détecté - Vérifiez la configuration backend');
        } else if (error.message.includes('fetch')) {
            console.log('🌐 Problème réseau - Vérifiez que le backend est démarré');
        }
    }
}

// Test de connectivité
async function testConnectivity() {
    try {
        console.log('🔍 Test de connectivité...');
        
        const response = await fetch(API_URL + '/api/health');
        console.log('✅ Connectivité OK:', response.status);
        
    } catch (error) {
        console.log('❌ Problème de connectivité:', error.message);
    }
}

// Exécution des tests
console.log('🧪 Démarrage des tests...');
setTimeout(() => {
    testConnectivity();
    setTimeout(() => {
        testCORS();
    }, 1000);
}, 2000);

console.log('📋 Tests programmés - Attendez que le backend soit prêt...');
