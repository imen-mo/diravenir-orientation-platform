package com.diravenir.repository;

import com.diravenir.Entities.OrientationQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrientationQuestionRepository extends JpaRepository<OrientationQuestion, Long> {
    
    List<OrientationQuestion> findByIsActiveTrueOrderByOrderIndexAsc();
    
    List<OrientationQuestion> findByCategoryAndIsActiveTrueOrderByOrderIndexAsc(String category);
    
    List<OrientationQuestion> findByQuestionTypeAndIsActiveTrueOrderByOrderIndexAsc(OrientationQuestion.QuestionType questionType);
    
    @Query("SELECT DISTINCT q.category FROM OrientationQuestion q WHERE q.isActive = true ORDER BY q.category")
    List<String> findDistinctCategories();
    
    @Query("SELECT COUNT(q) FROM OrientationQuestion q WHERE q.isActive = true")
    Long countActiveQuestions();
    
    @Query("SELECT q FROM OrientationQuestion q WHERE q.isActive = true AND q.questionNumber = :questionNumber")
    OrientationQuestion findByQuestionNumber(@Param("questionNumber") Integer questionNumber);
    
    @Query("SELECT MAX(q.questionNumber) FROM OrientationQuestion q WHERE q.isActive = true")
    Integer findMaxQuestionNumber();
}
