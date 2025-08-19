# 🚀 Guide du Système de Statut Utilisateur Online/Offline

## 📋 Vue d'ensemble

Ce guide décrit l'implémentation complète d'un système de gestion du statut utilisateur (online/offline) pour l'application Diravenir. Le système permet de :

- ✅ Marquer automatiquement les utilisateurs comme "online" lors de la connexion
- ✅ Marquer automatiquement les utilisateurs comme "offline" lors de la déconnexion
- ✅ Suivre l'activité des utilisateurs en temps réel
- ✅ Nettoyer automatiquement les sessions expirées
- ✅ Afficher le statut en temps réel dans l'interface

## 🏗️ Architecture du Système

### Backend (Java/Spring Boot)

```
src/main/java/com/dira/diravenir1/
├── Entities/
│   └── Utilisateur.java                    # Champs de statut ajoutés
├── dto/
│   └── UtilisateurDTO.java                 # DTO avec statut
├── mapper/
│   └── UtilisateurMapper.java              # Mapping des champs de statut
├── Repository/
│   └── UtilisateurRepository.java          # Méthodes de recherche par statut
├── service/
│   ├── UserStatusService.java              # Service principal de gestion du statut
│   └── SessionCleanupService.java          # Nettoyage automatique des sessions
├── Controller/
│   └── AuthController.java                 # Endpoints de statut ajoutés
└── config/
    └── SecurityConfig.java                 # Sécurité mise à jour
```

### Frontend (React)

```
frontend/src/
├── components/
│   ├── UserStatusIndicator.jsx             # Indicateur de statut visuel
│   └── UserStatusTest.jsx                  # Composant de test
├── hooks/
│   └── useAuth.jsx                         # Hook avec gestion du statut
├── services/
│   └── api.js                              # API pour le statut
└── pages/
    └── Dashboard.jsx                       # Page avec indicateur de statut
```

## 🚀 Déploiement

### 1. Base de Données

Exécuter le script de migration SQL :

```sql
-- Migration V2: Ajout des champs de statut utilisateur
ALTER TABLE utilisateur 
ADD COLUMN statut_online BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN derniere_activite TIMESTAMP,
ADD COLUMN session_active BOOLEAN NOT NULL DEFAULT FALSE;

-- Index pour optimiser les performances
CREATE INDEX idx_utilisateur_statut_online ON utilisateur(statut_online);
CREATE INDEX idx_utilisateur_derniere_activite ON utilisateur(derniere_activite);
CREATE INDEX idx_utilisateur_session_active ON utilisateur(session_active);
```

### 2. Backend

1. **Redémarrer l'application Spring Boot**
   ```bash
   mvn spring-boot:run
   ```

2. **Vérifier les logs** pour confirmer le démarrage :
   ```
   ✅ UserStatusService initialisé
   ✅ SessionCleanupService initialisé
   ✅ Endpoints de statut disponibles
   ```

### 3. Frontend

1. **Installer les dépendances** (si nécessaire) :
   ```bash
   cd frontend
   npm install
   ```

2. **Démarrer l'application** :
   ```bash
   npm run dev
   ```

## 🧪 Tests du Système

### Test 1: Connexion Utilisateur

1. **Aller sur** `/signin`
2. **Se connecter** avec un compte valide
3. **Vérifier** que l'utilisateur est marqué comme "online" dans la base
4. **Redirection** vers `/dashboard` avec indicateur de statut

### Test 2: Indicateur de Statut

1. **Sur le Dashboard**, vérifier la présence de `UserStatusIndicator`
2. **Statut affiché** : "En ligne" avec point vert animé
3. **Dernière activité** mise à jour en temps réel

### Test 3: Composant de Test

1. **Sur le Dashboard**, utiliser `UserStatusTest`
2. **Lancer les tests** pour vérifier le bon fonctionnement
3. **Simuler l'activité** utilisateur
4. **Vérifier** que tous les tests passent

### Test 4: Déconnexion

1. **Se déconnecter** via le bouton logout
2. **Vérifier** que l'utilisateur est marqué comme "offline"
3. **Redirection** vers la page de connexion

### Test 5: Nettoyage Automatique

1. **Attendre** 5 minutes (ou modifier la configuration)
2. **Vérifier les logs** du `SessionCleanupService`
3. **Confirmer** le nettoyage des sessions expirées

## 🔧 Configuration

### Paramètres de Nettoyage

Dans `SessionCleanupService.java` :

```java
@Scheduled(fixedRate = 300000) // 5 minutes
public void cleanupExpiredSessions() {
    userStatusService.cleanupExpiredSessions(30); // 30 minutes d'inactivité
}
```

### Paramètres de Sécurité

Dans `SecurityConfig.java` :

```java
.requestMatchers(new AntPathRequestMatcher("/api/auth/status")).permitAll()
.requestMatchers(new AntPathRequestMatcher("/api/auth/heartbeat")).permitAll()
```

## 📊 Monitoring et Logs

### Logs Importants

- **Connexion** : `✅ Utilisateur marqué comme online: {email}`
- **Déconnexion** : `✅ Utilisateur marqué comme offline: {email}`
- **Nettoyage** : `🧹 Session expirée nettoyée pour: {email}`
- **Erreurs** : `❌ Erreur lors du marquage online/offline`

### Métriques Disponibles

- Nombre d'utilisateurs en ligne : `userStatusService.countByStatutOnlineTrue()`
- Sessions actives : `userStatusService.getOnlineUsers()`
- Dernière activité : `userStatusService.getDerniereActivite()`

## 🐛 Dépannage

### Problème 1: Utilisateur reste "online" après déconnexion

**Cause** : Erreur lors de la mise à jour du statut
**Solution** : Vérifier les logs et la connexion à la base de données

### Problème 2: Indicateur de statut ne s'affiche pas

**Cause** : Composant non rendu ou erreur dans l'API
**Solution** : Vérifier la console du navigateur et les logs backend

### Problème 3: Sessions non nettoyées automatiquement

**Cause** : `@EnableScheduling` non activé
**Solution** : Vérifier l'annotation sur la classe principale

### Problème 4: Erreur 500 sur les endpoints de statut

**Cause** : Méthodes manquantes dans le repository
**Solution** : Vérifier que toutes les méthodes sont implémentées

## 🔒 Sécurité

### Endpoints Protégés

- `/api/auth/status` : Accessible sans authentification (pour vérification)
- `/api/auth/heartbeat` : Accessible sans authentification (pour mise à jour)

### Validation des Tokens

- Vérification JWT avant mise à jour du statut
- Logs de sécurité pour toutes les opérations
- Gestion des erreurs d'authentification

## 📈 Améliorations Futures

### Phase 2

- [ ] Notifications en temps réel (WebSocket)
- [ ] Historique des connexions/déconnexions
- [ ] Statistiques d'utilisation
- [ ] Gestion des sessions multiples

### Phase 3

- [ ] Intégration avec un système de chat
- [ ] Présence dans les groupes/équipes
- [ ] Rapports d'activité détaillés
- [ ] API publique pour les développeurs

## 📞 Support

En cas de problème :

1. **Vérifier les logs** de l'application
2. **Consulter** la console du navigateur
3. **Tester** avec le composant `UserStatusTest`
4. **Vérifier** la base de données directement

---

**Version** : 1.0.0  
**Date** : Janvier 2024  
**Auteur** : Assistant IA  
**Statut** : ✅ Implémenté et Testé
