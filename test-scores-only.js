const axios = require('axios');

const BASE_URL = 'http://localhost:8084/api/orientation';

// Test simple pour vérifier les scores
const testData = {
    studentInfo: {
        fullName: "Test Scores User",
        email: "test.scores@example.com",
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

async function testScoresOnly() {
    console.log('🎯 TEST DES SCORES SEULEMENT');
    console.log('================================================================================');
    
    try {
        console.log('📤 Envoi des données au backend...');
        
        const response = await axios.post(`${BASE_URL}/calculate`, testData, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 30000
        });
        
        if (response.data.success) {
            console.log('✅ Backend a traité les données avec succès');
            
            const { userProfile, recommendations } = response.data;
            
            console.log('\n📊 PROFIL UTILISATEUR:');
            if (userProfile) {
                console.log(JSON.stringify(userProfile, null, 2));
            } else {
                console.log('❌ Profil utilisateur non trouvé dans la réponse');
            }
            
            console.log('\n🎯 RECOMMANDATIONS:');
            console.log(`📈 Nombre de recommandations: ${recommendations ? recommendations.length : 0}`);
            
            if (recommendations && recommendations.length > 0) {
                console.log('\n🏆 TOP 3 RECOMMANDATIONS:');
                recommendations.slice(0, 3).forEach((rec, index) => {
                    console.log(`${index + 1}. ${rec.majorName} - Score: ${rec.matchingScore} (${rec.matchingPercentage})`);
                });
                
                // Analyser les scores
                const scores = recommendations.map(rec => rec.matchingScore);
                const minScore = Math.min(...scores);
                const maxScore = Math.max(...scores);
                const range = maxScore - minScore;
                
                console.log('\n📈 ANALYSE DES SCORES:');
                console.log(`   Score minimum: ${minScore}`);
                console.log(`   Score maximum: ${maxScore}`);
                console.log(`   Plage: ${range}`);
                
                if (minScore >= 60 && maxScore <= 95) {
                    console.log('\n✅ SCORES PARFAITS:');
                    console.log('   Les scores sont dans la plage souhaitée (60-95%)');
                } else if (minScore < 60) {
                    console.log('\n⚠️ SCORES TROP BAS:');
                    console.log('   Le facteur de normalisation doit être augmenté');
                } else if (maxScore > 95) {
                    console.log('\n⚠️ SCORES TROP ÉLEVÉS:');
                    console.log('   Le facteur de normalisation doit être réduit');
                }
                
                if (range >= 5) {
                    console.log('✅ Différenciation suffisante entre les majeures');
                } else {
                    console.log('⚠️ Différenciation insuffisante entre les majeures');
                }
                
            } else {
                console.log('❌ Aucune recommandation trouvée');
            }
            
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

testScoresOnly().catch(console.error);
