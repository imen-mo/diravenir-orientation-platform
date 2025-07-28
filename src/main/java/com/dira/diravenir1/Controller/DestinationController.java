package com.dira.diravenir1.Controller;

import com.dira.diravenir1.dto.DestinationDTO;
import com.dira.diravenir1.service.DestinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/destinations")
@CrossOrigin(origins = "*")
public class DestinationController {
    @Autowired
    private DestinationService destinationService;

    @PostMapping
    public DestinationDTO create(@RequestBody DestinationDTO dto) {
        return destinationService.createDestination(dto);
    }

    @GetMapping
    public List<DestinationDTO> getAll() {
        return destinationService.getAllDestinations();
    }

    @GetMapping("/{id}")
    public DestinationDTO getById(@PathVariable Long id) {
        return destinationService.getDestinationById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        destinationService.deleteDestination(id);
    }
} 