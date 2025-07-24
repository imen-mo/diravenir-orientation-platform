package com.dira.diravenir1.Repository;

import com.dira.diravenir1.Entities.Candidature; // Assurez-vous que Candidature est bien dans ce package
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CandidatureRepository extends JpaRepository<Candidature, Long> {
    // Vous pouvez ajouter des méthodes de requête personnalisées ici si nécessaire.
    // Par exemple :
    // List<Candidature> findByEtudiantId(Long etudiantId);
    // List<Candidature> findByOffreId(Long offreId);
    // Optional<Candidature> findByEtudiantIdAndOffreId(Long etudiantId, Long offreId);
}