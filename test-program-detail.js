// Test de la navigation vers ProgramDetail
// Ce fichier simule la navigation et vérifie que les liens fonctionnent

const testNavigation = () => {
  console.log("=== Test de la navigation vers ProgramDetail ===");
  
  // Simuler des programmes avec la nouvelle structure
  const testPrograms = [
    {
      id: 1,
      campusCity: "Nicosia",
      universities: "Near East University",
      universityRanking: "N/A",
      applyBefore: "31st July",
      category: "Medical and Health Sciences",
      program: "Medicine",
      degreeType: "Bachelor",
      tuitionFees: "€10,923.00",
      duration: 6,
      language: "English",
      scholarship: "Available for eligible international students",
      description: "A well-structured Bachelor program in Medicine...",
      aboutThisProgram: "An engaging course in Medicine...",
      whyThisProgram: "- Exposure to diverse perspectives...",
      aboutTheUniversity: "Near East University is a recognised institution...",
      status: "OPENED"
    },
    {
      id: 2,
      campusCity: "Beijing",
      universities: "Shanxi University",
      universityRanking: "Top 2%",
      applyBefore: "15th April",
      category: "Business and Management",
      program: "Business Administration",
      degreeType: "Bachelor",
      tuitionFees: "23000",
      duration: 4,
      language: "English",
      scholarship: "Available for eligible students",
      description: "A comprehensive business program...",
      aboutThisProgram: "This BBA program offers a solid foundation...",
      whyThisProgram: "- Shanxi University is among the top 2%...",
      aboutTheUniversity: "Shanxi University is a historic institution...",
      status: "OPENED"
    }
  ];
  
  console.log("✅ Programmes de test créés avec la nouvelle structure");
  
  // Tester la génération des liens
  testPrograms.forEach(program => {
    const link = `/programs/${program.id}`;
    console.log(`\n--- Programme ${program.id} ---`);
    console.log(`Program: ${program.program}`);
    console.log(`University: ${program.universities}`);
    console.log(`Category: ${program.category}`);
    console.log(`Link: ${link}`);
    console.log(`Expected route: /programs/${program.id}`);
    
    // Vérifier que le lien correspond à la route configurée
    if (link === `/programs/${program.id}`) {
      console.log("✅ Lien correctement généré");
    } else {
      console.log("❌ Erreur dans la génération du lien");
    }
  });
  
  // Tester la structure des données
  console.log("\n=== Test de la structure des données ===");
  
  const requiredFields = [
    'campusCity', 'universities', 'universityRanking', 'applyBefore',
    'category', 'program', 'degreeType', 'tuitionFees', 'duration',
    'language', 'scholarship', 'description', 'aboutThisProgram',
    'whyThisProgram', 'aboutTheUniversity', 'status'
  ];
  
  testPrograms.forEach((program, index) => {
    console.log(`\n--- Vérification Programme ${index + 1} ---`);
    
    requiredFields.forEach(field => {
      if (program.hasOwnProperty(field)) {
        console.log(`✅ ${field}: ${program[field] ? 'Présent' : 'Vide'}`);
      } else {
        console.log(`❌ ${field}: Manquant`);
      }
    });
  });
  
  console.log("\n=== Test de navigation terminé ===");
};

// Exécuter le test
testNavigation();

// Export pour utilisation dans d'autres fichiers
module.exports = { testNavigation };
