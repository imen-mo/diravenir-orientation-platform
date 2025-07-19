package com.dira.diravenir1.Repository;

import com.dira.diravenir1.Entities.ResultatTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultatTestRepository extends JpaRepository<ResultatTest, Long> {
    List<ResultatTest> findByEtudiantId(Long etudiantId);
}

