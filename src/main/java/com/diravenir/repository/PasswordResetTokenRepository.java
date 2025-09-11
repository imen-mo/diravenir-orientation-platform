package com.diravenir.repository;

import com.diravenir.Entities.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    
    Optional<PasswordResetToken> findByToken(String token);
    
    List<PasswordResetToken> findByUserId(Long userId);
    
    @Query("SELECT prt FROM PasswordResetToken prt WHERE prt.expiryDate < :now")
    List<PasswordResetToken> findExpiredTokens(@Param("now") LocalDateTime now);
    
    @Query("SELECT prt FROM PasswordResetToken prt WHERE prt.userId = :userId AND prt.expiryDate > :now ORDER BY prt.createdAt DESC")
    List<PasswordResetToken> findValidTokensByUserId(@Param("userId") Long userId, @Param("now") LocalDateTime now);
    
    void deleteByUserId(Long userId);
    
    void deleteByExpiryDateBefore(LocalDateTime date);
    
    long countByUserId(Long userId);
    
    boolean existsByToken(String token);
    
    // Méthodes manquantes pour PasswordResetService
    void deleteByUtilisateurId(Long utilisateurId);
    
    @Modifying
    @Query("DELETE FROM PasswordResetToken prt WHERE prt.expiryDate < :now")
    void deleteExpiredTokens(@Param("now") LocalDateTime now);
}
