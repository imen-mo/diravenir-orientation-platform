package com.diravenir.controller;

import com.diravenir.Entities.Candidature;
import com.diravenir.service.CandidatureService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/candidatures")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class AdminCandidatureController {

    private final CandidatureService candidatureService;

    /**
     * Récupérer toutes les candidatures avec pagination et filtres
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllCandidatures(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String statut,
            @RequestParam(required = false) String searchTerm,
            @RequestParam(defaultValue = "dateSoumission") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        
        try {
            log.info("🔍 Récupération des candidatures - Page: {}, Size: {}, Statut: {}, Search: {}", 
                    page, size, statut, searchTerm);
            
            Sort.Direction direction = sortDir.equalsIgnoreCase("desc") ? 
                Sort.Direction.DESC : Sort.Direction.ASC;
            Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
            
            Page<Candidature> candidaturePage = candidatureService.getCandidaturesWithFilters(
                pageable, statut, searchTerm);
            
            Map<String, Object> response = new HashMap<>();
            response.put("candidatures", candidaturePage.getContent());
            response.put("totalPages", candidaturePage.getTotalPages());
            response.put("totalItems", candidaturePage.getTotalElements());
            response.put("currentPage", page);
            response.put("pageSize", size);
            
            log.info("✅ {} candidatures récupérées", candidaturePage.getTotalElements());
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des candidatures: {}", e.getMessage());
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Erreur lors de la récupération des candidatures"));
        }
    }

    /**
     * Récupérer les statistiques des candidatures
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getCandidatureStats() {
        try {
            log.info("📊 Récupération des statistiques des candidatures");
            
            Map<String, Object> stats = candidatureService.getCandidatureStats();
            
            log.info("✅ Statistiques récupérées: {}", stats);
            return ResponseEntity.ok(Map.of("stats", stats));
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des statistiques: {}", e.getMessage());
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Erreur lors de la récupération des statistiques"));
        }
    }

    /**
     * Récupérer une candidature par ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Candidature> getCandidatureById(@PathVariable Long id) {
        try {
            log.info("🔍 Récupération de la candidature ID: {}", id);
            
            Candidature candidature = candidatureService.getCandidatureById(id);
            
            if (candidature != null) {
                log.info("✅ Candidature trouvée: {}", candidature.getId());
                return ResponseEntity.ok(candidature);
            } else {
                log.warn("⚠️ Candidature non trouvée: {}", id);
                return ResponseEntity.notFound().build();
            }
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération de la candidature {}: {}", id, e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Mettre à jour le statut d'une candidature
     */
    @PutMapping("/{id}/statut")
    public ResponseEntity<Map<String, Object>> updateCandidatureStatut(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        
        try {
            log.info("🔄 Mise à jour du statut de la candidature {}: {}", id, request.get("statut"));
            
            String newStatut = request.get("statut");
            String commentaire = request.get("commentaire");
            
            Candidature updated = candidatureService.updateCandidatureStatut(id, newStatut, commentaire);
            
            if (updated != null) {
                log.info("✅ Statut mis à jour pour la candidature {}", id);
                return ResponseEntity.ok(Map.of(
                    "message", "Statut mis à jour avec succès",
                    "candidature", updated
                ));
            } else {
                log.warn("⚠️ Candidature non trouvée pour mise à jour: {}", id);
                return ResponseEntity.notFound().build();
            }
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la mise à jour du statut {}: {}", id, e.getMessage());
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Erreur lors de la mise à jour du statut"));
        }
    }

    /**
     * Mise à jour en lot du statut des candidatures
     */
    @PutMapping("/batch-statut")
    public ResponseEntity<Map<String, Object>> updateBatchCandidatureStatut(
            @RequestBody Map<String, Object> request) {
        
        try {
            @SuppressWarnings("unchecked")
            List<Long> ids = (List<Long>) request.get("ids");
            String newStatut = (String) request.get("statut");
            String commentaire = (String) request.get("commentaire");
            
            log.info("🔄 Mise à jour en lot du statut pour {} candidatures: {}", ids.size(), newStatut);
            
            int updatedCount = candidatureService.updateBatchCandidatureStatut(ids, newStatut, commentaire);
            
            log.info("✅ {} candidatures mises à jour", updatedCount);
            return ResponseEntity.ok(Map.of(
                "message", updatedCount + " candidatures mises à jour avec succès",
                "updatedCount", updatedCount
            ));
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la mise à jour en lot: {}", e.getMessage());
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Erreur lors de la mise à jour en lot"));
        }
    }

    /**
     * Supprimer une candidature
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteCandidature(@PathVariable Long id) {
        try {
            log.info("🗑️ Suppression de la candidature {}", id);
            
            boolean deleted = candidatureService.deleteCandidature(id);
            
            if (deleted) {
                log.info("✅ Candidature supprimée: {}", id);
                return ResponseEntity.ok(Map.of("message", "Candidature supprimée avec succès"));
            } else {
                log.warn("⚠️ Candidature non trouvée pour suppression: {}", id);
                return ResponseEntity.status(404)
                    .body(Map.of("error", "Candidature non trouvée"));
            }
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la suppression de la candidature {}: {}", id, e.getMessage());
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Erreur lors de la suppression"));
        }
    }
}