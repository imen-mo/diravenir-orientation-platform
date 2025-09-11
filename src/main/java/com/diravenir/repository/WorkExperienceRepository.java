package com.diravenir.repository;

import com.diravenir.Entities.WorkExperience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkExperienceRepository extends JpaRepository<WorkExperience, Long> {
    
    // Query by Application ID (since WorkExperience has a direct relationship with Application)
    List<WorkExperience> findByApplicationId(Long applicationId);
    
    // Query by Application ID ordered by start date descending
    List<WorkExperience> findByApplicationIdOrderByStartedDateDesc(Long applicationId);
    
    // Query by Etudiant ID through Application relationship
    List<WorkExperience> findByApplicationEtudiantId(Long etudiantId);
    
    // Query by Etudiant ID through Application relationship ordered by start date descending
    List<WorkExperience> findByApplicationEtudiantIdOrderByStartedDateDesc(Long etudiantId);
}
