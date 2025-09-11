package com.diravenir.repository;

import com.diravenir.Entities.Destination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DestinationRepository extends JpaRepository<Destination, Long> {
    
    Optional<Destination> findByNom(String nom);
    
    List<Destination> findByPays(String pays);
    
    List<Destination> findByActiveTrue();
    
    List<Destination> findByPaysAndActiveTrue(String pays);
    
    @Query("SELECT d FROM Destination d WHERE LOWER(d.nom) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(d.pays) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Destination> searchByKeyword(@Param("keyword") String keyword);
    
    @Query("SELECT DISTINCT d.pays FROM Destination d WHERE d.active = true ORDER BY d.pays")
    List<String> findAllPays();
    
    @Query("SELECT d FROM Destination d WHERE d.pays = :pays AND d.active = true ORDER BY d.nom")
    List<Destination> findByPaysOrderByNom(@Param("pays") String pays);
    
    boolean existsByNom(String nom);
    
    long countByActiveTrue();
    
    List<Destination> findByNomContainingIgnoreCase(String nom);
    
    @Query("SELECT DISTINCT d FROM Destination d LEFT JOIN FETCH d.universites WHERE d.active = true")
    List<Destination> findAllWithUniversites();
}