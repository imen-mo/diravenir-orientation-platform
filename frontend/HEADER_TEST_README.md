# Test du Header Dynamique

## Description
Cette page de test permet de vérifier le comportement du header dynamique qui change d'apparence selon la position de scroll.

## Fonctionnalités à tester

### 1. État initial (en haut de page)
- **Logo** : `logo-colorfull.png` (logo coloré)
- **Couleurs** : 
  - Fond blanc
  - Bordure verte
  - Coins arrondis
  - Ombre légère
  - Marge autour du header

### 2. État scrollé (après avoir défilé)
- **Logo** : `logo.png` (logo simple)
- **Couleurs** :
  - Fond violet foncé
  - Pas de bordure
  - Pas de coins arrondis
  - Ombre plus prononcée
  - Pas de marge

## Comment tester

1. **Accéder à la page** : Naviguez vers `/header-test`
2. **Observer l'état initial** : Le header doit avoir l'apparence de l'image 1
3. **Faire défiler** : Utilisez la molette de la souris ou les flèches du clavier
4. **Observer la transition** : Le header doit changer d'apparence vers l'image 2
5. **Remonter** : Remontez en haut de la page pour voir le retour à l'état initial

## URL de test
```
http://localhost:3000/header-test
```

## Structure de la page
- **Section héro** : Explication du test avec un design attractif
- **10 sections de contenu** : Chaque section contient du texte Lorem ipsum pour créer suffisamment de contenu pour le scroll
- **Responsive** : La page s'adapte aux différentes tailles d'écran

## Composants utilisés
- `GlobalLayout` : Wrapper principal avec header et footer
- `GlobalNavbar` : Header dynamique avec changement de logo et de styles
- `Footer` : Pied de page standard

## CSS associé
- `HeaderTest.css` : Styles spécifiques à la page de test
- `Navbar.css` : Styles du header dynamique
- `GlobalLayout.css` : Styles du layout global
