package com.diravenir.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "family_member_blocks")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FamilyMemberBlock {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "application_id", nullable = false)
    private Long applicationId;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String nationality;
    
    @Column
    private String email;
    
    @Column
    private String phone;
    
    @Column
    private String workplace;
    
    @Column
    private String position;
    
    @Column(nullable = false)
    private String relationship;
    
    @Column
    private LocalDate dateOfBirth;
    
    @Column
    private String gender;
    
    @Column
    private String address;
    
    @Column
    private String country;
    
    @Column
    private String city;
    
    @Column
    private String occupation;
    
    @Column
    private String income;
    
    @Column
    private String currency;
    
    @Column(columnDefinition = "TEXT")
    private String notes;
    
    @Column(name = "is_emergency_contact", nullable = false)
    private Boolean isEmergencyContact = false;
    
    @Column(name = "is_financial_supporter", nullable = false)
    private Boolean isFinancialSupporter = false;
    
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
    public String getDisplayName() {
        StringBuilder displayName = new StringBuilder(name);
        if (relationship != null && !relationship.trim().isEmpty()) {
            displayName.append(" (").append(relationship).append(")");
        }
        return displayName.toString();
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
    
    public String getContactInfo() {
        StringBuilder contact = new StringBuilder();
        if (email != null && !email.trim().isEmpty()) {
            contact.append(email);
        }
        if (phone != null && !phone.trim().isEmpty()) {
            if (contact.length() > 0) {
                contact.append(" | ");
            }
            contact.append(phone);
        }
        return contact.length() > 0 ? contact.toString() : "Aucun contact";
    }
    
    public String getWorkInfo() {
        StringBuilder work = new StringBuilder();
        if (workplace != null && !workplace.trim().isEmpty()) {
            work.append(workplace);
        }
        if (position != null && !position.trim().isEmpty()) {
            if (work.length() > 0) {
                work.append(" - ");
            }
            work.append(position);
        }
        return work.length() > 0 ? work.toString() : "N/A";
    }
    
    public boolean hasContactInfo() {
        return (email != null && !email.trim().isEmpty()) || 
               (phone != null && !phone.trim().isEmpty());
    }
    
    public boolean hasWorkInfo() {
        return (workplace != null && !workplace.trim().isEmpty()) || 
               (position != null && !position.trim().isEmpty());
    }
}
