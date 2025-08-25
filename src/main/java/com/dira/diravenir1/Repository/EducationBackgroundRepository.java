package com.dira.diravenir1.Repository;

import com.dira.diravenir1.Entities.EducationBackground;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EducationBackgroundRepository extends JpaRepository<EducationBackground, Long> {
    
    List<EducationBackground> findByApplicationId(Long applicationId);
    
    void deleteByApplicationId(Long applicationId);
}
