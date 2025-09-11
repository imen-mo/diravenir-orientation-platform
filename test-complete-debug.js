// Test de debug pour l'endpoint /complete
const BASE_URL = 'http://localhost:8084';

// Données de test simplifiées
const TEST_DATA = {
    q1: 'A',
    q2: 'C', 
    q3: 'B',
    q4: 'A',
    q5: 'C',
    q6: 'B',
    q7: 'A',
    q8: 'C',
    q9: '{"security": 70, "innovation": 80, "autonomy": 60, "salary": 50}',
    q10: 'B',
    q11: 'A',
    q12: 'C',
    q13: 'B',
    q14: 'A',
    studentInfo: {
        fullName: 'Debug Test User',
        email: 'debug.test@diravenir.com',
        phone: '+33123456789'
    }
};

async function testCompleteDebug() {
    console.log('🔍 Test de debug pour l\'endpoint /complete...');
    console.log('📤 Données envoyées:', JSON.stringify(TEST_DATA, null, 2));
    
    try {
        const response = await fetch(`${BASE_URL}/api/orientation/complete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(TEST_DATA)
        });

        const responseText = await response.text();
        console.log(`📊 Status: ${response.status} ${response.statusText}`);
        console.log('📄 Réponse brute:', responseText);
        
        if (response.ok) {
            const data = JSON.parse(responseText);
            console.log('✅ Succès!');
            console.log('📝 Test UUID:', data.testUuid);
            console.log('💾 Résultats:', data.results ? 'Sauvegardés' : 'Non sauvegardés');
        } else {
            console.log('❌ Erreur HTTP:', response.status);
            try {
                const errorData = JSON.parse(responseText);
                console.log('📄 Détails de l\'erreur:', JSON.stringify(errorData, null, 2));
            } catch (e) {
                console.log('📄 Réponse non-JSON:', responseText);
            }
        }
    } catch (error) {
        console.log('❌ Erreur réseau:', error.message);
    }
}

// Test de l'endpoint /calculate pour comparaison
async function testCalculateDebug() {
    console.log('\n🧮 Test de l\'endpoint /calculate pour comparaison...');
    
    try {
        const response = await fetch(`${BASE_URL}/api/orientation/calculate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(TEST_DATA)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('✅ /calculate fonctionne');
            console.log('📊 Recommandations:', data.recommendations.length);
        } else {
            console.log('❌ /calculate ne fonctionne pas:', response.status);
        }
    } catch (error) {
        console.log('❌ Erreur /calculate:', error.message);
    }
}

// Exécution des tests
async function runDebugTests() {
    await testCalculateDebug();
    await testCompleteDebug();
}

runDebugTests().catch(console.error);
