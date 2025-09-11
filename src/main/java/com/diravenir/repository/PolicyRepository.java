package com.diravenir.repository;

import com.diravenir.Entities.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PolicyRepository extends JpaRepository<Policy, Long> {
    
    Optional<Policy> findByPolicyType(Policy.PolicyType policyType);
    
    List<Policy> findByIsActiveTrue();
    
    List<Policy> findByPolicyTypeAndIsActiveTrue(Policy.PolicyType policyType);
    
    @Query("SELECT p FROM Policy p WHERE p.policyType = :policyType AND p.isActive = true ORDER BY p.version DESC")
    List<Policy> findLatestByType(@Param("policyType") Policy.PolicyType policyType);
    
    @Query("SELECT p FROM Policy p WHERE p.policyType = :policyType AND p.isActive = true ORDER BY p.version DESC LIMIT 1")
    Optional<Policy> findLatestActiveByType(@Param("policyType") Policy.PolicyType policyType);
    
    @Query("SELECT MAX(p.version) FROM Policy p WHERE p.policyType = :policyType")
    String findMaxVersionByType(@Param("policyType") Policy.PolicyType policyType);
    
    List<Policy> findByPolicyTypeOrderByVersionDesc(Policy.PolicyType policyType);
    
    boolean existsByPolicyTypeAndVersion(Policy.PolicyType policyType, String version);
    
    List<Policy> findByRequiresConsentTrueAndIsActiveTrue();
    
    @Query("SELECT p FROM Policy p WHERE LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(p.content) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Policy> searchPoliciesByKeyword(@Param("keyword") String keyword);
    
    @Query("SELECT p FROM Policy p WHERE p.updatedAt >= :since ORDER BY p.updatedAt DESC")
    List<Policy> findRecentlyUpdatedPolicies(@Param("since") java.time.LocalDateTime since);
    
    @Query("SELECT COUNT(p) FROM Policy p WHERE p.isActive = true")
    long countActivePolicies();
}
