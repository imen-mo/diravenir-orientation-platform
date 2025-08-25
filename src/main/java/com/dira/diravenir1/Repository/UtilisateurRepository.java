package com.dira.diravenir1.Repository;

import com.dira.diravenir1.Entities.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    boolean existsByEmail(String email);
    Optional<Utilisateur> findByEmail(String email);
    
    /**
     * Trouver les utilisateurs inactifs depuis une certaine date
     */
    @Query("SELECT u FROM Utilisateur u WHERE u.derniereConnexion < :threshold")
    List<Utilisateur> findByDerniereConnexionBefore(@Param("threshold") LocalDateTime threshold);
    
    /**
     * Compter les utilisateurs actifs
     */
    long countByCompteActifTrue();
}
