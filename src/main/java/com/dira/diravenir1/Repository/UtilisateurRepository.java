package com.dira.diravenir1.Repository;

import com.dira.diravenir1.Entities.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    boolean existsByEmail(String email);
    Optional<Utilisateur> findByEmail(String email); // 👈 AJOUTE CECI
}
