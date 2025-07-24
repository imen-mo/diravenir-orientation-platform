package com.dira.diravenir1.Controller;


import com.dira.diravenir1.dto.DocumentDTO;
import com.dira.diravenir1.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "*")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @PostMapping
    public DocumentDTO create(@RequestBody DocumentDTO dto) {
        return documentService.save(dto);
    }

    @GetMapping
    public List<DocumentDTO> getAll() {
        return documentService.getAll();
    }

    @GetMapping("/{id}")
    public DocumentDTO getById(@PathVariable Long id) {
        return documentService.getById(id);
    }


    @PutMapping("/{id}")
    public DocumentDTO updateDocument(@PathVariable Long id, @RequestBody DocumentDTO dto) {
        return documentService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        documentService.delete(id);
    }
}
