// Test avec un profil créatif et artistique
// Utilisation du fetch intégré de Node.js 18+

async function testCreativeProfile() {
    try {
        console.log('🎨 Test avec un profil CRÉATIF et ARTISTIQUE...');
        
        const creativeProfile = {
            "q1": "A",  // Créer (artistique)
            "q2": "C",  // Arts et créativité
            "q3": "B",  // Cadeau artistique
            "q4": "B",  // Approche créative
            "q5": "C",  // Compétences créatives
            "q6": "B",  // Apprentissage visuel
            "q7": "C",  // Valeurs créatives
            "q8": "B",  // Environnement créatif
            "q9": "C",  // Priorités artistiques
            "q10": "B", // Défis créatifs
            "q11": "B", // Travail créatif
            "q12": "B", // Présentation créative
            "q13": "B", // Décision créative
            "q14": "C", // Matières artistiques
            "studentInfo": {
                "fullName": "Sara Créative",
                "email": "sara.creative@email.com",
                "phone": "0661234567"
            }
        };

        const response = await fetch('http://localhost:8084/api/orientation/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(creativeProfile)
        });

        console.log(`📡 Status: ${response.status}`);
        
        if (response.ok) {
            const data = await response.json();
            
            console.log('\n🎨 PROFIL CRÉATIF - Top 5 Recommandations:');
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

testCreativeProfile();
