// Test de la nouvelle structure unifiée des colonnes
// Ce fichier simule les données selon la nouvelle structure

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
    description: "A well-structured Bachelor program in Medicine, designed to provide students with strong academic and professional foundations.",
    aboutThisProgram: "An engaging course in Medicine, balancing essential concepts with applied learning opportunities.",
    whyThisProgram: "- Exposure to a diverse student body and perspectives.\n- Progressive curriculum from fundamentals to advanced topics.\n- Practical assignments linked to real-world applications.",
    aboutTheUniversity: "Near East University is a recognised institution in Northern Cyprus, known for its commitment to quality education.",
    status: "OPENED",
    programImage: null
  },
  {
    id: 2,
    campusCity: "Nicosia",
    universities: "Near East University",
    universityRanking: "N/A",
    applyBefore: "31st July",
    category: "Medical and Health Sciences",
    program: "Dentistry",
    degreeType: "Bachelor",
    tuitionFees: "€10,135.00",
    duration: 5,
    language: "English",
    scholarship: "Available for eligible international students",
    description: "A future-focused study plan for Dentistry, delivered with clear structure and academic rigor.",
    aboutThisProgram: "An engaging course in Dentistry, balancing essential concepts with applied learning opportunities.",
    whyThisProgram: "- Opportunities for collaborative and independent projects.\n- Focus on both technical and transferable skills.\n- Access to modern facilities and campus resources.",
    aboutTheUniversity: "Near East University offers a welcoming academic environment and a structured approach to learning.",
    status: "OPENED",
    programImage: null
  }
];

// Fonction de test pour vérifier la structure
function testNewStructure() {
  console.log("=== Test de la nouvelle structure unifiée ===");
  
  testPrograms.forEach((program, index) => {
    console.log(`\n--- Programme ${index + 1} ---`);
    console.log(`Campus City: ${program.campusCity}`);
    console.log(`Universities: ${program.universities}`);
    console.log(`University Ranking: ${program.universityRanking}`);
    console.log(`Apply Before: ${program.applyBefore}`);
    console.log(`Category: ${program.category}`);
    console.log(`Program: ${program.program}`);
    console.log(`Degree Type: ${program.degreeType}`);
    console.log(`Tuition Fees: ${program.tuitionFees}`);
    console.log(`Duration: ${program.duration} years`);
    console.log(`Language: ${program.language}`);
    console.log(`Scholarship: ${program.scholarship}`);
    console.log(`Description: ${program.description}`);
    console.log(`About This Program: ${program.aboutThisProgram}`);
    console.log(`Why This Program: ${program.whyThisProgram}`);
    console.log(`About The University: ${program.aboutTheUniversity}`);
    console.log(`Status: ${program.status}`);
  });
  
  console.log("\n=== Test terminé ===");
}

// Exécuter le test
testNewStructure();

// Export pour utilisation dans d'autres fichiers
module.exports = { testPrograms, testNewStructure };
