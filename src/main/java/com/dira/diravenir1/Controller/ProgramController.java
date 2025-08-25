package com.dira.diravenir1.Controller;

import com.dira.diravenir1.dto.ProgramDTO;
import com.dira.diravenir1.dto.PaginatedProgramsResponse;
import com.dira.diravenir1.Entities.Program;
import com.dira.diravenir1.service.ProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/programs")
@CrossOrigin(origins = "*")
public class ProgramController {

    @Autowired
    private ProgramService programService;

    @PostMapping
    public ResponseEntity<ProgramDTO> createProgram(@RequestBody ProgramDTO programDTO) {
        ProgramDTO createdProgram = programService.saveProgram(programDTO);
        return ResponseEntity.ok(createdProgram);
    }

    @GetMapping
    public ResponseEntity<List<ProgramDTO>> getAllPrograms() {
        List<ProgramDTO> programs = programService.getAllPrograms();
        return ResponseEntity.ok(programs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProgramDTO> getProgramById(@PathVariable Long id) {
        ProgramDTO program = programService.getProgramById(id);
        return ResponseEntity.ok(program);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProgramDTO> updateProgram(@PathVariable Long id, @RequestBody ProgramDTO programDTO) {
        ProgramDTO updatedProgram = programService.updateProgram(id, programDTO);
        return ResponseEntity.ok(updatedProgram);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProgram(@PathVariable Long id) {
        programService.deleteProgram(id);
        return ResponseEntity.noContent().build();
    }

    // Endpoints de recherche
    @GetMapping("/status/{status}")
    public ResponseEntity<List<ProgramDTO>> getProgramsByStatus(@PathVariable Program.ProgramStatus status) {
        List<ProgramDTO> programs = programService.getProgramsByStatus(status);
        return ResponseEntity.ok(programs);
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProgramDTO>> searchPrograms(@RequestParam String q) {
        List<ProgramDTO> programs = programService.searchPrograms(q);
        return ResponseEntity.ok(programs);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<ProgramDTO>> getProgramsByFilters(
            @RequestParam(required = false) String searchTerm,
            @RequestParam(required = false) String country,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Program.ProgramStatus status,
            @RequestParam(required = false) String sortBy,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        List<ProgramDTO> programs = programService.getProgramsByAdvancedFilters(
            searchTerm, country, category, status, sortBy, page, size);
        return ResponseEntity.ok(programs);
    }

    @GetMapping("/filter/paginated")
    public ResponseEntity<PaginatedProgramsResponse> getProgramsByFiltersPaginated(
            @RequestParam(required = false) String searchTerm,
            @RequestParam(required = false) String country,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Program.ProgramStatus status,
            @RequestParam(required = false) String sortBy,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        PaginatedProgramsResponse response = programService.getProgramsByAdvancedFiltersPaginated(
            searchTerm, country, category, status, sortBy, page, size);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/destination/{destinationId}")
    public ResponseEntity<List<ProgramDTO>> getProgramsByDestination(@PathVariable Long destinationId) {
        List<ProgramDTO> programs = programService.getProgramsByDestination(destinationId);
        return ResponseEntity.ok(programs);
    }

    @GetMapping("/university/{universityId}")
    public ResponseEntity<List<ProgramDTO>> getProgramsByUniversity(@PathVariable Long universityId) {
        List<ProgramDTO> programs = programService.getProgramsByUniversity(universityId);
        return ResponseEntity.ok(programs);
    }

    // Endpoint pour récupérer les filtres disponibles
    @GetMapping("/filters/available")
    public ResponseEntity<Map<String, List<String>>> getAvailableFilters() {
        Map<String, List<String>> filters = programService.getAvailableFilters();
        return ResponseEntity.ok(filters);
    }
} 