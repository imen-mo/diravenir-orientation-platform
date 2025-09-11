package com.diravenir.repository;

import com.diravenir.Entities.EmailOtp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface EmailOtpRepository extends JpaRepository<EmailOtp, Long> {
    
    Optional<EmailOtp> findByEmailAndOtpCode(String email, String otpCode);
    
    List<EmailOtp> findByEmail(String email);
    
    @Query("SELECT eo FROM EmailOtp eo WHERE eo.expiryTime < :now")
    List<EmailOtp> findExpiredOtps(@Param("now") LocalDateTime now);
    
    void deleteByEmail(String email);
    
    long countByEmail(String email);
    
    boolean existsByEmailAndOtpCode(String email, String otpCode);
    
    // Méthodes manquantes pour EmailOTPService et OtpService
    @Query("SELECT eo FROM EmailOtp eo WHERE eo.email = :email AND eo.expiryTime > :now ORDER BY eo.createdAt DESC")
    Optional<EmailOtp> findValidOtpByEmail(@Param("email") String email, @Param("now") LocalDateTime now);
    
    long countByEmailAndCreatedAtAfter(String email, LocalDateTime since);
    
    int deleteByExpiryTimeBefore(LocalDateTime before);
}
