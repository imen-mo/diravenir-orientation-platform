package com.dira.diravenir1.Controller;

import com.dira.diravenir1.dto.OrientationRequestDTO;
import com.dira.diravenir1.dto.OrientationResponseDTO;
import com.dira.diravenir1.dto.MajorRecommendationDTO;
import com.dira.diravenir1.dto.UserProfileDTO;
import com.dira.diravenir1.service.OrientationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orientation")
@CrossOrigin(origins = "*")
public class OrientationController {

    @Autowired
    private OrientationService orientationService;

    /**
     * Endpoint principal pour le calcul d'orientation
     * Reçoit les réponses du test et retourne les recommandations
     */
    @PostMapping("/calculate")
    public ResponseEntity<OrientationResponseDTO> calculateOrientation(
            @RequestBody OrientationRequestDTO request) {
        
        try {
            System.out.println("🎯 Contrôleur: Calcul d'orientation demandé");
            System.out.println("📤 Données reçues: " + request);
            
            OrientationResponseDTO response = orientationService.calculateOrientation(request);
            
            System.out.println("✅ Contrôleur: Calcul réussi, " + 
                (response.getTop3Recommendations() != null ? response.getTop3Recommendations().size() : 0) + 
                " recommandations générées");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("❌ Contrôleur: Erreur lors du calcul: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Endpoint pour obtenir le profil utilisateur calculé
     */
    @PostMapping("/profile")
    public ResponseEntity<UserProfileDTO> getUserProfile(
            @RequestBody OrientationRequestDTO request) {
        
        try {
            System.out.println("👤 Contrôleur: Demande de profil utilisateur");
            
            // Utiliser la méthode correcte du service
            OrientationResponseDTO response = orientationService.calculateOrientation(request);
            UserProfileDTO profile = response.getUserProfile();
            
            if (profile != null) {
                System.out.println("✅ Contrôleur: Profil utilisateur récupéré avec succès");
                return ResponseEntity.ok(profile);
            } else {
                System.err.println("❌ Contrôleur: Profil utilisateur null dans la réponse");
                return ResponseEntity.badRequest().build();
            }
        } catch (Exception e) {
            System.err.println("❌ Contrôleur: Erreur lors de la récupération du profil: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Endpoint pour obtenir toutes les majeures disponibles
     */
    @GetMapping("/majors")
    public ResponseEntity<List<MajorRecommendationDTO>> getAllMajors() {
        
        try {
            System.out.println("📚 Contrôleur: Demande de toutes les majeures");
            
            List<MajorRecommendationDTO> majors = orientationService.getAllMajors();
            
            System.out.println("✅ Contrôleur: " + majors.size() + " majeures récupérées");
            
            return ResponseEntity.ok(majors);
        } catch (Exception e) {
            System.err.println("❌ Contrôleur: Erreur lors de la récupération des majeures: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("pong");
    }

    @GetMapping("/test-simple")
    public ResponseEntity<String> testSimple() {
        try {
            System.out.println("🧪 Contrôleur: Test simple demandé");
            return ResponseEntity.ok("API d'orientation fonctionne !");
        } catch (Exception e) {
            System.err.println("❌ Contrôleur: Erreur lors du test simple: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erreur: " + e.getMessage());
        }
    }

    /**
     * Endpoint de test avec les réponses d'exemple du document
     */
    @GetMapping("/test-example")
    public ResponseEntity<OrientationResponseDTO> testWithExample() {
        
        try {
            System.out.println("🧪 Contrôleur: Test avec exemples demandé");
            
            OrientationResponseDTO response = orientationService.testWithExampleAnswers();
            
            System.out.println("✅ Contrôleur: Test avec exemples réussi, " + 
                (response.getTop3Recommendations() != null ? response.getTop3Recommendations().size() : 0) + 
                " recommandations générées");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("❌ Contrôleur: Erreur lors du test avec exemples: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}
