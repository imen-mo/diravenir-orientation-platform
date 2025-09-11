package com.diravenir.repository;

import com.diravenir.Entities.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    
    List<Document> findByType(String type);
    
    List<Document> findByActiveTrue();
    
    List<Document> findByEstPublicTrue();
    
    List<Document> findByCategorie(String categorie);
    
    List<Document> findByCreatedBy(Long createdBy);
    
    @Query("SELECT d FROM Document d WHERE d.dateExpiration < :now")
    List<Document> findExpiredDocuments(@Param("now") LocalDateTime now);
    
    @Query("SELECT d FROM Document d WHERE LOWER(d.nom) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(d.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Document> searchByKeyword(@Param("keyword") String keyword);
    
    @Query("SELECT d FROM Document d WHERE d.createdAt >= :since ORDER BY d.createdAt DESC")
    List<Document> findRecentlyCreated(@Param("since") LocalDateTime since);
    
    @Query("SELECT d FROM Document d WHERE d.nombreTelechargements > :minDownloads ORDER BY d.nombreTelechargements DESC")
    List<Document> findMostDownloaded(@Param("minDownloads") Integer minDownloads);
    
    List<Document> findByTypeAndActiveTrue(String type);
    
    List<Document> findByCategorieAndActiveTrue(String categorie);
    
    Optional<Document> findByCheminFichier(String cheminFichier);
    
    long countByActiveTrue();
    
    long countByType(String type);
}