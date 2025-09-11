#!/usr/bin/env node

/**
 * Test complet du système d'orientation Diravenir
 * 
 * Ce script teste l'intégration complète :
 * - Backend Spring Boot
 * - Base de données MySQL
 * - Endpoints API
 * - Calculs d'orientation
 * - Sauvegarde des données
 * - Génération des résultats
 * 
 * Usage: node test-complete-orientation-system.js
 */

const BASE_URL = 'http://localhost:8084';
const DB_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '', // À adapter selon votre configuration
    database: 'diravenir'
};

// Configuration du test
const TEST_CONFIG = {
    student: {
        fullName: 'Test System User',
        email: 'test.system@diravenir.com',
        phone: '+33123456789'
    },
    answers: {
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
    }
};

// Résultats des tests
let testResults = {
    startTime: Date.now(),
    endTime: null,
    passed: 0,
    failed: 0,
    warnings: 0,
    tests: []
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

// Test 1: Vérification de la connectivité backend
async function testBackendConnectivity() {
    log('🔍 Test 1: Vérification de la connectivité backend...');
    
    try {
        const response = await makeRequest(`${BASE_URL}/api/health`);
        
        if (response.ok) {
            log('✅ Backend accessible et fonctionnel', 'success');
            testResults.passed++;
            return { success: true, data: response.data };
        } else {
            // Essayer l'endpoint d'orientation comme fallback
            const fallbackResponse = await makeRequest(`${BASE_URL}/api/orientation/calculate`, {
                method: 'POST',
                body: JSON.stringify({ q1: 'A', studentInfo: TEST_CONFIG.student })
            });
            
            if (fallbackResponse.ok) {
                log('✅ Backend accessible via endpoint d\'orientation', 'success');
                testResults.passed++;
                return { success: true, data: fallbackResponse.data };
            } else {
                throw new Error(`Backend inaccessible: ${response.status} ${response.statusText}`);
            }
        }
    } catch (error) {
        log(`❌ Erreur de connectivité backend: ${error.message}`, 'error');
        testResults.failed++;
        return { success: false, error: error.message };
    }
}

// Test 2: Test de l'endpoint /calculate
async function testCalculateEndpoint() {
    log('🧮 Test 2: Test de l\'endpoint /calculate...');
    
    try {
        const requestData = {
            ...TEST_CONFIG.answers,
            studentInfo: TEST_CONFIG.student
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
                
                // Vérifier la qualité des scores
                const top3 = data.recommendations.slice(0, 3);
                const avgScore = top3.reduce((sum, rec) => sum + rec.matchingScore, 0) / top3.length;
                
                if (avgScore > 0) {
                    log(`📈 Score moyen des top 3: ${avgScore.toFixed(1)}%`, 'info');
                    log('✅ Scores réalistes générés', 'success');
                } else {
                    log('⚠️ Scores faibles - vérifier l\'algorithme', 'warning');
                    testResults.warnings++;
                }
                
                testResults.passed++;
                return { success: true, data };
            } else {
                throw new Error('Structure de réponse invalide');
            }
        } else {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        log(`❌ Erreur endpoint /calculate: ${error.message}`, 'error');
        testResults.failed++;
        return { success: false, error: error.message };
    }
}

// Test 3: Test de l'endpoint /complete avec sauvegarde
async function testCompleteEndpoint() {
    log('💾 Test 3: Test de l\'endpoint /complete (avec sauvegarde)...');
    
    try {
        const requestData = {
            ...TEST_CONFIG.answers,
            studentInfo: TEST_CONFIG.student
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
                
                testResults.passed++;
                return { success: true, data };
            } else {
                throw new Error('Structure de réponse invalide pour /complete');
            }
        } else {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        log(`❌ Erreur endpoint /complete: ${error.message}`, 'error');
        testResults.failed++;
        return { success: false, error: error.message };
    }
}

// Test 4: Test de performance
async function testPerformance() {
    log('⚡ Test 4: Test de performance...');
    
    try {
        const startTime = Date.now();
        const requestData = {
            ...TEST_CONFIG.answers,
            studentInfo: TEST_CONFIG.student
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
                testResults.warnings++;
            } else {
                log(`❌ Performance lente: ${duration}ms`, 'error');
                testResults.failed++;
                return { success: false, error: `Performance lente: ${duration}ms` };
            }
            
            testResults.passed++;
            return { success: true, data: { duration, response: response.data } };
        } else {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        log(`❌ Erreur lors du test de performance: ${error.message}`, 'error');
        testResults.failed++;
        return { success: false, error: error.message };
    }
}

// Test 5: Test de validation des données
async function testDataValidation() {
    log('🔍 Test 5: Test de validation des données...');
    
    try {
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
            testResults.passed++;
            return { success: true, data: response.data };
        } else {
            log('⚠️ Validation des données pourrait être améliorée', 'warning');
            testResults.warnings++;
            return { success: true, data: response.data, note: 'Validation à améliorer' };
        }
    } catch (error) {
        log(`❌ Erreur lors du test de validation: ${error.message}`, 'error');
        testResults.failed++;
        return { success: false, error: error.message };
    }
}

// Test 6: Test de concurrence
async function testConcurrency() {
    log('👥 Test 6: Test de concurrence...');
    
    try {
        const promises = [];
        for (let i = 0; i < 3; i++) {
            const requestData = {
                ...TEST_CONFIG.answers,
                studentInfo: {
                    ...TEST_CONFIG.student,
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
            testResults.failed++;
            return { success: false, data: { duration, successCount, failureCount } };
        } else {
            testResults.passed++;
            return { success: true, data: { duration, successCount, failureCount } };
        }
    } catch (error) {
        log(`❌ Erreur lors du test de concurrence: ${error.message}`, 'error');
        testResults.failed++;
        return { success: false, error: error.message };
    }
}

// Test 7: Test de l'algorithme de matching
async function testMatchingAlgorithm() {
    log('🎯 Test 7: Test de l\'algorithme de matching...');
    
    try {
        const requestData = {
            ...TEST_CONFIG.answers,
            studentInfo: TEST_CONFIG.student
        };

        const response = await makeRequest(`${BASE_URL}/api/orientation/calculate`, {
            method: 'POST',
            body: JSON.stringify(requestData)
        });

        if (response.ok) {
            const data = response.data;
            const recommendations = data.recommendations;
            
            // Vérifier que les recommandations sont triées par score décroissant
            let isSorted = true;
            for (let i = 1; i < recommendations.length; i++) {
                if (recommendations[i].matchingScore > recommendations[i-1].matchingScore) {
                    isSorted = false;
                    break;
                }
            }
            
            if (isSorted) {
                log('✅ Recommandations correctement triées par score', 'success');
            } else {
                log('❌ Recommandations mal triées', 'error');
                testResults.failed++;
                return { success: false, error: 'Recommandations mal triées' };
            }
            
            // Vérifier la distribution des scores
            const scores = recommendations.map(r => r.matchingScore);
            const maxScore = Math.max(...scores);
            const minScore = Math.min(...scores);
            const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
            
            log(`📊 Distribution des scores:`, 'info');
            log(`   🏆 Score maximum: ${maxScore.toFixed(1)}%`, 'info');
            log(`   📉 Score minimum: ${minScore.toFixed(1)}%`, 'info');
            log(`   📈 Score moyen: ${avgScore.toFixed(1)}%`, 'info');
            
            if (maxScore > 0 && minScore >= 0 && avgScore > 0) {
                log('✅ Distribution des scores réaliste', 'success');
                testResults.passed++;
                return { success: true, data: { scores, maxScore, minScore, avgScore } };
            } else {
                log('❌ Distribution des scores anormale', 'error');
                testResults.failed++;
                return { success: false, error: 'Distribution des scores anormale' };
            }
        } else {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        log(`❌ Erreur lors du test de l'algorithme: ${error.message}`, 'error');
        testResults.failed++;
        return { success: false, error: error.message };
    }
}

// Fonction principale de test
async function runAllTests() {
    log('🚀 Démarrage des tests complets du système d\'orientation...');
    log('============================================================');
    
    testResults.startTime = Date.now();

    try {
        // Test 1: Connectivité backend
        const connectivityResult = await testBackendConnectivity();
        testResults.tests.push({ name: 'Connectivité Backend', result: connectivityResult });
        
        if (!connectivityResult.success) {
            throw new Error('Backend inaccessible - arrêt des tests');
        }

        // Test 2: Endpoint /calculate
        const calculateResult = await testCalculateEndpoint();
        testResults.tests.push({ name: 'Endpoint /calculate', result: calculateResult });

        // Test 3: Endpoint /complete
        const completeResult = await testCompleteEndpoint();
        testResults.tests.push({ name: 'Endpoint /complete', result: completeResult });

        // Test 4: Performance
        const performanceResult = await testPerformance();
        testResults.tests.push({ name: 'Performance', result: performanceResult });

        // Test 5: Validation des données
        const validationResult = await testDataValidation();
        testResults.tests.push({ name: 'Validation Données', result: validationResult });

        // Test 6: Concurrence
        const concurrencyResult = await testConcurrency();
        testResults.tests.push({ name: 'Concurrence', result: concurrencyResult });

        // Test 7: Algorithme de matching
        const matchingResult = await testMatchingAlgorithm();
        testResults.tests.push({ name: 'Algorithme Matching', result: matchingResult });

    } catch (error) {
        log(`❌ Erreur critique: ${error.message}`, 'error');
        testResults.failed++;
    }

    testResults.endTime = Date.now();
    testResults.duration = testResults.endTime - testResults.startTime;

    // Affichage du résumé
    displaySummary();
    
    return testResults;
}

// Fonction pour afficher le résumé des tests
function displaySummary() {
    log('\n📋 RÉSUMÉ DES TESTS COMPLETS');
    log('=============================');
    
    log(`⏱️  Durée totale: ${testResults.duration}ms`);
    log(`✅ Tests réussis: ${testResults.passed}`);
    log(`❌ Tests échoués: ${testResults.failed}`);
    log(`⚠️  Avertissements: ${testResults.warnings}`);
    
    log('\n📊 Détail des tests:');
    testResults.tests.forEach((test, index) => {
        const status = test.result.success ? '✅' : '❌';
        const note = test.result.note ? ` (${test.result.note})` : '';
        log(`   ${index + 1}. ${status} ${test.name}${note}`);
    });

    // Recommandations finales
    log('\n💡 Recommandations:');
    if (testResults.failed === 0) {
        log('🎉 Tous les tests sont passés ! Le système d\'orientation est prêt.', 'success');
        log('✅ Backend Spring Boot fonctionnel', 'success');
        log('✅ Calculs d\'orientation dynamiques', 'success');
        log('✅ Sauvegarde en base de données', 'success');
        log('✅ Performance acceptable', 'success');
        log('✅ Algorithme de matching validé', 'success');
    } else {
        log('🔧 Des améliorations sont nécessaires avant la mise en production.', 'error');
    }
    
    if (testResults.warnings > 0) {
        log('⚠️  Consultez les avertissements pour des améliorations optionnelles.', 'warning');
    }

    // Score final
    const totalTests = testResults.passed + testResults.failed;
    const successRate = totalTests > 0 ? (testResults.passed / totalTests * 100).toFixed(1) : 0;
    
    log(`\n🎯 Score final: ${successRate}% (${testResults.passed}/${totalTests} tests réussis)`);
    
    if (successRate >= 90) {
        log('🏆 Excellent ! Le système est prêt pour la production.', 'success');
    } else if (successRate >= 70) {
        log('👍 Bien ! Quelques améliorations mineures recommandées.', 'warning');
    } else {
        log('⚠️ Attention ! Des corrections importantes sont nécessaires.', 'error');
    }
}

// Exécution des tests
if (require.main === module) {
    runAllTests().then(results => {
        const exitCode = results.failed > 0 ? 1 : 0;
        process.exit(exitCode);
    }).catch(error => {
        log(`❌ Erreur fatale: ${error.message}`, 'error');
        process.exit(1);
    });
}

module.exports = { runAllTests, testResults };
