#!/usr/bin/env node

/**
 * Script de test pour l'API des informations personnelles
 * Usage: node test-personal-info.js
 */

const axios = require('axios');

// Configuration
const BASE_URL = 'http://localhost:8084';
const API_ENDPOINT = '/api/personal-info';

// Données de test
const testData = {
  nom: "John Doe",
  email: "john.doe@test.com",
  telephone: "+1234567890"
};

// Couleurs pour la console
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

// Tests
async function testPersonalInfoAPI() {
  log('🧪 Démarrage des tests de l\'API des informations personnelles', 'bright');
  log('=' .repeat(60), 'cyan');
  
  try {
    // Test 1: Vérifier la connectivité
    logInfo('Test 1: Vérification de la connectivité...');
    try {
      await axios.get(`${BASE_URL}/actuator/health`);
      logSuccess('Backend accessible');
    } catch (error) {
      logError('Backend inaccessible. Assurez-vous qu\'il est démarré sur le port 8084');
      return;
    }

    // Test 2: Sauvegarder des informations personnelles
    logInfo('Test 2: Sauvegarde des informations personnelles...');
    try {
      const saveResponse = await axios.post(`${BASE_URL}${API_ENDPOINT}/save`, testData);
      logSuccess(`Informations sauvegardées: ${saveResponse.data}`);
    } catch (error) {
      logError(`Erreur lors de la sauvegarde: ${error.response?.data || error.message}`);
      return;
    }

    // Test 3: Récupérer les informations par email
    logInfo('Test 3: Récupération des informations par email...');
    try {
      const getResponse = await axios.get(`${BASE_URL}${API_ENDPOINT}/${encodeURIComponent(testData.email)}`);
      logSuccess(`Informations récupérées: ${JSON.stringify(getResponse.data, null, 2)}`);
      
      // Vérifier que les données correspondent
      if (getResponse.data.nom === testData.nom && 
          getResponse.data.email === testData.email && 
          getResponse.data.telephone === testData.telephone) {
        logSuccess('Données récupérées correspondent aux données sauvegardées');
      } else {
        logWarning('Données récupérées ne correspondent pas exactement');
      }
    } catch (error) {
      logError(`Erreur lors de la récupération: ${error.response?.data || error.message}`);
    }

    // Test 4: Test avec des données invalides
    logInfo('Test 4: Test avec des données invalides...');
    try {
      await axios.post(`${BASE_URL}${API_ENDPOINT}/save`, {
        nom: "",
        email: "invalid-email",
        telephone: ""
      });
      logWarning('Sauvegarde avec données invalides a réussi (validation à vérifier)');
    } catch (error) {
      if (error.response?.status === 400) {
        logSuccess('Validation des données invalides fonctionne correctement');
      } else {
        logError(`Erreur inattendue avec données invalides: ${error.response?.data || error.message}`);
      }
    }

    // Test 5: Test de performance
    logInfo('Test 5: Test de performance...');
    const startTime = Date.now();
    try {
      await axios.post(`${BASE_URL}${API_ENDPOINT}/save`, {
        nom: "Performance Test",
        email: "perf@test.com",
        telephone: "+9876543210"
      });
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      if (duration < 1000) {
        logSuccess(`Performance OK: ${duration}ms`);
      } else {
        logWarning(`Performance lente: ${duration}ms`);
      }
    } catch (error) {
      logError(`Erreur lors du test de performance: ${error.response?.data || error.message}`);
    }

    log('=' .repeat(60), 'cyan');
    logSuccess('🎉 Tous les tests sont terminés !');
    
  } catch (error) {
    logError(`Erreur générale: ${error.message}`);
  }
}

// Test de l'API d'orientation (optionnel)
async function testOrientationAPI() {
  log('\n🧠 Test de l\'API d\'orientation...', 'bright');
  log('=' .repeat(60), 'cyan');
  
  try {
    const orientationData = {
      question1: 'A',
      question2: ['A', 'B'],
      question3: 'C',
      question4: 'A',
      question5: ['A', 'B', 'C'],
      question6: 'B',
      question7: 'A',
      question8: 'C',
      question9: {
        A: 4,
        B: 3,
        C: 5,
        D: 2
      },
      question10: 'B',
      question11: 'A',
      question12: 'C',
      question13: 'B',
      question14: ['A', 'C']
    };

    logInfo('Envoi des réponses au test d\'orientation...');
    const response = await axios.post(`${BASE_URL}/api/orientation/calculate`, orientationData);
    logSuccess('Réponses envoyées avec succès');
    logInfo(`Réponse reçue: ${JSON.stringify(response.data, null, 2)}`);
    
  } catch (error) {
    logError(`Erreur lors du test d'orientation: ${error.response?.data || error.message}`);
  }
}

// Fonction principale
async function main() {
  log('🚀 Test de l\'API Diravenir - Informations Personnelles', 'bright');
  log('=' .repeat(60), 'cyan');
  
  // Vérifier les dépendances
  try {
    require('axios');
  } catch (error) {
    logError('Axios n\'est pas installé. Installez-le avec: npm install axios');
    return;
  }
  
  // Exécuter les tests
  await testPersonalInfoAPI();
  
  // Demander si l'utilisateur veut tester l'API d'orientation
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('\nVoulez-vous tester l\'API d\'orientation ? (y/n): ', async (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      await testOrientationAPI();
    }
    rl.close();
    log('\n👋 Tests terminés. Au revoir !', 'bright');
  });
}

// Exécuter si le script est appelé directement
if (require.main === module) {
  main().catch(error => {
    logError(`Erreur fatale: ${error.message}`);
    process.exit(1);
  });
}

module.exports = { testPersonalInfoAPI, testOrientationAPI };
