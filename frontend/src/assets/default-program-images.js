// Images par défaut pour les programmes selon leur catégorie
// Ces images sont utilisées quand l'image du programme ou le logo de l'université n'est pas disponible

export const getDefaultProgramImage = (category) => {
  if (!category) return getDefaultImage('default');
  
  const categoryLower = category.toLowerCase();
  
  // Médecine et santé
  if (categoryLower.includes('medical') || 
      categoryLower.includes('health') || 
      categoryLower.includes('medicine') ||
      categoryLower.includes('dental') ||
      categoryLower.includes('pharmacy') ||
      categoryLower.includes('nursing')) {
    return getDefaultImage('medicine');
  }
  
  // Business et management
  if (categoryLower.includes('business') || 
      categoryLower.includes('management') ||
      categoryLower.includes('administration') ||
      categoryLower.includes('economics') ||
      categoryLower.includes('finance') ||
      categoryLower.includes('marketing')) {
    return getDefaultImage('business');
  }
  
  // Ingénierie et technologie
  if (categoryLower.includes('engineering') || 
      categoryLower.includes('technology') ||
      categoryLower.includes('computer') ||
      categoryLower.includes('software') ||
      categoryLower.includes('mechanical') ||
      categoryLower.includes('electrical') ||
      categoryLower.includes('civil')) {
    return getDefaultImage('engineering');
  }
  
  // Arts et design
  if (categoryLower.includes('arts') || 
      categoryLower.includes('design') ||
      categoryLower.includes('creative') ||
      categoryLower.includes('visual') ||
      categoryLower.includes('graphic') ||
      categoryLower.includes('fashion')) {
    return getDefaultImage('arts');
  }
  
  // Sciences
  if (categoryLower.includes('science') || 
      categoryLower.includes('physics') ||
      categoryLower.includes('chemistry') ||
      categoryLower.includes('biology') ||
      categoryLower.includes('mathematics') ||
      categoryLower.includes('statistics')) {
    return getDefaultImage('science');
  }
  
  // Droit
  if (categoryLower.includes('law') || 
      categoryLower.includes('legal') ||
      categoryLower.includes('justice')) {
    return getDefaultImage('law');
  }
  
  // Éducation
  if (categoryLower.includes('education') || 
      categoryLower.includes('teaching') ||
      categoryLower.includes('pedagogy')) {
    return getDefaultImage('education');
  }
  
  // Architecture
  if (categoryLower.includes('architecture') || 
      categoryLower.includes('urban') ||
      categoryLower.includes('planning')) {
    return getDefaultImage('architecture');
  }
  
  // Agriculture
  if (categoryLower.includes('agriculture') || 
      categoryLower.includes('farming') ||
      categoryLower.includes('veterinary')) {
    return getDefaultImage('agriculture');
  }
  
  // Communication et médias
  if (categoryLower.includes('communication') || 
      categoryLower.includes('media') ||
      categoryLower.includes('journalism') ||
      categoryLower.includes('public relations')) {
    return getDefaultImage('communication');
  }
  
  // Psychologie
  if (categoryLower.includes('psychology') || 
      categoryLower.includes('counseling') ||
      categoryLower.includes('therapy')) {
    return getDefaultImage('psychology');
  }
  
  // Image par défaut si aucune catégorie ne correspond
  return getDefaultImage('default');
};

// Fonction pour obtenir l'URL de l'image par défaut
const getDefaultImage = (type) => {
  // Utiliser des emojis ou des icônes SVG comme images par défaut
  // Vous pouvez remplacer ces URLs par des vraies images plus tard
  
  const defaultImages = {
    medicine: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE5IDNIMTVDMTMuODkgMyAxMyAzLjg5IDEzIDVWMTlDMTMgMjAuMTEgMTMuODkgMjEgMTUgMjFIMTlDMjAuMTEgMjEgMjEgMjAuMTEgMjEgMTlWNUMyMSAzLjg5IDIwLjExIDMgMTkgM1pNMTcgMTlIMTVWNUgxOVYxOVoiIGZpbGw9IiM0Q0FGNTAiLz4KPHBhdGggZD0iTTEyIDdMMTAgMTJMMTIgMTdMMTQgMTJMMTIgN1oiIGZpbGw9IiM0Q0FGNTAiLz4KPC9zdmc+',
    business: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDRINGMtMS4xMSAwLTEuOTkuODktMS45OSAyTDIgNnYxMmMwIDEuMTEuODkgMiAyIDJoMTZjMS4xMSAwIDItLjg5IDItMlY2YzAtMS4xMS0uODktMi0yLTJabS0yIDJoLTR2Mmg0djJoLTR2Mmg0djJoLTR2Mmg0djJoLTR2Mmg0djJoLTR2Mmg0djJoLTR2Mmg0djJoLTR2Mmg0djJoLTR2Mmg0djJoLTR2Mkg0VjZoMTZ2MTJaIiBmaWxsPSIjRkZDNzAwIi8+Cjwvc3ZnPg==',
    engineering: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMiA3djEwYzAgMS4xMS44OSAyIDIgMmgxNmMxLjExIDAgMi0uODkgMi0yVjdMMTIgMlpNMTIgMTlsLTgtNC41VjlsOC00LjV2MTQuNXoiIGZpbGw9IiM2NjZFRUEiLz4KPC9zdmc+',
    arts: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJjNS41MiAwIDEwIDQuNDggMTAgMTBzLTQuNDggMTAtMTAgMTBTMiAxNy41MiAyIDEyUzYuNDggMiAxMiAyem0wIDJjLTQuNDIgMC04IDMuNTgtOCA4czMuNTggOCA4IDggOC0zLjU4IDgtOC0zLjU4LTgtOC04em0wIDJjMy4zMSAwIDYgMi42OSA2IDZzLTIuNjkgNi02IDYtNi0yLjY5LTYtNiAyLjY5LTYgNi02eiIgZmlsbD0iI0Y0NzM2MCIvPgo8L3N2Zz4=',
    science: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMiA3djEwYzAgMS4xMS44OSAyIDIgMmgxNmMxLjExIDAgMi0uODkgMi0yVjdMMTIgMlpNMTIgMTlsLTgtNC41VjlsOC00LjV2MTQuNXoiIGZpbGw9IiM4QjVGRkYiLz4KPC9zdmc+',
    law: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMiA3djEwYzAgMS4xMS44OSAyIDIgMmgxNmMxLjExIDAgMi0uODkgMi0yVjdMMTIgMlpNMTIgMTlsLTgtNC41VjlsOC00LjV2MTQuNXoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+',
    education: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMiA3djEwYzAgMS4xMS44OSAyIDIgMmgxNmMxLjExIDAgMi0uODkgMi0yVjdMMTIgMlpNMTIgMTlsLTgtNC41VjlsOC00LjV2MTQuNXoiIGZpbGw9IiM2NjZFRUEiLz4KPC9zdmc+',
    architecture: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMiA3djEwYzAgMS4xMS44OSAyIDIgMmgxNmMxLjExIDAgMi0uODkgMi0yVjdMMTIgMlpNMTIgMTlsLTgtNC41VjlsOC00LjV2MTQuNXoiIGZpbGw9IiM2QjIxQjEiLz4KPC9zdmc+',
    agriculture: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMiA3djEwYzAgMS4xMS44OSAyIDIgMmgxNmMxLjExIDAgMi0uODkgMi0yVjdMMTIgMlpNMTIgMTlsLTgtNC41VjlsOC00LjV2MTQuNXoiIGZpbGw9IiM0Q0FGNTAiLz4KPC9zdmc+',
    communication: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMiA3djEwYzAgMS4xMS44OSAyIDIgMmgxNmMxLjExIDAgMi0uODkgMi0yVjdMMTIgMlpNMTIgMTlsLTgtNC41VjlsOC00LjV2MTQuNXoiIGZpbGw9IiNGNDczNjAiLz4KPC9zdmc+',
    psychology: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMiA3djEwYzAgMS4xMS44OSAyIDIgMmgxNmMxLjExIDAgMi0uODkgMi0yVjdMMTIgMlpNMTIgMTlsLTgtNC41VjlsOC00LjV2MTQuNXoiIGZpbGw9IiM2NjZFRUEiLz4KPC9zdmc+',
    default: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMiA3djEwYzAgMS4xMS44OSAyIDIgMmgxNmMxLjExIDAgMi0uODkgMi0yVjdMMTIgMlpNMTIgMTlsLTgtNC41VjlsOC00LjV2MTQuNXoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+'
  };
  
  return defaultImages[type] || defaultImages.default;
};

// Fonction utilitaire pour obtenir une image par défaut basée sur le nom du programme
export const getDefaultImageByProgramName = (programName) => {
  if (!programName) return getDefaultImage('default');
  
  const nameLower = programName.toLowerCase();
  
  // Détecter le type de programme par son nom
  if (nameLower.includes('medicine') || nameLower.includes('medical')) {
    return getDefaultImage('medicine');
  }
  if (nameLower.includes('business') || nameLower.includes('management')) {
    return getDefaultImage('business');
  }
  if (nameLower.includes('engineering') || nameLower.includes('computer')) {
    return getDefaultImage('engineering');
  }
  if (nameLower.includes('arts') || nameLower.includes('design')) {
    return getDefaultImage('arts');
  }
  if (nameLower.includes('science') || nameLower.includes('physics')) {
    return getDefaultImage('science');
  }
  if (nameLower.includes('law') || nameLower.includes('legal')) {
    return getDefaultImage('law');
  }
  if (nameLower.includes('education') || nameLower.includes('teaching')) {
    return getDefaultImage('education');
  }
  
  return getDefaultImage('default');
};

// Fonction pour obtenir une image par défaut basée sur l'université
export const getDefaultImageByUniversity = (universityName) => {
  if (!universityName) return getDefaultImage('default');
  
  const nameLower = universityName.toLowerCase();
  
  // Détecter le type d'université par son nom
  if (nameLower.includes('medical') || nameLower.includes('health')) {
    return getDefaultImage('medicine');
  }
  if (nameLower.includes('business') || nameLower.includes('management')) {
    return getDefaultImage('business');
  }
  if (nameLower.includes('technology') || nameLower.includes('engineering')) {
    return getDefaultImage('engineering');
  }
  if (nameLower.includes('arts') || nameLower.includes('design')) {
    return getDefaultImage('arts');
  }
  if (nameLower.includes('science') || nameLower.includes('research')) {
    return getDefaultImage('science');
  }
  
  return getDefaultImage('default');
}; 