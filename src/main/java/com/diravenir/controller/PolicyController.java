package com.diravenir.controller;

import com.diravenir.Entities.Policy;
import com.diravenir.service.PolicyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/policies")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class PolicyController {
    
    private final PolicyService policyService;
    
    /**
     * Récupérer une politique par type
     */
    @GetMapping("/{policyType}")
    public ResponseEntity<Map<String, Object>> getPolicyByType(@PathVariable String policyType) {
        try {
            Policy.PolicyType type;
            try {
                type = Policy.PolicyType.valueOf(policyType.toUpperCase());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", "Type de politique invalide"));
            }
            
            log.info("Récupération de la politique: {}", type.getDisplayName());
            
            var policyOpt = policyService.getPolicyByType(type);
            if (policyOpt.isPresent()) {
                Policy policy = policyOpt.get();
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "policy", Map.of(
                        "id", policy.getId(),
                        "type", policy.getPolicyType().name(),
                        "title", policy.getTitle(),
                        "content", policy.getContent(),
                        "version", policy.getVersion(),
                        "lastUpdated", policy.getUpdatedAt()
                    )
                ));
            } else {
                return ResponseEntity.notFound().build();
            }
            
        } catch (Exception e) {
            log.error("Erreur lors de la récupération de la politique: {}", e.getMessage());
            return ResponseEntity.internalServerError()
                .body(Map.of("success", false, "message", "Erreur interne du serveur"));
        }
    }
    
    /**
     * Récupérer toutes les politiques actives
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllPolicies() {
        try {
            log.info("Récupération de toutes les politiques actives");
            
            List<Policy> policies = policyService.getAllActivePolicies();
            
            var policiesList = policies.stream()
                .map(policy -> Map.of(
                    "id", policy.getId(),
                    "type", policy.getPolicyType().name(),
                    "title", policy.getTitle(),
                    "shortContent", policy.getShortContent(),
                    "version", policy.getVersion(),
                    "requiresConsent", policy.getRequiresConsent(),
                    "lastUpdated", policy.getUpdatedAt()
                ))
                .toList();
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "policies", policiesList,
                "count", policies.size()
            ));
            
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des politiques: {}", e.getMessage());
            return ResponseEntity.internalServerError()
                .body(Map.of("success", false, "message", "Erreur interne du serveur"));
        }
    }
    
    /**
     * Récupérer les politiques nécessitant un consentement
     */
    @GetMapping("/consent-required")
    public ResponseEntity<Map<String, Object>> getPoliciesRequiringConsent() {
        try {
            log.info("Récupération des politiques nécessitant un consentement");
            
            List<Policy> policies = policyService.getPoliciesRequiringConsent();
            
            var policiesList = policies.stream()
                .map(policy -> Map.of(
                    "id", policy.getId(),
                    "type", policy.getPolicyType().name(),
                    "title", policy.getTitle(),
                    "shortContent", policy.getShortContent(),
                    "version", policy.getVersion(),
                    "lastUpdated", policy.getUpdatedAt()
                ))
                .toList();
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "policies", policiesList,
                "count", policies.size()
            ));
            
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des politiques de consentement: {}", e.getMessage());
            return ResponseEntity.internalServerError()
                .body(Map.of("success", false, "message", "Erreur interne du serveur"));
        }
    }
    
    /**
     * Rechercher des politiques par mots-clés
     */
    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchPolicies(@RequestParam(required = false) String keyword) {
        try {
            log.info("Recherche de politiques avec le mot-clé: {}", keyword);
            
            List<Policy> policies = policyService.searchPolicies(keyword);
            
            var policiesList = policies.stream()
                .map(policy -> Map.of(
                    "id", policy.getId(),
                    "type", policy.getPolicyType().name(),
                    "title", policy.getTitle(),
                    "shortContent", policy.getShortContent(),
                    "version", policy.getVersion(),
                    "lastUpdated", policy.getUpdatedAt()
                ))
                .toList();
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "policies", policiesList,
                "count", policies.size(),
                "keyword", keyword != null ? keyword : ""
            ));
            
        } catch (Exception e) {
            log.error("Erreur lors de la recherche de politiques: {}", e.getMessage());
            return ResponseEntity.internalServerError()
                .body(Map.of("success", false, "message", "Erreur interne du serveur"));
        }
    }
    
    /**
     * Récupérer les politiques mises à jour récemment
     */
    @GetMapping("/recent")
    public ResponseEntity<Map<String, Object>> getRecentPolicies(@RequestParam(defaultValue = "24") int hours) {
        try {
            log.info("Récupération des politiques mises à jour depuis {} heures", hours);
            
            List<Policy> policies = policyService.getRecentlyUpdatedPolicies(hours);
            
            var policiesList = policies.stream()
                .map(policy -> Map.of(
                    "id", policy.getId(),
                    "type", policy.getPolicyType().name(),
                    "title", policy.getTitle(),
                    "shortContent", policy.getShortContent(),
                    "version", policy.getVersion(),
                    "lastUpdated", policy.getUpdatedAt(),
                    "lastUpdatedBy", policy.getLastUpdatedBy()
                ))
                .toList();
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "policies", policiesList,
                "count", policies.size(),
                "hours", hours
            ));
            
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des politiques récentes: {}", e.getMessage());
            return ResponseEntity.internalServerError()
                .body(Map.of("success", false, "message", "Erreur interne du serveur"));
        }
    }
    
    /**
     * Compter les politiques actives
     */
    @GetMapping("/count")
    public ResponseEntity<Map<String, Object>> countPolicies() {
        try {
            Long count = policyService.countActivePolicies();
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "count", count
            ));
            
        } catch (Exception e) {
            log.error("Erreur lors du comptage des politiques: {}", e.getMessage());
            return ResponseEntity.internalServerError()
                .body(Map.of("success", false, "message", "Erreur interne du serveur"));
        }
    }
    
    // ===== ENDPOINTS ADMIN (à protéger avec des rôles appropriés) =====
    
    /**
     * Créer une nouvelle politique (Admin)
     */
    @PostMapping
    public ResponseEntity<Map<String, Object>> createPolicy(@RequestBody Policy policy, 
                                                          @RequestParam String createdBy) {
        try {
            log.info("Création d'une nouvelle politique par: {}", createdBy);
            
            var createdPolicyOpt = policyService.createPolicy(policy, createdBy);
            if (createdPolicyOpt.isPresent()) {
                Policy createdPolicy = createdPolicyOpt.get();
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Politique créée avec succès",
                    "policy", Map.of(
                        "id", createdPolicy.getId(),
                        "type", createdPolicy.getPolicyType().name(),
                        "title", createdPolicy.getTitle(),
                        "version", createdPolicy.getVersion()
                    )
                ));
            } else {
                return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", "Impossible de créer la politique"));
            }
            
        } catch (Exception e) {
            log.error("Erreur lors de la création de la politique: {}", e.getMessage());
            return ResponseEntity.internalServerError()
                .body(Map.of("success", false, "message", "Erreur interne du serveur"));
        }
    }
    
    /**
     * Mettre à jour une politique existante (Admin)
     */
    @PutMapping("/{policyId}")
    public ResponseEntity<Map<String, Object>> updatePolicy(@PathVariable Long policyId,
                                                          @RequestBody Policy updatedPolicy,
                                                          @RequestParam String updatedBy) {
        try {
            log.info("Mise à jour de la politique {} par: {}", policyId, updatedBy);
            
            var updatedPolicyOpt = policyService.updatePolicy(policyId, updatedPolicy, updatedBy);
            if (updatedPolicyOpt.isPresent()) {
                Policy policy = updatedPolicyOpt.get();
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Politique mise à jour avec succès",
                    "policy", Map.of(
                        "id", policy.getId(),
                        "type", policy.getPolicyType().name(),
                        "title", policy.getTitle(),
                        "version", policy.getVersion(),
                        "lastUpdated", policy.getUpdatedAt()
                    )
                ));
            } else {
                return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", "Impossible de mettre à jour la politique"));
            }
            
        } catch (Exception e) {
            log.error("Erreur lors de la mise à jour de la politique: {}", e.getMessage());
            return ResponseEntity.internalServerError()
                .body(Map.of("success", false, "message", "Erreur interne du serveur"));
        }
    }
    
    /**
     * Désactiver une politique (Admin)
     */
    @DeleteMapping("/{policyId}")
    public ResponseEntity<Map<String, Object>> deactivatePolicy(@PathVariable Long policyId,
                                                              @RequestParam String deactivatedBy) {
        try {
            log.info("Désactivation de la politique {} par: {}", policyId, deactivatedBy);
            
            boolean deactivated = policyService.deactivatePolicy(policyId, deactivatedBy);
            
            if (deactivated) {
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Politique désactivée avec succès"
                ));
            } else {
                return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", "Impossible de désactiver la politique"));
            }
            
        } catch (Exception e) {
            log.error("Erreur lors de la désactivation de la politique: {}", e.getMessage());
            return ResponseEntity.internalServerError()
                .body(Map.of("success", false, "message", "Erreur interne du serveur"));
        }
    }
    
    /**
     * Initialiser les politiques par défaut (Admin)
     */
    @PostMapping("/initialize-defaults")
    public ResponseEntity<Map<String, Object>> initializeDefaultPolicies() {
        try {
            log.info("Initialisation des politiques par défaut");
            
            policyService.initializeDefaultPolicies();
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Politiques par défaut initialisées avec succès"
            ));
            
        } catch (Exception e) {
            log.error("Erreur lors de l'initialisation des politiques par défaut: {}", e.getMessage());
            return ResponseEntity.internalServerError()
                .body(Map.of("success", false, "message", "Erreur interne du serveur"));
        }
    }
    
    /**
     * Endpoint de santé pour le service Policy
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        return ResponseEntity.ok(Map.of(
            "service", "PolicyService",
            "status", "UP",
            "timestamp", System.currentTimeMillis()
        ));
    }
}
