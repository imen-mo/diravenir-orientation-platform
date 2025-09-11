package com.diravenir.repository;

import com.diravenir.Entities.EducationBackground;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EducationBackgroundRepository extends JpaRepository<EducationBackground, Long> {
    
    // Query by Application ID (since EducationBackground has a direct relationship with Application)
    List<EducationBackground> findByApplicationId(Long applicationId);
    
    // Query by Application ID ordered by finished date descending
    List<EducationBackground> findByApplicationIdOrderByFinishedDateDesc(Long applicationId);
    
    // Query by Etudiant ID through Application relationship
    List<EducationBackground> findByApplicationEtudiantId(Long etudiantId);
    
    // Query by Etudiant ID through Application relationship ordered by finished date descending
    List<EducationBackground> findByApplicationEtudiantIdOrderByFinishedDateDesc(Long etudiantId);
}
