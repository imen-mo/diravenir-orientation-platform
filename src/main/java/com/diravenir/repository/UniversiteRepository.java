package com.diravenir.repository;

import com.diravenir.Entities.Universite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UniversiteRepository extends JpaRepository<Universite, Long> {
    
    Optional<Universite> findByNom(String nom);
    
    List<Universite> findByPays(String pays);
    
    List<Universite> findByVille(String ville);
    
    List<Universite> findByIsActiveTrue();
    
    @Query("SELECT u FROM Universite u WHERE LOWER(u.nom) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(u.pays) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Universite> searchUniversites(@Param("searchTerm") String searchTerm);
    
    @Query("SELECT DISTINCT u.pays FROM Universite u ORDER BY u.pays")
    List<String> findDistinctPays();
    
    @Query("SELECT DISTINCT u.ville FROM Universite u WHERE u.pays = :pays ORDER BY u.ville")
    List<String> findVillesByPays(@Param("pays") String pays);
    
    long countByPays(String pays);
    
    long countByVille(String ville);
    
    // Méthode manquante pour ProgramUploadController
    List<Universite> findByNomContainingIgnoreCase(String nom);
}
