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
@Table(name = "work_experience_blocks")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkExperienceBlock {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "application_id", nullable = false)
    private Long applicationId;
    
    @Column(nullable = false)
    private String employer;
    
    @Column(name = "job_title", nullable = false)
    private String jobTitle;
    
    @Column(name = "started_date", nullable = false)
    private LocalDate startedDate;
    
    @Column(name = "finished_date")
    private LocalDate finishedDate;
    
    @Column
    private String department;
    
    @Column
    private String location;
    
    @Column
    private String country;
    
    @Column
    private String city;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(columnDefinition = "TEXT")
    private String responsibilities;
    
    @Column
    private String salary;
    
    @Column
    private String currency;
    
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
        StringBuilder name = new StringBuilder(employer);
        if (jobTitle != null && !jobTitle.trim().isEmpty()) {
            name.append(" - ").append(jobTitle);
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
    
    public String getLocationDisplay() {
        StringBuilder location = new StringBuilder();
        if (city != null && !city.trim().isEmpty()) {
            location.append(city);
        }
        if (country != null && !country.trim().isEmpty()) {
            if (location.length() > 0) {
                location.append(", ");
            }
            location.append(country);
        }
        return location.length() > 0 ? location.toString() : "N/A";
    }
}
