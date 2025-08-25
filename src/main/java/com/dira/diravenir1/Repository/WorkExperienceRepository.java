package com.dira.diravenir1.Repository;

import com.dira.diravenir1.Entities.WorkExperience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkExperienceRepository extends JpaRepository<WorkExperience, Long> {
    
    List<WorkExperience> findByApplicationId(Long applicationId);
    
    void deleteByApplicationId(Long applicationId);
}
