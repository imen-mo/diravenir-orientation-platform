package com.dira.diravenir1.Controller;

import com.dira.diravenir1.dto.TemoignageDTO;
import com.dira.diravenir1.service.TemoignageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/temoignages")
@CrossOrigin(origins = "*")
public class TemoignageController {
    @Autowired
    private TemoignageService temoignageService;

    @PostMapping
    public TemoignageDTO create(@RequestBody TemoignageDTO dto) {
        return temoignageService.createTemoignage(dto);
    }

    @GetMapping
    public List<TemoignageDTO> getAll() {
        return temoignageService.getAllTemoignages();
    }

    @GetMapping("/{id}")
    public TemoignageDTO getById(@PathVariable Long id) {
        return temoignageService.getTemoignageById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        temoignageService.deleteTemoignage(id);
    }
} 