package com.dira.diravenir1.Repository;

import com.dira.diravenir1.Entities.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {
    // Tu peux ajouter ici des méthodes de recherche personnalisées
}
