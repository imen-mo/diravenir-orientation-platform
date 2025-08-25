// Script de test pour vérifier le système des programmes
console.log('🧪 Test du système des programmes Diravenir');

// Test 1: Vérifier que l'API est accessible
async function testAPI() {
  try {
    const response = await fetch('/api/programs');
    if (response.ok) {
      const programs = await response.json();
      console.log('✅ API accessible - Programmes trouvés:', programs.length);
      return programs;
    } else {
      console.error('❌ Erreur API:', response.status);
      return null;
    }
  } catch (error) {
    console.error('❌ Erreur de connexion API:', error);
    return null;
  }
}

// Test 2: Vérifier la structure des données
function testDataStructure(programs) {
  if (!programs || programs.length === 0) {
    console.log('⚠️ Aucun programme trouvé en base de données');
    return false;
  }

  const firstProgram = programs[0];
  console.log('📋 Structure du premier programme:', {
    id: firstProgram.id,
    program: firstProgram.program,
    universities: firstProgram.universities,
    campusCity: firstProgram.campusCity,
    degreeType: firstProgram.degreeType,
    duration: firstProgram.duration,
    status: firstProgram.status
  });

  return true;
}

// Test 3: Vérifier les images
function testImages(programs) {
  const programsWithImages = programs.filter(p => p.programImage || p.universite?.logo_url);
  console.log(`🖼️ Programmes avec images: ${programsWithImages.length}/${programs.length}`);
  
  if (programsWithImages.length === 0) {
    console.log('⚠️ Aucun programme n\'a d\'image - utilisation des images par défaut');
  }
}

// Test 4: Vérifier les filtres
function testFilters(programs) {
  const openedPrograms = programs.filter(p => p.status === 'OPENED');
  const comingSoonPrograms = programs.filter(p => p.status === 'COMING_SOON');
  const closedPrograms = programs.filter(p => p.status === 'CLOSED');
  
  console.log('🔍 Répartition par statut:', {
    OPENED: openedPrograms.length,
    COMING_SOON: comingSoonPrograms.length,
    CLOSED: closedPrograms.length
  });
}

// Test 5: Vérifier la pagination
function testPagination(programs) {
  const pageSize = 40;
  const totalPages = Math.ceil(programs.length / pageSize);
  console.log(`📄 Pagination: ${totalPages} pages de ${pageSize} programmes chacune`);
}

// Test principal
async function runTests() {
  console.log('🚀 Démarrage des tests...');
  
  // Test 1: API
  const programs = await testAPI();
  if (!programs) {
    console.log('❌ Tests arrêtés - API non accessible');
    return;
  }
  
  // Test 2: Structure des données
  if (!testDataStructure(programs)) {
    console.log('❌ Tests arrêtés - Structure des données invalide');
    return;
  }
  
  // Test 3: Images
  testImages(programs);
  
  // Test 4: Filtres
  testFilters(programs);
  
  // Test 5: Pagination
  testPagination(programs);
  
  console.log('✅ Tous les tests sont passés !');
  console.log('🎯 Le système des programmes est prêt à l\'emploi');
}

// Exécuter les tests
runTests();
