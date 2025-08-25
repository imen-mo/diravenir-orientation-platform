// Script de test rapide pour la connexion admin
console.log('🔐 Test de connexion admin Diravenir');

const API_URL = 'http://localhost:8084';
const LOGIN_ENDPOINT = '/api/auth/login';

// Test de connectivité
async function testConnectivity() {
    try {
        console.log('🔍 Test de connectivité...');
        const response = await fetch(API_URL + '/api/health');
        console.log('✅ Connectivité OK:', response.status);
        return true;
    } catch (error) {
        console.log('❌ Problème de connectivité:', error.message);
        return false;
    }
}

// Test de connexion admin
async function testAdminLogin() {
    try {
        console.log('🚀 Test de connexion admin...');
        
        const response = await fetch(API_URL + LOGIN_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'admin@diravenir.com',
                password: 'admin123' // Essayez ce mot de passe
            }),
            credentials: 'include'
        });
        
        console.log('✅ Réponse reçue:', response.status, response.statusText);
        
        if (response.ok) {
            const data = await response.json();
            console.log('🎉 Connexion admin réussie!');
            console.log('📦 Données reçues:', data);
            return true;
        } else {
            console.log('⚠️ Erreur HTTP:', response.status);
            const errorData = await response.text();
            console.log('📝 Détails de l\'erreur:', errorData);
            return false;
        }
        
    } catch (error) {
        console.error('❌ Erreur de connexion:', error.message);
        
        if (error.message.includes('CORS')) {
            console.log('🔧 Problème CORS détecté');
        } else if (error.message.includes('fetch')) {
            console.log('🌐 Problème réseau');
        }
        return false;
    }
}

// Test des mots de passe courants
async function testCommonPasswords() {
    const commonPasswords = [
        'admin123',
        'admin',
        'password',
        '123456',
        'admin@diravenir',
        'diravenir',
        'root',
        'administrator'
    ];
    
    console.log('🔑 Test des mots de passe courants...');
    
    for (const password of commonPasswords) {
        try {
            console.log(`🔐 Test avec: ${password}`);
            
            const response = await fetch(API_URL + LOGIN_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: 'admin@diravenir.com',
                    password: password
                }),
                credentials: 'include'
            });
            
            if (response.ok) {
                console.log(`🎉 Mot de passe trouvé: ${password}`);
                const data = await response.json();
                console.log('📦 Données:', data);
                return password;
            } else {
                console.log(`❌ ${password} - Échec (${response.status})`);
            }
            
            // Pause entre les tentatives
            await new Promise(resolve => setTimeout(resolve, 500));
            
        } catch (error) {
            console.log(`❌ Erreur avec ${password}:`, error.message);
        }
    }
    
    console.log('🔍 Aucun mot de passe commun n\'a fonctionné');
    return null;
}

// Exécution des tests
async function runTests() {
    console.log('🧪 Démarrage des tests...');
    
    // Attendre que le backend soit prêt
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    const isConnected = await testConnectivity();
    if (!isConnected) {
        console.log('❌ Backend non accessible - arrêt des tests');
        return;
    }
    
    console.log('✅ Backend accessible - test de connexion admin...');
    
    // Test de connexion directe
    const loginSuccess = await testAdminLogin();
    
    if (!loginSuccess) {
        console.log('🔍 Test des mots de passe courants...');
        await testCommonPasswords();
    }
    
    console.log('🏁 Tests terminés');
}

// Démarrage automatique
runTests();
