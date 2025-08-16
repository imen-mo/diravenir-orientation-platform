package com.dira.diravenir1.dto;

import java.util.List;

/**
 * DTO pour la réponse complète du système d'orientation
 * Contient le profil utilisateur et les recommandations
 */
public class OrientationResponseDTO {
    
    private UserProfileDTO userProfile;
    private List<MajorRecommendationDTO> top3Recommendations;
    private List<MajorRecommendationDTO> allRecommendations;
    private String summary;

    // Constructeurs
    public OrientationResponseDTO() {}

    public OrientationResponseDTO(UserProfileDTO userProfile, 
                                List<MajorRecommendationDTO> top3Recommendations,
                                List<MajorRecommendationDTO> allRecommendations,
                                String summary) {
        this.userProfile = userProfile;
        this.top3Recommendations = top3Recommendations;
        this.allRecommendations = allRecommendations;
        this.summary = summary;
    }

    // Getters et Setters
    public UserProfileDTO getUserProfile() { return userProfile; }
    public void setUserProfile(UserProfileDTO userProfile) { this.userProfile = userProfile; }

    public List<MajorRecommendationDTO> getTop3Recommendations() { return top3Recommendations; }
    public void setTop3Recommendations(List<MajorRecommendationDTO> top3Recommendations) { 
        this.top3Recommendations = top3Recommendations; 
    }

    public List<MajorRecommendationDTO> getAllRecommendations() { return allRecommendations; }
    public void setAllRecommendations(List<MajorRecommendationDTO> allRecommendations) { 
        this.allRecommendations = allRecommendations; 
    }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    @Override
    public String toString() {
        return "OrientationResponseDTO{" +
                "userProfile=" + userProfile +
                ", top3Recommendations=" + top3Recommendations +
                ", allRecommendations=" + allRecommendations +
                ", summary='" + summary + '\'' +
                '}';
    }
}
