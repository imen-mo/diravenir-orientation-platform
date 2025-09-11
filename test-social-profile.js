// Test avec un profil social et humain
async function testSocialProfile() {
    try {
        console.log('👥 Test avec un profil SOCIAL et HUMAIN...');
        
        const socialProfile = {
            "q1": "C",  // Aider les autres
            "q2": "B",  // Sciences humaines
            "q3": "C",  // Cadeau social
            "q4": "C",  // Approche sociale
            "q5": "A",  // Compétences sociales
            "q6": "C",  // Apprentissage collaboratif
            "q7": "A",  // Valeurs sociales
            "q8": "C",  // Environnement social
            "q9": "A",  // Priorités sociales
            "q10": "C", // Défis sociaux
            "q11": "C", // Travail en équipe
            "q12": "C", // Présentation sociale
            "q13": "C", // Décision collaborative
            "q14": "B", // Matières sociales
            "studentInfo": {
                "fullName": "Omar Social",
                "email": "omar.social@email.com",
                "phone": "0661234567"
            }
        };

        const response = await fetch('http://localhost:8084/api/orientation/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(socialProfile)
        });

        console.log(`📡 Status: ${response.status}`);
        
        if (response.ok) {
            const data = await response.json();
            
            console.log('\n👥 PROFIL SOCIAL - Top 5 Recommandations:');
            data.recommendations.slice(0, 5).forEach((rec, index) => {
                console.log(`${index + 1}. ${rec.majorName} - ${rec.matchingScore.toFixed(1)}%`);
                console.log(`   📝 ${rec.description}`);
                console.log(`   💡 ${rec.whyThisMajor}`);
                console.log('');
            });
            
            console.log('🎯 Profil utilisateur calculé:');
            console.log(`   🎨 Intérêt Artistique: ${data.userProfile.Interet_Artistique_Creatif || 0}%`);
            console.log(`   🧠 Logique Analytique: ${data.userProfile.Interet_Logique_Analytique || 0}%`);
            console.log(`   🔬 Intérêt Scientifique: ${data.userProfile.Interet_Scientifique_Tech || 0}%`);
            console.log(`   👥 Intérêt Social: ${data.userProfile.Interet_Social_Humain || 0}%`);
            
        } else {
            console.log('❌ Erreur:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('❌ Erreur de connexion:', error.message);
    }
}

testSocialProfile();
