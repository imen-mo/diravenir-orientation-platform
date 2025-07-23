import React from "react";
import "./Filiere.css";

const filieres = [
    {
        id: 1,
        nom: "Informatique",
        description:
            "Découvrez les carrières passionnantes en programmation, réseaux, cybersécurité, et plus.",
    },
    {
        id: 2,
        nom: "Médecine",
        description:
            "Formez-vous pour devenir un professionnel de santé, médecin, pharmacien ou infirmier.",
    },
    {
        id: 3,
        nom: "Droit",
        description:
            "Explorez le monde juridique et préparez-vous aux carrières d’avocat, notaire, ou juge.",
    },
    {
        id: 4,
        nom: "Gestion et Commerce",
        description:
            "Apprenez les fondamentaux du management, marketing, finance et entrepreneuriat.",
    },
    {
        id: 5,
        nom: "Architecture",
        description:
            "Développez votre créativité pour concevoir des bâtiments innovants et durables.",
    },
];

const Filiere = () => {
    return (
        <div className="filiere-container">
            <h1 className="filiere-title">Choisissez votre filière</h1>
            <p className="filiere-intro">
                Découvrez nos filières proposées pour vous orienter vers votre avenir.
            </p>

            <div className="filiere-list">
                {filieres.map((filiere) => (
                    <div key={filiere.id} className="filiere-card">
                        <h2>{filiere.nom}</h2>
                        <p>{filiere.description}</p>
                        <button className="btn-choisir">Choisir cette filière</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Filiere;
