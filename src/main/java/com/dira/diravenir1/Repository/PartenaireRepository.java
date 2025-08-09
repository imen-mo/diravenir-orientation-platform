package com.dira.diravenir1.Repository;


import com.dira.diravenir1.Entities.Partenaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PartenaireRepository extends JpaRepository<Partenaire, Long> {

    List<Partenaire> findByActifTrue();

    List<Partenaire> findByPaysContainingIgnoreCase(String pays);

    List<Partenaire> findByTypeContainingIgnoreCase(String type);

    List<Partenaire> findByNomContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String nom, String description);

    @Query("SELECT p FROM Partenaire p WHERE p.actif = true AND " +
            "(LOWER(p.nom) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.type) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Partenaire> searchByKeyword(@Param("keyword") String keyword);

    @Query("SELECT p FROM Partenaire p WHERE p.actif = true ORDER BY p.nombreEtudiants DESC")
    List<Partenaire> findTopPartenairesByNombreEtudiants();
}