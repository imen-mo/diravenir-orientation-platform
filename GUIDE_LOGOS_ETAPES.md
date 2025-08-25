# 🎯 Guide d'Intégration des Logos des Universités

## 📋 **Étapes à Suivre**

### **Étape 1 : Nettoyer la Base de Données**
1. Ouvrez MySQL Workbench
2. Exécutez : `SET SQL_SAFE_UPDATES = 0;`
3. Exécutez le script : `CLEANUP_LOGOS_SAFE_MODE.sql`
4. Remettez le mode safe : `SET SQL_SAFE_UPDATES = 1;`

### **Étape 2 : Préparer vos URLs de Logos**
1. Ouvrez votre PDF avec les logos des universités
2. Créez un fichier Excel avec :
   - **Colonne A** : Nom de l'université
   - **Colonne B** : URL du logo
   - **Colonne C** : Nom en anglais (optionnel)

### **Étape 3 : Insérer les Vrais Logos**
1. Modifiez le fichier `INSERT_LOGOS_FROM_PDF.sql`
2. Remplacez `VOTRE_URL_LOGO_ICI` par vos vraies URLs
3. Exécutez le script

### **Étape 4 : Vérifier le Résultat**
1. Exécutez la requête de vérification
2. Vérifiez que tous les logos sont configurés

## 🔧 **Exemple d'URLs de Logos**

```sql
-- Remplacez ces exemples par vos vraies URLs
UPDATE universite 
SET logo_url = 'https://example.com/logos/hayfi-university.png'
WHERE nom LIKE '%Hayfi%';

UPDATE universite 
SET logo_url = 'https://example.com/logos/near-east-university.png'
WHERE nom LIKE '%Near East%';
```

## 📱 **Résultat Attendu**

Après l'intégration, vous verrez dans la page des programmes :
- ✅ **Logo circulaire** de chaque université
- ✅ **Nom du programme** (ex: Software Engineering)
- ✅ **Nom de l'université** (ex: Hayfi University)
- ✅ **Design moderne** avec gradient violet

## 🚨 **Points Importants**

1. **URLs valides** : Doivent commencer par `http://` ou `https://`
2. **Format des images** : PNG, JPG, SVG recommandés
3. **Taille des logos** : 80x80px affichés, 160x160px recommandés
4. **Mode safe update** : Désactiver temporairement pour les mises à jour

## 📞 **En Cas de Problème**

- Vérifiez que les URLs sont accessibles
- Vérifiez le format des images
- Consultez la console du navigateur pour les erreurs
- Utilisez les requêtes de diagnostic pour identifier les problèmes

## 🎉 **Résultat Final**

Vos programmes afficheront maintenant de beaux logos circulaires des universités, créant une interface moderne et professionnelle !
