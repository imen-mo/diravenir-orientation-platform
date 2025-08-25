package com.dira.diravenir1.service;

import com.dira.diravenir1.Entities.EmailVerificationToken;
import com.dira.diravenir1.Entities.Utilisateur;
import com.dira.diravenir1.Repository.EmailVerificationTokenRepository;
import com.dira.diravenir1.Repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EmailVerificationService {

    private final EmailVerificationTokenRepository tokenRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final EmailService emailService;

    @Value("${app.email.verification.expiration:24}")
    private int expirationHours;

    /**
     * Génère et envoie un token de vérification email
     */
    @Transactional
    public boolean generateAndSendVerificationEmail(Utilisateur utilisateur) {
        try {
            // Supprimer l'ancien token s'il existe
            tokenRepository.deleteByUtilisateurId(utilisateur.getId());

            // Créer un nouveau token sécurisé
            String token = UUID.randomUUID().toString();
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime expirationDate = now.plusHours(expirationHours);

            System.out.println("🔍 Génération du token: " + token);
            System.out.println("🔍 Heure de création: " + now);
            System.out.println("🔍 Expiration: " + expirationDate);
            System.out.println("🔍 Heures d'expiration configurées: " + expirationHours);
            System.out.println("🔍 Durée de vie: " + expirationHours + " heures");

            EmailVerificationToken verificationToken = EmailVerificationToken.builder()
                    .token(token)
                    .utilisateur(utilisateur)
                    .expirationDate(expirationDate)
                    .build();

            tokenRepository.save(verificationToken);
            System.out.println("🔍 Token sauvegardé avec ID: " + verificationToken.getId());

            // Envoyer l'email de vérification
            return emailService.sendVerificationEmail(utilisateur.getEmail(), utilisateur.getNom(), token);

        } catch (Exception e) {
            System.err.println("❌ Erreur lors de la génération du token de vérification: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }

    /**
     * Vérifie un token de vérification email
     */
    @Transactional
    public boolean verifyEmail(String token) {
        try {
            // Validation de sécurité
            if (token == null || token.trim().isEmpty()) {
                System.out.println("❌ Token de vérification vide ou null");
                return false;
            }
            
            // Nettoyer le token des caractères indésirables
            String cleanToken = token.trim();
            System.out.println("🔍 Vérification du token: " + cleanToken);
            
            EmailVerificationToken verificationToken = tokenRepository.findByToken(cleanToken)
                    .orElse(null);

            if (verificationToken == null) {
                System.out.println("❌ Token de vérification non trouvé: " + cleanToken);
                return false;
            }

            System.out.println("🔍 Token trouvé: " + verificationToken.getToken());
            System.out.println("🔍 Expiration: " + verificationToken.getExpirationDate());
            System.out.println("🔍 Utilisé: " + verificationToken.isUsed());
            System.out.println("🔍 Valide: " + verificationToken.isValid());
            System.out.println("🔍 Heures restantes: " + java.time.Duration.between(LocalDateTime.now(), verificationToken.getExpirationDate()).toHours());

            if (verificationToken.isUsed()) {
                System.out.println("❌ Token de vérification déjà utilisé: " + cleanToken);
                System.out.println("ℹ️  Ce token a déjà été utilisé pour activer le compte: " + verificationToken.getUtilisateur().getEmail());
                return false;
            }
            
            if (verificationToken.isExpired()) {
                System.out.println("❌ Token de vérification expiré: " + cleanToken);
                System.out.println("ℹ️  Expiration: " + verificationToken.getExpirationDate());
                return false;
            }

            // Marquer le token comme utilisé
            verificationToken.setUsed(true);
            tokenRepository.save(verificationToken);

            // Activer le compte utilisateur
            Utilisateur utilisateur = verificationToken.getUtilisateur();
            utilisateur.setCompteActif(true);
            utilisateurRepository.save(utilisateur);

            System.out.println("✅ Email vérifié avec succès pour: " + utilisateur.getEmail());
            return true;

        } catch (Exception e) {
            System.err.println("❌ Erreur lors de la vérification email: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }

    /**
     * Renvoie un email de vérification
     */
    @Transactional
    public boolean resendVerificationEmail(String email) {
        try {
            Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
                    .orElse(null);

            if (utilisateur == null) {
                System.out.println("❌ Utilisateur non trouvé pour le renvoi: " + email);
                return false;
            }

            if (utilisateur.isCompteActif()) {
                System.out.println("✅ Compte déjà vérifié pour: " + utilisateur);
                return true;
            }

            return generateAndSendVerificationEmail(utilisateur);

        } catch (Exception e) {
            System.err.println("❌ Erreur lors du renvoi de l'email de vérification: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }

    /**
     * Nettoyage automatique des tokens expirés (toutes les 6 heures)
     */
    @Scheduled(fixedRate = 21600000, initialDelay = 300000) // 6 heures, démarrage après 5 minutes
    @Transactional
    public void cleanupExpiredTokens() {
        try {
            LocalDateTime now = LocalDateTime.now();
            tokenRepository.deleteExpiredTokens(now);
            System.out.println("🧹 Nettoyage des tokens de vérification expirés effectué");
        } catch (Exception e) {
            System.err.println("❌ Erreur lors du nettoyage des tokens expirés: " + e.getMessage());
            // Log détaillé pour le débogage
            if (e.getMessage() != null && e.getMessage().contains("Executing an update/delete query")) {
                System.out.println("ℹ️  Cette erreur est normale au démarrage, le nettoyage reprendra automatiquement");
            }
        }
    }
}
