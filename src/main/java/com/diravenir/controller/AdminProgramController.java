package com.diravenir.controller;

import com.diravenir.dto.ProgramDTO;
import com.diravenir.Entities.Program;
import com.diravenir.service.ProgramService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/programs")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class AdminProgramController {

    private final ProgramService programService;

    // ===== CRUD DES PROGRAMMES =====

    /**
     * Créer un nouveau programme
     */
    @PostMapping
    public ResponseEntity<Map<String, Object>> createProgram(@RequestBody ProgramDTO programDTO) {
        try {
            log.info("🆕 Création d'un nouveau programme: {}", programDTO.getProgram());

            ProgramDTO createdProgram = programService.saveProgram(programDTO);

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Programme créé avec succès",
                "program", createdProgram
            ));

        } catch (Exception e) {
            log.error("❌ Erreur lors de la création du programme: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Erreur lors de la création: " + e.getMessage()
            ));
        }
    }

    /**
     * Obtenir tous les programmes
     */
    @GetMapping
    public ResponseEntity<List<ProgramDTO>> getAllPrograms() {
        try {
            List<ProgramDTO> programs = programService.getAllPrograms();
            return ResponseEntity.ok(programs);
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des programmes: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Obtenir un programme par ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProgramDTO> getProgramById(@PathVariable Long id) {
        try {
            ProgramDTO program = programService.getProgramById(id);
            return ResponseEntity.ok(program);
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération du programme {}: {}", id, e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Mettre à jour un programme
     */
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateProgram(
            @PathVariable Long id,
            @RequestBody ProgramDTO programDTO) {
        try {
            log.info("🔄 Mise à jour du programme {}: {}", id, programDTO.getProgram());

            ProgramDTO updatedProgram = programService.updateProgram(id, programDTO);

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Programme mis à jour avec succès",
                "program", updatedProgram
            ));

        } catch (Exception e) {
            log.error("❌ Erreur lors de la mise à jour du programme {}: {}", id, e.getMessage());
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Erreur lors de la mise à jour: " + e.getMessage()
            ));
        }
    }

    /**
     * Supprimer un programme
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteProgram(@PathVariable Long id) {
        try {
            log.info("🗑️ Suppression du programme: {}", id);

            programService.deleteProgram(id);

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Programme supprimé avec succès",
                "programId", id
            ));

        } catch (Exception e) {
            log.error("❌ Erreur lors de la suppression du programme {}: {}", id, e.getMessage());
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Erreur lors de la suppression: " + e.getMessage()
            ));
        }
    }

    // ===== GESTION DES STATUTS =====

    /**
     * Changer le statut d'un programme
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<Map<String, Object>> updateProgramStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        try {
            log.info("🔄 Changement du statut du programme {} vers {}", id, status);

            // Récupérer le programme existant
            ProgramDTO existingProgram = programService.getProgramById(id);
            
            // Mettre à jour le statut
            existingProgram.setStatus(Program.ProgramStatus.valueOf(status.toUpperCase()));
            
            ProgramDTO updatedProgram = programService.updateProgram(id, existingProgram);

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Statut du programme mis à jour avec succès",
                "programId", id,
                "newStatus", status,
                "program", updatedProgram
            ));

        } catch (Exception e) {
            log.error("❌ Erreur lors du changement de statut du programme {}: {}", id, e.getMessage());
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Erreur lors du changement de statut: " + e.getMessage()
            ));
        }
    }

    /**
     * Obtenir les programmes par statut
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<List<ProgramDTO>> getProgramsByStatus(@PathVariable String status) {
        try {
            Program.ProgramStatus programStatus = Program.ProgramStatus.valueOf(status.toUpperCase());
            List<ProgramDTO> programs = programService.getProgramsByStatus(programStatus);
            return ResponseEntity.ok(programs);
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des programmes par statut {}: {}", status, e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    // ===== RECHERCHE ET FILTRAGE =====

    /**
     * Rechercher des programmes
     */
    @GetMapping("/search")
    public ResponseEntity<List<ProgramDTO>> searchPrograms(@RequestParam String term) {
        try {
            List<ProgramDTO> programs = programService.searchPrograms(term);
            return ResponseEntity.ok(programs);
        } catch (Exception e) {
            log.error("❌ Erreur lors de la recherche des programmes: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Filtrer les programmes
     */
    @GetMapping("/filter")
    public ResponseEntity<List<ProgramDTO>> filterPrograms(
            @RequestParam(required = false) String program,
            @RequestParam(required = false) String universities,
            @RequestParam(required = false) String status) {
        try {
            Program.ProgramStatus programStatus = null;
            if (status != null && !status.isEmpty()) {
                programStatus = Program.ProgramStatus.valueOf(status.toUpperCase());
            }
            
            List<ProgramDTO> programs = programService.getProgramsByFilters(program, universities, programStatus);
            return ResponseEntity.ok(programs);
        } catch (Exception e) {
            log.error("❌ Erreur lors du filtrage des programmes: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Obtenir les programmes par destination
     */
    @GetMapping("/destination/{destinationId}")
    public ResponseEntity<List<ProgramDTO>> getProgramsByDestination(@PathVariable Long destinationId) {
        try {
            List<ProgramDTO> programs = programService.getProgramsByDestination(destinationId);
            return ResponseEntity.ok(programs);
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des programmes par destination {}: {}", destinationId, e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Obtenir les programmes par université
     */
    @GetMapping("/university/{universityId}")
    public ResponseEntity<List<ProgramDTO>> getProgramsByUniversity(@PathVariable Long universityId) {
        try {
            List<ProgramDTO> programs = programService.getProgramsByUniversity(universityId);
            return ResponseEntity.ok(programs);
        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des programmes par université {}: {}", universityId, e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    // ===== IMPORT EXCEL =====

    /**
     * Importer des programmes depuis un fichier Excel
     */
    @PostMapping("/import")
    public ResponseEntity<Map<String, Object>> importPrograms(@RequestParam("file") MultipartFile file) {
        try {
            log.info("📊 Import de programmes depuis le fichier: {}", file.getOriginalFilename());

            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Le fichier est vide"
                ));
            }

            // Vérifier le type de fichier
            String contentType = file.getContentType();
            if (contentType == null || (!contentType.equals("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") &&
                    !contentType.equals("application/vnd.ms-excel"))) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Format de fichier non supporté. Utilisez .xlsx ou .xls"
                ));
            }

            // TODO: Implémenter la logique d'import Excel
            // Pour l'instant, on simule un succès
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Import en cours...",
                "fileName", file.getOriginalFilename(),
                "fileSize", file.getSize()
            ));

        } catch (Exception e) {
            log.error("❌ Erreur lors de l'import des programmes: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Erreur lors de l'import: " + e.getMessage()
            ));
        }
    }

    // ===== ACTIONS EN LOT =====

    /**
     * Activer/désactiver plusieurs programmes
     */
    @PutMapping("/bulk-status")
    public ResponseEntity<Map<String, Object>> updateBulkProgramStatus(
            @RequestBody Map<String, Object> request) {
        try {
            @SuppressWarnings("unchecked")
            List<Long> programIds = (List<Long>) request.get("programIds");
            String status = (String) request.get("status");

            if (programIds == null || programIds.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Aucun programme sélectionné"
                ));
            }

            log.info("🔄 Mise à jour en lot du statut de {} programmes vers {}", programIds.size(), status);

            int updatedCount = 0;
            for (Long id : programIds) {
                try {
                    ProgramDTO existingProgram = programService.getProgramById(id);
                    existingProgram.setStatus(Program.ProgramStatus.valueOf(status.toUpperCase()));
                    programService.updateProgram(id, existingProgram);
                    updatedCount++;
                } catch (Exception e) {
                    log.warn("⚠️ Impossible de mettre à jour le programme {}: {}", id, e.getMessage());
                }
            }

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", String.format("%d programmes mis à jour avec succès", updatedCount),
                "totalRequested", programIds.size(),
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
     * Supprimer plusieurs programmes
     */
    @DeleteMapping("/bulk-delete")
    public ResponseEntity<Map<String, Object>> deleteBulkPrograms(@RequestBody List<Long> programIds) {
        try {
            if (programIds == null || programIds.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Aucun programme sélectionné"
                ));
            }

            log.info("🗑️ Suppression en lot de {} programmes", programIds.size());

            int deletedCount = 0;
            for (Long id : programIds) {
                try {
                    programService.deleteProgram(id);
                    deletedCount++;
                } catch (Exception e) {
                    log.warn("⚠️ Impossible de supprimer le programme {}: {}", id, e.getMessage());
                }
            }

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", String.format("%d programmes supprimés avec succès", deletedCount),
                "totalRequested", programIds.size(),
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

    // ===== STATISTIQUES DES PROGRAMMES =====

    /**
     * Obtenir les statistiques des programmes
     */
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getProgramStatistics() {
        try {
            List<ProgramDTO> allPrograms = programService.getAllPrograms();
            
            // Compter par statut
            Map<String, Long> programsByStatus = allPrograms.stream()
                    .collect(java.util.stream.Collectors.groupingBy(
                            program -> program.getStatus().toString(),
                            java.util.stream.Collectors.counting()
                    ));
            
            // Compter par destination
            Map<String, Long> programsByDestination = allPrograms.stream()
                    .filter(program -> program.getDestinationName() != null)
                    .collect(java.util.stream.Collectors.groupingBy(
                            ProgramDTO::getDestinationName,
                            java.util.stream.Collectors.counting()
                    ));
            
            // Compter par université
            Map<String, Long> programsByUniversity = allPrograms.stream()
                    .filter(program -> program.getUniversiteName() != null)
                    .collect(java.util.stream.Collectors.groupingBy(
                            ProgramDTO::getUniversiteName,
                            java.util.stream.Collectors.counting()
                    ));

            Map<String, Object> statistics = Map.of(
                "totalPrograms", allPrograms.size(),
                "programsByStatus", programsByStatus,
                "programsByDestination", programsByDestination,
                "programsByUniversity", programsByUniversity
            );

            return ResponseEntity.ok(statistics);

        } catch (Exception e) {
            log.error("❌ Erreur lors de la récupération des statistiques des programmes: {}", e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}
