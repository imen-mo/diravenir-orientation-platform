# 🔧 Guide de Dépannage - Upload Excel avec Nouvelle Structure

## ❌ **Erreur : "programService.uploadExcel is not a function"**

### **Cause**
La méthode `uploadExcel` n'était pas définie dans le service `programService`.

### **Solution appliquée**
✅ Ajout de la méthode `uploadExcel` dans `frontend/src/services/api.js` :

```javascript
uploadExcel: async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await API.post("/programs/import", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}
```

## ❌ **Erreur : Mapping des colonnes incorrect**

### **Cause**
Le contrôleur backend utilisait encore l'ancienne structure avec `setMajorName`, `setUniversityName`, etc.

### **Solution appliquée**
✅ Mise à jour du `ProgramUploadController.java` pour utiliser la nouvelle structure unifiée :

```java
// Nouvelle structure unifiée des colonnes
program.setCampusCity(getString(row, columnMap.get("campusCity")));
program.setUniversities(getString(row, columnMap.get("universities")));
program.setUniversityRanking(getString(row, columnMap.get("universityRanking")));
program.setApplyBefore(getString(row, columnMap.get("applyBefore")));
program.setCategory(getString(row, columnMap.get("category")));
program.setProgram(getString(row, columnMap.get("program")));
program.setDegreeType(getString(row, columnMap.get("degreeType")));
// ... autres colonnes
```

## ✅ **Validation des colonnes requises**

### **Colonnes obligatoires**
Le système vérifie maintenant que ces colonnes sont présentes dans le fichier Excel :

- `campusCity` - Ville du campus
- `universities` - Nom de l'université  
- `program` - Nom du programme
- `category` - Catégorie du programme
- `degreeType` - Type de diplôme

### **Message d'erreur si colonne manquante**
```
Colonne requise manquante: campusCity. 
Les colonnes requises sont: campusCity, universities, program, category, degreeType
```

## 📊 **Fichier Excel d'exemple**

### **Format recommandé**
Utilisez le fichier `exemple-nouvelle-structure.csv` comme modèle :

```csv
campusCity,universities,universityRanking,applyBefore,category,program,degreeType,tuitionFees,duration,language,scholarship,description,aboutThisProgram,whyThisProgram,aboutTheUniversity,status
Nicosia,Near East University,N/A,31st July,Medical and Health Sciences,Medicine,Bachelor,€10923.00,6,English,Available for eligible international students,A well-structured Bachelor program...,An engaging course in Medicine...,"- Exposure to diverse perspectives...",Near East University is a recognised institution...,OPENED
```

### **Conversion vers Excel**
1. Ouvrir le fichier CSV dans Excel
2. Sauvegarder au format `.xlsx`
3. Utiliser ce fichier pour tester l'upload

## 🔍 **Vérifications à effectuer**

### **1. Frontend**
- ✅ Méthode `uploadExcel` ajoutée dans `programService`
- ✅ Composant `ExcelUploader` utilise la bonne méthode
- ✅ Gestion des erreurs avec `toast.error`

### **2. Backend**
- ✅ Endpoint `/api/programs/import` accessible
- ✅ Contrôleur utilise la nouvelle structure
- ✅ Validation des colonnes requises
- ✅ Mapping correct des données

### **3. Base de données**
- ✅ Entité `Program` mise à jour
- ✅ DTO `ProgramDTO` synchronisé
- ✅ Mapper `ProgramMapper` corrigé

## 🚀 **Test de l'upload**

### **Étapes de test**
1. **Démarrer le backend** sur le port 8084
2. **Démarrer le frontend** sur le port 5173
3. **Aller sur la page d'accueil** et cliquer sur "Accéder au Dashboard Admin"
4. **Glisser-déposer** le fichier Excel d'exemple
5. **Cliquer sur "Importer les Programmes"**

### **Résultat attendu**
- ✅ Message de succès : "Import réussi ! X programmes importés."
- ✅ Les programmes apparaissent dans la liste
- ✅ Tous les attributs sont correctement affichés

## ❗ **Problèmes courants et solutions**

### **1. "Erreur de connexion au serveur"**
- Vérifier que le backend est démarré sur le port 8084
- Vérifier les logs du backend pour les erreurs

### **2. "Colonne requise manquante"**
- Vérifier que le fichier Excel contient toutes les colonnes obligatoires
- Vérifier l'orthographe exacte des noms de colonnes
- Utiliser le fichier d'exemple comme référence

### **3. "Erreur lors de l'import"**
- Vérifier le format des données (dates, nombres, etc.)
- Vérifier que les cellules ne sont pas vides pour les colonnes requises
- Consulter les logs du backend pour plus de détails

### **4. "Programmes non affichés après import"**
- Vérifier que l'import s'est bien terminé avec succès
- Vérifier que les programmes ont le statut "OPENED"
- Rafraîchir la page des programmes

## 📞 **Support technique**

Si vous rencontrez encore des problèmes :

1. **Vérifier les logs** du navigateur (F12 → Console)
2. **Vérifier les logs** du backend Spring Boot
3. **Comparer** votre fichier Excel avec l'exemple fourni
4. **Vérifier** que toutes les modifications ont été appliquées

---

**Note :** Toutes les erreurs mentionnées dans ce guide ont été corrigées dans la version actuelle du code.
