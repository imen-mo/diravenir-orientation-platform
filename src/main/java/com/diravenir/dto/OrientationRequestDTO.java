package com.diravenir.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrientationRequestDTO {
    
    // Question 1: Activité idéale
    private String q1;
    
    // Question 2: Centres d'intérêt (choix unique)
    private String q2;
    
    // Question 3: Cadeau préféré
    private String q3;
    
    // Question 4: Approche des problèmes
    private String q4;
    
    // Question 5: Compétences préférées (choix unique)
    private String q5;
    
    // Question 6: Méthode d'apprentissage
    private String q6;
    
    // Question 7: Valeurs professionnelles
    private String q7;
    
    // Question 8: Environnement de travail
    private String q8;
    
    // Question 9: Priorités (choix unique)
    private String q9;
    
    // Question 10: Approche des défis
    private String q10;
    
    // Question 11: Préférence de travail
    private String q11;
    
    // Question 12: Méthode de présentation
    private String q12;
    
    // Question 13: Style de décision
    private String q13;
    
    // Question 14: Matières préférées (choix unique)
    private String q14;
    
    // Informations étudiant de la question 15
    private StudentInfoDTO studentInfo;
}
