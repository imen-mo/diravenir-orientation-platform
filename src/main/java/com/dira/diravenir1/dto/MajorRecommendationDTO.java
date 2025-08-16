package com.dira.diravenir1.dto;

/**
 * DTO pour les recommandations de majeures
 * Contient le nom, le score de correspondance et l'explication
 */
public class MajorRecommendationDTO {
    
    private String name;
    private int matchingScore;
    private String explanation;
    private String description;
    private UserProfileDTO idealProfile;

    // Constructeurs
    public MajorRecommendationDTO() {}

    public MajorRecommendationDTO(String name, int matchingScore, String explanation, String description) {
        this.name = name;
        this.matchingScore = matchingScore;
        this.explanation = explanation;
        this.description = description;
    }

    // Getters et Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getMatchingScore() { return matchingScore; }
    public void setMatchingScore(int matchingScore) { this.matchingScore = matchingScore; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public UserProfileDTO getIdealProfile() { return idealProfile; }
    public void setIdealProfile(UserProfileDTO idealProfile) { this.idealProfile = idealProfile; }

    @Override
    public String toString() {
        return "MajorRecommendationDTO{" +
                "name='" + name + '\'' +
                ", matchingScore=" + matchingScore +
                ", explanation='" + explanation + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
