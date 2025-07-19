import React, { useEffect, useState } from 'react';
import axios from '../services/axiosInstance';

const ListeEtudiants = () => {
    const [etudiants, setEtudiants] = useState([]);

    useEffect(() => {
        axios.get('/etudiants')
            .then(res => setEtudiants(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Liste des étudiants</h1>
            <table className="w-full table-auto border">
                <thead>
                <tr className="bg-gray-200">
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {etudiants.map(etudiant => (
                    <tr key={etudiant.id}>
                        <td>{etudiant.nom}</td>
                        <td>{etudiant.prenom}</td>
                        <td>{etudiant.email}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListeEtudiants;
