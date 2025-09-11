// Utilisation du fetch intégré de Node.js 18+

async function testAPI() {
    try {
        console.log('🔍 Test de la réponse complète du backend...');
        
        const requestData = {
            "q1": "B",
            "q2": "A", 
            "q3": "A",
            "q4": "A",
            "q5": "F",
            "q6": "A",
            "q7": "A",
            "q8": "A",
            "q9": "B",
            "q10": "A",
            "q11": "B",
            "q12": "A",
            "q13": "A",
            "q14": "A",
            "studentInfo": {
                "fullName": "Ahmed Benali",
                "email": "ahmed.benali@email.com",
                "phone": "0661234567"
            }
        };

        const response = await fetch('http://localhost:8084/api/orientation/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        });

        console.log(`📡 Status: ${response.status}`);
        
        if (response.ok) {
            const data = await response.json();
            console.log('\n✅ Réponse complète du backend:');
            console.log(JSON.stringify(data, null, 2));
            
            // Vérifier les descriptions
            if (data.recommendations && data.recommendations.length > 0) {
                console.log('\n📝 Vérification des descriptions:');
                data.recommendations.slice(0, 3).forEach((rec, index) => {
                    console.log(`${index + 1}. ${rec.majorName}:`);
                    console.log(`   - description: "${rec.description || 'MANQUANT'}"`);
                    console.log(`   - whyThisMajor: "${rec.whyThisMajor || 'MANQUANT'}"`);
                    console.log(`   - reasoning: "${rec.reasoning || 'MANQUANT'}"`);
                });
            }
        } else {
            console.log('❌ Erreur:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('❌ Erreur de connexion:', error.message);
    }
}

testAPI();
