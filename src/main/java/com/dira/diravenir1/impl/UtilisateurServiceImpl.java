package com.dira.diravenir1.impl;
import com.dira.diravenir1.Entities.Role;

import com.dira.diravenir1.dto.UtilisateurDTO;
import com.dira.diravenir1.Entities.Utilisateur;
import com.dira.diravenir1.Repository.UtilisateurRepository;
import com.dira.diravenir1.payload.SignupRequest;
import com.dira.diravenir1.service.UtilisateurService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UtilisateurServiceImpl implements UtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<UtilisateurDTO> getAll() {
        return utilisateurRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UtilisateurDTO create(UtilisateurDTO dto) {
        Utilisateur utilisateur = convertToEntity(dto);
        // On suppose ici que motDePasse est déjà encodé si nécessaire
        Utilisateur saved = utilisateurRepository.save(utilisateur);
        return convertToDTO(saved);
    }

    @Override
    public void createUser(SignupRequest request) {
        Utilisateur utilisateur = new Utilisateur();

        utilisateur.setNom(request.getNom());
        utilisateur.setPrenom(request.getPrenom());
        utilisateur.setEmail(request.getEmail());

        // Encodage du mot de passe
        utilisateur.setPassword(passwordEncoder.encode(request.getPassword()));

        // Par défaut, rôle USER
        utilisateur.setRole(Role.USER);

        utilisateurRepository.save(utilisateur);
    }

    @Override
    public boolean existsByEmail(String email) {
        return utilisateurRepository.findByEmail(email).isPresent();
    }

    @Override
    public void registerUser(SignupRequest request) {
        // Normalisation des données
        request.normalizeData();
        
        // Validation des mots de passe
        if (!request.isPasswordConfirmed()) {
            throw new SecurityException("Les mots de passe ne correspondent pas");
        }

        // Validation email
        if (!isValidEmail(request.getEmail())) {
            throw new SecurityException("Format d'email invalide");
        }

        // Validation mot de passe fort
        if (!request.isStrongPassword()) {
            throw new SecurityException("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial");
        }

        // Vérifier si l'email existe déjà
        if (utilisateurRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new SecurityException("Un utilisateur avec cet email existe déjà");
        }

        Utilisateur utilisateur = new Utilisateur();
        
        // Remplir les champs essentiels
        utilisateur.setNom(request.getNom());
        utilisateur.setPrenom(request.getPrenom());
        utilisateur.setEmail(request.getEmail());
        
        // Encodage du mot de passe
        utilisateur.setPassword(passwordEncoder.encode(request.getPassword()));
        
        // Par défaut, rôle USER
        utilisateur.setRole(Role.USER);

        utilisateurRepository.save(utilisateur);
    }

    // Méthode de conversion Entity -> DTO
    private UtilisateurDTO convertToDTO(Utilisateur utilisateur) {
        UtilisateurDTO dto = new UtilisateurDTO();
        dto.setId(utilisateur.getId());
        dto.setNom(utilisateur.getNom());
        dto.setPrenom(utilisateur.getPrenom());
        dto.setEmail(utilisateur.getEmail());
        // Ne pas exposer le mot de passe dans le DTO
        dto.setMotDePasse(null);
        dto.setRole(utilisateur.getRole());
        return dto;
    }

    // Méthode de conversion DTO -> Entity
    private Utilisateur convertToEntity(UtilisateurDTO dto) {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setId(dto.getId());
        utilisateur.setNom(dto.getNom());
        utilisateur.setPrenom(dto.getPrenom());
        utilisateur.setEmail(dto.getEmail());
        // Ne pas utiliser le mot de passe du DTO directement
        if (dto.getMotDePasse() != null) {
            utilisateur.setPassword(passwordEncoder.encode(dto.getMotDePasse()));
        }
        utilisateur.setRole(dto.getRole());
        return utilisateur;
    }

    // Validation email améliorée
    private boolean isValidEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            return false;
        }
        
        // Regex plus stricte pour la validation email
        String emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
        boolean isValidFormat = email.matches(emailRegex);
        
        // Vérifications supplémentaires
        if (!isValidFormat) {
            return false;
        }
        
        // Vérifier la longueur
        if (email.length() > 254) {
            return false;
        }
        
        // Vérifier qu'il n'y a pas de caractères dangereux
        String dangerousChars = "<>\"'&";
        for (char c : dangerousChars.toCharArray()) {
            if (email.contains(String.valueOf(c))) {
                return false;
            }
        }
        
        return true;
    }
}

