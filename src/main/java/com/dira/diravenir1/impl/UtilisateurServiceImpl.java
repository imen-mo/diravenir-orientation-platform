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
        utilisateur.setEmail(request.getEmail());

        // Encodage du mot de passe
        utilisateur.setMotDePasse(passwordEncoder.encode(request.getMotDePasse()));

        // Par défaut, rôle USER (à ajuster selon ton Enum Role)
        utilisateur.setRole(Role.USER);

        // TODO : compléter avec d'autres champs si nécessaire

        utilisateurRepository.save(utilisateur);
    }

    // Méthode de conversion Entity -> DTO
    private UtilisateurDTO convertToDTO(Utilisateur utilisateur) {
        UtilisateurDTO dto = new UtilisateurDTO();
        dto.setId(utilisateur.getId());
        dto.setNom(utilisateur.getNom());
        dto.setPrenom(utilisateur.getPrenom());
        dto.setEmail(utilisateur.getEmail());
        dto.setMotDePasse(utilisateur.getMotDePasse());
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
        utilisateur.setMotDePasse(dto.getMotDePasse());
        utilisateur.setRole(dto.getRole());
        return utilisateur;
}
}