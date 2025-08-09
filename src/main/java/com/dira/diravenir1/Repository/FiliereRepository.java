package com.dira.diravenir1.Repository;


import com.dira.diravenir1.Entities.Filiere;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FiliereRepository extends JpaRepository<Filiere, Long> {

    List<Filiere> findByActiveTrue();

    List<Filiere> findByDomaineContainingIgnoreCase(String domaine);

    List<Filiere> findByNiveauContainingIgnoreCase(String niveau);

    List<Filiere> findByNomContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String nom, String description);

    @Query("SELECT f FROM Filiere f WHERE f.active = true AND " +
            "(LOWER(f.nom) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(f.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(f.domaine) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Filiere> searchByKeyword(@Param("keyword") String keyword);
}