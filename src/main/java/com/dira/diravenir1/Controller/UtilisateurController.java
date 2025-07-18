package com.dira.diravenir1.Controller;

import com.dira.diravenir1.dto.UtilisateurDTO;
import com.dira.diravenir1.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/utilisateurs")
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    @GetMapping
    public List<UtilisateurDTO> getAll() {
        return utilisateurService.getAll();
    }

    @PostMapping
    public UtilisateurDTO create(@RequestBody UtilisateurDTO utilisateurDTO) {
        return utilisateurService.create(utilisateurDTO);
    }
}
