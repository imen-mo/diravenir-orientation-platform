# Programs Feature - Documentation

## Vue d'ensemble

Cette fonctionnalité permet de gérer les programmes (majors) de l'application. Elle remplace complètement l'ancienne fonctionnalité "Filiere" et offre une interface moderne pour l'import et la gestion des programmes.

## Fonctionnalités

### Backend

1. **Entité Program** - Nouvelle entité JPA avec tous les attributs nécessaires
2. **Excel Upload** - Import de programmes depuis un fichier Excel
3. **API REST** - Endpoints complets pour CRUD des programmes
4. **Recherche et Filtrage** - Recherche par nom, université, statut, etc.

### Frontend

1. **Page Programmes** - Liste des programmes avec cartes modernes
2. **Page Détail Programme** - Vue détaillée d'un programme
3. **Admin Dashboard** - Interface d'administration avec Excel upload
4. **Interface Responsive** - Design adaptatif pour tous les appareils

## Structure des Données

### Program Entity
```java
- id (Long)
- majorName (String) - Nom du programme/major
- universityName (String) - Nom de l'université
- description (String) - Description du programme
- degreeType (String) - Type de diplôme
- location (String) - Localisation
- campusCity (String) - Ville du campus
- duration (Integer) - Durée en mois
- language (String) - Langue d'enseignement
- universityRanking (String) - Classement de l'université
- programRanking (String) - Classement du programme
- scholarshipAvailable (Boolean) - Bourse disponible
- tuitionFees (BigDecimal) - Frais de scolarité
- applyBefore (String) - Date limite de candidature
- status (ProgramStatus) - OPENED, COMING_SOON, CLOSED
- programImage (String) - URL de l'image du programme
```

## Import Excel

### Format du fichier Excel

Le fichier Excel doit contenir les colonnes suivantes (en première ligne) :

| Colonne | Description | Obligatoire |
|---------|-------------|-------------|
| majorName | Nom du programme/major | ✅ |
| universityName | Nom de l'université | ✅ |
| description | Description du programme | ✅ |
| degreeType | Type de diplôme | ❌ |
| location | Localisation | ❌ |
| campusCity | Ville du campus | ❌ |
| duration | Durée en mois | ❌ |
| language | Langue d'enseignement | ❌ |
| universityRanking | Classement de l'université | ❌ |
| programRanking | Classement du programme | ❌ |
| scholarshipAvailable | Bourse disponible (true/false) | ❌ |
| tuitionFees | Frais de scolarité | ❌ |
| applyBefore | Date limite de candidature | ❌ |
| status | Statut (OPENED, COMING_SOON, CLOSED) | ❌ |
| programImage | URL de l'image du programme | ❌ |

### Utilisation de l'import Excel

1. **Accéder à l'Admin Dashboard** : `/admin`
2. **Glisser-déposer** ou **sélectionner** un fichier Excel (.xlsx ou .xls)
3. **Cliquer sur "Importer les Programmes"**
4. **Attendre** la confirmation de l'import

## API Endpoints

### Programmes
- `GET /api/programs` - Liste tous les programmes
- `GET /api/programs/{id}` - Détails d'un programme
- `POST /api/programs` - Créer un programme
- `PUT /api/programs/{id}` - Modifier un programme
- `DELETE /api/programs/{id}` - Supprimer un programme

### Import Excel
- `POST /api/programs/import` - Importer des programmes depuis Excel

### Recherche et Filtrage
- `GET /api/programs/search?term={searchTerm}` - Recherche
- `GET /api/programs/filter?majorName={name}&universityName={name}&status={status}` - Filtrage
- `GET /api/programs/status/{status}` - Par statut

## Pages Frontend

### `/programs` - Liste des Programmes
- Affichage en grille avec cartes
- Recherche et filtrage
- Tri par popularité, nom, etc.
- Design responsive

### `/programs/{id}` - Détail Programme
- Informations complètes du programme
- Images et descriptions
- Informations sur l'université
- Bouton de candidature

### `/admin` - Dashboard Administrateur
- Statistiques des programmes
- Interface d'upload Excel
- Gestion des programmes (CRUD)
- Changement de statut

## Migration depuis Filiere

Toutes les références à "Filiere" ont été supprimées et remplacées par "Program" :

- ✅ Entités supprimées : `Filiere.java`, `FiliereDTO.java`, etc.
- ✅ Services supprimés : `FiliereService.java`, `FiliereServiceImpl.java`
- ✅ Contrôleurs supprimés : `FiliereController.java`
- ✅ Repositories supprimés : `FiliereRepository.java`
- ✅ Mappers supprimés : `FiliereMapper.java`
- ✅ Frontend supprimé : Composants Filiere

## Relations Mises à Jour

### Universite.java
```java
@OneToMany(mappedBy = "universite", cascade = CascadeType.ALL)
private List<Program> programs; // Changé de Filiere
```

### Utilisateur.java
```java
@ManyToOne
@JoinColumn(name = "program_id") // Changé de filiere_id
private Program program; // Changé de Filiere
```

## Démarrage Rapide

1. **Démarrer le backend** :
   ```bash
   cd src
   mvn spring-boot:run
   ```

2. **Démarrer le frontend** :
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Accéder à l'admin** :
   - URL : `http://localhost:5173/admin`
   - Se connecter avec un compte administrateur

4. **Importer des programmes** :
   - Préparer un fichier Excel avec les colonnes requises
   - Utiliser l'interface d'upload dans le dashboard admin

## Notes Techniques

- **Base de données** : MySQL avec JPA/Hibernate
- **Excel Processing** : Apache POI
- **Frontend** : React avec Vite
- **API** : RESTful avec Spring Boot
- **Authentification** : JWT
- **Upload** : MultipartFile avec validation

## Support

Pour toute question ou problème :
1. Vérifier les logs du backend
2. Contrôler la console du navigateur
3. Valider le format du fichier Excel
4. S'assurer que la base de données est accessible 