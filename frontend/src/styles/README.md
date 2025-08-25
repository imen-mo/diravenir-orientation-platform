# Styles d'Authentification Diravenir

Ce dossier contient tous les styles CSS nécessaires pour le système d'authentification de Diravenir.

## Structure des Fichiers

### Fichiers de Composants
- **`Login.css`** - Styles pour la page de connexion
- **`Register.css`** - Styles pour la page d'inscription
- **`ForgotPassword.css`** - Styles pour la page de mot de passe oublié
- **`ResetPassword.css`** - Styles pour la page de réinitialisation de mot de passe
- **`VerifyEmail.css`** - Styles pour la page de vérification d'email
- **`Dashboard.css`** - Styles pour le tableau de bord utilisateur
- **`ProtectedRoute.css`** - Styles pour les composants de protection des routes
- **`AuthContext.css`** - Styles pour le contexte d'authentification
- **`ProtectedNavbar.css`** - Styles pour la navigation protégée
- **`AuthService.css`** - Styles pour les services d'authentification

### Fichier Principal
- **`auth.css`** - Fichier principal qui importe tous les styles et contient les utilitaires globaux

## Utilisation

### Import dans l'Application
```javascript
// Dans votre composant principal ou App.js
import './styles/auth.css';
```

### Classes CSS Utilitaires

#### Espacement
```css
.auth-mb-4    /* margin-bottom: 1rem */
.auth-mt-6    /* margin-top: 1.5rem */
.auth-p-8     /* padding: 2rem */
.auth-space-y-4  /* Espacement vertical entre enfants */
```

#### Flexbox
```css
.auth-flex          /* display: flex */
.auth-flex-col      /* flex-direction: column */
.auth-items-center  /* align-items: center */
.auth-justify-between /* justify-content: space-between */
.auth-gap-4         /* gap: 1rem */
```

#### Grille
```css
.auth-grid          /* display: grid */
.auth-grid-cols-2   /* grid-template-columns: repeat(2, 1fr) */
.auth-grid-cols-3   /* grid-template-columns: repeat(3, 1fr) */
```

#### Largeurs
```css
.auth-w-full        /* width: 100% */
.auth-max-w-md      /* max-width: 28rem */
.auth-max-w-lg      /* max-width: 32rem */
.auth-max-w-xl      /* max-width: 36rem */
```

#### Hauteurs
```css
.auth-h-screen      /* height: 100vh */
.auth-min-h-screen  /* min-height: 100vh */
```

#### Couleurs
```css
.auth-text-primary  /* color: var(--text-primary) */
.auth-text-muted    /* color: var(--text-muted) */
.auth-bg-primary    /* background-color: var(--bg-primary) */
.auth-bg-secondary  /* background-color: var(--bg-secondary) */
```

#### Bordures
```css
.auth-border        /* border: 1px solid var(--border-color) */
.auth-rounded-lg    /* border-radius: var(--radius-lg) */
.auth-rounded-full  /* border-radius: 9999px */
```

#### Ombres
```css
.auth-shadow-sm     /* box-shadow: var(--shadow-sm) */
.auth-shadow-lg     /* box-shadow: var(--shadow-lg) */
.auth-shadow-xl     /* box-shadow: var(--shadow-xl) */
```

#### Transitions
```css
.auth-transition    /* transition: all var(--transition-normal) */
.auth-transition-fast /* transition: all var(--transition-fast) */
```

#### Focus
```css
.auth-focus\:outline-none:focus  /* outline: none */
.auth-focus\:ring:focus          /* box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) */
```

#### Hover
```css
.auth-hover\:scale-105:hover     /* transform: scale(1.05) */
.auth-hover\:scale-110:hover     /* transform: scale(1.1) */
```

#### Responsive
```css
.auth-sm\:block     /* display: block à partir de 640px */
.auth-md\:grid-cols-2 /* grid-template-columns: repeat(2, 1fr) à partir de 768px */
.auth-lg\:hidden    /* display: none à partir de 1024px */
```

#### Animations
```css
.auth-animate-spin  /* animation: spin 1s linear infinite */
.auth-animate-pulse /* animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite */
```

## Variables CSS

Le système utilise des variables CSS personnalisées pour la cohérence :

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --success-color: #48bb78;
    --warning-color: #ed8936;
    --error-color: #e53e3e;
    --info-color: #4299e1;
    
    --text-primary: #2d3748;
    --text-secondary: #4a5568;
    --text-muted: #718096;
    
    --bg-primary: #ffffff;
    --bg-secondary: #f7fafc;
    --bg-tertiary: #edf2f7;
    
    --border-color: #e2e8f0;
    
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    
    --radius-sm: 0.375rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    
    --transition-fast: 150ms ease-in-out;
    --transition-normal: 300ms ease-in-out;
    --transition-slow: 500ms ease-in-out;
}
```

## Exemples d'Utilisation

### Page de Connexion
```jsx
<div className="login-page">
    <div className="login-main">
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1 className="login-title">Connexion</h1>
                    <p className="login-subtitle">Connectez-vous à votre compte</p>
                </div>
                {/* ... reste du formulaire ... */}
            </div>
        </div>
    </div>
</div>
```

### Tableau de Bord
```jsx
<div className="dashboard-page">
    <div className="dashboard-main">
        <div className="dashboard-header">
            <h1 className="dashboard-title">Tableau de Bord</h1>
        </div>
        
        <div className="dashboard-grid">
            <div className="dashboard-card">
                <div className="card-header">
                    <div className="card-icon primary">📊</div>
                    <h3 className="card-title">Statistiques</h3>
                </div>
                <div className="card-value">42</div>
                <p className="card-description">Tests effectués</p>
            </div>
        </div>
    </div>
</div>
```

### Navigation Protégée
```jsx
<nav className="protected-navbar">
    <div className="navbar-container">
        <a href="/" className="navbar-brand">
            <div className="brand-logo">D</div>
            Diravenir
        </a>
        
        <ul className="navbar-nav">
            <li className="nav-item">
                <a href="/dashboard" className="nav-link">
                    <span className="nav-icon">🏠</span>
                    Tableau de Bord
                </a>
            </li>
        </ul>
        
        <div className="navbar-user">
            <div className="user-info">
                <div className="user-avatar">JD</div>
                <div className="user-details">
                    <div className="user-name">John Doe</div>
                    <div className="user-role">Étudiant</div>
                </div>
            </div>
        </div>
    </div>
</nav>
```

## Responsive Design

Tous les composants sont conçus pour être responsifs avec des breakpoints :
- **640px** - Mobile (sm)
- **768px** - Tablette (md)
- **1024px** - Desktop (lg)

## Accessibilité

Le système inclut des classes d'accessibilité :
- **`.auth-sr-only`** - Masque le contenu visuellement mais le garde accessible aux lecteurs d'écran
- **`.auth-not-sr-only`** - Annule le masquage

## Personnalisation

Pour personnaliser les couleurs ou autres propriétés, modifiez les variables CSS dans `auth.css` :

```css
:root {
    --primary-color: #votre-couleur;
    --text-primary: #votre-texte;
    /* ... autres variables ... */
}
```

## Support des Navigateurs

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Notes de Performance

- Utilisez les classes utilitaires pour éviter la duplication de CSS
- Les animations sont optimisées avec `transform` et `opacity`
- Les transitions utilisent `will-change` pour optimiser le rendu
- Les ombres sont optimisées pour les performances
