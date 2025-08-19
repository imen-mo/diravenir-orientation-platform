package com.dira.diravenir1.Controller;

import com.dira.diravenir1.dto.PersonalInfoDTO;
import com.dira.diravenir1.service.PersonalInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/personal-info")
@RequiredArgsConstructor
public class PersonalInfoController {

    private final PersonalInfoService personalInfoService;

    @PostMapping("/save")
    public ResponseEntity<String> savePersonalInfo(@RequestBody PersonalInfoDTO personalInfo) {
        try {
            boolean success = personalInfoService.savePersonalInfo(personalInfo);
            if (success) {
                return ResponseEntity.ok("Informations personnelles sauvegardées avec succès");
            } else {
                return ResponseEntity.badRequest().body("Erreur lors de la sauvegarde");
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Erreur serveur: " + e.getMessage());
        }
    }

    @GetMapping("/{email}")
    public ResponseEntity<PersonalInfoDTO> getPersonalInfoByEmail(@PathVariable String email) {
        try {
            PersonalInfoDTO personalInfo = personalInfoService.getPersonalInfoByEmail(email);
            if (personalInfo != null) {
                return ResponseEntity.ok(personalInfo);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
