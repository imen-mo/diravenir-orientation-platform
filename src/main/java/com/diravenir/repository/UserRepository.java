package com.diravenir.repository;

import com.diravenir.Entities.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Utilisateur, Long> {
    
    Optional<Utilisateur> findByEmail(String email);
    
    Optional<Utilisateur> findByEmailAndAuthProvider(String email, com.diravenir.Entities.AuthProvider provider);
    
    Optional<Utilisateur> findByGoogleId(String googleId);
    
    boolean existsByEmail(String email);
    
    Optional<Utilisateur> findByEmailVerificationToken(String token);
    
    @Query("SELECT COUNT(u) FROM Utilisateur u WHERE u.derniereConnexion >= :since")
    long countRecentLogins(LocalDateTime since);
}
