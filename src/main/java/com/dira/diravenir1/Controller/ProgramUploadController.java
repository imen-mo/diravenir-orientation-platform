package com.dira.diravenir1.Controller;

import com.dira.diravenir1.Entities.Program;
import com.dira.diravenir1.Repository.ProgramRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/programs")
@CrossOrigin(origins = "*")
public class ProgramUploadController {

    @Autowired
    private ProgramRepository programRepository;

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

            int importedCount = 0;
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row == null) continue;

                Program program = new Program();

                // Mapping des colonnes basé sur l'image 3
                program.setMajorName(getString(row, columnMap.get("majorname")));
                program.setUniversityName(getString(row, columnMap.get("universityname")));
                program.setDescription(getString(row, columnMap.get("description")));

                // Colonnes optionnelles
                if (columnMap.containsKey("degreetype")) {
                    program.setDegreeType(getString(row, columnMap.get("degreetype")));
                }
                if (columnMap.containsKey("location")) {
                    program.setLocation(getString(row, columnMap.get("location")));
                }
                if (columnMap.containsKey("campusCity")) {
                    program.setCampusCity(getString(row, columnMap.get("campusCity")));
                }
                if (columnMap.containsKey("duration")) {
                    program.setDuration(getInt(row, columnMap.get("duration")));
                }
                if (columnMap.containsKey("language")) {
                    program.setLanguage(getString(row, columnMap.get("language")));
                }
                if (columnMap.containsKey("universityRanking")) {
                    program.setUniversityRanking(getString(row, columnMap.get("universityRanking")));
                }
                if (columnMap.containsKey("programRanking")) {
                    program.setProgramRanking(getString(row, columnMap.get("programRanking")));
                }
                if (columnMap.containsKey("scholarshipAvailable")) {
                    program.setScholarshipAvailable(getBoolean(row, columnMap.get("scholarshipAvailable")));
                }
                if (columnMap.containsKey("tuitionFees")) {
                    program.setTuitionFees(getBigDecimal(row, columnMap.get("tuitionFees")));
                }
                if (columnMap.containsKey("applyBefore")) {
                    program.setApplyBefore(getString(row, columnMap.get("applyBefore")));
                }
                if (columnMap.containsKey("programImage")) {
                    program.setProgramImage(getString(row, columnMap.get("programImage")));
                }

                // Relations (optionnelles)
                if (columnMap.containsKey("destinationid")) {
                    // program.setDestinationId(getLong(row, columnMap.get("destinationid")));
                }
                if (columnMap.containsKey("partenaireid")) {
                    // program.setPartenaireId(getLong(row, columnMap.get("partenaireid")));
                }
                if (columnMap.containsKey("universiteid")) {
                    // program.setUniversiteId(getLong(row, columnMap.get("universiteid")));
                }

                // Statut par défaut
                program.setStatus(Program.ProgramStatus.OPENED);

                programRepository.save(program);
                importedCount++;
            }

            return ResponseEntity.ok("Import réussi ! " + importedCount + " programmes importés.");

        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Erreur lors de la lecture du fichier: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur lors de l'import: " + e.getMessage());
        }
    }

    // Méthodes utilitaires pour lire les cellules
    private String getString(Row row, Integer columnIndex) {
        if (columnIndex == null || row.getCell(columnIndex) == null) return null;
        Cell cell = row.getCell(columnIndex);
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                return String.valueOf((int) cell.getNumericCellValue());
            default:
                return null;
        }
    }

    private Integer getInt(Row row, Integer columnIndex) {
        if (columnIndex == null || row.getCell(columnIndex) == null) return null;
        Cell cell = row.getCell(columnIndex);
        switch (cell.getCellType()) {
            case NUMERIC:
                return (int) cell.getNumericCellValue();
            case STRING:
                try {
                    return Integer.parseInt(cell.getStringCellValue());
                } catch (NumberFormatException e) {
                    return null;
                }
            default:
                return null;
        }
    }

    private Long getLong(Row row, Integer columnIndex) {
        if (columnIndex == null || row.getCell(columnIndex) == null) return null;
        Cell cell = row.getCell(columnIndex);
        switch (cell.getCellType()) {
            case NUMERIC:
                return (long) cell.getNumericCellValue();
            case STRING:
                try {
                    return Long.parseLong(cell.getStringCellValue());
                } catch (NumberFormatException e) {
                    return null;
                }
            default:
                return null;
        }
    }

    private BigDecimal getBigDecimal(Row row, Integer columnIndex) {
        if (columnIndex == null || row.getCell(columnIndex) == null) return null;
        Cell cell = row.getCell(columnIndex);
        switch (cell.getCellType()) {
            case NUMERIC:
                return BigDecimal.valueOf(cell.getNumericCellValue());
            case STRING:
                try {
                    return new BigDecimal(cell.getStringCellValue());
                } catch (NumberFormatException e) {
                    return null;
                }
            default:
                return null;
        }
    }

    private Boolean getBoolean(Row row, Integer columnIndex) {
        if (columnIndex == null || row.getCell(columnIndex) == null) return false;
        Cell cell = row.getCell(columnIndex);
        switch (cell.getCellType()) {
            case BOOLEAN:
                return cell.getBooleanCellValue();
            case STRING:
                return "true".equalsIgnoreCase(cell.getStringCellValue()) || 
                       "yes".equalsIgnoreCase(cell.getStringCellValue()) ||
                       "1".equals(cell.getStringCellValue());
            case NUMERIC:
                return cell.getNumericCellValue() == 1;
            default:
                return false;
        }
    }
} 