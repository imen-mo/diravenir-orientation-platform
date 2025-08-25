package com.dira.diravenir1.Repository;

import com.dira.diravenir1.Entities.Universite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UniversiteRepository extends JpaRepository<Universite, Long> {
    
    // Recherche par nom (contient, insensible à la casse)
    Optional<Universite> findByNomContainingIgnoreCase(String nom);
    
    // Recherche par pays
    List<Universite> findByPaysContainingIgnoreCase(String pays);
    
    // Recherche par ville
    List<Universite> findByVilleContainingIgnoreCase(String ville);
    
    // Recherche par type d'université
    List<Universite> findByTypeContainingIgnoreCase(String type);
    
    // Recherche personnalisée avec filtres multiples
    @Query("SELECT u FROM Universite u WHERE " +
           "(:nom IS NULL OR LOWER(u.nom) LIKE LOWER(CONCAT('%', :nom, '%'))) AND " +
           "(:pays IS NULL OR LOWER(u.pays) LIKE LOWER(CONCAT('%', :pays, '%'))) AND " +
           "(:ville IS NULL OR LOWER(u.ville) LIKE LOWER(CONCAT('%', :ville, '%')))")
    List<Universite> findByFilters(@Param("nom") String nom, 
                                   @Param("pays") String pays, 
                                   @Param("ville") String ville);
    
    // Recherche par accréditation
    List<Universite> findByAccreditationContainingIgnoreCase(String accreditation);
    
    // Recherche par classement
    @Query("SELECT u FROM Universite u WHERE u.ranking IS NOT NULL ORDER BY CAST(u.ranking AS int)")
    List<Universite> findByRankingOrdered();
}
