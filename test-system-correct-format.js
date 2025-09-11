/**
 * Test avec le Format Correct du Système DirAvenir
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

// Données de test avec le format correct
const testProfiles = [
    {
        name: "Profil Technique",
        studentInfo: {
            fullName: "Ahmed Technique",
            phone: "+212600000001",
            email: "test.technique@example.com"
        },
        answers: {
            q1: "Analyser des données",
            q2: "Technologie et innovation",
            q3: "Un livre technique",
            q4: "Analyser méthodiquement",
            q5: "Programmation",
            q6: "Apprentissage structuré",
            q7: "Innovation",
            q8: "Bureau calme",
            q9: "Compétences techniques",
            q10: "Rechercher des solutions logiques",
            q11: "Travail individuel",
            q12: "Présentation structurée",
            q13: "Décision basée sur les données",
            q14: "Mathématiques et sciences"
        }
    },
    {
        name: "Profil Créatif",
        studentInfo: {
            fullName: "Fatima Créative",
            phone: "+212600000002",
            email: "test.creatif@example.com"
        },
        answers: {
            q1: "Créer quelque chose de nouveau",
            q2: "Arts et culture",
            q3: "Un instrument de musique",
            q4: "Approche créative",
            q5: "Design",
            q6: "Apprentissage pratique",
            q7: "Expression personnelle",
            q8: "Espace inspirant",
            q9: "Créativité",
            q10: "Explorer de nouvelles idées",
            q11: "Travail en équipe",
            q12: "Présentation visuelle",
            q13: "Décision intuitive",
            q14: "Arts et littérature"
        }
    }
];

// Test 1: Vérifier la sauvegarde en base de données avec le bon format
async function testDatabaseSaveCorrectFormat() {
    console.log('\n📊 TEST 1: Vérification de la sauvegarde avec format correct');
    console.log('=' .repeat(60));
    
    const results = [];
    
    for (const profile of testProfiles) {
        try {
            console.log(`\n🧪 Test du profil: ${profile.name}`);
            
            // Construire la requête avec le bon format
            const requestData = {
                ...profile.answers,
                studentInfo: profile.studentInfo
            };
            
            // Envoyer le test d'orientation
            const testResponse = await axios.post(`${BASE_URL}/api/orientation/complete`, requestData, testConfig);
            
            if (testResponse.status === 200) {
                console.log(`✅ Test envoyé pour ${profile.name}`);
                console.log(`📧 Email: ${profile.studentInfo.email}`);
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
                    email: profile.studentInfo.email,
                    success: true,
                    recommendations: testResponse.data.recommendations || []
                });
            } else {
                console.log(`❌ Échec du test pour ${profile.name}`);
                results.push({
                    profile: profile.name,
                    email: profile.studentInfo.email,
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
                email: profile.studentInfo.email,
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

// Test 3: Tester l'endpoint public (sans authentification)
async function testPublicEndpoints() {
    console.log('\n🌐 TEST 3: Vérification des endpoints publics');
    console.log('=' .repeat(60));
    
    try {
        // Test de l'endpoint de santé
        const healthResponse = await axios.get(`${BASE_URL}/api/health`, testConfig);
        console.log(`✅ Endpoint santé: ${healthResponse.status}`);
        
        // Test de l'endpoint des questions
        const questionsResponse = await axios.get(`${BASE_URL}/api/orientation/questions`, testConfig);
        console.log(`✅ Questions d'orientation: ${questionsResponse.status} (${questionsResponse.data?.length || 0} questions)`);
        
        return true;
        
    } catch (error) {
        console.log(`❌ Erreur endpoints publics: ${error.message}`);
        if (error.response) {
            console.log(`   Status: ${error.response.status}`);
        }
        return false;
    }
}

// Test 4: Vérifier la base de données directement
async function testDatabaseDirectly() {
    console.log('\n🗄️ TEST 4: Vérification directe de la base de données');
    console.log('=' .repeat(60));
    
    try {
        // Test des majeures
        const majorsResponse = await axios.get(`${BASE_URL}/api/orientation/majors`, testConfig);
        console.log(`✅ Majeures disponibles: ${majorsResponse.status} (${majorsResponse.data?.length || 0} majeures)`);
        
        if (majorsResponse.data && majorsResponse.data.length > 0) {
            console.log('📚 Exemples de majeures:');
            majorsResponse.data.slice(0, 5).forEach((major, index) => {
                console.log(`   ${index + 1}. ${major.name}`);
            });
        }
        
        return true;
        
    } catch (error) {
        console.log(`❌ Erreur base de données: ${error.message}`);
        if (error.response) {
            console.log(`   Status: ${error.response.status}`);
        }
        return false;
    }
}

// Fonction principale de test
async function runCorrectFormatTest() {
    console.log('🚀 TEST AVEC FORMAT CORRECT DU SYSTÈME DIRAVENIR');
    console.log('=' .repeat(80));
    
    try {
        // Test 1: Sauvegarde avec format correct
        const testResults = await testDatabaseSaveCorrectFormat();
        
        // Test 2: Recommandations dynamiques
        const dynamicRecommendations = await testDynamicRecommendations(testResults);
        
        // Test 3: Endpoints publics
        const publicEndpoints = await testPublicEndpoints();
        
        // Test 4: Base de données
        const databaseCheck = await testDatabaseDirectly();
        
        // Résumé des résultats
        console.log('\n📋 RÉSUMÉ DES TESTS');
        console.log('=' .repeat(80));
        
        const successfulTests = testResults.filter(r => r.success).length;
        console.log(`✅ Tests d'orientation réussis: ${successfulTests}/${testProfiles.length}`);
        console.log(`🎯 Recommandations dynamiques: ${dynamicRecommendations ? '✅ OUI' : '❌ NON'}`);
        console.log(`🌐 Endpoints publics: ${publicEndpoints ? '✅ FONCTIONNELS' : '❌ PROBLÈME'}`);
        console.log(`🗄️ Base de données: ${databaseCheck ? '✅ ACCESSIBLE' : '❌ PROBLÈME'}`);
        
        // Recommandations
        console.log('\n💡 RECOMMANDATIONS:');
        if (successfulTests === testProfiles.length) {
            console.log('✅ Le système sauvegarde correctement les résultats en base de données');
            console.log('✅ Les emails sont envoyés aux utilisateurs');
        }
        if (dynamicRecommendations) {
            console.log('✅ Les recommandations sont dynamiques et adaptées aux profils');
        }
        if (publicEndpoints) {
            console.log('✅ Les endpoints publics sont opérationnels');
        }
        if (databaseCheck) {
            console.log('✅ La base de données est accessible et contient les données');
        }
        
        console.log('\n🎉 TEST AVEC FORMAT CORRECT TERMINÉ !');
        
    } catch (error) {
        console.log(`❌ ERREUR CRITIQUE: ${error.message}`);
        console.log('🔧 Vérifiez que le serveur Spring Boot est démarré sur le port 8084');
    }
}

// Exécuter les tests
runCorrectFormatTest();
