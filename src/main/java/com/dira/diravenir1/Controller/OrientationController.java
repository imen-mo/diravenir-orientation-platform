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
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

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
    public ResponseEntity<List<String>> getAllMajors() {
        
        try {
            System.out.println("📚 Contrôleur: Demande de toutes les majeures");
            
            List<String> majors = orientationService.getAllMajors();
            
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
            
            // Créer des réponses d'exemple pour tester
            OrientationRequestDTO exampleRequest = createExampleRequest();
            OrientationResponseDTO response = orientationService.calculateOrientation(exampleRequest);
            
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
    
    /**
     * Crée une requête d'exemple pour les tests
     */
    private OrientationRequestDTO createExampleRequest() {
        OrientationRequestDTO request = new OrientationRequestDTO();
        
        // Question 1: Intérêt scientifique/technique
        request.setQuestion1("Très intéressé");
        
        // Question 2: Intérêts multiples (sélection multiple)
        request.setQuestion2(Arrays.asList("Sciences", "Technologie", "Mathématiques"));
        
        // Question 3: Intérêt artistique/créatif
        request.setQuestion3("Intéressé");
        
        // Question 4: Intérêt social/humain
        request.setQuestion4("Très intéressé");
        
        // Question 5: Intérêts spécifiques (drag & drop)
        request.setQuestion5(Arrays.asList("Business", "Gestion", "Leadership"));
        
        // Question 6: Intérêt logique/analytique
        request.setQuestion6("Très intéressé");
        
        // Question 7: Compétence résolution de problèmes
        request.setQuestion7("Très compétent");
        
        // Question 8: Compétence communication
        request.setQuestion8("Compétent");
        
        // Question 9: Préférences de travail (sliders)
        Map<String, Integer> workPrefs = new HashMap<>();
        workPrefs.put("Équipe", 80);
        workPrefs.put("Autonome", 60);
        workPrefs.put("Pratique", 70);
        workPrefs.put("Théorie", 50);
        request.setQuestion9(workPrefs);
        
        // Question 10: Valeur impact sociétal
        request.setQuestion10("Très important");
        
        // Question 11: Valeur innovation/défi
        request.setQuestion11("Important");
        
        // Question 12: Valeur stabilité/sécurité
        request.setQuestion12("Modérément important");
        
        // Question 13: Valeur autonomie
        request.setQuestion13("Important");
        
        // Question 14: Compétences organisationnelles
        request.setQuestion14(Arrays.asList("Organisation", "Planification", "Gestion de projet"));
        
        return request;
    }

    /**
     * Endpoint de test de la variabilité de l'algorithme
     * Vérifie que les scores sont variés et réalistes
     */
    @GetMapping("/test-algorithm")
    public ResponseEntity<String> testAlgorithmVariability() {
        
        try {
            System.out.println("🧪 Contrôleur: Test de variabilité de l'algorithme demandé");
            
            // Utiliser la réflexion pour appeler la méthode privée
            java.lang.reflect.Method method = orientationService.getClass().getDeclaredMethod("testAlgorithmVariability");
            method.setAccessible(true);
            method.invoke(orientationService);
            
            System.out.println("✅ Contrôleur: Test de variabilité réussi");
            
            return ResponseEntity.ok("Test de variabilité de l'algorithme exécuté avec succès. Vérifiez les logs du serveur pour voir les scores variés (30-95%).");
        } catch (Exception e) {
            System.err.println("❌ Contrôleur: Erreur lors du test de variabilité: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erreur lors du test: " + e.getMessage());
        }
    }
}
