const http = require('http');

// Données de test complètes pour un profil utilisateur
const testData = {
    answers: {
        "question_1": "A", // Intérêt scientifique élevé
        "question_2": "B", // Intérêt artistique modéré
        "question_3": "A", // Intérêt social élevé
        "question_4": "B", // Intérêt business modéré
        "question_5": "A", // Logique analytique élevée
        "question_6": "A", // Résolution de problèmes élevée
        "question_7": "B", // Communication modérée
        "question_8": "A", // Organisation élevée
        "question_9": "B", // Manuel technique modéré
        "question_10": "A", // Impact sociétal élevé
        "question_11": "A", // Innovation challenge élevé
        "question_12": "B", // Stabilité sécurité modérée
        "question_13": "B", // Autonomie modérée
        "question_14": "A", // Travail équipe élevé
        "question_15": {
            "firstName": "Test",
            "lastName": "User",
            "email": "test@example.com",
            "phone": "1234567890",
            "age": 20,
            "gender": "M",
            "country": "Morocco",
            "city": "Casablanca"
        }
    }
};

const postData = JSON.stringify(testData);

const options = {
    hostname: 'localhost',
    port: 8084,
    path: '/api/orientation/calculate',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
    }
};

console.log('🚀 Test de l\'API avec tous les 44 profils idéaux...');
console.log('📊 Données de test:', JSON.stringify(testData, null, 2));

const req = http.request(options, (res) => {
    console.log(`📡 Status: ${res.statusCode}`);
    console.log(`📋 Headers:`, res.headers);
    
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        try {
            const result = JSON.parse(data);
            console.log('\n✅ Réponse de l\'API:');
            console.log('📈 Succès:', result.success);
            
            if (result.success) {
                console.log('\n🎯 Profil utilisateur calculé:');
                console.log(JSON.stringify(result.userProfile, null, 2));
                
                console.log('\n🏆 Top 10 Recommandations:');
                result.recommendations.slice(0, 10).forEach((rec, index) => {
                    console.log(`${index + 1}. ${rec.majorName} - ${rec.matchingScore.toFixed(1)}% (${rec.category})`);
                    console.log(`   Raison: ${rec.reasoning}`);
                });
                
                console.log(`\n📊 Total de majeures évaluées: ${result.recommendations.length}`);
                
                // Vérifier que les scores sont dynamiques et élevés
                const topScore = result.recommendations[0]?.matchingScore || 0;
                const hasHighScores = result.recommendations.some(rec => rec.matchingScore > 80);
                
                console.log(`\n🎯 Score le plus élevé: ${topScore.toFixed(1)}%`);
                console.log(`🔥 Scores élevés (>80%): ${hasHighScores ? '✅ OUI' : '❌ NON'}`);
                
                if (topScore > 70 && hasHighScores) {
                    console.log('\n🎉 SUCCÈS: L\'API produit des scores dynamiques et pertinents !');
                } else {
                    console.log('\n⚠️ ATTENTION: Les scores semblent encore statiques ou trop bas.');
                }
            } else {
                console.log('❌ Erreur:', result.error);
            }
        } catch (error) {
            console.log('❌ Erreur de parsing JSON:', error.message);
            console.log('📄 Réponse brute:', data);
        }
    });
});

req.on('error', (error) => {
    console.log('❌ Erreur de connexion:', error.message);
    console.log('💡 Vérifiez que le backend est démarré sur le port 8084');
});

req.write(postData);
req.end();
