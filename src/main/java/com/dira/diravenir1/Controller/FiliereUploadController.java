package com.dira.diravenir1.Controller;

import com.dira.diravenir1.Entities.Filiere;
import com.dira.diravenir1.Repository.FiliereRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/filieres")
public class FiliereUploadController {

    @Autowired
    private FiliereRepository filiereRepository;

    @PostMapping("/import")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);

            // Lire l'entête (première ligne)
            Row headerRow = sheet.getRow(0);
            Map<String, Integer> columnMap = new HashMap<>();
            for (Cell cell : headerRow) {
                columnMap.put(cell.getStringCellValue().trim().toLowerCase(), cell.getColumnIndex());
            }

            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row == null) continue;

                Filiere f = new Filiere();

                // Utiliser le nom de colonne pour trouver la bonne cellule
                f.setDomaine(getString(row, columnMap.get("domaine")));
                f.setNom(getString(row, columnMap.get("nom")));
                f.setDureeAnnees(getInt(row, columnMap.get("dureeannees")));
                f.setLangueEnseignement(getString(row, columnMap.get("langueenseignement")));
                f.setNomAnglais(getString(row, columnMap.get("nomanglais")));
                f.setNomArabe(getString(row, columnMap.get("nomarabe")));
                f.setNomTurc(getString(row, columnMap.get("nomturc")));
                f.setPrix100(getDouble(row, columnMap.get("prix100")));
                f.setPrix50(getDouble(row, columnMap.get("prix50")));
                f.setPrix60(getDouble(row, columnMap.get("prix60")));
                f.setPrix70(getDouble(row, columnMap.get("prix70")));
                f.setPrix80(getDouble(row, columnMap.get("prix80")));
                f.setPrix90(getDouble(row, columnMap.get("prix90")));
                f.setDestinationId(getLong(row, columnMap.get("destinationid")));
                f.setPartenaireId(getLong(row, columnMap.get("partenaireid")));
                f.setUniversiteId(getLong(row, columnMap.get("universiteid")));

                filiereRepository.save(f);
            }

            return ResponseEntity.ok("✅ Données importées avec succès");

        } catch (IOException e) {
            return ResponseEntity.status(500).body("❌ Erreur d'import : " + e.getMessage());
        }
    }

    // Les méthodes utilitaires doivent être ici, au niveau de la classe ⬇️

    private String getString(Row row, Integer colIdx) {
        if (colIdx == null) return null;
        Cell cell = row.getCell(colIdx);
        if (cell == null) return null;
        if (cell.getCellType() == CellType.STRING) return cell.getStringCellValue().trim();
        if (cell.getCellType() == CellType.NUMERIC) return String.valueOf(cell.getNumericCellValue());
        return null;
    }

    private Integer getInt(Row row, Integer colIdx) {
        if (colIdx == null) return null;
        Cell cell = row.getCell(colIdx);
        if (cell == null) return null;
        if (cell.getCellType() == CellType.NUMERIC) return (int) cell.getNumericCellValue();
        if (cell.getCellType() == CellType.STRING) {
            try {
                return Integer.parseInt(cell.getStringCellValue().trim());
            } catch (NumberFormatException e) {
                return null;
            }
        }
        return null;
    }

    private Double getDouble(Row row, Integer colIdx) {
        if (colIdx == null) return null;
        Cell cell = row.getCell(colIdx);
        if (cell == null) return null;
        if (cell.getCellType() == CellType.NUMERIC) return cell.getNumericCellValue();
        if (cell.getCellType() == CellType.STRING) {
            try {
                return Double.parseDouble(cell.getStringCellValue().trim());
            } catch (NumberFormatException e) {
                return null;
            }
        }
        return null;
    }

    private Long getLong(Row row, Integer colIdx) {
        if (colIdx == null) return null;
        Cell cell = row.getCell(colIdx);
        if (cell == null) return null;
        if (cell.getCellType() == CellType.NUMERIC) return (long) cell.getNumericCellValue();
        if (cell.getCellType() == CellType.STRING) {
            try {
                return Long.parseLong(cell.getStringCellValue().trim());
            } catch (NumberFormatException e) {
                return null;
            }
        }
        return null;
    }
}
