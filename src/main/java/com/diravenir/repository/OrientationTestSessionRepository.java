package com.diravenir.repository;

import com.diravenir.Entities.OrientationTestSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrientationTestSessionRepository extends JpaRepository<OrientationTestSession, Long> {
    
    /**
     * Trouve une session par UUID de test
     */
    Optional<OrientationTestSession> findByTestUuid(String testUuid);
    
    /**
     * Trouve toutes les sessions par statut
     */
    List<OrientationTestSession> findByStatus(OrientationTestSession.TestStatus status);
    
    /**
     * Trouve les sessions terminées
     */
    List<OrientationTestSession> findByStatusAndCompletedAtIsNotNull(OrientationTestSession.TestStatus status);
    
    /**
     * Trouve les sessions créées après une date donnée
     */
    @Query("SELECT ots FROM OrientationTestSession ots WHERE ots.createdAt >= :date")
    List<OrientationTestSession> findByCreatedAtAfter(@Param("date") LocalDateTime date);
    
    /**
     * Trouve les sessions abandonnées après un délai donné
     */
    @Query("SELECT ots FROM OrientationTestSession ots WHERE ots.status = 'IN_PROGRESS' AND ots.createdAt < :abandonDate")
    List<OrientationTestSession> findAbandonedSessions(@Param("abandonDate") LocalDateTime abandonDate);
    
    /**
     * Compte le nombre de sessions par statut
     */
    @Query("SELECT ots.status, COUNT(ots) FROM OrientationTestSession ots GROUP BY ots.status")
    List<Object[]> countByStatus();
    
    /**
     * Trouve les sessions par étudiant
     */
    @Query("SELECT ots FROM OrientationTestSession ots WHERE ots.studentInfo.id = :studentId")
    List<OrientationTestSession> findByStudentId(@Param("studentId") Long studentId);
}
