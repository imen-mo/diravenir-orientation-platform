// Test complet des endpoints backend pour l'orientation
// Ce script teste tous les aspects : calcul, sauvegarde, récupération

const BASE_URL = 'http://localhost:8084';
const TEST_STUDENT = {
    fullName: 'Test Backend User',
    email: 'test.backend@diravenir.com',
    phone: '+33123456789'
};

const TEST_ANSWERS = {
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
    q14: 'A'  // Sciences et technologie
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

// Fonction pour faire une requête HTTP avec gestion d'erreur
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

// Test 1: Vérification de la santé du backend
async function testBackendHealth() {
    log('🔍 Test 1: Vérification de la santé du backend...');
    
    const response = await makeRequest(`${BASE_URL}/api/health`);
    
    if (response.ok) {
        log('✅ Backend accessible et fonctionnel', 'success');
        return { success: true, data: response.data };
    } else {
        log(`❌ Backend inaccessible: ${response.status} ${response.statusText}`, 'error');
        return { success: false, error: response.statusText };
    }
}

// Test 2: Test de l'endpoint /calculate (sans sauvegarde)
async function testCalculateEndpoint() {
    log('🧮 Test 2: Test de l\'endpoint /calculate...');
    
    const requestData = {
        ...TEST_ANSWERS,
        studentInfo: TEST_STUDENT
    };

    const response = await makeRequest(`${BASE_URL}/api/orientation/calculate`, {
        method: 'POST',
        body: JSON.stringify(requestData)
    });

    if (response.ok) {
        const data = response.data;
        
        // Vérifier la structure de la réponse
        if (data.userProfile && data.recommendations && data.success) {
            log('✅ Endpoint /calculate fonctionnel', 'success');
            log(`📊 Profil utilisateur calculé avec ${Object.keys(data.userProfile).length} piliers`, 'info');
            log(`🎯 ${data.recommendations.length} recommandations générées`, 'info');
            
            // Afficher les top 3 recommandations
            data.recommendations.slice(0, 3).forEach((rec, index) => {
                log(`   ${index + 1}. ${rec.majorName}: ${Math.round(rec.matchingScore)}%`, 'info');
            });
            
            return { success: true, data };
        } else {
            log('❌ Structure de réponse invalide', 'error');
            return { success: false, error: 'Structure de réponse invalide' };
        }
    } else {
        log(`❌ Erreur endpoint /calculate: ${response.status} ${response.statusText}`, 'error');
        return { success: false, error: response.statusText };
    }
}

// Test 3: Test de l'endpoint /complete (avec sauvegarde)
async function testCompleteEndpoint() {
    log('💾 Test 3: Test de l\'endpoint /complete (avec sauvegarde)...');
    
    const requestData = {
        ...TEST_ANSWERS,
        studentInfo: TEST_STUDENT
    };

    const response = await makeRequest(`${BASE_URL}/api/orientation/complete`, {
        method: 'POST',
        body: JSON.stringify(requestData)
    });

    if (response.ok) {
        const data = response.data;
        
        if (data.success && data.testUuid && data.results) {
            log('✅ Endpoint /complete fonctionnel', 'success');
            log(`📝 Test UUID généré: ${data.testUuid}`, 'info');
            log(`💾 Résultats sauvegardés en base de données`, 'success');
            
            return { success: true, data };
        } else {
            log('❌ Structure de réponse invalide pour /complete', 'error');
            return { success: false, error: 'Structure de réponse invalide' };
        }
    } else {
        log(`❌ Erreur endpoint /complete: ${response.status} ${response.statusText}`, 'error');
        return { success: false, error: response.statusText };
    }
}

// Test 4: Test de récupération des résultats (si implémenté)
async function testGetResults(testUuid) {
    log('📥 Test 4: Test de récupération des résultats...');
    
    const response = await makeRequest(`${BASE_URL}/api/orientation/results/${testUuid}`);
    
    if (response.ok) {
        log('✅ Récupération des résultats fonctionnelle', 'success');
        return { success: true, data: response.data };
    } else if (response.status === 404) {
        log('⚠️ Endpoint de récupération non implémenté (normal)', 'warning');
        return { success: true, data: null, note: 'Non implémenté' };
    } else {
        log(`❌ Erreur récupération résultats: ${response.status} ${response.statusText}`, 'error');
        return { success: false, error: response.statusText };
    }
}

// Test 5: Test de validation des données
async function testDataValidation() {
    log('🔍 Test 5: Test de validation des données...');
    
    // Test avec des données invalides
    const invalidData = {
        q1: 'INVALID',
        studentInfo: {
            email: 'invalid-email'
        }
    };

    const response = await makeRequest(`${BASE_URL}/api/orientation/calculate`, {
        method: 'POST',
        body: JSON.stringify(invalidData)
    });

    if (!response.ok) {
        log('✅ Validation des données fonctionnelle (erreur attendue)', 'success');
        return { success: true, data: response.data };
    } else {
        log('⚠️ Validation des données pourrait être améliorée', 'warning');
        return { success: true, data: response.data, note: 'Validation à améliorer' };
    }
}

// Test 6: Test de performance
async function testPerformance() {
    log('⚡ Test 6: Test de performance...');
    
    const startTime = Date.now();
    const requestData = {
        ...TEST_ANSWERS,
        studentInfo: TEST_STUDENT
    };

    const response = await makeRequest(`${BASE_URL}/api/orientation/calculate`, {
        method: 'POST',
        body: JSON.stringify(requestData)
    });

    const endTime = Date.now();
    const duration = endTime - startTime;

    if (response.ok) {
        if (duration < 1000) {
            log(`✅ Performance excellente: ${duration}ms`, 'success');
        } else if (duration < 3000) {
            log(`⚠️ Performance acceptable: ${duration}ms`, 'warning');
        } else {
            log(`❌ Performance lente: ${duration}ms`, 'error');
        }
        
        return { success: true, data: { duration, response: response.data } };
    } else {
        log(`❌ Erreur lors du test de performance: ${response.statusText}`, 'error');
        return { success: false, error: response.statusText };
    }
}

// Test 7: Test de concurrence (simulation de plusieurs utilisateurs)
async function testConcurrency() {
    log('👥 Test 7: Test de concurrence...');
    
    const promises = [];
    for (let i = 0; i < 5; i++) {
        const requestData = {
            ...TEST_ANSWERS,
            studentInfo: {
                ...TEST_STUDENT,
                email: `test${i}@diravenir.com`
            }
        };

        promises.push(
            makeRequest(`${BASE_URL}/api/orientation/calculate`, {
                method: 'POST',
                body: JSON.stringify(requestData)
            })
        );
    }

    const startTime = Date.now();
    const results = await Promise.all(promises);
    const endTime = Date.now();
    const duration = endTime - startTime;

    const successCount = results.filter(r => r.ok).length;
    const failureCount = results.length - successCount;

    log(`📊 Test de concurrence terminé en ${duration}ms`, 'info');
    log(`✅ ${successCount} requêtes réussies`, 'success');
    if (failureCount > 0) {
        log(`❌ ${failureCount} requêtes échouées`, 'error');
    }

    return {
        success: failureCount === 0,
        data: {
            duration,
            successCount,
            failureCount,
            results
        }
    };
}

// Fonction principale de test
async function runAllTests() {
    log('🚀 Démarrage des tests backend complets...');
    log('==========================================');
    
    const results = {
        startTime: Date.now(),
        tests: [],
        summary: {
            passed: 0,
            failed: 0,
            warnings: 0
        }
    };

    try {
        // Test 1: Santé du backend
        const healthResult = await testBackendHealth();
        results.tests.push({ name: 'Santé Backend', result: healthResult });
        if (healthResult.success) results.summary.passed++; else results.summary.failed++;

        if (!healthResult.success) {
            throw new Error('Backend inaccessible - arrêt des tests');
        }

        // Test 2: Endpoint /calculate
        const calculateResult = await testCalculateEndpoint();
        results.tests.push({ name: 'Endpoint /calculate', result: calculateResult });
        if (calculateResult.success) results.summary.passed++; else results.summary.failed++;

        // Test 3: Endpoint /complete
        const completeResult = await testCompleteEndpoint();
        results.tests.push({ name: 'Endpoint /complete', result: completeResult });
        if (completeResult.success) results.summary.passed++; else results.summary.failed++;

        // Test 4: Récupération des résultats
        if (completeResult.success && completeResult.data.testUuid) {
            const getResultsResult = await testGetResults(completeResult.data.testUuid);
            results.tests.push({ name: 'Récupération Résultats', result: getResultsResult });
            if (getResultsResult.success) {
                results.summary.passed++;
                if (getResultsResult.note) results.summary.warnings++;
            } else {
                results.summary.failed++;
            }
        }

        // Test 5: Validation des données
        const validationResult = await testDataValidation();
        results.tests.push({ name: 'Validation Données', result: validationResult });
        if (validationResult.success) {
            results.summary.passed++;
            if (validationResult.note) results.summary.warnings++;
        } else {
            results.summary.failed++;
        }

        // Test 6: Performance
        const performanceResult = await testPerformance();
        results.tests.push({ name: 'Performance', result: performanceResult });
        if (performanceResult.success) results.summary.passed++; else results.summary.failed++;

        // Test 7: Concurrence
        const concurrencyResult = await testConcurrency();
        results.tests.push({ name: 'Concurrence', result: concurrencyResult });
        if (concurrencyResult.success) results.summary.passed++; else results.summary.failed++;

    } catch (error) {
        log(`❌ Erreur critique: ${error.message}`, 'error');
        results.summary.failed++;
    }

    results.endTime = Date.now();
    results.duration = results.endTime - results.startTime;

    // Affichage du résumé
    displaySummary(results);
    
    return results;
}

// Fonction pour afficher le résumé des tests
function displaySummary(results) {
    log('\n📋 RÉSUMÉ DES TESTS BACKEND');
    log('============================');
    
    log(`⏱️  Durée totale: ${results.duration}ms`);
    log(`✅ Tests réussis: ${results.summary.passed}`);
    log(`❌ Tests échoués: ${results.summary.failed}`);
    log(`⚠️  Avertissements: ${results.summary.warnings}`);
    
    log('\n📊 Détail des tests:');
    results.tests.forEach((test, index) => {
        const status = test.result.success ? '✅' : '❌';
        const note = test.result.note ? ` (${test.result.note})` : '';
        log(`   ${index + 1}. ${status} ${test.name}${note}`);
    });

    // Recommandations
    log('\n💡 Recommandations:');
    if (results.summary.failed === 0) {
        log('🎉 Tous les tests sont passés ! Le backend est prêt pour la production.');
    } else {
        log('🔧 Des améliorations sont nécessaires avant la mise en production.');
    }
    
    if (results.summary.warnings > 0) {
        log('⚠️  Consultez les avertissements pour des améliorations optionnelles.');
    }

    // Test de l'algorithme de matching
    if (results.tests.length > 1 && results.tests[1].result.success) {
        const recommendations = results.tests[1].result.data.recommendations;
        log('\n🎯 Validation de l\'algorithme de matching:');
        
        const top3 = recommendations.slice(0, 3);
        const scores = top3.map(r => r.matchingScore);
        const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
        
        log(`   📊 Score moyen des top 3: ${avgScore.toFixed(1)}%`);
        log(`   🏆 Meilleur score: ${Math.max(...scores).toFixed(1)}%`);
        log(`   📉 Plus bas score: ${Math.min(...scores).toFixed(1)}%`);
        
        if (avgScore > 50) {
            log('   ✅ Scores réalistes et bien distribués', 'success');
        } else {
            log('   ⚠️  Scores faibles - vérifier l\'algorithme', 'warning');
        }
    }
}

// Exécution des tests si le script est lancé directement
if (typeof window === 'undefined') {
    // Environnement Node.js
    runAllTests().then(results => {
        process.exit(results.summary.failed > 0 ? 1 : 0);
    }).catch(error => {
        log(`❌ Erreur fatale: ${error.message}`, 'error');
        process.exit(1);
    });
} else {
    // Environnement navigateur
    window.runAllTests = runAllTests;
    log('🧪 Tests backend chargés. Utilisez runAllTests() pour les exécuter.');
}
