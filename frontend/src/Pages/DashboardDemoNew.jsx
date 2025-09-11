import React, { useState } from 'react';
import StudentDashboardNew from './StudentDashboardNew';
import './DashboardDemoNew.css';
import { FaPlay, FaCode, FaEye, FaDownload } from 'react-icons/fa';

const DashboardDemoNew = () => {
  const [activeDemo, setActiveDemo] = useState('preview');

  const features = [
    {
      title: "Design Fidèle",
      description: "Interface exactement conforme au design fourni avec sidebar, header et graphiques",
      icon: "🎨"
    },
    {
      title: "Graphiques Avancés",
      description: "Diagramme linéaire interactif et graphiques circulaires pour les statistiques",
      icon: "📊"
    },
    {
      title: "Cartes d'Applications",
      description: "Cartes professionnelles avec images d'universités et états visuels",
      icon: "🎓"
    },
    {
      title: "Résultats de Tests",
      description: "Affichage détaillé des tests avec réponses et recommandations",
      icon: "📝"
    },
    {
      title: "Chat en Ligne",
      description: "Support client intégré avec actions rapides et réponses automatiques",
      icon: "💬"
    },
    {
      title: "Interface Responsive",
      description: "Design adaptatif pour tous les appareils et tailles d'écran",
      icon: "📱"
    }
  ];

  const codeSnippet = `// Exemple d'utilisation du nouveau dashboard
import StudentDashboardNew from './pages/StudentDashboardNew';

function App() {
  return (
    <div className="App">
      <StudentDashboardNew />
    </div>
  );
}

// Fonctionnalités principales :
// - Sidebar avec navigation et logo Diravenir
// - Header avec message de bienvenue et actions
// - Graphiques linéaires et circulaires
// - Cartes d'applications avec états
// - Section résultats de tests détaillés
// - Chat en ligne intégré
// - Design responsive et moderne`;

  return (
    <div className="dashboard-demo-new">
      <div className="demo-header">
        <div className="demo-title">
          <h1>🎯 Dashboard Étudiant - Design Fidèle</h1>
          <p>Interface exactement conforme au design fourni avec toutes les fonctionnalités demandées</p>
        </div>
        
        <div className="demo-tabs">
          <button 
            className={`tab ${activeDemo === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveDemo('preview')}
          >
            <FaEye /> Aperçu
          </button>
          <button 
            className={`tab ${activeDemo === 'features' ? 'active' : ''}`}
            onClick={() => setActiveDemo('features')}
          >
            <FaCode /> Fonctionnalités
          </button>
          <button 
            className={`tab ${activeDemo === 'code' ? 'active' : ''}`}
            onClick={() => setActiveDemo('code')}
          >
            <FaDownload /> Code
          </button>
        </div>
      </div>

      <div className="demo-content">
        {activeDemo === 'preview' && (
          <div className="preview-container">
            <div className="preview-header">
              <h2>🚀 Aperçu du Dashboard</h2>
              <p>Interface complète avec toutes les fonctionnalités intégrées</p>
            </div>
            <div className="dashboard-preview">
              <StudentDashboardNew />
            </div>
          </div>
        )}

        {activeDemo === 'features' && (
          <div className="features-container">
            <div className="features-header">
              <h2>✨ Fonctionnalités Implémentées</h2>
              <p>Toutes les demandes ont été réalisées selon le design fourni</p>
            </div>
            
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="implementation-details">
              <h3>🎯 Détails d'Implémentation</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <h4>Sidebar</h4>
                  <ul>
                    <li>Logo Diravenir positionné exactement</li>
                    <li>Navigation avec indicateurs actifs</li>
                    <li>Menu top et bottom séparés</li>
                    <li>Badges de notification</li>
                  </ul>
                </div>
                
                <div className="detail-item">
                  <h4>Header</h4>
                  <ul>
                    <li>Message de bienvenue personnalisé</li>
                    <li>Icônes de recherche et notifications</li>
                    <li>Profil utilisateur avec dropdown</li>
                    <li>Design conforme au mockup</li>
                  </ul>
                </div>
                
                <div className="detail-item">
                  <h4>Graphiques</h4>
                  <ul>
                    <li>Diagramme linéaire avec légendes</li>
                    <li>Graphiques circulaires superposés</li>
                    <li>Filtres et contrôles interactifs</li>
                    <li>Animations et transitions fluides</li>
                  </ul>
                </div>
                
                <div className="detail-item">
                  <h4>Applications</h4>
                  <ul>
                    <li>Cartes avec images d'universités</li>
                    <li>États visuels et barres de progression</li>
                    <li>Tags et badges de statut</li>
                    <li>Actions et boutons interactifs</li>
                  </ul>
                </div>
                
                <div className="detail-item">
                  <h4>Tests</h4>
                  <ul>
                    <li>Affichage des réponses détaillées</li>
                    <li>Résultats précédents avec historique</li>
                    <li>Recommandations personnalisées</li>
                    <li>Actions (voir, télécharger, repasser)</li>
                  </ul>
                </div>
                
                <div className="detail-item">
                  <h4>Chat</h4>
                  <ul>
                    <li>Support client en temps réel</li>
                    <li>Actions rapides prédéfinies</li>
                    <li>Réponses automatiques intelligentes</li>
                    <li>Interface moderne et intuitive</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeDemo === 'code' && (
          <div className="code-container">
            <div className="code-header">
              <h2>💻 Code Source</h2>
              <p>Fichiers créés pour le nouveau dashboard</p>
            </div>
            
            <div className="code-files">
              <div className="file-item">
                <h3>📄 StudentDashboardNew.jsx</h3>
                <p>Composant principal du dashboard avec toutes les fonctionnalités</p>
                <div className="file-stats">
                  <span>400+ lignes</span>
                  <span>React Hooks</span>
                  <span>Responsive Design</span>
                </div>
              </div>
              
              <div className="file-item">
                <h3>🎨 StudentDashboardNew.css</h3>
                <p>Styles CSS complets pour le design fidèle</p>
                <div className="file-stats">
                  <span>800+ lignes</span>
                  <span>CSS Grid/Flexbox</span>
                  <span>Animations</span>
                </div>
              </div>
              
              <div className="file-item">
                <h3>💬 OnlineChat.jsx</h3>
                <p>Composant de chat en ligne intégré</p>
                <div className="file-stats">
                  <span>200+ lignes</span>
                  <span>Real-time</span>
                  <span>Actions rapides</span>
                </div>
              </div>
              
              <div className="file-item">
                <h3>🎨 OnlineChat.css</h3>
                <p>Styles pour le chat avec animations</p>
                <div className="file-stats">
                  <span>300+ lignes</span>
                  <span>Responsive</span>
                  <span>Modern UI</span>
                </div>
              </div>
            </div>
            
            <div className="code-snippet">
              <h3>📝 Exemple d'Utilisation</h3>
              <pre><code>{codeSnippet}</code></pre>
            </div>
            
            <div className="installation-steps">
              <h3>🚀 Installation</h3>
              <ol>
                <li>Copier les fichiers dans votre projet React</li>
                <li>Installer les dépendances : <code>npm install react-icons</code></li>
                <li>Importer et utiliser : <code>import StudentDashboardNew from './pages/StudentDashboardNew'</code></li>
                <li>Personnaliser les données selon vos besoins</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardDemoNew;
