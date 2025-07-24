import React from "react";
import "./UniversiteCard.css";

const UniversiteCard = ({ universite }) => {
    return (
        <div className="universite-card">
            <img src={universite.image} alt={universite.nom} className="universite-image" />
            <h3 className="universite-nom">{universite.nom}</h3>
            <p className="universite-description">{universite.description}</p>
        </div>
    );
};

export default UniversiteCard;
