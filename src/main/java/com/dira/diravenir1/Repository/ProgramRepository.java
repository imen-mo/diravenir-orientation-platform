package com.dira.diravenir1.Repository;

import com.dira.diravenir1.Entities.Program;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface ProgramRepository extends JpaRepository<Program, Long> {
    
    // Récupérer tous les programmes avec leurs universités et logos
    @EntityGraph(attributePaths = {"universite", "destination"})
    @Query("SELECT p FROM Program p JOIN FETCH p.universite u JOIN FETCH p.destination d")
    List<Program> findAllWithUniversite();
    
    // Méthode alternative plus simple pour éviter les problèmes de relations
    @Query("SELECT p FROM Program p")
    List<Program> findAllSimple();
    
    // Recherche par statut
    List<Program> findByStatus(Program.ProgramStatus status);
    
    // Recherche par programme
    List<Program> findByProgramContainingIgnoreCase(String program);
    
    // Recherche par université
    List<Program> findByUniversitiesContainingIgnoreCase(String universities);
    
    // Recherche par destination
    List<Program> findByDestinationId(Long destinationId);
    
    // Recherche par université
    List<Program> findByUniversiteId(Long universiteId);
    
    // Recherche combinée
    @Query("SELECT p FROM Program p WHERE " +
           "(:program IS NULL OR LOWER(p.program) LIKE LOWER(CONCAT('%', :program, '%'))) AND " +
           "(:universities IS NULL OR LOWER(p.universities) LIKE LOWER(CONCAT('%', :universities, '%'))) AND " +
           "(:status IS NULL OR p.status = :status)")
    List<Program> findByFilters(@Param("program") String program, 
                               @Param("universities") String universities, 
                               @Param("status") Program.ProgramStatus status);
    
    // Recherche par texte libre
    @Query("SELECT p FROM Program p WHERE " +
           "LOWER(p.program) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(p.universities) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Program> searchPrograms(@Param("searchTerm") String searchTerm);
    
    // Filtrage avancé avec tous les paramètres
    @Query("SELECT p FROM Program p WHERE " +
           "(:searchTerm IS NULL OR " +
           "LOWER(p.program) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(p.universities) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(p.category) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(p.campusCity) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) AND " +
           "(:country IS NULL OR p.destination.nom = :country) AND " +
           "(:category IS NULL OR p.category = :category) AND " +
           "(:status IS NULL OR p.status = :status)")
    List<Program> findByAdvancedFilters(@Param("searchTerm") String searchTerm,
                                       @Param("country") String country,
                                       @Param("category") String category,
                                       @Param("status") Program.ProgramStatus status);
    
    // Filtrage avancé avec pagination
    @Query("SELECT p FROM Program p WHERE " +
           "(:searchTerm IS NULL OR " +
           "LOWER(p.program) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(p.universities) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(p.category) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(p.campusCity) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) AND " +
           "(:country IS NULL OR p.destination.nom = :country) AND " +
           "(:category IS NULL OR p.category = :category) AND " +
           "(:status IS NULL OR p.status = :status)")
    Page<Program> findByAdvancedFiltersWithPagination(@Param("searchTerm") String searchTerm,
                                                      @Param("country") String country,
                                                      @Param("category") String category,
                                                      @Param("status") Program.ProgramStatus status,
                                                      Pageable pageable);
    
    // Requête pour compter le total sans pagination (pour le tri global)
    @Query("SELECT COUNT(p) FROM Program p WHERE " +
           "(:searchTerm IS NULL OR " +
           "LOWER(p.program) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(p.universities) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(p.category) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(p.campusCity) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) AND " +
           "(:country IS NULL OR p.destination.nom = :country) AND " +
           "(:category IS NULL OR p.category = :category) AND " +
           "(:status IS NULL OR p.status = :status)")
    long countByAdvancedFilters(@Param("searchTerm") String searchTerm,
                               @Param("country") String country,
                               @Param("category") String category,
                               @Param("status") Program.ProgramStatus status);
} 