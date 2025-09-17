package com.diravenir.service;

import com.diravenir.Entities.Candidature;
import com.diravenir.repository.CandidatureRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.criteria.Predicate;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CandidatureServiceImpl implements CandidatureService {

    private final CandidatureRepository candidatureRepository;

    @Override
    public Candidature saveCandidature(Candidature candidature) {
        log.info("💾 Sauvegarde de la candidature pour l'étudiant {}", 
                candidature.getEtudiant() != null ? candidature.getEtudiant().getId() : "N/A");
        
        if (candidature.getDateSoumission() == null) {
            candidature.setDateSoumission(LocalDate.now());
        }
        
        Candidature saved = candidatureRepository.save(candidature);
        log.info("✅ Candidature sauvegardée avec l'ID: {}", saved.getId());
        return saved;
    }

    @Override
    public List<Candidature> getAllCandidatures() {
        log.info("📋 Récupération de toutes les candidatures");
        List<Candidature> candidatures = candidatureRepository.findAll();
        log.info("✅ {} candidatures récupérées", candidatures.size());
        return candidatures;
    }

    @Override
    public Candidature getCandidatureById(Long id) {
        log.info("🔍 Récupération de la candidature ID: {}", id);
        Optional<Candidature> candidature = candidatureRepository.findById(id);
        
        if (candidature.isPresent()) {
            log.info("✅ Candidature trouvée: {}", id);
            return candidature.get();
        } else {
            log.warn("⚠️ Candidature non trouvée: {}", id);
            return null;
        }
    }

    @Override
    public Candidature updateCandidature(Long id, Candidature candidature) {
        log.info("🔄 Mise à jour de la candidature ID: {}", id);
        
        Optional<Candidature> existingOpt = candidatureRepository.findById(id);
        if (existingOpt.isPresent()) {
            Candidature existing = existingOpt.get();
            
            // Mise à jour des champs
            if (candidature.getStatut() != null) {
                existing.setStatut(candidature.getStatut());
            }
            if (candidature.getSuivi() != null) {
                existing.setSuivi(candidature.getSuivi());
            }
            
            Candidature updated = candidatureRepository.save(existing);
            log.info("✅ Candidature mise à jour: {}", id);
            return updated;
        } else {
            log.warn("⚠️ Candidature non trouvée pour mise à jour: {}", id);
            return null;
        }
    }

    @Override
    public boolean deleteCandidature(Long id) {
        log.info("🗑️ Suppression de la candidature ID: {}", id);
        
        if (candidatureRepository.existsById(id)) {
            candidatureRepository.deleteById(id);
            log.info("✅ Candidature supprimée: {}", id);
            return true;
        } else {
            log.warn("⚠️ Candidature non trouvée pour suppression: {}", id);
            return false;
        }
    }

    @Override
    public Page<Candidature> getCandidaturesWithFilters(Pageable pageable, String statut, String searchTerm) {
        log.info("🔍 Recherche de candidatures avec filtres - Statut: {}, Search: {}", statut, searchTerm);
        
        Specification<Candidature> spec = (root, query, criteriaBuilder) -> {
            Predicate predicate = criteriaBuilder.conjunction();
            
            // Filtre par statut
            if (statut != null && !statut.isEmpty()) {
                predicate = criteriaBuilder.and(predicate, 
                    criteriaBuilder.equal(root.get("statut"), statut));
            }
            
            // Filtre par terme de recherche
            if (searchTerm != null && !searchTerm.isEmpty()) {
                Predicate searchPredicate = criteriaBuilder.or(
                    // Recherche dans le nom/prénom de l'étudiant
                    criteriaBuilder.like(criteriaBuilder.lower(
                        criteriaBuilder.concat(
                            criteriaBuilder.concat(root.get("etudiant").get("prenom"), " "),
                            root.get("etudiant").get("nom")
                        )
                    ), "%" + searchTerm.toLowerCase() + "%"),
                    // Recherche dans l'email de l'étudiant
                    criteriaBuilder.like(criteriaBuilder.lower(
                        root.get("etudiant").get("email")
                    ), "%" + searchTerm.toLowerCase() + "%"),
                    // Recherche dans le nom du programme
                    criteriaBuilder.like(criteriaBuilder.lower(
                        root.get("programme").get("program")
                    ), "%" + searchTerm.toLowerCase() + "%")
                );
                predicate = criteriaBuilder.and(predicate, searchPredicate);
            }
            
            return predicate;
        };
        
        Page<Candidature> result = candidatureRepository.findAll(spec, pageable);
        log.info("✅ {} candidatures trouvées sur {} pages", result.getTotalElements(), result.getTotalPages());
        return result;
    }

    @Override
    public Map<String, Object> getCandidatureStats() {
        log.info("📊 Calcul des statistiques des candidatures");
        
        Map<String, Object> stats = new HashMap<>();
        
        // Total des candidatures
        long total = candidatureRepository.count();
        stats.put("total", total);
        
        // Candidatures par statut
        stats.put("en_attente", candidatureRepository.countByStatut("EN_ATTENTE"));
        stats.put("en_cours", candidatureRepository.countByStatut("EN_COURS"));
        stats.put("approuvees", candidatureRepository.countByStatut("APPROUVEE"));
        stats.put("rejetees", candidatureRepository.countByStatut("REJETEE"));
        
        log.info("✅ Statistiques calculées: {}", stats);
        return stats;
    }

    @Override
    public Candidature updateCandidatureStatut(Long id, String newStatut, String commentaire) {
        log.info("🔄 Mise à jour du statut de la candidature {} vers {}", id, newStatut);
        
        Optional<Candidature> candidatureOpt = candidatureRepository.findById(id);
        if (candidatureOpt.isPresent()) {
            Candidature candidature = candidatureOpt.get();
            candidature.setStatut(newStatut);
            
            if (commentaire != null && !commentaire.trim().isEmpty()) {
                candidature.setSuivi(commentaire);
            }
            
            Candidature updated = candidatureRepository.save(candidature);
            log.info("✅ Statut mis à jour pour la candidature {}", id);
            return updated;
        } else {
            log.warn("⚠️ Candidature non trouvée pour mise à jour du statut: {}", id);
            return null;
        }
    }

    @Override
    public int updateBatchCandidatureStatut(List<Long> ids, String newStatut, String commentaire) {
        log.info("🔄 Mise à jour en lot du statut pour {} candidatures vers {}", ids.size(), newStatut);
        
        int updatedCount = 0;
        for (Long id : ids) {
            Optional<Candidature> candidatureOpt = candidatureRepository.findById(id);
            if (candidatureOpt.isPresent()) {
                Candidature candidature = candidatureOpt.get();
                candidature.setStatut(newStatut);
                
                if (commentaire != null && !commentaire.trim().isEmpty()) {
                    candidature.setSuivi(commentaire);
                }
                
                candidatureRepository.save(candidature);
                updatedCount++;
            }
        }
        
        log.info("✅ {} candidatures mises à jour en lot", updatedCount);
        return updatedCount;
    }
}
