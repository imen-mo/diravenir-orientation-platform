package com.dira.diravenir1.Repository;

import com.dira.diravenir1.Entities.EmailOtp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface EmailOtpRepository extends JpaRepository<EmailOtp, Long> {

    /**
     * Trouve un OTP par email
     */
    Optional<EmailOtp> findByEmail(String email);

    /**
     * Supprime un OTP par email
     */
    @Modifying
    @Query("DELETE FROM EmailOtp e WHERE e.email = :email")
    void deleteByEmail(@Param("email") String email);

    /**
     * Compte le nombre d'OTP générés pour un email depuis une date donnée
     */
    @Query("SELECT COUNT(e) FROM EmailOtp e WHERE e.email = :email AND e.createdAt >= :since")
    long countByEmailAndCreatedAtAfter(@Param("email") String email, @Param("since") LocalDateTime since);

    /**
     * Supprime tous les OTP expirés
     */
    @Modifying
    @Query("DELETE FROM EmailOtp e WHERE e.expiryTime < :now")
    int deleteByExpiryTimeBefore(@Param("now") LocalDateTime now);

    /**
     * Trouve un OTP valide (non expiré et non utilisé) par email
     */
    @Query("SELECT e FROM EmailOtp e WHERE e.email = :email AND e.expiryTime > :now AND e.isUsed = false")
    Optional<EmailOtp> findValidOtpByEmail(@Param("email") String email, @Param("now") LocalDateTime now);

    /**
     * Vérifie si un email a un OTP valide
     */
    @Query("SELECT COUNT(e) > 0 FROM EmailOtp e WHERE e.email = :email AND e.expiryTime > :now AND e.isUsed = false")
    boolean existsValidOtpByEmail(@Param("email") String email, @Param("now") LocalDateTime now);

    /**
     * Trouve tous les OTP expirés
     */
    @Query("SELECT e FROM EmailOtp e WHERE e.expiryTime < :now")
    List<EmailOtp> findAllExpiredOtps(@Param("now") LocalDateTime now);

    /**
     * Trouve tous les OTP utilisés
     */
    @Query("SELECT e FROM EmailOtp e WHERE e.isUsed = true")
    List<EmailOtp> findAllUsedOtps();

    /**
     * Trouve tous les OTP bloqués (tentatives max atteintes)
     */
    @Query("SELECT e FROM EmailOtp e WHERE e.attempts >= e.maxAttempts")
    List<EmailOtp> findAllBlockedOtps();
}
