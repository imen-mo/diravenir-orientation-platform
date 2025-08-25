// Utilitaire pour tester le changement de langue
export const testLanguageChange = (changeLanguage, getText) => {
    console.log('🧪 Début du test de changement de langue...');
    
    const languages = ['fr', 'en', 'es'];
    let currentIndex = 0;
    
    const testNextLanguage = () => {
        if (currentIndex < languages.length) {
            const language = languages[currentIndex];
            console.log(`🌍 Test de la langue: ${language}`);
            
            // Changer la langue
            changeLanguage(language);
            
            // Vérifier les traductions
            setTimeout(() => {
                console.log(`✅ Langue ${language}:`);
                console.log(`  - Settings: ${getText('settings')}`);
                console.log(`  - Theme: ${getText('theme')}`);
                console.log(`  - Language: ${getText('language')}`);
                
                currentIndex++;
                if (currentIndex < languages.length) {
                    testNextLanguage();
                } else {
                    console.log('🎉 Test terminé ! Retour au français...');
                    changeLanguage('fr');
                }
            }, 500);
        }
    };
    
    testNextLanguage();
};

// Fonction pour vérifier que les traductions fonctionnent
export const verifyTranslations = (currentLanguage, getText) => {
    const testKeys = ['settings', 'theme', 'language', 'notifications', 'security', 'privacy'];
    const results = {};
    
    testKeys.forEach(key => {
        const translation = getText(key);
        results[key] = {
            key,
            translation,
            isTranslated: translation !== key,
            language: currentLanguage
        };
    });
    
    console.log('🔍 Vérification des traductions:', results);
    return results;
};
