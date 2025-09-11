package com.diravenir.Entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Entity
@Table(name = "ideal_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IdealProfile {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "program_id", nullable = false)
    private OrientationMajor major;
    
    @Column(name = "pillar_name", nullable = false)
    private String pillarName;
    
    @Column(name = "ideal_score", nullable = false)
    private Integer idealScore;
    
    // Note: Database doesn't have created_at/updated_at columns
    // These fields are removed to match actual database structure
}
