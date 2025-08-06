package com.dira.diravenir1.Repository;

import com.dira.diravenir1.Entities.Program;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProgramRepository extends JpaRepository<Program, Long> {
    
    // Recherche par statut
    List<Program> findByStatus(Program.ProgramStatus status);
    
    // Recherche par major
    List<Program> findByMajorNameContainingIgnoreCase(String majorName);
    
    // Recherche par université
    List<Program> findByUniversityNameContainingIgnoreCase(String universityName);
    
    // Recherche par destination
    List<Program> findByDestinationId(Long destinationId);
    
    // Recherche par université
    List<Program> findByUniversiteId(Long universiteId);
    
    // Recherche combinée
    @Query("SELECT p FROM Program p WHERE " +
           "(:majorName IS NULL OR LOWER(p.majorName) LIKE LOWER(CONCAT('%', :majorName, '%'))) AND " +
           "(:universityName IS NULL OR LOWER(p.universityName) LIKE LOWER(CONCAT('%', :universityName, '%'))) AND " +
           "(:status IS NULL OR p.status = :status)")
    List<Program> findByFilters(@Param("majorName") String majorName, 
                               @Param("universityName") String universityName, 
                               @Param("status") Program.ProgramStatus status);
    
    // Recherche par texte libre
    @Query("SELECT p FROM Program p WHERE " +
           "LOWER(p.majorName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(p.universityName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Program> searchPrograms(@Param("searchTerm") String searchTerm);
} 