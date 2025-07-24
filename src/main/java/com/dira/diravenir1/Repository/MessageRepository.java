package com.dira.diravenir1.Repository;

import com.dira.diravenir1.Entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByEtudiantId(Long etudiantId);
    List<Message> findByConseillerId(Long conseillerId);
} 