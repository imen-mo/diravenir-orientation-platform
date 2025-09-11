const https = require('https');
const http = require('http');

// Configuration
const BASE_URL = 'http://localhost:8084';
const API_ENDPOINT = '/api/orientation/complete';

// Fonction pour faire une requête GET (health check)
function makeHealthRequest(url) {
    return new Promise((resolve, reject) => {
        const urlObj = new URL(url);
        const options = {
            hostname: urlObj.hostname,
            port: urlObj.port,
            path: urlObj.pathname,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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
                } catch (error) {
                    resolve({
                        status: res.statusCode,
                        data: responseData,
                        error: error.message
                    });
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.end();
    });
}

// Fonction pour faire une requête HTTP POST
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
                } catch (error) {
                    resolve({
                        status: res.statusCode,
                        data: responseData,
                        error: error.message
                    });
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.write(data);
        req.end();
    });
}

// Test 1: Profil Artistique/Créatif
async function testArtisticProfile() {
    console.log('🎨 Test 1: Profil Artistique/Créatif');
    console.log('=====================================');
    
    const artisticData = {
        studentInfo: {
            email: "test-artistic@example.com",
            fullName: "Test Artistique",
            phone: "123456789"
        },
        q1: "E", // Créativité
        q2: "B", // Art/Design
        q3: "C", // Art
        q4: "C", // Imaginer
        q5: "C", // Écrire texte
        q6: "A", // Lire
        q7: "C", // Beauté
        q8: "C", // Studio
        q9: "B", // Innovation
        q10: "C", // Rallier gens
        q11: "A", // Seul
        q12: "B", // Histoire
        q13: "B", // Intuition
        q14: "D"  // Arts/Design
    };

    try {
        const response = await makeRequest(BASE_URL + API_ENDPOINT, JSON.stringify(artisticData));
        
        if (response.status === 200) {
            console.log('✅ Succès!');
            console.log('📊 Profil utilisateur:', JSON.stringify(response.data.results.userProfile, null, 2));
            console.log('🎯 Top 3 recommandations:');
            
            if (response.data.results.recommendations) {
                response.data.results.recommendations.forEach((rec, index) => {
                    console.log(`${index + 1}. ${rec.majorName} - ${rec.matchingScore.toFixed(1)}%`);
                    console.log(`   Raison: ${rec.reasoning}`);
                });
            }
        } else {
            console.log('❌ Erreur:', response.status);
            console.log('📄 Réponse:', response.data);
        }
    } catch (error) {
        console.log('❌ Erreur de connexion:', error.message);
    }
    
    console.log('\n');
}

// Test 2: Profil Scientifique/Technique
async function testScientificProfile() {
    console.log('🔬 Test 2: Profil Scientifique/Technique');
    console.log('========================================');
    
    const scientificData = {
        studentInfo: {
            email: "test-scientific@example.com",
            fullName: "Test Scientifique",
            phone: "123456789"
        },
        q1: "B", // Comprendre
        q2: "A", // Découvertes/Tech
        q3: "A", // Électronique
        q4: "A", // Décomposer
        q5: "F", // Équation
        q6: "A", // Lire
        q7: "A", // Améliorer vie
        q8: "A", // Labo
        q9: "B", // Innovation
        q10: "A", // Comprendre
        q11: "B", // Petite équipe
        q12: "A", // Faits
        q13: "A", // Logique
        q14: "A"  // Sciences
    };

    try {
        const response = await makeRequest(BASE_URL + API_ENDPOINT, JSON.stringify(scientificData));
        
        if (response.status === 200) {
            console.log('✅ Succès!');
            console.log('📊 Profil utilisateur:', JSON.stringify(response.data.results.userProfile, null, 2));
            console.log('🎯 Top 3 recommandations:');
            
            if (response.data.results.recommendations) {
                response.data.results.recommendations.forEach((rec, index) => {
                    console.log(`${index + 1}. ${rec.majorName} - ${rec.matchingScore.toFixed(1)}%`);
                    console.log(`   Raison: ${rec.reasoning}`);
                });
            }
        } else {
            console.log('❌ Erreur:', response.status);
            console.log('📄 Réponse:', response.data);
        }
    } catch (error) {
        console.log('❌ Erreur de connexion:', error.message);
    }
    
    console.log('\n');
}

// Test 3: Profil Social/Humain
async function testSocialProfile() {
    console.log('👥 Test 3: Profil Social/Humain');
    console.log('================================');
    
    const socialData = {
        studentInfo: {
            email: "test-social@example.com",
            fullName: "Test Social",
            phone: "123456789"
        },
        q1: "C", // Aider
        q2: "C", // Perso/Social
        q3: "D", // Jeux
        q4: "D", // Autres
        q5: "H", // Conseiller ami
        q6: "D", // Discuter
        q7: "A", // Améliorer vie
        q8: "B", // Bureau coll.
        q9: "A", // Sécurité
        q10: "C", // Rallier gens
        q11: "B", // Petite équipe
        q12: "C", // Interagir
        q13: "C", // Avis autres
        q14: "B"  // Littérature/Langues
    };

    try {
        const response = await makeRequest(BASE_URL + API_ENDPOINT, JSON.stringify(socialData));
        
        if (response.status === 200) {
            console.log('✅ Succès!');
            console.log('📊 Profil utilisateur:', JSON.stringify(response.data.results.userProfile, null, 2));
            console.log('🎯 Top 3 recommandations:');
            
            if (response.data.results.recommendations) {
                response.data.results.recommendations.forEach((rec, index) => {
                    console.log(`${index + 1}. ${rec.majorName} - ${rec.matchingScore.toFixed(1)}%`);
                    console.log(`   Raison: ${rec.reasoning}`);
                });
            }
        } else {
            console.log('❌ Erreur:', response.status);
            console.log('📄 Réponse:', response.data);
        }
    } catch (error) {
        console.log('❌ Erreur de connexion:', error.message);
    }
    
    console.log('\n');
}

// Fonction principale
async function runTests() {
    console.log('🧪 Tests Dynamiques du Système d\'Orientation');
    console.log('=============================================\n');
    
    // Vérifier d'abord si le serveur est en cours d'exécution
    try {
        const healthResponse = await makeHealthRequest(BASE_URL + '/api/orientation/health');
        if (healthResponse.status === 200) {
            console.log('✅ Serveur opérationnel\n');
        } else {
            console.log('❌ Serveur non disponible\n');
            return;
        }
    } catch (error) {
        console.log('❌ Serveur non accessible:', error.message);
        console.log('💡 Assurez-vous que le serveur Spring Boot est démarré sur le port 8084\n');
        return;
    }
    
    // Exécuter les tests
    await testArtisticProfile();
    await testScientificProfile();
    await testSocialProfile();
    
    console.log('🎉 Tests terminés!');
    console.log('📝 Vérifiez que les recommandations sont différentes selon les profils.');
}

// Exécuter les tests
runTests().catch(console.error);
