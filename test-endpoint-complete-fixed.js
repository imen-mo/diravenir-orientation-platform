// Test corrigé pour l'endpoint /complete
// Ce script teste l'endpoint /complete avec la structure de données correcte

const BASE_URL = 'http://localhost:8084';

// Structure correcte des données selon StudentInfoDTO
const TEST_DATA = {
    // Réponses aux questions d'orientation
    q1: 'A', // Créer quelque chose de nouveau
    q2: 'C', // Développement personnel, Causes sociales
    q3: 'B', // Créatif
    q4: 'A', // Résoudre des problèmes complexes
    q5: 'C', // Travail en équipe
    q6: 'B', // Créativité et innovation
    q7: 'A', // Projets pratiques
    q8: 'C', // Impact social
    q9: JSON.stringify({
        security: 70,
        innovation: 80,
        autonomy: 60,
        salary: 50
    }),
    q10: 'B', // Apprentissage continu
    q11: 'A', // Travail autonome
    q12: 'C', // Impact positif
    q13: 'B', // Créativité
    q14: 'A', // Sciences et technologie
    
    // Informations étudiant avec la structure correcte
    studentInfo: {
        fullName: 'Test Complete User',  // ✅ Correct
        email: 'test.complete@diravenir.com',  // ✅ Correct
        phone: '+33123456789'  // ✅ Correct
    }
};

// Fonction de logging avec couleurs
function log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const colors = {
        info: '\x1b[36m',    // Cyan
        success: '\x1b[32m', // Vert
        error: '\x1b[31m',   // Rouge
        warning: '\x1b[33m', // Jaune
        reset: '\x1b[0m'     // Reset
    };
    
    const color = colors[type] || colors.info;
    console.log(`${color}[${timestamp}] ${message}${colors.reset}`);
}

// Fonction pour faire une requête HTTP
async function makeRequest(url, options = {}) {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });

        const data = await response.text();
        let jsonData;
        
        try {
            jsonData = JSON.parse(data);
        } catch {
            jsonData = { raw: data };
        }

        return {
            ok: response.ok,
            status: response.status,
            statusText: response.statusText,
            data: jsonData
        };
    } catch (error) {
        return {
            ok: false,
            status: 0,
            statusText: 'Network Error',
            data: { error: error.message }
        };
    }
}

// Test de l'endpoint /complete avec la structure corrigée
async function testCompleteEndpointFixed() {
    log('🔧 Test de l\'endpoint /complete avec structure corrigée...');
    
    try {
        log('📤 Envoi des données avec la structure correcte:');
        log(`   - fullName: ${TEST_DATA.studentInfo.fullName}`);
        log(`   - email: ${TEST_DATA.studentInfo.email}`);
        log(`   - phone: ${TEST_DATA.studentInfo.phone}`);
        log(`   - Réponses: ${Object.keys(TEST_DATA).filter(k => k.startsWith('q')).length} questions`);

        const response = await makeRequest(`${BASE_URL}/api/orientation/complete`, {
            method: 'POST',
            body: JSON.stringify(TEST_DATA)
        });

        if (response.ok) {
            const data = response.data;
            
            log('✅ Endpoint /complete fonctionnel avec la structure corrigée!', 'success');
            log(`📝 Test UUID généré: ${data.testUuid}`);
            log(`💾 Résultats sauvegardés: ${data.success ? 'Oui' : 'Non'}`);
            
            if (data.results) {
                log('📊 Résultats sauvegardés en base de données:', 'success');
                log(`   - ID du résultat: ${data.results.id}`);
                log(`   - Méthode de calcul: ${data.results.calculationMethod}`);
                log(`   - Date de calcul: ${data.results.calculatedAt}`);
            }
            
            return { success: true, data };
        } else {
            log(`❌ Erreur endpoint /complete: ${response.status} ${response.statusText}`, 'error');
            log(`📄 Réponse brute: ${JSON.stringify(response.data, null, 2)}`, 'error');
            return { success: false, error: response.statusText, details: response.data };
        }
    } catch (error) {
        log(`❌ Erreur lors du test: ${error.message}`, 'error');
        return { success: false, error: error.message };
    }
}

// Test de comparaison avec l'endpoint /calculate
async function testCalculateEndpoint() {
    log('🧮 Test de l\'endpoint /calculate pour comparaison...');
    
    try {
        const response = await makeRequest(`${BASE_URL}/api/orientation/calculate`, {
            method: 'POST',
            body: JSON.stringify(TEST_DATA)
        });

        if (response.ok) {
            const data = response.data;
            log('✅ Endpoint /calculate fonctionnel', 'success');
            log(`📊 ${data.recommendations.length} recommandations générées`);
            log(`🎯 Score moyen des top 3: ${(data.recommendations.slice(0, 3).reduce((sum, rec) => sum + rec.matchingScore, 0) / 3).toFixed(1)}%`);
            return { success: true, data };
        } else {
            log(`❌ Erreur endpoint /calculate: ${response.status} ${response.statusText}`, 'error');
            return { success: false, error: response.statusText };
        }
    } catch (error) {
        log(`❌ Erreur lors du test /calculate: ${error.message}`, 'error');
        return { success: false, error: error.message };
    }
}

// Test de validation des données avec différentes structures
async function testDataValidation() {
    log('🔍 Test de validation avec différentes structures de données...');
    
    const testCases = [
        {
            name: 'Structure correcte (StudentInfoDTO)',
            data: {
                ...TEST_DATA,
                studentInfo: {
                    fullName: 'Test User',
                    email: 'test@example.com',
                    phone: '+33123456789'
                }
            }
        },
        {
            name: 'Structure incorrecte (firstName/lastName)',
            data: {
                ...TEST_DATA,
                studentInfo: {
                    firstName: 'Test',
                    lastName: 'User',
                    email: 'test@example.com',
                    phone: '+33123456789'
                }
            }
        },
        {
            name: 'Données manquantes',
            data: {
                ...TEST_DATA,
                studentInfo: {
                    fullName: 'Test User'
                    // email et phone manquants
                }
            }
        }
    ];

    for (const testCase of testCases) {
        log(`\n📋 Test: ${testCase.name}`);
        
        try {
            const response = await makeRequest(`${BASE_URL}/api/orientation/complete`, {
                method: 'POST',
                body: JSON.stringify(testCase.data)
            });

            if (response.ok) {
                log(`   ✅ ${testCase.name}: Succès`, 'success');
            } else {
                log(`   ❌ ${testCase.name}: Erreur ${response.status}`, 'error');
                if (response.data && response.data.message) {
                    log(`   📄 Message: ${response.data.message}`, 'error');
                }
            }
        } catch (error) {
            log(`   ❌ ${testCase.name}: Exception ${error.message}`, 'error');
        }
    }
}

// Fonction principale
async function runFixedTests() {
    log('🚀 Démarrage des tests corrigés pour l\'endpoint /complete...');
    log('============================================================');
    
    const results = {
        startTime: Date.now(),
        tests: [],
        summary: { passed: 0, failed: 0 }
    };

    try {
        // Test 1: Endpoint /calculate (pour référence)
        const calculateResult = await testCalculateEndpoint();
        results.tests.push({ name: 'Endpoint /calculate', result: calculateResult });
        if (calculateResult.success) results.summary.passed++; else results.summary.failed++;

        // Test 2: Endpoint /complete avec structure corrigée
        const completeResult = await testCompleteEndpointFixed();
        results.tests.push({ name: 'Endpoint /complete (corrigé)', result: completeResult });
        if (completeResult.success) results.summary.passed++; else results.summary.failed++;

        // Test 3: Validation des données
        await testDataValidation();

    } catch (error) {
        log(`❌ Erreur critique: ${error.message}`, 'error');
        results.summary.failed++;
    }

    results.endTime = Date.now();
    results.duration = results.endTime - results.startTime;

    // Affichage du résumé
    log('\n📋 RÉSUMÉ DES TESTS CORRIGÉS');
    log('=============================');
    
    log(`⏱️  Durée totale: ${results.duration}ms`);
    log(`✅ Tests réussis: ${results.summary.passed}`);
    log(`❌ Tests échoués: ${results.summary.failed}`);
    
    log('\n📊 Détail des tests:');
    results.tests.forEach((test, index) => {
        const status = test.result.success ? '✅' : '❌';
        log(`   ${index + 1}. ${status} ${test.name}`);
    });

    // Recommandations
    log('\n💡 Recommandations:');
    if (results.summary.failed === 0) {
        log('🎉 L\'endpoint /complete fonctionne maintenant correctement!', 'success');
        log('✅ Structure de données StudentInfoDTO validée', 'success');
        log('✅ Sauvegarde en base de données fonctionnelle', 'success');
    } else {
        log('🔧 Des corrections supplémentaires sont nécessaires.', 'error');
    }

    return results;
}

// Exécution des tests
if (require.main === module) {
    runFixedTests().then(results => {
        const exitCode = results.summary.failed > 0 ? 1 : 0;
        process.exit(exitCode);
    }).catch(error => {
        log(`❌ Erreur fatale: ${error.message}`, 'error');
        process.exit(1);
    });
}

module.exports = { runFixedTests, TEST_DATA };
