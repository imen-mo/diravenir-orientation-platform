package com.diravenir.repository;

import com.diravenir.Entities.OrientationTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrientationTestRepository extends JpaRepository<OrientationTest, Long> {
    
    Optional<OrientationTest> findByStudentEmail(String studentEmail);
    
    @Query("SELECT ot FROM OrientationTest ot WHERE ot.studentEmail = :email ORDER BY ot.createdAt DESC")
    List<OrientationTest> findAllByStudentEmail(@Param("email") String email);
    
    List<OrientationTest> findByTestStatus(OrientationTest.TestStatus status);
    
    @Query("SELECT ot FROM OrientationTest ot WHERE ot.studentEmail = :email AND ot.testStatus = 'COMPLETED'")
    Optional<OrientationTest> findCompletedTestByEmail(@Param("email") String email);
    
    @Query("SELECT COUNT(ot) FROM OrientationTest ot WHERE ot.testStatus = 'COMPLETED'")
    Long countCompletedTests();
    
    @Query("SELECT ot FROM OrientationTest ot WHERE ot.testStatus = 'COMPLETED' ORDER BY ot.testCompletedAt DESC")
    List<OrientationTest> findRecentCompletedTests();
    
    // ===== MÉTHODES POUR LES STATISTIQUES ADMIN =====
    
    Long countByTestStatus(String status);
    
    Long countByCreatedAtAfter(LocalDateTime date);
    
    Long countByTestStatusAndCreatedAtAfter(String status, LocalDateTime date);
    
    Long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
    
    Long countByTestStatusAndCreatedAtBetween(String status, LocalDateTime start, LocalDateTime end);
    
    List<OrientationTest> findTop10ByOrderByCreatedAtDesc();
}