package com.diravenir.dto;

import com.diravenir.Entities.Role;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
    
    // Champs OAuth2
    private String oauth2Provider;
    private String oauth2ProviderId;
    private String oauth2Picture;

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
    
    // Getters et Setters OAuth2
    public String getOauth2Provider() {
        return oauth2Provider;
    }
    
    public void setOauth2Provider(String oauth2Provider) {
        this.oauth2Provider = oauth2Provider;
    }
    
    public String getOauth2ProviderId() {
        return oauth2ProviderId;
    }
    
    public void setOauth2ProviderId(String oauth2ProviderId) {
        this.oauth2ProviderId = oauth2ProviderId;
    }
    
    public String getOauth2Picture() {
        return oauth2Picture;
    }
    
    public void setOauth2Picture(String oauth2Picture) {
        this.oauth2Picture = oauth2Picture;
    }
}
