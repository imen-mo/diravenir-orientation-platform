package com.dira.diravenir1.Controller;

import com.dira.diravenir1.dto.PartenaireDTO;
import com.dira.diravenir1.service.PartenaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/partenaires")
@CrossOrigin(origins = "*")
public class PartenaireController {
    @Autowired
    private PartenaireService partenaireService;

    @PostMapping
    public PartenaireDTO create(@RequestBody PartenaireDTO dto) {
        return partenaireService.createPartenaire(dto);
    }

    @GetMapping
    public List<PartenaireDTO> getAll() {
        return partenaireService.getAllPartenaires();
    }

    @GetMapping("/{id}")
    public PartenaireDTO getById(@PathVariable Long id) {
        return partenaireService.getPartenaireById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        partenaireService.deletePartenaire(id);
    }
} 