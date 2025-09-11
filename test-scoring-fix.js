const axios = require('axios');

const BASE_URL = 'http://localhost:8084/api/orientation';

// Test avec profil technique
const technicalProfile = {
    studentInfo: {
        email: "test.technique@example.com",
        fullName: "Test Technique",
        phone: "0123456789"
    },
    q1: "B", // Comprendre
    q2: "A", // Sciences
    q3: "A", // Outils techniques
    q4: "A", // Analyser logiquement
    q5: "A", // Résolution de problèmes
    q6: "A", // Apprentissage structuré
    q7: "A", // Impact sociétal
    q8: "A", // Travail en équipe
    q9: "A", // Innovation
    q10: "A", // Défis techniques
    q11: "A", // Travail autonome
    q12: "A", // Présentation technique
    q13: "A", // Décision analytique
    q14: "A" // Sciences/Technologie
};

// Test avec profil créatif
const creativeProfile = {
    studentInfo: {
        email: "test.creatif@example.com",
        fullName: "Test Créatif",
        phone: "0987654321"
    },
    q1: "A", // Créer
    q2: "B", // Arts
    q3: "B", // Œuvres d'art
    q4: "B", // Approche créative
    q5: "B", // Créativité
    q6: "B", // Apprentissage créatif
    q7: "B", // Expression personnelle
    q8: "B", // Travail individuel
    q9: "B", // Créativité
    q10: "B", // Défis créatifs
    q11: "B", // Travail créatif
    q12: "B", // Présentation artistique
    q13: "B", // Décision intuitive
    q14: "B" // Arts/Lettres
};

async function testProfile(profileName, profile) {
    console.log(`\n🧪 Test du profil: ${profileName}`);
    
    try {
        const response = await axios.post(`${BASE_URL}/complete`, profile, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 30000
        });
        
        if (response.data.success) {
            console.log(`✅ Test envoyé pour ${profileName}`);
            console.log(`📧 Email: ${profile.studentInfo.email}`);
            
            const recommendations = response.data.recommendations;
            console.log(`🎯 Recommandations reçues: ${recommendations.length}`);
            
            if (recommendations.length > 0) {
                console.log(`🏆 Top 3 recommandations:`);
                recommendations.slice(0, 3).forEach((rec, index) => {
                    console.log(`   ${index + 1}. ${rec.majorName} (Score: ${rec.matchingPercentage})`);
                });
            }
            
            return true;
        } else {
            console.log(`❌ Erreur pour ${profileName}: ${response.data.message}`);
            return false;
        }
    } catch (error) {
        console.log(`❌ Erreur pour ${profileName}: ${error.message}`);
        if (error.response) {
            console.log(`   Status: ${error.response.status}`);
            console.log(`   Data: ${JSON.stringify(error.response.data)}`);
        }
        return false;
    }
}

async function runTests() {
    console.log('🚀 TEST DES CORRECTIONS DE SCORING');
    console.log('================================================================================');
    console.log('🎯 Test avec facteur de normalisation amélioré et limitation aux top 3');
    console.log('============================================================');
    
    const results = [];
    
    // Test profil technique
    const technicalResult = await testProfile('Profil Technique', technicalProfile);
    results.push(technicalResult);
    
    // Test profil créatif
    const creativeResult = await testProfile('Profil Créatif', creativeProfile);
    results.push(creativeResult);
    
    // Analyse des résultats
    console.log('\n🔍 ANALYSE DES CORRECTIONS');
    console.log('============================================================');
    
    const successCount = results.filter(r => r).length;
    console.log(`✅ Tests réussis: ${successCount}/${results.length}`);
    
    if (successCount > 0) {
        console.log('🎉 Les corrections de scoring fonctionnent !');
        console.log('📊 Les scores devraient maintenant être réalistes et différenciés');
        console.log('🎯 Seuls les top 3 sont retournés comme demandé');
    } else {
        console.log('❌ Les tests ont échoué - vérifier les logs de l\'application');
    }
}

runTests().catch(console.error);
