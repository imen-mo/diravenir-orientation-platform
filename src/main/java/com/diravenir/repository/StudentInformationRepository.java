package com.diravenir.repository;

import com.diravenir.Entities.StudentInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentInformationRepository extends JpaRepository<StudentInformation, Long> {
    
    /**
     * Trouve une information étudiant par UUID de test
     */
    Optional<StudentInformation> findByTestUuid(String testUuid);
    
    /**
     * Trouve toutes les informations étudiant par email
     */
    List<StudentInformation> findByEmail(String email);
    
    /**
     * Vérifie si un email existe déjà
     */
    boolean existsByEmail(String email);
    
    /**
     * Vérifie si un UUID de test existe déjà
     */
    boolean existsByTestUuid(String testUuid);
    
    /**
     * Trouve les informations étudiant par nom complet
     */
    List<StudentInformation> findByFullNameIgnoreCase(String fullName);
    
    /**
     * Trouve les informations étudiant par nom complet contenant le terme recherché
     */
    List<StudentInformation> findByFullNameContainingIgnoreCase(String name);
    
    /**
     * Trouve les informations étudiant créées après une date donnée
     */
    @Query("SELECT si FROM StudentInformation si WHERE si.createdAt >= :date")
    List<StudentInformation> findByCreatedAtAfter(@Param("date") java.time.LocalDateTime date);
}
