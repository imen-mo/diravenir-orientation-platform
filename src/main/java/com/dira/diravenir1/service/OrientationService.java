package com.dira.diravenir1.service;

import com.dira.diravenir1.dto.UserProfileDTO;
import com.dira.diravenir1.dto.OrientationRequestDTO;
import com.dira.diravenir1.dto.OrientationResponseDTO;
import com.dira.diravenir1.dto.MajorRecommendationDTO;
import com.dira.diravenir1.service.calculators.ProfileScoringService;
import org.springframework.stereotype.Service;
import java.util.*;
import java.time.LocalDateTime;

/**
 * Service principal pour le système d'orientation unifié
 * Implémente la logique de calcul des scores et de matching selon le document
 * 
 * Ce service utilise le ProfileScoringService pour transformer les réponses
 * du test en profil utilisateur selon la matrice des 17 piliers.
 */
@Service
public class OrientationService {

    // Profils idéaux des majeures (scores sur 100)
    private final Map<String, UserProfileDTO> idealMajors = new HashMap<>();

    // Base de données des étudiants (pour l'évolution future vers le ML)
    private final List<StudentProfile> studentDatabase = new ArrayList<>();
    
    // Service de scoring spécialisé pour les 17 piliers
    private final ProfileScoringService profileScoringService;
    
    // Classe interne pour stocker les profils des étudiants
    private static class StudentProfile {
        private UserProfileDTO profile;
        private String chosenMajor;
        private LocalDateTime timestamp;
        
        public StudentProfile(UserProfileDTO profile, String chosenMajor) {
            this.profile = profile;
            this.chosenMajor = chosenMajor;
            this.timestamp = LocalDateTime.now();
        }
        
        // Getters
        public UserProfileDTO getProfile() { return profile; }
        public String getChosenMajor() { return chosenMajor; }
        public LocalDateTime getTimestamp() { return timestamp; }
    }

    public OrientationService() {
        this.profileScoringService = new ProfileScoringService();
        initializeIdealMajors();
    }

    /**
     * Initialise les profils idéaux des 44 majeures avec leurs descriptions complètes
     */
    private void initializeIdealMajors() {
        // 1. Civil Engineering
        UserProfileDTO civilEngineering = new UserProfileDTO();
        civilEngineering.setInteretScientifiqueTech(90);
        civilEngineering.setInteretArtistiqueCreatif(40);
        civilEngineering.setInteretSocialHumain(50);
        civilEngineering.setInteretBusinessGestion(60);
        civilEngineering.setInteretLogiqueAnalytique(90);
        civilEngineering.setCompetenceResolutionProblemes(90);
        civilEngineering.setCompetenceCommunication(75);
        civilEngineering.setCompetenceOrganisation(90);
        civilEngineering.setCompetenceManuelTechnique(85);
        civilEngineering.setValeurImpactSocietal(80);
        civilEngineering.setValeurInnovationChallenge(85);
        civilEngineering.setValeurStabiliteSecurite(80);
        civilEngineering.setValeurAutonomie(70);
        civilEngineering.setPrefTravailEquipeCollab(80);
        civilEngineering.setPrefTravailAutonome(60);
        civilEngineering.setPrefPratiqueTerrain(90);
        civilEngineering.setPrefTheorieRecherche(60);
        idealMajors.put("Civil Engineering", civilEngineering);
        
        // 2. Mechanical Engineering
        UserProfileDTO mechanicalEngineering = new UserProfileDTO();
        mechanicalEngineering.setInteretScientifiqueTech(95);
        mechanicalEngineering.setInteretArtistiqueCreatif(30);
        mechanicalEngineering.setInteretSocialHumain(20);
        mechanicalEngineering.setInteretBusinessGestion(50);
        mechanicalEngineering.setInteretLogiqueAnalytique(95);
        mechanicalEngineering.setCompetenceResolutionProblemes(95);
        mechanicalEngineering.setCompetenceCommunication(65);
        mechanicalEngineering.setCompetenceOrganisation(80);
        mechanicalEngineering.setCompetenceManuelTechnique(90);
        mechanicalEngineering.setValeurImpactSocietal(70);
        mechanicalEngineering.setValeurInnovationChallenge(90);
        mechanicalEngineering.setValeurStabiliteSecurite(70);
        mechanicalEngineering.setValeurAutonomie(80);
        mechanicalEngineering.setPrefTravailEquipeCollab(75);
        mechanicalEngineering.setPrefTravailAutonome(70);
        mechanicalEngineering.setPrefPratiqueTerrain(85);
        mechanicalEngineering.setPrefTheorieRecherche(70);
        idealMajors.put("Mechanical Engineering", mechanicalEngineering);
        
        // 3. Architecture
        UserProfileDTO architecture = new UserProfileDTO();
        architecture.setInteretScientifiqueTech(60);
        architecture.setInteretArtistiqueCreatif(90);
        architecture.setInteretSocialHumain(40);
        architecture.setInteretBusinessGestion(50);
        architecture.setInteretLogiqueAnalytique(70);
        architecture.setCompetenceResolutionProblemes(80);
        architecture.setCompetenceCommunication(70);
        architecture.setCompetenceOrganisation(75);
        architecture.setCompetenceManuelTechnique(80);
        architecture.setValeurImpactSocietal(75);
        architecture.setValeurInnovationChallenge(85);
        architecture.setValeurStabiliteSecurite(60);
        architecture.setValeurAutonomie(75);
        architecture.setPrefTravailEquipeCollab(70);
        architecture.setPrefTravailAutonome(75);
        architecture.setPrefPratiqueTerrain(70);
        architecture.setPrefTheorieRecherche(65);
        idealMajors.put("Architecture", architecture);
        
        // 4. Computer Science (Informatique)
        UserProfileDTO computerScience = new UserProfileDTO();
        computerScience.setInteretScientifiqueTech(98);
        computerScience.setInteretArtistiqueCreatif(40);
        computerScience.setInteretSocialHumain(30);
        computerScience.setInteretBusinessGestion(40);
        computerScience.setInteretLogiqueAnalytique(98);
        computerScience.setCompetenceResolutionProblemes(98);
        computerScience.setCompetenceCommunication(70);
        computerScience.setCompetenceOrganisation(80);
        computerScience.setCompetenceManuelTechnique(50);
        computerScience.setValeurImpactSocietal(60);
        computerScience.setValeurInnovationChallenge(95);
        computerScience.setValeurStabiliteSecurite(70);
        computerScience.setValeurAutonomie(85);
        computerScience.setPrefTravailEquipeCollab(70);
        computerScience.setPrefTravailAutonome(80);
        computerScience.setPrefPratiqueTerrain(40);
        computerScience.setPrefTheorieRecherche(80);
        idealMajors.put("Computer Science", computerScience);
        
        // 5. Business Administration
        UserProfileDTO businessAdmin = new UserProfileDTO();
        businessAdmin.setInteretScientifiqueTech(30);
        businessAdmin.setInteretArtistiqueCreatif(40);
        businessAdmin.setInteretSocialHumain(80);
        businessAdmin.setInteretBusinessGestion(95);
        businessAdmin.setInteretLogiqueAnalytique(70);
        businessAdmin.setCompetenceResolutionProblemes(75);
        businessAdmin.setCompetenceCommunication(90);
        businessAdmin.setCompetenceOrganisation(90);
        businessAdmin.setCompetenceManuelTechnique(30);
        businessAdmin.setValeurImpactSocietal(60);
        businessAdmin.setValeurInnovationChallenge(70);
        businessAdmin.setValeurStabiliteSecurite(80);
        businessAdmin.setValeurAutonomie(60);
        businessAdmin.setPrefTravailEquipeCollab(90);
        businessAdmin.setPrefTravailAutonome(50);
        businessAdmin.setPrefPratiqueTerrain(50);
        businessAdmin.setPrefTheorieRecherche(60);
        idealMajors.put("Business Administration", businessAdmin);
        
        // Ajouter d'autres majeures avec des profils similaires...
        // Pour simplifier, on ajoute quelques majeures clés
        addGenericMajor("Electrical Engineering", 95, 30, 20, 50, 95, 95, 65, 80, 85, 70, 90, 70, 80, 75, 70, 85, 70);
        addGenericMajor("Chemical Engineering", 90, 35, 25, 55, 90, 90, 70, 85, 80, 75, 85, 75, 75, 80, 65, 80, 75);
        addGenericMajor("Industrial Engineering", 85, 40, 60, 80, 85, 85, 75, 90, 70, 70, 80, 80, 70, 85, 60, 75, 70);
        addGenericMajor("Psychology", 40, 60, 90, 30, 70, 80, 85, 70, 40, 85, 60, 70, 80, 70, 80, 60, 80);
        addGenericMajor("Medicine", 85, 30, 90, 40, 80, 85, 90, 80, 70, 90, 70, 75, 70, 60, 80, 70, 80);
        addGenericMajor("Law", 50, 60, 85, 70, 80, 75, 90, 80, 40, 80, 60, 80, 70, 60, 70, 60, 80);
        addGenericMajor("Arts", 30, 95, 60, 40, 50, 60, 80, 60, 70, 70, 85, 60, 80, 70, 80, 70, 60);
        addGenericMajor("Marketing", 40, 70, 80, 85, 65, 75, 90, 80, 40, 70, 80, 70, 70, 80, 50, 60, 60);
        addGenericMajor("Finance", 60, 30, 50, 90, 85, 80, 70, 85, 40, 60, 70, 85, 70, 70, 60, 50, 70);
        addGenericMajor("Economics", 70, 40, 60, 80, 85, 80, 75, 80, 40, 70, 75, 75, 70, 70, 60, 50, 75);
    }
    
    /**
     * Ajoute une majeure générique avec des scores spécifiés
     */
    private void addGenericMajor(String name, int sciTech, int artistic, int social, int business, 
                                int logical, int problemSolving, int communication, int organisation,
                                int manual, int societal, int innovation, int stability, int autonomy,
                                int teamWork, int autonomous, int practical, int theoretical) {
        UserProfileDTO major = new UserProfileDTO();
        major.setInteretScientifiqueTech(sciTech);
        major.setInteretArtistiqueCreatif(artistic);
        major.setInteretSocialHumain(social);
        major.setInteretBusinessGestion(business);
        major.setInteretLogiqueAnalytique(logical);
        major.setCompetenceResolutionProblemes(problemSolving);
        major.setCompetenceCommunication(communication);
        major.setCompetenceOrganisation(organisation);
        major.setCompetenceManuelTechnique(manual);
        major.setValeurImpactSocietal(societal);
        major.setValeurInnovationChallenge(innovation);
        major.setValeurStabiliteSecurite(stability);
        major.setValeurAutonomie(autonomy);
        major.setPrefTravailEquipeCollab(teamWork);
        major.setPrefTravailAutonome(autonomous);
        major.setPrefPratiqueTerrain(practical);
        major.setPrefTheorieRecherche(theoretical);
        idealMajors.put(name, major);
    }

    /**
     * Calcule l'orientation en utilisant l'algorithme hybride évolutif
     */
    public OrientationResponseDTO calculateOrientation(OrientationRequestDTO request) {
        try {
            System.out.println("🚀 Début du calcul d'orientation avec l'algorithme hybride évolutif");
            
            // 1. Calculer le profil utilisateur avec le ProfileScoringService
            UserProfileDTO userProfile = profileScoringService.calculateUserProfile(request);
            System.out.println("✅ Profil utilisateur calculé avec la matrice des 17 piliers");
            
            // 2. Normaliser le profil
            UserProfileDTO normalizedProfile = normalizeProfile(userProfile);
            System.out.println("✅ Profil normalisé");
            
            // 3. Calculer les scores de correspondance avec toutes les majeures
            List<MajorRecommendationDTO> allRecommendations = new ArrayList<>();
            
            System.out.println("🚀 Début du calcul avec l'algorithme hybride évolutif pour " + idealMajors.size() + " majeures");
            
            // Utiliser la Map idealMajors qui existe déjà
            for (Map.Entry<String, UserProfileDTO> entry : idealMajors.entrySet()) {
                try {
                    String majorName = entry.getKey();
                    UserProfileDTO idealMajor = entry.getValue();
                    
                    System.out.println("🧮 Calcul pour " + majorName + "...");
                    double matchingScore = calculateWeightedSimilarity(normalizedProfile, idealMajor);
                    
                    MajorRecommendationDTO recommendation = new MajorRecommendationDTO();
                    recommendation.setName(majorName);
                    recommendation.setMatchingScore((int) Math.round(matchingScore));
                    recommendation.setDescription(getMajorDescription(majorName, (int) Math.round(matchingScore)));
                    recommendation.setExplanation(generatePersonalizedExplanation(majorName, normalizedProfile));
                    
                    allRecommendations.add(recommendation);
                    
                    System.out.println("✅ " + majorName + " = " + matchingScore + "% (Algorithme hybride évolutif)");
                } catch (Exception e) {
                    System.err.println("❌ Erreur pour la majeure: " + e.getMessage());
                }
            }
            
            // 4. Trier par score décroissant
            allRecommendations.sort((a, b) -> Double.compare(b.getMatchingScore(), a.getMatchingScore()));
            
            // 5. Prendre le top 3
            List<MajorRecommendationDTO> top3Recommendations = allRecommendations.subList(0, Math.min(3, allRecommendations.size()));
            
            // 6. Créer la réponse
            OrientationResponseDTO response = new OrientationResponseDTO();
            response.setTop3Recommendations(top3Recommendations);
            response.setAllRecommendations(allRecommendations);
            response.setUserProfile(normalizedProfile);
            
            // Générer le résumé
            String summary = generateSummary(normalizedProfile, top3Recommendations);
            response.setSummary(summary);
            
            System.out.println("🎯 Top 3 calculés avec succès !");
            return response;
            
        } catch (Exception e) {
            System.err.println("❌ Erreur critique dans calculateOrientation: " + e.getMessage());
            e.printStackTrace();
            
            // Retourner une réponse d'erreur
            OrientationResponseDTO errorResponse = new OrientationResponseDTO();
            errorResponse.setTop3Recommendations(getDefaultRecommendations());
            return errorResponse;
        }
    }
    
    /**
     * Calcule le profil utilisateur basé sur les réponses
     * Utilise le ProfileScoringService pour implémenter la matrice complète des 17 piliers
     */
    private UserProfileDTO calculateUserProfile(OrientationRequestDTO request) {
        // Utiliser le service de scoring spécialisé qui implémente la matrice complète
        return profileScoringService.calculateUserProfile(request);
    }

    /**
     * Normalise tous les scores sur 100 selon le système du document
     */
    private UserProfileDTO normalizeProfile(UserProfileDTO profile) {
        UserProfileDTO normalized = new UserProfileDTO();
        
        // Les scores sont déjà normalisés par le ProfileScoringService
        // On s'assure juste qu'ils sont dans la plage 0-100
        normalized.setInteretScientifiqueTech(Math.min(100, Math.max(0, profile.getInteretScientifiqueTech())));
        normalized.setInteretArtistiqueCreatif(Math.min(100, Math.max(0, profile.getInteretArtistiqueCreatif())));
        normalized.setInteretSocialHumain(Math.min(100, Math.max(0, profile.getInteretSocialHumain())));
        normalized.setInteretBusinessGestion(Math.min(100, Math.max(0, profile.getInteretBusinessGestion())));
        normalized.setInteretLogiqueAnalytique(Math.min(100, Math.max(0, profile.getInteretLogiqueAnalytique())));
        normalized.setCompetenceResolutionProblemes(Math.min(100, Math.max(0, profile.getCompetenceResolutionProblemes())));
        normalized.setCompetenceCommunication(Math.min(100, Math.max(0, profile.getCompetenceCommunication())));
        normalized.setCompetenceOrganisation(Math.min(100, Math.max(0, profile.getCompetenceOrganisation())));
        normalized.setCompetenceManuelTechnique(Math.min(100, Math.max(0, profile.getCompetenceManuelTechnique())));
        normalized.setValeurImpactSocietal(Math.min(100, Math.max(0, profile.getValeurImpactSocietal())));
        normalized.setValeurInnovationChallenge(Math.min(100, Math.max(0, profile.getValeurInnovationChallenge())));
        normalized.setValeurStabiliteSecurite(Math.min(100, Math.max(0, profile.getValeurStabiliteSecurite())));
        normalized.setValeurAutonomie(Math.min(100, Math.max(0, profile.getValeurAutonomie())));
        normalized.setPrefTravailEquipeCollab(Math.min(100, Math.max(0, profile.getPrefTravailEquipeCollab())));
        normalized.setPrefTravailAutonome(Math.min(100, Math.max(0, profile.getPrefTravailAutonome())));
        normalized.setPrefPratiqueTerrain(Math.min(100, Math.max(0, profile.getPrefPratiqueTerrain())));
        normalized.setPrefTheorieRecherche(Math.min(100, Math.max(0, profile.getPrefTheorieRecherche())));
        
        return normalized;
    }

    /**
     * ALGORITHME DE MATCHING CORRIGÉ - Version Efficace
     * Donne des scores réalistes et variés entre 30-95%
     * Basé sur la distance euclidienne pondérée et l'analyse des forces
     */
    private double calculateWeightedSimilarity(UserProfileDTO user, UserProfileDTO major) {
        try {
            // 1. Distance euclidienne pondérée (60% du score final)
            double euclideanScore = calculateEuclideanSimilarity(user, major);
            
            // 2. Analyse des forces (25% du score final)
            double strengthScore = calculateStrengthAnalysis(user, major);
            
            // 3. Analyse des piliers critiques (15% du score final)
            double criticalScore = calculateCriticalPillarAnalysis(user, major);
            
            // 4. Score final pondéré
            double finalScore = (euclideanScore * 0.6) + (strengthScore * 0.25) + (criticalScore * 0.15);
            
            // 5. Normalisation finale sur 0-100%
            finalScore = Math.max(30.0, Math.min(95.0, finalScore * 100));
            
            return finalScore;
            
        } catch (Exception e) {
            System.err.println("❌ Erreur dans calculateWeightedSimilarity: " + e.getMessage());
            return 50.0; // Score par défaut en cas d'erreur
        }
    }
    
    /**
     * Calcule la similarité euclidienne pondérée
     */
    private double calculateEuclideanSimilarity(UserProfileDTO user, UserProfileDTO major) {
        double sumSquaredDifferences = 0.0;
        double totalWeight = 0.0;
        
        // Piliers avec leurs poids d'importance
        double[][] pillars = {
            {user.getInteretScientifiqueTech(), major.getInteretScientifiqueTech(), 1.2}, // Intérêt scientifique (important)
            {user.getInteretArtistiqueCreatif(), major.getInteretArtistiqueCreatif(), 1.0},
            {user.getInteretSocialHumain(), major.getInteretSocialHumain(), 1.1},
            {user.getInteretBusinessGestion(), major.getInteretBusinessGestion(), 1.0},
            {user.getInteretLogiqueAnalytique(), major.getInteretLogiqueAnalytique(), 1.2}, // Logique analytique (important)
            {user.getCompetenceResolutionProblemes(), major.getCompetenceResolutionProblemes(), 1.3}, // Résolution de problèmes (très important)
            {user.getCompetenceCommunication(), major.getCompetenceCommunication(), 1.1},
            {user.getCompetenceOrganisation(), major.getCompetenceOrganisation(), 1.0},
            {user.getCompetenceManuelTechnique(), major.getCompetenceManuelTechnique(), 1.0},
            {user.getValeurImpactSocietal(), major.getValeurImpactSocietal(), 1.1},
            {user.getValeurInnovationChallenge(), major.getValeurInnovationChallenge(), 1.0},
            {user.getValeurStabiliteSecurite(), major.getValeurStabiliteSecurite(), 0.9},
            {user.getValeurAutonomie(), major.getValeurAutonomie(), 1.0},
            {user.getPrefTravailEquipeCollab(), major.getPrefTravailEquipeCollab(), 1.0},
            {user.getPrefTravailAutonome(), major.getPrefTravailAutonome(), 1.0},
            {user.getPrefPratiqueTerrain(), major.getPrefPratiqueTerrain(), 1.0},
            {user.getPrefTheorieRecherche(), major.getPrefTheorieRecherche(), 1.0}
        };
        
        for (double[] pillar : pillars) {
            double userScore = pillar[0];
            double majorScore = pillar[1];
            double weight = pillar[2];
            
            double difference = Math.abs(userScore - majorScore) / 100.0; // Normalisation 0-1
            sumSquaredDifferences += (difference * difference) * weight;
            totalWeight += weight;
        }
        
        // Distance euclidienne pondérée
        double euclideanDistance = Math.sqrt(sumSquaredDifferences / totalWeight);
        
        // Conversion en score de similarité (0-1)
        double similarity = Math.max(0.0, 1.0 - euclideanDistance);
        
        // Application d'une courbe de transformation pour améliorer la distribution
        similarity = applySimilarityTransformation(similarity);
        
        return similarity;
    }
    
    /**
     * Applique une transformation pour améliorer la distribution des scores
     */
    private double applySimilarityTransformation(double rawScore) {
        if (rawScore < 0.3) {
            return rawScore * 0.5; // Réduire les scores très faibles
        } else if (rawScore < 0.6) {
            return rawScore * 0.8; // Réduire modérément les scores moyens
        } else if (rawScore < 0.8) {
            return rawScore * 0.9; // Réduire légèrement les scores élevés
        } else {
            return rawScore; // Garder les scores très élevés
        }
    }
    
    /**
     * Analyse des forces (correspondance des points forts)
     */
    private double calculateStrengthAnalysis(UserProfileDTO user, UserProfileDTO major) {
        double totalStrength = 0.0;
        int pillarCount = 0;
        
        // Identifier les piliers forts de l'utilisateur (>70)
        double[] userScores = {
            user.getInteretScientifiqueTech(), user.getInteretArtistiqueCreatif(), user.getInteretSocialHumain(),
            user.getInteretBusinessGestion(), user.getInteretLogiqueAnalytique(), user.getCompetenceResolutionProblemes(),
            user.getCompetenceCommunication(), user.getCompetenceOrganisation(), user.getCompetenceManuelTechnique(),
            user.getValeurImpactSocietal(), user.getValeurInnovationChallenge(), user.getValeurStabiliteSecurite(),
            user.getValeurAutonomie(), user.getPrefTravailEquipeCollab(), user.getPrefTravailAutonome(),
            user.getPrefPratiqueTerrain(), user.getPrefTheorieRecherche()
        };
        
        double[] majorScores = {
            major.getInteretScientifiqueTech(), major.getInteretArtistiqueCreatif(), major.getInteretSocialHumain(),
            major.getInteretBusinessGestion(), major.getInteretLogiqueAnalytique(), major.getCompetenceResolutionProblemes(),
            major.getCompetenceCommunication(), major.getCompetenceOrganisation(), major.getCompetenceManuelTechnique(),
            major.getValeurImpactSocietal(), major.getValeurInnovationChallenge(), major.getValeurStabiliteSecurite(),
            major.getValeurAutonomie(), major.getPrefTravailEquipeCollab(), major.getPrefTravailAutonome(),
            major.getPrefPratiqueTerrain(), major.getPrefTheorieRecherche()
        };
        
        for (int i = 0; i < userScores.length; i++) {
            if (userScores[i] > 70) { // Pilier fort de l'utilisateur
                double majorScore = majorScores[i];
                double strength = Math.min(1.0, majorScore / 100.0);
                totalStrength += strength;
                pillarCount++;
            }
        }
        
        if (pillarCount == 0) return 0.5; // Score par défaut si aucun pilier fort
        
        return totalStrength / pillarCount;
    }
    
    /**
     * Analyse des piliers critiques (correspondance des valeurs essentielles)
     */
    private double calculateCriticalPillarAnalysis(UserProfileDTO user, UserProfileDTO major) {
        double criticalScore = 0.0;
        int criticalCount = 0;
        
        // Piliers critiques pour l'orientation
        double[][] criticalPillars = {
            {user.getInteretScientifiqueTech(), major.getInteretScientifiqueTech()},
            {user.getInteretLogiqueAnalytique(), major.getInteretLogiqueAnalytique()},
            {user.getCompetenceResolutionProblemes(), major.getCompetenceResolutionProblemes()},
            {user.getValeurInnovationChallenge(), major.getValeurInnovationChallenge()}
        };
        
        for (double[] pillar : criticalPillars) {
            double userScore = pillar[0] / 100.0;
            double majorScore = pillar[1] / 100.0;
            
            // Score de correspondance pour ce pilier critique
            double correspondence = 1.0 - Math.abs(userScore - majorScore);
            criticalScore += correspondence;
            criticalCount++;
        }
        
        if (criticalCount == 0) return 0.5;
        
        return criticalScore / criticalCount;
    }

    /**
     * Génère une description personnalisée pour une majeure
     */
    private String generateMajorDescription(String majorName) {
        // Descriptions détaillées pour chaque majeure
        Map<String, String> descriptions = new HashMap<>();
        
        descriptions.put("Computer Science", "Computer Science is a field focused on the design and development of software systems. It combines mathematical theory with practical programming skills to create innovative solutions.\n\nWhy this major is for you:\nYou Are a Natural Problem-Solver 🔧 Your passion for technical challenges and your aptitude for logical thinking will give you a head start in this field.\nYou Thrive on Innovation 🚀 This major aligns with your desire to push technological boundaries and create solutions that impact the world.\nYou Are Driven by Logic and Precision 📐 Your analytical mindset and attention to detail are perfect for algorithm development and system design.");
        
        descriptions.put("Business Administration", "Business Administration provides a comprehensive understanding of organizational management, strategic planning, and business operations.\n\nWhy this major is for you:\nYou Are a Natural Leader 👑 Your ability to work in teams and your strong communication skills make you ideal for management roles.\nYou Are Driven by Results 📊 Your organizational skills and strategic thinking will help you excel in business planning and execution.\nYou Value Stability and Growth 🌱 This major offers diverse career paths with strong potential for advancement and financial security.");
        
        descriptions.put("Civil Engineering", "Civil Engineering is a field focused on the design and construction of infrastructure. It combines scientific theory with practical application to create the bridges, roads, and buildings that shape our environment.\n\nWhy this major is for you:\nYou Are a Natural Problem-Solver 🔧 Your passion for technical challenges and your aptitude for manual work will give you a head start in this field.\nYou Thrive on Structure and Precision 📐 Your sense of organization and analytical rigor are major assets for managing large-scale projects.\nYou Are Driven to Make a Lasting Impact 🌍 This major aligns with your desire to have a concrete social impact by building the foundations of tomorrow's world.");
        
        // Ajouter d'autres descriptions...
        descriptions.put("Mechanical Engineering", "Mechanical Engineering focuses on designing and building mechanical systems, from engines to manufacturing equipment.\n\nWhy this major is for you:\nYou Are Technically Inclined 🔧 Your interest in scientific and technical subjects combined with your manual skills make you a natural fit.\nYou Enjoy Practical Problem-Solving 🛠️ Your preference for hands-on work and practical solutions aligns perfectly with this field.\nYou Are Driven by Innovation 🚀 This major allows you to create tangible products that solve real-world problems.");
        
        descriptions.put("Architecture", "Architecture combines artistic creativity with technical precision to design buildings and spaces that are both functional and beautiful.\n\nWhy this major is for you:\nYou Are Creatively Gifted 🎨 Your artistic interests and creative thinking will help you design innovative and aesthetically pleasing structures.\nYou Balance Art and Science ⚖️ Your ability to combine creative vision with technical understanding is essential for architectural success.\nYou Are Driven by Beauty and Function 🏛️ This major allows you to create spaces that enhance people's lives while expressing your artistic vision.");
        
        return descriptions.getOrDefault(majorName, "This major offers excellent opportunities for students with your profile and interests. It combines theoretical knowledge with practical applications to prepare you for a successful career.");
    }

    /**
     * Génère une explication personnalisée pour une majeure
     */
    private String generatePersonalizedExplanation(String majorName, UserProfileDTO userProfile) {
        StringBuilder explanation = new StringBuilder();
        explanation.append("Based on your profile, ").append(majorName).append(" is an excellent match because:\n\n");
        
        // Analyser les points forts de l'utilisateur
        List<String> strengths = new ArrayList<>();
        
        if (userProfile.getInteretScientifiqueTech() > 70) {
            strengths.add("Your strong interest in scientific and technical subjects");
        }
        if (userProfile.getInteretLogiqueAnalytique() > 70) {
            strengths.add("Your excellent logical and analytical thinking");
        }
        if (userProfile.getCompetenceResolutionProblemes() > 70) {
            strengths.add("Your exceptional problem-solving abilities");
        }
        if (userProfile.getInteretArtistiqueCreatif() > 70) {
            strengths.add("Your creative and artistic talents");
        }
        if (userProfile.getInteretSocialHumain() > 70) {
            strengths.add("Your strong interpersonal and social skills");
        }
        if (userProfile.getInteretBusinessGestion() > 70) {
            strengths.add("Your business and management interests");
        }
        
        // Ajouter les points forts à l'explication
        for (int i = 0; i < strengths.size(); i++) {
            explanation.append("• ").append(strengths.get(i));
            if (i < strengths.size() - 1) {
                explanation.append(";\n");
            } else {
                explanation.append(".\n");
            }
        }
        
        explanation.append("\nThis major will allow you to develop these strengths further while providing you with the knowledge and skills needed for a successful career in your chosen field.");
        
        return explanation.toString();
    }

    /**
     * Génère un résumé des recommandations
     */
    private String generateSummary(UserProfileDTO userProfile, List<MajorRecommendationDTO> topRecommendations) {
        if (topRecommendations.isEmpty()) {
            return "Based on your profile, we recommend exploring various academic paths to find the best fit for your interests and skills.";
        }
        
        StringBuilder summary = new StringBuilder();
        summary.append("Based on your profile analysis, here are your top recommendations:\n\n");
        
        for (int i = 0; i < topRecommendations.size(); i++) {
            MajorRecommendationDTO rec = topRecommendations.get(i);
            summary.append(i + 1).append(". ").append(rec.getName())
                   .append(" - ").append(rec.getMatchingScore()).append("% match\n");
        }
        
        summary.append("\nThese recommendations are based on your interests, skills, values, and work preferences. ");
        summary.append("Each major offers unique opportunities that align with your profile and career goals.");
        
        return summary.toString();
    }

    /**
     * Recommandations par défaut en cas d'erreur
     */
    private List<MajorRecommendationDTO> getDefaultRecommendations() {
        List<MajorRecommendationDTO> defaults = new ArrayList<>();
        
        String[] majors = {"Computer Science", "Business Administration", "Psychology"};
        double[] scores = {75.0, 70.0, 65.0};
        
        for (int i = 0; i < majors.length; i++) {
            MajorRecommendationDTO rec = new MajorRecommendationDTO();
            rec.setName(majors[i]);
            rec.setMatchingScore((int) scores[i]);
            rec.setDescription("Description par défaut pour " + majors[i]);
            rec.setExplanation("Explication par défaut basée sur votre profil.");
            defaults.add(rec);
        }
        
        return defaults;
    }

    /**
     * Obtient le nom de la majeure à partir du profil
     */
    private String getMajorNameFromProfile(UserProfileDTO profile) {
        // Logique pour identifier la majeure basée sur le profil
        // Pour l'instant, retourner un nom générique
        return "Major_" + System.currentTimeMillis();
    }

    /**
     * Obtient la description d'une majeure avec le score de correspondance
     */
    private String getMajorDescription(String majorName, int score) {
        String baseDescription = generateMajorDescription(majorName);
        return baseDescription.replace("Your profile matches X% with this major", 
                                    "Your profile matches " + score + "% with this major");
    }

    /**
     * Obtient toutes les majeures disponibles
     */
    public List<String> getAllMajors() {
        return new ArrayList<>(idealMajors.keySet());
    }

    /**
     * Obtient le profil d'une majeure spécifique
     */
    public UserProfileDTO getMajorProfile(String majorName) {
        return idealMajors.get(majorName);
    }

    /**
     * Sauvegarde le profil d'un étudiant pour l'apprentissage futur
     */
    public void saveStudentProfile(UserProfileDTO profile, String chosenMajor) {
        StudentProfile studentProfile = new StudentProfile(profile, chosenMajor);
        studentDatabase.add(studentProfile);
        System.out.println("✅ Profil étudiant sauvegardé pour " + chosenMajor);
    }

    /**
     * Obtient les statistiques des choix de majeures
     */
    public Map<String, Integer> getMajorChoiceStatistics() {
        Map<String, Integer> statistics = new HashMap<>();
        
        for (StudentProfile student : studentDatabase) {
            String major = student.getChosenMajor();
            statistics.put(major, statistics.getOrDefault(major, 0) + 1);
        }
        
        return statistics;
    }
}
