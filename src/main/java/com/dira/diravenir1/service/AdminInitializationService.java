package com.dira.diravenir1.service;

import com.dira.diravenir1.Entities.Role;
import com.dira.diravenir1.Entities.Utilisateur;
import com.dira.diravenir1.Repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AdminInitializationService implements CommandLineRunner {

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.email:admin@diravenir.com}")
    private String adminEmail;

    @Value("${app.admin.password:admin123}")
    private String adminPassword;

    @Value("${app.admin.nom:Admin}")
    private String adminNom;

    @Value("${app.admin.prenom:System}")
    private String adminPrenom;

    @Override
    public void run(String... args) throws Exception {
        initializeAdmin();
    }

    private void initializeAdmin() {
        // Vérifier si l'admin existe déjà
        if (utilisateurRepository.findByEmail(adminEmail).isPresent()) {
            System.out.println("✅ Admin déjà existant: " + adminEmail);
            return;
        }

        try {
            // Créer l'admin
            Utilisateur admin = Utilisateur.builder()
                    .nom(adminNom)
                    .prenom(adminPrenom)
                    .email(adminEmail)
                    .password(passwordEncoder.encode(adminPassword))
                    .role(Role.ADMIN)
                    .compteActif(true)
                    .dateCreation(LocalDateTime.now())
                    .build();

            // Sauvegarder l'admin
            Utilisateur savedAdmin = utilisateurRepository.save(admin);

            System.out.println("🎯 Admin initialisé avec succès:");
            System.out.println("   📧 Email: " + savedAdmin.getEmail());
            System.out.println("   🔑 Mot de passe: " + adminPassword);
            System.out.println("   👤 Nom: " + savedAdmin.getNom() + " " + savedAdmin.getPrenom());
            System.out.println("   🏷️ Rôle: " + savedAdmin.getRole());
            System.out.println("   ⚠️  CHANGEZ CE MOT DE PASSE EN PRODUCTION !");

        } catch (Exception e) {
            System.err.println("❌ Erreur lors de l'initialisation de l'admin: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
