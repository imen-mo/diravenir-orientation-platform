import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

/**
 * Hook personnalisé pour gérer les programmes sauvegardés
 * Gère automatiquement la persistance et la récupération des données
 */
export const useSavedPrograms = () => {
    const { user, addSavedProgram, removeSavedProgram, getUserData } = useAuth();
    const [savedPrograms, setSavedPrograms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Charger les programmes sauvegardés au montage et quand l'utilisateur change
    useEffect(() => {
        if (user?.id) {
            loadSavedPrograms();
        } else {
            setSavedPrograms([]);
        }
    }, [user?.id]);

    const loadSavedPrograms = useCallback(() => {
        try {
            setLoading(true);
            setError(null);
            
            const programs = getUserData('programs') || [];
            setSavedPrograms(programs);
            console.log('📂 Programmes sauvegardés chargés:', programs.length);
        } catch (err) {
            console.error('❌ Erreur lors du chargement des programmes sauvegardés:', err);
            setError('Erreur lors du chargement des programmes sauvegardés');
        } finally {
            setLoading(false);
        }
    }, [getUserData]);

    const saveProgram = useCallback(async (program) => {
        try {
            setLoading(true);
            setError(null);
            
            const success = addSavedProgram(program);
            if (success) {
                // Recharger la liste pour avoir les données à jour
                loadSavedPrograms();
                console.log('✅ Programme sauvegardé:', program.nom);
                return true;
            } else {
                setError('Impossible de sauvegarder le programme');
                return false;
            }
        } catch (err) {
            console.error('❌ Erreur lors de la sauvegarde du programme:', err);
            setError('Erreur lors de la sauvegarde du programme');
            return false;
        } finally {
            setLoading(false);
        }
    }, [addSavedProgram, loadSavedPrograms]);

    const unsaveProgram = useCallback(async (programId) => {
        try {
            setLoading(true);
            setError(null);
            
            const success = removeSavedProgram(programId);
            if (success) {
                // Recharger la liste pour avoir les données à jour
                loadSavedPrograms();
                console.log('🗑️ Programme supprimé des sauvegardés:', programId);
                return true;
            } else {
                setError('Impossible de supprimer le programme');
                return false;
            }
        } catch (err) {
            console.error('❌ Erreur lors de la suppression du programme:', err);
            setError('Erreur lors de la suppression du programme');
            return false;
        } finally {
            setLoading(false);
        }
    }, [removeSavedProgram, loadSavedPrograms]);

    const isProgramSaved = useCallback((programId) => {
        return savedPrograms.some(program => program.id === programId);
    }, [savedPrograms]);

    const toggleSaveProgram = useCallback(async (program) => {
        if (isProgramSaved(program.id)) {
            return await unsaveProgram(program.id);
        } else {
            return await saveProgram(program);
        }
    }, [isProgramSaved, saveProgram, unsaveProgram]);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        savedPrograms,
        loading,
        error,
        saveProgram,
        unsaveProgram,
        toggleSaveProgram,
        isProgramSaved,
        loadSavedPrograms,
        clearError
    };
};

export default useSavedPrograms;
