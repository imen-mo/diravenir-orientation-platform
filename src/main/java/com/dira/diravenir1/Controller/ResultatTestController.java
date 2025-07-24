package com.dira.diravenir1.Controller;

import com.dira.diravenir1.dto.ResultatTestDTO;
import com.dira.diravenir1.service.ResultatTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resultats")
public class ResultatTestController {

    @Autowired
    private ResultatTestService resultatTestService;

    @PostMapping
    public ResultatTestDTO enregistrerResultat(@RequestBody ResultatTestDTO dto) {
        return resultatTestService.enregistrerResultat(dto);
    }

    @GetMapping("/etudiant/{etudiantId}")
    public List<ResultatTestDTO> getResultatsParEtudiant(@PathVariable Long etudiantId) {
        return resultatTestService.getResultatsParEtudiant(etudiantId);
    }
}
