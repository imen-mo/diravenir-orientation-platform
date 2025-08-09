

package com.dira.diravenir1.Controller;

import com.dira.diravenir1.dto.FiliereDTO;
import com.dira.diravenir1.service.FiliereService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/filieres")
@CrossOrigin(origins = "*")
public class FiliereController {

    @Autowired
    private FiliereService filiereService;

    @PostMapping
    public FiliereDTO create(@RequestBody FiliereDTO dto) {
        return filiereService.createFiliere(dto);
    }

    @GetMapping
    public List<FiliereDTO> getAll() {
        return filiereService.getAllFilieres();
    }

    @GetMapping("/{id}")
    public FiliereDTO getById(@PathVariable Long id) {
        return filiereService.getFiliereById(id);
    }

    @PutMapping("/{id}")
    public FiliereDTO update(@PathVariable Long id, @RequestBody FiliereDTO dto) {
        return filiereService.updateFiliere(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        filiereService.deleteFiliere(id);
    }
}