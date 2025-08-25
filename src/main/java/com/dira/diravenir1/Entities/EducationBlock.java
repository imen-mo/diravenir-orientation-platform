package com.dira.diravenir1.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "education_blocks")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EducationBlock {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "application_id", nullable = false)
    private Long applicationId;
    
    @Column(nullable = false)
    private String school;
    
    @Column
    private String major;
    
    @Column(name = "started_date", nullable = false)
    private LocalDate startedDate;
    
    @Column(name = "finished_date")
    private LocalDate finishedDate;
    
    @Column
    private String grade;
    
    @Column
    private String gpa;
    
    @Column
    private String country;
    
    @Column
    private String city;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "is_current", nullable = false)
    private Boolean isCurrent = false;
    
    @Column(name = "block_order", nullable = false)
    private Integer blockOrder = 0;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (updatedAt == null) {
            updatedAt = LocalDateTime.now();
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // Méthodes utilitaires
    public boolean isCompleted() {
        return finishedDate != null;
    }
    
    public String getDuration() {
        if (startedDate == null) return "N/A";
        
        if (finishedDate == null) {
            return "En cours depuis " + startedDate.getYear();
        }
        
        int years = finishedDate.getYear() - startedDate.getYear();
        int months = finishedDate.getMonthValue() - startedDate.getMonthValue();
        
        if (months < 0) {
            years--;
            months += 12;
        }
        
        if (years > 0) {
            return years + " an" + (years > 1 ? "s" : "") + (months > 0 ? " et " + months + " mois" : "");
        } else {
            return months + " mois";
        }
    }
    
    public String getDisplayName() {
        StringBuilder name = new StringBuilder(school);
        if (major != null && !major.trim().isEmpty()) {
            name.append(" - ").append(major);
        }
        if (startedDate != null) {
            name.append(" (").append(startedDate.getYear());
            if (finishedDate != null) {
                name.append("-").append(finishedDate.getYear());
            } else {
                name.append("-Présent");
            }
            name.append(")");
        }
        return name.toString();
    }
}
