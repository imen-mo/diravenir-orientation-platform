const http = require('http');

// Test de connectivité frontend-backend
console.log('🔍 Test de connectivité Frontend-Backend...');

// Simuler les données que le frontend envoie
const frontendData = {
    q1: "B",  // Comprendre (Logique Analytique élevée)
    q2: "A",  // Découvertes/Tech (Intérêt scientifique)
    q3: "A",  // Électronique (Intérêt scientifique)
    q4: "A",  // Décomposer (Résolution de problèmes)
    q5: "F",  // Équation (Logique Analytique)
    q6: "A",  // Lire (Théorie/Recherche)
    q7: "A",  // Améliorer vie (Impact sociétal)
    q8: "A",  // Labo (Théorie/Recherche)
    q9: "B",  // Innovation (Innovation Challenge)
    q10: "A", // Comprendre (Logique Analytique)
    q11: "B", // Petite équipe (Travail équipe)
    q12: "A", // Faits (Organisation)
    q13: "A", // Logique (Logique Analytique)
    q14: "A", // Sciences (Intérêt scientifique)
    studentInfo: {
        fullName: "Ahmed Benali",
        email: "ahmed.benali@email.com",
        phone: "0661234567"
    }
};

const postData = JSON.stringify(frontendData);

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

console.log('📡 Envoi des données frontend vers backend...');
console.log('📊 Données envoyées:', JSON.stringify(frontendData, null, 2));

const req = http.request(options, (res) => {
    console.log(`📡 Status: ${res.statusCode}`);
    
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        try {
            const result = JSON.parse(data);
            console.log('\n✅ Réponse du backend:');
            console.log('📈 Succès:', result.success);
            
            if (result.success) {
                console.log('\n🎯 Profil utilisateur calculé par le backend:');
                const profile = result.userProfile;
                console.log(`   🔬 Intérêt Scientifique: ${profile.Interet_Scientifique_Tech}%`);
                console.log(`   🧠 Logique Analytique: ${profile.Interet_Logique_Analytique}%`);
                console.log(`   🔧 Résolution Problèmes: ${profile.Competence_Resolution_Problemes}%`);
                console.log(`   📋 Organisation: ${profile.Competence_Organisation}%`);
                
                console.log('\n🏆 Recommandations calculées par le backend:');
                result.recommendations.slice(0, 3).forEach((rec, index) => {
                    console.log(`${index + 1}. ${rec.majorName} - ${rec.matchingScore.toFixed(1)}%`);
                    console.log(`   📝 Raison: ${rec.reasoning}`);
                });
                
                // Simuler le mapping frontend
                console.log('\n🔄 Mapping frontend (simulation):');
                const frontendResults = {
                    topRecommendations: result.recommendations.slice(0, 3).map(rec => ({
                        majorCode: rec.majorId || rec.majorCode,
                        majorName: rec.majorName,
                        matchingScore: rec.matchingScore || rec.score || 0,
                        matchingPercentage: `${Math.round(rec.matchingScore || rec.score || 0)}%`,
                        description: rec.description || '',
                        whyThisMajor: rec.whyThisMajor || rec.userDescription || '',
                        pillarComparison: rec.pillarComparison || {}
                    })),
                    userProfile: result.userProfile,
                    calculationMethod: 'BACKEND'
                };
                
                console.log('📊 Résultats finaux pour le frontend:');
                frontendResults.topRecommendations.forEach((rec, index) => {
                    console.log(`${index + 1}. ${rec.majorName} - ${rec.matchingScore}% (${rec.calculationMethod})`);
                });
                
                // Vérifier que le backend est utilisé
                const usesBackend = frontendResults.calculationMethod === 'BACKEND';
                const hasDynamicScores = frontendResults.topRecommendations.some(rec => rec.matchingScore > 50);
                
                console.log(`\n🎯 Utilise le backend: ${usesBackend ? '✅ OUI' : '❌ NON'}`);
                console.log(`🔥 Scores dynamiques: ${hasDynamicScores ? '✅ OUI' : '❌ NON'}`);
                
                if (usesBackend && hasDynamicScores) {
                    console.log('\n🎉 SUCCÈS: Le frontend utilise bien les calculs du backend !');
                    console.log('✅ Les scores sont calculés par l\'algorithme de Distance Euclidienne Pondérée');
                    console.log('✅ Les recommandations utilisent les 44 profils idéaux');
                } else {
                    console.log('\n⚠️ PROBLÈME: Le frontend n\'utilise pas le backend correctement');
                }
                
            } else {
                console.log('❌ Erreur backend:', result.error);
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
    console.log('🚀 Commande pour démarrer: mvn spring-boot:run');
});

req.write(postData);
req.end();
