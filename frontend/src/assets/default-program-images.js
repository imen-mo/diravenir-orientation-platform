// Images par défaut pour les programmes
// L'utilisateur pourra les remplacer par ses propres images

export const defaultProgramImages = {
  // Images pour différents types de programmes
  engineering: [
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=300&fit=crop&crop=center'
  ],
  business: [
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=300&fit=crop&crop=center'
  ],
  medicine: [
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=300&fit=crop&crop=center'
  ],
  arts: [
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop&crop=center'
  ],
  science: [
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=300&h=300&fit=crop&crop=center'
  ],
  technology: [
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=300&fit=crop&crop=center'
  ],
  law: [
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&h=300&fit=crop&crop=center'
  ],
  education: [
    'https://images.unsplash.com/photo-1523050854058-8df90110c9a1?w=300&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9a1?w=300&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9a1?w=300&h=300&fit=crop&crop=center'
  ],
  default: [
    'https://images.unsplash.com/photo-1523050854058-8df90110c9a1?w=300&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9a1?w=300&h=300&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9a1?w=300&h=300&fit=crop&crop=center'
  ]
};

// Fonction pour obtenir une image par défaut basée sur le nom du programme
export const getDefaultProgramImage = (programName) => {
  const name = programName?.toLowerCase() || '';
  
  if (name.includes('engineering') || name.includes('civil') || name.includes('mechanical') || name.includes('electrical')) {
    return defaultProgramImages.engineering[Math.floor(Math.random() * defaultProgramImages.engineering.length)];
  }
  if (name.includes('business') || name.includes('management') || name.includes('economics') || name.includes('finance')) {
    return defaultProgramImages.business[Math.floor(Math.random() * defaultProgramImages.business.length)];
  }
  if (name.includes('medicine') || name.includes('health') || name.includes('nursing') || name.includes('pharmacy')) {
    return defaultProgramImages.medicine[Math.floor(Math.random() * defaultProgramImages.medicine.length)];
  }
  if (name.includes('art') || name.includes('design') || name.includes('music') || name.includes('drama')) {
    return defaultProgramImages.arts[Math.floor(Math.random() * defaultProgramImages.arts.length)];
  }
  if (name.includes('science') || name.includes('biology') || name.includes('chemistry') || name.includes('physics')) {
    return defaultProgramImages.science[Math.floor(Math.random() * defaultProgramImages.science.length)];
  }
  if (name.includes('computer') || name.includes('software') || name.includes('it') || name.includes('technology')) {
    return defaultProgramImages.technology[Math.floor(Math.random() * defaultProgramImages.technology.length)];
  }
  if (name.includes('law') || name.includes('legal') || name.includes('justice')) {
    return defaultProgramImages.law[Math.floor(Math.random() * defaultProgramImages.law.length)];
  }
  if (name.includes('education') || name.includes('teaching') || name.includes('pedagogy')) {
    return defaultProgramImages.education[Math.floor(Math.random() * defaultProgramImages.education.length)];
  }
  
  // Image par défaut
  return defaultProgramImages.default[Math.floor(Math.random() * defaultProgramImages.default.length)];
}; 