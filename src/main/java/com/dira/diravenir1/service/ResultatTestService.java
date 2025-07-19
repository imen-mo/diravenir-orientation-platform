package com.dira.diravenir1.Service;

import com.dira.diravenir1.dto.ResultatTestDTO;
import java.util.List;

public interface ResultatTestService {
    ResultatTestDTO enregistrerResultat(ResultatTestDTO dto);
    List<ResultatTestDTO> getResultatsParEtudiant(Long etudiantId);
}
