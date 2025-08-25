package com.dira.diravenir1.Repository;

import com.dira.diravenir1.Entities.Filiere;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FiliereRepository extends JpaRepository<Filiere, Long> {
    
    List<Filiere> findByDomaine(String domaine);
    
    List<Filiere> findByActiveTrue();
    
    List<Filiere> findByNomContainingIgnoreCase(String nom);
    
    List<Filiere> findByDomaineContainingIgnoreCase(String domaine);
}