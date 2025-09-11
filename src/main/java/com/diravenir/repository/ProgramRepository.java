package com.diravenir.repository;

import com.diravenir.Entities.Program;
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
    
    // Recherche par catégorie
    List<Program> findByCategory(String category);
    
    // Recherche par pays
    @Query("SELECT p FROM Program p WHERE p.destination.nom = :country")
    List<Program> findByCountry(@Param("country") String country);
    
    // Recherche par ville du campus
    List<Program> findByCampusCityContainingIgnoreCase(String campusCity);
    
    // Recherche par durée
    List<Program> findByDuration(Integer duration);
    
    // Recherche par niveau
    List<Program> findByLevel(String level);
    
    // Recherche par langue
    List<Program> findByLanguage(String language);
    
    // Recherche par frais de scolarité
    @Query("SELECT p FROM Program p WHERE p.tuitionFees BETWEEN :minFees AND :maxFees")
    List<Program> findByTuitionFeesRange(@Param("minFees") Double minFees, @Param("maxFees") Double maxFees);
    
    // Recherche par date limite d'inscription
    List<Program> findByApplyBeforeContainingIgnoreCase(String applyBefore);
    
    // Recherche par programme actif
    List<Program> findByStatusAndIsActiveTrue(Program.ProgramStatus status);
    
    // Compter par statut
    long countByStatus(Program.ProgramStatus status);
    
    // Compter par catégorie
    long countByCategory(String category);
    
    // Compter par pays
    @Query("SELECT COUNT(p) FROM Program p WHERE p.destination.nom = :country")
    long countByCountry(@Param("country") String country);
    
    // Trouver les programmes populaires (par nombre d'applications)
    @Query("SELECT p FROM Program p ORDER BY p.applicationCount DESC")
    List<Program> findPopularPrograms();
    
    // Trouver les programmes récents
    @Query("SELECT p FROM Program p ORDER BY p.createdAt DESC")
    List<Program> findRecentPrograms();
    
    // Vérifier si un programme existe par nom
    boolean existsByProgram(String program);
    
    // Trouver par ID avec relations
    @EntityGraph(attributePaths = {"universite", "destination"})
    @Query("SELECT p FROM Program p WHERE p.id = :id")
    Program findByIdWithRelations(@Param("id") Long id);
    
    // Méthodes pour les filtres disponibles
    @Query("SELECT DISTINCT p.destination.nom FROM Program p WHERE p.destination.nom IS NOT NULL")
    List<String> findDistinctCountries();
    
    @Query("SELECT DISTINCT p.category FROM Program p WHERE p.category IS NOT NULL")
    List<String> findDistinctCategories();
}
