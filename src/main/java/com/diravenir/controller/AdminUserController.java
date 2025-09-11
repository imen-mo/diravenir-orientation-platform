package com.diravenir.controller;

import com.diravenir.dto.UtilisateurDTO;
import com.diravenir.Entities.Role;
import com.diravenir.service.UtilisateurService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class AdminUserController {

    private final UtilisateurService utilisateurService;

    // ===== CRUD DES UTILISATEURS =====

    /**
     * Créer un nouvel utilisateur
     */
    @PostMapping
    public ResponseEntity<Map<String, Object>> createUser(@RequestBody UtilisateurDTO utilisateurDTO) {
        try {
            log.info("🆕 Création d'un nouvel utilisateur: {}", utilisateurDTO.getEmail());

            UtilisateurDTO createdUser = utilisateurService.create(utilisateurDTO);

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Utilisateur créé avec succès",
                "user", createdUser
            ));

        } catch (Exception e) {
            log.error("❌ Erreur lors de la création de l'utilisateur: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Erreur lors de la création: " + e.getMessage()
            ));
        }
    }

    /**
     * Obtenir tous les utilisateurs
     */
    @GetMapping
    public ResponseEntity<List<UtilisateurDTO>> getAllUsers() {
        try {
            List<UtilisateurDTO> users = utilisateurService.getAll();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des utilisateurs: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Obtenir un utilisateur par ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<UtilisateurDTO> getUserById(@PathVariable Long id) {
        try {
            UtilisateurDTO user = utilisateurService.getById(id);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération de l'utilisateur {}: {}", id, e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Mettre à jour un utilisateur
     */
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateUser(
            @PathVariable Long id,
            @RequestBody UtilisateurDTO utilisateurDTO) {
        try {
            log.info("🔄 Mise à jour de l'utilisateur {}: {}", id, utilisateurDTO.getEmail());

            UtilisateurDTO updatedUser = utilisateurService.update(id, utilisateurDTO);

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Utilisateur mis à jour avec succès",
                "user", updatedUser
            ));

        } catch (Exception e) {
            log.error("❌ Erreur lors de la mise à jour de l'utilisateur {}: {}", id, e.getMessage());
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Erreur lors de la mise à jour: " + e.getMessage()
            ));
        }
    }

    /**
     * Supprimer un utilisateur
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteUser(@PathVariable Long id) {
        try {
            log.info("🗑️ Suppression de l'utilisateur: {}", id);

            utilisateurService.delete(id);

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Utilisateur supprimé avec succès",
                "userId", id
            ));

        } catch (Exception e) {
            log.error("❌ Erreur lors de la suppression de l'utilisateur {}: {}", id, e.getMessage());
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Erreur lors de la suppression: " + e.getMessage()
            ));
        }
    }

    // ===== GESTION DES RÔLES =====

    /**
     * Changer le rôle d'un utilisateur
     */
    @PutMapping("/{id}/role")
    public ResponseEntity<Map<String, Object>> updateUserRole(
            @PathVariable Long id,
            @RequestParam String role) {
        try {
            log.info("🔄 Changement du rôle de l'utilisateur {} vers {}", id, role);

            UtilisateurDTO existingUser = utilisateurService.getById(id);
            // Convertir le String en enum Role
            Role userRole = Role.valueOf(role.toUpperCase());
            existingUser.setRole(userRole);
            
            UtilisateurDTO updatedUser = utilisateurService.update(id, existingUser);

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Rôle de l'utilisateur mis à jour avec succès",
                "userId", id,
                "newRole", role,
                "user", updatedUser
            ));

        } catch (Exception e) {
            log.error("❌ Erreur lors du changement de rôle de l'utilisateur {}: {}", id, e.getMessage());
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Erreur lors du changement de rôle: " + e.getMessage()
            ));
        }
    }

    /**
     * Activer/désactiver un utilisateur
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<Map<String, Object>> updateUserStatus(
            @PathVariable Long id,
            @RequestParam boolean active) {
        try {
            log.info("🔄 Changement du statut de l'utilisateur {} vers {}", id, active ? "actif" : "inactif");

            UtilisateurDTO existingUser = utilisateurService.getById(id);
            existingUser.setCompteActif(active);
            
            UtilisateurDTO updatedUser = utilisateurService.update(id, existingUser);

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Statut de l'utilisateur mis à jour avec succès",
                "userId", id,
                "newStatus", active ? "actif" : "inactif",
                "user", updatedUser
            ));

        } catch (Exception e) {
            log.error("❌ Erreur lors du changement de statut de l'utilisateur {}: {}", id, e.getMessage());
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Erreur lors du changement de statut: " + e.getMessage()
            ));
        }
    }

    // ===== RECHERCHE ET FILTRAGE =====

    /**
     * Rechercher des utilisateurs
     */
    @GetMapping("/search")
    public ResponseEntity<List<UtilisateurDTO>> searchUsers(@RequestParam String term) {
        try {
            // TODO: Implémenter la recherche dans le service
            List<UtilisateurDTO> users = utilisateurService.getAll();
            // Filtrer par nom, prénom ou email
            List<UtilisateurDTO> filteredUsers = users.stream()
                .filter(user -> 
                    user.getNom() != null && user.getNom().toLowerCase().contains(term.toLowerCase()) ||
                    user.getPrenom() != null && user.getPrenom().toLowerCase().contains(term.toLowerCase()) ||
                    user.getEmail() != null && user.getEmail().toLowerCase().contains(term.toLowerCase())
                )
                .toList();
            return ResponseEntity.ok(filteredUsers);
        } catch (Exception e) {
            log.error("❌ Erreur lors de la recherche des utilisateurs: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Obtenir les utilisateurs par rôle
     */
    @GetMapping("/role/{role}")
    public ResponseEntity<List<UtilisateurDTO>> getUsersByRole(@PathVariable String role) {
        try {
            List<UtilisateurDTO> users = utilisateurService.getAll();
            List<UtilisateurDTO> filteredUsers = users.stream()
                .filter(user -> role.equalsIgnoreCase(user.getRole().toString()))
                .toList();
            return ResponseEntity.ok(filteredUsers);
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des utilisateurs par rôle {}: {}", role, e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Obtenir les utilisateurs actifs/inactifs
     */
    @GetMapping("/status/{active}")
    public ResponseEntity<List<UtilisateurDTO>> getUsersByStatus(@PathVariable boolean active) {
        try {
            List<UtilisateurDTO> users = utilisateurService.getAll();
            List<UtilisateurDTO> filteredUsers = users.stream()
                .filter(user -> active == user.isCompteActif())
                .toList();
            return ResponseEntity.ok(filteredUsers);
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des utilisateurs par statut {}: {}", active, e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    // ===== ACTIONS EN LOT =====

    /**
     * Activer/désactiver plusieurs utilisateurs
     */
    @PutMapping("/bulk-status")
    public ResponseEntity<Map<String, Object>> updateBulkUserStatus(
            @RequestBody Map<String, Object> request) {
        try {
            @SuppressWarnings("unchecked")
            List<Long> userIds = (List<Long>) request.get("userIds");
            Boolean active = (Boolean) request.get("active");

            if (userIds == null || userIds.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Aucun utilisateur sélectionné"
                ));
            }

            log.info("🔄 Mise à jour en lot du statut de {} utilisateurs vers {}", userIds.size(), active);

            int updatedCount = 0;
            for (Long id : userIds) {
                try {
                    UtilisateurDTO existingUser = utilisateurService.getById(id);
                    existingUser.setCompteActif(active);
                    utilisateurService.update(id, existingUser);
                    updatedCount++;
                } catch (Exception e) {
                    log.warn("⚠️ Impossible de mettre à jour l'utilisateur {}: {}", id, e.getMessage());
                }
            }

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", String.format("%d utilisateurs mis à jour avec succès", updatedCount),
                "totalRequested", userIds.size(),
                "updatedCount", updatedCount
            ));

        } catch (Exception e) {
            log.error("❌ Erreur lors de la mise à jour en lot: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Erreur lors de la mise à jour en lot: " + e.getMessage()
            ));
        }
    }

    /**
     * Supprimer plusieurs utilisateurs
     */
    @DeleteMapping("/bulk-delete")
    public ResponseEntity<Map<String, Object>> deleteBulkUsers(@RequestBody List<Long> userIds) {
        try {
            if (userIds == null || userIds.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Aucun utilisateur sélectionné"
                ));
            }

            log.info("🗑️ Suppression en lot de {} utilisateurs", userIds.size());

            int deletedCount = 0;
            for (Long id : userIds) {
                try {
                    utilisateurService.delete(id);
                    deletedCount++;
                } catch (Exception e) {
                    log.warn("⚠️ Impossible de supprimer l'utilisateur {}: {}", id, e.getMessage());
                }
            }

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", String.format("%d utilisateurs supprimés avec succès", deletedCount),
                "totalRequested", userIds.size(),
                "deletedCount", deletedCount
            ));

        } catch (Exception e) {
            log.error("❌ Erreur lors de la suppression en lot: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Erreur lors de la suppression en lot: " + e.getMessage()
            ));
        }
    }

    // ===== STATISTIQUES DES UTILISATEURS =====

    /**
     * Obtenir les statistiques des utilisateurs
     */
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getUserStatistics() {
        try {
            List<UtilisateurDTO> allUsers = utilisateurService.getAll();
            
            // Compter par rôle
            Map<String, Long> usersByRole = allUsers.stream()
                    .collect(java.util.stream.Collectors.groupingBy(
                            user -> user.getRole().toString(),
                            java.util.stream.Collectors.counting()
                    ));
            
            // Compter par statut
            long activeUsers = allUsers.stream()
                    .filter(UtilisateurDTO::isCompteActif)
                    .count();
            
            long inactiveUsers = allUsers.size() - activeUsers;

            Map<String, Object> statistics = Map.of(
                "totalUsers", allUsers.size(),
                "activeUsers", activeUsers,
                "inactiveUsers", inactiveUsers,
                "usersByRole", usersByRole
            );

            return ResponseEntity.ok(statistics);

        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des statistiques des utilisateurs: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}
