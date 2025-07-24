package com.dira.diravenir1.Controller;

import com.dira.diravenir1.dto.AdministrateurDTO;
import com.dira.diravenir1.service.AdministrateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/administrateurs")
public class AdministrateurController {

    @Autowired
    private AdministrateurService service;

    @GetMapping
    public List<AdministrateurDTO> getAll() {
        return service.getAllAdministrateurs();
    }

    @PostMapping
    public AdministrateurDTO create(@RequestBody AdministrateurDTO dto) {
        return service.createAdministrateur(dto);
    }

    @PutMapping("/{id}")
    public AdministrateurDTO update(@PathVariable Long id, @RequestBody AdministrateurDTO dto) {
        dto.setId(id);
        return service.updateAdministrateur(dto);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteAdministrateur(id);
    }

}