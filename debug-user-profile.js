const axios = require('axios');

const BASE_URL = 'http://localhost:8084/api/orientation';

// Test simple pour voir le profil utilisateur généré
const testProfile = {
    studentInfo: {
        email: "debug@example.com",
        fullName: "Debug Test",
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

async function debugProfile() {
    console.log('🔍 DEBUG DU PROFIL UTILISATEUR');
    console.log('============================================================');
    
    try {
        const response = await axios.post(`${BASE_URL}/calculate`, testProfile, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 30000
        });
        
        if (response.data.success) {
            console.log('✅ Profil calculé avec succès');
            console.log('\n📊 PROFIL UTILISATEUR GÉNÉRÉ:');
            console.log(JSON.stringify(response.data.userProfile, null, 2));
            
            console.log('\n🎯 RECOMMANDATIONS:');
            response.data.recommendations.slice(0, 5).forEach((rec, index) => {
                console.log(`${index + 1}. ${rec.majorName} - Score: ${rec.matchingScore} (${rec.matchingPercentage})`);
            });
            
            // Vérifier si les scores sont > 0
            const scores = response.data.recommendations.map(r => r.matchingScore);
            const maxScore = Math.max(...scores);
            const minScore = Math.min(...scores);
            
            console.log(`\n📈 STATISTIQUES DES SCORES:`);
            console.log(`   Score minimum: ${minScore}`);
            console.log(`   Score maximum: ${maxScore}`);
            console.log(`   Plage: ${maxScore - minScore}`);
            
            if (maxScore > 0) {
                console.log('✅ Les scores ne sont plus à 0% !');
            } else {
                console.log('❌ Les scores sont encore à 0% - problème dans le calcul');
            }
            
        } else {
            console.log('❌ Erreur dans le calcul du profil:', response.data.error);
        }
    } catch (error) {
        console.log('❌ Erreur:', error.message);
        if (error.response) {
            console.log('   Status:', error.response.status);
            console.log('   Data:', JSON.stringify(error.response.data, null, 2));
        }
    }
}

debugProfile().catch(console.error);
