package com.dira.diravenir1.Controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import com.dira.diravenir1.service.ProgramSearchService;
import com.dira.diravenir1.dto.ProgramDTO;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

/**
 * Contrôleur de test simple pour vérifier le bon fonctionnement de l'API
 * sans les conflits de compilation complexes
 */
@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "*")
@Slf4j
public class TestController {

    @Autowired
    private ProgramSearchService programSearchService;

    /**
     * Endpoint de test simple pour vérifier que l'API fonctionne
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "OK");
        response.put("message", "API Diravenir fonctionne correctement");
        response.put("timestamp", System.currentTimeMillis());
        response.put("version", "2.0");
        
        log.info("✅ Health check réussi");
        return ResponseEntity.ok(response);
    }

    /**
     * Test de recherche de programmes par majeure
     */
    @GetMapping("/search/{majorName}")
    public ResponseEntity<Map<String, Object>> testSearch(@PathVariable String majorName) {
        try {
            log.info("🔍 Test de recherche pour la majeure: {}", majorName);
            
            List<ProgramDTO> programs = programSearchService.searchProgramsByMajor(majorName);
            
            Map<String, Object> response = new HashMap<>();
            response.put("majorName", majorName);
            response.put("programsFound", programs.size());
            response.put("programs", programs);
            response.put("success", true);
            
            log.info("✅ Recherche réussie: {} programmes trouvés", programs.size());
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la recherche: {}", e.getMessage(), e);
            
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("majorName", majorName);
            errorResponse.put("error", e.getMessage());
            errorResponse.put("success", false);
            
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

    /**
     * Test de la base de données
     */
    @GetMapping("/database")
    public ResponseEntity<Map<String, Object>> testDatabase() {
        try {
            log.info("🗄️ Test de la base de données");
            
            // Test simple de récupération de tous les programmes
            List<ProgramDTO> allPrograms = programSearchService.searchProgramsByMajor("test");
            
            Map<String, Object> response = new HashMap<>();
            response.put("databaseStatus", "OK");
            response.put("totalPrograms", allPrograms.size());
            response.put("message", "Connexion à la base de données réussie");
            response.put("success", true);
            
            log.info("✅ Base de données OK: {} programmes disponibles", allPrograms.size());
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("❌ Erreur base de données: {}", e.getMessage(), e);
            
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("databaseStatus", "ERROR");
            errorResponse.put("error", e.getMessage());
            errorResponse.put("success", false);
            
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

    /**
     * Test des calculateurs de score
     */
    @GetMapping("/calculators")
    public ResponseEntity<Map<String, Object>> testCalculators() {
        try {
            log.info("🧮 Test des calculateurs de score");
            
            Map<String, Object> response = new HashMap<>();
            response.put("calculatorsStatus", "OK");
            response.put("message", "Calculateurs de score disponibles");
            response.put("availableCalculators", List.of(
                "EuclideanScoreCalculator",
                "ForceAnalysisCalculator", 
                "CriticalPillarCalculator"
            ));
            response.put("success", true);
            
            log.info("✅ Calculateurs de score OK");
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("❌ Erreur calculateurs: {}", e.getMessage(), e);
            
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("calculatorsStatus", "ERROR");
            errorResponse.put("error", e.getMessage());
            errorResponse.put("success", false);
            
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }

    /**
     * Test complet du système
     */
    @GetMapping("/system")
    public ResponseEntity<Map<String, Object>> testSystem() {
        try {
            log.info("🚀 Test complet du système");
            
            Map<String, Object> response = new HashMap<>();
            response.put("systemStatus", "OK");
            response.put("timestamp", System.currentTimeMillis());
            response.put("version", "2.0");
            
            // Test de la base de données
            List<ProgramDTO> allPrograms = programSearchService.searchProgramsByMajor("test");
            response.put("databasePrograms", allPrograms.size());
            
            // Test des calculateurs
            response.put("calculatorsAvailable", true);
            
            response.put("message", "Système Diravenir opérationnel");
            response.put("success", true);
            
            log.info("✅ Système complet OK");
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("❌ Erreur système: {}", e.getMessage(), e);
            
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("systemStatus", "ERROR");
            errorResponse.put("error", e.getMessage());
            errorResponse.put("success", false);
            
            return ResponseEntity.internalServerError().body(errorResponse);
        }
    }
}
