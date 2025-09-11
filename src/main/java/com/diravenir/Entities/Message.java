package com.diravenir.Entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String contenu;
    private LocalDateTime dateEnvoi;
    @ManyToOne
    @JoinColumn(name = "etudiant_id")
    private Etudiant etudiant;
    @ManyToOne
    @JoinColumn(name = "conseiller_id")
    private Conseiller conseiller;
    private boolean lu = false;
    
    // Méthodes manuelles pour éviter les problèmes Lombok
    public boolean getLu() {
        return lu;
    }
    
    public void setLu(boolean lu) {
        this.lu = lu;
    }
} 
