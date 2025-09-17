package com.diravenir.repository;

import com.diravenir.Entities.Candidature;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CandidatureRepository extends JpaRepository<Candidature, Long>, JpaSpecificationExecutor<Candidature> {

    /**
     * Compter les candidatures par statut
     */
    long countByStatut(String statut);

    /**
     * Récupérer les candidatures par statut
     */
    List<Candidature> findByStatut(String statut);

    /**
     * Récupérer les candidatures par étudiant
     */
    List<Candidature> findByEtudiantId(Long etudiantId);

    /**
     * Récupérer les candidatures par programme
     */
    List<Candidature> findByProgrammeId(Long programmeId);

    /**
     * Récupérer les candidatures par date de soumission
     */
    List<Candidature> findByDateSoumissionBetween(LocalDate startDate, LocalDate endDate);

    /**
     * Recherche de candidatures avec pagination
     */
    @Query("SELECT c FROM Candidature c " +
           "LEFT JOIN FETCH c.etudiant e " +
           "LEFT JOIN FETCH c.programme p " +
           "WHERE (:statut IS NULL OR c.statut = :statut) " +
           "AND (:searchTerm IS NULL OR " +
           "LOWER(CONCAT(e.prenom, ' ', e.nom)) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(e.email) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(p.program) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    Page<Candidature> findCandidaturesWithFilters(
        @Param("statut") String statut,
        @Param("searchTerm") String searchTerm,
        Pageable pageable
    );

    /**
     * Statistiques des candidatures par mois
     */
    @Query("SELECT MONTH(c.dateSoumission) as month, COUNT(c) as count " +
           "FROM Candidature c " +
           "WHERE YEAR(c.dateSoumission) = :year " +
           "GROUP BY MONTH(c.dateSoumission) " +
           "ORDER BY month")
    List<Object[]> getCandidatureStatsByMonth(@Param("year") int year);

    /**
     * Top des programmes les plus demandés
     */
    @Query("SELECT p.program, COUNT(c) as count " +
           "FROM Candidature c " +
           "JOIN c.programme p " +
           "GROUP BY p.id, p.program " +
           "ORDER BY count DESC")
    List<Object[]> getTopProgrammes(@Param("limit") int limit);

    /**
     * Recherche par statut avec pagination
     */
    Page<Candidature> findByStatutContainingIgnoreCase(String statut, Pageable pageable);

    /**
     * Recherche par nom d'étudiant avec pagination
     */
    Page<Candidature> findByEtudiant_NomContainingIgnoreCase(String nom, Pageable pageable);

    /**
     * Recherche combinée statut et nom d'étudiant avec pagination
     */
    Page<Candidature> findByStatutContainingIgnoreCaseAndEtudiant_NomContainingIgnoreCase(
        String statut, String nom, Pageable pageable);

    /**
     * Recherche par terme de recherche avec pagination
     */
    @Query("SELECT c FROM Candidature c " +
           "LEFT JOIN FETCH c.etudiant e " +
           "LEFT JOIN FETCH c.programme p " +
           "WHERE LOWER(CONCAT(e.prenom, ' ', e.nom)) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(e.email) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(p.program) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    Page<Candidature> findBySearchTerm(@Param("searchTerm") String searchTerm, Pageable pageable);

    /**
     * Recherche par statut et terme de recherche avec pagination
     */
    @Query("SELECT c FROM Candidature c " +
           "LEFT JOIN FETCH c.etudiant e " +
           "LEFT JOIN FETCH c.programme p " +
           "WHERE c.statut = :statut AND " +
           "(LOWER(CONCAT(e.prenom, ' ', e.nom)) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(e.email) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(p.program) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    Page<Candidature> findByStatutAndSearchTerm(@Param("statut") String statut, 
                                                @Param("searchTerm") String searchTerm, 
                                                Pageable pageable);
}