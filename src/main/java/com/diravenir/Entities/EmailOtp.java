package com.diravenir.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "email_otps")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmailOtp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "otp_code", nullable = false, length = 10)
    private String otpCode;

    @Column(name = "expiry_time", nullable = false)
    private LocalDateTime expiryTime;

    @Column(name = "is_used", nullable = false)
    @Builder.Default
    private Boolean isUsed = false;

    @Column(name = "attempts", nullable = false)
    @Builder.Default
    private Integer attempts = 0;

    @Column(name = "max_attempts", nullable = false)
    @Builder.Default
    private Integer maxAttempts = 3;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // Méthodes utilitaires
    public boolean isExpired() {
        return LocalDateTime.now().isAfter(this.expiryTime);
    }

    public boolean isValid() {
        return !this.isUsed && !this.isExpired() && this.attempts < this.maxAttempts;
    }

    public void incrementAttempts() {
        this.attempts++;
    }

    public void markAsUsed() {
        this.isUsed = true;
    }

    public boolean canRetry() {
        return this.attempts < this.maxAttempts;
    }
    
    // Méthodes de compatibilité
    public boolean isUsed() {
        return this.isUsed != null ? this.isUsed : false;
    }
    
    public void setUsed(boolean used) {
        this.isUsed = used;
    }
}
