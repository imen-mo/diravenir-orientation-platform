import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import logo from '../assets/logo.png';
import './Navbar.css';

const NAV_LINKS = [
    { to: '/', label: 'Home' },
    { to: '/orientation', label: 'Orientation' },
    { to: '/programs', label: 'Programs' },
    { to: '/about', label: 'About US' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contact', label: 'Contact US' },
];

export default function Navbar() {
    const { pathname } = useLocation();
    const { isAuthenticated, user, logout } = useAuth();
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const handleLogout = () => {
        logout();
        setShowProfileMenu(false);
    };

    return (
        <header className="navbar">
            <div className="navbar-inner">
                {/* Gauche : logo */}
                <div className="nav-left">
                    <Link to="/">
                        <img src={logo} alt="Diravenir" className="nav-logo" />
                    </Link>
                </div>

                {/* Centre : liens */}
                <nav className="nav-center">
                    {NAV_LINKS.map(({ to, label }) => (
                        <Link
                            key={to}
                            to={to}
                            className={`nav-link${pathname === to ? ' active' : ''}`}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* Droite : boutons ou profil */}
                <div className="nav-right">
                    {isAuthenticated ? (
                        <div className="profile-section">
                            {/* Photo de profil */}
                            <div className="profile-photo">
                                {user?.photoUrl ? (
                                    <img 
                                        src={user.photoUrl} 
                                        alt="Profile" 
                                        className="profile-image"
                                    />
                                ) : (
                                    <div className="profile-avatar">
                                        {user?.prenom?.charAt(0) || user?.email?.charAt(0) || 'U'}
                                    </div>
                                )}
                            </div>

                            {/* Menu déroulant */}
                            <div className="profile-menu-container">
                                <button 
                                    className="profile-menu-button"
                                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                                >
                                    <span className="profile-name">
                                        {user?.prenom || user?.email || 'Utilisateur'}
                                    </span>
                                    <svg 
                                        className={`profile-arrow ${showProfileMenu ? 'rotated' : ''}`}
                                        width="12" 
                                        height="12" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M7 10l5 5 5-5z" fill="currentColor"/>
                                    </svg>
                                </button>

                                {showProfileMenu && (
                                    <div className="profile-dropdown">
                                        <div className="profile-info">
                                            <div className="profile-full-name">
                                                {user?.prenom} {user?.nom}
                                            </div>
                                            <div className="profile-email">
                                                {user?.email}
                                            </div>
                                        </div>
                                        
                                        <div className="profile-menu-items">
                                            <Link 
                                                to="/profile" 
                                                className="profile-menu-item"
                                                onClick={() => setShowProfileMenu(false)}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                                    <circle cx="12" cy="7" r="4"/>
                                                </svg>
                                                Mon Profil
                                            </Link>
                                            
                                            <Link 
                                                to="/settings" 
                                                className="profile-menu-item"
                                                onClick={() => setShowProfileMenu(false)}
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <circle cx="12" cy="12" r="3"/>
                                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                                                </svg>
                                                Paramètres
                                            </Link>
                                            
                                            <div className="profile-menu-divider"></div>
                                            
                                            <button 
                                                onClick={handleLogout}
                                                className="profile-menu-item logout-item"
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                                                    <polyline points="16,17 21,12 16,7"/>
                                                    <line x1="21" y1="12" x2="9" y2="12"/>
                                                </svg>
                                                Se déconnecter
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <>
                            <Link to="/signin" className="btn-outline">
                                Log In
                            </Link>
                            <Link to="/signup" className="btn-solid">
                                Create Account
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Overlay pour fermer le menu */}
            {showProfileMenu && (
                <div 
                    className="profile-overlay"
                    onClick={() => setShowProfileMenu(false)}
                />
            )}
        </header>
    );
}
