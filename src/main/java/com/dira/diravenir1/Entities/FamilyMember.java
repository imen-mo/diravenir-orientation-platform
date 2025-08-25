package com.dira.diravenir1.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "family_members")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FamilyMember {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false)
    private Application application;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String nationality;
    
    @Column
    private String email;
    
    @Column
    private String workplace;
    
    @Column
    private String position;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FamilyRelationship relationship;
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    public enum FamilyRelationship {
        FATHER("Father"),
        MOTHER("Mother"),
        GUARDIAN("Guardian"),
        SPOUSE("Spouse"),
        BROTHER("Brother"),
        SISTER("Sister"),
        OTHER("Other");
        
        private final String displayName;
        
        FamilyRelationship(String displayName) {
            this.displayName = displayName;
        }
        
        public String getDisplayName() {
            return displayName;
        }
    }
}
