package com.diravenir.repository;

import com.diravenir.Entities.Temoignage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TemoignageRepository extends JpaRepository<Temoignage, Long> {
    
    List<Temoignage> findByOrderByDateCreationDesc();
}
