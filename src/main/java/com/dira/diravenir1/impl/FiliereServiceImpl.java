package com.dira.diravenir1.impl;



import com.dira.diravenir1.Entities.Filiere;
import com.dira.diravenir1.Repository.FiliereRepository;
import com.dira.diravenir1.service.FiliereService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FiliereServiceImpl implements FiliereService {

    @Autowired
    private FiliereRepository filiereRepository;

    @Override
    public Filiere saveFiliere(Filiere filiere) {
        return filiereRepository.save(filiere);
    }

    @Override
    public List<Filiere> getAllFilieres() {
        return filiereRepository.findAll();
    }
}
