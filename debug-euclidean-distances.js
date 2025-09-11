const axios = require('axios');

const BASE_URL = 'http://localhost:8084/api/orientation';

// Test pour analyser les distances euclidiennes
const testData = {
    studentInfo: {
        fullName: "Debug User",
        email: "debug@example.com",
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

async function debugEuclideanDistances() {
    console.log('🔍 DEBUG DES DISTANCES EUCLIDIENNES');
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
            console.log(JSON.stringify(userProfile, null, 2));
            
            console.log('\n🎯 RECOMMANDATIONS AVEC DISTANCES:');
            recommendations.forEach((rec, index) => {
                console.log(`${index + 1}. ${rec.majorName}`);
                console.log(`   Score: ${rec.matchingScore} (${rec.matchingPercentage})`);
                console.log(`   Raison: ${rec.whyThisMajor}`);
                console.log('');
            });
            
            // Analyser les scores pour comprendre la plage
            const scores = recommendations.map(rec => rec.matchingScore);
            const minScore = Math.min(...scores);
            const maxScore = Math.max(...scores);
            const range = maxScore - minScore;
            
            console.log('\n📈 ANALYSE DES SCORES:');
            console.log(`   Score minimum: ${minScore}`);
            console.log(`   Score maximum: ${maxScore}`);
            console.log(`   Plage: ${range}`);
            console.log(`   Nombre de recommandations: ${recommendations.length}`);
            
            if (minScore === 0 && maxScore === 0) {
                console.log('\n❌ PROBLÈME: Tous les scores sont à 0%');
                console.log('   Le facteur de normalisation est probablement trop faible');
                console.log('   Suggestions:');
                console.log('   - Augmenter le normalizationFactor de 1000 à 10000 ou 50000');
                console.log('   - Ou utiliser une formule différente');
            } else if (range < 5) {
                console.log('\n⚠️ PROBLÈME: Différenciation insuffisante');
                console.log('   La plage de scores est trop faible pour distinguer les majeures');
                console.log('   Suggestions:');
                console.log('   - Réduire le normalizationFactor');
                console.log('   - Ou ajuster la formule de calcul');
            } else {
                console.log('\n✅ SCORES CORRECTS:');
                console.log('   Les scores sont dans une plage acceptable avec une bonne différenciation');
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

debugEuclideanDistances().catch(console.error);
