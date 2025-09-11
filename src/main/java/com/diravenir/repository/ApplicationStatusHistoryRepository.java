package com.diravenir.repository;

import com.diravenir.Entities.ApplicationStatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationStatusHistoryRepository extends JpaRepository<ApplicationStatusHistory, Long> {
    
    List<ApplicationStatusHistory> findByApplicationIdOrderByChangedAtDesc(Long applicationId);
    
    List<ApplicationStatusHistory> findByNewStatusOrderByChangedAtDesc(String status);
    
    List<ApplicationStatusHistory> findByChangedByOrderByChangedAtDesc(String adminName);
    
    List<ApplicationStatusHistory> findByChangedAtAfterOrderByChangedAtDesc(LocalDateTime date);
    
    long countByApplicationId(Long applicationId);
    
    Optional<ApplicationStatusHistory> findFirstByApplicationIdOrderByChangedAtDesc(Long applicationId);
}

