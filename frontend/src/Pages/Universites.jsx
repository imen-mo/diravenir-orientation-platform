{/* Icône de succès */}import React from "react";
import "./Universites.css";
import Footer from "../components/Footer";

const universites = [
    {
        nom: "Université Mohammed V - Rabat",
        description:
            "L'une des plus grandes universités publiques du Maroc, offrant un large éventail de filières.",
        image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Université_Mohammed_V_Rabat_1.jpg/320px-Université_Mohammed_V_Rabat_1.jpg",
    },
    {
        nom: "Université de Pékin - Chine",
        description:
            "Une université prestigieuse reconnue pour son excellence académique et sa recherche.",
        image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Peking_University_Library_2012-09-30.jpg/320px-Peking_University_Library_2012-09-30.jpg",
    },
    {
        nom: "Université Al Akhawayn - Ifrane",
        description:
            "Université marocaine de renom avec un système éducatif basé sur le modèle américain.",
        image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Akhawayn_university_campus_2.jpg/320px-Akhawayn_university_campus_2.jpg",
    },
    {
        nom: "Université Tsinghua - Chine",
        description:
            "Considérée comme la MIT chinoise, spécialisée en ingénierie et technologie.",
        image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Tsinghua_University_Main_Building_2014.jpg/320px-Tsinghua_University_Main_Building_2014.jpg",
    },
    {
        nom: "Université Hassan II - Casablanca",
        description:
            "Offre de nombreuses filières avec une forte ouverture internationale.",
        image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Université_Hassan_II_Casablanca.jpg/320px-Université_Hassan_II_Casablanca.jpg",
    },
];

const Universites = () => {
    return (
        <div className="universites-container">
            <h1 className="universites-title">Universités recommandées</h1>
            <div className="universites-list">
                {universites.map((uni, index) => (
                    <div className="universite-card" key={index}>
                        <img
                            src={uni.image}
                            alt={`Photo de ${uni.nom}`}
                            className="universite-image"
                        />
                        <h2 className="universite-nom">{uni.nom}</h2>
                        <p className="universite-description">{uni.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Universites;
