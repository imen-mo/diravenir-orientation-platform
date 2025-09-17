package com.diravenir.service;

import com.diravenir.Entities.Candidature;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface CandidatureService {

    /**
     * Sauvegarder une candidature
     */
    Candidature saveCandidature(Candidature candidature);

    /**
     * Récupérer toutes les candidatures
     */
    List<Candidature> getAllCandidatures();

    /**
     * Récupérer une candidature par ID
     */
    Candidature getCandidatureById(Long id);

    /**
     * Mettre à jour une candidature
     */
    Candidature updateCandidature(Long id, Candidature candidature);

    /**
     * Supprimer une candidature
     */
    boolean deleteCandidature(Long id);

    /**
     * Récupérer les candidatures avec filtres et pagination
     */
    Page<Candidature> getCandidaturesWithFilters(Pageable pageable, String statut, String searchTerm);

    /**
     * Récupérer les statistiques des candidatures
     */
    Map<String, Object> getCandidatureStats();

    /**
     * Mettre à jour le statut d'une candidature
     */
    Candidature updateCandidatureStatut(Long id, String newStatut, String commentaire);

    /**
     * Mise à jour en lot du statut des candidatures
     */
    int updateBatchCandidatureStatut(List<Long> ids, String newStatut, String commentaire);
}