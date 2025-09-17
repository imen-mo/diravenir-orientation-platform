package com.diravenir.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "saved_programs")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SavedProgram {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "etudiant_id", nullable = false)
    private Etudiant etudiant;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "program_id", nullable = false)
    private Program program;
    
    @CreationTimestamp
    @Column(name = "saved_at", nullable = false)
    private LocalDateTime savedAt;
    
    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes; // Notes personnelles de l'étudiant sur ce programme
    
    // Constructeur pour faciliter la création
    public SavedProgram(Etudiant etudiant, Program program) {
        this.etudiant = etudiant;
        this.program = program;
        this.savedAt = LocalDateTime.now();
    }
}
