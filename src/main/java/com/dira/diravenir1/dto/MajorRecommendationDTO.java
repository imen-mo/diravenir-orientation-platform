package com.dira.diravenir1.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MajorRecommendationDTO {
    
    // Propriétés existantes
    private String nom;
    private String domaine;
    private Integer score;
    private String universite;
    private String description;
    private String prerequis;
    private String debouches;
    
    // Propriétés manquantes pour RecommendationService
    private String name;           // Nom en anglais (alias de nom)
    private Integer matchingScore; // Score de correspondance
    private String explanation;    // Explication de la recommandation
    
    // Méthodes pour maintenir la compatibilité
    public String getName() {
        return name != null ? name : nom;
    }
    
    public void setName(String name) {
        this.name = name;
        if (this.nom == null) {
            this.nom = name;
        }
    }
    
    public Integer getMatchingScore() {
        return matchingScore != null ? matchingScore : score;
    }
    
    public void setMatchingScore(Integer matchingScore) {
        this.matchingScore = matchingScore;
        if (this.score == null) {
            this.score = matchingScore;
        }
    }
    
    public String getExplanation() {
        return explanation != null ? explanation : description;
    }
    
    public void setExplanation(String explanation) {
        this.explanation = explanation;
        if (this.description == null) {
            this.description = explanation;
        }
    }
}
