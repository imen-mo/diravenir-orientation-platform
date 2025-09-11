const http = require('http');

// Exemple réel d'Ahmed Benali - Format OrientationRequestDTO avec bonnes valeurs
const ahmedData = {
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
        firstName: "Ahmed",
        lastName: "Benali",
        email: "ahmed.benali@email.com",
        phone: "0661234567",
        age: 19,
        gender: "M",
        country: "Morocco",
        city: "Casablanca"
    }
};

const postData = JSON.stringify(ahmedData);

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

console.log('🎯 Test avec l\'exemple réel d\'Ahmed Benali');
console.log('📊 Profil attendu: Logique Analytique élevée, Résolution de Problèmes, Organisation');
console.log('🏆 Résultats attendus: Génie Civil, Génie Mécanique, Informatique');
console.log('📈 Scores attendus: 25-35% (avec facteur de normalisation corrigé)');
console.log('');

const req = http.request(options, (res) => {
    console.log(`📡 Status: ${res.statusCode}`);
    
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
                const profile = result.userProfile;
                console.log(`   🔬 Intérêt Scientifique: ${profile.Interet_Scientifique_Tech}%`);
                console.log(`   🎨 Intérêt Artistique: ${profile.Interet_Artistique_Creatif}%`);
                console.log(`   👥 Intérêt Social: ${profile.Interet_Social_Humain}%`);
                console.log(`   💼 Intérêt Business: ${profile.Interet_Business_Gestion}%`);
                console.log(`   🧠 Logique Analytique: ${profile.Interet_Logique_Analytique}%`);
                console.log(`   🔧 Résolution Problèmes: ${profile.Competence_Resolution_Problemes}%`);
                console.log(`   📢 Communication: ${profile.Competence_Communication}%`);
                console.log(`   📋 Organisation: ${profile.Competence_Organisation}%`);
                
                console.log('\n🏆 Top 5 Recommandations:');
                result.recommendations.slice(0, 5).forEach((rec, index) => {
                    console.log(`${index + 1}. ${rec.majorName} - ${rec.matchingScore.toFixed(1)}% (${rec.category})`);
                    console.log(`   📝 Raison: ${rec.reasoning}`);
                });
                
                console.log(`\n📊 Total de majeures évaluées: ${result.recommendations.length}`);
                
                // Vérifier que les scores sont réalistes
                const topScore = result.recommendations[0]?.matchingScore || 0;
                const hasRealisticScores = result.recommendations.some(rec => rec.matchingScore > 20 && rec.matchingScore < 80);
                
                console.log(`\n🎯 Score le plus élevé: ${topScore.toFixed(1)}%`);
                console.log(`🔥 Scores réalistes (20-80%): ${hasRealisticScores ? '✅ OUI' : '❌ NON'}`);
                
                if (topScore > 20 && hasRealisticScores) {
                    console.log('\n🎉 SUCCÈS: L\'API produit des scores dynamiques et réalistes !');
                    console.log('✅ Le facteur de normalisation est correctement ajusté');
                } else {
                    console.log('\n⚠️ ATTENTION: Les scores semblent encore incorrects.');
                    console.log('💡 Vérifiez le facteur de normalisation dans le code');
                }
                
                // Vérifier les majeures attendues
                const topMajors = result.recommendations.slice(0, 3).map(r => r.majorName);
                const expectedMajors = ['Génie Civil', 'Génie Mécanique', 'Informatique'];
                const hasExpectedMajors = expectedMajors.some(major => topMajors.includes(major));
                
                console.log(`\n🎯 Majeures attendues dans le top 3: ${hasExpectedMajors ? '✅ OUI' : '❌ NON'}`);
                console.log(`   Top 3 actuel: ${topMajors.join(', ')}`);
                
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
    console.log('🚀 Commande pour démarrer: mvn spring-boot:run -Dspring-boot.run.profiles=dev');
});

req.write(postData);
req.end();
