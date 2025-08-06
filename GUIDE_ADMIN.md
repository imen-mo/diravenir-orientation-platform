# 🚀 Guide Admin - Upload Excel vers MySQL

## 📋 Résumé de ce qui fonctionne

✅ **Upload Excel → MySQL** : Le fichier Excel se télécharge bien en MySQL  
✅ **Affichage Frontend** : Les données de MySQL s'affichent sur `/programs`  
✅ **Interface Admin** : Dashboard admin avec upload Excel  

## 🔐 Comment se connecter en tant qu'admin

### 1. Créer le compte admin dans MySQL

Exécutez ce script SQL dans votre base de données :

```sql
-- Créer un admin avec mot de passe "admin123"
INSERT INTO utilisateurs (
    email, 
    password, 
    nom, 
    prenom, 
    role, 
    date_creation,
    email_verifie
) VALUES (
    'admin@diravenir.com',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8Kq8Kq8',
    'Admin',
    'Diravenir',
    'ADMIN',
    NOW(),
    true
);
```

### 2. Se connecter

1. **Démarrer l'application** :
   ```bash
   # Backend
   cd src && mvn spring-boot:run
   
   # Frontend
   cd frontend && npm run dev
   ```

2. **Aller sur** : `http://localhost:5173/signin`

3. **Se connecter avec** :
   - Email : `admin@diravenir.com`
   - Mot de passe : `admin123`

4. **Accéder au dashboard admin** : `http://localhost:5173/admin`

## 📊 Utilisation de l'upload Excel

### 1. Préparer le fichier Excel

Le fichier Excel doit avoir ces colonnes (première ligne) :

| Colonne | Description | Exemple |
|---------|-------------|---------|
| majorName | Nom du programme | "Computer Science" |
| universityName | Nom de l'université | "Stanford University" |
| description | Description | "Programme avancé..." |
| degreeType | Type de diplôme | "Bachelor" |
| location | Localisation | "California" |
| campusCity | Ville du campus | "Stanford" |
| duration | Durée en mois | 48 |
| language | Langue d'enseignement | "English" |
| universityRanking | Classement université | "Top 5" |
| programRanking | Classement programme | "Top 10" |
| scholarshipAvailable | Bourse disponible | true |
| tuitionFees | Frais de scolarité | 50000 |
| applyBefore | Date limite | "2024-05-15" |
| status | Statut | "OPENED" |
| programImage | URL image | "https://..." |

### 2. Upload via l'interface admin

1. Aller sur `/admin`
2. Glisser-déposer le fichier Excel
3. Cliquer "Importer les Programmes"
4. Attendre la confirmation

### 3. Voir les résultats

- **Liste des programmes** : `/programs`
- **Détail d'un programme** : `/programs/{id}`

## 🔍 Vérification

### Vérifier en base de données
```sql
-- Voir tous les programmes importés
SELECT * FROM program;

-- Compter les programmes
SELECT COUNT(*) FROM program;
```

### Vérifier sur le frontend
- Aller sur `/programs` pour voir la liste
- Cliquer sur un programme pour voir les détails

## 🛠️ Dépannage

### Problème : "Accès Refusé"
- Vérifier que l'utilisateur a le rôle `ADMIN`
- Vérifier que le compte admin a été créé en base

### Problème : Upload échoue
- Vérifier le format du fichier Excel
- Vérifier que les colonnes correspondent
- Regarder les logs du backend

### Problème : Pas de données affichées
- Vérifier que l'upload a réussi
- Vérifier la connexion à la base de données
- Regarder la console du navigateur

## 📞 Support

Si vous avez des problèmes :
1. Vérifier les logs du backend
2. Contrôler la console du navigateur
3. Vérifier la base de données MySQL 