# 🚀 PUSH FORCE SÉCURISÉ - DIRAVENIR

## 📋 Description

Ce système permet de forcer le push de vos modifications tout en excluant automatiquement les fichiers sensibles (authentification, sécurité, FAQ, Footer) pour éviter les conflits avec le système d'authentification de votre binôme.

## ⚠️ Fichiers Exclus Automatiquement

### 🔐 Authentification & Sécurité
- `**/AuthContext.jsx`, `**/SimpleAuthContext.jsx`
- `**/authService.js`, `**/simpleAuthService.js`, `**/oauth2Service.js`
- `**/AuthController.java`, `**/OAuth2Controller.java`
- `**/AuthenticationService.java`, `**/OAuth2Service.java`
- `**/SecurityConfig.java`, `**/SecurityHeadersFilter.java`
- Tous les fichiers contenant "auth", "oauth", "security"

### 📄 FAQ & Footer
- `**/FAQ.jsx`, `**/FAQ.css`
- `**/Footer.jsx`, `**/Footer.css`

### ⚙️ Configuration Sensible
- `.env*`, `application*.properties`
- Fichiers de configuration OAuth2

### 🧪 Tests d'Authentification
- `test-*-auth*.*`
- `test-*-oauth*.*`
- Guides d'authentification

## 🛠️ Scripts Disponibles

### 1. `verifier-exclusions.bat`
```bash
verifier-exclusions.bat
```
**Usage :** Vérifie quels fichiers seront exclus du push
**Quand l'utiliser :** Avant de faire le push pour vérifier

### 2. `test-push-securise.bat`
```bash
test-push-securise.bat
```
**Usage :** Simulation complète du push (dry run)
**Quand l'utiliser :** Pour tester avant le vrai push

### 3. `push-force-securise.bat` (Windows)
```bash
push-force-securise.bat
```
**Usage :** PUSH FORCE réel - ÉCRASE les modifications distantes
**Quand l'utiliser :** Quand vous êtes sûr de vouloir forcer vos modifications

### 4. `push-force-securise.ps1` (PowerShell)
```powershell
.\push-force-securise.ps1
```
**Usage :** Version PowerShell du push force
**Quand l'utiliser :** Si vous préférez PowerShell

## 📝 Processus Recommandé

### Étape 1 : Vérification
```bash
verifier-exclusions.bat
```
Vérifiez que les fichiers sensibles sont bien détectés.

### Étape 2 : Test
```bash
test-push-securise.bat
```
Simulez le push pour vérifier que tout est correct.

### Étape 3 : Push Force
```bash
push-force-securise.bat
```
Lancez le vrai push force.

## ⚠️ ATTENTIONS IMPORTANTES

1. **ÉCRASEMENT TOTAL** : Ce script va ÉCRASER les modifications de votre binôme
2. **SAUVEGARDE** : Les branches distantes sont sauvegardées avant l'écrasement
3. **IRRÉVERSIBLE** : Une fois fait, les modifications de votre binôme seront perdues
4. **AUTH PROTÉGÉ** : Le système d'authentification de votre binôme sera préservé

## 🔍 Vérifications Post-Push

Après le push, vérifiez que :
- ✅ Vos modifications sont présentes
- ✅ Les fichiers d'auth de votre binôme sont intacts
- ✅ FAQ et Footer ne sont pas modifiés
- ✅ Le système fonctionne correctement

## 🆘 En Cas de Problème

Si quelque chose ne va pas :

1. **Restaurer depuis la sauvegarde :**
```bash
git fetch origin backup-main:main
git push --force origin main
```

2. **Vérifier les fichiers exclus :**
```bash
git status --ignored
```

3. **Annuler le dernier commit :**
```bash
git reset --soft HEAD~1
```

## 📞 Support

En cas de problème, vérifiez :
- Que vous êtes dans le bon dossier du projet
- Que Git est configuré correctement
- Que vous avez les permissions de push sur le dépôt

---

**🎯 Objectif :** Permettre de forcer vos modifications tout en préservant le système d'authentification fonctionnel de votre binôme.
