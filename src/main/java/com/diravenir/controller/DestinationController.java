package com.diravenir.controller;

import com.diravenir.dto.DestinationDTO;
import com.diravenir.service.DestinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/destinations")
@CrossOrigin(origins = "*")
public class DestinationController {

    @Autowired
    private DestinationService destinationService;

    @GetMapping
    public ResponseEntity<List<DestinationDTO>> getAllDestinations() {
        List<DestinationDTO> destinations = destinationService.getAllDestinations();
        return ResponseEntity.ok(destinations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DestinationDTO> getDestinationById(@PathVariable Long id) {
        DestinationDTO destination = destinationService.getDestinationById(id);
        if (destination != null) {
            return ResponseEntity.ok(destination);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/name/{nom}")
    public ResponseEntity<DestinationDTO> getDestinationByName(@PathVariable String nom) {
        DestinationDTO destination = destinationService.getDestinationByName(nom);
        if (destination != null) {
            return ResponseEntity.ok(destination);
        }
        return ResponseEntity.notFound().build();
    }
}
