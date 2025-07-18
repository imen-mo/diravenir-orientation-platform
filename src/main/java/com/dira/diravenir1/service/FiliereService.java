package com.dira.diravenir1.service;


import com.dira.diravenir1.Entities.Filiere;
import java.util.List;

public interface FiliereService {
    Filiere saveFiliere(Filiere filiere);
    List<Filiere> getAllFilieres();
}
