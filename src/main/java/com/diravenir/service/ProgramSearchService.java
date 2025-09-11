package com.diravenir.service;

import com.diravenir.dto.ProgramDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service de recherche de programmes universitaires
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ProgramSearchService {

    private final ProgramService programService;

    /**
     * Recherche simple de programmes par mot-clé
     * @param keyword Mot-clé de recherche
     * @return Liste des programmes correspondants
     */
    public List<ProgramDTO> searchPrograms(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return List.of();
        }

        String trimmedKeyword = keyword.trim().toLowerCase();
        log.info("🔍 Recherche de programmes avec le mot-clé: {}", trimmedKeyword);

        List<ProgramDTO> allPrograms = programService.getAllPrograms();
        
        return allPrograms.stream()
                .filter(program -> matchesKeyword(program, trimmedKeyword))
                .collect(Collectors.toList());
    }

    /**
     * Recherche avancée de programmes avec plusieurs critères
     * @param keyword Mot-clé de recherche
     * @param location Localisation
     * @param degreeType Type de diplôme
     * @param maxTuitionFees Frais de scolarité maximum
     * @return Liste des programmes correspondants
     */
    public List<ProgramDTO> advancedSearch(String keyword, String location, String degreeType, Double maxTuitionFees) {
        log.info("🔍 Recherche avancée: keyword={}, location={}, degreeType={}, maxFees={}", 
                keyword, location, degreeType, maxTuitionFees);

        List<ProgramDTO> programs = searchPrograms(keyword);

        // Filtrer par localisation
        if (location != null && !location.trim().isEmpty()) {
            programs = programs.stream()
                    .filter(program -> program.getCampusCity() != null && 
                            program.getCampusCity().toLowerCase().contains(location.toLowerCase()))
                    .collect(Collectors.toList());
        }

        // Filtrer par type de diplôme
        if (degreeType != null && !degreeType.trim().isEmpty()) {
            programs = programs.stream()
                    .filter(program -> program.getDegreeType() != null && 
                            program.getDegreeType().toLowerCase().contains(degreeType.toLowerCase()))
                    .collect(Collectors.toList());
        }

        // Filtrer par frais de scolarité
        if (maxTuitionFees != null && maxTuitionFees > 0) {
            programs = programs.stream()
                    .filter(program -> program.getTuitionFees() != null && 
                            parseTuitionFees(program.getTuitionFees()) <= maxTuitionFees)
                    .collect(Collectors.toList());
        }

        log.info("✅ {} programmes trouvés après filtrage", programs.size());
        return programs;
    }

    /**
     * Recherche de programmes par catégorie
     * @param category Catégorie de programmes
     * @return Liste des programmes de la catégorie
     */
    public List<ProgramDTO> searchProgramsByCategory(String category) {
        if (category == null || category.trim().isEmpty()) {
            return List.of();
        }

        log.info("🔍 Recherche de programmes par catégorie: {}", category);
        
        List<ProgramDTO> allPrograms = programService.getAllPrograms();
        
        return allPrograms.stream()
                .filter(program -> program.getCategory() != null && 
                        program.getCategory().toLowerCase().contains(category.toLowerCase()))
                .collect(Collectors.toList());
    }

    /**
     * Recherche de programmes par localisation
     * @param location Localisation
     * @return Liste des programmes de la localisation
     */
    public List<ProgramDTO> searchProgramsByLocation(String location) {
        if (location == null || location.trim().isEmpty()) {
            return List.of();
        }

        log.info("🔍 Recherche de programmes par localisation: {}", location);

        List<ProgramDTO> allPrograms = programService.getAllPrograms();
        
        return allPrograms.stream()
                .filter(program -> program.getCampusCity() != null && 
                        program.getCampusCity().toLowerCase().contains(location.toLowerCase()))
                .collect(Collectors.toList());
    }

    /**
     * Recherche de programmes par budget
     * @param maxBudget Budget maximum
     * @return Liste des programmes dans le budget
     */
    public List<ProgramDTO> searchProgramsByBudget(Double maxBudget) {
        if (maxBudget == null || maxBudget <= 0) {
            return List.of();
        }

        log.info("🔍 Recherche de programmes par budget: {}", maxBudget);

        List<ProgramDTO> allPrograms = programService.getAllPrograms();
        
        return allPrograms.stream()
                .filter(program -> program.getTuitionFees() != null && 
                        parseTuitionFees(program.getTuitionFees()) <= maxBudget)
                .collect(Collectors.toList());
    }

    /**
     * Parse les frais de scolarité depuis une chaîne
     * @param tuitionFeesString Chaîne contenant les frais
     * @return Montant en double ou 0 si impossible à parser
     */
    private double parseTuitionFees(String tuitionFeesString) {
        if (tuitionFeesString == null) return 0.0;
        
        try {
            // Extraire les chiffres de la chaîne
            String numbers = tuitionFeesString.replaceAll("[^0-9.]", "");
            if (numbers.isEmpty()) return 0.0;
            
            return Double.parseDouble(numbers);
        } catch (NumberFormatException e) {
            return 0.0;
        }
    }

    /**
     * Vérifie si un programme correspond à un mot-clé
     * @param program Programme universitaire
     * @param keyword Mot-clé de recherche
     * @return true si le programme correspond
     */
    private boolean matchesKeyword(ProgramDTO program, String keyword) {
        if (program == null) return false;

        // Vérifier dans le nom du programme
        if (program.getProgram() != null && 
            program.getProgram().toLowerCase().contains(keyword)) {
            return true;
        }

        // Vérifier dans la description
        if (program.getDescription() != null && 
            program.getDescription().toLowerCase().contains(keyword)) {
            return true;
        }

        // Vérifier dans la catégorie
        if (program.getCategory() != null && 
            program.getCategory().toLowerCase().contains(keyword)) {
            return true;
        }

        // Vérifier dans la localisation
        if (program.getCampusCity() != null && 
            program.getCampusCity().toLowerCase().contains(keyword)) {
            return true;
        }

        // Vérifier dans le type de diplôme
        if (program.getDegreeType() != null && 
            program.getDegreeType().toLowerCase().contains(keyword)) {
            return true;
        }

        return false;
    }
}
