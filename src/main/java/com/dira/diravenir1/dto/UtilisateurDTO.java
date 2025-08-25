package com.dira.diravenir1.dto;

import com.dira.diravenir1.Entities.Role;
import java.time.LocalDateTime;

public class UtilisateurDTO {
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String motDePasse;
    private Role role;
    private String languePreferee;
    private String photoProfil;
    private LocalDateTime dateCreation;
    private LocalDateTime derniereConnexion;
    private boolean compteActif;

    // Getters et Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getNom() {
        return nom;
    }
    public void setNom(String nom) {
        this.nom = nom;
    }
    public String getPrenom() {
        return prenom;
    }
    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getMotDePasse() {
        return motDePasse;
    }
    public void setMotDePasse(String motDePasse) {
        this.motDePasse = motDePasse;
    }
    public Role getRole() {
        return role;
    }
    public void setRole(Role role) {
        this.role = role;
    }

    public String getLanguePreferee() {
        return languePreferee;
    }
    public void setLanguePreferee(String languePreferee) {
        this.languePreferee = languePreferee;
    }

    public String getPhotoProfil() {
        return photoProfil;
    }
    public void setPhotoProfil(String photoProfil) {
        this.photoProfil = photoProfil;
    }
    
    public LocalDateTime getDateCreation() {
        return dateCreation;
    }
    public void setDateCreation(LocalDateTime dateCreation) {
        this.dateCreation = dateCreation;
    }
    
    public LocalDateTime getDerniereConnexion() {
        return derniereConnexion;
    }
    public void setDerniereConnexion(LocalDateTime derniereConnexion) {
        this.derniereConnexion = derniereConnexion;
    }
    
    public boolean isCompteActif() {
        return compteActif;
    }
    public void setCompteActif(boolean compteActif) {
        this.compteActif = compteActif;
    }
}
