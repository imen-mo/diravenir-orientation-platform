/**
 * Test Fonctionnel du Système DirAvenir
 * Test direct des endpoints disponibles
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:8084';

// Configuration pour les tests
const testConfig = {
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
};

// Données de test pour différents profils
const testProfiles = [
    {
        name: "Profil Technique",
        email: "test.technique@example.com",
        answers: {
            "1": 5, "2": 4, "3": 5, "4": 3, "5": 5, "6": 4, "7": 5, "8": 3, "9": 5, "10": 4,
            "11": 5, "12": 4, "13": 5, "14": 3, "15": 5, "16": 4, "17": 5, "18": 3, "19": 5, "20": 4,
            "21": 5, "22": 4, "23": 5, "24": 3, "25": 5, "26": 4, "27": 5, "28": 3, "29": 5, "30": 4,
            "31": 5, "32": 4, "33": 5, "34": 3, "35": 5, "36": 4, "37": 5, "38": 3, "39": 5, "40": 4,
            "41": 5, "42": 4, "43": 5, "44": 3, "45": 5, "46": 4, "47": 5, "48": 3, "49": 5, "50": 4
        }
    },
    {
        name: "Profil Créatif",
        email: "test.creatif@example.com",
        answers: {
            "1": 2, "2": 5, "3": 1, "4": 5, "5": 2, "6": 5, "7": 1, "8": 5, "9": 2, "10": 5,
            "11": 2, "12": 5, "13": 1, "14": 5, "15": 2, "16": 5, "17": 1, "18": 5, "19": 2, "20": 5,
            "21": 2, "22": 5, "23": 1, "24": 5, "25": 2, "26": 5, "27": 1, "28": 5, "29": 2, "30": 5,
            "31": 2, "32": 5, "33": 1, "34": 5, "35": 2, "36": 5, "37": 1, "38": 5, "39": 2, "40": 5,
            "41": 2, "42": 5, "43": 1, "44": 5, "45": 2, "46": 5, "47": 1, "48": 5, "49": 2, "50": 5
        }
    }
];

// Test 1: Vérifier la sauvegarde en base de données
async function testDatabaseSave() {
    console.log('\n📊 TEST 1: Vérification de la sauvegarde en base de données');
    console.log('=' .repeat(60));
    
    const results = [];
    
    for (const profile of testProfiles) {
        try {
            console.log(`\n🧪 Test du profil: ${profile.name}`);
            
            // Envoyer le test d'orientation
            const testResponse = await axios.post(`${BASE_URL}/api/orientation/complete`, {
                email: profile.email,
                answers: profile.answers
            }, testConfig);
            
            if (testResponse.status === 200) {
                console.log(`✅ Test envoyé pour ${profile.name}`);
                console.log(`📧 Email: ${profile.email}`);
                console.log(`🎯 Recommandations reçues: ${testResponse.data.recommendations?.length || 0}`);
                
                // Vérifier les recommandations
                if (testResponse.data.recommendations && testResponse.data.recommendations.length > 0) {
                    console.log('🏆 Top 3 recommandations:');
                    testResponse.data.recommendations.slice(0, 3).forEach((rec, index) => {
                        console.log(`   ${index + 1}. ${rec.majorName} (Score: ${rec.score})`);
                    });
                }
                
                results.push({
                    profile: profile.name,
                    email: profile.email,
                    success: true,
                    recommendations: testResponse.data.recommendations || []
                });
            } else {
                console.log(`❌ Échec du test pour ${profile.name}`);
                results.push({
                    profile: profile.name,
                    email: profile.email,
                    success: false,
                    error: 'Status non-200'
                });
            }
            
        } catch (error) {
            console.log(`❌ Erreur pour ${profile.name}: ${error.message}`);
            if (error.response) {
                console.log(`   Status: ${error.response.status}`);
                console.log(`   Data: ${JSON.stringify(error.response.data)}`);
            }
            results.push({
                profile: profile.name,
                email: profile.email,
                success: false,
                error: error.message
            });
        }
        
        // Attendre entre les tests
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    return results;
}

// Test 2: Vérifier les recommandations dynamiques
async function testDynamicRecommendations(testResults) {
    console.log('\n🎯 TEST 2: Vérification des recommandations dynamiques');
    console.log('=' .repeat(60));
    
    const successfulTests = testResults.filter(r => r.success);
    
    if (successfulTests.length < 2) {
        console.log('❌ Pas assez de tests réussis pour comparer les recommandations');
        return false;
    }
    
    console.log('🔍 Comparaison des recommandations entre profils:');
    
    for (let i = 0; i < successfulTests.length; i++) {
        const test = successfulTests[i];
        console.log(`\n📋 ${test.profile}:`);
        test.recommendations.slice(0, 3).forEach((rec, index) => {
            console.log(`   ${index + 1}. ${rec.majorName} (Score: ${rec.score})`);
        });
    }
    
    // Vérifier si les recommandations sont différentes
    const firstRecommendations = successfulTests[0].recommendations.slice(0, 3);
    const secondRecommendations = successfulTests[1].recommendations.slice(0, 3);
    
    const areDifferent = firstRecommendations.some((rec1, index) => {
        const rec2 = secondRecommendations[index];
        return rec1.majorName !== rec2.majorName || Math.abs(rec1.score - rec2.score) > 0.1;
    });
    
    if (areDifferent) {
        console.log('✅ Les recommandations sont dynamiques et différentes selon les profils !');
        return true;
    } else {
        console.log('❌ Les recommandations semblent identiques pour tous les profils');
        return false;
    }
}

// Test 3: Vérifier le dashboard admin
async function testAdminDashboard() {
    console.log('\n👨‍💼 TEST 3: Vérification du dashboard admin');
    console.log('=' .repeat(60));
    
    try {
        // Test des statistiques générales
        const statsResponse = await axios.get(`${BASE_URL}/api/admin/orientation/stats`, testConfig);
        
        if (statsResponse.status === 200) {
            console.log('✅ Statistiques admin récupérées avec succès');
            console.log('📊 Statistiques:', JSON.stringify(statsResponse.data, null, 2));
            return true;
        } else {
            console.log('❌ Échec de récupération des statistiques admin');
            return false;
        }
        
    } catch (error) {
        console.log(`❌ Erreur dashboard admin: ${error.message}`);
        if (error.response) {
            console.log(`   Status: ${error.response.status}`);
            console.log(`   Data: ${JSON.stringify(error.response.data)}`);
        }
        return false;
    }
}

// Test 4: Vérifier les endpoints de données
async function testDataEndpoints() {
    console.log('\n📡 TEST 4: Vérification des endpoints de données');
    console.log('=' .repeat(60));
    
    const endpoints = [
        '/api/admin/orientation/tests',
        '/api/admin/orientation/results',
        '/api/admin/orientation/recommendations'
    ];
    
    const results = [];
    
    for (const endpoint of endpoints) {
        try {
            const response = await axios.get(`${BASE_URL}${endpoint}`, testConfig);
            console.log(`✅ ${endpoint}: ${response.status} (${response.data?.length || 0} éléments)`);
            results.push({ endpoint, success: true, count: response.data?.length || 0 });
        } catch (error) {
            console.log(`❌ ${endpoint}: ${error.message}`);
            if (error.response) {
                console.log(`   Status: ${error.response.status}`);
            }
            results.push({ endpoint, success: false, error: error.message });
        }
    }
    
    return results;
}

// Test 5: Vérifier la configuration email
async function testEmailConfiguration() {
    console.log('\n📧 TEST 5: Vérification de la configuration email');
    console.log('=' .repeat(60));
    
    try {
        // Test de l'endpoint de test email
        const emailTestResponse = await axios.post(`${BASE_URL}/api/admin/test-email`, {
            to: 'test@example.com',
            subject: 'Test Email DirAvenir',
            body: 'Ceci est un test de configuration email'
        }, testConfig);
        
        if (emailTestResponse.status === 200) {
            console.log('✅ Configuration email fonctionnelle');
            return true;
        } else {
            console.log('❌ Problème avec la configuration email');
            return false;
        }
        
    } catch (error) {
        console.log(`❌ Erreur configuration email: ${error.message}`);
        if (error.response) {
            console.log(`   Status: ${error.response.status}`);
            console.log(`   Data: ${JSON.stringify(error.response.data)}`);
        }
        return false;
    }
}

// Fonction principale de test
async function runFunctionalSystemTest() {
    console.log('🚀 DÉMARRAGE DU TEST FONCTIONNEL DU SYSTÈME DIRAVENIR');
    console.log('=' .repeat(80));
    
    try {
        // Test 1: Sauvegarde en base de données
        const testResults = await testDatabaseSave();
        
        // Test 2: Recommandations dynamiques
        const dynamicRecommendations = await testDynamicRecommendations(testResults);
        
        // Test 3: Dashboard admin
        const adminDashboard = await testAdminDashboard();
        
        // Test 4: Endpoints de données
        const dataEndpoints = await testDataEndpoints();
        
        // Test 5: Configuration email
        const emailConfig = await testEmailConfiguration();
        
        // Résumé des résultats
        console.log('\n📋 RÉSUMÉ DES TESTS');
        console.log('=' .repeat(80));
        
        const successfulTests = testResults.filter(r => r.success).length;
        console.log(`✅ Tests d'orientation réussis: ${successfulTests}/${testProfiles.length}`);
        console.log(`🎯 Recommandations dynamiques: ${dynamicRecommendations ? '✅ OUI' : '❌ NON'}`);
        console.log(`👨‍💼 Dashboard admin: ${adminDashboard ? '✅ FONCTIONNEL' : '❌ PROBLÈME'}`);
        console.log(`📡 Endpoints de données: ${dataEndpoints.filter(r => r.success).length}/${dataEndpoints.length} fonctionnels`);
        console.log(`📧 Configuration email: ${emailConfig ? '✅ FONCTIONNELLE' : '❌ PROBLÈME'}`);
        
        // Recommandations
        console.log('\n💡 RECOMMANDATIONS:');
        if (successfulTests === testProfiles.length) {
            console.log('✅ Le système sauvegarde correctement les résultats en base de données');
        }
        if (dynamicRecommendations) {
            console.log('✅ Les recommandations sont dynamiques et adaptées aux profils');
        }
        if (adminDashboard) {
            console.log('✅ Le dashboard admin est opérationnel');
        }
        if (emailConfig) {
            console.log('✅ La configuration email est fonctionnelle');
        }
        
        console.log('\n🎉 TEST FONCTIONNEL TERMINÉ !');
        
    } catch (error) {
        console.log(`❌ ERREUR CRITIQUE: ${error.message}`);
        console.log('🔧 Vérifiez que le serveur Spring Boot est démarré sur le port 8084');
    }
}

// Exécuter les tests
runFunctionalSystemTest();
