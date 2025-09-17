package com.diravenir.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrientationScoringService {

    /**
     * Calcule le profil utilisateur basé sur les réponses du test d'orientation
     * @param answers Map des réponses (q1, q2, ..., q14)
     * @return Map des scores de piliers (0-100)
     */
    public Map<String, Integer> calculateUserProfile(Map<String, String> answers) {
        log.info("🧮 Calcul du profil utilisateur avec {} réponses", answers.size());
        
        // Initialiser tous les piliers à 0
        Map<String, Integer> pillarScores = initializePillarScores();
        
        // Traiter chaque question
        for (Map.Entry<String, String> entry : answers.entrySet()) {
            String question = entry.getKey();
            String answer = entry.getValue();
            
            log.debug("📝 Traitement Q{}: {}", question.substring(1), answer);
            
            switch (question) {
                case "q1" -> processQ1(answer, pillarScores);
                case "q2" -> processQ2(answer, pillarScores);
                case "q3" -> processQ3(answer, pillarScores);
                case "q4" -> processQ4(answer, pillarScores);
                case "q5" -> processQ5(answer, pillarScores);
                case "q6" -> processQ6(answer, pillarScores);
                case "q7" -> processQ7(answer, pillarScores);
                case "q8" -> processQ8(answer, pillarScores);
                case "q9" -> processQ9(answer, pillarScores);
                case "q10" -> processQ10(answer, pillarScores);
                case "q11" -> processQ11(answer, pillarScores);
                case "q12" -> processQ12(answer, pillarScores);
                case "q13" -> processQ13(answer, pillarScores);
                case "q14" -> processQ14(answer, pillarScores);
            }
        }
        
        // Normaliser les scores sur 0-100
        normalizeScores(pillarScores);
        
        log.info("✅ Profil calculé: {}", pillarScores);
        return pillarScores;
    }

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
        
        // Piliers de Valeurs
        scores.put("Valeur_Impact_Societal", 0);
        scores.put("Valeur_Innovation_Challenge", 0);
        scores.put("Valeur_Stabilite_Securite", 0);
        scores.put("Valeur_Autonomie", 0);
        
        // Piliers de Préférences
        scores.put("Pref_Travail_Equipe_Collab", 0);
        scores.put("Pref_Travail_Autonome", 0);
        scores.put("Pref_Pratique_Terrain", 0);
        scores.put("Pref_Theorie_Recherche", 0);
        
        return scores;
    }

    // Q1: Que préférez-vous faire ?
    private void processQ1(String answer, Map<String, Integer> scores) {
        answer = validateAnswer(answer, "Q1", "B");
        switch (answer) {
            case "A" -> { // Créer
                addScore(scores, "Interet_Scientifique_Tech", 5);
                addScore(scores, "Interet_Artistique_Creatif", 3);
                addScore(scores, "Valeur_Innovation_Challenge", 4);
                addScore(scores, "Competence_Manuel_Technique", 2);
            }
            case "B" -> { // Comprendre
                addScore(scores, "Interet_Scientifique_Tech", 4);
                addScore(scores, "Interet_Logique_Analytique", 5);
                addScore(scores, "Competence_Resolution_Problemes", 4);
                addScore(scores, "Pref_Theorie_Recherche", 3);
            }
            case "C" -> { // Aider
                addScore(scores, "Interet_Social_Humain", 5);
                addScore(scores, "Valeur_Impact_Societal", 5);
                addScore(scores, "Competence_Communication", 4);
            }
            case "D" -> { // Organiser
                addScore(scores, "Interet_Business_Gestion", 5);
                addScore(scores, "Competence_Organisation", 5);
                addScore(scores, "Pref_Travail_Equipe_Collab", 3);
            }
            case "E" -> { // Créativité
                addScore(scores, "Interet_Artistique_Creatif", 5);
                addScore(scores, "Valeur_Innovation_Challenge", 2);
                addScore(scores, "Pref_Travail_Autonome", 3);
            }
        }
    }

    // Q2: Qu'est-ce qui vous passionne le plus ?
    private void processQ2(String answer, Map<String, Integer> scores) {
        answer = validateAnswer(answer, "Q2", "A");
        switch (answer) {
            case "A" -> { // Découvertes/Tech
                addScore(scores, "Interet_Scientifique_Tech", 3);
                addScore(scores, "Valeur_Innovation_Challenge", 2);
            }
            case "B" -> { // Art/Design
                addScore(scores, "Interet_Artistique_Creatif", 3);
            }
            case "C" -> { // Perso/Social
                addScore(scores, "Interet_Social_Humain", 3);
                addScore(scores, "Valeur_Impact_Societal", 2);
            }
            case "D" -> { // Éco/Strat
                addScore(scores, "Interet_Business_Gestion", 3);
            }
            case "E" -> { // Orga/Gestion
                addScore(scores, "Competence_Organisation", 3);
            }
            case "F" -> { // Sport/Bricolage
                addScore(scores, "Competence_Manuel_Technique", 3);
            }
        }
    }

    // Q3: Que préférez-vous comme activité ?
    private void processQ3(String answer, Map<String, Integer> scores) {
        answer = validateAnswer(answer, "Q3", "A");
        switch (answer) {
            case "A" -> { // Électronique
                addScore(scores, "Interet_Scientifique_Tech", 3);
                addScore(scores, "Competence_Manuel_Technique", 2);
            }
            case "B" -> { // Livres
                addScore(scores, "Interet_Logique_Analytique", 3);
                addScore(scores, "Pref_Theorie_Recherche", 2);
            }
            case "C" -> { // Art
                addScore(scores, "Interet_Artistique_Creatif", 3);
            }
            case "D" -> { // Jeux
                addScore(scores, "Interet_Social_Humain", 3);
            }
            case "E" -> { // Mode
                addScore(scores, "Interet_Business_Gestion", 3);
                addScore(scores, "Interet_Artistique_Creatif", 2);
            }
        }
    }

    // Q4: Comment abordez-vous un problème ?
    private void processQ4(String answer, Map<String, Integer> scores) {
        answer = validateAnswer(answer, "Q4", "A");
        switch (answer) {
            case "A" -> { // Décomposer
                addScore(scores, "Competence_Resolution_Problemes", 4);
                addScore(scores, "Interet_Logique_Analytique", 4);
            }
            case "B" -> { // Chercher faits
                addScore(scores, "Interet_Scientifique_Tech", 3);
                addScore(scores, "Interet_Logique_Analytique", 3);
                addScore(scores, "Pref_Theorie_Recherche", 2);
            }
            case "C" -> { // Imaginer
                addScore(scores, "Interet_Artistique_Creatif", 4);
                addScore(scores, "Valeur_Innovation_Challenge", 4);
            }
            case "D" -> { // Autres
                addScore(scores, "Competence_Communication", 4);
                addScore(scores, "Pref_Travail_Equipe_Collab", 4);
                addScore(scores, "Interet_Social_Humain", 2);
            }
        }
    }

    // Q5: Quelle activité vous correspond le mieux ? (Choix unique)
    private void processQ5(String answer, Map<String, Integer> scores) {
        answer = validateAnswer(answer, "Q5", "F");
        switch (answer) {
            case "A" -> { // Gérer budget
                addScore(scores, "Interet_Business_Gestion", 4);
                addScore(scores, "Competence_Organisation", 4);
                addScore(scores, "Interet_Logique_Analytique", 4);
            }
            case "B" -> { // Organiser événement
                addScore(scores, "Competence_Organisation", 4);
                addScore(scores, "Pref_Travail_Equipe_Collab", 4);
                addScore(scores, "Competence_Communication", 4);
            }
            case "C" -> { // Écrire texte
                addScore(scores, "Competence_Communication", 4);
                addScore(scores, "Interet_Artistique_Creatif", 4);
            }
            case "D" -> { // Réparer
                addScore(scores, "Competence_Manuel_Technique", 4);
                addScore(scores, "Interet_Scientifique_Tech", 4);
            }
            case "E" -> { // Dessiner
                addScore(scores, "Interet_Artistique_Creatif", 4);
                addScore(scores, "Competence_Manuel_Technique", 4);
            }
            case "F" -> { // Équation
                addScore(scores, "Interet_Logique_Analytique", 4);
                addScore(scores, "Interet_Scientifique_Tech", 4);
            }
            case "G" -> { // Convaincre
                addScore(scores, "Competence_Communication", 4);
                addScore(scores, "Interet_Business_Gestion", 4);
            }
            case "H" -> { // Conseiller ami
                addScore(scores, "Interet_Social_Humain", 4);
                addScore(scores, "Competence_Communication", 4);
            }
        }
    }

    // Q6: Comment préférez-vous apprendre ?
    private void processQ6(String answer, Map<String, Integer> scores) {
        answer = validateAnswer(answer, "Q6", "A");
        switch (answer) {
            case "A" -> { // Lire
                addScore(scores, "Pref_Theorie_Recherche", 4);
                addScore(scores, "Interet_Logique_Analytique", 3);
            }
            case "B" -> { // Vidéo
                addScore(scores, "Interet_Scientifique_Tech", 3);
            }
            case "C" -> { // Essayer
                addScore(scores, "Competence_Manuel_Technique", 4);
                addScore(scores, "Pref_Pratique_Terrain", 4);
            }
            case "D" -> { // Discuter
                addScore(scores, "Competence_Communication", 4);
                addScore(scores, "Pref_Travail_Equipe_Collab", 4);
            }
        }
    }

    // Q7: Qu'est-ce qui vous motive le plus ?
    private void processQ7(String answer, Map<String, Integer> scores) {
        answer = validateAnswer(answer, "Q7", "A");
        switch (answer) {
            case "A" -> { // Améliorer vie
                addScore(scores, "Valeur_Impact_Societal", 5);
                addScore(scores, "Interet_Social_Humain", 4);
            }
            case "B" -> { // Systèmes efficaces
                addScore(scores, "Valeur_Innovation_Challenge", 4);
                addScore(scores, "Interet_Scientifique_Tech", 3);
            }
            case "C" -> { // Beauté
                addScore(scores, "Interet_Artistique_Creatif", 5);
            }
            case "D" -> { // Justice
                addScore(scores, "Valeur_Impact_Societal", 5);
                addScore(scores, "Interet_Social_Humain", 3);
            }
        }
    }

    // Q8: Dans quel environnement préférez-vous travailler ?
    private void processQ8(String answer, Map<String, Integer> scores) {
        answer = validateAnswer(answer, "Q8", "A");
        switch (answer) {
            case "A" -> { // Labo
                addScore(scores, "Pref_Theorie_Recherche", 4);
                addScore(scores, "Interet_Scientifique_Tech", 3);
            }
            case "B" -> { // Bureau coll.
                addScore(scores, "Pref_Travail_Equipe_Collab", 4);
                addScore(scores, "Interet_Business_Gestion", 2);
            }
            case "C" -> { // Studio
                addScore(scores, "Interet_Artistique_Creatif", 4);
                addScore(scores, "Competence_Manuel_Technique", 3);
            }
            case "D" -> { // Chantier
                addScore(scores, "Pref_Pratique_Terrain", 4);
                addScore(scores, "Competence_Manuel_Technique", 3);
            }
            case "E" -> { // Calme
                addScore(scores, "Pref_Travail_Autonome", 4);
                addScore(scores, "Pref_Theorie_Recherche", 2);
            }
        }
    }

    // Q9: Quelle valeur est la plus importante pour vous ? (Choix unique)
    private void processQ9(String answer, Map<String, Integer> scores) {
        answer = validateAnswer(answer, "Q9", "B");
        switch (answer) {
            case "A" -> { // Sécurité
                addScore(scores, "Valeur_Stabilite_Securite", 5);
            }
            case "B" -> { // Innovation
                addScore(scores, "Valeur_Innovation_Challenge", 5);
            }
            case "C" -> { // Autonomie
                addScore(scores, "Valeur_Autonomie", 5);
            }
            case "D" -> { // Salaire
                addScore(scores, "Interet_Business_Gestion", 5);
            }
        }
    }

    // Q10: Comment résolvez-vous un problème complexe ?
    private void processQ10(String answer, Map<String, Integer> scores) {
        answer = validateAnswer(answer, "Q10", "A");
        switch (answer) {
            case "A" -> { // Comprendre
                addScore(scores, "Interet_Logique_Analytique", 4);
                addScore(scores, "Competence_Resolution_Problemes", 3);
            }
            case "B" -> { // Solution concrète
                addScore(scores, "Pref_Pratique_Terrain", 4);
                addScore(scores, "Competence_Resolution_Problemes", 3);
            }
            case "C" -> { // Rallier gens
                addScore(scores, "Competence_Communication", 4);
                addScore(scores, "Pref_Travail_Equipe_Collab", 3);
            }
            case "D" -> { // Techno avancée
                addScore(scores, "Valeur_Innovation_Challenge", 4);
                addScore(scores, "Interet_Scientifique_Tech", 3);
            }
        }
    }

    // Q11: Dans quelle structure préférez-vous travailler ?
    private void processQ11(String answer, Map<String, Integer> scores) {
        answer = validateAnswer(answer, "Q11", "B");
        switch (answer) {
            case "A" -> { // Seul
                addScore(scores, "Pref_Travail_Autonome", 5);
                addScore(scores, "Valeur_Autonomie", 4);
            }
            case "B" -> { // Petite équipe
                addScore(scores, "Pref_Travail_Equipe_Collab", 5);
            }
            case "C" -> { // Grande structure
                addScore(scores, "Valeur_Stabilite_Securite", 4);
                addScore(scores, "Competence_Organisation", 3);
            }
        }
    }

    // Q12: Que préférez-vous étudier ?
    private void processQ12(String answer, Map<String, Integer> scores) {
        answer = validateAnswer(answer, "Q12", "A");
        switch (answer) {
            case "A" -> { // Faits
                addScore(scores, "Competence_Organisation", 4);
                addScore(scores, "Interet_Logique_Analytique", 3);
            }
            case "B" -> { // Histoire
                addScore(scores, "Competence_Communication", 4);
                addScore(scores, "Interet_Artistique_Creatif", 3);
            }
            case "C" -> { // Interagir
                addScore(scores, "Competence_Communication", 4);
                addScore(scores, "Interet_Social_Humain", 3);
                addScore(scores, "Pref_Travail_Equipe_Collab", 2);
            }
        }
    }

    // Q13: Comment prenez-vous vos décisions ?
    private void processQ13(String answer, Map<String, Integer> scores) {
        answer = validateAnswer(answer, "Q13", "A");
        switch (answer) {
            case "A" -> { // Logique
                addScore(scores, "Interet_Logique_Analytique", 5);
            }
            case "B" -> { // Intuition
                addScore(scores, "Interet_Artistique_Creatif", 4);
                addScore(scores, "Pref_Travail_Autonome", 3);
            }
            case "C" -> { // Avis autres
                addScore(scores, "Interet_Social_Humain", 4);
                addScore(scores, "Pref_Travail_Equipe_Collab", 3);
            }
        }
    }

    // Q14: Quelles matières vous ont le plus passionné ? (Choix unique)
    private void processQ14(String answer, Map<String, Integer> scores) {
        answer = validateAnswer(answer, "Q14", "A");
        switch (answer) {
            case "A" -> { // Sciences
                addScore(scores, "Interet_Scientifique_Tech", 4);
                addScore(scores, "Interet_Logique_Analytique", 4);
            }
            case "B" -> { // Littérature/Langues
                addScore(scores, "Interet_Social_Humain", 3);
                addScore(scores, "Competence_Communication", 3);
            }
            case "C" -> { // SHS
                addScore(scores, "Interet_Social_Humain", 4);
                addScore(scores, "Pref_Theorie_Recherche", 2);
            }
            case "D" -> { // Arts/Design
                addScore(scores, "Interet_Artistique_Creatif", 4);
            }
            case "E" -> { // Techno/Info
                addScore(scores, "Interet_Scientifique_Tech", 4);
                addScore(scores, "Interet_Logique_Analytique", 3);
            }
            case "F" -> { // Gestion/Éco
                addScore(scores, "Interet_Business_Gestion", 4);
                addScore(scores, "Competence_Organisation", 3);
            }
        }
    }

    private void addScore(Map<String, Integer> scores, String pillar, int points) {
        scores.put(pillar, scores.get(pillar) + points);
    }
    
    /**
     * Valide et corrige une réponse null
     */
    private String validateAnswer(String answer, String questionName, String defaultValue) {
        if (answer == null) {
            log.warn("⚠️ Réponse {} est null, utilisation de la valeur par défaut '{}'", questionName, defaultValue);
            return defaultValue;
        }
        return answer;
    }

    private void normalizeScores(Map<String, Integer> scores) {
        // Trouver le score maximum
        int maxScore = scores.values().stream().mapToInt(Integer::intValue).max().orElse(1);
        
        // Normaliser sur 0-100
        for (Map.Entry<String, Integer> entry : scores.entrySet()) {
            int normalizedScore = (int) Math.round((double) entry.getValue() / maxScore * 100);
            entry.setValue(Math.min(100, Math.max(0, normalizedScore)));
        }
        
        log.debug("📊 Scores normalisés (max original: {}): {}", maxScore, scores);
    }
}
