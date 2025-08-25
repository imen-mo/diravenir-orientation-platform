package com.dira.diravenir1.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Map;

/**
 * DTO pour les réponses au questionnaire d'orientation des étudiants.
 * 
 * Ce DTO contient les 14 questions réparties en 5 catégories :
 * 1. Intérêts et Passions (Q1-Q3)
 * 2. Compétences et Aptitudes (Q4-Q6)
 * 3. Valeurs et Objectifs (Q7-Q10)
 * 4. Préférences de Travail et Personnalité (Q11-Q13)
 * 5. Matières et Parcours Académiques Préférés (Q14)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrientationRequestDTO {
    
    // ==================== CATÉGORIE 1: INTÉRÊTS ET PASSIONS ====================
    
    /**
     * Question 1: Activité idéale pour une journée parfaite
     * Options: A, B, C, D, E
     */
    private String question1;
    
    /**
     * Question 2: Contenu internet/vidéos préféré (sélection multiple, 3 max)
     * Options: Découvertes scientifiques, Art et culture, Développement personnel, etc.
     */
    private List<String> question2;
    
    /**
     * Question 3: Section de magasin préférée
     * Options: A, B, C, D, E
     */
    private String question3;
    
    // ==================== CATÉGORIE 2: COMPÉTENCES ET APTITUDES ====================
    
    /**
     * Question 4: Réaction face à un problème complexe
     * Options: A, B, C, D
     */
    private String question4;
    
    /**
     * Question 5: Activités naturelles (glisser-déposer, 3 options)
     * Options: Gérer un budget, Organiser un événement, Écrire un texte, etc.
     */
    private List<String> question5;
    
    /**
     * Question 6: Préférence d'apprentissage
     * Options: A, B, C, D
     */
    private String question6;
    
    // ==================== CATÉGORIE 3: VALEURS ET OBJECTIFS ====================
    
    /**
     * Question 7: Type d'impact souhaité
     * Options: A, B, C, D
     */
    private String question7;
    
    /**
     * Question 8: Environnement de travail préféré
     * Options: A, B, C, D, E
     */
    private String question8;
    
    /**
     * Question 9: Critères de carrière (curseurs 0-5)
     * Clés: securite, innovation, autonomie, salaire
     */
    private Map<String, Integer> question9;
    
    /**
     * Question 10: Motivation pour résoudre un problème
     * Options: A, B, C, D
     */
    private String question10;
    
    // ==================== CATÉGORIE 4: PRÉFÉRENCES DE TRAVAIL ET PERSONNALITÉ ====================
    
    /**
     * Question 11: Préférence de travail
     * Options: A, B, C
     */
    private String question11;
    
    /**
     * Question 12: Style de présentation
     * Options: A, B, C
     */
    private String question12;
    
    /**
     * Question 13: Prise de décision
     * Options: A, B, C
     */
    private String question13;
    
    // ==================== CATÉGORIE 5: MATIÈRES ET PARCOURS ACADÉMIQUES ====================
    
    /**
     * Question 14: Matières préférées (sélection multiple, 2-3 max)
     * Options: Sciences, Littérature et Langues, SHS, Arts et Design, etc.
     */
    private List<String> question14;
    
    // ==================== MÉTHODES UTILITAIRES ====================
    
    /**
     * Vérifie si toutes les questions ont été répondues
     */
    public boolean isComplete() {
        return question1 != null && !question1.trim().isEmpty() &&
               question2 != null && !question2.isEmpty() &&
               question3 != null && !question3.trim().isEmpty() &&
               question4 != null && !question4.trim().isEmpty() &&
               question5 != null && !question5.isEmpty() &&
               question6 != null && !question6.trim().isEmpty() &&
               question7 != null && !question7.trim().isEmpty() &&
               question8 != null && !question8.trim().isEmpty() &&
               question9 != null && !question9.isEmpty() &&
               question10 != null && !question10.trim().isEmpty() &&
               question11 != null && !question11.trim().isEmpty() &&
               question12 != null && !question12.trim().isEmpty() &&
               question13 != null && !question13.trim().isEmpty() &&
               question14 != null && !question14.isEmpty();
    }
    
    /**
     * Retourne le nombre de questions répondues
     */
    public int getAnsweredQuestionsCount() {
        int count = 0;
        if (question1 != null && !question1.trim().isEmpty()) count++;
        if (question2 != null && !question2.isEmpty()) count++;
        if (question3 != null && !question3.trim().isEmpty()) count++;
        if (question4 != null && !question4.trim().isEmpty()) count++;
        if (question5 != null && !question5.isEmpty()) count++;
        if (question6 != null && !question6.trim().isEmpty()) count++;
        if (question7 != null && !question7.trim().isEmpty()) count++;
        if (question8 != null && !question8.trim().isEmpty()) count++;
        if (question9 != null && !question9.isEmpty()) count++;
        if (question10 != null && !question10.trim().isEmpty()) count++;
        if (question11 != null && !question11.trim().isEmpty()) count++;
        if (question12 != null && !question12.trim().isEmpty()) count++;
        if (question13 != null && !question13.trim().isEmpty()) count++;
        if (question14 != null && !question14.isEmpty()) count++;
        return count;
    }
    
    /**
     * Retourne le pourcentage de completion du questionnaire
     */
    public double getCompletionPercentage() {
        return (double) getAnsweredQuestionsCount() / 14 * 100;
    }
}
