# 📊 Système de Statistiques Interactives DirAvenir

## 🎯 Vue d'ensemble

Le système de statistiques interactives DirAvenir offre une visualisation dynamique et moderne des données de la plateforme. Avec un **diagramme unique** qui change selon le bouton sélectionné, les administrateurs peuvent analyser facilement toutes les métriques importantes.

## ✨ Fonctionnalités Principales

### 🔄 **Diagramme Unique Interchangeable**
- **Un seul graphique** pour toutes les statistiques
- **Boutons de sélection** pour changer instantanément les données affichées
- **Types de graphiques multiples** : barres, lignes, camembert, aires
- **Transitions fluides** entre les différents modes de visualisation

### 📈 **Types de Statistiques Disponibles**

#### 1. **Applications** 📄
- Total des applications
- Applications approuvées
- Applications rejetées
- Applications en attente
- Applications ce mois/cette semaine
- Statuts de paiement

#### 2. **Programmes** 🎓
- Total des programmes
- Programmes actifs/inactifs
- Programmes par statut
- Programmes par destination
- Programmes par université
- Programmes par catégorie

#### 3. **Utilisateurs** 👥
- Total des utilisateurs
- Utilisateurs par rôle (Étudiants/Admins)
- Utilisateurs actifs/inactifs
- Nouveaux utilisateurs (mois/semaine)
- Utilisateurs avec applications
- Utilisateurs avec tests complétés

#### 4. **Tests d'Orientation** 🧠
- Total des tests
- Tests complétés/en cours
- Tests abandonnés
- Taux de completion
- Tests par jour (30 derniers jours)
- Profils les plus populaires

#### 5. **Chat & Messages** 💬
- Messages totaux
- Messages non lus
- Conversations actives
- Utilisateurs en ligne
- Messages par jour/heure
- Temps de réponse moyen

#### 6. **Statistiques Financières** 💰
- Applications payées
- Paiements en attente/échoués
- Taux de conversion
- Revenus totaux/mensuels/hebdomadaires
- Revenus par programme/destination

#### 7. **Activité Temporelle** ⏰
- Activité par heure (24h)
- Activité par jour (30 jours)
- Activité par mois (12 mois)
- Heures et jours de pointe

### 🎨 **Types de Graphiques**

#### 📊 **Graphique en Barres**
- Idéal pour comparer des valeurs
- Parfait pour les statistiques d'applications et programmes

#### 📈 **Graphique en Ligne**
- Excellent pour les tendances temporelles
- Parfait pour l'activité et les tests

#### 🥧 **Graphique en Camembert**
- Idéal pour les proportions
- Parfait pour les répartitions par statut

#### 📉 **Graphique en Aire**
- Excellent pour les volumes cumulés
- Parfait pour les revenus et l'activité

## 🚀 Comment Utiliser

### 1. **Accès au Système**
```javascript
// Dans le dashboard admin, cliquez sur le bouton
<button className="btn-secondary active">
  <FaChartLine /> Statistiques Interactives
</button>
```

### 2. **Sélection des Statistiques**
```javascript
// Choisissez le type de données à visualiser
const statButtons = [
  { key: 'applications', label: 'Applications', icon: <FaFileAlt /> },
  { key: 'programs', label: 'Programmes', icon: <FaGraduationCap /> },
  { key: 'users', label: 'Utilisateurs', icon: <FaUsers /> },
  { key: 'tests', label: 'Tests', icon: <FaBrain /> },
  { key: 'chat', label: 'Chat', icon: <FaComments /> },
  { key: 'financial', label: 'Financier', icon: <FaMoneyBillWave /> },
  { key: 'temporal', label: 'Temporel', icon: <FaClock /> }
];
```

### 3. **Changement de Type de Graphique**
```javascript
// Sélectionnez le type de visualisation
const chartTypes = [
  { key: 'bar', label: 'Barres', icon: '📊' },
  { key: 'line', label: 'Ligne', icon: '📈' },
  { key: 'pie', label: 'Camembert', icon: '🥧' },
  { key: 'area', label: 'Aire', icon: '📉' }
];
```

## 🏗️ Architecture Technique

### **Composants Frontend**

#### `InteractiveStatistics.jsx`
```javascript
import React, { useState, useEffect } from 'react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
    ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, 
    AreaChart, Area 
} from 'recharts';
```

#### **Fonctionnalités Clés**
- **État local** pour la sélection des statistiques et types de graphiques
- **Fonctions de transformation** des données selon le type sélectionné
- **Rendu conditionnel** des composants de graphiques
- **Responsive design** avec Recharts

### **Intégration Backend**

#### **Service de Statistiques**
```java
@Service
public class AdminStatisticsService {
    public Map<String, Object> getUserStatistics() { ... }
    public Map<String, Object> getApplicationStatistics() { ... }
    public Map<String, Object> getProgramStatistics() { ... }
    public Map<String, Object> getChatStatistics() { ... }
    public Map<String, Object> getOrientationStatistics() { ... }
    public Map<String, Object> getFinancialStatistics() { ... }
    public Map<String, Object> getTemporalStatistics() { ... }
}
```

#### **Contrôleur API**
```java
@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getAllStatistics() {
        // Retourne toutes les statistiques formatées
    }
}
```

## 🎨 Design et Palette de Couleurs

### **Palette DirAvenir Respectée**
```css
:root {
  --primary-purple: #541652;
  --secondary-purple: #DDC9DB;
  --gradient-orange: linear-gradient(88.33deg, #FCBE1C -7.64%, #FF914C 145.94%);
  --gradient-yellow: linear-gradient(88.33deg, #FCBE1C -7.64%, #FCBE1C 145.94%);
  --background-white: #FFFFFF;
}
```

### **Éléments Visuels**
- **Boutons interactifs** avec états hover et active
- **Transitions fluides** entre les modes
- **Icônes expressives** pour chaque type de statistique
- **Cartes de détails** avec informations complémentaires
- **Design responsive** pour tous les écrans

## 📱 Responsive Design

### **Breakpoints**
- **Desktop** : > 1200px - Affichage complet
- **Tablet** : 768px - 1200px - Adaptation des grilles
- **Mobile** : < 768px - Stack vertical et boutons pleine largeur

### **Adaptations Mobile**
```css
@media (max-width: 768px) {
  .stat-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .stat-button {
    width: 100%;
    max-width: 200px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
```

## 🔧 Installation et Configuration

### **1. Installation des Dépendances**
```bash
cd frontend
npm install recharts
```

### **2. Import du Composant**
```javascript
import InteractiveStatistics from '../components/AdminStats/InteractiveStatistics';
```

### **3. Intégration dans le Dashboard**
```javascript
{showInteractiveStats && (
  <InteractiveStatistics 
    statistics={statistics} 
    loading={loading} 
  />
)}
```

## 📊 Exemples d'Utilisation

### **Visualisation des Applications**
```javascript
// Données d'exemple pour les applications
const applicationData = [
  { name: 'Total', value: 456, color: '#541652' },
  { name: 'Approuvées', value: 312, color: '#10B981' },
  { name: 'Rejetées', value: 45, color: '#EF4444' },
  { name: 'En attente', value: 99, color: '#F59E0B' }
];
```

### **Graphique Temporel**
```javascript
// Données d'activité par heure
const temporalData = [
  { name: '00:00', value: 5 },
  { name: '06:00', value: 12 },
  { name: '12:00', value: 45 },
  { name: '18:00', value: 38 },
  { name: '23:00', value: 8 }
];
```

## 🚀 Avantages du Système

### **Pour les Administrateurs**
- **Vue d'ensemble rapide** de toutes les métriques
- **Analyse comparative** facile entre différents types de données
- **Visualisation adaptée** selon le contexte d'analyse
- **Interface intuitive** et moderne

### **Pour le Développement**
- **Code réutilisable** et modulaire
- **Performance optimisée** avec Recharts
- **Maintenance simplifiée** avec une architecture claire
- **Extensibilité** pour de nouveaux types de statistiques

## 🔮 Évolutions Futures

### **Fonctionnalités Prévues**
- **Export des graphiques** en PDF/PNG
- **Filtres temporels** personnalisés
- **Comparaisons** entre périodes
- **Alertes automatiques** basées sur les seuils
- **Tableaux de bord** personnalisables

### **Intégrations Possibles**
- **WebSocket** pour les mises à jour temps réel
- **Cache Redis** pour les performances
- **Notifications push** pour les alertes
- **API externes** pour des données enrichies

## 📝 Conclusion

Le système de statistiques interactives DirAvenir transforme la façon dont les administrateurs analysent et comprennent les données de la plateforme. Avec son **diagramme unique interchangeable** et ses **visualisations multiples**, il offre une expérience utilisateur exceptionnelle tout en respectant parfaitement l'identité visuelle DirAvenir.

**🎯 Objectif atteint** : Un système de visualisation moderne, intuitif et performant qui répond parfaitement aux besoins d'analyse des administrateurs de la plateforme DirAvenir.
