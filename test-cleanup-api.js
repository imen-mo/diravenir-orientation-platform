const http = require('http');

// Configuration
const BASE_URL = 'http://localhost:8084';

// Fonction pour faire une requête HTTP
function makeRequest(url, data) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        const options = {
            hostname: urlObj.hostname,
            port: urlObj.port,
            path: urlObj.pathname,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }
        };

        const req = http.request(options, (res) => {
            let responseData = '';
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            res.on('end', () => {
                try {
                    const jsonResponse = JSON.parse(responseData);
                    resolve({
                        status: res.statusCode,
                        data: jsonResponse
                    });
                } catch (e) {
                    reject(new Error(`Erreur de parsing JSON: ${e.message}`));
                }
            });
        });

        req.on('error', (e) => {
            reject(e);
        });
        req.write(data);
        req.end();
    });
}

async function cleanupDuplicates() {
    console.log('🧹 Nettoyage des doublons via l\'API...');
    
    try {
        // Test avec un profil unique pour éviter les doublons
        const testData = {
            studentInfo: { 
                email: `cleanup-test-${Date.now()}@example.com`, 
                fullName: 'Test Cleanup', 
                phone: '123456789' 
            },
            q1: 'A', q2: 'A', q3: 'A', q4: 'A', q5: 'A', 
            q6: 'A', q7: 'A', q8: 'A', q9: 'A', q10: 'A', 
            q11: 'A', q12: 'A', q13: 'A', q14: 'A'
        };

        const response = await makeRequest(BASE_URL + '/api/orientation/complete', JSON.stringify(testData));
        
        if (response.status === 200) {
            console.log('✅ Test de nettoyage réussi!');
            console.log('📊 Résultats:', JSON.stringify(response.data.results, null, 2));
        } else {
            console.log('❌ Erreur:', response.status, response.data);
        }
        
    } catch (error) {
        console.log('❌ Erreur de connexion:', error.message);
    }
}

// Exécuter le nettoyage
cleanupDuplicates();
