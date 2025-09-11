package com.diravenir.repository;

import com.diravenir.Entities.Partenaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PartenaireRepository extends JpaRepository<Partenaire, Long> {
    
    List<Partenaire> findByActifTrue();
    
    List<Partenaire> findByType(String type);
    
    List<Partenaire> findByTypeAndActifTrue(String type);
    
    @Query("SELECT p FROM Partenaire p WHERE LOWER(p.nom) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(p.description) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Partenaire> searchPartenaires(@Param("searchTerm") String searchTerm);
    
    @Query("SELECT p FROM Partenaire p WHERE p.actif = true ORDER BY p.nom ASC")
    List<Partenaire> findActiveOrderedByName();
    
    // Méthodes manquantes pour PartenaireService
    List<Partenaire> findByPaysContainingIgnoreCase(String pays);
    
    List<Partenaire> findByTypeContainingIgnoreCase(String type);
    
    List<Partenaire> findByNomContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String nom, String description);
}
