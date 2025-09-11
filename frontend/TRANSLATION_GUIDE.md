# 🌍 Guide de Traduction DirAvenir

## Vue d'ensemble

DirAvenir utilise un système de traduction complet qui supporte le français (FR) et l'anglais (EN). Le système est basé sur un fichier de traductions centralisé et un contexte React pour la gestion des langues.

## 📁 Structure des Fichiers

```
frontend/src/
├── translations/
│   └── index.js          # Fichier principal des traductions
├── contexts/
│   └── ThemeContext.jsx  # Contexte pour la gestion des langues
└── components/
    └── LanguageSelector.jsx # Composant de sélection de langue
```

## 🔧 Utilisation du Système

### 1. Import du Hook

```jsx
import { useTheme } from '../contexts/ThemeContext';

const MyComponent = () => {
  const { getText } = useTheme();
  
  return (
    <h1>{getText('welcome')}</h1>
  );
};
```

### 2. Utilisation des Traductions

```jsx
// Traduction simple
<h1>{getText('home')}</h1>

// Traduction avec paramètres
<p>{getText('welcomeMessage', { name: 'John' })}</p>

// Vérification de l'existence d'une traduction
const { hasTranslation } = useTheme();
if (hasTranslation('newKey')) {
  // La traduction existe
}
```

### 3. Changement de Langue

```jsx
const { changeLanguage } = useTheme();

// Changer vers l'anglais
changeLanguage('en');

// Changer vers le français
changeLanguage('fr');
```

## 📝 Ajout de Nouvelles Traductions

### 1. Ajouter dans le Fichier de Traductions

Ouvrez `frontend/src/translations/index.js` et ajoutez vos clés :

```javascript
export const translations = {
    fr: {
        // Vos traductions françaises
        newKey: 'Nouvelle traduction',
        welcomeMessage: 'Bienvenue {name}',
    },
    
    en: {
        // Vos traductions anglaises
        newKey: 'New translation',
        welcomeMessage: 'Welcome {name}',
    }
};
```

### 2. Utiliser dans les Composants

```jsx
const MyComponent = () => {
  const { getText } = useTheme();
  
  return (
    <div>
      <h1>{getText('newKey')}</h1>
      <p>{getText('welcomeMessage', { name: 'Alice' })}</p>
    </div>
  );
};
```

## 🎯 Bonnes Pratiques

### 1. Nommage des Clés

- Utilisez des noms descriptifs et hiérarchiques
- Utilisez camelCase
- Groupez par fonctionnalité

```javascript
// ✅ Bon
homePageTitle: 'Titre de la page d\'accueil',
programsSection: 'Section Programmes',
userProfileSettings: 'Paramètres du profil utilisateur'

// ❌ Mauvais
title1: 'Titre',
section: 'Section',
settings: 'Paramètres'
```

### 2. Gestion des Paramètres

```javascript
// Dans les traductions
welcomeMessage: 'Bienvenue {name}, vous avez {count} messages'

// Dans le composant
getText('welcomeMessage', { name: 'John', count: 5 })
// Résultat: "Bienvenue John, vous avez 5 messages"
```

### 3. Traductions Conditionnelles

```javascript
// Dans les traductions
statusActive: 'Actif',
statusInactive: 'Inactif',
statusPending: 'En attente'

// Dans le composant
const getStatusText = (status) => {
  return getText(`status${status.charAt(0).toUpperCase() + status.slice(1)}`);
};
```

## 🔍 Débogage

### 1. Vérifier les Traductions Manquantes

```javascript
const { hasTranslation } = useTheme();

if (!hasTranslation('myKey')) {
  console.warn('Traduction manquante pour la clé: myKey');
}
```

### 2. Mode Debug

```javascript
// Dans le contexte ThemeContext
const getText = (key, params = {}) => {
  try {
    const translation = getTranslation(key, currentLanguage, params);
    
    // Mode debug - afficher les clés manquantes
    if (translation === key) {
      console.warn(`Traduction manquante: ${key} (langue: ${currentLanguage})`);
    }
    
    return translation;
  } catch (error) {
    console.error(`Erreur de traduction pour "${key}":`, error);
    return key;
  }
};
```

## 📋 Checklist pour les Nouvelles Pages

- [ ] Ajouter les traductions dans `translations/index.js`
- [ ] Importer `useTheme` dans le composant
- [ ] Remplacer tous les textes statiques par `getText()`
- [ ] Tester en français et en anglais
- [ ] Vérifier que le sélecteur de langue fonctionne
- [ ] Tester les paramètres de traduction si nécessaire

## 🧪 Tests

### 1. Test Manuel

Ouvrez `frontend/test-translation-system.html` dans votre navigateur pour tester le système de traduction.

### 2. Test Automatique

```javascript
// Test unitaire pour les traductions
import { getTranslation } from '../translations';

test('should translate correctly', () => {
  expect(getTranslation('home', 'fr')).toBe('Accueil');
  expect(getTranslation('home', 'en')).toBe('Home');
  expect(getTranslation('nonexistent', 'fr')).toBe('nonexistent');
});
```

## 🚀 Déploiement

### 1. Vérifications Pré-déploiement

- [ ] Toutes les pages sont traduites
- [ ] Le sélecteur de langue fonctionne
- [ ] Aucune clé de traduction manquante
- [ ] Les paramètres de traduction fonctionnent
- [ ] Test sur différentes résolutions

### 2. Configuration Serveur

Assurez-vous que le serveur supporte les langues :

```javascript
// Dans votre configuration
const supportedLanguages = ['fr', 'en'];
const defaultLanguage = 'fr';
```

## 📚 Ressources

- [Documentation React Context](https://reactjs.org/docs/context.html)
- [Guide i18n React](https://react.i18next.com/)
- [Standards de traduction](https://www.w3.org/International/)

## 🆘 Support

Pour toute question sur le système de traduction :

1. Vérifiez ce guide
2. Consultez les exemples dans le code
3. Testez avec `test-translation-system.html`
4. Contactez l'équipe de développement

---

**Note**: Ce système de traduction est conçu pour être simple, performant et facilement extensible. Respectez les conventions établies pour maintenir la cohérence du projet.
