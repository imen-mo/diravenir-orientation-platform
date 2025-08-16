package com.dira.diravenir1.dto;

import java.util.List;
import java.util.Map;

/**
 * DTO pour les réponses du test d'orientation unifié
 * Contient les 14 questions avec leurs réponses
 */
public class OrientationRequestDTO {
    
    // Question 1 - Activité idéale (single choice)
    private String question1;
    
    // Question 2 - Contenu internet/vidéos (multiple choice, max 3)
    private List<String> question2;
    
    // Question 3 - Section magasin (single choice)
    private String question3;
    
    // Question 4 - Réaction aux problèmes (single choice)
    private String question4;
    
    // Question 5 - Activités naturelles (drag & drop, top 3)
    private List<String> question5;
    
    // Question 6 - Apprentissage préféré (single choice)
    private String question6;
    
    // Question 7 - Impact dans le monde (single choice)
    private String question7;
    
    // Question 8 - Environnement de travail (single choice)
    private String question8;
    
    // Question 9 - Critères carrière (sliders 0-100)
    private Map<String, Integer> question9;
    
    // Question 10 - Motivation résolution problèmes (single choice)
    private String question10;
    
    // Question 11 - Préférence de travail (single choice)
    private String question11;
    
    // Question 12 - Présentation/exposé (single choice)
    private String question12;
    
    // Question 13 - Prise de décision (single choice)
    private String question13;
    
    // Question 14 - Matières préférées (multiple choice, max 3)
    private List<String> question14;

    // Constructeurs
    public OrientationRequestDTO() {}

    // Getters et Setters
    public String getQuestion1() { return question1; }
    public void setQuestion1(String question1) { this.question1 = question1; }

    public List<String> getQuestion2() { return question2; }
    public void setQuestion2(List<String> question2) { this.question2 = question2; }

    public String getQuestion3() { return question3; }
    public void setQuestion3(String question3) { this.question3 = question3; }

    public String getQuestion4() { return question4; }
    public void setQuestion4(String question4) { this.question4 = question4; }

    public List<String> getQuestion5() { return question5; }
    public void setQuestion5(List<String> question5) { this.question5 = question5; }

    public String getQuestion6() { return question6; }
    public void setQuestion6(String question6) { this.question6 = question6; }

    public String getQuestion7() { return question7; }
    public void setQuestion7(String question7) { this.question7 = question7; }

    public String getQuestion8() { return question8; }
    public void setQuestion8(String question8) { this.question8 = question8; }

    public Map<String, Integer> getQuestion9() { return question9; }
    public void setQuestion9(Map<String, Integer> question9) { this.question9 = question9; }

    public String getQuestion10() { return question10; }
    public void setQuestion10(String question10) { this.question10 = question10; }

    public String getQuestion11() { return question11; }
    public void setQuestion11(String question11) { this.question11 = question11; }

    public String getQuestion12() { return question12; }
    public void setQuestion12(String question12) { this.question12 = question12; }

    public String getQuestion13() { return question13; }
    public void setQuestion13(String question13) { this.question13 = question13; }

    public List<String> getQuestion14() { return question14; }
    public void setQuestion14(List<String> question14) { this.question14 = question14; }

    @Override
    public String toString() {
        return "OrientationRequestDTO{" +
                "question1='" + question1 + '\'' +
                ", question2=" + question2 +
                ", question3='" + question3 + '\'' +
                ", question4='" + question4 + '\'' +
                ", question5=" + question5 +
                ", question6='" + question6 + '\'' +
                ", question7='" + question7 + '\'' +
                ", question8='" + question8 + '\'' +
                ", question9=" + question9 +
                ", question10='" + question10 + '\'' +
                ", question11='" + question11 + '\'' +
                ", question12='" + question12 + '\'' +
                ", question13='" + question13 + '\'' +
                ", question14=" + question14 +
                '}';
    }
}
