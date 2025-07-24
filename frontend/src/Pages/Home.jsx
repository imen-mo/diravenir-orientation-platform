import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import logo from "../assets/diravenir-logo.png";


const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <header className="home-header">
                <img src={logo} alt="DirAvenir Logo" className="logo" />
                <h1>Bienvenue sur DirAvenir</h1>
                <p className="slogan">Votre avenir commence ici !</p>
            </header>

            <div className="hero-section" style={{ backgroundImage: `url(${headerImage})` }}>
                <div className="overlay">
                    <h2>Explorez nos services</h2>
                    <div className="button-group">
                        <button onClick={() => navigate("/filieres-postes")}>Filières & Postes</button>
                        <button onClick={() => navigate("/tests")}>Passer un Test</button>
                        <button onClick={() => navigate("/etudiants")}>Espace Étudiant</button>
                    </div>
                </div>
            </div>

            <footer className="footer">
                &copy; 2025 DirAvenir | Tous droits réservés
            </footer>
        </div>
    );
};

export default Home;
