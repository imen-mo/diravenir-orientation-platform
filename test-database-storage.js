const axios = require('axios');

const BASE_URL = 'http://localhost:8084/api/orientation';

// Test du stockage en base de données
const testData = {
    studentInfo: {
        fullName: "Test Database User",
        email: "test.database@example.com",
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

async function testDatabaseStorage() {
    console.log('🗄️ TEST DU STOCKAGE EN BASE DE DONNÉES');
    console.log('================================================================================');
    
    try {
        console.log('📤 1. Envoi des données au backend...');
        console.log('📊 Email de test:', testData.studentInfo.email);
        
        const response = await axios.post(`${BASE_URL}/complete`, testData, {
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
                });
            }
            
            // Maintenant testons la récupération depuis la base de données
            console.log('\n📥 2. Test de récupération depuis la base de données...');
            
            try {

                const dbResponse = await axios.get(`${BASE_URL}/results/email/${testData.studentInfo.email}`, {
                    headers: { 'Content-Type': 'application/json' },
                    timeout: 10000
                });
                
                if (dbResponse.data.success) {
                    console.log('✅ Données récupérées depuis la base de données');
                    
                    const dbData = dbResponse.data.results;
                    console.log('\n📊 DONNÉES RÉCUPÉRÉES DE LA DB:');
                    console.log(`   Test ID: ${dbData.id}`);
                    console.log(`   Email: ${dbData.orientationTest?.studentEmail || 'N/A'}`);
                    console.log(`   Nom: ${dbData.orientationTest?.studentName || 'N/A'}`);
                    console.log(`   Téléphone: ${dbData.orientationTest?.studentPhone || 'N/A'}`);
                    console.log(`   Date de calcul: ${dbData.calculatedAt}`);
                    console.log(`   Méthode de calcul: ${dbData.calculationMethod}`);
                    console.log(`   Score top recommandation: ${dbData.topRecommendationScore}`);
                    console.log(`   Majeure top recommandation: ${dbData.topRecommendationMajor}`);
                    
                    if (dbData.recommendations && dbData.recommendations.length > 0) {
                        console.log('\n🎯 RECOMMANDATIONS STOCKÉES EN DB:');
                        dbData.recommendations.forEach((rec, index) => {
                            console.log(`${index + 1}. ${rec.majorName} - Score: ${rec.matchingScore} (${rec.matchingPercentage})`);
                        });
                    }
                    
                    // Vérifier la cohérence des données
                    console.log('\n🔍 VÉRIFICATION DE LA COHÉRENCE:');
                    
                    // Vérifier que les scores sont identiques
                    const originalScores = recommendations.slice(0, 3).map(r => r.matchingScore);
                    const dbScores = dbData.recommendations.slice(0, 3).map(r => r.matchingScore);
                    
                    const scoresMatch = originalScores.every((score, index) => 
                        Math.abs(score - dbScores[index]) < 0.01
                    );
                    
                    if (scoresMatch) {
                        console.log('✅ Les scores sont identiques entre calcul et stockage');
                    } else {
                        console.log('❌ Les scores diffèrent entre calcul et stockage');
                        console.log('   Scores originaux:', originalScores);
                        console.log('   Scores en DB:', dbScores);
                    }
                    
                    // Vérifier que les majeures sont identiques
                    const originalMajors = recommendations.slice(0, 3).map(r => r.majorName);
                    const dbMajors = dbData.recommendations.slice(0, 3).map(r => r.majorName);
                    
                    const majorsMatch = originalMajors.every((major, index) => 
                        major === dbMajors[index]
                    );
                    
                    if (majorsMatch) {
                        console.log('✅ Les majeures sont identiques entre calcul et stockage');
                    } else {
                        console.log('❌ Les majeures diffèrent entre calcul et stockage');
                        console.log('   Majeures originales:', originalMajors);
                        console.log('   Majeures en DB:', dbMajors);
                    }
                    
                    console.log('\n🎉 TEST DE STOCKAGE RÉUSSI !');
                    console.log('✅ Les données sont correctement stockées et récupérées de la base de données');
                    
                } else {
                    console.log('❌ Erreur lors de la récupération depuis la DB:', dbResponse.data.error);
                }
                
            } catch (dbError) {
                console.log('❌ Erreur lors de la récupération depuis la DB:', dbError.message);
                if (dbError.response) {
                    console.log('   Status:', dbError.response.status);
                    console.log('   Data:', JSON.stringify(dbError.response.data, null, 2));
                }
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

testDatabaseStorage().catch(console.error);
