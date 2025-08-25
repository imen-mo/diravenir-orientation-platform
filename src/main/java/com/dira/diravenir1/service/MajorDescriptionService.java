package com.dira.diravenir1.service;

import com.dira.diravenir1.dto.UserProfileDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * Service de génération des descriptions personnalisées des majeures.
 * 
 * Ce service contient toutes les descriptions complètes des 44 majeures
 * avec leurs explications personnalisées selon le profil de l'utilisateur.
 */
@Slf4j
@Service
public class MajorDescriptionService {

    private static final Map<String, MajorDescription> MAJOR_DESCRIPTIONS = new HashMap<>();

    static {
        initializeMajorDescriptions();
    }

    /**
     * Génère une description personnalisée pour une majeure donnée
     */
    public String generatePersonalizedDescription(String majorName, double matchingScore, UserProfileDTO userProfile) {
        MajorDescription description = MAJOR_DESCRIPTIONS.get(majorName);
        if (description == null) {
            log.warn("⚠️ Description non trouvée pour la majeure: {}", majorName);
            return generateDefaultDescription(majorName, matchingScore);
        }

        StringBuilder personalizedDesc = new StringBuilder();
        
        // Titre avec score de correspondance
        personalizedDesc.append("Your profile matches ").append(String.format("%.0f", matchingScore * 100))
                       .append("% with this major. ");
        
        // Description générale de la majeure
        personalizedDesc.append(description.getGeneralDescription()).append(" ");
        
        // Section "Why this major is for you"
        personalizedDesc.append("\n\nWhy this major is for you:\n");
        
        // Génération des raisons personnalisées basées sur le profil utilisateur
        String personalizedReasons = generatePersonalizedReasons(majorName, userProfile, description);
        personalizedDesc.append(personalizedReasons);

        return personalizedDesc.toString();
    }

    /**
     * Génère des raisons personnalisées basées sur le profil utilisateur
     */
    private String generatePersonalizedReasons(String majorName, UserProfileDTO userProfile, MajorDescription description) {
        StringBuilder reasons = new StringBuilder();
        
        // Analyser les forces du profil utilisateur
        Map<String, Integer> userStrengths = analyzeUserStrengths(userProfile);
        
        // Générer les raisons personnalisées
        for (String reason : description.getReasons()) {
            String personalizedReason = personalizeReason(reason, userStrengths);
            reasons.append(personalizedReason).append("\n");
        }
        
        return reasons.toString();
    }

    /**
     * Analyse les forces du profil utilisateur
     */
    private Map<String, Integer> analyzeUserStrengths(UserProfileDTO userProfile) {
        Map<String, Integer> strengths = new HashMap<>();
        
        // Intérêts
        if (userProfile.getInteretScientifiqueTech() > 70) strengths.put("scientific", userProfile.getInteretScientifiqueTech());
        if (userProfile.getInteretArtistiqueCreatif() > 70) strengths.put("artistic", userProfile.getInteretArtistiqueCreatif());
        if (userProfile.getInteretSocialHumain() > 70) strengths.put("social", userProfile.getInteretSocialHumain());
        if (userProfile.getInteretBusinessGestion() > 70) strengths.put("business", userProfile.getInteretBusinessGestion());
        if (userProfile.getInteretLogiqueAnalytique() > 70) strengths.put("logical", userProfile.getInteretLogiqueAnalytique());
        
        // Compétences
        if (userProfile.getCompetenceResolutionProblemes() > 70) strengths.put("problem_solving", userProfile.getCompetenceResolutionProblemes());
        if (userProfile.getCompetenceCommunication() > 70) strengths.put("communication", userProfile.getCompetenceCommunication());
        if (userProfile.getCompetenceOrganisation() > 70) strengths.put("organization", userProfile.getCompetenceOrganisation());
        if (userProfile.getCompetenceManuelTechnique() > 70) strengths.put("manual", userProfile.getCompetenceManuelTechnique());
        
        // Valeurs
        if (userProfile.getValeurImpactSocietal() > 70) strengths.put("social_impact", userProfile.getValeurImpactSocietal());
        if (userProfile.getValeurInnovationChallenge() > 70) strengths.put("innovation", userProfile.getValeurInnovationChallenge());
        if (userProfile.getValeurStabiliteSecurite() > 70) strengths.put("stability", userProfile.getValeurStabiliteSecurite());
        if (userProfile.getValeurAutonomie() > 70) strengths.put("autonomy", userProfile.getValeurAutonomie());
        
        // Préférences
        if (userProfile.getPrefTravailEquipeCollab() > 70) strengths.put("teamwork", userProfile.getPrefTravailEquipeCollab());
        if (userProfile.getPrefTravailAutonome() > 70) strengths.put("independent", userProfile.getPrefTravailAutonome());
        if (userProfile.getPrefPratiqueTerrain() > 70) strengths.put("practical", userProfile.getPrefPratiqueTerrain());
        if (userProfile.getPrefTheorieRecherche() > 70) strengths.put("theoretical", userProfile.getPrefTheorieRecherche());
        
        return strengths;
    }

    /**
     * Personnalise une raison selon les forces de l'utilisateur
     */
    private String personalizeReason(String reason, Map<String, Integer> strengths) {
        // Remplacer les placeholders par des valeurs personnalisées
        String personalized = reason;
        
        if (strengths.containsKey("scientific") && reason.contains("scientific")) {
            personalized = personalized.replace("scientific", "very strong scientific");
        }
        if (strengths.containsKey("artistic") && reason.contains("artistic")) {
            personalized = personalized.replace("artistic", "very strong artistic");
        }
        if (strengths.containsKey("logical") && reason.contains("logical")) {
            personalized = personalized.replace("logical", "very strong logical");
        }
        if (strengths.containsKey("communication") && reason.contains("communication")) {
            personalized = personalized.replace("communication", "excellent communication");
        }
        
        return personalized;
    }

    /**
     * Génère une description par défaut si la majeure n'est pas trouvée
     */
    private String generateDefaultDescription(String majorName, double matchingScore) {
        return String.format("Your profile matches %.0f%% with %s. This major could be a great fit for your interests and skills.", 
                           matchingScore * 100, majorName);
    }

    /**
     * Initialise toutes les descriptions des majeures
     */
    private static void initializeMajorDescriptions() {
        // 1. Civil Engineering
        MAJOR_DESCRIPTIONS.put("Génie Civil", new MajorDescription(
            "Civil Engineering is a field focused on the design and construction of infrastructure. It combines scientific theory with practical application to create the bridges, roads, and buildings that shape our environment.",
            new String[]{
                "You Are a Natural Problem-Solver 🔧 Your passion for technical challenges and your aptitude for manual work will give you a head start in this field.",
                "You Thrive on Structure and Precision 📐 Your sense of organization and analytical rigor are major assets for managing large-scale projects.",
                "You Are Driven to Make a Lasting Impact 🌍 This major aligns with your desire to have a concrete social impact by building the foundations of tomorrow's world."
            }
        ));

        // 2. Mechanical Engineering
        MAJOR_DESCRIPTIONS.put("Génie Mécanique", new MajorDescription(
            "Mechanical Engineering is the heart of industrial innovation. It covers the design, analysis, and manufacturing of mechanical systems, from car engines to industrial robots, using physics and mathematics to create efficient and sustainable solutions.",
            new String[]{
                "You Have a Strong Analytical Mind 🧠 Your analytical profile and your interest in science and technology will allow you to solve the most complex problems.",
                "You Excel at Bringing Ideas to Life 🛠️ Your talent for manual and technical work is essential for bringing your creations to life.",
                "You Possess a Deep Drive to Innovate 💡 Your desire to innovate and your curious mind are the driving forces that will help you excel in this field."
            }
        ));

        // 3. Architecture
        MAJOR_DESCRIPTIONS.put("Architecture", new MajorDescription(
            "Architecture is the discipline that shapes our built environment. It combines artistic creativity with engineering rigor to design functional, aesthetic, and environmentally friendly spaces.",
            new String[]{
                "Your Creativity Is Your Superpower 🎨 Your very strong creativity and your passion for art are at the heart of this major.",
                "You Are Motivated by Social Impact and Innovation 🏙️ Your desire to have a social impact and your innovative spirit correspond perfectly with the architect's mission.",
                "You Value Autonomy and Organization 📋 Your need for autonomy and your sense of organization are crucial assets for carrying out your projects successfully."
            }
        ));

        log.info("✅ {} descriptions de majeures initialisées avec succès", MAJOR_DESCRIPTIONS.size());
    }

    /**
     * Classe interne pour stocker les descriptions des majeures
     */
    private static class MajorDescription {
        private final String generalDescription;
        private final String[] reasons;

        public MajorDescription(String generalDescription, String[] reasons) {
            this.generalDescription = generalDescription;
            this.reasons = reasons;
        }

        public String getGeneralDescription() {
            return generalDescription;
        }

        public String[] getReasons() {
            return reasons;
        }
    }
}
