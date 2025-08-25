import React, { useState, useEffect } from 'react';
import { programService } from '../services/api';

const DebugProgramData = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const data = await programService.getAll();
        setPrograms(data);
        console.log('🔍 Données des programmes récupérées:', data);
      } catch (error) {
        console.error('❌ Erreur lors du chargement:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPrograms();
  }, []);

  if (loading) return <div>Chargement des données de debug...</div>;

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', margin: '20px', borderRadius: '8px' }}>
      <h3>🔍 Debug des Données des Programmes</h3>
      <p>Total des programmes: {programs.length}</p>
      
      {programs.slice(0, 5).map((program, index) => (
        <div key={index} style={{ 
          border: '1px solid #ddd', 
          padding: '15px', 
          margin: '10px 0', 
          borderRadius: '5px',
          backgroundColor: 'white'
        }}>
          <h4>Programme {index + 1}: {program.program}</h4>
          <p><strong>Catégorie:</strong> {program.category}</p>
          <p><strong>Program Image:</strong> {program.programImage || 'Aucune'}</p>
          <p><strong>Universite ID:</strong> {program.universiteId}</p>
          <p><strong>Universite Name:</strong> {program.universiteName}</p>
          
          {program.universite ? (
            <div style={{ backgroundColor: '#e8f5e8', padding: '10px', borderRadius: '5px' }}>
              <p><strong>✅ Objet Universite trouvé:</strong></p>
              <p><strong>ID:</strong> {program.universite.id}</p>
              <p><strong>Nom:</strong> {program.universite.nom}</p>
              <p><strong>Logo URL:</strong> {program.universite.logoUrl || 'Aucun logo'}</p>
            </div>
          ) : (
            <div style={{ backgroundColor: '#ffe8e8', padding: '10px', borderRadius: '5px' }}>
              <p><strong>❌ Objet Universite MANQUANT!</strong></p>
              <p>Le problème est que l'objet universite n'est pas récupéré par l'API</p>
            </div>
          )}
        </div>
      ))}
      
      <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '5px', marginTop: '20px' }}>
        <h4>📋 Instructions de Debug:</h4>
        <ol>
          <li>Vérifiez la console pour voir les données complètes</li>
          <li>Si l'objet universite est manquant, le problème est dans le backend</li>
          <li>Si l'objet universite est présent mais sans logo_url, le problème est dans la base de données</li>
        </ol>
      </div>
    </div>
  );
};

export default DebugProgramData;
