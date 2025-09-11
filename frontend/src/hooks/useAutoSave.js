import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook pour l'auto-save automatique toutes les 5 secondes
 * @param {Object} formData - Les données du formulaire
 * @param {Function} saveFunction - Fonction de sauvegarde
 * @param {number} interval - Intervalle en millisecondes (défaut: 5000ms)
 * @param {boolean} enabled - Activer/désactiver l'auto-save
 * @returns {Object} - État de l'auto-save
 */
const useAutoSave = (formData, saveFunction, interval = 5000, enabled = true) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [error, setError] = useState(null);
  
  const intervalRef = useRef(null);
  const lastDataRef = useRef(null);
  const saveTimeoutRef = useRef(null);

  // Fonction de sauvegarde avec gestion d'erreur
  const performSave = useCallback(async () => {
    if (!enabled || !formData || !saveFunction) return;

    try {
      setIsSaving(true);
      setError(null);
      
      const result = await saveFunction(formData);
      setLastSaved(new Date());
      setHasChanges(false);
      lastDataRef.current = JSON.stringify(formData);
      
      console.log('✅ Auto-save réussi:', new Date().toLocaleTimeString());
      return result;
      
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'auto-save');
      console.error('❌ Erreur auto-save:', err);
      throw err;
    } finally {
      setIsSaving(false);
    }
  }, [formData, saveFunction, enabled]);

  // Détecter les changements
  useEffect(() => {
    if (!enabled || !formData) return;

    const currentData = JSON.stringify(formData);
    const hasDataChanged = lastDataRef.current !== currentData;
    
    if (hasDataChanged) {
      setHasChanges(true);
      lastDataRef.current = currentData;
    }
  }, [formData, enabled]);

  // Auto-save toutes les 5 secondes si il y a des changements
  useEffect(() => {
    if (!enabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      if (hasChanges && !isSaving) {
        performSave();
      }
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, hasChanges, isSaving, interval, performSave]);

  // Auto-save sur blur (quand l'utilisateur quitte un champ)
  const handleBlur = useCallback(() => {
    if (enabled && hasChanges && !isSaving) {
      // Délai de 1 seconde après le blur pour éviter les sauvegardes trop fréquentes
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      
      saveTimeoutRef.current = setTimeout(() => {
        performSave();
      }, 1000);
    }
  }, [enabled, hasChanges, isSaving, performSave]);

  // Sauvegarde manuelle
  const saveNow = useCallback(async () => {
    if (enabled && hasChanges && !isSaving) {
      return await performSave();
    }
  }, [enabled, hasChanges, isSaving, performSave]);

  // Nettoyage au démontage
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return {
    isSaving,
    lastSaved,
    hasChanges,
    error,
    saveNow,
    handleBlur
  };
};

export default useAutoSave;
