package com.diravenir.controller;

import com.diravenir.dto.OrientationRequestDTO;
import com.diravenir.dto.OrientationResponseDTO;
import com.diravenir.service.OrientationCalculationService;
import com.diravenir.service.OrientationPersistenceService;
import com.diravenir.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/orientation")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class OrientationController {
    
    private final OrientationCalculationService calculationService;
    private final OrientationPersistenceService persistenceService;
    private final EmailService emailService;
    
    /**
     * Endpoint pour traiter un test d'orientation complet
     */
    @PostMapping("/complete")
    public ResponseEntity<OrientationResponseDTO> processCompleteOrientation(@RequestBody OrientationRequestDTO request) {
        try {
            log.info("Traitement d'un test d'orientation complet pour: {}", 
                    request.getStudentInfo() != null ? request.getStudentInfo().getEmail() : "Email non fourni");
            
            // Calculer le profil utilisateur
            Map<String, Integer> userProfile = calculationService.calculateUserProfile(request);
            
            // Obtenir les recommandations
            var recommendations = calculationService.getRecommendationsWithIdealProfiles(userProfile);
            
            // Sauvegarder les réponses
            var test = persistenceService.saveOrientationAnswers(request);
            
            // Sauvegarder les résultats
            var result = persistenceService.saveOrientationResults(test.getId(), userProfile, recommendations);
            
            // Envoyer l'email de résultats
            if (request.getStudentInfo() != null && request.getStudentInfo().getEmail() != null) {
                try {
                    emailService.sendOrientationResultsEmail(
                        request.getStudentInfo().getEmail(), 
                        request.getStudentInfo().getFullName(),
                        test.getId().toString(),
                        result.getTopRecommendationMajor(),
                        result.getTopRecommendationScore(),
                        result.getUserProfile()
                    );
                    log.info("✅ Email de résultats envoyé avec succès à: {}", request.getStudentInfo().getEmail());
                } catch (Exception e) {
                    log.error("❌ Erreur lors de l'envoi de l'email: {}", e.getMessage(), e);
                    // Ne pas faire échouer le processus si l'email échoue
                }
            }
            
            // Construire la réponse
            OrientationResponseDTO response = OrientationResponseDTO.builder()
                    .success(true)
                    .message("Test d'orientation traité avec succès")
                    .testUuid(test.getId().toString())
                    .results(result)
                    .recommendations(recommendations)
                    .build();
            
                    
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Erreur lors du traitement du test d'orientation: {}", e.getMessage(), e);
            
            OrientationResponseDTO errorResponse = OrientationResponseDTO.builder()
                    .success(false)
                    .message("Erreur lors du traitement: " + e.getMessage())
                    .build();
            
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    /**
     * Endpoint pour calculer le profil utilisateur (sans sauvegarde)
     */
    @PostMapping("/calculate")
    public ResponseEntity<Map<String, Object>> calculateProfile(@RequestBody OrientationRequestDTO request) {
        try {
            log.info("Calcul du profil utilisateur");
            
            // Calculer le profil utilisateur
            Map<String, Integer> userProfile = calculationService.calculateUserProfile(request);
            
            // Obtenir les recommandations avec les vrais profils idéaux
            var recommendations = calculationService.getRecommendationsWithIdealProfiles(userProfile);
            
            Map<String, Object> response = Map.of(
                "userProfile", userProfile,
                "recommendations", recommendations,
                "success", true
            );
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Erreur lors du calcul du profil: {}", e.getMessage(), e);
            
            Map<String, Object> errorResponse = Map.of(
                "success", false,
                "error", e.getMessage()
            );
            
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    /**
     * Endpoint pour récupérer les résultats par UUID
     */
    @GetMapping("/results/{testUuid}")
    public ResponseEntity<OrientationResponseDTO> getResultsByUuid(@PathVariable String testUuid) {
        try {
            log.info("Récupération des résultats pour le test: {}", testUuid);
            
            // Pour l'instant, retourner une erreur car cette fonctionnalité n'est pas implémentée
            return ResponseEntity.notFound().build();
            
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des résultats: {}", e.getMessage(), e);
            
            OrientationResponseDTO errorResponse = OrientationResponseDTO.builder()
                    .success(false)
                    .message("Erreur lors de la récupération: " + e.getMessage())
                    .build();
            
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    /**
     * Endpoint pour récupérer les résultats par email
     */
    @GetMapping("/results/email/{email}")
    public ResponseEntity<OrientationResponseDTO> getResultsByEmail(@PathVariable String email) {
        try {
            log.info("Récupération des résultats pour l'email: {}", email);
            
            var result = persistenceService.getResultsByStudentEmail(email);
            
            if (result.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            OrientationResponseDTO response = OrientationResponseDTO.builder()
                    .success(true)
                    .results(result.get())
                    .build();
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des résultats par email: {}", e.getMessage(), e);
            
            OrientationResponseDTO errorResponse = OrientationResponseDTO.builder()
                    .success(false)
                    .message("Erreur lors de la récupération: " + e.getMessage())
                    .build();
            
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    /**
     * Endpoint de santé pour vérifier que l'API fonctionne
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "OK", "message", "API d'orientation opérationnelle"));
    }
}
