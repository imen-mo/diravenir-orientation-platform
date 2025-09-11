package com.diravenir.repository;

import com.diravenir.Entities.Utilisateur;
import com.diravenir.Entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    
    Optional<Utilisateur> findByEmail(String email);
    
    boolean existsByEmail(String email);
    
    List<Utilisateur> findByRole(Role role);
    
    @Query("SELECT u FROM Utilisateur u WHERE u.compteActif = true")
    List<Utilisateur> findActiveUsers();
    
    @Query("SELECT u FROM Utilisateur u WHERE u.email LIKE %:searchTerm% OR u.nom LIKE %:searchTerm% OR u.prenom LIKE %:searchTerm%")
    List<Utilisateur> searchUsers(@Param("searchTerm") String searchTerm);
}
