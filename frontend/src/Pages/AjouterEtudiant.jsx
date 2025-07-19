import React, { useState } from 'react';
import axios from '../services/axiosInstance';

const AjouterEtudiant = () => {
    const [etudiant, setEtudiant] = useState({
        nom: '',
        prenom: '',
        email: ''
    });

    const handleChange = e => {
        setEtudiant({ ...etudiant, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('/etudiants', etudiant)
            .then(() => alert("Étudiant ajouté avec succès !"))
            .catch(err => console.error(err));
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Ajouter un étudiant</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="nom" onChange={handleChange} placeholder="Nom" className="border p-2 w-full" />
                <input name="prenom" onChange={handleChange} placeholder="Prénom" className="border p-2 w-full" />
                <input name="email" onChange={handleChange} placeholder="Email" className="border p-2 w-full" />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2">Ajouter</button>
            </form>
        </div>
    );
};

export default AjouterEtudiant;
