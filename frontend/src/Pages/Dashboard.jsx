import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import GlobalLayout from '../components/GlobalLayout';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        const result = await logout();
        if (result.success) {
            navigate('/login');
        }
    };

    const handleStartTest = () => {
        navigate('/orientation-test');
    };

    const handleViewResults = () => {
        navigate('/results');
    };

  return (
        <GlobalLayout activePage="dashboard">
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
                {/* Particules magiques en arrière-plan */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-10 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    <div className="absolute top-20 right-20 w-3 h-3 bg-orange-400 rounded-full animate-ping"></div>
                    <div className="absolute bottom-20 left-20 w-2 h-2 bg-yellow-300 rounded-full animate-bounce"></div>
                    <div className="absolute bottom-10 right-10 w-3 h-3 bg-orange-300 rounded-full animate-pulse"></div>
                </div>

            {/* Navigation */}
            <nav className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <h1 className="text-2xl font-bold text-white">
                                    🚀 <span className="text-yellow-400">Diravenir</span>
                                </h1>
                            </div>
                        </div>

                        {/* Navigation Desktop */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link
                                    to="/dashboard"
                                    className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    🏠 Tableau de bord
                                </Link>
                                <Link
                                    to="/orientation-test"
                                    className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    🧪 Test d'orientation
                                </Link>
                                <Link
                                    to="/results"
                                    className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    📊 Mes résultats
                                </Link>
                            </div>
                        </div>

                        {/* Menu utilisateur */}
                        <div className="relative">
                            <div className="flex items-center space-x-4">
                                {/* Notifications */}
                                <button className="text-white hover:text-yellow-300 p-2 rounded-full transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </button>

                                {/* Menu utilisateur */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                                        className="flex items-center text-white hover:text-yellow-300 transition-colors"
                                    >
                                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-2">
                                            <span className="text-white font-semibold text-sm">
                                                {user?.name?.charAt(0) || 'U'}
                                            </span>
                                        </div>
                                        <span className="hidden md:block">{user?.name || 'Utilisateur'}</span>
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {/* Dropdown menu */}
                                    {isMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                            <div className="px-4 py-2 text-sm text-gray-700 border-b">
                                                <p className="font-medium">{user?.name}</p>
                                                <p className="text-gray-500">{user?.email}</p>
                                            </div>
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                👤 Mon profil
                                            </Link>
                                            <Link
                                                to="/settings"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                ⚙️ Paramètres
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                🔓 Déconnexion
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Menu mobile */}
                                <div className="md:hidden">
                                    <button
                                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                                        className="text-white hover:text-yellow-300 p-2 rounded-md transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
        </div>
        
                    {/* Menu mobile */}
                    {isMenuOpen && (
                        <div className="md:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                <Link
                                    to="/dashboard"
                                    className="text-white hover:text-yellow-300 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                                >
                                    🏠 Tableau de bord
                                </Link>
                                <Link
                                    to="/orientation-test"
                                    className="text-white hover:text-yellow-300 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                                >
                                    🧪 Test d'orientation
                                </Link>
                                <Link
                                    to="/results"
                                    className="text-white hover:text-yellow-300 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                                >
                                    📊 Mes résultats
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Contenu principal */}
            <main className="relative z-10 max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* En-tête du dashboard */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Bonjour, <span className="text-yellow-400">{user?.name || 'Étudiant'} !</span>
                    </h1>
                    <p className="text-xl text-purple-100">
                        Bienvenue sur votre tableau de bord Diravenir
                    </p>
          </div>
          
                {/* Cartes principales */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {/* Carte Test d'Orientation */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-400 mb-4">
                                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">🧪 Test d'Orientation</h3>
                            <p className="text-purple-100 mb-4">
                                Découvrez votre profil et recevez des recommandations personnalisées
                            </p>
                            <button
                                onClick={handleStartTest}
                                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
                            >
                                Commencer le test
                            </button>
                        </div>
            </div>
            
                    {/* Carte Résultats */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-400 mb-4">
                                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">📊 Mes Résultats</h3>
                            <p className="text-purple-100 mb-4">
                                Consultez vos résultats d'orientation et vos recommandations
                            </p>
                            <button
                                onClick={handleViewResults}
                                className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
                            >
                                Voir mes résultats
                            </button>
                        </div>
            </div>
            
                    {/* Carte Profil */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-purple-400 mb-4">
                                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">👤 Mon Profil</h3>
                            <p className="text-purple-100 mb-4">
                                Gérez vos informations personnelles et vos préférences
                            </p>
                            <Link
                                to="/profile"
                                className="w-full inline-block bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
                            >
                                Gérer mon profil
                            </Link>
                        </div>
                    </div>
            </div>
            
                {/* Section Statistiques */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">📈 Statistiques de votre parcours</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-yellow-400 mb-2">0</div>
                            <div className="text-purple-100">Tests complétés</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-400 mb-2">0</div>
                            <div className="text-purple-100">Programmes recommandés</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-400 mb-2">0</div>
                            <div className="text-purple-100">Universités explorées</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-400 mb-2">0</div>
                            <div className="text-purple-100">Favoris sauvegardés</div>
            </div>
          </div>
        </div>

                {/* Section Actions rapides */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">⚡ Actions rapides</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <button className="bg-white/20 hover:bg-white/30 text-white p-4 rounded-lg transition-all duration-200 transform hover:scale-105">
                            <div className="text-center">
                                <div className="text-2xl mb-2">🔍</div>
                                <div className="font-medium">Rechercher des programmes</div>
                            </div>
                        </button>
                        <button className="bg-white/20 hover:bg-white/30 text-white p-4 rounded-lg transition-all duration-200 transform hover:scale-105">
                            <div className="text-center">
                                <div className="text-2xl mb-2">📚</div>
                                <div className="font-medium">Consulter le guide</div>
                            </div>
                        </button>
                        <button className="bg-white/20 hover:bg-white/30 text-white p-4 rounded-lg transition-all duration-200 transform hover:scale-105">
                            <div className="text-center">
                                <div className="text-2xl mb-2">💬</div>
                                <div className="font-medium">Contacter un conseiller</div>
                            </div>
                        </button>
                        <button className="bg-white/20 hover:bg-white/30 text-white p-4 rounded-lg transition-all duration-200 transform hover:scale-105">
                            <div className="text-center">
                                <div className="text-2xl mb-2">⭐</div>
                                <div className="font-medium">Évaluer Diravenir</div>
                            </div>
                        </button>
                    </div>
                </div>
      </main>

            {/* Footer */}
            <footer className="relative z-10 bg-white/10 backdrop-blur-md border-t border-white/20 mt-16">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-purple-100">
                        <p>&copy; 2024 Diravenir. Tous droits réservés.</p>
                    </div>
                </div>
            </footer>
            </div>
        </GlobalLayout>
  );
};

export default Dashboard;
