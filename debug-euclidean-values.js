const axios = require('axios');

const BASE_URL = 'http://localhost:8084/api/orientation';

// Test pour analyser les valeurs euclidiennes réelles
const testData = {
    studentInfo: {
        fullName: "Debug Euclidean User",
        email: "debug.euclidean@example.com",
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

async function debugEuclideanValues() {
    console.log('🔍 DEBUG DES VALEURS EUCLIDIENNES');
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
            
            if (recommendations && recommendations.length > 0) {
                console.log('\n🎯 ANALYSE DES RECOMMANDATIONS:');
                
                recommendations.slice(0, 3).forEach((rec, index) => {
                    console.log(`\n${index + 1}. ${rec.majorName}`);
                    console.log(`   Score: ${rec.matchingScore} (${rec.matchingPercentage})`);
                    
                    // Analyser pourquoi le score est si bas
                    if (rec.matchingScore === 0) {
                        console.log('   ❌ Score à 0% - Analyse:');
                        console.log('      - La distance euclidienne est probablement très élevée');
                        console.log('      - Le facteur de normalisation (10000) est trop faible');
                        console.log('      - Solution: Augmenter le facteur à 100000 ou plus');
                    }
                });
                
                // Calculer les statistiques
                const scores = recommendations.map(rec => rec.matchingScore);
                const minScore = Math.min(...scores);
                const maxScore = Math.max(...scores);
                
                console.log('\n📈 STATISTIQUES:');
                console.log(`   Score minimum: ${minScore}`);
                console.log(`   Score maximum: ${maxScore}`);
                console.log(`   Plage: ${maxScore - minScore}`);
                
                // Recommandations basées sur l'analyse
                console.log('\n💡 RECOMMANDATIONS:');
                if (minScore === 0 && maxScore === 0) {
                    console.log('   🔧 Le facteur de normalisation doit être considérablement augmenté');
                    console.log('   📊 Essayer: 50000, 100000, ou même 500000');
                    console.log('   🎯 Objectif: Obtenir des scores entre 60-95%');
                } else if (minScore < 60) {
                    console.log('   🔧 Le facteur de normalisation doit être augmenté');
                    console.log('   📊 Essayer: 20000, 30000, ou 50000');
                } else if (maxScore > 95) {
                    console.log('   🔧 Le facteur de normalisation doit être réduit');
                    console.log('   📊 Essayer: 5000, 8000, ou 10000');
                } else {
                    console.log('   ✅ Les scores sont dans la plage acceptable');
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

debugEuclideanValues().catch(console.error);
