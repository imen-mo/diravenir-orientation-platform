const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:8084';

async function testSimpleOrientation() {
    console.log('🧪 Test simple de l\'endpoint /complete...\n');
    
    const testData = {
        "q1": "B",
        "q2": "A", 
        "q3": "C",
        "q4": "B",
        "q5": "A",
        "q6": "C",
        "q7": "B",
        "q8": "A",
        "q9": "{\"security\": 60, \"innovation\": 70, \"autonomy\": 80, \"salary\": 40}",
        "q10": "C",
        "q11": "B",
        "q12": "A",
        "q13": "C",
        "q14": "B",
        "studentInfo": {
            "fullName": "Test Simple User",
            "email": "test.simple@diravenir.com",
            "phone": "+33987654321"
        }
    };
    
    try {
        console.log('📤 Envoi des données de test...');
        const response = await fetch(`${BASE_URL}/api/orientation/complete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });
        
        console.log(`📊 Status: ${response.status}`);
        
        if (response.ok) {
            const result = await response.json();
            console.log('✅ Test réussi!');
            console.log(`📋 Test UUID: ${result.testUuid}`);
            console.log(`🎯 Meilleure recommandation: ${result.results?.topRecommendationMajor}`);
            console.log(`📈 Score: ${result.results?.topRecommendationScore?.toFixed(2)}`);
            console.log(`📊 Méthode: ${result.results?.calculationMethod}`);
        } else {
            const errorText = await response.text();
            console.log('❌ Erreur HTTP:', response.status);
            console.log('📄 Réponse:', errorText);
        }
        
    } catch (error) {
        console.log('❌ Erreur réseau:', error.message);
    }
}

// Test de l'endpoint de santé
async function testHealth() {
    try {
        console.log('🏥 Test de l\'endpoint de santé...');
        const response = await fetch(`${BASE_URL}/api/orientation/health`);
        const result = await response.json();
        console.log('✅ API opérationnelle:', result.message);
        console.log('');
    } catch (error) {
        console.log('❌ API non accessible:', error.message);
        console.log('');
    }
}

// Exécution des tests
async function runTests() {
    await testHealth();
    await testSimpleOrientation();
}

runTests();
