package com.dira.diravenir1.service;

import com.dira.diravenir1.dto.ProgramDTO;
import com.dira.diravenir1.dto.OrientationRecommendationDTO;
import com.dira.diravenir1.dto.MatchingResultDTO;
import com.dira.diravenir1.service.ProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service qui fait le lien entre les résultats du test d'orientation
 * et la recherche des programmes universitaires
 */
@Service
public class ProgramSearchService {

    @Autowired
    private ProgramService programService;

    /**
     * Recherche des programmes universitaires basée sur les résultats du test d'orientation
     * @param orientationResults Résultats du test d'orientation
     * @return Liste des programmes universitaires correspondants
     */
    public List<ProgramDTO> searchProgramsByOrientation(OrientationRecommendationDTO orientationResults) {
        if (orientationResults == null || orientationResults.getTopRecommendations() == null) {
            return List.of();
        }

        // Prendre les 3 meilleures recommandations
        List<MatchingResultDTO> topRecommendations = orientationResults.getTopRecommendations();
        
        // Rechercher les programmes correspondants pour chaque majeure recommandée
        return topRecommendations.stream()
                .flatMap(recommendation -> searchProgramsByMajor(recommendation.getProgram()).stream())
                .distinct()
                .collect(Collectors.toList());
    }

    /**
     * Recherche des programmes universitaires par nom de majeure
     * @param majorName Nom de la majeure (ex: "Génie Civil", "Informatique")
     * @return Liste des programmes universitaires correspondants
     */
    public List<ProgramDTO> searchProgramsByMajor(String majorName) {
        if (majorName == null || majorName.trim().isEmpty()) {
            return List.of();
        }

        // Mots-clés de recherche basés sur la majeure
        String searchTerm = getSearchTermForMajor(majorName);
        
        // Rechercher dans tous les programmes
        List<ProgramDTO> allPrograms = programService.getAllPrograms();
        
        return allPrograms.stream()
                .filter(program -> matchesMajor(program, searchTerm, majorName))
                .collect(Collectors.toList());
    }

    /**
     * Génère des mots-clés de recherche basés sur le nom de la majeure
     * @param majorName Nom de la majeure
     * @return Terme de recherche optimisé
     */
    private String getSearchTermForMajor(String majorName) {
        if (majorName == null) return "";
        
        // Mapping des majeures vers des mots-clés de recherche
        return switch (majorName.toLowerCase()) {
            case "génie civil", "civil engineering" -> "civil engineering, construction, building, infrastructure";
            case "génie mécanique", "mechanical engineering" -> "mechanical engineering, manufacturing, mechanics";
            case "architecture" -> "architecture, design, urban planning";
            case "commerce international", "international business" -> "international business, trade, commerce";
            case "administration des affaires", "business administration" -> "business administration, management, business";
            case "informatique", "computer science" -> "computer science, software, programming, IT";
            case "génie logiciel", "software engineering" -> "software engineering, development, programming";
            case "intelligence artificielle", "artificial intelligence" -> "artificial intelligence, AI, machine learning";
            case "médecine", "medicine" -> "medicine, medical, MBBS, healthcare";
            case "soins infirmiers", "nursing" -> "nursing, healthcare, medical";
            case "pharmacie", "pharmacy" -> "pharmacy, pharmaceutical, medicine";
            case "génie électrique", "electrical engineering" -> "electrical engineering, electronics, power";
            case "finance" -> "finance, financial, banking, economics";
            case "droit", "law" -> "law, legal, jurisprudence";
            case "psychologie", "psychology" -> "psychology, mental health, behavioral";
            case "gestion du tourisme", "tourism management" -> "tourism, hospitality, travel";
            case "marketing et management" -> "marketing, management, business";
            case "économie", "economics" -> "economics, economic, business";
            case "génie chimique", "chemical engineering" -> "chemical engineering, chemistry, process";
            case "biotechnologie", "biotechnology" -> "biotechnology, bioengineering, biology";
            case "science des données", "data science" -> "data science, analytics, big data";
            case "e-commerce" -> "e-commerce, digital business, online";
            case "ingénierie robotique", "robot engineering" -> "robotics, automation, engineering";
            case "ingénierie biomédicale", "biomedical engineering" -> "biomedical, medical engineering, healthcare";
            default -> majorName.toLowerCase();
        };
    }

    /**
     * Vérifie si un programme correspond à une majeure
     * @param program Programme universitaire
     * @param searchTerm Terme de recherche
     * @param majorName Nom de la majeure
     * @return true si le programme correspond
     */
    private boolean matchesMajor(ProgramDTO program, String searchTerm, String majorName) {
        if (program == null) return false;

        // Vérifier dans le nom du programme
        if (program.getProgram() != null && 
            program.getProgram().toLowerCase().contains(majorName.toLowerCase())) {
            return true;
        }

        // Vérifier dans la description
        if (program.getDescription() != null && 
            program.getDescription().toLowerCase().contains(majorName.toLowerCase())) {
            return true;
        }

        // Vérifier dans la catégorie
        if (program.getCategory() != null && 
            program.getCategory().toLowerCase().contains(majorName.toLowerCase())) {
            return true;
        }

        // Vérifier avec les mots-clés de recherche
        String[] keywords = searchTerm.split(",");
        for (String keyword : keywords) {
            keyword = keyword.trim().toLowerCase();
            
            if (program.getProgram() != null && 
                program.getProgram().toLowerCase().contains(keyword)) {
                return true;
            }
            
            if (program.getDescription() != null && 
                program.getDescription().toLowerCase().contains(keyword)) {
                return true;
            }
            
            if (program.getCategory() != null && 
                program.getCategory().toLowerCase().contains(keyword)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Recherche avancée avec filtres multiples
     * @param majorName Nom de la majeure
     * @param location Localisation souhaitée
     * @param degreeType Type de diplôme
     * @param maxTuitionFees Frais de scolarité maximum
     * @return Liste des programmes filtrés
     */
    public List<ProgramDTO> advancedSearch(String majorName, String location, String degreeType, Double maxTuitionFees) {
        // Commencer par la recherche de base par majeure
        List<ProgramDTO> programs = searchProgramsByMajor(majorName);
        
        // Appliquer les filtres supplémentaires
        return programs.stream()
                .filter(program -> location == null || 
                    (program.getCampusCity() != null && 
                     program.getCampusCity().toLowerCase().contains(location.toLowerCase())))
                .filter(program -> degreeType == null || 
                    (program.getDegreeType() != null && 
                     program.getDegreeType().toLowerCase().contains(degreeType.toLowerCase())))
                .filter(program -> maxTuitionFees == null || 
                    (program.getTuitionFees() != null && 
                     parseTuitionFees(program.getTuitionFees()) <= maxTuitionFees))
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
     * Génère des recommandations personnalisées de programmes
     * @param orientationResults Résultats du test d'orientation
     * @param userPreferences Préférences utilisateur (localisation, budget, etc.)
     * @return Recommandations personnalisées
     */
    public List<ProgramDTO> getPersonalizedRecommendations(
            OrientationRecommendationDTO orientationResults, 
            UserPreferences userPreferences) {
        
        // Recherche de base par orientation
        List<ProgramDTO> baseResults = searchProgramsByOrientation(orientationResults);
        
        if (userPreferences == null) {
            return baseResults;
        }

        // Appliquer les préférences utilisateur
        return baseResults.stream()
                .filter(program -> userPreferences.matchesLocation(program))
                .filter(program -> userPreferences.matchesBudget(program))
                .filter(program -> userPreferences.matchesDuration(program))
                .sorted((p1, p2) -> Double.compare(
                    calculateRelevanceScore(p2, orientationResults, userPreferences),
                    calculateRelevanceScore(p1, orientationResults, userPreferences)
                ))
                .collect(Collectors.toList());
    }

    /**
     * Calcule un score de pertinence pour un programme
     * @param program Programme à évaluer
     * @param orientationResults Résultats du test d'orientation
     * @param userPreferences Préférences utilisateur
     * @return Score de pertinence (plus élevé = plus pertinent)
     */
    private double calculateRelevanceScore(ProgramDTO program, 
                                         OrientationRecommendationDTO orientationResults, 
                                         UserPreferences userPreferences) {
        double score = 0.0;
        
        // Score de base basé sur l'orientation
        score += 50.0;
        
        // Bonus pour la correspondance avec les préférences
        if (userPreferences != null) {
            if (userPreferences.matchesLocation(program)) score += 20.0;
            if (userPreferences.matchesBudget(program)) score += 15.0;
            if (userPreferences.matchesDuration(program)) score += 10.0;
        }
        
        // Bonus pour le statut du programme
        if ("OPENED".equals(program.getStatus())) {
            score += 10.0;
        }
        
        return score;
    }

    /**
     * Classe interne pour les préférences utilisateur
     */
    public static class UserPreferences {
        private String preferredLocation;
        private Double maxBudget;
        private Integer preferredDuration;
        private String preferredLanguage;

        // Constructeurs
        public UserPreferences() {}

        public UserPreferences(String preferredLocation, Double maxBudget, Integer preferredDuration, String preferredLanguage) {
            this.preferredLocation = preferredLocation;
            this.maxBudget = maxBudget;
            this.preferredDuration = preferredDuration;
            this.preferredLanguage = preferredLanguage;
        }

        // Méthodes de correspondance
        public boolean matchesLocation(ProgramDTO program) {
            if (preferredLocation == null) return true;
            return program.getCampusCity() != null && 
                   program.getCampusCity().toLowerCase().contains(preferredLocation.toLowerCase());
        }

        public boolean matchesBudget(ProgramDTO program) {
            if (maxBudget == null) return true;
            if (program.getTuitionFees() == null) return true;
            
            double fees = parseTuitionFees(program.getTuitionFees());
            return fees <= maxBudget;
        }

        public boolean matchesDuration(ProgramDTO program) {
            if (preferredDuration == null) return true;
            if (program.getDuration() == null) return true;
            
            return Math.abs(program.getDuration() - preferredDuration) <= 1;
        }

        // Getters et Setters
        public String getPreferredLocation() { return preferredLocation; }
        public void setPreferredLocation(String preferredLocation) { this.preferredLocation = preferredLocation; }
        
        public Double getMaxBudget() { return maxBudget; }
        public void setMaxBudget(Double maxBudget) { this.maxBudget = maxBudget; }
        
        public Integer getPreferredDuration() { return preferredDuration; }
        public void setPreferredDuration(Integer preferredDuration) { this.preferredDuration = preferredDuration; }
        
        public String getPreferredLanguage() { return preferredLanguage; }
        public void setPreferredLanguage(String preferredLanguage) { this.preferredLanguage = preferredLanguage; }

        private double parseTuitionFees(String tuitionFeesString) {
            if (tuitionFeesString == null) return 0.0;
            try {
                String numbers = tuitionFeesString.replaceAll("[^0-9.]", "");
                return numbers.isEmpty() ? 0.0 : Double.parseDouble(numbers);
            } catch (NumberFormatException e) {
                return 0.0;
            }
        }
    }
}
