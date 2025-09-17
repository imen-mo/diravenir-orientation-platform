import React, { useState, useEffect } from "react";
import GlobalLayout from "../components/GlobalLayout";
import "./Etudiant.css";

const Etudiant = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        nomComplet: '',
        age: '',
        niveauScolaire: '',
        etablissement: '',
        ville: '',
        noteBac: ''
    });

    useEffect(() => {
        // Charger les données utilisateur depuis localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            setFormData({
                nomComplet: `${user.prenom || user.firstName || ''} ${user.nom || user.lastName || ''}`.trim(),
                age: user.age || '',
                niveauScolaire: user.niveauScolaire || '',
                etablissement: user.etablissement || '',
                ville: user.ville || '',
                noteBac: user.noteBac || ''
            });
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        // Sauvegarder les données
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            const updatedUser = { ...user, ...formData };
            localStorage.setItem('user', JSON.stringify(updatedUser));
        }
        setIsEditing(false);
        alert('Profil mis à jour avec succès !');
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Recharger les données originales
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            setFormData({
                nomComplet: `${user.prenom || user.firstName || ''} ${user.nom || user.lastName || ''}`.trim(),
                age: user.age || '',
                niveauScolaire: user.niveauScolaire || '',
                etablissement: user.etablissement || '',
                ville: user.ville || '',
                noteBac: user.noteBac || ''
            });
        }
    };

    return (
        <GlobalLayout activePage="profile">
            <div className="etudiant-container">
            <div className="etudiant-header">
                <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="Avatar"
                    className="etudiant-avatar"
                />
                <div>
                    <h1 className="etudiant-title">Profil Étudiant {isEditing && <span className="editing-indicator">(Mode édition)</span>}</h1>
                    {!isEditing ? (
                        <button className="modifier-btn" onClick={handleEditClick}>Modifier le profil</button>
                    ) : (
                        <div className="edit-actions">
                            <button className="enregistrer-btn" onClick={handleSave}>Enregistrer</button>
                            <button className="annuler-btn" onClick={handleCancel}>Annuler</button>
                        </div>
                    )}
                </div>
            </div>

            <form className="etudiant-form">
                <label>Nom complet :</label>
                <input 
                    type="text" 
                    name="nomComplet"
                    value={formData.nomComplet}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Entrez votre nom complet" 
                />

                <label>Âge :</label>
                <input 
                    type="number" 
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Entrez votre âge" 
                />

                <label>Niveau scolaire actuel :</label>
                <input 
                    type="text" 
                    name="niveauScolaire"
                    value={formData.niveauScolaire}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Entrez votre niveau scolaire" 
                />

                <label>Établissement scolaire :</label>
                <input 
                    type="text" 
                    name="etablissement"
                    value={formData.etablissement}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Entrez votre établissement" 
                />

                <label>Ville :</label>
                <input 
                    type="text" 
                    name="ville"
                    value={formData.ville}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Entrez votre ville" 
                />

                <label>Note du baccalauréat :</label>
                <input 
                    type="text" 
                    name="noteBac"
                    value={formData.noteBac}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Entrez votre note de bac" 
                />

                <div className="space-below"></div>
            </form>
            </div>
        </GlobalLayout>
    );
};

export default Etudiant;
