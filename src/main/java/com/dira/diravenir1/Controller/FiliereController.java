package com.dira.diravenir1.Controller;

import com.dira.diravenir1.Entities.Filiere;
import com.dira.diravenir1.service.FiliereService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/filieres")
public class FiliereController {

    @Autowired
    private FiliereService filiereService;

    @PostMapping
    public Filiere createFiliere(@RequestBody Filiere filiere) {
        return filiereService.saveFiliere(filiere);
    }

    @GetMapping
    public List<Filiere> getAllFilieres() {
        return filiereService.getAllFilieres();
    }

}
