package com.dira.diravenir1.dto;


public class DocumentDTO {
    private Long id;
    private String nom;
    private String type;
    private String url;
    private Long etudiantId;        // Ajouté
    private Long candidatureId;     // Ajouté

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public Long getEtudiantId() { return etudiantId; }
    public void setEtudiantId(Long etudiantId) { this.etudiantId = etudiantId; }

    public Long getCandidatureId() { return candidatureId; }
    public void setCandidatureId(Long candidatureId) { this.candidatureId = candidatureId; }

    // Supprime ou complète cette méthode si elle ne sert à rien
    // public String getChemin() {} => à enlever
}

