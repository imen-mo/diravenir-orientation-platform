import React from 'react';
import { Link } from 'react-router-dom';
import './TestList.css';
import GlobalLayout from '../components/GlobalLayout';

export default function TestList() {
    const tests = [
        {
            id: 'orientation',
            title: 'Test d\'Orientation Académique',
            description: 'Découvrez votre profil académique et les filières qui vous correspondent le mieux. Ce test analyse vos intérêts, compétences et personnalité pour vous orienter vers les domaines d\'études les plus adaptés.',
            icon: '🎯',
            color: '#FDCB00',
            duration: '10-15 min',
            questions: 8,
            difficulty: 'Facile',
            link: '/orientation/test',
            benefits: [
                'Identification de votre profil académique',
                'Recommandations personnalisées',
                'Découverte de nouvelles filières',
                'Orientation vers votre passion'
            ]
        },
        {
            id: 'personality',
            title: 'Test de Personnalité MBTI',
            description: 'Comprenez votre type de personnalité selon le modèle MBTI et découvrez comment il influence vos choix d\'études et votre style d\'apprentissage.',
            icon: '🧠',
            color: '#5C2D6E',
            duration: '8-12 min',
            questions: 6,
            difficulty: 'Intermédiaire',
            link: '/test/personality',
            benefits: [
                'Compréhension de votre personnalité',
                'Style d\'apprentissage optimal',
                'Environnement de travail idéal',
                'Développement personnel'
            ]
        },
        {
            id: 'skills',
            title: 'Évaluation des Compétences',
            description: 'Identifiez vos forces actuelles et vos domaines d\'amélioration. Ce test évalue vos compétences techniques, sociales et cognitives.',
            icon: '⚡',
            color: '#10B981',
            duration: '12-18 min',
            questions: 10,
            difficulty: 'Intermédiaire',
            link: '/test/skills',
            benefits: [
                'Inventaire de vos compétences',
                'Plan de développement',
                'Identification des forces',
                'Objectifs d\'amélioration'
            ]
        },
        {
            id: 'career',
            title: 'Test d\'Orientation Professionnelle',
            description: 'Explorez les métiers qui correspondent à votre profil, vos aspirations et vos valeurs. Découvrez des carrières que vous n\'aviez jamais envisagées.',
            icon: '💼',
            color: '#F59E0B',
            duration: '15-20 min',
            questions: 12,
            difficulty: 'Avancé',
            link: '/test/career',
            benefits: [
                'Exploration de carrières',
                'Analyse des tendances du marché',
                'Plan de carrière personnalisé',
                'Conseils d\'experts'
            ]
        },
        {
            id: 'language',
            title: 'Test de Niveau Linguistique',
            description: 'Évaluez votre niveau en anglais, français et autres langues pour déterminer les programmes d\'études accessibles et les formations linguistiques nécessaires.',
            icon: '🌍',
            color: '#3B82F6',
            duration: '20-25 min',
            questions: 15,
            difficulty: 'Variable',
            link: '/test/language',
            benefits: [
                'Évaluation précise du niveau',
                'Recommandations de formation',
                'Préparation aux examens',
                'Certification de niveau'
            ]
        },
        {
            id: 'motivation',
            title: 'Test de Motivation et Objectifs',
            description: 'Analysez vos motivations profondes, vos objectifs de vie et vos valeurs pour choisir un parcours académique qui vous passionne vraiment.',
            icon: '🔥',
            color: '#EF4444',
            duration: '10-15 min',
            questions: 7,
            difficulty: 'Facile',
            link: '/test/motivation',
            benefits: [
                'Clarification de vos objectifs',
                'Identification de vos motivations',
                'Alignement valeurs-études',
                'Plan d\'action motivant'
            ]
        }
    ];

    const getDifficultyColor = (difficulty) => {
        const colors = {
            'Facile': '#10B981',
            'Intermédiaire': '#F59E0B',
            'Avancé': '#EF4444',
            'Variable': '#6B7280'
        };
        return colors[difficulty] || '#6B7280';
    };

    return (
        <GlobalLayout activePage="test-list">
            <div className="test-list-page">
            
            {/* HERO SECTION */}
            <section className="test-list-hero">
                <div className="hero-content">
                    <h1>Nos Tests et Évaluations</h1>
                    <p>Découvrez votre potentiel et trouvez votre voie grâce à nos tests spécialisés et scientifiquement validés</p>
                    <div className="hero-stats">
                        <div className="stat">
                            <span className="stat-number">{tests.length}</span>
                            <span className="stat-label">Tests Disponibles</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">95%</span>
                            <span className="stat-label">Précision</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number">15</span>
                            <span className="stat-label">Minutes Moyennes</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTS GRID */}
            <section className="tests-grid-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Choisissez votre Test</h2>
                        <p>Chaque test est conçu pour vous donner des insights précieux et des recommandations personnalisées</p>
                    </div>
                    
                    <div className="tests-grid">
                        {tests.map((test) => (
                            <div key={test.id} className="test-card" style={{ '--accent-color': test.color }}>
                                <div className="test-header">
                                    <div className="test-icon" style={{ backgroundColor: test.color }}>
                                        {test.icon}
                                    </div>
                                    <div className="test-meta">
                                        <span className="test-duration">{test.duration}</span>
                                        <span className="test-questions">{test.questions} questions</span>
                                        <span 
                                            className="test-difficulty"
                                            style={{ color: getDifficultyColor(test.difficulty) }}
                                        >
                                            {test.difficulty}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="test-content">
                                    <h3 className="test-title">{test.title}</h3>
                                    <p className="test-description">{test.description}</p>
                                    
                                    <div className="test-benefits">
                                        <h4>Ce que vous obtiendrez :</h4>
                                        <ul>
                                            {test.benefits.map((benefit, index) => (
                                                <li key={index}>{benefit}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                
                                <div className="test-footer">
                                    <Link to={test.link} className="test-button">
                                        Commencer le Test
                                    </Link>
                                    <div className="test-info">
                                        <span className="info-item">
                                            <span className="info-icon">⏱️</span>
                                            {test.duration}
                                        </span>
                                        <span className="info-item">
                                            <span className="info-icon">❓</span>
                                            {test.questions} questions
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="features-section">
                <div className="container">
                    <h2>Pourquoi Choisir nos Tests ?</h2>
                    <div className="features-grid">
                        <div className="feature-item">
                            <div className="feature-icon">🔬</div>
                            <h3>Scientifiquement Validés</h3>
                            <p>Nos tests sont basés sur des modèles psychométriques reconnus et validés par la communauté scientifique</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">⚡</div>
                            <h3>Rapides et Efficaces</h3>
                            <p>Complétez vos tests en moins de 25 minutes et obtenez des résultats instantanés et détaillés</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">🔒</div>
                            <h3>Confidentialité Totale</h3>
                            <p>Vos réponses restent privées et ne sont utilisées que pour votre analyse personnelle</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">📊</div>
                            <h3>Rapports Détaillés</h3>
                            <p>Recevez des analyses complètes avec des recommandations personnalisées et des plans d'action</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">🎯</div>
                            <h3>Recommandations Personnalisées</h3>
                            <p>Chaque test génère des suggestions adaptées à votre profil unique et vos objectifs</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">💡</div>
                            <h3>Conseils d'Experts</h3>
                            <p>Nos conseillers en orientation peuvent vous accompagner dans l'interprétation de vos résultats</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="test-list-cta">
                <div className="container">
                    <h2>Prêt à Découvrir votre Potentiel ?</h2>
                    <p>Commencez par le test d'orientation pour identifier votre profil académique et découvrir les filières qui vous correspondent</p>
                    <div className="cta-buttons">
                        <Link to="/orientation/test" className="cta-button primary">
                            Test d'Orientation
                        </Link>
                        <Link to="/test/welcome" className="cta-button secondary">
                            Voir Tous les Tests
                        </Link>
                    </div>
                </div>
            </section>
            </div>
        </GlobalLayout>
    );
}

