package com.dira.diravenir1.Controller;

import com.dira.diravenir1.dto.ProgramDTO;
import com.dira.diravenir1.dto.OrientationRecommendationDTO;
import com.dira.diravenir1.service.ProgramSearchService;
import com.dira.diravenir1.service.ProgramSearchService.UserPreferences;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Contrôleur pour la recherche de programmes universitaires
 * basée sur les résultats du test d'orientation
 */
@RestController
@RequestMapping("/api/program-search")
@CrossOrigin(origins = "*")
public class ProgramSearchController {

    @Autowired
    private ProgramSearchService programSearchService;

    /**
     * Recherche de programmes basée sur les résultats du test d'orientation
     * @param orientationResults Résultats du test d'orientation
     * @return Liste des programmes universitaires correspondants
     */
    @PostMapping("/by-orientation")
    public ResponseEntity<List<ProgramDTO>> searchByOrientation(
            @RequestBody OrientationRecommendationDTO orientationResults) {
        
        try {
            List<ProgramDTO> programs = programSearchService.searchProgramsByOrientation(orientationResults);
            return ResponseEntity.ok(programs);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Recherche de programmes par nom de majeure
     * @param majorName Nom de la majeure
     * @return Liste des programmes correspondants
     */
    @GetMapping("/by-major/{majorName}")
    public ResponseEntity<List<ProgramDTO>> searchByMajor(@PathVariable String majorName) {
        try {
            List<ProgramDTO> programs = programSearchService.searchProgramsByMajor(majorName);
            return ResponseEntity.ok(programs);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Recherche avancée avec filtres multiples
     * @param majorName Nom de la majeure
     * @param location Localisation souhaitée
     * @param degreeType Type de diplôme
     * @param maxTuitionFees Frais de scolarité maximum
     * @return Liste des programmes filtrés
     */
    @GetMapping("/advanced")
    public ResponseEntity<List<ProgramDTO>> advancedSearch(
            @RequestParam(required = false) String majorName,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String degreeType,
            @RequestParam(required = false) Double maxTuitionFees) {
        
        try {
            List<ProgramDTO> programs = programSearchService.advancedSearch(
                majorName, location, degreeType, maxTuitionFees);
            return ResponseEntity.ok(programs);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Recherche personnalisée avec préférences utilisateur
     * @param orientationResults Résultats du test d'orientation
     * @param userPreferences Préférences utilisateur
     * @return Recommandations personnalisées
     */
    @PostMapping("/personalized")
    public ResponseEntity<List<ProgramDTO>> getPersonalizedRecommendations(
            @RequestBody OrientationRecommendationDTO orientationResults,
            @RequestBody(required = false) UserPreferences userPreferences) {
        
        try {
            List<ProgramDTO> programs = programSearchService.getPersonalizedRecommendations(
                orientationResults, userPreferences);
            return ResponseEntity.ok(programs);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Recherche par mots-clés dans les programmes
     * @param keywords Mots-clés de recherche
     * @return Liste des programmes correspondants
     */
    @GetMapping("/keywords")
    public ResponseEntity<List<ProgramDTO>> searchByKeywords(@RequestParam String keywords) {
        try {
            // Diviser les mots-clés et rechercher pour chacun
            String[] keywordArray = keywords.split(",");
            List<ProgramDTO> allResults = List.of();
            
            for (String keyword : keywordArray) {
                String trimmedKeyword = keyword.trim();
                if (!trimmedKeyword.isEmpty()) {
                    List<ProgramDTO> results = programSearchService.searchProgramsByMajor(trimmedKeyword);
                    if (allResults.isEmpty()) {
                        allResults = results;
                    } else {
                        // Fusionner les résultats en évitant les doublons
                        allResults = allResults.stream()
                            .filter(program -> !results.contains(program))
                            .collect(java.util.stream.Collectors.toList());
                        allResults.addAll(results);
                    }
                }
            }
            
            return ResponseEntity.ok(allResults);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Recherche par catégorie de programme
     * @param category Catégorie (ex: "Engineering", "Business", "Health")
     * @return Liste des programmes de la catégorie
     */
    @GetMapping("/category/{category}")
    public ResponseEntity<List<ProgramDTO>> searchByCategory(@PathVariable String category) {
        try {
            // Utiliser la recherche par majeure avec la catégorie comme mot-clé
            List<ProgramDTO> programs = programSearchService.searchProgramsByMajor(category);
            return ResponseEntity.ok(programs);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Recherche par localisation
     * @param location Localisation (ville, pays)
     * @return Liste des programmes dans cette localisation
     */
    @GetMapping("/location/{location}")
    public ResponseEntity<List<ProgramDTO>> searchByLocation(@PathVariable String location) {
        try {
            // Recherche avancée avec seulement la localisation
            List<ProgramDTO> programs = programSearchService.advancedSearch(null, location, null, null);
            return ResponseEntity.ok(programs);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Recherche par budget
     * @param maxBudget Budget maximum
     * @return Liste des programmes dans ce budget
     */
    @GetMapping("/budget/{maxBudget}")
    public ResponseEntity<List<ProgramDTO>> searchByBudget(@PathVariable Double maxBudget) {
        try {
            // Recherche avancée avec seulement le budget
            List<ProgramDTO> programs = programSearchService.advancedSearch(null, null, null, maxBudget);
            return ResponseEntity.ok(programs);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Recherche combinée (majeure + localisation + budget)
     * @param majorName Nom de la majeure
     * @param location Localisation
     * @param maxBudget Budget maximum
     * @return Liste des programmes correspondants
     */
    @GetMapping("/combined")
    public ResponseEntity<List<ProgramDTO>> combinedSearch(
            @RequestParam String majorName,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Double maxBudget) {
        
        try {
            List<ProgramDTO> programs = programSearchService.advancedSearch(
                majorName, location, null, maxBudget);
            return ResponseEntity.ok(programs);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Endpoint de test pour vérifier le bon fonctionnement
     * @return Message de confirmation
     */
    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint() {
        return ResponseEntity.ok("ProgramSearchController fonctionne correctement");
    }

    /**
     * Statistiques de recherche
     * @return Statistiques des recherches effectuées
     */
    @GetMapping("/stats")
    public ResponseEntity<String> getSearchStats() {
        return ResponseEntity.ok("Statistiques de recherche - Fonctionnalité en développement");
    }
}
