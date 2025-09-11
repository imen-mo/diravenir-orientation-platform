package com.diravenir.repository;

import com.diravenir.Entities.OrientationMajor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrientationMajorRepository extends JpaRepository<OrientationMajor, Long> {
    
    List<OrientationMajor> findByIsActiveTrueOrderByDisplayOrderAsc();
    
    Optional<OrientationMajor> findByMajorName(String majorName);
    
    Optional<OrientationMajor> findByMajorCode(String majorCode);
    
    List<OrientationMajor> findByCategoryAndIsActiveTrueOrderByDisplayOrderAsc(String category);
    
    @Query("SELECT DISTINCT m.category FROM OrientationMajor m WHERE m.isActive = true ORDER BY m.category")
    List<String> findDistinctCategories();
    
    @Query("SELECT m FROM OrientationMajor m WHERE m.isActive = true AND m.majorName LIKE %:searchTerm%")
    List<OrientationMajor> searchByMajorName(@Param("searchTerm") String searchTerm);
    
    @Query("SELECT COUNT(m) FROM OrientationMajor m WHERE m.isActive = true")
    Long countActiveMajors();
}
