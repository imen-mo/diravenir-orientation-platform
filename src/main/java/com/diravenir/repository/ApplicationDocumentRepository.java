package com.diravenir.repository;

import com.diravenir.Entities.ApplicationDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationDocumentRepository extends JpaRepository<ApplicationDocument, Long> {
    
    List<ApplicationDocument> findByApplicationId(Long applicationId);
    
    Optional<ApplicationDocument> findById(Long documentId);
    
    @Query("SELECT ad FROM ApplicationDocument ad WHERE ad.application.id = :applicationId AND ad.documentType = :documentType")
    List<ApplicationDocument> findByApplicationIdAndDocumentType(@Param("applicationId") Long applicationId, @Param("documentType") String documentType);
    
    @Query("SELECT COUNT(ad) FROM ApplicationDocument ad WHERE ad.application.id = :applicationId")
    long countByApplicationId(@Param("applicationId") Long applicationId);
    
    @Query("SELECT ad FROM ApplicationDocument ad WHERE ad.application.id = :applicationId AND ad.isRequired = true")
    List<ApplicationDocument> findRequiredDocumentsByApplicationId(@Param("applicationId") Long applicationId);
}

