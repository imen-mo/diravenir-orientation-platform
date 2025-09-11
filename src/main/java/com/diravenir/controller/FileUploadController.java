package com.diravenir.controller;
import com.diravenir.service.AntivirusScanService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
public class FileUploadController {

    private final AntivirusScanService antivirusScanService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile multipartFile) {
        try {
            // Étape 1 : Convertir MultipartFile → File temporaire
            File tempFile = File.createTempFile("upload_", "_" + multipartFile.getOriginalFilename());
            multipartFile.transferTo(tempFile);

            // Étape 2 : Scanner avec ClamAV
            boolean isClean = antivirusScanService.isFileClean(tempFile);

            // Supprimer le fichier temporaire
            tempFile.delete();

            if (!isClean) {
                return ResponseEntity.badRequest().body("Fichier infecté par un virus !");
            }

            // Si clean : tu peux enregistrer le fichier ou autre traitement ici
            return ResponseEntity.ok("Fichier uploadé avec succès (et sain)");

        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Erreur lors du traitement du fichier.");
        }
    }
}
