# 🎯 Test d'Orientation Personnalisé - 15ème Question

## 📋 Vue d'ensemble

Ce document décrit la nouvelle fonctionnalité ajoutée au test d'orientation : **la 15ème question** qui collecte les informations personnelles de l'utilisateur (nom, email, téléphone) et les utilise pour personnaliser la page de résultats.

## ✨ Fonctionnalités Ajoutées

### 1. **15ème Question - Collecte d'Informations Personnelles**
- **Type de question** : `personal_info`
- **Champs collectés** :
  - Nom de l'utilisateur
  - Adresse email
  - Numéro de téléphone
- **Design** : Interface moderne avec fond violet et bouton gradient orange-jaune

### 2. **Sauvegarde en Base de Données**
- Nouveaux champs dans la table `etudiant` :
  - `nom_test` : Nom saisi lors du test
  - `email_test` : Email saisi lors du test
  - `telephone_test` : Téléphone saisi lors du test
  - `date_test_orientation` : Date de passage du test
  - `statut_test_complete` : Statut de complétion du test

### 3. **Page de Résultats Personnalisée**
- Affichage du nom de l'utilisateur dans le titre
- Carte d'informations utilisateur avec avatar
- Résultats personnalisés selon le profil
- Actions recommandées adaptées

## 🏗️ Architecture Technique

### Backend (Java Spring Boot)

#### **Nouveaux Fichiers Créés :**
- `V3__Add_Personal_Info_Fields.sql` - Migration de base de données
- `PersonalInfoDTO.java` - DTO pour les informations personnelles
- `PersonalInfoService.java` - Interface de service
- `PersonalInfoServiceImpl.java` - Implémentation du service
- `PersonalInfoController.java` - Contrôleur REST

#### **Fichiers Modifiés :**
- `Etudiant.java` - Ajout des nouveaux champs
- `EtudiantDTO.java` - Ajout des nouveaux champs
- `EtudiantMapper.java` - Mapping des nouveaux champs
- `EtudiantRepository.java` - Nouvelle méthode de recherche

### Frontend (React)

#### **Nouveaux Fichiers Créés :**
- `PersonalizedResults.jsx` - Page de résultats personnalisée
- `PersonalizedResults.css` - Styles pour la page de résultats

#### **Fichiers Modifiés :**
- `UnifiedOrientationTest.jsx` - Ajout de la 15ème question
- `UnifiedOrientationTest.css` - Styles pour la nouvelle question
- `orientationService.js` - Nouvelles méthodes pour les infos personnelles

## 🚀 Comment Utiliser

### 1. **Démarrer l'Application**
```bash
# Backend
cd src && mvn spring-boot:run

# Frontend
cd frontend && npm run dev
```

### 2. **Accéder au Test d'Orientation**
- URL : `http://localhost:5173/orientation-test`
- Répondre aux 14 premières questions
- Arriver à la 15ème question (informations personnelles)

### 3. **Remplir les Informations Personnelles**
- Saisir le nom
- Saisir l'email
- Saisir le téléphone
- Cliquer sur "See My Result Now"

### 4. **Voir les Résultats Personnalisés**
- Redirection automatique vers `/personalized-results`
- Affichage du nom dans le titre
- Résultats adaptés au profil

## 🔧 Configuration

### **Variables d'Environnement**
```bash
# Backend
DB_USERNAME=root
DB_PASSWORD=your_password
DB_URL=jdbc:mysql://localhost:3306/diravenir

# Frontend
VITE_BACKEND_URL=http://localhost:8084
```

### **Base de Données**
La migration `V3__Add_Personal_Info_Fields.sql` sera exécutée automatiquement au démarrage de l'application.

## 📱 Interface Utilisateur

### **15ème Question**
- **Design** : Fond violet avec coins arrondis
- **Champs** : Nom, Email, Téléphone
- **Validation** : Tous les champs doivent être remplis
- **Bouton** : "See My Result Now" avec gradient orange-jaune

### **Page de Résultats**
- **En-tête** : "Félicitations, [Nom] !"
- **Carte utilisateur** : Avatar avec initiale, informations de contact
- **Résultats** : Profil généré, recommandations, score
- **Actions** : Boutons pour explorer, contacter, candidater

## 🔒 Sécurité et Validation

### **Validation Frontend**
- Champs obligatoires (nom, email, téléphone)
- Format email valide
- Longueur des champs limitée

### **Validation Backend**
- Annotations de validation JPA
- Gestion des erreurs avec try-catch
- Logs détaillés pour le débogage

## 📊 Données Collectées

### **Structure des Données**
```json
{
  "nom": "John Doe",
  "email": "john.doe@example.com",
  "telephone": "+1234567890"
}
```

### **Stockage en Base**
- Table : `etudiant`
- Champs : `nom_test`, `email_test`, `telephone_test`
- Timestamp : `date_test_orientation`
- Statut : `statut_test_complete`

## 🧪 Tests et Validation

### **Tests Backend**
- Service `PersonalInfoService`
- Contrôleur `PersonalInfoController`
- Repository `EtudiantRepository`

### **Tests Frontend**
- Composant `UnifiedOrientationTest`
- Page `PersonalizedResults`
- Service `orientationService`

## 🐛 Dépannage

### **Problèmes Courants**

#### **1. Migration de Base de Données Échouée**
```bash
# Vérifier la connexion à la base
mysql -u root -p diravenir

# Vérifier les tables
SHOW TABLES;
DESCRIBE etudiant;
```

#### **2. Erreur de Sauvegarde des Informations**
```bash
# Vérifier les logs du backend
tail -f logs/spring-boot.log

# Vérifier la connectivité API
curl -X POST http://localhost:8084/api/personal-info/save \
  -H "Content-Type: application/json" \
  -d '{"nom":"Test","email":"test@test.com","telephone":"123456789"}'
```

#### **3. Page de Résultats Non Affichée**
- Vérifier que les données sont passées via `navigate()`
- Vérifier la route `/personalized-results`
- Vérifier les props dans `location.state`

## 🔮 Évolutions Futures

### **Fonctionnalités Prévues**
- Export des résultats en PDF
- Partage des résultats sur les réseaux sociaux
- Historique des tests d'orientation
- Comparaison avec d'autres utilisateurs

### **Améliorations Techniques**
- Cache Redis pour les informations personnelles
- API GraphQL pour plus de flexibilité
- Tests automatisés avec Jest et JUnit
- Monitoring des performances

## 📞 Support

Pour toute question ou problème :
- **Email** : support@diravenir.com
- **Documentation** : Voir les fichiers de configuration
- **Issues** : Créer une issue sur le repository

---

**Version** : 1.0.0  
**Date** : Janvier 2024  
**Auteur** : Équipe Diravenir
