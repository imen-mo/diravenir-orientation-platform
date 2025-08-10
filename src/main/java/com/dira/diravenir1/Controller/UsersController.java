package com.dira.diravenir1.Controller;

import com.dira.diravenir1.Entities.Utilisateur;
import com.dira.diravenir1.Repository.UtilisateurRepository;
import com.dira.diravenir1.dto.UtilisateurDTO;
import com.dira.diravenir1.mapper.UtilisateurMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UsersController {

    private final UtilisateurRepository utilisateurRepository;
    private final UtilisateurMapper utilisateurMapper;

    /**
     * Retourne le profil de l'utilisateur connecté
     */
    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {
        if (authentication == null || authentication.getName() == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Non authentifié"));
        }
        String email = authentication.getName();
        Utilisateur user = utilisateurRepository.findByEmail(email)
                .orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Utilisateur introuvable"));
        }
        UtilisateurDTO dto = utilisateurMapper.toDTO(user);
        return ResponseEntity.ok(dto);
    }

    /**
     * Met à jour quelques champs du profil de l'utilisateur connecté
     */
    @PutMapping("/me")
    @Transactional
    public ResponseEntity<?> updateMe(@RequestBody UtilisateurDTO payload, Authentication authentication) {
        if (authentication == null || authentication.getName() == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Non authentifié"));
        }
        String email = authentication.getName();
        Utilisateur user = utilisateurRepository.findByEmail(email)
                .orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Utilisateur introuvable"));
        }

        // Mettre à jour les champs autorisés
        if (payload.getNom() != null) user.setNom(payload.getNom());
        if (payload.getPrenom() != null) user.setPrenom(payload.getPrenom());
        if (payload.getPhotoProfil() != null) user.setPhotoProfil(payload.getPhotoProfil());
        // Email/Role/Mot de passe ne sont pas modifiables ici

        Utilisateur saved = utilisateurRepository.save(user);
        return ResponseEntity.ok(utilisateurMapper.toDTO(saved));
    }
}


