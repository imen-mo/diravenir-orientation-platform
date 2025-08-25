package com.dira.diravenir1.Repository;

import com.dira.diravenir1.Entities.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PolicyRepository extends JpaRepository<Policy, Long> {
    
    /**
     * Trouver une politique par type
     */
    Optional<Policy> findByPolicyType(Policy.PolicyType policyType);
    
    /**
     * Trouver une politique active par type
     */
    Optional<Policy> findByPolicyTypeAndIsActiveTrue(Policy.PolicyType policyType);
    
    /**
     * Trouver toutes les politiques actives
     */
    List<Policy> findByIsActiveTrue();
    
    /**
     * Trouver toutes les politiques qui nécessitent un consentement
     */
    List<Policy> findByRequiresConsentTrueAndIsActiveTrue();
    
    /**
     * Trouver les politiques par version
     */
    List<Policy> findByVersion(String version);
    
    /**
     * Trouver les politiques mises à jour par un utilisateur
     */
    List<Policy> findByLastUpdatedBy(String lastUpdatedBy);
    
    /**
     * Compter les politiques actives
     */
    @Query("SELECT COUNT(p) FROM Policy p WHERE p.isActive = true")
    Long countActivePolicies();
    
    /**
     * Trouver les politiques par mots-clés dans le contenu
     */
    @Query("SELECT p FROM Policy p WHERE p.isActive = true AND (p.title LIKE %:keyword% OR p.content LIKE %:keyword%)")
    List<Policy> searchPoliciesByKeyword(@Param("keyword") String keyword);
    
    /**
     * Trouver les politiques mises à jour récemment
     */
    @Query("SELECT p FROM Policy p WHERE p.updatedAt >= :since ORDER BY p.updatedAt DESC")
    List<Policy> findRecentlyUpdatedPolicies(@Param("since") java.time.LocalDateTime since);
}
