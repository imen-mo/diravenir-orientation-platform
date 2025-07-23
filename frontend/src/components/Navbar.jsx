import React from "react";
import logo from "../assets/diravenir-logo.png";
import "./Navbar.css";

function Navbar() {
    return (
        <div className="navbar">
            <img src={logo} alt="Logo DirAvenir" className="logo" />
            <div className="nav-buttons">
                <a href="#">Accueil</a>
                <a href="#">Connexion</a>
                <a href="#">Inscription</a>
            </div>
        </div>
    );
}

export default Navbar;
