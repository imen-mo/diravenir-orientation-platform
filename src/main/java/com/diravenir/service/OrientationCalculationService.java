package com.diravenir.service;

import com.diravenir.dto.OrientationRequestDTO;
import com.diravenir.dto.OrientationResultDTO;
import com.diravenir.dto.MajorRecommendationDto;
import com.diravenir.Entities.OrientationMajor;
import com.diravenir.Entities.IdealProfile;

import java.util.List;
import java.util.Map;

/**
 * Interface pour le service de calcul d'orientation
 */
public interface OrientationCalculationService {
    
    /**
     * Calcule le profil complet de l'utilisateur basé sur ses réponses
     */
    Map<String, Integer> calculateUserProfile(OrientationRequestDTO request);
    
    /**
     * Calcule les recommandations de majeures avec scores de correspondance
     */
    List<MajorRecommendationDto> calculateRecommendations(
            Map<String, Integer> userProfile, 
            List<OrientationMajor> majors, 
            List<IdealProfile> idealProfiles);
    
    /**
     * Obtenir les recommandations avec profils idéaux
     */
    List<MajorRecommendationDto> getRecommendationsWithIdealProfiles(Map<String, Integer> userProfile);
    
    /**
     * Traitement complet d'orientation
     */
    OrientationResultDTO processCompleteOrientation(OrientationRequestDTO request);
}
