package com.dira.diravenir1.Controller;

import com.dira.diravenir1.service.IdealProfileMigrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/migration")
@CrossOrigin(origins = "*")
public class IdealProfileMigrationController {
    
    @Autowired
    private IdealProfileMigrationService migrationService;
    
    /**
     * Déclenche la migration de tous les profils idéaux
     */
    @PostMapping("/migrate")
    public ResponseEntity<Map<String, Object>> migrateAllProfiles() {
        try {
            migrationService.migrateAllIdealProfiles();
            Map<String, Object> status = migrationService.getMigrationStatus();
            return ResponseEntity.ok(status);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Erreur lors de la migration: " + e.getMessage()));
        }
    }
    
    /**
     * Vérifie le statut de la migration
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getMigrationStatus() {
        try {
            Map<String, Object> status = migrationService.getMigrationStatus();
            return ResponseEntity.ok(status);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Erreur lors de la vérification: " + e.getMessage()));
        }
    }
    
    /**
     * Nettoie tous les profils idéaux (pour les tests)
     */
    @DeleteMapping("/clear")
    public ResponseEntity<Map<String, String>> clearAllProfiles() {
        try {
            migrationService.clearAllIdealProfiles();
            return ResponseEntity.ok(Map.of("message", "Tous les profils idéaux ont été supprimés"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(Map.of("error", "Erreur lors du nettoyage: " + e.getMessage()));
        }
    }
}
