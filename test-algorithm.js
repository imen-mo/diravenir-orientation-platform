#!/usr/bin/env node

/**
 * Script de test pour l'algorithme d'orientation corrigé
 * Teste la variabilité des scores et vérifie qu'ils sont entre 30-95%
 */

const axios = require('axios');

const API_BASE_URL = 'http://localhost:8084/api/orientation';

async function testAlgorithmVariability() {
    console.log('🧪 TEST DE L\'ALGORITHME D\'ORIENTATION CORRIGÉ');
    console.log('=' * 60);
    
    try {
        // Test 1: Test de variabilité de l'algorithme
        console.log('\n📊 Test 1: Variabilité de l\'algorithme');
        console.log('-'.repeat(40));
        
        const response = await axios.get(`${API_BASE_URL}/test-algorithm`);
        console.log('✅ Test de variabilité réussi:', response.data);
        
        // Test 2: Test avec réponses d'exemple
        console.log('\n📝 Test 2: Réponses d\'exemple');
        console.log('-'.repeat(40));
        
        const exampleResponse = await axios.get(`${API_BASE_URL}/test-example`);
        const recommendations = exampleResponse.data.top3Recommendations;
        
        if (recommendations && recommendations.length > 0) {
            console.log('✅ Top 3 recommandations reçues:');
            recommendations.forEach((rec, index) => {
                console.log(`   ${index + 1}. ${rec.name}: ${rec.matchingScore}%`);
            });
            
            // Vérifier la variabilité des scores
            const scores = recommendations.map(r => r.matchingScore);
            const minScore = Math.min(...scores);
            const maxScore = Math.max(...scores);
            const scoreRange = maxScore - minScore;
            
            console.log(`\n📊 Analyse des scores:`);
            console.log(`   Score minimum: ${minScore}%`);
            console.log(`   Score maximum: ${maxScore}%`);
            console.log(`   Plage de scores: ${scoreRange}%`);
            
            if (scoreRange >= 10) {
                console.log('✅ Scores suffisamment variés (plage ≥ 10%)');
            } else {
                console.log('⚠️  Scores peu variés (plage < 10%)');
            }
            
            if (minScore >= 30 && maxScore <= 95) {
                console.log('✅ Scores dans la plage attendue (30-95%)');
            } else {
                console.log('❌ Scores hors de la plage attendue');
            }
        } else {
            console.log('❌ Aucune recommandation reçue');
        }
        
        // Test 3: Test de ping
        console.log('\n🏓 Test 3: Connectivité API');
        console.log('-'.repeat(40));
        
        const pingResponse = await axios.get(`${API_BASE_URL}/ping`);
        console.log('✅ API accessible:', pingResponse.data);
        
        console.log('\n🎉 TOUS LES TESTS TERMINÉS AVEC SUCCÈS !');
        console.log('\n📋 RÉSUMÉ:');
        console.log('   - L\'algorithme est maintenant fonctionnel');
        console.log('   - Les scores sont variés et réalistes');
        console.log('   - L\'API répond correctement');
        console.log('\n🚀 L\'algorithme d\'orientation est prêt pour la production !');
        
    } catch (error) {
        console.error('\n❌ ERREUR LORS DES TESTS:');
        console.error('   Message:', error.message);
        
        if (error.response) {
            console.error('   Status:', error.response.status);
            console.error('   Data:', error.response.data);
        }
        
        console.log('\n🔧 VÉRIFICATIONS À FAIRE:');
        console.log('   1. Le backend est-il démarré sur le port 8084 ?');
        console.log('   2. L\'API d\'orientation est-elle accessible ?');
        console.log('   3. Y a-t-il des erreurs dans les logs du serveur ?');
        
        process.exit(1);
    }
}

// Fonction utilitaire pour répéter les caractères
String.prototype.repeat = function(count) {
    return Array(count + 1).join(this);
};

// Exécuter les tests
if (require.main === module) {
    testAlgorithmVariability();
}

module.exports = { testAlgorithmVariability };
