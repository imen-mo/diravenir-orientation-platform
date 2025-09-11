package com.diravenir.repository;

import com.diravenir.Entities.EmailVerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface EmailVerificationTokenRepository extends JpaRepository<EmailVerificationToken, Long> {
    
    Optional<EmailVerificationToken> findByToken(String token);
    
    List<EmailVerificationToken> findByUserId(Long userId);
    
    @Query("SELECT evt FROM EmailVerificationToken evt WHERE evt.expiryDate < :now")
    List<EmailVerificationToken> findExpiredTokens(@Param("now") LocalDateTime now);
    
    @Query("SELECT evt FROM EmailVerificationToken evt WHERE evt.userId = :userId AND evt.expiryDate > :now ORDER BY evt.createdAt DESC")
    List<EmailVerificationToken> findValidTokensByUserId(@Param("userId") Long userId, @Param("now") LocalDateTime now);
    
    void deleteByUserId(Long userId);
    
    void deleteByExpiryDateBefore(LocalDateTime date);
    
    long countByUserId(Long userId);
    
    boolean existsByToken(String token);
    
    // Méthodes manquantes pour EmailVerificationService
    void deleteByUtilisateurId(Long utilisateurId);
    
    @Modifying
    @Query("DELETE FROM EmailVerificationToken evt WHERE evt.expiryDate < :now")
    void deleteExpiredTokens(@Param("now") LocalDateTime now);
}
