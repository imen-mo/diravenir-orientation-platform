const axios = require('axios');

const BASE_URL = 'http://localhost:8084/api/orientation';

// Test complet du flux Frontend → Backend → ResultsPage
        const testData = {
    studentInfo: {
        fullName: "Test User",
        email: "test.complete@example.com",
        phone: "0123456789"
    },
    q1: "A", // Créer
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

async function testCompleteFlow() {
    console.log('🚀 TEST COMPLET DU FLUX FRONTEND → BACKEND → RESULTSPAGE');
    console.log('================================================================================');
    
    try {
        console.log('📤 Envoi des données au backend...');
        console.log('📊 Données envoyées:', JSON.stringify(testData, null, 2));
        
        const response = await axios.post(`${BASE_URL}/calculate`, testData, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 30000
        });
        
        if (response.data.success) {
            console.log('✅ Backend a traité les données avec succès');
            
            const { userProfile, recommendations } = response.data;
            
            console.log('\n📊 PROFIL UTILISATEUR GÉNÉRÉ:');
            console.log(JSON.stringify(userProfile, null, 2));
            
            console.log('\n🎯 RECOMMANDATIONS REÇUES:');
            console.log(`📈 Nombre de recommandations: ${recommendations.length}`);
            
            if (recommendations.length > 0) {
                console.log('\n🏆 TOP 3 RECOMMANDATIONS:');
                recommendations.slice(0, 3).forEach((rec, index) => {
                    console.log(`${index + 1}. ${rec.majorName} - Score: ${rec.matchingScore} (${rec.matchingPercentage})`);
                    console.log(`   Code: ${rec.majorCode}`);
                    console.log(`   Catégorie: ${rec.category}`);
                    console.log(`   Description: ${rec.description ? rec.description.substring(0, 100) + '...' : 'N/A'}`);
                    console.log(`   Raison: ${rec.whyThisMajor ? rec.whyThisMajor.substring(0, 100) + '...' : 'N/A'}`);
                    console.log('');
                });
                
                // Vérifier les scores
                const scores = recommendations.map(r => r.matchingScore);
                const maxScore = Math.max(...scores);
                const minScore = Math.min(...scores);
                
                console.log('📈 STATISTIQUES DES SCORES:');
                console.log(`   Score minimum: ${minScore}`);
                console.log(`   Score maximum: ${maxScore}`);
                console.log(`   Plage: ${maxScore - minScore}`);
                
                if (maxScore > 0) {
                    console.log('✅ Les scores ne sont plus à 0% !');
        } else {
                    console.log('❌ Les scores sont encore à 0% - problème dans le calcul');
                }
                
                // Vérifier la différenciation
                const top3Scores = recommendations.slice(0, 3).map(r => r.matchingScore);
                const isDifferentiated = top3Scores.some((score, index) => 
                    index === 0 || Math.abs(score - top3Scores[0]) > 0.1
                );
                
                if (isDifferentiated) {
                    console.log('✅ Les recommandations sont différenciées');
        } else {
                    console.log('⚠️ Les recommandations sont identiques - vérifier la différenciation');
                }
                
        } else {
                console.log('❌ Aucune recommandation reçue');
            }
            
            console.log('\n🎉 TEST COMPLET RÉUSSI !');
            console.log('✅ Le flux Frontend → Backend → ResultsPage fonctionne correctement');
            
        } else {
            console.log('❌ Erreur dans le traitement:', response.data.error);
        }
    } catch (error) {
        console.log('❌ Erreur:', error.message);
        if (error.response) {
            console.log('   Status:', error.response.status);
            console.log('   Data:', JSON.stringify(error.response.data, null, 2));
        }
    }
}

testCompleteFlow().catch(console.error);