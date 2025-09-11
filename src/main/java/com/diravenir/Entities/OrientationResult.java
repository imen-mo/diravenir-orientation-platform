package com.diravenir.Entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orientation_results")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class OrientationResult {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orientation_test_id", nullable = false)
    @JsonIgnoreProperties({"result"})
    private OrientationTest orientationTest;
    
    @Column(name = "user_profile", columnDefinition = "TEXT")
    private String userProfile; // JSON string
    
    @Column(name = "top_recommendation_score")
    private Double topRecommendationScore;
    
    @Column(name = "top_recommendation_major")
    private String topRecommendationMajor;
    
    @Column(name = "calculation_method")
    private String calculationMethod;
    
    @Column(name = "calculated_at")
    private LocalDateTime calculatedAt;
    
    @OneToMany(mappedBy = "orientationResult", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"orientationResult"})
    private List<OrientationRecommendation> recommendations;
}