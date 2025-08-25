package com.dira.diravenir1.service;

import com.dira.diravenir1.dto.OrientationRequestDTO;
import com.dira.diravenir1.dto.OrientationResponseDTO;

import java.util.List;

public interface OrientationService {
    
    /**
     * Calcule l'orientation basée sur les réponses du test
     * @param request Les réponses du test d'orientation
     * @return Les résultats d'orientation avec recommandations
     */
    OrientationResponseDTO calculateOrientation(OrientationRequestDTO request);
    
    /**
     * Calcule l'orientation et envoie les résultats par email
     * @param request Les réponses du test d'orientation
     * @param userEmail L'email de l'utilisateur connecté
     * @param userName Le nom de l'utilisateur connecté
     * @return Les résultats d'orientation avec recommandations
     */
    OrientationResponseDTO calculateOrientationAndSendEmail(OrientationRequestDTO request, String userEmail, String userName);
    
    /**
     * Récupère toutes les majeures disponibles
     * @return Liste des noms des majeures
     */
    List<String> getAllMajors();
}
