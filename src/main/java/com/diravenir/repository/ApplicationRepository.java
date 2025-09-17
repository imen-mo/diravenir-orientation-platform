package com.diravenir.repository;

import com.diravenir.Entities.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    // Find by application ID
    Optional<Application> findByApplicationId(String applicationId);
    
    // Find by user ID
    List<Application> findByUserId(Long userId);

    // Find by status
    List<Application> findByStatus(String status);

    // Find by current step
    List<Application> findByCurrentStep(Integer currentStep);
    
    // Find by email
    Optional<Application> findByEmail(String email);
    
    // Find applications in progress (not draft, not completed)
    @Query("SELECT a FROM Application a WHERE a.status NOT IN ('DRAFT', 'COMPLETED', 'REJECTED', 'CANCELLED')")
    List<Application> findApplicationsInProgress();
    
    // Find submitted applications
    @Query("SELECT a FROM Application a WHERE a.status = 'SUBMITTED' OR a.status = 'UNDER_REVIEW'")
    List<Application> findSubmittedApplications();
    
    // Find applications by status range
    @Query("SELECT a FROM Application a WHERE a.status IN :statuses")
    List<Application> findByStatusIn(@Param("statuses") List<String> statuses);
    
    // Find applications created after a date
    List<Application> findByCreatedAtAfter(LocalDateTime date);
    
    // Find applications by program name
    List<Application> findByProgramNameContainingIgnoreCase(String programName);
    
    // Find applications by university name
    List<Application> findByUniversityNameContainingIgnoreCase(String universityName);
    
    // Count applications by user ID
    long countByUserId(Long userId);
    
    // Count applications by etudiant ID
    long countByEtudiantId(Long etudiantId);
    
    // Count applications by user ID and status
    long countByUserIdAndStatus(Long userId, String status);
    
    // Count applications by etudiant ID and status
    long countByEtudiantIdAndStatus(Long etudiantId, String status);
    
    // Count applications by user ID and month
    @Query("SELECT COUNT(a) FROM Application a WHERE a.userId = :userId AND YEAR(a.createdAt) = :year AND MONTH(a.createdAt) = :month")
    long countByUserIdAndMonth(@Param("userId") Long userId, @Param("year") int year, @Param("month") int month);
    
    // Count applications by status
    long countByStatus(String status);
    
    // Count applications in progress
    @Query("SELECT COUNT(a) FROM Application a WHERE a.status NOT IN ('DRAFT', 'COMPLETED', 'REJECTED', 'CANCELLED')")
    long countApplicationsInProgress();
    
    // Count submitted applications
    @Query("SELECT COUNT(a) FROM Application a WHERE a.status = 'SUBMITTED' OR a.status = 'UNDER_REVIEW'")
    long countSubmittedApplications();
    
    // Find applications that need admin review
    @Query("SELECT a FROM Application a WHERE a.status IN ('SUBMITTED', 'UNDER_REVIEW', 'PENDING_DOCUMENTS') ORDER BY a.submittedAt ASC")
    List<Application> findApplicationsNeedingReview();
    
    // Find applications by current step
    List<Application> findByCurrentStepOrderByUpdatedAtDesc(Integer currentStep);
    
    // Find applications by user and status
    List<Application> findByUserIdAndStatus(Long userId, String status);
    
    // Find applications by user and current step
    List<Application> findByUserIdAndCurrentStep(Long userId, Integer currentStep);
    
    // Check if user has application in progress
    @Query("SELECT COUNT(a) > 0 FROM Application a WHERE a.userId = :userId AND a.status NOT IN ('DRAFT', 'COMPLETED', 'REJECTED', 'CANCELLED')")
    boolean existsByUserIdAndStatusNotIn(@Param("userId") Long userId);
    
    // Find applications expiring soon (if you have expiry logic)
    @Query("SELECT a FROM Application a WHERE a.status = 'SUBMITTED' AND a.submittedAt < :expiryDate")
    List<Application> findExpiredApplications(@Param("expiryDate") LocalDateTime expiryDate);
    
    // Additional methods for the simplified version
    Optional<Application> findByEtudiantId(Long etudiantId);
    
    List<Application> findByEtudiantIdAndStatus(Long etudiantId, String status);
    
    // Méthodes manquantes pour ApplicationService
    long countByPaymentStatus(Application.PaymentStatus paymentStatus);
    
    @Query("SELECT a FROM Application a WHERE a.status = :status AND (LOWER(a.programName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(a.universityName) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    org.springframework.data.domain.Page<Application> findByStatusAndSearchTerm(@Param("status") String status, @Param("searchTerm") String searchTerm, org.springframework.data.domain.Pageable pageable);
    
    @Query("SELECT a FROM Application a WHERE LOWER(a.programName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(a.universityName) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    org.springframework.data.domain.Page<Application> findBySearchTerm(@Param("searchTerm") String searchTerm, org.springframework.data.domain.Pageable pageable);
    
    long countByCreatedAtAfter(LocalDateTime date);
    
    @Query("SELECT a FROM Application a WHERE LOWER(a.programName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(a.universityName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(a.email) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Application> searchApplications(@Param("searchTerm") String searchTerm);
}
