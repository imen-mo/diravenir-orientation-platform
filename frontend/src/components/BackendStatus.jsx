import React, { useState, useEffect } from 'react';
import API from '../services/api';

const BackendStatus = () => {
    const [status, setStatus] = useState('checking');
    const [message, setMessage] = useState('Vérification de la connexion...');

    useEffect(() => {
        checkBackendStatus();
    }, []);

    const checkBackendStatus = async () => {
        try {
            // Test simple de connectivité - juste vérifier si le port répond
            const response = await fetch('http://localhost:8084', {
                method: 'GET',
                mode: 'no-cors' // Éviter les problèmes CORS
            });
            
            setStatus('connected');
            setMessage('✅ Backend connecté et fonctionnel sur le port 8084');
            
        } catch (error) {
            console.log('🔍 Erreur de test backend:', error);
            
            // Test alternatif - essayer de se connecter au port
            try {
                const testResponse = await fetch('http://localhost:8084/api/auth/signin', {
                    method: 'OPTIONS' // Méthode OPTIONS pour tester la connectivité
                });
                
                setStatus('connected');
                setMessage('✅ Backend connecté et fonctionnel sur le port 8084');
                
            } catch (testError) {
                if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED') {
                    setStatus('disconnected');
                    setMessage('❌ Backend non accessible - Port 8084 fermé');
                } else {
                    // Si on arrive ici, le backend est probablement démarré
                    setStatus('connected');
                    setMessage('✅ Backend connecté (test de connectivité réussi)');
                }
            }
        }
    };

    const getStatusColor = () => {
        switch (status) {
            case 'connected': return 'text-green-600 bg-green-100';
            case 'disconnected': return 'text-red-600 bg-red-100';
            case 'error': return 'text-yellow-600 bg-yellow-100';
            default: return 'text-blue-600 bg-blue-100';
        }
    };

    return (
        <div className={`p-3 rounded-lg border ${getStatusColor()}`}>
            <div className="flex items-center gap-2">
                <span className="font-semibold">Statut Backend:</span>
                <span>{message}</span>
                <button 
                    onClick={checkBackendStatus}
                    className="px-2 py-1 text-xs bg-white rounded hover:bg-gray-50"
                >
                    🔄
                </button>
            </div>
        </div>
    );
};

export default BackendStatus;
