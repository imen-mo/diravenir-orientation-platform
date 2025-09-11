package com.diravenir.repository;

import com.diravenir.Entities.IdealProfile;
import com.diravenir.Entities.OrientationMajor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface IdealProfileRepository extends JpaRepository<IdealProfile, Long> {
    
    List<IdealProfile> findByMajorId(Long majorId);
    
    List<IdealProfile> findByPillarName(String pillarName);
    
    @Query("SELECT ip FROM IdealProfile ip WHERE ip.major.id = :majorId AND ip.pillarName = :pillarName")
    IdealProfile findByMajorIdAndPillarName(@Param("majorId") Long majorId, @Param("pillarName") String pillarName);
    
    @Query("SELECT ip.pillarName, ip.idealScore FROM IdealProfile ip WHERE ip.major.id = :majorId")
    List<Object[]> findPillarScoresByMajorId(@Param("majorId") Long majorId);
    
    @Query("SELECT ip.major.id, ip.pillarName, ip.idealScore FROM IdealProfile ip WHERE ip.major.isActive = true")
    List<Object[]> findAllActiveMajorProfiles();
    
    @Query("SELECT DISTINCT ip.pillarName FROM IdealProfile ip ORDER BY ip.pillarName")
    List<String> findDistinctPillarNames();
    
    @Query("SELECT ip.major.id, AVG(ip.idealScore) FROM IdealProfile ip GROUP BY ip.major.id")
    List<Object[]> getAverageScoresByMajor();
}
