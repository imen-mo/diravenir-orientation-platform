package com.diravenir.repository;

import com.diravenir.Entities.OrientationAnswer;
import com.diravenir.Entities.OrientationTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrientationAnswerRepository extends JpaRepository<OrientationAnswer, Long> {
    
    List<OrientationAnswer> findByOrientationTestOrderByQuestionNumber(OrientationTest orientationTest);
    
    @Query("SELECT oa FROM OrientationAnswer oa WHERE oa.orientationTest = :orientationTest ORDER BY oa.questionNumber")
    List<OrientationAnswer> findAllByTestOrdered(@Param("orientationTest") OrientationTest orientationTest);
    
    Optional<OrientationAnswer> findByOrientationTestAndQuestionNumber(OrientationTest orientationTest, Integer questionNumber);
    
    @Query("SELECT COUNT(oa) FROM OrientationAnswer oa WHERE oa.orientationTest = :orientationTest")
    Long countByTest(@Param("orientationTest") OrientationTest orientationTest);
    
    @Query("SELECT oa FROM OrientationAnswer oa WHERE oa.orientationTest = :orientationTest AND oa.questionNumber = :questionNumber")
    Optional<OrientationAnswer> findByTestAndQuestionNumberQuery(@Param("orientationTest") OrientationTest orientationTest, @Param("questionNumber") Integer questionNumber);
    
    boolean existsByOrientationTestAndQuestionNumber(OrientationTest orientationTest, Integer questionNumber);
    
    // Nouvelle méthode pour trouver par test ID
    @Query("SELECT oa FROM OrientationAnswer oa WHERE oa.orientationTest.id = :testId ORDER BY oa.questionNumber")
    List<OrientationAnswer> findByTestId(@Param("testId") Long testId);
    
    // Méthodes manquantes pour OrientationAnswerMapper
    @Query("SELECT oa FROM OrientationAnswer oa WHERE oa.orientationTest.id = :testId AND oa.questionNumber = :questionNumber")
    Optional<OrientationAnswer> findByTestIdAndQuestionNumber(@Param("testId") Long testId, @Param("questionNumber") Integer questionNumber);
}
