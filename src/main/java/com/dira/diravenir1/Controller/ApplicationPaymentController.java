package com.dira.diravenir1.Controller;

import com.dira.diravenir1.Entities.Application;
import com.dira.diravenir1.service.ApplicationPaymentService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://localhost:3005"})
@RequiredArgsConstructor
public class ApplicationPaymentController {

    private static final Logger log = LoggerFactory.getLogger(ApplicationPaymentController.class);

    private final ApplicationPaymentService paymentService;

    @PostMapping("/initiate")
    public ResponseEntity<?> initiatePayment(@RequestBody Map<String, Object> request) {
        try {
            log.info("🔄 Initiation du paiement pour l'application: {}", request.get("applicationId"));
            
            Map<String, Object> result = paymentService.initiatePayment(request);
            
            if ((Boolean) result.get("success")) {
                log.info("✅ Paiement initié avec succès pour l'application: {}", request.get("applicationId"));
                return ResponseEntity.ok(result);
            } else {
                log.warn("⚠️ Échec de l'initiation du paiement: {}", result.get("message"));
                return ResponseEntity.badRequest().body(result);
            }
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de l'initiation du paiement: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "message", "Erreur interne du serveur: " + e.getMessage()
            ));
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, Object> request) {
        try {
            log.info("🔍 Vérification du paiement pour l'application: {}", request.get("applicationId"));
            
            Map<String, Object> result = paymentService.verifyPayment(request);
            
            if ((Boolean) result.get("success")) {
                log.info("✅ Paiement vérifié avec succès pour l'application: {}", request.get("applicationId"));
                return ResponseEntity.ok(result);
            } else {
                log.warn("⚠️ Échec de la vérification du paiement: {}", result.get("message"));
                return ResponseEntity.badRequest().body(result);
            }
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la vérification du paiement: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "message", "Erreur interne du serveur: " + e.getMessage()
            ));
        }
    }

    @PostMapping("/webhook")
    public ResponseEntity<?> handleWebhook(@RequestBody Map<String, Object> webhookData) {
        try {
            log.info("📡 Webhook reçu: {}", webhookData);
            
            Map<String, Object> result = paymentService.processWebhook(webhookData);
            
            if ((Boolean) result.get("success")) {
                log.info("✅ Webhook traité avec succès");
                return ResponseEntity.ok(result);
            } else {
                log.warn("⚠️ Échec du traitement du webhook: {}", result.get("message"));
                return ResponseEntity.badRequest().body(result);
            }
            
        } catch (Exception e) {
            log.error("❌ Erreur lors du traitement du webhook: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "message", "Erreur interne du serveur: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/status/{applicationId}")
    public ResponseEntity<?> getPaymentStatus(@PathVariable String applicationId) {
        try {
            log.info("📊 Vérification du statut de paiement pour l'application: {}", applicationId);
            
            Map<String, Object> result = paymentService.getPaymentStatus(applicationId);
            
            if ((Boolean) result.get("success")) {
                log.info("✅ Statut de paiement récupéré pour l'application: {}", applicationId);
                return ResponseEntity.ok(result);
            } else {
                log.warn("⚠️ Échec de la récupération du statut: {}", result.get("message"));
                return ResponseEntity.badRequest().body(result);
            }
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération du statut: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "message", "Erreur interne du serveur: " + e.getMessage()
            ));
        }
    }

    @PostMapping("/refund")
    public ResponseEntity<?> processRefund(@RequestBody Map<String, Object> request) {
        try {
            log.info("💸 Traitement du remboursement pour l'application: {}", request.get("applicationId"));
            
            Map<String, Object> result = paymentService.processRefund(request);
            
            if ((Boolean) result.get("success")) {
                log.info("✅ Remboursement traité avec succès pour l'application: {}", request.get("applicationId"));
                return ResponseEntity.ok(result);
            } else {
                log.warn("⚠️ Échec du traitement du remboursement: {}", result.get("message"));
                return ResponseEntity.badRequest().body(result);
            }
            
        } catch (Exception e) {
            log.error("❌ Erreur lors du traitement du remboursement: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "message", "Erreur interne du serveur: " + e.getMessage()
            ));
        }
    }

    @PostMapping("/admin/approve")
    public ResponseEntity<?> approvePayment(@RequestBody Map<String, Object> request) {
        try {
            log.info("✅ Approbation du paiement par l'admin pour l'application: {}", request.get("applicationId"));
            
            Map<String, Object> result = paymentService.approvePayment(request);
            
            if ((Boolean) result.get("success")) {
                log.info("✅ Paiement approuvé avec succès par l'admin pour l'application: {}", request.get("applicationId"));
                return ResponseEntity.ok(result);
            } else {
                log.warn("⚠️ Échec de l'approbation du paiement: {}", result.get("message"));
                return ResponseEntity.badRequest().body(result);
            }
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de l'approbation du paiement: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "message", "Erreur interne du serveur: " + e.getMessage()
            ));
        }
    }

    @PostMapping("/admin/reject")
    public ResponseEntity<?> rejectPayment(@RequestBody Map<String, Object> request) {
        try {
            log.info("❌ Rejet du paiement par l'admin pour l'application: {}", request.get("applicationId"));
            
            Map<String, Object> result = paymentService.rejectPayment(request);
            
            if ((Boolean) result.get("success")) {
                log.info("✅ Paiement rejeté avec succès par l'admin pour l'application: {}", request.get("applicationId"));
                return ResponseEntity.ok(result);
            } else {
                log.warn("⚠️ Échec du rejet du paiement: {}", result.get("message"));
                return ResponseEntity.badRequest().body(result);
            }
            
        } catch (Exception e) {
            log.error("❌ Erreur lors du rejet du paiement: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "message", "Erreur interne du serveur: " + e.getMessage()
            ));
        }
    }

    @GetMapping("/admin/all")
    public ResponseEntity<?> getAllPayments() {
        try {
            log.info("📋 Récupération de tous les paiements par l'admin");
            
            Map<String, Object> result = paymentService.getAllPayments();
            
            if ((Boolean) result.get("success")) {
                log.info("✅ Tous les paiements récupérés avec succès");
                return ResponseEntity.ok(result);
            } else {
                log.warn("⚠️ Échec de la récupération des paiements: {}", result.get("message"));
                return ResponseEntity.badRequest().body(result);
            }
            
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des paiements: {}", e.getMessage(), e);
            return ResponseEntity.internalServerError().body(Map.of(
                "success", false,
                "message", "Erreur interne du serveur: " + e.getMessage()
            ));
        }
    }
}
