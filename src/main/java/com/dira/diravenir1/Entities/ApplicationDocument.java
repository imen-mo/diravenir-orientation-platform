package com.dira.diravenir1.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "application_documents")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationDocument {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "application_id", nullable = false)
    private Long applicationId;
    
    @Column(name = "document_type", nullable = false)
    private String documentType;
    
    @Column(name = "original_file_name", nullable = false)
    private String originalFileName;
    
    @Column(name = "stored_file_name", nullable = false)
    private String storedFileName;
    
    @Column(name = "file_path", nullable = false)
    private String filePath;
    
    @Column(name = "file_size")
    private Long fileSize;
    
    @Column(name = "mime_type")
    private String mimeType;
    
    @Column(name = "upload_date", nullable = false)
    private LocalDateTime uploadDate;
    
    @Column(name = "updated_date")
    private LocalDateTime updatedDate;
    
    @Column(name = "status", nullable = false)
    private String status = "UPLOADED";
    
    @Column(name = "not_applicable_reason", columnDefinition = "TEXT")
    private String notApplicableReason;
    
    @Column(name = "admin_notes", columnDefinition = "TEXT")
    private String adminNotes;
    
    @Column(name = "verification_status")
    private String verificationStatus = "PENDING";
    
    @Column(name = "verified_by")
    private String verifiedBy;
    
    @Column(name = "verified_at")
    private LocalDateTime verifiedAt;
    
    // ===== RELATIONS =====
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", insertable = false, updatable = false)
    private Application application;
    
    // ===== MÉTHODES DE GESTION =====
    
    @PrePersist
    protected void onCreate() {
        if (uploadDate == null) {
            uploadDate = LocalDateTime.now();
        }
        if (status == null) {
            status = "UPLOADED";
        }
        if (verificationStatus == null) {
            verificationStatus = "PENDING";
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedDate = LocalDateTime.now();
    }
    
    // ===== MÉTHODES UTILITAIRES =====
    
    public boolean isUploaded() {
        return "UPLOADED".equals(status);
    }
    
    public boolean isNotApplicable() {
        return "NOT_APPLICABLE".equals(status);
    }
    
    public boolean isRejected() {
        return "REJECTED".equals(status);
    }
    
    public boolean isVerified() {
        return "VERIFIED".equals(verificationStatus);
    }
    
    public boolean isPendingVerification() {
        return "PENDING".equals(verificationStatus);
    }
    
    public String getFileExtension() {
        if (originalFileName != null && originalFileName.contains(".")) {
            return originalFileName.substring(originalFileName.lastIndexOf("."));
        }
        return "";
    }
    
    public String getFileSizeInMB() {
        if (fileSize != null) {
            return String.format("%.2f MB", fileSize / (1024.0 * 1024.0));
        }
        return "0 MB";
    }
    
    public String getDocumentTypeDisplayName() {
        switch (documentType) {
            case "PASSPORT":
                return "Pages du passeport";
            case "ACADEMIC_CERTIFICATE":
                return "Certificat académique le plus élevé";
            case "ACADEMIC_TRANSCRIPT":
                return "Relevé de notes académique";
            case "LANGUAGE_CERTIFICATE":
                return "Certificat de maîtrise de l'anglais";
            case "PHYSICAL_EXAMINATION":
                return "Formulaire d'examen physique";
            case "NON_CRIMINAL_CERTIFICATE":
                return "Certificat de non-condamnation";
            case "BANK_STATEMENT":
                return "Relevé bancaire/Solvabilité";
            case "PHOTO":
                return "Photo personnelle (format passeport)";
            case "RESUME":
                return "CV/Resume";
            case "AWARD_CERTIFICATES":
                return "Certificats de récompense";
            case "PARENT_ID":
                return "Carte d'identité du père/mère";
            default:
                return documentType;
        }
    }
    
    public boolean isRequired() {
        switch (documentType) {
            case "PASSPORT":
            case "ACADEMIC_CERTIFICATE":
            case "ACADEMIC_TRANSCRIPT":
            case "NON_CRIMINAL_CERTIFICATE":
            case "PHOTO":
                return true;
            default:
                return false;
        }
    }
}
