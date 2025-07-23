package com.dira.diravenir1.service;

import com.dira.diravenir1.dto.ConseillerDTO;

import java.util.List;

public interface ConseillerService {
    List<ConseillerDTO> getAll();
    ConseillerDTO create(ConseillerDTO conseillerDTO);
    ConseillerDTO getById(Long id);
    ConseillerDTO update(Long id, ConseillerDTO conseillerDTO);
    void deleteById(Long id);
}
