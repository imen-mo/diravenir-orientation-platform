import React from "react";
import { Link } from "react-router-dom";
import "./welcome.css";
import logo from "../assets/diravenir-logo.png"; // adapte le chemin si besoin

const Welcome = () => {
    return (
        <div className="welcome-page">
            <nav className="navbar">
                <div className="navbar-left">
                    <img src={logo} alt="DirAvenir Logo" className="logo" />
                </div>
                <div className="navbar-right">
                    <Link to="/" className="nav-button">Accueil</Link>
                    <Link to="/login" className="nav-button">Connexion</Link>
                    <Link to="/register" className="nav-button">Inscription</Link>
                </div>
            </nav>

            <div className="welcome-content">
                <h1>Bienvenue sur DirAvenir</h1>
                <p>Une plateforme dédiée à l’orientation scolaire pour guider les élèves vers leur avenir.</p>
                <Link to="/test" className="start-button">Commencer le Test</Link>
            </div>
        </div>
    );
};

export default Welcome;
