package com.diravenir.repository;

import com.diravenir.Entities.SavedProgram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SavedProgramRepository extends JpaRepository<SavedProgram, Long> {
    
    /**
     * Trouver tous les programmes sauvegardés d'un étudiant
     */
    List<SavedProgram> findByEtudiantId(Long etudiantId);
    
    /**
     * Trouver tous les programmes sauvegardés d'un étudiant par email
     */
    @Query("SELECT sp FROM SavedProgram sp JOIN sp.etudiant e WHERE e.email = :email ORDER BY sp.savedAt DESC")
    List<SavedProgram> findByEtudiantEmail(@Param("email") String email);
    
    /**
     * Vérifier si un programme est déjà sauvegardé par un étudiant
     */
    Optional<SavedProgram> findByEtudiantIdAndProgramId(Long etudiantId, Long programId);
    
    /**
     * Vérifier si un programme est déjà sauvegardé par un étudiant (par email)
     */
    @Query("SELECT sp FROM SavedProgram sp JOIN sp.etudiant e WHERE e.email = :email AND sp.program.id = :programId")
    Optional<SavedProgram> findByEtudiantEmailAndProgramId(@Param("email") String email, @Param("programId") Long programId);
    
    /**
     * Compter le nombre de programmes sauvegardés par un étudiant
     */
    long countByEtudiantId(Long etudiantId);
    
    /**
     * Compter le nombre de programmes sauvegardés par un étudiant (par email)
     */
    @Query("SELECT COUNT(sp) FROM SavedProgram sp JOIN sp.etudiant e WHERE e.email = :email")
    long countByEtudiantEmail(@Param("email") String email);
    
    /**
     * Supprimer un programme sauvegardé par un étudiant
     */
    void deleteByEtudiantIdAndProgramId(Long etudiantId, Long programId);
    
    /**
     * Supprimer un programme sauvegardé par un étudiant (par email)
     */
    @Query("DELETE FROM SavedProgram sp WHERE sp.etudiant.email = :email AND sp.program.id = :programId")
    void deleteByEtudiantEmailAndProgramId(@Param("email") String email, @Param("programId") Long programId);
}
