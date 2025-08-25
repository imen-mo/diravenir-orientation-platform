package com.dira.diravenir1.Repository;

import com.dira.diravenir1.Entities.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {
    // Méthode pour rechercher un étudiant par son email
    Optional<Etudiant> findByEmail(String email);
    
    // Méthode pour rechercher un étudiant par son email de test
    Optional<Etudiant> findByEmailTest(String emailTest);
    
    // Tu peux ajouter ici des méthodes de recherche personnalisées
}
