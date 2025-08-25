package com.dira.diravenir1.service;

import com.dira.diravenir1.dto.OrientationRequestDTO;
import com.dira.diravenir1.dto.UserProfileDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Service de scoring des profils utilisateur basé sur les réponses au questionnaire d'orientation.
 * 
 * Ce service implémente la matrice de scoring complète selon les spécifications :
 * - 14 questions réparties en 5 catégories
 * - 17 piliers de profil avec scores de 0 à 100
 * - Logique de scoring détaillée pour chaque réponse
 */
@Slf4j
@Service
public class ProfileScoringService {

    /**
     * Transforme les réponses du questionnaire en profil utilisateur avec scores de piliers
     */
    public UserProfileDTO calculateProfileFromResponses(OrientationRequestDTO responses) {
        log.info("🚀 Calcul du profil utilisateur à partir des réponses du questionnaire");
        
        // Initialisation des scores de piliers
        Map<String, Integer> pillarScores = initializePillarScores();
        
        // Traitement de chaque question selon les spécifications
        processQuestion1(responses.getQuestion1(), pillarScores);
        processQuestion2(responses.getQuestion2(), pillarScores);
        processQuestion3(responses.getQuestion3(), pillarScores);
        processQuestion4(responses.getQuestion4(), pillarScores);
        processQuestion5(responses.getQuestion5(), pillarScores);
        processQuestion6(responses.getQuestion6(), pillarScores);
        processQuestion7(responses.getQuestion7(), pillarScores);
        processQuestion8(responses.getQuestion8(), pillarScores);
        processQuestion9(responses.getQuestion9(), pillarScores);
        processQuestion10(responses.getQuestion10(), pillarScores);
        processQuestion11(responses.getQuestion11(), pillarScores);
        processQuestion12(responses.getQuestion12(), pillarScores);
        processQuestion13(responses.getQuestion13(), pillarScores);
        processQuestion14(responses.getQuestion14(), pillarScores);
        
        // Normalisation des scores sur 100
        normalizeScores(pillarScores);
        
        // Création du profil utilisateur
        UserProfileDTO userProfile = createUserProfile(pillarScores);
        
        log.info("✅ Profil utilisateur calculé avec succès");
        return userProfile;
    }
    
    /**
     * Initialise tous les piliers avec un score de 0
     */
    private Map<String, Integer> initializePillarScores() {
        Map<String, Integer> scores = new HashMap<>();
        
        // Piliers d'Intérêts
        scores.put("Interet_Scientifique_Tech", 0);
        scores.put("Interet_Artistique_Creatif", 0);
        scores.put("Interet_Social_Humain", 0);
        scores.put("Interet_Business_Gestion", 0);
        scores.put("Interet_Logique_Analytique", 0);
        
        // Piliers de Compétences
        scores.put("Competence_Resolution_Problemes", 0);
        scores.put("Competence_Communication", 0);
        scores.put("Competence_Organisation", 0);
        scores.put("Competence_Manuel_Technique", 0);
        
        // Piliers de Valeurs/Motivations
        scores.put("Valeur_Impact_Societal", 0);
        scores.put("Valeur_Innovation_Challenge", 0);
        scores.put("Valeur_Stabilite_Securite", 0);
        scores.put("Valeur_Autonomie", 0);
        
        // Piliers de Préférence de Travail/Personnalité
        scores.put("Pref_Travail_Equipe_Collab", 0);
        scores.put("Pref_Travail_Autonome", 0);
        scores.put("Pref_Pratique_Terrain", 0);
        scores.put("Pref_Theorie_Recherche", 0);
        
        return scores;
    }
    
    /**
     * Question 1 : Activité idéale pour une journée parfaite
     * A: Créer (+5 SciTech, +3 Artistique, +4 Innovation, +2 Manuel)
     * B: Comprendre (+4 SciTech, +5 Logique, +4 Résolution, +3 Théorie)
     * C: Aider (+5 Social, +5 Impact, +4 Communication)
     * D: Organiser (+5 Business, +5 Organisation, +3 Équipe)
     * E: Créativité (+5 Artistique, +2 Innovation, +3 Autonome)
     */
    private void processQuestion1(String answer, Map<String, Integer> scores) {
        if (answer == null) return;
        
        switch (answer.toUpperCase()) {
            case "A": // Créer
                addScore(scores, "Interet_Scientifique_Tech", 5);
                addScore(scores, "Interet_Artistique_Creatif", 3);
                addScore(scores, "Valeur_Innovation_Challenge", 4);
                addScore(scores, "Competence_Manuel_Technique", 2);
                break;
            case "B": // Comprendre
                addScore(scores, "Interet_Scientifique_Tech", 4);
                addScore(scores, "Interet_Logique_Analytique", 5);
                addScore(scores, "Competence_Resolution_Problemes", 4);
                addScore(scores, "Pref_Theorie_Recherche", 3);
                break;
            case "C": // Aider
                addScore(scores, "Interet_Social_Humain", 5);
                addScore(scores, "Valeur_Impact_Societal", 5);
                addScore(scores, "Competence_Communication", 4);
                break;
            case "D": // Organiser
                addScore(scores, "Interet_Business_Gestion", 5);
                addScore(scores, "Competence_Organisation", 5);
                addScore(scores, "Pref_Travail_Equipe_Collab", 3);
                break;
            case "E": // Créativité
                addScore(scores, "Interet_Artistique_Creatif", 5);
                addScore(scores, "Valeur_Innovation_Challenge", 2);
                addScore(scores, "Pref_Travail_Autonome", 3);
                break;
        }
    }
    
    /**
     * Question 2 : Contenu internet/vidéos préféré (sélection multiple, 3 max)
     * Découvertes/Tech: +3 SciTech, +2 Innovation
     * Art/Design: +3 Artistique
     * Perso/Social: +3 Social, +2 Impact
     * Éco/Strat: +3 Business
     * Orga/Gestion: +3 Organisation
     * Sport/Bricolage: +3 Manuel
     */
    private void processQuestion2(List<String> answers, Map<String, Integer> scores) {
        if (answers == null || answers.isEmpty()) return;
        
        // Limiter à 3 réponses maximum
        List<String> limitedAnswers = answers.stream()
            .limit(3)
            .toList();
        
        for (String answer : limitedAnswers) {
            switch (answer.toLowerCase()) {
                case "découvertes scientifiques":
                case "technologie et innovation":
                    addScore(scores, "Interet_Scientifique_Tech", 3);
                    addScore(scores, "Valeur_Innovation_Challenge", 2);
                    break;
                case "art et culture":
                case "design et création":
                    addScore(scores, "Interet_Artistique_Creatif", 3);
                    break;
                case "développement personnel":
                case "causes sociales et humanitaires":
                    addScore(scores, "Interet_Social_Humain", 3);
                    addScore(scores, "Valeur_Impact_Societal", 2);
                    break;
                case "actualités économiques":
                case "stratégies d'entreprise":
                    addScore(scores, "Interet_Business_Gestion", 3);
                    break;
                case "organisation et méthodes de travail":
                case "gestion de projets":
                    addScore(scores, "Competence_Organisation", 3);
                    break;
                case "sports":
                case "bricolage et artisanat":
                    addScore(scores, "Competence_Manuel_Technique", 3);
                    break;
            }
        }
    }
    
    /**
     * Question 3 : Section de magasin préférée
     * A (Électronique): +3 SciTech, +2 Manuel
     * B (Livres): +3 Logique, +2 Théorie
     * C (Art): +3 Artistique
     * D (Jeux): +3 Social
     * E (Mode): +3 Business, +2 Artistique
     */
    private void processQuestion3(String answer, Map<String, Integer> scores) {
        if (answer == null) return;
        
        switch (answer.toUpperCase()) {
            case "A": // Électronique
                addScore(scores, "Interet_Scientifique_Tech", 3);
                addScore(scores, "Competence_Manuel_Technique", 2);
                break;
            case "B": // Livres
                addScore(scores, "Interet_Logique_Analytique", 3);
                addScore(scores, "Pref_Theorie_Recherche", 2);
                break;
            case "C": // Art
                addScore(scores, "Interet_Artistique_Creatif", 3);
                break;
            case "D": // Jeux
                addScore(scores, "Interet_Social_Humain", 3);
                break;
            case "E": // Mode
                addScore(scores, "Interet_Business_Gestion", 3);
                addScore(scores, "Interet_Artistique_Creatif", 2);
                break;
        }
    }
    
    /**
     * Question 4 : Réaction face à un problème complexe
     * A (Décomposer): +4 Résolution, +4 Logique
     * B (Chercher faits): +3 SciTech, +3 Logique, +2 Théorie
     * C (Imaginer): +4 Artistique, +4 Innovation
     * D (Autres): +4 Communication, +4 Équipe, +2 Social
     */
    private void processQuestion4(String answer, Map<String, Integer> scores) {
        if (answer == null) return;
        
        switch (answer.toUpperCase()) {
            case "A": // Décomposer
                addScore(scores, "Competence_Resolution_Problemes", 4);
                addScore(scores, "Interet_Logique_Analytique", 4);
                break;
            case "B": // Chercher faits
                addScore(scores, "Interet_Scientifique_Tech", 3);
                addScore(scores, "Interet_Logique_Analytique", 3);
                addScore(scores, "Pref_Theorie_Recherche", 2);
                break;
            case "C": // Imaginer
                addScore(scores, "Interet_Artistique_Creatif", 4);
                addScore(scores, "Valeur_Innovation_Challenge", 4);
                break;
            case "D": // Autres
                addScore(scores, "Competence_Communication", 4);
                addScore(scores, "Pref_Travail_Equipe_Collab", 4);
                addScore(scores, "Interet_Social_Humain", 2);
                break;
        }
    }
    
    /**
     * Question 5 : Activités naturelles (glisser-déposer, 3 options)
     * Gérer budget: +4 Business, +4 Organisation, +4 Logique
     * Organiser événement: +4 Organisation, +4 Équipe, +4 Communication
     * Écrire texte: +4 Communication, +4 Artistique
     * Réparer: +4 Manuel, +4 SciTech
     * Dessiner: +4 Artistique, +4 Manuel
     * Équation: +4 Logique, +4 SciTech
     * Convaincre: +4 Communication, +4 Business
     * Conseiller ami: +4 Social, +4 Communication
     */
    private void processQuestion5(List<String> answers, Map<String, Integer> scores) {
        if (answers == null || answers.isEmpty()) return;
        
        // Limiter à 3 réponses
        List<String> limitedAnswers = answers.stream()
            .limit(3)
            .toList();
        
        for (int i = 0; i < limitedAnswers.size(); i++) {
            String answer = limitedAnswers.get(i);
            int points = 4 - i; // 1er = 4, 2e = 3, 3e = 2
            
            // Normaliser la réponse (enlever les accents, mettre en minuscules)
            String normalizedAnswer = answer.toLowerCase()
                .replaceAll("[éèêë]", "e")
                .replaceAll("[àâä]", "a")
                .replaceAll("[îï]", "i")
                .replaceAll("[ôö]", "o")
                .replaceAll("[ûüù]", "u")
                .replaceAll("[ç]", "c");
            
            log.debug("Question 5 - Traitement de la réponse: '{}' -> '{}' (points: {})", answer, normalizedAnswer, points);
            
            // Traitement avec mapping flexible
            if (normalizedAnswer.contains("gerer") || normalizedAnswer.contains("budget") || normalizedAnswer.contains("gestion")) {
                addScore(scores, "Interet_Business_Gestion", points);
                addScore(scores, "Competence_Organisation", points);
                addScore(scores, "Interet_Logique_Analytique", points);
                log.debug("Question 5 - Gestion budget: +{} Business, +{} Organisation, +{} Logique", points, points, points);
            } else if (normalizedAnswer.contains("organiser") || normalizedAnswer.contains("evenement") || normalizedAnswer.contains("event")) {
                addScore(scores, "Competence_Organisation", points);
                addScore(scores, "Pref_Travail_Equipe_Collab", points);
                addScore(scores, "Competence_Communication", points);
                log.debug("Question 5 - Organiser événement: +{} Organisation, +{} Équipe, +{} Communication", points, points, points);
            } else if (normalizedAnswer.contains("ecrire") || normalizedAnswer.contains("texte") || normalizedAnswer.contains("rediger")) {
                addScore(scores, "Competence_Communication", points);
                addScore(scores, "Interet_Artistique_Creatif", points);
                log.debug("Question 5 - Écrire texte: +{} Communication, +{} Artistique", points, points);
            } else if (normalizedAnswer.contains("reparer") || normalizedAnswer.contains("appareil") || normalizedAnswer.contains("maintenir")) {
                addScore(scores, "Competence_Manuel_Technique", points);
                addScore(scores, "Interet_Scientifique_Tech", points);
                log.debug("Question 5 - Réparer: +{} Manuel, +{} SciTech", points, points);
            } else if (normalizedAnswer.contains("dessiner") || normalizedAnswer.contains("peindre") || normalizedAnswer.contains("creer")) {
                addScore(scores, "Interet_Artistique_Creatif", points);
                addScore(scores, "Competence_Manuel_Technique", points);
                log.debug("Question 5 - Dessiner: +{} Artistique, +{} Manuel", points, points);
            } else if (normalizedAnswer.contains("resoudre") || normalizedAnswer.contains("equation") || normalizedAnswer.contains("calcul")) {
                addScore(scores, "Interet_Logique_Analytique", points);
                addScore(scores, "Interet_Scientifique_Tech", points);
                log.debug("Question 5 - Équation: +{} Logique, +{} SciTech", points, points);
            } else if (normalizedAnswer.contains("convaincre") || normalizedAnswer.contains("persuader") || normalizedAnswer.contains("argumenter")) {
                addScore(scores, "Competence_Communication", points);
                addScore(scores, "Interet_Business_Gestion", points);
                log.debug("Question 5 - Convaincre: +{} Communication, +{} Business", points, points);
            } else if (normalizedAnswer.contains("ecouter") || normalizedAnswer.contains("conseiller") || normalizedAnswer.contains("aider")) {
                addScore(scores, "Interet_Social_Humain", points);
                addScore(scores, "Competence_Communication", points);
                log.debug("Question 5 - Conseiller: +{} Social, +{} Communication", points, points);
            } else {
                log.warn("Question 5 - Réponse non reconnue: '{}' (normalisée: '{}')", answer, normalizedAnswer);
            }
        }
    }
    
    /**
     * Question 6 : Préférence d'apprentissage
     * A (Lire): +4 Théorie, +3 Logique
     * B (Vidéo): +3 SciTech
     * C (Essayer): +4 Manuel, +4 Pratique
     * D (Discuter): +4 Communication, +4 Équipe
     */
    private void processQuestion6(String answer, Map<String, Integer> scores) {
        if (answer == null) return;
        
        switch (answer.toUpperCase()) {
            case "A": // Lire
                addScore(scores, "Pref_Theorie_Recherche", 4);
                addScore(scores, "Interet_Logique_Analytique", 3);
                break;
            case "B": // Vidéo
                addScore(scores, "Interet_Scientifique_Tech", 3);
                break;
            case "C": // Essayer
                addScore(scores, "Competence_Manuel_Technique", 4);
                addScore(scores, "Pref_Pratique_Terrain", 4);
                break;
            case "D": // Discuter
                addScore(scores, "Competence_Communication", 4);
                addScore(scores, "Pref_Travail_Equipe_Collab", 4);
                break;
        }
    }
    
    /**
     * Question 7 : Type d'impact souhaité
     * A (Améliorer vie): +5 Impact, +4 Social
     * B (Systèmes efficaces): +4 Innovation, +3 SciTech
     * C (Beauté): +5 Artistique
     * D (Justice): +5 Impact, +3 Social
     */
    private void processQuestion7(String answer, Map<String, Integer> scores) {
        if (answer == null) return;
        
        switch (answer.toUpperCase()) {
            case "A": // Améliorer vie
                addScore(scores, "Valeur_Impact_Societal", 5);
                addScore(scores, "Interet_Social_Humain", 4);
                break;
            case "B": // Systèmes efficaces
                addScore(scores, "Valeur_Innovation_Challenge", 4);
                addScore(scores, "Interet_Scientifique_Tech", 3);
                break;
            case "C": // Beauté
                addScore(scores, "Interet_Artistique_Creatif", 5);
                break;
            case "D": // Justice
                addScore(scores, "Valeur_Impact_Societal", 5);
                addScore(scores, "Interet_Social_Humain", 3);
                break;
        }
    }
    
    /**
     * Question 8 : Environnement de travail préféré
     * A (Labo): +4 Théorie, +3 SciTech
     * B (Bureau coll.): +4 Équipe, +2 Business
     * C (Studio): +4 Artistique, +3 Manuel
     * D (Chantier): +4 Pratique, +3 Manuel
     * E (Calme): +4 Autonome, +2 Théorie
     */
    private void processQuestion8(String answer, Map<String, Integer> scores) {
        if (answer == null) return;
        
        switch (answer.toUpperCase()) {
            case "A": // Labo
                addScore(scores, "Pref_Theorie_Recherche", 4);
                addScore(scores, "Interet_Scientifique_Tech", 3);
                break;
            case "B": // Bureau coll.
                addScore(scores, "Pref_Travail_Equipe_Collab", 4);
                addScore(scores, "Interet_Business_Gestion", 2);
                break;
            case "C": // Studio
                addScore(scores, "Interet_Artistique_Creatif", 4);
                addScore(scores, "Competence_Manuel_Technique", 3);
                break;
            case "D": // Chantier
                addScore(scores, "Pref_Pratique_Terrain", 4);
                addScore(scores, "Competence_Manuel_Technique", 3);
                break;
            case "E": // Calme
                addScore(scores, "Pref_Travail_Autonome", 4);
                addScore(scores, "Pref_Theorie_Recherche", 2);
                break;
        }
    }
    
    /**
     * Question 9 : Critères de carrière (curseurs 0-5)
     * Sécurité: Valeur_Stabilite_Securite
     * Innovation: Valeur_Innovation_Challenge
     * Autonomie: Valeur_Autonomie
     * Salaire: Interet_Business_Gestion
     */
    private void processQuestion9(Map<String, Integer> values, Map<String, Integer> scores) {
        if (values == null) return;
        
        log.debug("Question 9 - Traitement des curseurs: {}", values);
        
        // Sécurité - accepter plusieurs variations
        Integer securite = values.get("securite") != null ? values.get("securite") : 
                          values.get("stabilite") != null ? values.get("stabilite") :
                          values.get("securite_emploi") != null ? values.get("securite_emploi") : 0;
        
        if (securite > 0) {
            addScore(scores, "Valeur_Stabilite_Securite", securite);
            log.debug("Question 9 - Sécurité: +{} points", securite);
        }
        
        // Innovation - accepter plusieurs variations
        Integer innovation = values.get("innovation") != null ? values.get("innovation") :
                           values.get("challenge") != null ? values.get("challenge") :
                           values.get("pointe") != null ? values.get("pointe") : 0;
        
        if (innovation > 0) {
            addScore(scores, "Valeur_Innovation_Challenge", innovation);
            log.debug("Question 9 - Innovation: +{} points", innovation);
        }
        
        // Autonomie - accepter plusieurs variations
        Integer autonomie = values.get("autonomie") != null ? values.get("autonomie") :
                           values.get("autonome") != null ? values.get("autonome") :
                           values.get("liberte") != null ? values.get("liberte") :
                           values.get("decisions") != null ? values.get("decisions") : 0;
        
        if (autonomie > 0) {
            addScore(scores, "Valeur_Autonomie", autonomie);
            log.debug("Question 9 - Autonomie: +{} points", autonomie);
        }
        
        // Salaire - accepter plusieurs variations
        Integer salaire = values.get("salaire") != null ? values.get("salaire") :
                         values.get("argent") != null ? values.get("argent") :
                         values.get("financier") != null ? values.get("financier") :
                         values.get("opportunites") != null ? values.get("opportunites") : 0;
        
        if (salaire > 0) {
            addScore(scores, "Interet_Business_Gestion", salaire);
            log.debug("Question 9 - Salaire: +{} points", salaire);
        }
        
        // Log des valeurs non reconnues
        values.forEach((key, value) -> {
            if (!key.equals("securite") && !key.equals("innovation") && 
                !key.equals("autonomie") && !key.equals("salaire") &&
                !key.equals("stabilite") && !key.equals("innov") && 
                !key.equals("challenge") && !key.equals("pointe") &&
                !key.equals("autonome") && !key.equals("liberte") && 
                !key.equals("decisions") && !key.equals("argent") &&
                !key.equals("financier") && !key.equals("opportunites")) {
                log.warn("Question 9 - Clé de curseur non reconnue: '{}' = {}", key, value);
            }
        });
    }
    
    /**
     * Question 10 : Motivation pour résoudre un problème
     * A (Comprendre): +4 Logique, +3 Résolution
     * B (Solution concrète): +4 Pratique, +3 Résolution
     * C (Rallier gens): +4 Communication, +3 Équipe
     * D (Techno avancée): +4 Innovation, +3 SciTech
     */
    private void processQuestion10(String answer, Map<String, Integer> scores) {
        if (answer == null) return;
        
        switch (answer.toUpperCase()) {
            case "A": // Comprendre
                addScore(scores, "Interet_Logique_Analytique", 4);
                addScore(scores, "Competence_Resolution_Problemes", 3);
                break;
            case "B": // Solution concrète
                addScore(scores, "Pref_Pratique_Terrain", 4);
                addScore(scores, "Competence_Resolution_Problemes", 3);
                break;
            case "C": // Rallier gens
                addScore(scores, "Competence_Communication", 4);
                addScore(scores, "Pref_Travail_Equipe_Collab", 3);
                break;
            case "D": // Techno avancée
                addScore(scores, "Valeur_Innovation_Challenge", 4);
                addScore(scores, "Interet_Scientifique_Tech", 3);
                break;
        }
    }
    
    /**
     * Question 11 : Préférence de travail
     * A (Seul): +5 Autonome, +4 Autonomie
     * B (Petite équipe): +5 Équipe
     * C (Grande structure): +4 Stabilité, +3 Organisation
     */
    private void processQuestion11(String answer, Map<String, Integer> scores) {
        if (answer == null) return;
        
        switch (answer.toUpperCase()) {
            case "A": // Seul
                addScore(scores, "Pref_Travail_Autonome", 5);
                addScore(scores, "Valeur_Autonomie", 4);
                break;
            case "B": // Petite équipe
                addScore(scores, "Pref_Travail_Equipe_Collab", 5);
                break;
            case "C": // Grande structure
                addScore(scores, "Valeur_Stabilite_Securite", 4);
                addScore(scores, "Competence_Organisation", 3);
                break;
        }
    }
    
    /**
     * Question 12 : Style de présentation
     * A (Faits): +4 Organisation, +3 Logique
     * B (Histoire): +4 Communication, +3 Artistique
     * C (Interagir): +4 Communication, +3 Social, +2 Équipe
     */
    private void processQuestion12(String answer, Map<String, Integer> scores) {
        if (answer == null) return;
        
        switch (answer.toUpperCase()) {
            case "A": // Faits
                addScore(scores, "Competence_Organisation", 4);
                addScore(scores, "Interet_Logique_Analytique", 3);
                break;
            case "B": // Histoire
                addScore(scores, "Competence_Communication", 4);
                addScore(scores, "Interet_Artistique_Creatif", 3);
                break;
            case "C": // Interagir
                addScore(scores, "Competence_Communication", 4);
                addScore(scores, "Interet_Social_Humain", 3);
                addScore(scores, "Pref_Travail_Equipe_Collab", 2);
                break;
        }
    }
    
    /**
     * Question 13 : Prise de décision
     * A (Logique): +5 Logique
     * B (Intuition): +4 Artistique, +3 Autonome
     * C (Avis autres): +4 Social, +3 Équipe
     */
    private void processQuestion13(String answer, Map<String, Integer> scores) {
        if (answer == null) return;
        
        switch (answer.toUpperCase()) {
            case "A": // Logique
                addScore(scores, "Interet_Logique_Analytique", 5);
                break;
            case "B": // Intuition
                addScore(scores, "Interet_Artistique_Creatif", 4);
                addScore(scores, "Pref_Travail_Autonome", 3);
                break;
            case "C": // Avis autres
                addScore(scores, "Interet_Social_Humain", 4);
                addScore(scores, "Pref_Travail_Equipe_Collab", 3);
                break;
        }
    }
    
    /**
     * Question 14 : Matières préférées (sélection multiple, 2-3 max)
     * Sciences: +4 SciTech, +4 Logique
     * Littérature/Langues: +3 Social, +3 Communication
     * SHS: +4 Social, +2 Théorie
     * Arts/Design: +4 Artistique
     * Techno/Info: +4 SciTech, +3 Logique
     * Gestion/Éco: +4 Business, +3 Organisation
     */
    private void processQuestion14(List<String> answers, Map<String, Integer> scores) {
        if (answers == null || answers.isEmpty()) return;
        
        // Limiter à 3 réponses maximum
        List<String> limitedAnswers = answers.stream()
            .limit(3)
            .toList();
        
        log.debug("Question 14 - Traitement des matières: {}", limitedAnswers);
        
        for (String answer : limitedAnswers) {
            // Normaliser la réponse (enlever les accents, mettre en minuscules)
            String normalizedAnswer = answer.toLowerCase()
                .replaceAll("[éèêë]", "e")
                .replaceAll("[àâä]", "a")
                .replaceAll("[îï]", "i")
                .replaceAll("[ôö]", "o")
                .replaceAll("[ûüù]", "u")
                .replaceAll("[ç]", "c");
            
            log.debug("Question 14 - Traitement de la réponse: '{}' -> '{}'", answer, normalizedAnswer);
            
            // Traitement avec mapping flexible
            if (normalizedAnswer.contains("sciences") || normalizedAnswer.contains("maths") || 
                normalizedAnswer.contains("physique") || normalizedAnswer.contains("chimie") || 
                normalizedAnswer.contains("svt") || normalizedAnswer.contains("biologie") ||
                normalizedAnswer.contains("a")) {
                addScore(scores, "Interet_Scientifique_Tech", 4);
                addScore(scores, "Interet_Logique_Analytique", 4);
                log.debug("Question 14 - Sciences: +4 SciTech, +4 Logique");
            } else if (normalizedAnswer.contains("litterature") || normalizedAnswer.contains("langues") || 
                       normalizedAnswer.contains("francais") || normalizedAnswer.contains("philosophie") ||
                       normalizedAnswer.contains("b")) {
                addScore(scores, "Interet_Social_Humain", 3);
                addScore(scores, "Competence_Communication", 3);
                log.debug("Question 14 - Littérature/Langues: +3 Social, +3 Communication");
            } else if (normalizedAnswer.contains("sciences sociales") || normalizedAnswer.contains("histoire") || 
                       normalizedAnswer.contains("geographie") || normalizedAnswer.contains("ses") || 
                       normalizedAnswer.contains("psychologie") || normalizedAnswer.contains("c")) {
                addScore(scores, "Interet_Social_Humain", 4);
                addScore(scores, "Pref_Theorie_Recherche", 2);
                log.debug("Question 14 - SHS: +4 Social, +2 Théorie");
            } else if (normalizedAnswer.contains("arts") || normalizedAnswer.contains("design") || 
                       normalizedAnswer.contains("arts plastiques") || normalizedAnswer.contains("musique") ||
                       normalizedAnswer.contains("d")) {
                addScore(scores, "Interet_Artistique_Creatif", 4);
                log.debug("Question 14 - Arts/Design: +4 Artistique");
            } else if (normalizedAnswer.contains("technologie") || normalizedAnswer.contains("informatique") || 
                       normalizedAnswer.contains("nsi") || normalizedAnswer.contains("sti2d") || 
                       normalizedAnswer.contains("sciences de l'ingenieur") || normalizedAnswer.contains("e")) {
                addScore(scores, "Interet_Scientifique_Tech", 4);
                addScore(scores, "Interet_Logique_Analytique", 3);
                log.debug("Question 14 - Techno/Info: +4 SciTech, +3 Logique");
            } else if (normalizedAnswer.contains("gestion") || normalizedAnswer.contains("economie") || 
                       normalizedAnswer.contains("management") || normalizedAnswer.contains("droit") ||
                       normalizedAnswer.contains("f")) {
                addScore(scores, "Interet_Business_Gestion", 4);
                addScore(scores, "Competence_Organisation", 3);
                log.debug("Question 14 - Gestion/Éco: +4 Business, +3 Organisation");
            } else {
                log.warn("Question 14 - Matière non reconnue: '{}' (normalisée: '{}')", answer, normalizedAnswer);
            }
        }
    }
    
    /**
     * Ajoute un score à un pilier
     */
    private void addScore(Map<String, Integer> scores, String pillar, int points) {
        scores.put(pillar, scores.getOrDefault(pillar, 0) + points);
    }
    
    /**
     * Normalise tous les scores sur une échelle de 0 à 100
     */
    private void normalizeScores(Map<String, Integer> scores) {
        // Trouver le score maximum
        int maxScore = scores.values().stream()
            .mapToInt(Integer::intValue)
            .max()
            .orElse(1);
        
        // Normaliser tous les scores
        scores.replaceAll((pillar, score) -> (int) Math.round((double) score / maxScore * 100));
    }
    
    /**
     * Crée le profil utilisateur final à partir des scores normalisés
     */
    private UserProfileDTO createUserProfile(Map<String, Integer> scores) {
        UserProfileDTO profile = new UserProfileDTO();
        
        // Intérêts
        profile.setInteretScientifiqueTech(scores.get("Interet_Scientifique_Tech"));
        profile.setInteretArtistiqueCreatif(scores.get("Interet_Artistique_Creatif"));
        profile.setInteretSocialHumain(scores.get("Interet_Social_Humain"));
        profile.setInteretBusinessGestion(scores.get("Interet_Business_Gestion"));
        profile.setInteretLogiqueAnalytique(scores.get("Interet_Logique_Analytique"));
        
        // Compétences
        profile.setCompetenceResolutionProblemes(scores.get("Competence_Resolution_Problemes"));
        profile.setCompetenceCommunication(scores.get("Competence_Communication"));
        profile.setCompetenceOrganisation(scores.get("Competence_Organisation"));
        profile.setCompetenceManuelTechnique(scores.get("Competence_Manuel_Technique"));
        
        // Valeurs
        profile.setValeurImpactSocietal(scores.get("Valeur_Impact_Societal"));
        profile.setValeurInnovationChallenge(scores.get("Valeur_Innovation_Challenge"));
        profile.setValeurStabiliteSecurite(scores.get("Valeur_Stabilite_Securite"));
        profile.setValeurAutonomie(scores.get("Valeur_Autonomie"));
        
        // Préférences
        profile.setPrefTravailEquipeCollab(scores.get("Pref_Travail_Equipe_Collab"));
        profile.setPrefTravailAutonome(scores.get("Pref_Travail_Autonome"));
        profile.setPrefPratiqueTerrain(scores.get("Pref_Pratique_Terrain"));
        profile.setPrefTheorieRecherche(scores.get("Pref_Theorie_Recherche"));
        
        return profile;
    }
}
