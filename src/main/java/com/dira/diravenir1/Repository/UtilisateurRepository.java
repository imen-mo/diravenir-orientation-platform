package com.dira.diravenir1.Repository;

import com.dira.diravenir1.Entities.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    // Ajoute ici des méthodes personnalisées si nécessaire
    boolean existsByEmail(String email);
}
