package com.diravenir.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CandidatureDTO {
    
    private Long id;
    private String statut;
    private LocalDate dateSoumission;
    private String suivi;
    private LocalDateTime dateModification;
    private String commentaireAdmin;
    
    // Informations de l'étudiant
    private Long etudiantId;
    private String etudiantNom;
    private String etudiantPrenom;
    private String etudiantEmail;
    private String etudiantTelephone;
    
    // Informations du programme
    private Long programmeId;
    private String programmeNom;
    private String programmeCategorie;
    private String programmeUniversite;
    private String programmePays;
    
    // Documents
    private List<DocumentDTO> documents;
    
    // Statistiques
    private long totalDocuments;
    private boolean documentsComplets;
    
    // Méthodes utilitaires
    public String getStatutDisplayName() {
        switch (statut) {
            case "EN_ATTENTE": return "En Attente";
            case "EN_COURS": return "En Cours";
            case "APPROUVEE": return "Approuvée";
            case "REJETEE": return "Rejetée";
            default: return statut;
        }
    }
    
    public String getStatutColor() {
        switch (statut) {
            case "EN_ATTENTE": return "#f39c12"; // Orange
            case "EN_COURS": return "#3498db";   // Bleu
            case "APPROUVEE": return "#27ae60";  // Vert
            case "REJETEE": return "#e74c3c";    // Rouge
            default: return "#95a5a6";          // Gris
        }
    }
    
    public String getStatutIcon() {
        switch (statut) {
            case "EN_ATTENTE": return "⏳";
            case "EN_COURS": return "🔄";
            case "APPROUVEE": return "✅";
            case "REJETEE": return "❌";
            default: return "❓";
        }
    }
}