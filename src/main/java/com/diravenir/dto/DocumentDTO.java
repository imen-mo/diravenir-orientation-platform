package com.diravenir.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DocumentDTO {
    
    private Long id;
    private String nom;
    private String type;
    private String chemin;
    private String url; // Ajout pour compatibilité
    private Long taille;
    private String mimeType;
    private LocalDateTime dateUpload;
    private boolean valide;
    private String commentaireValidation;
    
    // Informations de la candidature
    private Long candidatureId;
    private Long etudiantId; // Ajout pour compatibilité
    
    // Méthodes utilitaires
    public String getTailleFormatee() {
        if (taille == null) return "0 B";
        
        if (taille < 1024) return taille + " B";
        if (taille < 1024 * 1024) return String.format("%.1f KB", taille / 1024.0);
        if (taille < 1024 * 1024 * 1024) return String.format("%.1f MB", taille / (1024.0 * 1024.0));
        return String.format("%.1f GB", taille / (1024.0 * 1024.0 * 1024.0));
    }
    
    public String getTypeIcon() {
        if (type == null) return "📄";
        
        switch (type.toLowerCase()) {
            case "pdf": return "📄";
            case "doc":
            case "docx": return "📝";
            case "jpg":
            case "jpeg":
            case "png": return "🖼️";
            case "zip":
            case "rar": return "📦";
            default: return "📄";
        }
    }
}