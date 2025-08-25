package com.dira.diravenir1.Controller;

import com.dira.diravenir1.dto.UtilisateurDTO;
import com.dira.diravenir1.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/utilisateurs")
@CrossOrigin(origins = "*")
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    @GetMapping
    public ResponseEntity<List<UtilisateurDTO>> getAll() {
        try {
            List<UtilisateurDTO> utilisateurs = utilisateurService.getAll();
            return ResponseEntity.ok(utilisateurs);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<UtilisateurDTO> getById(@PathVariable Long id) {
        try {
            UtilisateurDTO utilisateur = utilisateurService.getById(id);
            return ResponseEntity.ok(utilisateur);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<UtilisateurDTO> create(@RequestBody UtilisateurDTO utilisateurDTO) {
        try {
            UtilisateurDTO created = utilisateurService.create(utilisateurDTO);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<UtilisateurDTO> update(@PathVariable Long id, @RequestBody UtilisateurDTO utilisateurDTO) {
        try {
            UtilisateurDTO updated = utilisateurService.update(id, utilisateurDTO);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            utilisateurService.delete(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UtilisateurDTO> findByEmail(@PathVariable String email) {
        try {
            UtilisateurDTO utilisateur = utilisateurService.findByEmail(email);
            if (utilisateur != null) {
                return ResponseEntity.ok(utilisateur);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
