{/* Icône de succès */}import React from "react";
import "./Etudiant.css";

const Etudiant = () => {
    return (
        <div className="etudiant-container">
            <div className="etudiant-header">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="Avatar"
                    className="etudiant-avatar"
                />
                <div>
                    <h1 className="etudiant-title">Profil Étudiant</h1>
                    <button className="modifier-btn">Modifier le profil</button>
                </div>
            </div>

            <form className="etudiant-form">
                <label>Nom complet :</label>
                <input type="text" placeholder="Entrez votre nom complet" />

                <label>Âge :</label>
                <input type="number" placeholder="Entrez votre âge" />

                <label>Niveau scolaire actuel :</label>
                <input type="text" placeholder="Entrez votre niveau scolaire" />

                <label>Établissement scolaire :</label>
                <input type="text" placeholder="Entrez votre établissement" />

                <label>Ville :</label>
                <input type="text" placeholder="Entrez votre ville" />

                <label>Note du baccalauréat :</label>
                <input type="text" placeholder="Entrez votre note de bac" />

                <div className="space-below"></div>

                <button type="submit" className="enregistrer-btn">Enregistrer</button>
            </form>
        </div>
    );
};

export default Etudiant;
