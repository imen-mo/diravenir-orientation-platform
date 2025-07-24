package com.dira.diravenir1.Repository;

import com.dira.diravenir1.Entities.Document;  // <-- Import manquant à ajouter
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<Document, Long> {
}
