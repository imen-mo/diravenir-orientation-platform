package com.diravenir.controller;

import com.diravenir.dto.ProgramDTO;
import com.diravenir.service.ProgramSearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Contrôleur pour la recherche de programmes universitaires
 */
@Slf4j
@RestController
@RequestMapping("/api/program-search")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProgramSearchController {

    private final ProgramSearchService programSearchService;

    /**
     * Recherche simple de programmes par mot-clé
     * @param keyword Mot-clé de recherche
     * @return Liste des programmes correspondants
     */
    @GetMapping("/search")
    public ResponseEntity<List<ProgramDTO>> searchPrograms(@RequestParam String keyword) {
        try {
            log.info("🔍 Recherche de programmes avec le mot-clé: {}", keyword);
            List<ProgramDTO> programs = programSearchService.searchPrograms(keyword);
            log.info("✅ {} programmes trouvés", programs.size());
            return ResponseEntity.ok(programs);
        } catch (Exception e) {
            log.error("❌ Erreur lors de la recherche: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Recherche avancée avec filtres multiples
     * @param keyword Mot-clé de recherche
     * @param location Localisation souhaitée
     * @param degreeType Type de diplôme
     * @param maxTuitionFees Frais de scolarité maximum
     * @return Liste des programmes filtrés
     */
    @GetMapping("/advanced")
    public ResponseEntity<List<ProgramDTO>> advancedSearch(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String degreeType,
            @RequestParam(required = false) Double maxTuitionFees) {
        
        try {
            log.info("🔍 Recherche avancée: keyword={}, location={}, degreeType={}, maxFees={}", 
                    keyword, location, degreeType, maxTuitionFees);
            
            List<ProgramDTO> programs = programSearchService.advancedSearch(
                keyword, location, degreeType, maxTuitionFees);
            
            log.info("✅ {} programmes trouvés après filtrage", programs.size());
            return ResponseEntity.ok(programs);
        } catch (Exception e) {
            log.error("❌ Erreur lors de la recherche avancée: {}", e.getMessage(), e);
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
            log.info("🔍 Recherche de programmes par catégorie: {}", category);
            List<ProgramDTO> programs = programSearchService.searchProgramsByCategory(category);
            log.info("✅ {} programmes trouvés dans la catégorie {}", programs.size(), category);
            return ResponseEntity.ok(programs);
        } catch (Exception e) {
            log.error("❌ Erreur lors de la recherche par catégorie: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Recherche par localisation
     * @param location Localisation (ville, pays)
     * @return Liste des programmes de la localisation
     */
    @GetMapping("/location/{location}")
    public ResponseEntity<List<ProgramDTO>> searchByLocation(@PathVariable String location) {
        try {
            log.info("🔍 Recherche de programmes par localisation: {}", location);
            List<ProgramDTO> programs = programSearchService.searchProgramsByLocation(location);
            log.info("✅ {} programmes trouvés à {}", programs.size(), location);
            return ResponseEntity.ok(programs);
        } catch (Exception e) {
            log.error("❌ Erreur lors de la recherche par localisation: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Recherche par budget
     * @param maxBudget Budget maximum en euros
     * @return Liste des programmes dans le budget
     */
    @GetMapping("/budget/{maxBudget}")
    public ResponseEntity<List<ProgramDTO>> searchByBudget(@PathVariable Double maxBudget) {
        try {
            log.info("🔍 Recherche de programmes par budget: {}", maxBudget);
            List<ProgramDTO> programs = programSearchService.searchProgramsByBudget(maxBudget);
            log.info("✅ {} programmes trouvés dans le budget {}", programs.size(), maxBudget);
            return ResponseEntity.ok(programs);
        } catch (Exception e) {
            log.error("❌ Erreur lors de la recherche par budget: {}", e.getMessage(), e);
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
            log.info("🔍 Recherche par mots-clés: {}", keywords);
            
            // Diviser les mots-clés et rechercher pour chacun
            String[] keywordArray = keywords.split(",");
            List<ProgramDTO> allResults = List.of();
            
            for (String keyword : keywordArray) {
                String trimmedKeyword = keyword.trim();
                if (!trimmedKeyword.isEmpty()) {
                    List<ProgramDTO> results = programSearchService.searchPrograms(trimmedKeyword);
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
            
            log.info("✅ {} programmes trouvés avec les mots-clés {}", allResults.size(), keywords);
            return ResponseEntity.ok(allResults);
        } catch (Exception e) {
            log.error("❌ Erreur lors de la recherche par mots-clés: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Recherche de programmes populaires
     * @return Liste des programmes populaires
     */
    @GetMapping("/popular")
    public ResponseEntity<List<ProgramDTO>> getPopularPrograms() {
        try {
            log.info("🔍 Recherche des programmes populaires");
            // Pour l'instant, retourner tous les programmes
            // TODO: Implémenter une logique de popularité basée sur les statistiques
            List<ProgramDTO> allPrograms = programSearchService.searchPrograms("");
            log.info("✅ {} programmes populaires trouvés", allPrograms.size());
            return ResponseEntity.ok(allPrograms);
        } catch (Exception e) {
            log.error("❌ Erreur lors de la recherche des programmes populaires: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }
}
