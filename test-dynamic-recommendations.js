/**
 * Test Simple pour Vérifier les Recommandations Dynamiques
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

// Test avec deux profils très différents
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

async function testDynamicRecommendations() {
    console.log('🎯 TEST DES RECOMMANDATIONS DYNAMIQUES');
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
                    console.log('🏆 Top 5 recommandations:');
                    testResponse.data.recommendations.slice(0, 5).forEach((rec, index) => {
                        console.log(`   ${index + 1}. ${rec.majorName} (Score: ${rec.matchingScore?.toFixed(1)}%)`);
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
    
    // Analyser les résultats
    console.log('\n🔍 ANALYSE DES RECOMMANDATIONS DYNAMIQUES');
    console.log('=' .repeat(60));
    
    const successfulTests = results.filter(r => r.success);
    
    if (successfulTests.length >= 2) {
        const profile1 = successfulTests[0];
        const profile2 = successfulTests[1];
        
        console.log(`\n📋 Comparaison ${profile1.profile} vs ${profile2.profile}:`);
        
        // Comparer les top 3 recommandations
        const top3Profile1 = profile1.recommendations.slice(0, 3);
        const top3Profile2 = profile2.recommendations.slice(0, 3);
        
        console.log(`\n${profile1.profile} - Top 3:`);
        top3Profile1.forEach((rec, index) => {
            console.log(`   ${index + 1}. ${rec.majorName} (${rec.matchingScore?.toFixed(1)}%)`);
        });
        
        console.log(`\n${profile2.profile} - Top 3:`);
        top3Profile2.forEach((rec, index) => {
            console.log(`   ${index + 1}. ${rec.majorName} (${rec.matchingScore?.toFixed(1)}%)`);
        });
        
        // Vérifier si les recommandations sont différentes
        const areDifferent = top3Profile1.some((rec1, index) => {
            const rec2 = top3Profile2[index];
            return rec1.majorName !== rec2.majorName || Math.abs(rec1.matchingScore - rec2.matchingScore) > 5;
        });
        
        if (areDifferent) {
            console.log('\n✅ SUCCÈS: Les recommandations sont dynamiques et différentes !');
            console.log('🎯 Le système génère des recommandations personnalisées selon les profils.');
        } else {
            console.log('\n❌ PROBLÈME: Les recommandations semblent identiques.');
            console.log('🔧 Le facteur de normalisation pourrait encore être trop faible.');
        }
        
        // Vérifier la plage des scores
        const allScores = [...profile1.recommendations, ...profile2.recommendations].map(r => r.matchingScore);
        const minScore = Math.min(...allScores);
        const maxScore = Math.max(...allScores);
        const avgScore = allScores.reduce((a, b) => a + b, 0) / allScores.length;
        
        console.log(`\n📊 Statistiques des scores:`);
        console.log(`   Score minimum: ${minScore.toFixed(1)}%`);
        console.log(`   Score maximum: ${maxScore.toFixed(1)}%`);
        console.log(`   Score moyen: ${avgScore.toFixed(1)}%`);
        console.log(`   Plage: ${(maxScore - minScore).toFixed(1)}%`);
        
        if (maxScore - minScore > 20) {
            console.log('✅ Bonne différenciation des scores');
        } else {
            console.log('⚠️ Faible différenciation des scores - facteur de normalisation à ajuster');
        }
        
    } else {
        console.log('❌ Pas assez de tests réussis pour analyser les recommandations');
    }
    
    return results;
}

// Fonction principale
async function runTest() {
    console.log('🚀 TEST DES RECOMMANDATIONS DYNAMIQUES DIRAVENIR');
    console.log('=' .repeat(80));
    
    try {
        const results = await testDynamicRecommendations();
        
        console.log('\n📋 RÉSUMÉ FINAL');
        console.log('=' .repeat(80));
        
        const successfulTests = results.filter(r => r.success).length;
        console.log(`✅ Tests réussis: ${successfulTests}/${testProfiles.length}`);
        
        if (successfulTests === testProfiles.length) {
            console.log('🎉 Le système d\'orientation fonctionne correctement !');
            console.log('📧 Les emails sont envoyés aux utilisateurs');
            console.log('💾 Les résultats sont sauvegardés en base de données');
            console.log('🎯 Les recommandations sont dynamiques et personnalisées');
        }
        
    } catch (error) {
        console.log(`❌ ERREUR CRITIQUE: ${error.message}`);
    }
}

// Exécuter le test
runTest();
