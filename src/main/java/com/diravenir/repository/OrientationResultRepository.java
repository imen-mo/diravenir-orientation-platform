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
    
    Optional<OrientationResult> findByOrientationTestId(Long testId);
    
    @Query("SELECT or FROM OrientationResult or WHERE or.orientationTest.id = :testId")
    List<OrientationResult> findAllByOrientationTestId(@Param("testId") Long testId);
    
    @Query("SELECT or FROM OrientationResult or JOIN or.orientationTest ot WHERE ot.studentEmail = :email ORDER BY or.calculatedAt DESC")
    List<OrientationResult> findByStudentEmail(@Param("email") String email);
    
    @Query("SELECT or FROM OrientationResult or JOIN or.orientationTest ot WHERE ot.studentEmail = :email ORDER BY or.calculatedAt DESC LIMIT 1")
    Optional<OrientationResult> findLatestByStudentEmail(@Param("email") String email);
    
    @Query("SELECT or FROM OrientationResult or ORDER BY or.calculatedAt DESC")
    List<OrientationResult> findRecentResults();
    
    @Query("SELECT COUNT(or) FROM OrientationResult or")
    Long countTotalResults();
}