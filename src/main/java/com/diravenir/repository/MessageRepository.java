package com.diravenir.repository;

import com.diravenir.Entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    
    List<Message> findByEtudiantId(Long etudiantId);
    
    List<Message> findByConseillerId(Long conseillerId);
    
    List<Message> findByEtudiantIdAndConseillerId(Long etudiantId, Long conseillerId);
    
    List<Message> findByEtudiantIdAndConseillerIdOrderByDateEnvoiDesc(Long etudiantId, Long conseillerId);
    
    List<Message> findByLuFalse();
    
    List<Message> findByEtudiantIdAndLuFalse(Long etudiantId);
    
    List<Message> findByConseillerIdAndLuFalse(Long conseillerId);
}
