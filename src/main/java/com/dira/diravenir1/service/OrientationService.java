package com.dira.diravenir1.service;

import com.dira.diravenir1.dto.*;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;
import java.time.LocalDateTime;

/**
 * Service principal pour le système d'orientation unifié
 * Implémente la logique de calcul des scores et de matching selon le document
 * 
 * NOTE: Les profils idéaux pour 36 majeures supplémentaires sont actuellement définis
 * avec des scores par défaut (50). Ces profils doivent être mis à jour avec les
 * vraies valeurs idéales pour un matching précis.
 */
@Service
public class OrientationService {

    // Profils idéaux des majeures (scores sur 100)
    private final Map<String, UserProfileDTO> idealMajors = new HashMap<>();

    // Base de données des étudiants (pour l'évolution future vers le ML)
    private final List<StudentProfile> studentDatabase = new ArrayList<>();
    
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
        architecture.setInteretSocialHumain(70);
        architecture.setInteretBusinessGestion(50);
        architecture.setInteretLogiqueAnalytique(80);
        architecture.setCompetenceResolutionProblemes(80);
        architecture.setCompetenceCommunication(85);
        architecture.setCompetenceOrganisation(85);
        architecture.setCompetenceManuelTechnique(85);
        architecture.setValeurImpactSocietal(85);
        architecture.setValeurInnovationChallenge(90);
        architecture.setValeurStabiliteSecurite(60);
        architecture.setValeurAutonomie(80);
        architecture.setPrefTravailEquipeCollab(80);
        architecture.setPrefTravailAutonome(70);
        architecture.setPrefPratiqueTerrain(70);
        architecture.setPrefTheorieRecherche(60);
        idealMajors.put("Architecture", architecture);
        
        // Ajouter les autres majeures avec des profils par défaut (à affiner)
        addDefaultMajor("Computer Science", 95, 60, 40, 50, 95, 95, 70, 75, 60, 60, 95, 70, 80, 70, 80, 60, 80);
        addDefaultMajor("Software Engineering", 90, 50, 40, 60, 90, 90, 75, 80, 65, 65, 90, 75, 75, 80, 70, 70, 75);
        addDefaultMajor("Artificial Intelligence", 95, 55, 35, 45, 95, 95, 70, 75, 60, 60, 95, 70, 80, 75, 80, 60, 85);
        addDefaultMajor("Business Administration", 40, 50, 80, 95, 70, 75, 90, 95, 30, 60, 70, 85, 70, 90, 60, 50, 40);
        addDefaultMajor("International Business", 45, 55, 85, 90, 75, 80, 95, 90, 35, 65, 75, 80, 75, 85, 65, 55, 45);
        addDefaultMajor("Marketing and Management", 50, 70, 80, 85, 75, 80, 90, 85, 40, 70, 80, 75, 70, 85, 60, 55, 50);
        addDefaultMajor("Finance", 80, 40, 60, 90, 85, 80, 75, 90, 50, 60, 75, 85, 80, 70, 80, 60, 70);
        addDefaultMajor("Economics", 85, 45, 65, 80, 90, 85, 80, 85, 45, 70, 75, 80, 85, 75, 85, 65, 80);
        addDefaultMajor("Psychology", 50, 60, 95, 40, 70, 75, 90, 70, 30, 95, 60, 60, 70, 85, 70, 40, 80);
        addDefaultMajor("Medicine", 80, 40, 95, 50, 85, 90, 90, 80, 85, 95, 70, 90, 60, 85, 70, 90, 70);
        addDefaultMajor("Nursing", 60, 45, 95, 40, 70, 75, 90, 75, 70, 95, 65, 75, 65, 90, 65, 75, 60);
        addDefaultMajor("Pharmacy", 85, 45, 80, 50, 85, 80, 80, 85, 60, 90, 70, 80, 70, 80, 70, 75, 75);
        addDefaultMajor("Dentistry", 80, 45, 85, 50, 85, 85, 80, 80, 85, 90, 70, 85, 65, 80, 70, 85, 70);
        addDefaultMajor("MBBS", 85, 40, 95, 50, 90, 90, 90, 85, 85, 95, 70, 90, 60, 85, 70, 90, 70);
        addDefaultMajor("Electrical Engineering", 90, 45, 35, 55, 90, 90, 70, 80, 75, 65, 90, 75, 80, 75, 75, 70, 75);
        addDefaultMajor("Chemical Engineering", 90, 50, 45, 60, 90, 85, 75, 85, 70, 70, 80, 80, 75, 80, 65, 75, 70);
        addDefaultMajor("Materials Science", 90, 55, 40, 55, 90, 85, 75, 80, 75, 70, 85, 75, 80, 75, 70, 75, 75);
        addDefaultMajor("Biomedical Engineering", 90, 50, 75, 55, 90, 85, 80, 80, 75, 90, 80, 80, 75, 80, 70, 80, 75);
        addDefaultMajor("Data Science", 95, 50, 45, 70, 95, 90, 75, 80, 60, 65, 90, 75, 85, 70, 85, 60, 85);
        addDefaultMajor("E-Commerce", 70, 75, 60, 85, 80, 75, 85, 80, 50, 65, 80, 75, 75, 80, 60, 65, 70);
        addDefaultMajor("Tourism Management", 50, 70, 85, 80, 70, 75, 90, 85, 45, 75, 70, 70, 70, 90, 60, 70, 55);
        addDefaultMajor("Public Relations", 45, 75, 90, 70, 70, 75, 95, 80, 40, 80, 75, 65, 75, 90, 65, 60, 60);
        addDefaultMajor("Applied Chemistry", 90, 50, 45, 55, 90, 85, 75, 80, 70, 70, 80, 80, 80, 75, 70, 75, 75);
        addDefaultMajor("English", 40, 85, 75, 50, 70, 75, 90, 70, 35, 75, 70, 60, 80, 75, 80, 45, 85);
        addDefaultMajor("International Politics", 60, 55, 85, 70, 80, 75, 90, 80, 40, 85, 75, 65, 75, 85, 70, 60, 75);
        addDefaultMajor("Science of Law", 80, 45, 75, 60, 90, 85, 90, 85, 50, 80, 70, 80, 80, 75, 80, 60, 85);
        addDefaultMajor("Psychology", 50, 60, 95, 40, 70, 75, 90, 70, 30, 95, 60, 60, 70, 85, 70, 40, 80);
        addDefaultMajor("Food Science", 85, 50, 60, 55, 85, 80, 75, 80, 70, 80, 75, 75, 75, 80, 65, 75, 70);
        addDefaultMajor("Hydraulic Engineering", 90, 45, 50, 60, 90, 85, 75, 85, 80, 80, 80, 80, 75, 80, 70, 80, 70);
        addDefaultMajor("Transportation Engineering", 85, 45, 55, 65, 85, 80, 75, 85, 75, 80, 75, 80, 75, 80, 70, 80, 70);
        addDefaultMajor("New Energy Engineering", 90, 50, 60, 55, 90, 85, 75, 80, 75, 85, 85, 75, 80, 75, 70, 80, 75);
        addDefaultMajor("Bioengineering", 90, 50, 75, 55, 90, 85, 80, 80, 75, 90, 80, 80, 75, 80, 70, 80, 75);
        addDefaultMajor("Biotechnology", 90, 50, 70, 55, 90, 85, 80, 80, 70, 90, 80, 80, 80, 75, 70, 80, 75);
        addDefaultMajor("Robot Engineering", 95, 60, 45, 55, 95, 90, 75, 80, 80, 70, 90, 75, 80, 75, 75, 70, 80);
        addDefaultMajor("Aeronautical Engineering", 95, 50, 40, 55, 95, 90, 75, 85, 80, 70, 90, 80, 80, 75, 75, 70, 75);
        addDefaultMajor("Aerospace Engineering", 95, 55, 45, 55, 95, 90, 75, 85, 80, 70, 90, 80, 80, 75, 75, 70, 80);
        addDefaultMajor("Safety Engineering", 85, 45, 70, 65, 85, 80, 80, 85, 70, 85, 75, 85, 75, 80, 70, 80, 70);
        addDefaultMajor("Mining Engineering", 90, 45, 50, 60, 90, 85, 75, 85, 80, 75, 75, 80, 80, 75, 75, 80, 70);
        addDefaultMajor("Petroleum Engineering", 90, 45, 45, 60, 90, 85, 75, 85, 80, 70, 75, 80, 80, 75, 75, 80, 70);
        addDefaultMajor("Electronic Engineering", 90, 50, 40, 55, 90, 90, 75, 80, 75, 65, 90, 75, 80, 75, 75, 70, 75);
    }

    private void addDefaultMajor(String name, int... scores) {
        UserProfileDTO major = new UserProfileDTO();
        
        // Initialiser tous les piliers à 0 par défaut
        major.setInteretScientifiqueTech(0);
        major.setInteretArtistiqueCreatif(0);
        major.setInteretSocialHumain(0);
        major.setInteretBusinessGestion(0);
        major.setInteretLogiqueAnalytique(0);
        major.setCompetenceResolutionProblemes(0);
        major.setCompetenceCommunication(0);
        major.setCompetenceOrganisation(0);
        major.setCompetenceManuelTechnique(0);
        major.setValeurImpactSocietal(0);
        major.setValeurInnovationChallenge(0);
        major.setValeurStabiliteSecurite(0);
        major.setValeurAutonomie(0);
        major.setPrefTravailEquipeCollab(0);
        major.setPrefTravailAutonome(0);
        major.setPrefPratiqueTerrain(0);
        major.setPrefTheorieRecherche(0);
        
        // Définir les scores fournis
        if (scores.length > 0) major.setInteretScientifiqueTech(scores[0]);
        if (scores.length > 1) major.setInteretArtistiqueCreatif(scores[1]);
        if (scores.length > 2) major.setInteretSocialHumain(scores[2]);
        if (scores.length > 3) major.setInteretBusinessGestion(scores[3]);
        if (scores.length > 4) major.setInteretLogiqueAnalytique(scores[4]);
        if (scores.length > 5) major.setCompetenceResolutionProblemes(scores[5]);
        if (scores.length > 6) major.setCompetenceCommunication(scores[6]);
        if (scores.length > 7) major.setCompetenceOrganisation(scores[7]);
        if (scores.length > 8) major.setCompetenceManuelTechnique(scores[8]);
        if (scores.length > 9) major.setValeurImpactSocietal(scores[9]);
        if (scores.length > 10) major.setValeurInnovationChallenge(scores[10]);
        if (scores.length > 11) major.setValeurStabiliteSecurite(scores[11]);
        if (scores.length > 12) major.setValeurAutonomie(scores[12]);
        if (scores.length > 13) major.setPrefTravailEquipeCollab(scores[13]);
        if (scores.length > 14) major.setPrefTravailAutonome(scores[14]);
        if (scores.length > 15) major.setPrefPratiqueTerrain(scores[15]);
        if (scores.length > 16) major.setPrefTheorieRecherche(scores[16]);
        
        idealMajors.put(name, major);
    }

    /**
     * Calcule l'orientation complète avec l'algorithme hybride évolutif
     */
    public OrientationResponseDTO calculateOrientation(OrientationRequestDTO request) {
        System.out.println("🧠 Service d'orientation: Début du calcul");
        
        try {
            // 1. Calculer le profil utilisateur
            UserProfileDTO userProfile = calculateUserProfile(request);
            System.out.println("✅ Profil utilisateur calculé: " + userProfile);
            
            // 2. Normaliser le profil
            normalizeProfile(userProfile);
            System.out.println("✅ Profil normalisé: " + userProfile);
            
            // 3. Calculer le top 3 des recommandations
            List<MajorRecommendationDTO> top3Recommendations = calculateAllRecommendations(userProfile);
            System.out.println("✅ Top 3 recommandations calculées: " + top3Recommendations.size() + " majeures");
            
            // 4. Générer le résumé personnalisé
            String summary = generateSummary(userProfile, top3Recommendations);
            System.out.println("✅ Résumé généré: " + summary);
            
            // 5. Créer la réponse
            OrientationResponseDTO response = new OrientationResponseDTO();
            response.setUserProfile(userProfile);
            response.setTop3Recommendations(top3Recommendations);
            response.setSummary(summary);
            
            System.out.println("🎯 Réponse finale créée avec " + top3Recommendations.size() + " recommandations");
            return response;
            
        } catch (Exception e) {
            System.err.println("❌ Erreur dans calculateOrientation: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Erreur lors du calcul de l'orientation: " + e.getMessage());
        }
    }
    
    /**
     * Calcule le profil utilisateur basé sur les réponses
     */
    private UserProfileDTO calculateUserProfile(OrientationRequestDTO request) {
        UserProfileDTO profile = new UserProfileDTO();
        
        // Question 1 - Activité idéale
        if ("A".equals(request.getQuestion1())) {
            profile.setInteretScientifiqueTech(profile.getInteretScientifiqueTech() + 5);
            profile.setInteretArtistiqueCreatif(profile.getInteretArtistiqueCreatif() + 3);
            profile.setValeurInnovationChallenge(profile.getValeurInnovationChallenge() + 4);
            profile.setCompetenceManuelTechnique(profile.getCompetenceManuelTechnique() + 2);
        } else if ("B".equals(request.getQuestion1())) {
            profile.setInteretScientifiqueTech(profile.getInteretScientifiqueTech() + 4);
            profile.setInteretLogiqueAnalytique(profile.getInteretLogiqueAnalytique() + 5);
            profile.setCompetenceResolutionProblemes(profile.getCompetenceResolutionProblemes() + 4);
            profile.setPrefTheorieRecherche(profile.getPrefTheorieRecherche() + 3);
        } else if ("C".equals(request.getQuestion1())) {
            profile.setInteretSocialHumain(profile.getInteretSocialHumain() + 5);
            profile.setValeurImpactSocietal(profile.getValeurImpactSocietal() + 5);
            profile.setCompetenceCommunication(profile.getCompetenceCommunication() + 4);
        } else if ("D".equals(request.getQuestion1())) {
            profile.setInteretBusinessGestion(profile.getInteretBusinessGestion() + 5);
            profile.setCompetenceOrganisation(profile.getCompetenceOrganisation() + 5);
            profile.setPrefTravailEquipeCollab(profile.getPrefTravailEquipeCollab() + 3);
        } else if ("E".equals(request.getQuestion1())) {
            profile.setInteretArtistiqueCreatif(profile.getInteretArtistiqueCreatif() + 5);
            profile.setValeurInnovationChallenge(profile.getValeurInnovationChallenge() + 2);
            profile.setPrefTravailAutonome(profile.getPrefTravailAutonome() + 3);
        }
        
        // Question 2 - Contenu internet/vidéos (sélection multiple)
        if (request.getQuestion2() != null) {
            for (String choice : request.getQuestion2()) {
                if ("A".equals(choice)) {
                    profile.setInteretScientifiqueTech(profile.getInteretScientifiqueTech() + 3);
                    profile.setValeurInnovationChallenge(profile.getValeurInnovationChallenge() + 2);
                } else if ("B".equals(choice)) {
                    profile.setInteretArtistiqueCreatif(profile.getInteretArtistiqueCreatif() + 3);
                } else if ("C".equals(choice)) {
                    profile.setInteretSocialHumain(profile.getInteretSocialHumain() + 3);
                    profile.setValeurImpactSocietal(profile.getValeurImpactSocietal() + 2);
                } else if ("D".equals(choice)) {
                    profile.setInteretBusinessGestion(profile.getInteretBusinessGestion() + 3);
                } else if ("E".equals(choice)) {
                    profile.setCompetenceOrganisation(profile.getCompetenceOrganisation() + 3);
                } else if ("F".equals(choice)) {
                    profile.setCompetenceManuelTechnique(profile.getCompetenceManuelTechnique() + 3);
                }
            }
        }
        
        // Question 3 - Section magasin
        if ("A".equals(request.getQuestion3())) {
            profile.setInteretScientifiqueTech(profile.getInteretScientifiqueTech() + 3);
            profile.setCompetenceManuelTechnique(profile.getCompetenceManuelTechnique() + 2);
        } else if ("B".equals(request.getQuestion3())) {
            profile.setInteretLogiqueAnalytique(profile.getInteretLogiqueAnalytique() + 3);
            profile.setPrefTheorieRecherche(profile.getPrefTheorieRecherche() + 2);
        } else if ("C".equals(request.getQuestion3())) {
            profile.setInteretArtistiqueCreatif(profile.getInteretArtistiqueCreatif() + 3);
        } else if ("D".equals(request.getQuestion3())) {
            profile.setInteretSocialHumain(profile.getInteretSocialHumain() + 3);
        } else if ("E".equals(request.getQuestion3())) {
            profile.setInteretBusinessGestion(profile.getInteretBusinessGestion() + 3);
            profile.setInteretArtistiqueCreatif(profile.getInteretArtistiqueCreatif() + 2);
        }
        
        // Question 4 - Réaction face à un problème
        if ("A".equals(request.getQuestion4())) {
            profile.setCompetenceResolutionProblemes(profile.getCompetenceResolutionProblemes() + 4);
            profile.setInteretLogiqueAnalytique(profile.getInteretLogiqueAnalytique() + 4);
        } else if ("B".equals(request.getQuestion4())) {
            profile.setInteretScientifiqueTech(profile.getInteretScientifiqueTech() + 3);
            profile.setInteretLogiqueAnalytique(profile.getInteretLogiqueAnalytique() + 3);
            profile.setPrefTheorieRecherche(profile.getPrefTheorieRecherche() + 2);
        } else if ("C".equals(request.getQuestion4())) {
            profile.setInteretArtistiqueCreatif(profile.getInteretArtistiqueCreatif() + 4);
            profile.setValeurInnovationChallenge(profile.getValeurInnovationChallenge() + 4);
        } else if ("D".equals(request.getQuestion4())) {
            profile.setCompetenceCommunication(profile.getCompetenceCommunication() + 4);
            profile.setPrefTravailEquipeCollab(profile.getPrefTravailEquipeCollab() + 4);
            profile.setInteretSocialHumain(profile.getInteretSocialHumain() + 2);
        }
        
        // Question 5 - Glisser-déposer (ordre de préférence)
        if (request.getQuestion5() != null) {
            for (int i = 0; i < request.getQuestion5().size(); i++) {
                String choice = request.getQuestion5().get(i);
                int points = 4 - i; // 1er = 4pts, 2e = 3pts, 3e = 2pts
                
                if ("A".equals(choice)) { // Gérer budget
                    profile.setInteretBusinessGestion(profile.getInteretBusinessGestion() + points);
                    profile.setCompetenceOrganisation(profile.getCompetenceOrganisation() + points);
                    profile.setInteretLogiqueAnalytique(profile.getInteretLogiqueAnalytique() + points);
                } else if ("B".equals(choice)) { // Organiser événement
                    profile.setCompetenceOrganisation(profile.getCompetenceOrganisation() + points);
                    profile.setPrefTravailEquipeCollab(profile.getPrefTravailEquipeCollab() + points);
                    profile.setCompetenceCommunication(profile.getCompetenceCommunication() + points);
                } else if ("C".equals(choice)) { // Écrire texte
                    profile.setCompetenceCommunication(profile.getCompetenceCommunication() + points);
                    profile.setInteretArtistiqueCreatif(profile.getInteretArtistiqueCreatif() + points);
                } else if ("D".equals(choice)) { // Réparer
                    profile.setCompetenceManuelTechnique(profile.getCompetenceManuelTechnique() + points);
                    profile.setInteretScientifiqueTech(profile.getInteretScientifiqueTech() + points);
                } else if ("E".equals(choice)) { // Dessiner
                    profile.setInteretArtistiqueCreatif(profile.getInteretArtistiqueCreatif() + points);
                    profile.setCompetenceManuelTechnique(profile.getCompetenceManuelTechnique() + points);
                } else if ("F".equals(choice)) { // Équation
                    profile.setInteretLogiqueAnalytique(profile.getInteretLogiqueAnalytique() + points);
                    profile.setInteretScientifiqueTech(profile.getInteretScientifiqueTech() + points);
                } else if ("G".equals(choice)) { // Convaincre
                    profile.setCompetenceCommunication(profile.getCompetenceCommunication() + points);
                    profile.setInteretBusinessGestion(profile.getInteretBusinessGestion() + points);
                } else if ("H".equals(choice)) { // Conseiller ami
                    profile.setInteretSocialHumain(profile.getInteretSocialHumain() + points);
                    profile.setCompetenceCommunication(profile.getCompetenceCommunication() + points);
                }
            }
        }
        
        // Question 6 - Apprentissage
        if ("A".equals(request.getQuestion6())) {
            profile.setPrefTheorieRecherche(profile.getPrefTheorieRecherche() + 4);
            profile.setInteretLogiqueAnalytique(profile.getInteretLogiqueAnalytique() + 3);
        } else if ("B".equals(request.getQuestion6())) {
            profile.setInteretScientifiqueTech(profile.getInteretScientifiqueTech() + 3);
        } else if ("C".equals(request.getQuestion6())) {
            profile.setCompetenceManuelTechnique(profile.getCompetenceManuelTechnique() + 4);
            profile.setPrefPratiqueTerrain(profile.getPrefPratiqueTerrain() + 4);
        } else if ("D".equals(request.getQuestion6())) {
            profile.setCompetenceCommunication(profile.getCompetenceCommunication() + 4);
            profile.setPrefTravailEquipeCollab(profile.getPrefTravailEquipeCollab() + 4);
        }
        
        // Question 7 - Impact dans le monde
        if ("A".equals(request.getQuestion7())) {
            profile.setValeurImpactSocietal(profile.getValeurImpactSocietal() + 5);
            profile.setInteretSocialHumain(profile.getInteretSocialHumain() + 4);
        } else if ("B".equals(request.getQuestion7())) {
            profile.setValeurInnovationChallenge(profile.getValeurInnovationChallenge() + 4);
            profile.setInteretScientifiqueTech(profile.getInteretScientifiqueTech() + 3);
        } else if ("C".equals(request.getQuestion7())) {
            profile.setInteretArtistiqueCreatif(profile.getInteretArtistiqueCreatif() + 5);
        } else if ("D".equals(request.getQuestion7())) {
            profile.setValeurImpactSocietal(profile.getValeurImpactSocietal() + 5);
            profile.setInteretSocialHumain(profile.getInteretSocialHumain() + 3);
        }
        
        // Question 8 - Environnement de travail
        if ("A".equals(request.getQuestion8())) {
            profile.setPrefTheorieRecherche(profile.getPrefTheorieRecherche() + 4);
            profile.setInteretScientifiqueTech(profile.getInteretScientifiqueTech() + 3);
        } else if ("B".equals(request.getQuestion8())) {
            profile.setPrefTravailEquipeCollab(profile.getPrefTravailEquipeCollab() + 4);
            profile.setInteretBusinessGestion(profile.getInteretBusinessGestion() + 2);
        } else if ("C".equals(request.getQuestion8())) {
            profile.setInteretArtistiqueCreatif(profile.getInteretArtistiqueCreatif() + 4);
            profile.setCompetenceManuelTechnique(profile.getCompetenceManuelTechnique() + 3);
        } else if ("D".equals(request.getQuestion8())) {
            profile.setPrefPratiqueTerrain(profile.getPrefPratiqueTerrain() + 4);
            profile.setCompetenceManuelTechnique(profile.getCompetenceManuelTechnique() + 3);
        } else if ("E".equals(request.getQuestion8())) {
            profile.setPrefTravailAutonome(profile.getPrefTravailAutonome() + 4);
            profile.setPrefTheorieRecherche(profile.getPrefTheorieRecherche() + 2);
        }
        
        // Question 9 - Curseurs (0-5)
        if (request.getQuestion9() != null) {
            Map<String, Integer> sliderValues = request.getQuestion9();
            if (sliderValues.get("A") != null) profile.setValeurStabiliteSecurite(profile.getValeurStabiliteSecurite() + sliderValues.get("A"));
            if (sliderValues.get("B") != null) profile.setValeurInnovationChallenge(profile.getValeurInnovationChallenge() + sliderValues.get("B"));
            if (sliderValues.get("C") != null) profile.setValeurAutonomie(profile.getValeurAutonomie() + sliderValues.get("C"));
            if (sliderValues.get("D") != null) profile.setInteretBusinessGestion(profile.getInteretBusinessGestion() + sliderValues.get("D"));
        }
        
        // Question 10 - Motivation principale
        if ("A".equals(request.getQuestion10())) {
            profile.setInteretLogiqueAnalytique(profile.getInteretLogiqueAnalytique() + 4);
            profile.setCompetenceResolutionProblemes(profile.getCompetenceResolutionProblemes() + 3);
        } else if ("B".equals(request.getQuestion10())) {
            profile.setPrefPratiqueTerrain(profile.getPrefPratiqueTerrain() + 4);
        } else if ("C".equals(request.getQuestion10())) {
            profile.setCompetenceCommunication(profile.getCompetenceCommunication() + 4);
            profile.setPrefTravailEquipeCollab(profile.getPrefTravailEquipeCollab() + 4);
        } else if ("D".equals(request.getQuestion10())) {
            profile.setInteretScientifiqueTech(profile.getInteretScientifiqueTech() + 4);
            profile.setValeurInnovationChallenge(profile.getValeurInnovationChallenge() + 4);
        }
        
        // Question 11 - Préférence de travail
        if ("A".equals(request.getQuestion11())) {
            profile.setPrefTravailAutonome(profile.getPrefTravailAutonome() + 5);
        } else if ("B".equals(request.getQuestion11())) {
            profile.setPrefTravailEquipeCollab(profile.getPrefTravailEquipeCollab() + 5);
        } else if ("C".equals(request.getQuestion11())) {
            profile.setInteretBusinessGestion(profile.getInteretBusinessGestion() + 3);
        }
        
        // Question 12 - Présentation/exposé
        if ("A".equals(request.getQuestion12())) {
            profile.setCompetenceCommunication(profile.getCompetenceCommunication() + 4);
            profile.setPrefTheorieRecherche(profile.getPrefTheorieRecherche() + 3);
        } else if ("B".equals(request.getQuestion12())) {
            profile.setInteretArtistiqueCreatif(profile.getInteretArtistiqueCreatif() + 4);
            profile.setCompetenceCommunication(profile.getCompetenceCommunication() + 3);
        } else if ("C".equals(request.getQuestion12())) {
            profile.setCompetenceCommunication(profile.getCompetenceCommunication() + 4);
            profile.setPrefTravailEquipeCollab(profile.getPrefTravailEquipeCollab() + 3);
        }
        
        // Question 13 - Prise de décision
        if ("A".equals(request.getQuestion13())) {
            profile.setInteretLogiqueAnalytique(profile.getInteretLogiqueAnalytique() + 4);
        } else if ("B".equals(request.getQuestion13())) {
            profile.setInteretArtistiqueCreatif(profile.getInteretArtistiqueCreatif() + 4);
        } else if ("C".equals(request.getQuestion13())) {
            profile.setCompetenceCommunication(profile.getCompetenceCommunication() + 3);
            profile.setPrefTravailEquipeCollab(profile.getPrefTravailEquipeCollab() + 3);
        }
        
        // Question 14 - Matières préférées (sélection multiple)
        if (request.getQuestion14() != null) {
            for (String choice : request.getQuestion14()) {
                if ("A".equals(choice)) { // Sciences
                    profile.setInteretScientifiqueTech(profile.getInteretScientifiqueTech() + 4);
                    profile.setInteretLogiqueAnalytique(profile.getInteretLogiqueAnalytique() + 3);
                } else if ("B".equals(choice)) { // Littérature et Langues
                    profile.setInteretArtistiqueCreatif(profile.getInteretArtistiqueCreatif() + 4);
                    profile.setCompetenceCommunication(profile.getCompetenceCommunication() + 3);
                } else if ("C".equals(choice)) { // Sciences Sociales
                    profile.setInteretSocialHumain(profile.getInteretSocialHumain() + 4);
                    profile.setValeurImpactSocietal(profile.getValeurImpactSocietal() + 3);
                } else if ("D".equals(choice)) { // Arts et Design
                    profile.setInteretArtistiqueCreatif(profile.getInteretArtistiqueCreatif() + 4);
                    profile.setCompetenceManuelTechnique(profile.getCompetenceManuelTechnique() + 3);
                } else if ("E".equals(choice)) { // Technologie et Informatique
                    profile.setInteretScientifiqueTech(profile.getInteretScientifiqueTech() + 4);
                    profile.setInteretLogiqueAnalytique(profile.getInteretLogiqueAnalytique() + 3);
                } else if ("F".equals(choice)) { // Gestion et Économie
                    profile.setInteretBusinessGestion(profile.getInteretBusinessGestion() + 4);
                    profile.setCompetenceOrganisation(profile.getCompetenceOrganisation() + 3);
                }
            }
        }
        
        return profile;
    }
    
    /**
     * Normalise tous les scores sur 100 selon le système du document
     */
    private UserProfileDTO normalizeProfile(UserProfileDTO profile) {
        UserProfileDTO normalized = new UserProfileDTO();
        
        // Scores maximaux pour chaque pilier selon le document
        Map<String, Integer> maxScores = new HashMap<>();
        maxScores.put("InteretScientifiqueTech", 21);
        maxScores.put("InteretArtistiqueCreatif", 21);
        maxScores.put("InteretSocialHumain", 20);
        maxScores.put("InteretBusinessGestion", 20);
        maxScores.put("InteretLogiqueAnalytique", 20);
        maxScores.put("CompetenceResolutionProblemes", 20);
        maxScores.put("CompetenceCommunication", 20);
        maxScores.put("CompetenceOrganisation", 20);
        maxScores.put("CompetenceManuelTechnique", 20);
        maxScores.put("ValeurImpactSocietal", 20);
        maxScores.put("ValeurInnovationChallenge", 17);
        maxScores.put("ValeurStabiliteSecurite", 20);
        maxScores.put("ValeurAutonomie", 20);
        maxScores.put("PrefTravailEquipeCollab", 20);
        maxScores.put("PrefTravailAutonome", 14);
        maxScores.put("PrefPratiqueTerrain", 20);
        maxScores.put("PrefTheorieRecherche", 20);
        
        // Normalisation avec réflexion
        normalized.setInteretScientifiqueTech(normalizeScore(profile.getInteretScientifiqueTech(), maxScores.get("InteretScientifiqueTech")));
        normalized.setInteretArtistiqueCreatif(normalizeScore(profile.getInteretArtistiqueCreatif(), maxScores.get("InteretArtistiqueCreatif")));
        normalized.setInteretSocialHumain(normalizeScore(profile.getInteretSocialHumain(), maxScores.get("InteretSocialHumain")));
        normalized.setInteretBusinessGestion(normalizeScore(profile.getInteretBusinessGestion(), maxScores.get("InteretBusinessGestion")));
        normalized.setInteretLogiqueAnalytique(normalizeScore(profile.getInteretLogiqueAnalytique(), maxScores.get("InteretLogiqueAnalytique")));
        normalized.setCompetenceResolutionProblemes(normalizeScore(profile.getCompetenceResolutionProblemes(), maxScores.get("CompetenceResolutionProblemes")));
        normalized.setCompetenceCommunication(normalizeScore(profile.getCompetenceCommunication(), maxScores.get("CompetenceCommunication")));
        normalized.setCompetenceOrganisation(normalizeScore(profile.getCompetenceOrganisation(), maxScores.get("CompetenceOrganisation")));
        normalized.setCompetenceManuelTechnique(normalizeScore(profile.getCompetenceManuelTechnique(), maxScores.get("CompetenceManuelTechnique")));
        normalized.setValeurImpactSocietal(normalizeScore(profile.getValeurImpactSocietal(), maxScores.get("ValeurImpactSocietal")));
        normalized.setValeurInnovationChallenge(normalizeScore(profile.getValeurInnovationChallenge(), maxScores.get("ValeurInnovationChallenge")));
        normalized.setValeurStabiliteSecurite(normalizeScore(profile.getValeurStabiliteSecurite(), maxScores.get("ValeurStabiliteSecurite")));
        normalized.setValeurAutonomie(normalizeScore(profile.getValeurAutonomie(), maxScores.get("ValeurAutonomie")));
        normalized.setPrefTravailEquipeCollab(normalizeScore(profile.getPrefTravailEquipeCollab(), maxScores.get("PrefTravailEquipeCollab")));
        normalized.setPrefTravailAutonome(normalizeScore(profile.getPrefTravailAutonome(), maxScores.get("PrefTravailAutonome")));
        normalized.setPrefPratiqueTerrain(normalizeScore(profile.getPrefPratiqueTerrain(), maxScores.get("PrefPratiqueTerrain")));
        normalized.setPrefTheorieRecherche(normalizeScore(profile.getPrefTheorieRecherche(), maxScores.get("PrefTheorieRecherche")));
        
        return normalized;
    }
    
    /**
     * Normalise un score individuel sur 100
     */
    private int normalizeScore(int rawScore, int maxScore) {
        if (maxScore == 0) return 0;
        int normalized = Math.min(100, Math.max(0, Math.round((float) rawScore / maxScore * 100)));
        return normalized;
    }
    
    /**
     * Calcule toutes les recommandations et retourne le top 3
     */
    private List<MajorRecommendationDTO> calculateAllRecommendations(UserProfileDTO userProfile) {
        List<MajorRecommendationDTO> allRecommendations = new ArrayList<>();
        
        // Calculer le score pour chaque majeure
        for (Map.Entry<String, UserProfileDTO> entry : idealMajors.entrySet()) {
            String majorName = entry.getKey();
            UserProfileDTO idealMajor = entry.getValue();
            
            // Calculer le score de correspondance avec l'algorithme hybride évolutif
            double matchingScore = calculateWeightedSimilarity(userProfile, idealMajor);
            
            // Créer la recommandation avec description complète
            MajorRecommendationDTO recommendation = new MajorRecommendationDTO();
            recommendation.setName(majorName);
            recommendation.setMatchingScore((int) Math.round(matchingScore));
            recommendation.setDescription(generateMajorDescription(majorName));
            recommendation.setExplanation(generatePersonalizedExplanation(majorName, userProfile));
            
            allRecommendations.add(recommendation);
        }
        
        // Trier par score décroissant et prendre le top 3
        allRecommendations.sort((a, b) -> Integer.compare(b.getMatchingScore(), a.getMatchingScore()));
        
        // Retourner seulement le top 3
        return allRecommendations.subList(0, Math.min(3, allRecommendations.size()));
    }
    
    /**
     * Algorithme hybride évolutif : Combine similarité pondérée + bonus intelligents
     */
    private double calculateHybridMatchingScore(UserProfileDTO userProfile, UserProfileDTO majorProfile) {
        // 1. Similarité pondérée de base
        double similarity = calculateWeightedSimilarity(userProfile, majorProfile);
        
        // 2. Bonus pour correspondances parfaites (≥80%)
        double perfectMatchBonus = calculatePerfectMatchBonus(userProfile, majorProfile);
        
        // 3. Bonus pour forces dominantes (≥90%)
        double dominantStrengthBonus = calculateDominantStrengthBonus(userProfile);
        
        // 4. Score final
        double finalScore = (similarity * 100) + perfectMatchBonus + dominantStrengthBonus;
        
        // Limiter à 100%
        return Math.min(100.0, Math.max(0.0, finalScore));
    }
    
    /**
     * Calcule la similarité pondérée de base
     */
    private double calculateWeightedSimilarity(UserProfileDTO userProfile, UserProfileDTO majorProfile) {
        double sumProducts = 0.0;
        double sumSquares = 0.0;
        
        // Produits des scores pondérés
        sumProducts += userProfile.getInteretScientifiqueTech() * majorProfile.getInteretScientifiqueTech();
        sumProducts += userProfile.getInteretArtistiqueCreatif() * majorProfile.getInteretArtistiqueCreatif();
        sumProducts += userProfile.getInteretSocialHumain() * majorProfile.getInteretSocialHumain();
        sumProducts += userProfile.getInteretBusinessGestion() * majorProfile.getInteretBusinessGestion();
        sumProducts += userProfile.getInteretLogiqueAnalytique() * majorProfile.getInteretLogiqueAnalytique();
        sumProducts += userProfile.getCompetenceResolutionProblemes() * majorProfile.getCompetenceResolutionProblemes();
        sumProducts += userProfile.getCompetenceCommunication() * majorProfile.getCompetenceCommunication();
        sumProducts += userProfile.getCompetenceOrganisation() * majorProfile.getCompetenceOrganisation();
        sumProducts += userProfile.getCompetenceManuelTechnique() * majorProfile.getCompetenceManuelTechnique();
        sumProducts += userProfile.getValeurImpactSocietal() * majorProfile.getValeurImpactSocietal();
        sumProducts += userProfile.getValeurInnovationChallenge() * majorProfile.getValeurInnovationChallenge();
        sumProducts += userProfile.getValeurStabiliteSecurite() * majorProfile.getValeurStabiliteSecurite();
        sumProducts += userProfile.getValeurAutonomie() * majorProfile.getValeurAutonomie();
        sumProducts += userProfile.getPrefTravailEquipeCollab() * majorProfile.getPrefTravailEquipeCollab();
        sumProducts += userProfile.getPrefTravailAutonome() * majorProfile.getPrefTravailAutonome();
        sumProducts += userProfile.getPrefPratiqueTerrain() * majorProfile.getPrefPratiqueTerrain();
        sumProducts += userProfile.getPrefTheorieRecherche() * majorProfile.getPrefTheorieRecherche();
        
        // Carrés des scores idéaux
        sumSquares += Math.pow(majorProfile.getInteretScientifiqueTech(), 2);
        sumSquares += Math.pow(majorProfile.getInteretArtistiqueCreatif(), 2);
        sumSquares += Math.pow(majorProfile.getInteretSocialHumain(), 2);
        sumSquares += Math.pow(majorProfile.getInteretBusinessGestion(), 2);
        sumSquares += Math.pow(majorProfile.getInteretLogiqueAnalytique(), 2);
        sumSquares += Math.pow(majorProfile.getCompetenceResolutionProblemes(), 2);
        sumSquares += Math.pow(majorProfile.getCompetenceCommunication(), 2);
        sumSquares += Math.pow(majorProfile.getCompetenceOrganisation(), 2);
        sumSquares += Math.pow(majorProfile.getCompetenceManuelTechnique(), 2);
        sumSquares += Math.pow(majorProfile.getValeurImpactSocietal(), 2);
        sumSquares += Math.pow(majorProfile.getValeurInnovationChallenge(), 2);
        sumSquares += Math.pow(majorProfile.getValeurStabiliteSecurite(), 2);
        sumSquares += Math.pow(majorProfile.getValeurAutonomie(), 2);
        sumSquares += Math.pow(majorProfile.getPrefTravailEquipeCollab(), 2);
        sumSquares += Math.pow(majorProfile.getPrefTravailAutonome(), 2);
        sumSquares += Math.pow(majorProfile.getPrefPratiqueTerrain(), 2);
        sumSquares += Math.pow(majorProfile.getPrefTheorieRecherche(), 2);
        
        return sumProducts / sumSquares;
    }
    
    /**
     * Calcule le bonus pour les correspondances parfaites (≥80%)
     */
    private double calculatePerfectMatchBonus(UserProfileDTO userProfile, UserProfileDTO majorProfile) {
        double bonus = 0.0;
        
        // Vérifier chaque pilier pour des correspondances parfaites
        if (userProfile.getInteretArtistiqueCreatif() >= 80 && majorProfile.getInteretArtistiqueCreatif() >= 80) bonus += 5.0;
        if (userProfile.getInteretSocialHumain() >= 80 && majorProfile.getInteretSocialHumain() >= 80) bonus += 5.0;
        if (userProfile.getCompetenceCommunication() >= 80 && majorProfile.getCompetenceCommunication() >= 80) bonus += 5.0;
        if (userProfile.getValeurInnovationChallenge() >= 80 && majorProfile.getValeurInnovationChallenge() >= 80) bonus += 5.0;
        if (userProfile.getPrefTravailAutonome() >= 80 && majorProfile.getPrefTravailAutonome() >= 80) bonus += 5.0;
        
        return bonus;
    }
    
    /**
     * Calcule le bonus pour les forces dominantes (≥90%)
     */
    private double calculateDominantStrengthBonus(UserProfileDTO userProfile) {
        double bonus = 0.0;
        
        // Bonus pour les scores exceptionnels
        if (userProfile.getInteretArtistiqueCreatif() >= 90) bonus += 3.0;
        if (userProfile.getInteretScientifiqueTech() >= 90) bonus += 3.0;
        if (userProfile.getInteretLogiqueAnalytique() >= 90) bonus += 3.0;
        if (userProfile.getCompetenceCommunication() >= 90) bonus += 3.0;
        if (userProfile.getValeurInnovationChallenge() >= 90) bonus += 3.0;
        
        return bonus;
    }

    /**
     * Calcule la différence absolue entre deux scores de pilier
     */
    private double getPillarDifference(int userScore, int majorScore) {
        return Math.abs(userScore - majorScore);
    }

    /**
     * Génère une explication personnalisée pour la majeure
     */
    private String generateExplanation(UserProfileDTO userProfile, UserProfileDTO majorProfile, String majorName) {
        Map<String, String> explanations = new HashMap<>();
        
        explanations.put("Civil Engineering", "You Are a Natural Problem-Solver 🔧 Your passion for technical challenges and your aptitude for manual work will give you a head start in this field. You Thrive on Structure and Precision 📐 Your sense of organization and analytical rigor are major assets for managing large-scale projects. You Are Driven to Make a Lasting Impact 🌍 This major aligns with your desire to have a concrete social impact by building the foundations of tomorrow's world.");
        
        explanations.put("Mechanical Engineering", "You Have a Strong Analytical Mind 🧠 Your analytical profile and your interest in science and technology will allow you to solve the most complex problems. You Excel at Bringing Ideas to Life 🛠️ Your talent for manual and technical work is essential for bringing your creations to life. You Possess a Deep Drive to Innovate 💡 Your desire to innovate and your curious mind are the driving forces that will help you excel in this field.");
        
        explanations.put("Architecture", "Your Creativity Is Your Superpower 🎨 Your very strong creativity and your passion for art are at the heart of this major. You Are Motivated by Social Impact and Innovation 🏙️ Your desire to have a social impact and your innovative spirit correspond perfectly with the architect's mission. You Value Autonomy and Organization 📋 Your need for autonomy and your sense of organization are crucial assets for carrying out your projects successfully.");
        
        explanations.put("Computer Science", "Your Logical Mind Is Built for Technology 💻 Your logical and analytical mind and your interest in technology are the pillars of this field. You Are a Problem-Solver and Innovator ✨ Your talent for complex problem-solving and your thirst for innovation will lead you to excel. You Thrive on Autonomy and Theoretical Work 🧠 Your need for autonomy and your taste for theoretical research are key qualities for programming and algorithm design.");
        
        explanations.put("Business Administration", "You Have a Talent for Organization and Leadership 📈 Your talent for organization and your desire to manage projects are central to this field. You Are a Collaborative Communicator 🤝 Your ease with communication and your ability to work in a team are major assets for leadership. You Are Eager to Make an Impact through Management 🎯 Your interest in business strategies and your desire to have an impact through management perfectly match this major.");
        
        explanations.put("Psychology", "You Are a Natural Communicator with a Social Interest 🗣️ Your interest in social and human interaction and your ease with communication are essential qualities. You Are an Analytical and Autonomous Theorist 🧠 Your analytical mind and your preference for autonomous work and theoretical research will allow you to delve into the complex concepts of the human mind. You Are Driven to Promote Social Justice ⚖️ Your motivation to promote social justice and your ability to solve problems are major assets.");
        
        explanations.put("Medicine", "Your Scientific and Logical Mind Is a Perfect Match 🔬 Your scientific and logical mind is the foundation of this demanding field. You Are a Dedicated Team Player Who Wants to Help Others 🩺 Your desire to have a direct social impact and your ability to work in a team are fundamental human qualities for the practice of medicine. Your Rigor and Problem-Solving Skills Will Make You Excel 🧠 Your rigor and your talent for problem-solving will lead you to excel in this vocation.");
        
        explanations.put("Environmental Science", "Your Scientific Mind Is Your Foundation 🌱 Your scientific and analytical profile is the basis of this field. You Are Driven to Innovate for a Better World 🌍 Your desire to have a strong social impact and to innovate for a better world will motivate you every day. You Are a Practical, Hands-On Problem-Solver 🛠️ Your preference for practical work and problem-solving is a major asset for this discipline.");
        
        explanations.put("International Business", "You Are a Skilled Communicator and Negotiator 🗣️ Your ease with communication and your talent for negotiation are fundamental skills for success in the world of international business. You Have a Strategic and Analytical Mind 📊 Your analytical mind and your sense of management will enable you to navigate the complex challenges of global trade. You Are an Autonomous Innovator 🚀 Your need for autonomy and your desire to innovate pair well with the flexibility and strategic vision required in this field.");
        
        explanations.put("International Economics and Trade", "You Have a Strong Logical and Analytical Mind 🧐 Your very strong logic and your interest in economic news are the foundation of this major. You Want to Make a Global Societal Impact 🌐 Your desire to have a societal impact and your capacity for analysis will enable you to navigate the challenges of global trade. You Enjoy Theoretical Research and Independent Work 📚 Your preference for theoretical research and your autonomous spirit are essential qualities for economic modeling.");
        
        explanations.put("Marketing and Management", "Your Communication and Creativity Set You Apart 🗣️ Your ease with communication and your very strong creativity are the driving forces of this field. You Excel at Organized and Collaborative Work 🤝 Your sense of organization and your ability to work in a team are major assets for managing projects and teams. You Are Driven by Innovation and Challenges 💡 Your desire to innovate and take on challenges is a prerequisite for standing out in this dynamic field.");
        
        explanations.put("Software Engineering", "Your Analytical Mind Is an Ideal Fit 🤖 Your logical and analytical mind combined with your interest in technology makes you an ideal candidate. You Excel at Solving Problems and Organizing Projects 📋 Your talent for problem-solving and your sense of organization are essential for managing development projects. You Are a Strong Team Player and Communicator 💬 Your strong preference for teamwork and communication are major assets in a field that relies on collaboration.");
        
        explanations.put("Artificial Intelligence", "Your Logical Mind Is a Perfect Foundation 🧠 Your incredible logical and analytical mind is the foundation of this discipline. You Are Driven by a Thirst for Innovation 🚀 Your thirst for innovation and your desire to take on challenges are major assets for breaking into this field. You Excel at Theoretical and Independent Work 🧪 Your preference for theoretical research and autonomous work will allow you to immerse yourself in the complex concepts of AI.");
        
        explanations.put("Tourism Management", "You Are a Natural Communicator 🗣️ Your ease with communication and your interest in social interaction are the pillars of this major. You Have a Gift for Organization and Project Management 🗓️ Your great sense of organization and your ability to manage projects are fundamental skills. You Find Fulfillment in Hands-On Work 🗺️ Your desire to have a positive impact on people and your preference for practical work align perfectly with the reality of tourism.");
        
        explanations.put("Nursing", "You Are a Compassionate and Empathetic Person ❤️‍🩹 Your interest in social and human interaction and your desire to have a direct social impact make you an ideal candidate. You Are a Collaborative and Effective Communicator 🤝 Your ease with communication and your preference for teamwork are absolutely essential in the medical field. You Have a Talent for Hands-On Practice 💉 Your taste for hands-on practice and manual work are essential qualities for daily technical tasks.");
        
        explanations.put("Pharmacy", "You Possess a Strong Scientific and Analytical Mind 🔬 Your scientific and analytical mind is the basis of pharmacy. You Are Rigorous and Highly Organized 📋 Your strong sense of organization and your rigor are indispensable for inventory management and protocol application. You Are a Team Player with a Desire to Help 💊 Your desire to have a societal impact and your preference for teamwork are essential qualities for advising patients and collaborating with the medical staff.");
        
        explanations.put("Electrical Engineering", "Your Scientific and Logical Profile Is a Major Asset 💡 Your scientific and logical profile is an undeniable asset in this field. You Are Driven by Innovation and Practical Work 🛠️ Your desire to innovate and your taste for practical work will lead you to create the technologies of tomorrow. You Are a Collaborative Problem-Solver 🤝 Your talent for problem-solving and your preference for teamwork are key qualities for success.");
        
        explanations.put("Food Science and Engineering", "Your Logical and Scientific Mind is a Key Strength 🧬 Your scientific mind and logic are essential for understanding the biological and chemical processes of food. You Have a Talent for Hands-On, Organized Work 🧑‍🍳 Your sense of organization and your taste for practical work are major assets for product development and quality control. You Are Driven to Create a Concrete Social Impact 🍎 This major aligns with your desire to have a concrete social impact by ensuring healthy and sustainable food for all.");
        
        explanations.put("Finance", "You Have a Strong Logical Mind and Strategic Interest 💹 Your very strong logic and your interest in business strategies are the foundations of this field. You Are Organized and Meticulous with Details 📈 Your excellent sense of organization and your rigor are indispensable for risk management and data analysis. You Are an Autonomous, Challenge-Driven Person 🚀 Your desire for challenges and your need for autonomy are qualities that will make you excel in this environment.");
        
        explanations.put("Mechanical Design, Manufacturing and Automation", "This major is the meeting point of creativity and production. It allows you to design machines and systems, while mastering CAD tools, robotics, and manufacturing processes to automate industry.");
        
        explanations.put("Science of Law", "The Science of Law is the foundation of justice. It requires great logical rigor and a capacity for complex text analysis, preparing you to defend rights and promote justice.");
        
        explanations.put("International Politics", "International Politics is a major for those who want to understand and influence relations between nations. It gives you the keys to analyze conflicts, foreign policies, and international organizations.");
        
        explanations.put("MBBS (Bachelor of Medicine, Bachelor of Surgery)", "MBBS is the path to medicine. It is a demanding field that prepares you to diagnose, treat, and prevent diseases, dedicating yourself to the health and well-being of others.");
        
        explanations.put("Public Relations", "Public Relations is the art of building and maintaining a good image. This major teaches you how to manage an organization's reputation, interact with the media, and create impactful campaigns.");
        
        explanations.put("Applied Chemistry", "Applied Chemistry is the major for scientific minds who want to transform the physical world. It uses the principles of chemistry to solve practical problems, by developing new medicines, creating innovative materials, or purifying the environment.");
        
        explanations.put("English", "The English major is for those passionate about literature, languages, and culture. It allows you to explore the richness of language and thought to develop critical thinking and persuasive communication.");
        
        explanations.put("Dentistry", "Dentistry is a health science focused on the mouth and teeth. It combines sharp scientific knowledge with great dexterity to diagnose and treat oral diseases.");
        
        explanations.put("New Energy Science and Engineering", "This major is the future of energy. It prepares you to design, develop, and implement sustainable energy systems for a cleaner and more efficient world.");
        
        explanations.put("Hydraulic Engineering", "Hydraulic Engineering is the science of water management. This major offers you the opportunity to solve crucial problems for society, by designing dams or water management systems for irrigation and power generation.");
        
        explanations.put("Transportation Engineering", "Transportation Engineering is an essential major for the development of cities. It teaches you how to design road, rail, and airport networks to improve mobility and create sustainable infrastructure for the population.");
        
        explanations.put("Bioengineering", "Bioengineering is the convergence of engineering and biology. It applies the principles of engineering to solve medical and biological problems, by designing prostheses, medical implants, or new treatment technologies.");
        
        explanations.put("Biotechnology", "Biotechnology uses living organisms to create new products and technologies. This major is for those who want to push the boundaries of science to solve global problems in genetics, microbiology, or biochemistry.");
        
        explanations.put("Materials Science and Engineering", "Materials Science and Engineering is the discipline that gives life to the objects around us. This major allows you to understand the structure of materials and to design new ones, lighter and more efficient, for applications in aerospace, medicine, or electronics.");
        
        explanations.put("E-Commerce", "E-Commerce is the engine of modern commerce. This major will give you the keys to create and manage online stores by mastering digital marketing, logistics, and data analysis.");
        
        explanations.put("Robot Engineering", "Robot Engineering is the convergence of computer science, mechanics, and electronics. It is the major for creative and analytical minds who want to design and build intelligent robots.");
        
        explanations.put("Biomedical Engineering", "Biomedical Engineering is the link between engineering and medicine. It applies the principles of engineering to solve clinical problems and improve human health.");
        
        explanations.put("Data Science", "Data Science is the discipline that makes sense of massive amounts of information. This major allows you to extract knowledge from data to predict trends and make informed decisions.");
        
        explanations.put("Economics", "Economics is the science that studies the production, distribution, and consumption of wealth. It gives you the tools to analyze markets and public policies, and to solve social and economic problems using data and logic.");
        
        explanations.put("Chemical Engineering", "Chemical Engineering is the major that transforms science into production. You will learn to design processes to produce chemicals, fuels, plastics, or medicines on a large scale.");
        
        explanations.put("Petroleum Engineering", "Petroleum Engineering is the major that immerses you in the heart of the energy industry. You will study the techniques of exploration, extraction, and processing of oil and gas.");
        
        explanations.put("Electronic and Information Engineering", "This major is at the heart of the digital revolution. It allows you to design electronic chips, communication systems, and information technologies to create the innovations of tomorrow.");
        
        explanations.put("Safety Engineering", "Safety Engineering is the discipline that protects people and property. This major teaches you to design safe systems and environments by analyzing risks and developing protocols.");
        
        explanations.put("Mining Engineering", "Mining Engineering is essential for the extraction of Earth's resources. It teaches you to design mines, manage operations, and ensure safety in demanding environments.");
        
        explanations.put("Aeronautical Engineering", "Aeronautical Engineering is the science of flight. This major prepares you to design, develop, and test airplanes and helicopters, applying the principles of mechanics, physics, and electronics.");
        
        explanations.put("Aerospace Engineering", "Aerospace Engineering is the major for those who want to explore space. It is a discipline that goes beyond the Earth's atmosphere, designing rockets, satellites, and spacecraft.");
        
        return explanations.getOrDefault(majorName, "Votre profil équilibré correspond bien aux exigences de " + majorName + ".");
    }

    /**
     * Retourne la description d'une majeure
     */
    private String getMajorDescription(String majorName) {
        Map<String, String> descriptions = new HashMap<>();
        descriptions.put("Civil Engineering", "Civil Engineering is a field focused on the design and construction of infrastructure. It combines scientific theory with practical application to create the bridges, roads, and buildings that shape our environment.");
        descriptions.put("Mechanical Engineering", "Mechanical Engineering is the heart of industrial innovation. It covers the design, analysis, and manufacturing of mechanical systems, from car engines to industrial robots, using physics and mathematics to create efficient and sustainable solutions.");
        descriptions.put("Architecture", "Architecture is the discipline that shapes our built environment. It combines artistic creativity with engineering rigor to design functional, aesthetic, and environmentally friendly spaces.");
        descriptions.put("Computer Science", "Computer Science is the science that studies computers and their applications. This major explores programming, artificial intelligence, and network security to design the technologies of tomorrow.");
        descriptions.put("Business Administration", "Business Administration is the ideal major for leading organizations. You will learn the fundamental principles of management, finance, marketing, and human resources to make strategic decisions.");
        descriptions.put("Psychology", "Psychology is the study of the mind and human behavior. This major teaches you to analyze behaviors, conduct research, and help individuals improve their well-being.");
        descriptions.put("Medicine", "Medicine is a noble path for those who want to dedicate their lives to the health and well-being of others. This major gives you a deep understanding of the human body and its diseases.");
        descriptions.put("Environmental Science", "Environmental Science focuses on understanding and solving environmental challenges. This major combines scientific research with practical solutions for sustainability and conservation.");
        descriptions.put("International Business", "International Business prepares you to become a player in global markets. This major focuses on the economic, legal, and cultural aspects of cross-border trade, and teaches you how to operate in a complex international environment.");
        descriptions.put("International Economics and Trade", "This major allows you to understand the forces that drive the global economy. It combines economic theory with the realities of international trade to solve complex problems on a planetary scale.");
        descriptions.put("Marketing and Management", "Marketing and Management are at the core of business growth. This major teaches you to understand consumer behavior, design impactful campaigns, and lead teams.");
        descriptions.put("Software Engineering", "Software Engineering is the art and science of designing, developing, and maintaining quality software. It is the ideal major for building reliable and efficient computer systems.");
        descriptions.put("Artificial Intelligence", "Artificial Intelligence is the frontier of technological innovation. This major explores machine learning and deep learning to design systems capable of solving complex problems autonomously.");
        descriptions.put("Tourism Management", "Tourism Management is a major that combines the commercial aspect with strong customer service. It teaches you how to organize trips and promote destinations to create memorable experiences for others.");
        descriptions.put("Nursing", "Nursing is a calling. It's a major for those with deep empathy and a desire to help others, working in a team to ensure the well-being of patients.");
        descriptions.put("Pharmacy", "Pharmacy is the major for scientific minds who want to contribute to people's health through the science of medicine. It explores chemistry, biology, and the mechanisms of drug action.");
        descriptions.put("Electrical Engineering", "Electrical Engineering is the driving force of modern technology. This major allows you to design electrical and electronic systems for everything from phones to power grids.");
        descriptions.put("Food Science and Engineering", "Food Science and Engineering is the meeting point of science and gastronomy. This major allows you to understand the composition of food and ensure its safety and quality, by developing new products and sustainable production methods.");
        descriptions.put("Finance", "Finance is the major for analytical and ambitious minds. This field gives you the keys to understand and influence the economic world, by managing assets and evaluating risks.");
        descriptions.put("Mechanical Design, Manufacturing and Automation", "This major is the meeting point of creativity and production. It allows you to design machines and systems, while mastering CAD tools, robotics, and manufacturing processes to automate industry.");
        descriptions.put("Science of Law", "The Science of Law is the foundation of justice. It requires great logical rigor and a capacity for complex text analysis, preparing you to defend rights and promote justice.");
        descriptions.put("International Politics", "International Politics is a major for those who want to understand and influence relations between nations. It gives you the keys to analyze conflicts, foreign policies, and international organizations.");
        descriptions.put("MBBS (Bachelor of Medicine, Bachelor of Surgery)", "MBBS is the path to medicine. It is a demanding field that prepares you to diagnose, treat, and prevent diseases, dedicating yourself to the health and well-being of others.");
        descriptions.put("Public Relations", "Public Relations is the art of building and maintaining a good image. This major teaches you how to manage an organization's reputation, interact with the media, and create impactful campaigns.");
        descriptions.put("Applied Chemistry", "Applied Chemistry is the major for scientific minds who want to transform the physical world. It uses the principles of chemistry to solve practical problems, by developing new medicines, creating innovative materials, or purifying the environment.");
        descriptions.put("English", "The English major is for those passionate about literature, languages, and culture. It allows you to explore the richness of language and thought to develop critical thinking and persuasive communication.");
        descriptions.put("Dentistry", "Dentistry is a health science focused on the mouth and teeth. It combines sharp scientific knowledge with great dexterity to diagnose and treat oral diseases.");
        descriptions.put("New Energy Science and Engineering", "This major is the future of energy. It prepares you to design, develop, and implement sustainable energy systems for a cleaner and more efficient world.");
        descriptions.put("Hydraulic Engineering", "Hydraulic Engineering is the science of water management. This major offers you the opportunity to solve crucial problems for society, by designing dams or water management systems for irrigation and power generation.");
        descriptions.put("Transportation Engineering", "Transportation Engineering is an essential major for the development of cities. It teaches you how to design road, rail, and airport networks to improve mobility and create sustainable infrastructure for the population.");
        descriptions.put("Bioengineering", "Bioengineering is the convergence of engineering and biology. It applies the principles of engineering to solve medical and biological problems, by designing prostheses, medical implants, or new treatment technologies.");
        descriptions.put("Biotechnology", "Biotechnology uses living organisms to create new products and technologies. This major is for those who want to push the boundaries of science to solve global problems in genetics, microbiology, or biochemistry.");
        descriptions.put("Materials Science and Engineering", "Materials Science and Engineering is the discipline that gives life to the objects around us. This major allows you to understand the structure of materials and to design new ones, lighter and more efficient, for applications in aerospace, medicine, or electronics.");
        descriptions.put("E-Commerce", "E-Commerce is the engine of modern commerce. This major will give you the keys to create and manage online stores by mastering digital marketing, logistics, and data analysis.");
        descriptions.put("Robot Engineering", "Robot Engineering is the convergence of computer science, mechanics, and electronics. It is the major for creative and analytical minds who want to design and build intelligent robots.");
        descriptions.put("Biomedical Engineering", "Biomedical Engineering is the link between engineering and medicine. It applies the principles of engineering to solve clinical problems and improve human health.");
        descriptions.put("Data Science", "Data Science is the discipline that makes sense of massive amounts of information. This major allows you to extract knowledge from data to predict trends and make informed decisions.");
        descriptions.put("Economics", "Economics is the science that studies the production, distribution, and consumption of wealth. It gives you the tools to analyze markets and public policies, and to solve social and economic problems using data and logic.");
        descriptions.put("Chemical Engineering", "Chemical Engineering is the major that transforms science into production. You will learn to design processes to produce chemicals, fuels, plastics, or medicines on a large scale.");
        descriptions.put("Petroleum Engineering", "Petroleum Engineering is the major that immerses you in the heart of the energy industry. You will study the techniques of exploration, extraction, and processing of oil and gas.");
        descriptions.put("Electronic and Information Engineering", "This major is at the heart of the digital revolution. It allows you to design electronic chips, communication systems, and information technologies to create the innovations of tomorrow.");
        descriptions.put("Safety Engineering", "Safety Engineering is the discipline that protects people and property. This major teaches you to design safe systems and environments by analyzing risks and developing protocols.");
        descriptions.put("Mining Engineering", "Mining Engineering is essential for the extraction of Earth's resources. It teaches you to design mines, manage operations, and ensure safety in demanding environments.");
        descriptions.put("Aeronautical Engineering", "Aeronautical Engineering is the science of flight. This major prepares you to design, develop, and test airplanes and helicopters, applying the principles of mechanics, physics, and electronics.");
        descriptions.put("Aerospace Engineering", "Aerospace Engineering is the major for those who want to explore space. It is a discipline that goes beyond the Earth's atmosphere, designing rockets, satellites, and spacecraft.");
        
        return descriptions.getOrDefault(majorName, "Majeure académique");
    }

    /**
     * Génère un résumé des résultats
     */
    private String generateSummary(UserProfileDTO userProfile, List<MajorRecommendationDTO> top3) {
        if (top3.isEmpty()) return "Aucune recommandation disponible.";
        
        String topMajor = top3.get(0).getName();
        int topScore = top3.get(0).getMatchingScore();
        
        return String.format("Votre meilleure correspondance est %s avec un score de %d%%. " +
                           "Vos points forts incluent la créativité artistique (%d%%) et l'autonomie (%d%%).",
                           topMajor, topScore, 
                           userProfile.getInteretArtistiqueCreatif(),
                           userProfile.getPrefTravailAutonome());
    }

    /**
     * Sauvegarde le profil d'un étudiant pour l'apprentissage futur (ML)
     */
    private void saveStudentProfile(UserProfileDTO profile, String chosenMajor) {
        studentDatabase.add(new StudentProfile(profile, chosenMajor));
    }

    /**
     * Retourne toutes les majeures disponibles
     */
    public List<MajorRecommendationDTO> getAllMajors() {
        List<MajorRecommendationDTO> majors = new ArrayList<>();
        
        // List of all 44 majors
        String[] allMajorNames = {
            "Civil Engineering", "Mechanical Engineering", "Architecture", "Computer Science",
            "Business Administration", "Psychology", "Medicine", "Environmental Science",
            "International Business", "International Economics and Trade", "Marketing and Management",
            "Software Engineering", "Artificial Intelligence", "Tourism Management", "Nursing",
            "Pharmacy", "Electrical Engineering", "Food Science and Engineering", "Finance",
            "Mechanical Design, Manufacturing and Automation", "Science of Law", "International Politics",
            "MBBS (Bachelor of Medicine, Bachelor of Surgery)", "Public Relations", "Applied Chemistry",
            "English", "Dentistry", "New Energy Science and Engineering", "Hydraulic Engineering",
            "Transportation Engineering", "Bioengineering", "Biotechnology", "Materials Science and Engineering",
            "E-Commerce", "Robot Engineering", "Biomedical Engineering", "Data Science", "Economics",
            "Chemical Engineering", "Petroleum Engineering", "Electronic and Information Engineering",
            "Safety Engineering", "Mining Engineering", "Aeronautical Engineering", "Aerospace Engineering"
        };
        
        for (String majorName : allMajorNames) {
            String description = getMajorDescription(majorName);
            majors.add(new MajorRecommendationDTO(majorName, 0, "", description));
        }
        
        return majors;
    }

    /**
     * Test avec les réponses d'exemple du document
     */
    public OrientationResponseDTO testWithExampleAnswers() {
        OrientationRequestDTO testRequest = new OrientationRequestDTO();
        testRequest.setQuestion1("E"); // Exprimer ma créativité
        testRequest.setQuestion2(Arrays.asList("C")); // Développement personnel, Causes sociales
        testRequest.setQuestion3("D"); // Livres de développement personnel...
        testRequest.setQuestion4("C"); // Imaginer des solutions originales
        testRequest.setQuestion5(Arrays.asList("G", "H", "B")); // Convaincre (1), Conseiller ami (2), Organiser événement (3)
        testRequest.setQuestion6("A"); // Lire et prendre des notes détaillées
        testRequest.setQuestion7("A"); // Améliorer la vie des individus directement
        testRequest.setQuestion8("D"); // L'extérieur, la nature, un chantier
        testRequest.setQuestion9(Map.of("A", 20, "B", 100, "C", 100, "D", 100)); // Curseurs
        testRequest.setQuestion10("B"); // Mettre en place rapidement une solution concrète
        testRequest.setQuestion11("A"); // Seul(e) sur un projet, en totale autonomie
        testRequest.setQuestion12("B"); // Raconter une histoire pour capter l'attention
        testRequest.setQuestion13("B"); // Votre intuition et vos sentiments
        testRequest.setQuestion14(Arrays.asList("D")); // Arts et Design

        return calculateOrientation(testRequest);
    }

    /**
     * Génère la description complète d'une majeure avec le contenu détaillé
     */
    private String generateMajorDescription(String majorName) {
        Map<String, String> descriptions = new HashMap<>();
        
        // Descriptions complètes des 44 majeures
        descriptions.put("Civil Engineering", "Civil Engineering is a field focused on the design and construction of infrastructure. It combines scientific theory with practical application to create the bridges, roads, and buildings that shape our environment.");
        descriptions.put("Mechanical Engineering", "Mechanical Engineering is the heart of industrial innovation. It covers the design, analysis, and manufacturing of mechanical systems, from car engines to industrial robots, using physics and mathematics to create efficient and sustainable solutions.");
        descriptions.put("Architecture", "Architecture is the discipline that shapes our built environment. It combines artistic creativity with engineering rigor to design functional, aesthetic, and environmentally friendly spaces.");
        descriptions.put("Computer Science", "Computer Science is the science that studies computers and their applications. This major explores programming, artificial intelligence, and network security to design the technologies of tomorrow.");
        descriptions.put("Software Engineering", "Software Engineering is the art and science of designing, developing, and maintaining quality software. It is the ideal major for building reliable and efficient computer systems.");
        descriptions.put("Artificial Intelligence", "Artificial Intelligence is the frontier of technological innovation. This major explores machine learning and deep learning to design systems capable of solving complex problems autonomously.");
        descriptions.put("Business Administration", "Business Administration is the ideal major for leading organizations. You will learn the fundamental principles of management, finance, marketing, and human resources to make strategic decisions.");
        descriptions.put("International Business", "International Business prepares you to become a player in global markets. This major focuses on the economic, legal, and cultural aspects of cross-border trade, and teaches you how to operate in a complex international environment.");
        descriptions.put("Marketing and Management", "Marketing and Management are at the core of business growth. This major teaches you to understand consumer behavior, design impactful campaigns, and lead teams.");
        descriptions.put("Finance", "Finance is the major for analytical and ambitious minds. This field gives you the keys to understand and influence the economic world, by managing assets and evaluating risks.");
        descriptions.put("Economics", "Economics is the science that studies the production, distribution, and consumption of wealth. It gives you the tools to analyze markets and public policies, and to solve social and economic problems using data and logic.");
        descriptions.put("Psychology", "Psychology is the study of the mind and human behavior. This major teaches you to analyze behaviors, conduct research, and help individuals improve their well-being.");
        descriptions.put("Medicine", "Medicine is a noble path for those who want to dedicate their lives to the health and well-being of others. This major gives you a deep understanding of the human body and its diseases.");
        descriptions.put("Nursing", "Nursing is a calling. It's a major for those with deep empathy and a desire to help others, working in a team to ensure the well-being of patients.");
        descriptions.put("Pharmacy", "Pharmacy is the major for scientific minds who want to contribute to people's health through the science of medicine. It explores chemistry, biology, and the mechanisms of drug action.");
        descriptions.put("Dentistry", "Dentistry is a health science focused on the mouth and teeth. It combines sharp scientific knowledge with great dexterity to diagnose and treat oral diseases.");
        descriptions.put("MBBS", "MBBS is the path to medicine. It is a demanding field that prepares you to diagnose, treat, and prevent diseases, dedicating yourself to the health and well-being of others.");
        descriptions.put("Electrical Engineering", "Electrical Engineering is the driving force of modern technology. This major allows you to design electrical and electronic systems for everything from phones to power grids.");
        descriptions.put("Chemical Engineering", "Chemical Engineering is the major that transforms science into production. You will learn to design processes to produce chemicals, fuels, plastics, or medicines on a large scale.");
        descriptions.put("Materials Science", "Materials Science and Engineering is the discipline that gives life to the objects around us. This major allows you to understand the structure of materials and to design new ones, lighter and more efficient, for applications in aerospace, medicine, or electronics.");
        descriptions.put("Biomedical Engineering", "Biomedical Engineering is the link between engineering and medicine. It applies the principles of engineering to solve clinical problems and improve human health.");
        descriptions.put("Data Science", "Data Science is the discipline that makes sense of massive amounts of information. This major allows you to extract knowledge from data to predict trends and make informed decisions.");
        descriptions.put("E-Commerce", "E-Commerce is the engine of modern commerce. This major will give you the keys to create and manage online stores by mastering digital marketing, logistics, and data analysis.");
        descriptions.put("Tourism Management", "Tourism Management is a major that combines the commercial aspect with strong customer service. It teaches you how to organize trips and promote destinations to create memorable experiences for others.");
        descriptions.put("Public Relations", "Public Relations is the art of building and maintaining a good image. This major teaches you how to manage an organization's reputation, interact with the media, and create impactful campaigns.");
        descriptions.put("Applied Chemistry", "Applied Chemistry is the major for scientific minds who want to transform the physical world. It uses the principles of chemistry to solve practical problems, by developing new medicines, creating innovative materials, or purifying the environment.");
        descriptions.put("English", "The English major is for those passionate about literature, languages, and culture. It allows you to explore the richness of language and thought to develop critical thinking and persuasive communication.");
        descriptions.put("International Politics", "International Politics is a major for those who want to understand and influence relations between nations. It gives you the keys to analyze conflicts, foreign policies, and international organizations.");
        descriptions.put("Science of Law", "The Science of Law is the foundation of justice. It requires great logical rigor and a capacity for complex text analysis, preparing you to defend rights and promote justice.");
        descriptions.put("Food Science", "Food Science and Engineering is the meeting point of science and gastronomy. This major allows you to understand the composition of food and ensure its safety and quality, by developing new products and sustainable production methods.");
        descriptions.put("Hydraulic Engineering", "Hydraulic Engineering is the science of water management. This major offers you the opportunity to solve crucial problems for society, by designing dams or water management systems for irrigation and power generation.");
        descriptions.put("Transportation Engineering", "Transportation Engineering is an essential major for the development of cities. It teaches you how to design road, rail, and airport networks to improve mobility and create sustainable infrastructure for the population.");
        descriptions.put("New Energy Engineering", "This major is the future of energy. It prepares you to design, develop, and implement sustainable energy systems for a cleaner and more efficient world.");
        descriptions.put("Bioengineering", "Bioengineering is the convergence of engineering and biology. It applies the principles of engineering to solve medical and biological problems, by designing prostheses, medical implants, or new treatment technologies.");
        descriptions.put("Biotechnology", "Biotechnology uses living organisms to create new products and technologies. This major is for those who want to push the boundaries of science to solve global problems in genetics, microbiology, or biochemistry.");
        descriptions.put("Robot Engineering", "Robot Engineering is the convergence of computer science, mechanics, and electronics. It is the major for creative and analytical minds who want to design and build intelligent robots.");
        descriptions.put("Aeronautical Engineering", "Aeronautical Engineering is the science of flight. This major prepares you to design, develop, and test airplanes and helicopters, applying the principles of mechanics, physics, and electronics.");
        descriptions.put("Aerospace Engineering", "Aerospace Engineering is the major for those who want to explore space. It is a discipline that goes beyond the Earth's atmosphere, designing rockets, satellites, and spacecraft.");
        descriptions.put("Safety Engineering", "Safety Engineering is the discipline that protects people and property. This major teaches you to design safe systems and environments by analyzing risks and developing protocols.");
        descriptions.put("Mining Engineering", "Mining Engineering is essential for the extraction of Earth's resources. It teaches you to design mines, manage operations, and ensure safety in demanding environments.");
        descriptions.put("Petroleum Engineering", "Petroleum Engineering is the major that immerses you in the heart of the energy industry. You will study the techniques of exploration, extraction, and processing of oil and gas.");
        descriptions.put("Electronic Engineering", "This major is at the heart of the digital revolution. It allows you to design electronic chips, communication systems, and information technologies to create the innovations of tomorrow.");
        
        return descriptions.getOrDefault(majorName, majorName + " is a field that combines various skills and interests to prepare you for a rewarding career.");
    }

    /**
     * Génère une explication personnalisée pour une majeure basée sur le profil utilisateur
     */
    private String generatePersonalizedExplanation(String majorName, UserProfileDTO userProfile) {
        Map<String, String> explanations = new HashMap<>();
        
        // Explications personnalisées pour chaque majeure
        explanations.put("Civil Engineering", "You Are a Natural Problem-Solver 🔧 Your passion for technical challenges and your aptitude for manual work will give you a head start in this field. You Thrive on Structure and Precision 📐 Your sense of organization and analytical rigor are major assets for managing large-scale projects. You Are Driven to Make a Lasting Impact 🌍 This major aligns with your desire to have a concrete social impact by building the foundations of tomorrow's world.");
        
        explanations.put("Mechanical Engineering", "You Have a Strong Analytical Mind 🧠 Your analytical profile and your interest in science and technology will allow you to solve the most complex problems. You Excel at Bringing Ideas to Life 🛠️ Your talent for manual and technical work is essential for bringing your creations to life. You Possess a Deep Drive to Innovate 💡 Your desire to innovate and your curious mind are the driving forces that will help you excel in this field.");
        
        explanations.put("Architecture", "Your Creativity Is Your Superpower 🎨 Your very strong creativity and your passion for art are at the heart of this major. You Are Motivated by Social Impact and Innovation 🏙️ Your desire to have a social impact and your innovative spirit correspond perfectly with the architect's mission. You Value Autonomy and Organization 📋 Your need for autonomy and your sense of organization are crucial assets for carrying out your projects successfully.");
        
        explanations.put("Computer Science", "Your Logical Mind Is Built for Technology 💻 Your logical and analytical mind and your interest in technology are the pillars of this field. You Are a Problem-Solver and Innovator ✨ Your talent for complex problem-solving and your thirst for innovation will lead you to excel. You Thrive on Autonomy and Theoretical Work 🧠 Your need for autonomy and your taste for theoretical research are key qualities for programming and algorithm design.");
        
        explanations.put("Software Engineering", "Your Analytical Mind Is an Ideal Fit 🤖 Your logical and analytical mind combined with your interest in technology makes you an ideal candidate. You Excel at Solving Problems and Organizing Projects 📋 Your talent for problem-solving and your sense of organization are essential for managing development projects. You Are a Strong Team Player and Communicator 💬 Your strong preference for teamwork and communication are major assets in a field that relies on collaboration.");
        
        explanations.put("Artificial Intelligence", "Your Logical Mind Is a Perfect Foundation 🧠 Your incredible logical and analytical mind is the foundation of this discipline. You Are Driven by a Thirst for Innovation 🚀 Your thirst for innovation and your desire to take on challenges are major assets for breaking into this field. You Excel at Theoretical and Independent Work 🧪 Your preference for theoretical research and autonomous work will allow you to immerse yourself in the complex concepts of AI.");
        
        explanations.put("Business Administration", "You Have a Talent for Organization and Leadership 📈 Your talent for organization and your desire to manage projects are central to this field. You Are a Collaborative Communicator 🤝 Your ease with communication and your ability to work in a team are major assets for leadership. You Are Eager to Make an Impact through Management 🎯 Your interest in business strategies and your desire to have an impact through management perfectly match this major.");
        
        explanations.put("International Business", "You Are a Skilled Communicator and Negotiator 🗣️ Your ease with communication and your talent for negotiation are fundamental skills for success in the world of international business. You Have a Strategic and Analytical Mind 📊 Your analytical mind and your sense of management will enable you to navigate the complex challenges of global trade. You Are an Autonomous Innovator 🚀 Your need for autonomy and your desire to innovate pair well with the flexibility and strategic vision required in this field.");
        
        explanations.put("Marketing and Management", "Your Communication and Creativity Set You Apart 🗣️ Your ease with communication and your very strong creativity are the driving forces of this field. You Excel at Organized and Collaborative Work 🤝 Your sense of organization and your ability to work in a team are major assets for managing projects and teams. You Are Driven by Innovation and Challenges 💡 Your desire to innovate and take on challenges is a prerequisite for standing out in this dynamic field.");
        
        explanations.put("Finance", "You Have a Strong Logical Mind and Strategic Interest 💹 Your very strong logic and your interest in business strategies are the foundations of this field. You Are Organized and Meticulous with Details 📈 Your excellent sense of organization and your rigor are indispensable for risk management and data analysis. You Are an Autonomous, Challenge-Driven Person 🚀 Your desire for challenges and your need for autonomy are qualities that will make you excel in this environment.");
        
        explanations.put("Economics", "You Are a Logical and Analytical Thinker 📈 Your very strong logic and your capacity for analysis are the foundations of economic thought. You Are Motivated by Social Causes and the Humanities 🌍 Your motivation to defend a social cause and your interest in the humanities are major assets. You Are an Autonomous Theorist 🧠 Your need for autonomy and your preference for theoretical research correspond perfectly with this field of study.");
        
        explanations.put("Psychology", "You Are a Natural Communicator with a Social Interest 🗣️ Your interest in social and human interaction and your ease with communication are essential qualities. You Are an Analytical and Autonomous Theorist 🧠 Your analytical mind and your preference for autonomous work and theoretical research will allow you to delve into the complex concepts of the human mind. You Are Driven to Promote Social Justice ⚖️ Your motivation to promote social justice and your ability to solve problems are major assets.");
        
        explanations.put("Medicine", "Your Scientific and Logical Mind Is a Perfect Match 🔬 Your scientific and logical mind is the foundation of this demanding field. You Are a Dedicated Team Player Who Wants to Help Others 🩺 Your desire to have a direct social impact and your ability to work in a team are fundamental human qualities for the practice of medicine. Your Rigor and Problem-Solving Skills Will Make You Excel 🧠 Your rigor and your talent for problem-solving will lead you to excel in this vocation.");
        
        explanations.put("Nursing", "You Are a Compassionate and Empathetic Person ❤️‍🩹 Your interest in social and human interaction and your desire to have a direct social impact make you an ideal candidate. You Are a Collaborative and Effective Communicator 🤝 Your ease with communication and your preference for teamwork are absolutely essential in the medical field. You Have a Talent for Hands-On Practice 💉 Your taste for hands-on practice and manual work are essential qualities for daily technical tasks.");
        
        explanations.put("Pharmacy", "You Possess a Strong Scientific and Analytical Mind 🔬 Your scientific and analytical mind is the basis of pharmacy. You Are Rigorous and Highly Organized 📋 Your strong sense of organization and your rigor are indispensable for inventory management and protocol application. You Are a Team Player with a Desire to Help 💊 Your desire to have a societal impact and your preference for teamwork are essential qualities for advising patients and collaborating with the medical staff.");
        
        explanations.put("Dentistry", "Your Scientific and Logical Mind Is Indispensable 🦷 Your scientific and logical mind is indispensable for the practice of dentistry. You Are Driven to Help People with Hands-On Work 🤝 Your desire to have a direct social impact and your ability to work in a team are fundamental human qualities. You Are Meticulous and Have a Talent for Precision 🛠️ Your talent for manual work and your rigor are essential for the precision of daily tasks.");
        
        explanations.put("MBBS", "Your Scientific and Logical Mind Is a Perfect Match 🔬 Your scientific and logical mind is the basis of this demanding field. You Are a Dedicated Team Player Who Wants to Help Others 🩺 Your desire to have a direct social impact and your ability to work in a team are fundamental human qualities for the practice of medicine. Your Rigor and Problem-Solving Skills Will Make You Excel 🧠 Your rigor and your talent for problem-solving will lead you to excel in this vocation.");
        
        explanations.put("Electrical Engineering", "Your Scientific and Logical Profile Is a Major Asset 💡 Your scientific and logical profile is an undeniable asset in this field. You Are Driven by Innovation and Practical Work 🛠️ Your desire to innovate and your taste for practical work will lead you to create the technologies of tomorrow. You Are a Collaborative Problem-Solver 🤝 Your talent for problem-solving and your preference for teamwork are key qualities for success.");
        
        explanations.put("Chemical Engineering", "Your Scientific and Analytical Mind is the Foundation 🧪 Your scientific and analytical mind is the basis of this field. You Are Organized and Enjoy Practical Work ⚗️ Your sense of organization and your taste for practical work are essential qualities for managing industrial processes. You Are an Innovator and Team Player 🤝 Your desire to innovate and your preference for teamwork are major assets.");
        
        explanations.put("Materials Science", "Your Scientific and Analytical Profile Is an Undeniable Asset 🔬 Your scientific and analytical profile is an undeniable asset in this field. You Are an Innovator and Problem-Solver 💡 Your taste for innovation and problem-solving will lead you to design the materials of the future. You Excel at Hands-On, Practical Work 🛠️ Your talent for practical and manual work is a major advantage for the characterization and creation of new materials.");
        
        explanations.put("Biomedical Engineering", "Your Logical Mind and Interest in Technology Align Perfectly 🧬 Your scientific and logical mind and your interest in technology are the pillars of this discipline. You Are Driven to Innovate for Human Health ❤️‍🩹 Your desire to have a strong social impact and to innovate for human health will motivate you every day. You Thrive on Collaborative Research and Teamwork 🤝 Your preference for research and teamwork are essential assets for collaborative projects.");
        
        explanations.put("Data Science", "Your Strong Logic and Scientific Mind are a Great Match 📊 Your very strong logic and your scientific mind are the basis of data science. You Are a Problem-Solver with a Thirst for Innovation 📈 Your thirst for innovation and your talent for problem-solving will lead you to excel in this rapidly expanding field. You Excel at Autonomous and Theoretical Work 🧠 Your need for autonomy and your taste for theory are essential qualities for analysis and modeling.");
        
        explanations.put("E-Commerce", "Your Creativity and Business Interest Drive You 🛒 Your interest in business management and your creativity are at the heart of e-commerce. You Are Organized and Have a Talent for Problem-Solving 📊 Your sense of organization and your ability to solve problems are essential for the success of your projects. You Are an Autonomous Innovator 🚀 Your desire to innovate and your preference for autonomous work align perfectly with this constantly evolving field.");
        
        explanations.put("Tourism Management", "You Are a Natural Communicator 🗣️ Your ease with communication and your interest in social interaction are the pillars of this major. You Have a Gift for Organization and Project Management 🗓️ Your great sense of organization and your ability to manage projects are fundamental skills. You Find Fulfillment in Hands-On Work 🗺️ Your desire to have a positive impact on people and your preference for practical work align perfectly with the reality of tourism.");
        
        explanations.put("Public Relations", "Your Communication Skills and Creativity Are a Driving Force 💬 Your ease with communication and your creativity are the driving forces of this field. You Are Motivated by Social Impact and Humanities 📰 Your desire to have a social impact and your interest in the humanities are valuable assets. You Are an Organized Team Player 🤝 Your preference for teamwork and your sense of organization are essential qualities.");
        
        explanations.put("Applied Chemistry", "Your Scientific Mind and Passion for Research Are Key 🧪 Your scientific and logical profile and your passion for research are the pillars of this field. You Are Driven by Innovation and Social Impact 💡 Your desire to innovate and have a social impact will motivate you to create concrete solutions. You Enjoy Practical and Hands-On Lab Work 🔬 Your taste for practical and manual work is a major asset for laboratory experiments.");
        
        explanations.put("English", "You Have a Natural Flair for Creativity and Communication ✍️ Your strong creativity and your ease with communication are at the heart of this major. You Thrive on Theoretical Research and Humanities 📖 Your interest in the humanities and theoretical research will allow you to delve deeply into literature and cultures. You Are an Autonomous and Analytical Thinker 🧠 Your need for autonomy and your analytical mind are essential assets for research and writing projects.");
        
        explanations.put("International Politics", "You Are a Skilled Communicator with an Interest in Humanities 🗣️ Your interest in the humanities and your ease with communication are essential qualities in this field. You Are an Analytical Mind with a Desire for Social Impact 🌎 Your analytical mind and your desire to have a social impact are powerful motivations for studying global politics. You Thrive on Teamwork and Theoretical Research 🤝 Your preference for teamwork and theoretical research will help you understand the complex issues of the world.");
        
        explanations.put("Science of Law", "Your Strong Logic and Analytical Skills are Essential ⚖️ Your very strong logic and your capacity for analysis are the pillars of this discipline. You Excel at Communication and Theoretical Research 📚 Your ease with communication and your taste for theoretical research will allow you to master the interpretation of laws. You Are Driven to Promote Social Justice 🤝 Your motivation to promote social justice and your need for autonomy align perfectly with the responsibilities of a legal professional.");
        
        explanations.put("Food Science", "Your Logical and Scientific Mind is a Key Strength 🧬 Your scientific mind and logic are essential for understanding the biological and chemical processes of food. You Have a Talent for Hands-On, Organized Work 🧑‍🍳 Your sense of organization and your taste for practical work are major assets for product development and quality control. You Are Driven to Create a Concrete Social Impact 🍎 This major aligns with your desire to have a concrete social impact by ensuring healthy and sustainable food for all.");
        
        explanations.put("Hydraulic Engineering", "Your Scientific and Logical Mind Is a Great Asset 🧠 Your scientific and logical mind is an indispensable asset for this major. You Excel at Organized and Practical Project Work 📋 Your sense of organization and your taste for practical work are essential qualities for managing projects in the field. You Are Motivated by Social Impact and Problem-Solving 💧 Your desire to have a social impact and your ability to solve complex problems will allow you to succeed.");
        
        explanations.put("Transportation Engineering", "Your Logical Mind and Organizational Skills Are Fundamental 🗺️ Your logical and analytical mind and your sense of organization are fundamental qualities for this field. You Want to Make a Social Impact through Practical Work 🏙️ Your desire to have a social impact and your preference for practical work align perfectly with the goals of the domain. You Are a Collaborative Problem-Solver 🤝 Your ability to solve complex problems and your preference for teamwork are major assets.");
        
        explanations.put("New Energy Engineering", "Your Scientific and Analytical Mind is Your Foundation 💡 Your scientific and analytical profile is the basis of this field. You Are Driven to Innovate for a Better World 🌍 Your desire to have a strong social impact and to innovate for a better world will motivate you every day. You Are a Practical, Hands-On Problem-Solver 🛠️ Your preference for practical work and problem-solving is a major asset for this discipline.");
        
        explanations.put("Bioengineering", "Your Scientific and Logical Profile Is at the Core 🧬 Your scientific and logical profile is the core of this discipline. You Are Driven to Innovate and Improve Human Health ❤️‍🩹 Your desire to have a strong social impact and to innovate to improve human health will motivate you every day. You Enjoy Hands-On Research and Practical Work 🔬 Your taste for hands-on practice and research is a major asset for designing new medical technologies.");
        
        explanations.put("Biotechnology", "Your Scientific Mind and Passion for Research Are Key 🧪 Your scientific and logical mind and your passion for research are the basis of this field. You Are an Innovator with a Desire for Social Impact 🧬 Your thirst for innovation and having a social impact will drive you to create sustainable solutions for health and the environment. You Enjoy Hands-On and Collaborative Lab Work 🔬 Your preference for practical work and collaboration in the laboratory are essential assets.");
        
        explanations.put("Robot Engineering", "Your Logical and Scientific Mind Is a Perfect Fit 🤖 Your scientific and logical mind is the basis of this field. You Are a Creative and Hands-On Builder 🛠️ Your taste for creativity and manual work will allow you to design robots from start to finish. You Are a Problem-Solver and Innovator 💡 Your thirst for innovation and your talent for problem-solving are major assets for breaking into this future-oriented field.");
        
        explanations.put("Aeronautical Engineering", "Your Scientific and Logical Profile is an Undeniable Asset ✈️ Your scientific and logical profile is an undeniable asset in this field. You Are Driven to Innovate and Take on Challenges 🚀 Your desire to innovate and take on challenges is a powerful driver for breaking into this field. You Are Meticulous and Have a Talent for Hands-On Work 🛠️ Your rigor and your talent for manual work are essential qualities for design and construction.");
        
        explanations.put("Aerospace Engineering", "Your Scientific Mind Is the Basis of This Field 🪐 Your scientific and logical mind is the basis of this field. You Are an Innovator Driven to Push Boundaries 🚀 Your thirst for innovation and your desire to go beyond existing challenges will push you towards the stars. You Are Rigorous and Excel at Complex Problem-Solving 🧠 Your rigor and your talent for complex problem-solving are essential assets for space missions.");
        
        explanations.put("Safety Engineering", "Your Logical Mind and Organizational Skills Are the Pillars 📋 Your logical and analytical mind and your sense of organization are the pillars of this major. You Are Motivated by Social Impact and Stability 🛡️ Your desire to have a strong social impact and ensure stability is a powerful motivation. You Enjoy Practical Work and Team Collaboration 🤝 Your preference for practical work and teamwork is a major asset in this field.");
        
        explanations.put("Mining Engineering", "Your Scientific Mind and Manual Interests Are Fundamental ⛏️ Your scientific and logical mind and your interest in manual work are fundamental qualities for this field. You Are a Hands-On Problem-Solver 🛠️ Your taste for problem-solving and your preference for practical work in the field are major assets. You Are an Autonomous Person Who Values Stability 💼 Your desire for autonomy and stability align well with this demanding discipline.");
        
        explanations.put("Petroleum Engineering", "Your Logical Mind and Interest in Manual Work Are Key 🛢️ Your scientific and logical mind and your interest in manual work are fundamental qualities for this field. You Are Organized and Enjoy Hands-On Field Work 🛠️ Your sense of organization and your preference for practical work in the field are major assets. You Value Autonomy and Stability 💼 Your desire for autonomy and stability align well with this demanding discipline.");
        
        explanations.put("Electronic Engineering", "Your Strong Logic and Scientific Profile Are Essential 💻 Your very strong logic and your scientific profile are the pillars of this discipline. You Are Driven to Innovate and Take on Challenges 🚀 Your desire to innovate and take on challenges is a powerful driver for creating the technologies of tomorrow. You Excel at Practical and Theoretical Work 💡 Your taste for practical work and theoretical research are essential qualities for the design of complex systems.");
        
        return explanations.getOrDefault(majorName, "Your balanced profile corresponds well to the requirements of " + majorName + ".");
    }
}
