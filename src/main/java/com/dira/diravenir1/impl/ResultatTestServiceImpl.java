package com.dira.diravenir1.impl;

import com.dira.diravenir1.Entities.ResultatTest;
import com.dira.diravenir1.dto.ResultatTestDTO;
import com.dira.diravenir1.service.ResultatTestService;
import com.dira.diravenir1.Repository.ResultatTestRepository;
import com.dira.diravenir1.Repository.TestRepository;
import com.dira.diravenir1.Repository.EtudiantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ResultatTestServiceImpl implements ResultatTestService {

    @Autowired
    private ResultatTestRepository resultatRepo;

    @Autowired
    private TestRepository testRepo;

    @Autowired
    private EtudiantRepository etudiantRepo;

    @Override
    public ResultatTestDTO enregistrerResultat(ResultatTestDTO dto) {
        ResultatTest res = new ResultatTest();
        res.setScore(dto.getScore());
        res.setProfilGénéré(dto.getProfilGénéré());

        res.setTest(testRepo.findById(dto.getTestId()).orElseThrow());
        res.setEtudiant(etudiantRepo.findById(dto.getEtudiantId()).orElseThrow());

        ResultatTest saved = resultatRepo.save(res);

        dto.setId(saved.getId());
        return dto;
    }

    @Override
    public List<ResultatTestDTO> getResultatsParEtudiant(Long etudiantId) {
        return resultatRepo.findByEtudiantId(etudiantId).stream().map(r -> {
            ResultatTestDTO dto = new ResultatTestDTO();
            dto.setId(r.getId());
            dto.setScore(r.getScore());
            dto.setProfilGénéré(r.getProfilGénéré());
            dto.setEtudiantId(r.getEtudiant().getId());
            dto.setTestId(r.getTest().getId());
            return dto;
        }).collect(Collectors.toList());
    }
}
