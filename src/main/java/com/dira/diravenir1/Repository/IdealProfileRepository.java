package com.dira.diravenir1.Repository;

import com.dira.diravenir1.entity.IdealProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IdealProfileRepository extends JpaRepository<IdealProfile, Long> {
    
    List<IdealProfile> findByProgramId(Long programId);
    
    @Query("SELECT ip FROM IdealProfile ip WHERE ip.program.program = :programName")
    List<IdealProfile> findByProgramName(@Param("programName") String programName);
    
    @Query("SELECT ip FROM IdealProfile ip WHERE ip.program.program = :programName AND ip.pillarName = :pillarName")
    Optional<IdealProfile> findByProgramNameAndPillarName(@Param("programName") String programName, @Param("pillarName") String pillarName);
    
    // Méthode pour supprimer tous les profils d'un programme
    void deleteByProgramId(Long programId);
}
