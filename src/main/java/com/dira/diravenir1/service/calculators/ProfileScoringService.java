package com.dira.diravenir1.service.calculators;

import com.dira.diravenir1.dto.OrientationRequestDTO;
import com.dira.diravenir1.dto.UserProfileDTO;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Map;

/**
 * Service de scoring spécialisé pour transformer les réponses du test d'orientation
 * en profil utilisateur selon la matrice des 17 piliers.
 * 
 * Ce service implémente exactement la logique métier spécifiée pour chaque question
 * et chaque option de réponse.
 */
@Service
@Slf4j
public class ProfileScoringService {
    
    // Constantes pour les scores des piliers
    private static final int SCORE_FORT = 5;
    private static final int SCORE_MOYEN = 4;
    private static final int SCORE_FAIBLE = 3;
    private static final int SCORE_TRES_FAIBLE = 2;
    
    /**
     * Transforme les réponses du test d'orientation en profil utilisateur
     * selon la matrice des 17 piliers.
     */
    public UserProfileDTO calculateUserProfile(OrientationRequestDTO request) {
        log.info("🧮 Calcul du profil utilisateur à partir des réponses du test");
        
        UserProfileDTO profile = new UserProfileDTO();
        
        // Initialisation des scores à 0
        initializeScores(profile);
        
        // Application de la matrice de scoring pour chaque question
        processQuestion1(request, profile);
        processQuestion2(request, profile);
        processQuestion3(request, profile);
        processQuestion4(request, profile);
        processQuestion5(request, profile);
        processQuestion6(request, profile);
        processQuestion7(request, profile);
        processQuestion8(request, profile);
        processQuestion9(request, profile);
        processQuestion10(request, profile);
        processQuestion11(request, profile);
        processQuestion12(request, profile);
        processQuestion13(request, profile);
        processQuestion14(request, profile);
        
        // Normalisation des scores sur 0-100
        normalizeScores(profile);
        
        log.info("✅ Profil utilisateur calculé avec succès");
        return profile;
    }
    
    /**
     * Initialise tous les scores des piliers à 0
     */
    private void initializeScores(UserProfileDTO profile) {
        profile.setInteretScientifiqueTech(0);
        profile.setInteretArtistiqueCreatif(0);
        profile.setInteretSocialHumain(0);
        profile.setInteretBusinessGestion(0);
        profile.setInteretLogiqueAnalytique(0);
        profile.setCompetenceResolutionProblemes(0);
        profile.setCompetenceCommunication(0);
        profile.setCompetenceOrganisation(0);
        profile.setCompetenceManuelTechnique(0);
        profile.setValeurImpactSocietal(0);
        profile.setValeurInnovationChallenge(0);
        profile.setValeurStabiliteSecurite(0);
        profile.setValeurAutonomie(0);
        profile.setPrefTravailEquipeCollab(0);
        profile.setPrefTravailAutonome(0);
        profile.setPrefPratiqueTerrain(0);
        profile.setPrefTheorieRecherche(0);
    }
    
    /**
     * Question 1: Si le temps et l'argent n'étaient pas un problème...
     */
    private void processQuestion1(OrientationRequestDTO request, UserProfileDTO profile) {
        String answer = request.getQuestion1();
        if (answer == null) return;
        
        switch (answer.toUpperCase()) {
            case "A": // Créer
                addScore(profile, "InteretScientifiqueTech", SCORE_FORT);
                addScore(profile, "InteretArtistiqueCreatif", SCORE_FAIBLE);
                addScore(profile, "ValeurInnovationChallenge", SCORE_MOYEN);
                addScore(profile, "CompetenceManuelTechnique", SCORE_TRES_FAIBLE);
                break;
            case "B": // Comprendre
                addScore(profile, "InteretScientifiqueTech", SCORE_MOYEN);
                addScore(profile, "InteretLogiqueAnalytique", SCORE_FORT);
                addScore(profile, "CompetenceResolutionProblemes", SCORE_MOYEN);
                addScore(profile, "PrefTheorieRecherche", SCORE_FAIBLE);
                break;
            case "C": // Aider
                addScore(profile, "InteretSocialHumain", SCORE_FORT);
                addScore(profile, "ValeurImpactSocietal", SCORE_FORT);
                addScore(profile, "CompetenceCommunication", SCORE_MOYEN);
                break;
            case "D": // Organiser
                addScore(profile, "InteretBusinessGestion", SCORE_FORT);
                addScore(profile, "CompetenceOrganisation", SCORE_FORT);
                addScore(profile, "PrefTravailEquipeCollab", SCORE_FAIBLE);
                break;
            case "E": // Créativité
                addScore(profile, "InteretArtistiqueCreatif", SCORE_FORT);
                addScore(profile, "ValeurInnovationChallenge", SCORE_TRES_FAIBLE);
                addScore(profile, "PrefTravailAutonome", SCORE_FAIBLE);
                break;
        }
    }
    
    /**
     * Question 2: Qu'est-ce qui vous passionne le plus ? (multiple choice)
     */
    private void processQuestion2(OrientationRequestDTO request, UserProfileDTO profile) {
        List<String> answers = request.getQuestion2();
        if (answers == null || answers.isEmpty()) return;
        
        for (String answer : answers) {
            switch (answer.toUpperCase()) {
                case "DECOUVERTES_TECH":
                    addScore(profile, "InteretScientifiqueTech", SCORE_FAIBLE);
                    addScore(profile, "ValeurInnovationChallenge", SCORE_TRES_FAIBLE);
                    break;
                case "ART_DESIGN":
                    addScore(profile, "InteretArtistiqueCreatif", SCORE_FAIBLE);
                    break;
                case "PERSO_SOCIAL":
                    addScore(profile, "InteretSocialHumain", SCORE_FAIBLE);
                    addScore(profile, "ValeurImpactSocietal", SCORE_TRES_FAIBLE);
                    break;
                case "ECO_STRAT":
                    addScore(profile, "InteretBusinessGestion", SCORE_FAIBLE);
                    break;
                case "ORGA_GESTION":
                    addScore(profile, "CompetenceOrganisation", SCORE_FAIBLE);
                    break;
                case "SPORT_BRICOLAGE":
                    addScore(profile, "CompetenceManuelTechnique", SCORE_FAIBLE);
                    break;
            }
        }
    }
    
    /**
     * Question 3: Quel type de cadeau préférez-vous recevoir ?
     */
    private void processQuestion3(OrientationRequestDTO request, UserProfileDTO profile) {
        String answer = request.getQuestion3();
        if (answer == null) return;
        
        switch (answer.toUpperCase()) {
            case "A": // Électronique
                addScore(profile, "InteretScientifiqueTech", SCORE_FAIBLE);
                addScore(profile, "CompetenceManuelTechnique", SCORE_TRES_FAIBLE);
                break;
            case "B": // Livres
                addScore(profile, "InteretLogiqueAnalytique", SCORE_FAIBLE);
                addScore(profile, "PrefTheorieRecherche", SCORE_TRES_FAIBLE);
                break;
            case "C": // Art
                addScore(profile, "InteretArtistiqueCreatif", SCORE_FAIBLE);
                break;
            case "D": // Jeux
                addScore(profile, "InteretSocialHumain", SCORE_FAIBLE);
                break;
            case "E": // Mode
                addScore(profile, "InteretBusinessGestion", SCORE_FAIBLE);
                addScore(profile, "InteretArtistiqueCreatif", SCORE_TRES_FAIBLE);
                break;
        }
    }
    
    /**
     * Question 4: Face à un problème complexe, vous préférez...
     */
    private void processQuestion4(OrientationRequestDTO request, UserProfileDTO profile) {
        String answer = request.getQuestion4();
        if (answer == null) return;
        
        switch (answer.toUpperCase()) {
            case "A": // Décomposer
                addScore(profile, "CompetenceResolutionProblemes", SCORE_MOYEN);
                addScore(profile, "InteretLogiqueAnalytique", SCORE_MOYEN);
                break;
            case "B": // Chercher faits
                addScore(profile, "InteretScientifiqueTech", SCORE_FAIBLE);
                addScore(profile, "InteretLogiqueAnalytique", SCORE_FAIBLE);
                addScore(profile, "PrefTheorieRecherche", SCORE_TRES_FAIBLE);
                break;
            case "C": // Imaginer
                addScore(profile, "InteretArtistiqueCreatif", SCORE_MOYEN);
                addScore(profile, "ValeurInnovationChallenge", SCORE_MOYEN);
                break;
            case "D": // Autres
                addScore(profile, "CompetenceCommunication", SCORE_MOYEN);
                addScore(profile, "PrefTravailEquipeCollab", SCORE_MOYEN);
                addScore(profile, "InteretSocialHumain", SCORE_TRES_FAIBLE);
                break;
        }
    }
    
    /**
     * Question 5: Glisser-déposer (top 3 activités)
     */
    private void processQuestion5(OrientationRequestDTO request, UserProfileDTO profile) {
        List<String> activities = request.getQuestion5();
        if (activities == null || activities.isEmpty()) return;
        
        // Traitement des réponses glisser-déposer avec scores variables
        // 1er choix = +4, 2e = +3, 3e = +2
        for (int i = 0; i < Math.min(activities.size(), 3); i++) {
            String activity = activities.get(i);
            int score = (i == 0) ? SCORE_MOYEN : (i == 1) ? SCORE_FAIBLE : SCORE_TRES_FAIBLE;
            processDragDropAnswer(activity, score, profile);
        }
    }
    
    private void processDragDropAnswer(String activity, int score, UserProfileDTO profile) {
        if (activity == null) return;
        
        switch (activity.toUpperCase()) {
            case "GERER_BUDGET":
                addScore(profile, "InteretBusinessGestion", score);
                addScore(profile, "CompetenceOrganisation", score);
                addScore(profile, "InteretLogiqueAnalytique", score);
                break;
            case "ORGANISER_EVENEMENT":
                addScore(profile, "CompetenceOrganisation", score);
                addScore(profile, "PrefTravailEquipeCollab", score);
                addScore(profile, "CompetenceCommunication", score);
                break;
            case "ECRIRE_TEXTE":
                addScore(profile, "CompetenceCommunication", score);
                addScore(profile, "InteretArtistiqueCreatif", score);
                break;
            case "REPARER":
                addScore(profile, "CompetenceManuelTechnique", score);
                addScore(profile, "InteretScientifiqueTech", score);
                break;
            case "DESSINER":
                addScore(profile, "InteretArtistiqueCreatif", score);
                addScore(profile, "CompetenceManuelTechnique", score);
                break;
            case "EQUATION":
                addScore(profile, "InteretLogiqueAnalytique", score);
                addScore(profile, "InteretScientifiqueTech", score);
                break;
            case "CONVAINCRE":
                addScore(profile, "CompetenceCommunication", score);
                addScore(profile, "InteretBusinessGestion", score);
                break;
            case "CONSEILLER_AMI":
                addScore(profile, "InteretSocialHumain", score);
                addScore(profile, "CompetenceCommunication", score);
                break;
        }
    }
    
    /**
     * Question 6: Pour apprendre quelque chose de nouveau...
     */
    private void processQuestion6(OrientationRequestDTO request, UserProfileDTO profile) {
        String answer = request.getQuestion6();
        if (answer == null) return;
        
        switch (answer.toUpperCase()) {
            case "A": // Lire
                addScore(profile, "PrefTheorieRecherche", SCORE_MOYEN);
                addScore(profile, "InteretLogiqueAnalytique", SCORE_FAIBLE);
                break;
            case "B": // Vidéo
                addScore(profile, "InteretScientifiqueTech", SCORE_FAIBLE);
                break;
            case "C": // Essayer
                addScore(profile, "CompetenceManuelTechnique", SCORE_MOYEN);
                addScore(profile, "PrefPratiqueTerrain", SCORE_MOYEN);
                break;
            case "D": // Discuter
                addScore(profile, "CompetenceCommunication", SCORE_MOYEN);
                addScore(profile, "PrefTravailEquipeCollab", SCORE_MOYEN);
                break;
        }
    }
    
    /**
     * Question 7: Qu'est-ce qui vous motive le plus ?
     */
    private void processQuestion7(OrientationRequestDTO request, UserProfileDTO profile) {
        String answer = request.getQuestion7();
        if (answer == null) return;
        
        switch (answer.toUpperCase()) {
            case "A": // Améliorer vie
                addScore(profile, "ValeurImpactSocietal", SCORE_FORT);
                addScore(profile, "InteretSocialHumain", SCORE_MOYEN);
                break;
            case "B": // Systèmes efficaces
                addScore(profile, "ValeurInnovationChallenge", SCORE_MOYEN);
                addScore(profile, "InteretScientifiqueTech", SCORE_FAIBLE);
                break;
            case "C": // Beauté
                addScore(profile, "InteretArtistiqueCreatif", SCORE_FORT);
                break;
            case "D": // Justice
                addScore(profile, "ValeurImpactSocietal", SCORE_FORT);
                addScore(profile, "InteretSocialHumain", SCORE_FAIBLE);
                break;
        }
    }
    
    /**
     * Question 8: Quel environnement de travail préférez-vous ?
     */
    private void processQuestion8(OrientationRequestDTO request, UserProfileDTO profile) {
        String answer = request.getQuestion8();
        if (answer == null) return;
        
        switch (answer.toUpperCase()) {
            case "A": // Labo
                addScore(profile, "PrefTheorieRecherche", SCORE_MOYEN);
                addScore(profile, "InteretScientifiqueTech", SCORE_FAIBLE);
                break;
            case "B": // Bureau coll.
                addScore(profile, "PrefTravailEquipeCollab", SCORE_MOYEN);
                addScore(profile, "InteretBusinessGestion", SCORE_TRES_FAIBLE);
                break;
            case "C": // Studio
                addScore(profile, "InteretArtistiqueCreatif", SCORE_MOYEN);
                addScore(profile, "CompetenceManuelTechnique", SCORE_FAIBLE);
                break;
            case "D": // Chantier
                addScore(profile, "PrefPratiqueTerrain", SCORE_MOYEN);
                addScore(profile, "CompetenceManuelTechnique", SCORE_FAIBLE);
                break;
            case "E": // Calme
                addScore(profile, "PrefTravailAutonome", SCORE_MOYEN);
                addScore(profile, "PrefTheorieRecherche", SCORE_TRES_FAIBLE);
                break;
        }
    }
    
    /**
     * Question 9: Curseurs (score proportionnel de 0 à 100)
     */
    private void processQuestion9(OrientationRequestDTO request, UserProfileDTO profile) {
        Map<String, Integer> scores = request.getQuestion9();
        if (scores == null) return;
        
        // Les scores sont déjà proportionnels (0-100)
        if (scores.containsKey("SECURITE")) {
            profile.setValeurStabiliteSecurite(scores.get("SECURITE"));
        }
        if (scores.containsKey("INNOVATION")) {
            profile.setValeurInnovationChallenge(scores.get("INNOVATION"));
        }
        if (scores.containsKey("AUTONOMIE")) {
            profile.setValeurAutonomie(scores.get("AUTONOMIE"));
        }
        if (scores.containsKey("SALAIRE")) {
            profile.setInteretBusinessGestion(scores.get("SALAIRE"));
        }
    }
    
    /**
     * Question 10: Face à un défi technique...
     */
    private void processQuestion10(OrientationRequestDTO request, UserProfileDTO profile) {
        String answer = request.getQuestion10();
        if (answer == null) return;
        
        switch (answer.toUpperCase()) {
            case "A": // Comprendre
                addScore(profile, "InteretLogiqueAnalytique", SCORE_MOYEN);
                addScore(profile, "CompetenceResolutionProblemes", SCORE_FAIBLE);
                break;
            case "B": // Solution concrète
                addScore(profile, "PrefPratiqueTerrain", SCORE_MOYEN);
                addScore(profile, "CompetenceResolutionProblemes", SCORE_FAIBLE);
                break;
            case "C": // Rallier gens
                addScore(profile, "CompetenceCommunication", SCORE_MOYEN);
                addScore(profile, "PrefTravailEquipeCollab", SCORE_FAIBLE);
                break;
            case "D": // Techno avancée
                addScore(profile, "ValeurInnovationChallenge", SCORE_MOYEN);
                addScore(profile, "InteretScientifiqueTech", SCORE_FAIBLE);
                break;
        }
    }
    
    /**
     * Question 11: Préférez-vous travailler...
     */
    private void processQuestion11(OrientationRequestDTO request, UserProfileDTO profile) {
        String answer = request.getQuestion11();
        if (answer == null) return;
        
        switch (answer.toUpperCase()) {
            case "A": // Seul
                addScore(profile, "PrefTravailAutonome", SCORE_FORT);
                addScore(profile, "ValeurAutonomie", SCORE_MOYEN);
                break;
            case "B": // Petite équipe
                addScore(profile, "PrefTravailEquipeCollab", SCORE_FORT);
                break;
            case "C": // Grande structure
                addScore(profile, "ValeurStabiliteSecurite", SCORE_MOYEN);
                addScore(profile, "CompetenceOrganisation", SCORE_FAIBLE);
                break;
        }
    }
    
    /**
     * Question 12: Dans une présentation, vous préférez...
     */
    private void processQuestion12(OrientationRequestDTO request, UserProfileDTO profile) {
        String answer = request.getQuestion12();
        if (answer == null) return;
        
        switch (answer.toUpperCase()) {
            case "A": // Faits
                addScore(profile, "CompetenceOrganisation", SCORE_MOYEN);
                addScore(profile, "InteretLogiqueAnalytique", SCORE_FAIBLE);
                break;
            case "B": // Histoire
                addScore(profile, "CompetenceCommunication", SCORE_MOYEN);
                addScore(profile, "InteretArtistiqueCreatif", SCORE_FAIBLE);
                break;
            case "C": // Interagir
                addScore(profile, "CompetenceCommunication", SCORE_MOYEN);
                addScore(profile, "InteretSocialHumain", SCORE_FAIBLE);
                addScore(profile, "PrefTravailEquipeCollab", SCORE_TRES_FAIBLE);
                break;
        }
    }
    
    /**
     * Question 13: Pour prendre une décision importante...
     */
    private void processQuestion13(OrientationRequestDTO request, UserProfileDTO profile) {
        String answer = request.getQuestion13();
        if (answer == null) return;
        
        switch (answer.toUpperCase()) {
            case "A": // Logique
                addScore(profile, "InteretLogiqueAnalytique", SCORE_FORT);
                break;
            case "B": // Intuition
                addScore(profile, "InteretArtistiqueCreatif", SCORE_MOYEN);
                addScore(profile, "PrefTravailAutonome", SCORE_FAIBLE);
                break;
            case "C": // Avis autres
                addScore(profile, "InteretSocialHumain", SCORE_MOYEN);
                addScore(profile, "PrefTravailEquipeCollab", SCORE_FAIBLE);
                break;
        }
    }
    
    /**
     * Question 14: Sélection multiple (2-3 max)
     */
    private void processQuestion14(OrientationRequestDTO request, UserProfileDTO profile) {
        List<String> selections = request.getQuestion14();
        if (selections == null || selections.isEmpty()) return;
        
        // Traitement des sélections multiples
        for (String selection : selections) {
            switch (selection.toUpperCase()) {
                case "SCIENCES":
                    addScore(profile, "InteretScientifiqueTech", SCORE_MOYEN);
                    addScore(profile, "InteretLogiqueAnalytique", SCORE_MOYEN);
                    break;
                case "LITTERATURE":
                case "LANGUES":
                    addScore(profile, "InteretSocialHumain", SCORE_FAIBLE);
                    addScore(profile, "CompetenceCommunication", SCORE_FAIBLE);
                    break;
                case "SHS":
                    addScore(profile, "InteretSocialHumain", SCORE_MOYEN);
                    addScore(profile, "PrefTheorieRecherche", SCORE_TRES_FAIBLE);
                    break;
                case "ARTS":
                case "DESIGN":
                    addScore(profile, "InteretArtistiqueCreatif", SCORE_MOYEN);
                    break;
                case "TECHNO":
                case "INFO":
                    addScore(profile, "InteretScientifiqueTech", SCORE_MOYEN);
                    addScore(profile, "InteretLogiqueAnalytique", SCORE_FAIBLE);
                    break;
                case "GESTION":
                case "ECO":
                    addScore(profile, "InteretBusinessGestion", SCORE_MOYEN);
                    addScore(profile, "CompetenceOrganisation", SCORE_FAIBLE);
                    break;
            }
        }
    }
    
    /**
     * Ajoute un score à un pilier spécifique
     */
    private void addScore(UserProfileDTO profile, String pillarName, int score) {
        try {
            java.lang.reflect.Method setter = profile.getClass().getMethod("set" + pillarName, int.class);
            java.lang.reflect.Method getter = profile.getClass().getMethod("get" + pillarName);
            
            int currentScore = (int) getter.invoke(profile);
            int newScore = currentScore + score;
            
            setter.invoke(profile, newScore);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de l'ajout du score pour le pilier {}: {}", pillarName, e.getMessage());
        }
    }
    
    /**
     * Normalise tous les scores sur une échelle de 0 à 100
     */
    private void normalizeScores(UserProfileDTO profile) {
        // Les scores sont déjà sur une échelle de 0-5, on les convertit en 0-100
        // Score max possible = 5 * nombre de questions qui affectent ce pilier
        // On normalise proportionnellement
        
        normalizePillarScore(profile, "InteretScientifiqueTech", 25); // Max théorique
        normalizePillarScore(profile, "InteretArtistiqueCreatif", 25);
        normalizePillarScore(profile, "InteretSocialHumain", 20);
        normalizePillarScore(profile, "InteretBusinessGestion", 20);
        normalizePillarScore(profile, "InteretLogiqueAnalytique", 25);
        normalizePillarScore(profile, "CompetenceResolutionProblemes", 20);
        normalizePillarScore(profile, "CompetenceCommunication", 25);
        normalizePillarScore(profile, "CompetenceOrganisation", 20);
        normalizePillarScore(profile, "CompetenceManuelTechnique", 20);
        normalizePillarScore(profile, "ValeurImpactSocietal", 20);
        normalizePillarScore(profile, "ValeurInnovationChallenge", 20);
        normalizePillarScore(profile, "ValeurStabiliteSecurite", 15);
        normalizePillarScore(profile, "ValeurAutonomie", 15);
        normalizePillarScore(profile, "PrefTravailEquipeCollab", 20);
        normalizePillarScore(profile, "PrefTravailAutonome", 15);
        normalizePillarScore(profile, "PrefPratiqueTerrain", 15);
        normalizePillarScore(profile, "PrefTheorieRecherche", 20);
    }
    
    private void normalizePillarScore(UserProfileDTO profile, String pillarName, int maxTheoreticalScore) {
        try {
            java.lang.reflect.Method getter = profile.getClass().getMethod("get" + pillarName);
            java.lang.reflect.Method setter = profile.getClass().getMethod("set" + pillarName, int.class);
            
            int currentScore = (int) getter.invoke(profile);
            int normalizedScore = Math.min(100, (currentScore * 100) / maxTheoreticalScore);
            
            setter.invoke(profile, normalizedScore);
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la normalisation du score pour le pilier {}: {}", pillarName, e.getMessage());
        }
    }
}
