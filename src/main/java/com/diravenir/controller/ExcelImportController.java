package com.diravenir.controller;

import com.diravenir.service.ExcelImportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/excel")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class ExcelImportController {

    private final ExcelImportService excelImportService;

    /**
     * Importer des programmes depuis un fichier Excel
     */
    @PostMapping("/import/programs")
    public ResponseEntity<Map<String, Object>> importPrograms(@RequestParam("file") MultipartFile file) {
        try {
            log.info("Début import programmes depuis Excel: {}", file.getOriginalFilename());
            
            // Vérifier que le fichier n'est pas vide
            if (file.isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(Map.of(
                        "success", false,
                        "error", "Le fichier est vide"
                    ));
            }

            // Vérifier la taille du fichier (max 10MB)
            if (file.getSize() > 10 * 1024 * 1024) {
                return ResponseEntity.badRequest()
                    .body(Map.of(
                        "success", false,
                        "error", "Le fichier est trop volumineux (max 10MB)"
                    ));
            }

            // Importer les programmes
            Map<String, Object> result = excelImportService.importProgramsFromExcel(file);
            
            log.info("Import terminé: {}", result);
            
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            log.error("Erreur lors de l'import Excel", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of(
                    "success", false,
                    "error", "Erreur lors de l'import: " + e.getMessage()
                ));
        }
    }

    /**
     * Télécharger le template Excel
     */
    @GetMapping("/template/programs")
    public ResponseEntity<byte[]> downloadTemplate() {
        try {
            log.info("Génération du template Excel");
            
            byte[] template = excelImportService.generateTemplate();
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", "template_programmes.xlsx");
            headers.setContentLength(template.length);
            
            log.info("Template généré avec succès");
            
            return new ResponseEntity<>(template, headers, HttpStatus.OK);

        } catch (Exception e) {
            log.error("Erreur génération template", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Vérifier la validité d'un fichier Excel avant import
     */
    @PostMapping("/validate/programs")
    public ResponseEntity<Map<String, Object>> validateFile(@RequestParam("file") MultipartFile file) {
        try {
            log.info("Validation du fichier Excel: {}", file.getOriginalFilename());
            
            Map<String, Object> validation = Map.of(
                "valid", !file.isEmpty() && file.getSize() <= 10 * 1024 * 1024,
                "size", file.getSize(),
                "filename", file.getOriginalFilename(),
                "contentType", file.getContentType()
            );
            
            return ResponseEntity.ok(validation);

        } catch (Exception e) {
            log.error("Erreur validation fichier", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Erreur lors de la validation"));
        }
    }
}
