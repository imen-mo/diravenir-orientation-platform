package com.diravenir.service;

import com.diravenir.Entities.PasswordResetToken;
import com.diravenir.Entities.Utilisateur;
import com.diravenir.repository.PasswordResetTokenRepository;
import com.diravenir.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PasswordResetService {

    private final PasswordResetTokenRepository tokenRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.password.reset.expiration:1}")
    private int expirationHours;

    /**
     * Génère et envoie un token de réinitialisation de mot de passe
     */
    @Transactional
    public boolean generateAndSendResetEmail(String email) {
        try {
            // Vérifier si l'utilisateur existe
            Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
                    .orElse(null);

            if (utilisateur == null) {
                System.out.println("❌ Utilisateur non trouvé pour la réinitialisation: " + email);
                return false;
            }

            // Supprimer l'ancien token s'il existe
            tokenRepository.deleteByUtilisateurId(utilisateur.getId());

            // Créer un nouveau token
            String token = UUID.randomUUID().toString();
            LocalDateTime expirationDate = LocalDateTime.now().plusHours(expirationHours);

            PasswordResetToken resetToken = PasswordResetToken.builder()
                    .token(token)
                    .utilisateur(utilisateur)
                    .expiryDate(expirationDate)
                    .build();

            tokenRepository.save(resetToken);

            // Envoyer l'email de réinitialisation
            emailService.sendPasswordResetEmail(utilisateur.getEmail(), utilisateur.getNom(), token);
            return true;

        } catch (Exception e) {
            System.err.println("❌ Erreur lors de la génération du token de réinitialisation: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }

    /**
     * Valide un token de réinitialisation de mot de passe
     */
    public boolean validateResetToken(String token) {
        try {
            PasswordResetToken resetToken = tokenRepository.findByToken(token)
                    .orElse(null);

            if (resetToken == null) {
                System.out.println("❌ Token de réinitialisation non trouvé: " + token);
                return false;
            }

            if (!resetToken.isValid()) {
                System.out.println("❌ Token de réinitialisation expiré ou déjà utilisé: " + token);
                return false;
            }

            return true;

        } catch (Exception e) {
            System.err.println("❌ Erreur lors de la validation du token: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }

    /**
     * Réinitialise le mot de passe avec un token valide
     */
    @Transactional
    public boolean resetPassword(String token, String newPassword) {
        try {
            PasswordResetToken resetToken = tokenRepository.findByToken(token)
                    .orElse(null);

            if (resetToken == null) {
                System.out.println("❌ Token de réinitialisation non trouvé: " + token);
                return false;
            }

            if (!resetToken.isValid()) {
                System.out.println("❌ Token de réinitialisation expiré ou déjà utilisé: " + token);
                return false;
            }

            // Marquer le token comme utilisé
            resetToken.setUsed(true);
            tokenRepository.save(resetToken);

            // Mettre à jour le mot de passe
            Utilisateur utilisateur = resetToken.getUtilisateur();
            utilisateur.setPassword(passwordEncoder.encode(newPassword));
            utilisateurRepository.save(utilisateur);

            System.out.println("✅ Mot de passe réinitialisé avec succès pour: " + utilisateur.getEmail());
            return true;

        } catch (Exception e) {
            System.err.println("❌ Erreur lors de la réinitialisation du mot de passe: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }

    /**
     * Nettoyage automatique des tokens expirés (toutes les heures)
     */
    @Scheduled(fixedRate = 3600000, initialDelay = 60000) // 1 heure, démarrage après 1 minute
    @Transactional
    public void cleanupExpiredTokens() {
        try {
            LocalDateTime now = LocalDateTime.now();
            tokenRepository.deleteExpiredTokens(now);
            
            System.out.println("🧹 Nettoyage des tokens de réinitialisation expirés effectué");
        } catch (Exception e) {
            System.err.println("❌ Erreur lors du nettoyage des tokens expirés: " + e.getMessage());
            // Log détaillé pour le débogage
            if (e.getMessage() != null && e.getMessage().contains("Executing an update/delete query")) {
                System.out.println("ℹ️  Cette erreur est normale au démarrage, le nettoyage reprendra automatiquement");
            }
        }
    }
}
