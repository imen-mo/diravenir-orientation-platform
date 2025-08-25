package com.dira.diravenir1.Repository;

import com.dira.diravenir1.Entities.FamilyMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FamilyMemberRepository extends JpaRepository<FamilyMember, Long> {
    
    List<FamilyMember> findByApplicationId(Long applicationId);
    
    void deleteByApplicationId(Long applicationId);
    
    List<FamilyMember> findByApplicationIdAndRelationship(Long applicationId, FamilyMember.FamilyRelationship relationship);
}
