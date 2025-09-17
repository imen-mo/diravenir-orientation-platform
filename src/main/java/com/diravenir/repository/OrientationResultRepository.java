package com.diravenir.repository;

import com.diravenir.Entities.OrientationResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrientationResultRepository extends JpaRepository<OrientationResult, Long> {
    
    /**
     * Trouver le résultat d'un test d'orientation
     */
    Optional<OrientationResult> findByOrientationTestId(Long orientationTestId);
    
    /**
     * Trouver tous les résultats d'un étudiant par email
     */
    @Query("SELECT or FROM OrientationResult or JOIN or.orientationTest ot WHERE ot.studentEmail = :email ORDER BY or.calculatedAt DESC")
    List<OrientationResult> findByStudentEmail(@Param("email") String email);
    
    /**
     * Trouver tous les résultats d'un étudiant par ID
     */
    @Query("SELECT or FROM OrientationResult or JOIN or.orientationTest ot WHERE ot.studentId = :studentId ORDER BY or.calculatedAt DESC")
    List<OrientationResult> findByStudentId(@Param("studentId") Long studentId);
    
    /**
     * Trouver le résultat le plus récent d'un étudiant
     */
    @Query("SELECT or FROM OrientationResult or JOIN or.orientationTest ot WHERE ot.studentEmail = :email ORDER BY or.calculatedAt DESC")
    Optional<OrientationResult> findLatestByStudentEmail(@Param("email") String email);
    
    /**
     * Trouver tous les résultats par email utilisateur
     */
    @Query("SELECT or FROM OrientationResult or JOIN or.orientationTest ot WHERE ot.studentEmail = :userEmail ORDER BY or.calculatedAt DESC")
    List<OrientationResult> findByUserEmail(@Param("userEmail") String userEmail);
    
    /**
     * Compter les résultats par email utilisateur
     */
    @Query("SELECT COUNT(or) FROM OrientationResult or JOIN or.orientationTest ot WHERE ot.studentEmail = :userEmail")
    long countByUserEmail(@Param("userEmail") String userEmail);
    
    /**
     * Compter les résultats par ID utilisateur
     */
    @Query("SELECT COUNT(or) FROM OrientationResult or JOIN or.orientationTest ot WHERE ot.studentId = :studentId")
    long countByStudentId(@Param("studentId") Long studentId);
    
    /**
     * Compter les résultats par email utilisateur et mois
     */
    @Query("SELECT COUNT(or) FROM OrientationResult or JOIN or.orientationTest ot WHERE ot.studentEmail = :userEmail AND YEAR(or.calculatedAt) = :year AND MONTH(or.calculatedAt) = :month")
    long countByUserEmailAndMonth(@Param("userEmail") String userEmail, @Param("year") int year, @Param("month") int month);
    
    /**
     * Trouver les résultats par email utilisateur et mois
     */
    @Query("SELECT or FROM OrientationResult or JOIN or.orientationTest ot WHERE ot.studentEmail = :userEmail AND YEAR(or.calculatedAt) = :year AND MONTH(or.calculatedAt) = :month ORDER BY or.calculatedAt DESC")
    List<OrientationResult> findByUserEmailAndMonth(@Param("userEmail") String userEmail, @Param("year") int year, @Param("month") int month);
    
    // Méthodes pour OrientationPersistenceService
    List<OrientationResult> findAllByOrientationTestId(Long orientationTestId);
    
    @Query("SELECT COUNT(or) FROM OrientationResult or")
    long countTotalResults();
    
    // Méthodes supplémentaires pour les statistiques
    @Query("SELECT COUNT(or) FROM OrientationResult or")
    long countAllResults();
    
    @Query("SELECT or FROM OrientationResult or WHERE or.orientationTest.id = :testId ORDER BY or.calculatedAt DESC")
    List<OrientationResult> findByOrientationTestIdOrderByCalculatedAtDesc(@Param("testId") Long testId);
    
    @Query("SELECT or FROM OrientationResult or ORDER BY or.calculatedAt DESC")
    List<OrientationResult> findAllOrderByCalculatedAtDesc();
    
    @Query("SELECT COUNT(or) FROM OrientationResult or WHERE or.calculatedAt >= :date")
    long countByCalculatedAtAfter(@Param("date") java.time.LocalDateTime date);
    
    @Query("SELECT or FROM OrientationResult or WHERE or.calculatedAt >= :date ORDER BY or.calculatedAt DESC")
    List<OrientationResult> findByCalculatedAtAfterOrderByCalculatedAtDesc(@Param("date") java.time.LocalDateTime date);
}