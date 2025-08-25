package com.dira.diravenir1.Controller;

import com.dira.diravenir1.service.EmailOTPService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/email-otp")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class EmailOTPController {
    
    private final EmailOTPService otpService;
    
    /**
     * Envoyer un code OTP par email
     */
    @PostMapping("/send")
    public ResponseEntity<Map<String, Object>> sendOTP(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            
            if (email == null || email.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", "Email requis"));
            }
            
            log.info("Demande d'envoi d'OTP pour l'email: {}", email);
            
            EmailOTPService.OTPResult result = otpService.sendOTP(email);
            
            if (result.isSuccess()) {
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", result.getMessage(),
                    "otpId", result.getOtpId()
                ));
            } else {
                return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", result.getMessage()));
            }
            
        } catch (Exception e) {
            log.error("Erreur lors de l'envoi de l'OTP: {}", e.getMessage());
            return ResponseEntity.internalServerError()
                .body(Map.of("success", false, "message", "Erreur interne du serveur"));
        }
    }
    
    /**
     * Vérifier un code OTP
     */
    @PostMapping("/verify")
    public ResponseEntity<Map<String, Object>> verifyOTP(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String otpCode = request.get("otpCode");
            
            if (email == null || email.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", "Email requis"));
            }
            
            if (otpCode == null || otpCode.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", "Code OTP requis"));
            }
            
            log.info("Vérification OTP pour l'email: {}", email);
            
            EmailOTPService.OTPVerificationResult result = otpService.verifyOTP(email, otpCode);
            
            if (result.isSuccess()) {
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", result.getMessage()
                ));
            } else {
                return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", result.getMessage()));
            }
            
        } catch (Exception e) {
            log.error("Erreur lors de la vérification de l'OTP: {}", e.getMessage());
            return ResponseEntity.internalServerError()
                .body(Map.of("success", false, "message", "Erreur interne du serveur"));
        }
    }
    
    /**
     * Régénérer un code OTP
     */
    @PostMapping("/resend")
    public ResponseEntity<Map<String, Object>> resendOTP(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            
            if (email == null || email.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", "Email requis"));
            }
            
            log.info("Demande de régénération d'OTP pour l'email: {}", email);
            
            EmailOTPService.OTPResult result = otpService.resendOTP(email);
            
            if (result.isSuccess()) {
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", result.getMessage(),
                    "otpId", result.getOtpId()
                ));
            } else {
                return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", result.getMessage()));
            }
            
        } catch (Exception e) {
            log.error("Erreur lors de la régénération de l'OTP: {}", e.getMessage());
            return ResponseEntity.internalServerError()
                .body(Map.of("success", false, "message", "Erreur interne du serveur"));
        }
    }
    
    /**
     * Vérifier si un email a été vérifié récemment
     */
    @GetMapping("/check-verification/{email}")
    public ResponseEntity<Map<String, Object>> checkEmailVerification(@PathVariable String email) {
        try {
            log.info("Vérification du statut de vérification pour l'email: {}", email);
            
            boolean isVerified = otpService.isEmailRecentlyVerified(email);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "email", email,
                "isVerified", isVerified
            ));
            
        } catch (Exception e) {
            log.error("Erreur lors de la vérification du statut: {}", e.getMessage());
            return ResponseEntity.internalServerError()
                .body(Map.of("success", false, "message", "Erreur interne du serveur"));
        }
    }
    
    /**
     * Endpoint de santé pour le service OTP
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        return ResponseEntity.ok(Map.of(
            "service", "EmailOTPService",
            "status", "UP",
            "timestamp", System.currentTimeMillis()
        ));
    }
}
