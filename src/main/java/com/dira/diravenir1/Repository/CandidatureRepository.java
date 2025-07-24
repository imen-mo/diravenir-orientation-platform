package com.dira.diravenir1.Repository;

import com.dira.diravenir1.Entities.Candidature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CandidatureRepository extends JpaRepository<Candidature, Long> {
}