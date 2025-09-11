package com.diravenir.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "policies")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Policy {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = true)
    private PolicyType policyType;
    
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;
    
    @Column(nullable = false)
    private String version = "1.0";
    
    @Column(nullable = false)
    private Boolean isActive = true;
    
    @Column(nullable = false)
    private Boolean requiresConsent = true;
    
    @Column
    private String lastUpdatedBy;
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(nullable = false)
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
    
    // Enum pour les types de politiques
    public enum PolicyType {
        TERMS_AND_CONDITIONS("Terms & Conditions"),
        PRIVACY_POLICY("Privacy Policy"),
        REFUND_POLICY("Refund Policy"),
        PAYMENT_POLICY("Payment Policy"),
        COOKIE_POLICY("Cookie Policy");
        
        private final String displayName;
        
        PolicyType(String displayName) {
            this.displayName = displayName;
        }
        
        public String getDisplayName() {
            return displayName;
        }
    }
    
    // Méthodes utilitaires
    public boolean isCurrentVersion() {
        return "1.0".equals(version);
    }
    
    public String getShortContent() {
        if (content.length() <= 200) {
            return content;
        }
        return content.substring(0, 200) + "...";
    }
}
