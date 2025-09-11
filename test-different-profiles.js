const axios = require('axios');

const BASE_URL = 'http://localhost:8084/api/orientation';

// Profil Technique (Ingénieur)
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

// Profil Créatif (Artiste)
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

// Profil Business (Commercial)
const businessProfile = {
    studentInfo: {
        email: "test.business@example.com",
        fullName: "Test Business",
        phone: "0555666777"
    },
    q1: "C", // Diriger
    q2: "C", // Business
    q3: "C", // Équipement professionnel
    q4: "C", // Approche stratégique
    q5: "C", // Leadership
    q6: "C", // Apprentissage pratique
    q7: "C", // Succès financier
    q8: "C", // Travail en équipe
    q9: "C", // Ambition
    q10: "C", // Défis commerciaux
    q11: "C", // Travail en équipe
    q12: "C", // Présentation commerciale
    q13: "C", // Décision rapide
    q14: "C" // Business/Commerce
};

// Profil Social (Santé/Social)
const socialProfile = {
    studentInfo: {
        email: "test.social@example.com",
        fullName: "Test Social",
        phone: "0444555666"
    },
    q1: "D", // Aider
    q2: "D", // Social
    q3: "D", // Expérience enrichissante
    q4: "D", // Approche empathique
    q5: "D", // Communication
    q6: "D", // Apprentissage pratique
    q7: "D", // Impact humain
    q8: "D", // Travail en équipe
    q9: "D", // Service aux autres
    q10: "D", // Défis humains
    q11: "D", // Travail en équipe
    q12: "D", // Présentation claire
    q13: "D", // Décision consensuelle
    q14: "D" // Santé/Social
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
            
            return recommendations;
        } else {
            console.log(`❌ Erreur pour ${profileName}: ${response.data.message}`);
            return null;
        }
    } catch (error) {
        console.log(`❌ Erreur pour ${profileName}: ${error.message}`);
        if (error.response) {
            console.log(`   Status: ${error.response.status}`);
            console.log(`   Data: ${JSON.stringify(error.response.data)}`);
        }
        return null;
    }
}

async function runTests() {
    console.log('🚀 TEST DE DIFFÉRENCIATION DES PROFILS');
    console.log('================================================================================');
    console.log('🎯 Test avec 4 profils très différents pour vérifier la différenciation');
    console.log('============================================================');
    
    const results = [];
    
    // Test profil technique
    const technicalResult = await testProfile('Profil Technique (Ingénieur)', technicalProfile);
    results.push({ name: 'Technique', data: technicalResult });
    
    // Test profil créatif
    const creativeResult = await testProfile('Profil Créatif (Artiste)', creativeProfile);
    results.push({ name: 'Créatif', data: creativeResult });
    
    // Test profil business
    const businessResult = await testProfile('Profil Business (Commercial)', businessProfile);
    results.push({ name: 'Business', data: businessResult });
    
    // Test profil social
    const socialResult = await testProfile('Profil Social (Santé/Social)', socialProfile);
    results.push({ name: 'Social', data: socialResult });
    
    // Analyse des différences
    console.log('\n🔍 ANALYSE DE LA DIFFÉRENCIATION');
    console.log('============================================================');
    
    const validResults = results.filter(r => r.data && r.data.length > 0);
    console.log(`✅ Tests réussis: ${validResults.length}/${results.length}`);
    
    if (validResults.length >= 2) {
        console.log('\n📊 Comparaison des top 3 recommandations:');
        
        validResults.forEach(result => {
            console.log(`\n${result.name}:`);
            result.data.slice(0, 3).forEach((rec, index) => {
                console.log(`   ${index + 1}. ${rec.majorName} (${rec.matchingPercentage})`);
            });
        });
        
        // Vérifier si les recommandations sont différentes
        const firstProfile = validResults[0].data.slice(0, 3).map(r => r.majorName);
        const secondProfile = validResults[1].data.slice(0, 3).map(r => r.majorName);
        
        const areDifferent = !firstProfile.every((major, index) => major === secondProfile[index]);
        
        if (areDifferent) {
            console.log('\n🎉 SUCCÈS: Les recommandations sont différenciées selon les profils !');
        } else {
            console.log('\n⚠️ ATTENTION: Les recommandations sont identiques - le système pourrait ne pas être assez différencié');
        }
        
        // Vérifier les scores
        const allScores = validResults.flatMap(r => r.data.map(rec => parseFloat(rec.matchingPercentage.replace('%', ''))));
        const maxScore = Math.max(...allScores);
        const minScore = Math.min(...allScores);
        
        console.log(`\n📈 Statistiques des scores:`);
        console.log(`   Score minimum: ${minScore.toFixed(1)}%`);
        console.log(`   Score maximum: ${maxScore.toFixed(1)}%`);
        console.log(`   Plage: ${(maxScore - minScore).toFixed(1)}%`);
        
        if (maxScore > 0) {
            console.log('✅ Les scores ne sont plus à 0% - le système fonctionne !');
        } else {
            console.log('❌ Les scores sont encore à 0% - le facteur de normalisation doit être encore augmenté');
        }
    } else {
        console.log('❌ Pas assez de tests réussis pour analyser la différenciation');
    }
}

runTests().catch(console.error);
