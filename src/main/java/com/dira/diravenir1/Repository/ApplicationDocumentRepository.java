package com.dira.diravenir1.Repository;

import com.dira.diravenir1.Entities.ApplicationDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationDocumentRepository extends JpaRepository<ApplicationDocument, Long> {
    
    // Trouver tous les documents d'une application
    List<ApplicationDocument> findByApplicationId(Long applicationId);
    
    // Trouver un document par type et application
    Optional<ApplicationDocument> findByApplicationIdAndDocumentType(Long applicationId, String documentType);
    
    // Trouver tous les documents d'un type spécifique
    List<ApplicationDocument> findByDocumentType(String documentType);
    
    // Trouver les documents par statut
    List<ApplicationDocument> findByStatus(String status);
    
    // Trouver les documents par statut de vérification
    List<ApplicationDocument> findByVerificationStatus(String verificationStatus);
    
    // Trouver les documents uploadés après une date
    List<ApplicationDocument> findByUploadDateAfter(LocalDateTime date);
    
    // Trouver les documents par taille de fichier (plus grand que)
    List<ApplicationDocument> findByFileSizeGreaterThan(Long fileSize);
    
    // Trouver les documents par type MIME
    List<ApplicationDocument> findByMimeType(String mimeType);
    
    // Trouver les documents qui nécessitent une vérification
    @Query("SELECT d FROM ApplicationDocument d WHERE d.verificationStatus = 'PENDING' AND d.status = 'UPLOADED'")
    List<ApplicationDocument> findDocumentsNeedingVerification();
    
    // Trouver les documents rejetés
    @Query("SELECT d FROM ApplicationDocument d WHERE d.status = 'REJECTED'")
    List<ApplicationDocument> findRejectedDocuments();
    
    // Trouver les documents marqués comme non applicables
    @Query("SELECT d FROM ApplicationDocument d WHERE d.status = 'NOT_APPLICABLE'")
    List<ApplicationDocument> findNotApplicableDocuments();
    
    // Compter les documents par statut pour une application
    @Query("SELECT COUNT(d) FROM ApplicationDocument d WHERE d.applicationId = :applicationId AND d.status = :status")
    long countByApplicationIdAndStatus(@Param("applicationId") Long applicationId, @Param("status") String status);
    
    // Compter les documents obligatoires uploadés pour une application
    @Query("SELECT COUNT(d) FROM ApplicationDocument d WHERE d.applicationId = :applicationId AND d.status = 'UPLOADED' AND d.documentType IN ('PASSPORT', 'ACADEMIC_CERTIFICATE', 'ACADEMIC_TRANSCRIPT', 'NON_CRIMINAL_CERTIFICATE', 'PHOTO')")
    long countRequiredDocumentsUploaded(@Param("applicationId") Long applicationId);
    
    // Trouver les applications avec des documents manquants
    @Query("SELECT DISTINCT d.applicationId FROM ApplicationDocument d WHERE d.applicationId IN :applicationIds AND d.status != 'UPLOADED' AND d.documentType IN ('PASSPORT', 'ACADEMIC_CERTIFICATE', 'ACADEMIC_TRANSCRIPT', 'NON_CRIMINAL_CERTIFICATE', 'PHOTO')")
    List<Long> findApplicationsWithMissingRequiredDocuments(@Param("applicationIds") List<Long> applicationIds);
    
    // Trouver les documents par plage de dates
    @Query("SELECT d FROM ApplicationDocument d WHERE d.uploadDate BETWEEN :startDate AND :endDate")
    List<ApplicationDocument> findByUploadDateBetween(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
    
    // Trouver les documents les plus récents
    List<ApplicationDocument> findTop10ByOrderByUploadDateDesc();
    
    // Trouver les documents par taille (ordre décroissant)
    List<ApplicationDocument> findTop10ByOrderByFileSizeDesc();
    
    // Vérifier si un document existe pour une application
    boolean existsByApplicationIdAndDocumentType(Long applicationId, String documentType);
    
    // Supprimer tous les documents d'une application
    void deleteByApplicationId(Long applicationId);
    
    // Supprimer les documents par type
    void deleteByDocumentType(String documentType);
    
    // Trouver les documents avec des notes admin
    @Query("SELECT d FROM ApplicationDocument d WHERE d.adminNotes IS NOT NULL AND d.adminNotes != ''")
    List<ApplicationDocument> findDocumentsWithAdminNotes();
    
    // Trouver les documents vérifiés par un admin spécifique
    List<ApplicationDocument> findByVerifiedBy(String verifiedBy);
    
    // Trouver les documents vérifiés après une date
    List<ApplicationDocument> findByVerifiedAtAfter(LocalDateTime date);
    
    // Statistiques des documents par type
    @Query("SELECT d.documentType, COUNT(d) FROM ApplicationDocument d GROUP BY d.documentType")
    List<Object[]> countDocumentsByType();
    
    // Statistiques des documents par statut
    @Query("SELECT d.status, COUNT(d) FROM ApplicationDocument d GROUP BY d.status")
    List<Object[]> countDocumentsByStatus();
    
    // Statistiques des documents par statut de vérification
    @Query("SELECT d.verificationStatus, COUNT(d) FROM ApplicationDocument d GROUP BY d.verificationStatus")
    List<Object[]> countDocumentsByVerificationStatus();
}
