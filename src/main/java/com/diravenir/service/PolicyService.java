package com.diravenir.service;

import com.diravenir.Entities.Policy;
import java.util.List;

/**
 * Interface pour le service de politique
 */
public interface PolicyService {
    
    /**
     * Créer une nouvelle politique
     */
    Policy createPolicy(Policy policy);
    
    /**
     * Obtenir toutes les politiques
     */
    List<Policy> getAllPolicies();
    
    /**
     * Obtenir une politique par ID
     */
    Policy getPolicyById(Long id);
    
    /**
     * Mettre à jour une politique
     */
    Policy updatePolicy(Long id, Policy policy);
    
    /**
     * Supprimer une politique
     */
    void deletePolicy(Long id);
}
