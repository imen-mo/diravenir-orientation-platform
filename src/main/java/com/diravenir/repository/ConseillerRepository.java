package com.diravenir.repository;

import com.diravenir.Entities.Conseiller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConseillerRepository extends JpaRepository<Conseiller, Long> {
    
    Optional<Conseiller> findByEmail(String email);
    
    // Conseiller hérite de Utilisateur, donc on utilise findById directement
    // Optional<Conseiller> findByUtilisateurId(Long utilisateurId); // Supprimé car pas de sens
}
