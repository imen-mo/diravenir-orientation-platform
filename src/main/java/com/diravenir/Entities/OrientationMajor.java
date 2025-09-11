package com.diravenir.Entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.util.List;

@Entity
@Table(name = "orientation_majors")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrientationMajor {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "major_name", nullable = false, unique = true)
    private String majorName;
    
    @Column(name = "major_code", unique = true)
    private String majorCode;
    
    @Column(name = "description", length = 2000)
    private String description;
    
    @Column(name = "user_description", length = 1000)
    private String userDescription;
    
    @Column(name = "category")
    private String category;
    
    @Column(name = "is_active", nullable = false)
    private Boolean isActive;
    
    @Column(name = "display_order")
    private Integer displayOrder;
    
    @Column(name = "created_at", nullable = false)
    private java.time.LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private java.time.LocalDateTime updatedAt;
    
    @OneToMany(mappedBy = "major", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<IdealProfile> idealProfiles;
    
    @PrePersist
    protected void onCreate() {
        createdAt = java.time.LocalDateTime.now();
        if (isActive == null) {
            isActive = true;
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = java.time.LocalDateTime.now();
    }
}
