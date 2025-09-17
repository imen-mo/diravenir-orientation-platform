package com.diravenir.repository;

import com.diravenir.Entities.OrientationTest;
import com.diravenir.Entities.TestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrientationTestRepository extends JpaRepository<OrientationTest, Long> {
    
    /**
     * Trouver tous les tests d'un étudiant par email
     */
    List<OrientationTest> findByStudentEmail(String studentEmail);
    
    /**
     * Trouver tous les tests d'un étudiant par ID
     */
    List<OrientationTest> findByStudentId(Long studentId);
    
    /**
     * Compter les tests d'un étudiant par email
     */
    long countByStudentEmail(String studentEmail);
    
    /**
     * Compter les tests d'un étudiant par ID
     */
    long countByStudentId(Long studentId);
    
    /**
     * Compter les tests complétés d'un étudiant par email et statut
     */
    long countByStudentEmailAndTestStatus(String studentEmail, TestStatus testStatus);
    
    /**
     * Trouver le test le plus récent d'un étudiant
     */
    @Query("SELECT ot FROM OrientationTest ot WHERE ot.studentEmail = :email ORDER BY ot.testCompletedAt DESC")
    OrientationTest findLatestByStudentEmail(@Param("email") String email);
    
    /**
     * Trouver tous les tests complétés d'un étudiant
     */
    @Query("SELECT ot FROM OrientationTest ot WHERE ot.studentEmail = :email AND ot.testStatus = 'COMPLETED' ORDER BY ot.testCompletedAt DESC")
    List<OrientationTest> findCompletedTestsByStudentEmail(@Param("email") String email);
    
    // Méthodes pour AdminStatisticsService et AdminDashboardService
    long countByTestStatus(String testStatus);
    
    long countByCreatedAtAfter(java.time.LocalDateTime date);
    
    long countByTestStatusAndCreatedAtAfter(String testStatus, java.time.LocalDateTime date);
    
    List<OrientationTest> findTop10ByOrderByCreatedAtDesc();
    
    long countByCreatedAtBetween(java.time.LocalDateTime startDate, java.time.LocalDateTime endDate);
    
    long countByTestStatusAndCreatedAtBetween(String testStatus, java.time.LocalDateTime startDate, java.time.LocalDateTime endDate);
    
    // Méthodes pour OrientationPersistenceService
    List<OrientationTest> findAllByStudentEmail(String studentEmail);
    
    @Query("SELECT COUNT(ot) FROM OrientationTest ot WHERE ot.testStatus = 'COMPLETED'")
    long countCompletedTests();
    
    // Méthodes supplémentaires pour les statistiques
    @Query("SELECT COUNT(ot) FROM OrientationTest ot WHERE ot.testStatus = 'COMPLETED'")
    long countByTestStatusCompleted();
    
    @Query("SELECT COUNT(ot) FROM OrientationTest ot WHERE ot.testStatus = 'IN_PROGRESS'")
    long countByTestStatusInProgress();
    
    @Query("SELECT COUNT(ot) FROM OrientationTest ot WHERE ot.testStatus = 'NOT_STARTED'")
    long countByTestStatusNotStarted();
    
    @Query("SELECT ot FROM OrientationTest ot WHERE ot.createdAt >= :date ORDER BY ot.createdAt DESC")
    List<OrientationTest> findByCreatedAtAfterOrderByCreatedAtDesc(@Param("date") java.time.LocalDateTime date);
    
    @Query("SELECT ot FROM OrientationTest ot WHERE ot.testStatus = :status AND ot.createdAt >= :date ORDER BY ot.createdAt DESC")
    List<OrientationTest> findByTestStatusAndCreatedAtAfterOrderByCreatedAtDesc(@Param("status") String status, @Param("date") java.time.LocalDateTime date);
}