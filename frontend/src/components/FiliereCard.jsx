import React from "react";
import "./FiliereCard.css"; // Tu peux ajouter un fichier CSS pour styliser la carte

const FiliereCard = ({ filiere }) => {
    return (
        <div className="filiere-card">
            <img src={filiere.image} alt={filiere.nom} className="filiere-image" />
            <h3 className="filiere-nom">{filiere.nom}</h3>
            <p className="filiere-description">{filiere.description}</p>
        </div>
    );
};

export default FiliereCard;
