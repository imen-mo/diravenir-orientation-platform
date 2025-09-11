package com.diravenir.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "orientation_recommendations")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrientationRecommendation {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orientation_result_id", nullable = false)
    private OrientationResult orientationResult;
    
    @Column(name = "major_code", nullable = false)
    private String majorCode;
    
    @Column(name = "major_name", nullable = false)
    private String majorName;
    
    @Column(name = "matching_score", nullable = false)
    private Double matchingScore;
    
    @Column(name = "matching_percentage")
    private String matchingPercentage;
    
    @Column(name = "category")
    private String category;
    
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "why_this_major", columnDefinition = "TEXT")
    private String whyThisMajor;
    
    @Column(name = "reasoning", columnDefinition = "TEXT")
    private String reasoning;
    
    @Column(name = "rank_position")
    private Integer rankPosition;
}
