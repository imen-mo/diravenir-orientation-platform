package com.dira.diravenir1.service;


import com.dira.diravenir1.dto.DocumentDTO;
import java.util.List;

public interface DocumentService {
    DocumentDTO save(DocumentDTO documentDTO);
    List<DocumentDTO> getAll();
    DocumentDTO getById(Long id);
    void delete(Long id);
    DocumentDTO update(Long id, DocumentDTO dto);
}
