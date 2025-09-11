package com.diravenir.controller;

import com.diravenir.Entities.Program;
import com.diravenir.Entities.Destination;
import com.diravenir.Entities.Universite;
import com.diravenir.repository.ProgramRepository;
import com.diravenir.repository.DestinationRepository;
import com.diravenir.repository.UniversiteRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/programs/upload")
@CrossOrigin(origins = "*")
public class ProgramUploadController {

    @Autowired
    private ProgramRepository programRepository;

    @Autowired
    private DestinationRepository destinationRepository;
    
    @Autowired
    private UniversiteRepository universiteRepository;

    @PostMapping("/import")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Le fichier est vide");
            }
            String fileName = file.getOriginalFilename();
            if (fileName == null || (!fileName.endsWith(".xlsx") && !fileName.endsWith(".xls"))) {
                return ResponseEntity.badRequest().body("Veuillez uploader un fichier Excel (.xlsx ou .xls)");
            }

            try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
                int totalImportedCount = 0;
                int totalErrorCount = 0;
                int totalSheets = workbook.getNumberOfSheets();
                
                StringBuilder resultMessage = new StringBuilder();
                resultMessage.append("Import de ").append(totalSheets).append(" feuille(s) Excel\n\n");
                
                // Traiter chaque feuille
                for (int sheetIndex = 0; sheetIndex < totalSheets; sheetIndex++) {
                    Sheet sheet = workbook.getSheetAt(sheetIndex);
                    String sheetName = sheet.getSheetName();
                    
                    if (sheet.getLastRowNum() < 1) {
                        resultMessage.append("Feuille '").append(sheetName).append("': Aucune donnée (doit contenir au moins une ligne d'en-tête et une ligne de données)\n");
                        continue;
                    }

                    // Déterminer la destination basée sur le nom de la feuille
                    Destination destination = determineDestinationFromSheetName(sheetName);
                    if (destination == null) {
                        resultMessage.append("Feuille '").append(sheetName).append("': Nom de feuille non reconnu. Utilisez 'Chine', 'Chypre', 'Cyprus' ou 'China'\n");
                        continue;
                    }

                    Row headerRow = sheet.getRow(0);
                    Map<String, Integer> columnMap = new HashMap<>();
                    for (Cell cell : headerRow) {
                        if (cell != null && cell.getCellType() == CellType.STRING) {
                            String headerName = cell.getStringCellValue().trim().toLowerCase();
                            columnMap.put(headerName, cell.getColumnIndex());
                        }
                    }

                    String[] requiredColumns = {"campus city", "universities", "program", "category", "degree type"};
                    boolean missingColumns = false;
                    for (String requiredColumn : requiredColumns) {
                        if (!columnMap.containsKey(requiredColumn)) {
                            resultMessage.append("Feuille '").append(sheetName).append("': Colonne requise manquante: '").append(requiredColumn).append("'\n");
                            missingColumns = true;
                        }
                    }
                    
                    if (missingColumns) {
                        resultMessage.append("Colonnes trouvées: ").append(String.join(", ", columnMap.keySet())).append("\n");
                        resultMessage.append("Colonnes requises: ").append(String.join(", ", requiredColumns)).append("\n\n");
                        continue;
                    }

                    int importedCount = 0;
                    int errorCount = 0;
                    int emptyRowCount = 0;
                    
                    // Traiter toutes les lignes de données
                    for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                        Row row = sheet.getRow(i);
                        if (row == null) continue;

                        // Vérifier si la ligne est vide (toutes les cellules sont vides)
                        if (isRowEmpty(row, columnMap)) {
                            emptyRowCount++;
                            continue; // Ignorer les lignes vides
                        }

                        try {
                            Program program = new Program();

                            // Lecture des colonnes avec gestion d'erreur et validation
                            String campusCity = getStringSafely(row, columnMap.get("campus city"));
                            if (campusCity == null || campusCity.trim().isEmpty()) {
                                throw new IllegalArgumentException("Campus city est obligatoire");
                            }
                            program.setCampusCity(campusCity);
                            
                            // Gérer l'université
                            String universityName = getStringSafely(row, columnMap.get("universities"));
                            if (universityName == null || universityName.trim().isEmpty()) {
                                throw new IllegalArgumentException("Nom de l'université est obligatoire");
                            }
                            program.setUniversities(universityName);
                            
                            // Créer ou récupérer l'université
                            Universite universite = getOrCreateUniversite(universityName, destination);
                            if (universite == null) {
                                throw new IllegalArgumentException("Impossible de créer ou récupérer l'université: " + universityName);
                            }
                            program.setUniversite(universite);
                            
                            program.setUniversityRanking(getStringSafely(row, columnMap.get("university ranking")));
                            program.setApplyBefore(getStringSafely(row, columnMap.get("apply before")));
                            
                            String category = getStringSafely(row, columnMap.get("category"));
                            if (category == null || category.trim().isEmpty()) {
                                throw new IllegalArgumentException("Catégorie est obligatoire");
                            }
                            program.setCategory(category);
                            
                            String programName = getStringSafely(row, columnMap.get("program"));
                            if (programName == null || programName.trim().isEmpty()) {
                                throw new IllegalArgumentException("Nom du programme est obligatoire");
                            }
                            program.setProgram(programName);
                            
                            String degreeType = getStringSafely(row, columnMap.get("degree type"));
                            if (degreeType == null || degreeType.trim().isEmpty()) {
                                throw new IllegalArgumentException("Type de diplôme est obligatoire");
                            }
                            program.setDegreeType(degreeType);
                            
                            program.setTuitionFees(getStringSafely(row, columnMap.get("tuition fees")));
                            program.setDuration(getIntSafely(row, columnMap.get("duration")));
                            program.setLanguage(getStringSafely(row, columnMap.get("language")));
                            program.setScholarship(getStringSafely(row, columnMap.get("scholarship")));
                            program.setDescription(getStringSafely(row, columnMap.get("description")));
                            program.setAboutThisProgram(getStringSafely(row, columnMap.get("about this program")));
                            program.setWhyThisProgram(getStringSafely(row, columnMap.get("why this program")));
                            program.setAboutTheUniversity(getStringSafely(row, columnMap.get("about the university")));

                            // Associer la destination
                            if (destination == null) {
                                throw new IllegalArgumentException("Destination est obligatoire");
                            }
                            program.setDestination(destination);

                            // Statut par défaut
                            program.setStatus(Program.ProgramStatus.OPENED);
                            
                            // Les dates seront définies automatiquement par les annotations @CreationTimestamp et @UpdateTimestamp

                            // Validation finale avant sauvegarde
                            validateProgramBeforeSave(program);

                            programRepository.save(program);
                            importedCount++;
                            
                        } catch (Exception e) {
                            errorCount++;
                            System.err.println("Erreur ligne " + (i + 1) + " feuille '" + sheetName + "': " + e.getMessage());
                        }
                    }
                    
                    totalImportedCount += importedCount;
                    totalErrorCount += errorCount;
                    
                    resultMessage.append("Feuille '").append(sheetName).append("' (").append(destination.getNom()).append("): ")
                               .append(importedCount).append(" programmes importés, ")
                               .append(errorCount).append(" erreurs, ")
                               .append(emptyRowCount).append(" lignes vides ignorées\n");
                }
                
                resultMessage.append("\nTOTAL: ").append(totalImportedCount).append(" programmes importés avec succès, ")
                           .append(totalErrorCount).append(" erreurs.");
                
                if (totalImportedCount > 0) {
                    return ResponseEntity.ok(resultMessage.toString());
                } else {
                    return ResponseEntity.badRequest().body("Aucun programme n'a pu être importé.\n" + resultMessage.toString());
                }

            } catch (IOException e) {
                return ResponseEntity.badRequest().body("Erreur lors de la lecture du fichier Excel: " + e.getMessage());
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur lors de l'import: " + e.getMessage());
        }
    }

    // Méthodes utilitaires sécurisées
    private String getStringSafely(Row row, Integer columnIndex) {
        if (columnIndex == null) return null;
        Cell cell = row.getCell(columnIndex);
        if (cell == null) return null;
        
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue().trim();
            case NUMERIC:
                return String.valueOf((int) cell.getNumericCellValue());
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            default:
                return null;
        }
    }

    private Integer getIntSafely(Row row, Integer columnIndex) {
        if (columnIndex == null) return null;
        Cell cell = row.getCell(columnIndex);
        if (cell == null) return null;
        
        try {
            switch (cell.getCellType()) {
                case NUMERIC:
                    return (int) cell.getNumericCellValue();
                case STRING:
                    String value = cell.getStringCellValue().trim();
                    if (value.isEmpty()) return null;
                    
                    // Essayer d'extraire un nombre depuis des chaînes comme "6 years", "5 years", etc.
                    return extractNumberFromString(value);
                default:
                    return null;
            }
        } catch (NumberFormatException e) {
            return null;
        }
    }
    
    // Méthode pour extraire un nombre depuis une chaîne (ex: "6 years" -> 6)
    private Integer extractNumberFromString(String text) {
        if (text == null || text.isEmpty()) return null;
        
        // Supprimer tous les caractères non numériques sauf le point et la virgule
        String numericPart = text.replaceAll("[^0-9.,]", "");
        
        if (numericPart.isEmpty()) return null;
        
        try {
            // Remplacer la virgule par un point pour la conversion
            String cleanNumber = numericPart.replace(",", ".");
            double doubleValue = Double.parseDouble(cleanNumber);
            return (int) doubleValue;
        } catch (NumberFormatException e) {
            return null;
        }
    }

    private BigDecimal getBigDecimalSafely(Row row, Integer columnIndex) {
        if (columnIndex == null) return null;
        Cell cell = row.getCell(columnIndex);
        if (cell == null) return null;
        
        try {
        switch (cell.getCellType()) {
            case NUMERIC:
                return BigDecimal.valueOf(cell.getNumericCellValue());
            case STRING:
                    String value = cell.getStringCellValue().trim();
                    return value.isEmpty() ? null : new BigDecimal(value);
                default:
                    return null;
                }
        } catch (NumberFormatException e) {
                return null;
        }
    }

    // Méthode pour déterminer la destination basée sur le nom de la feuille
    private Destination determineDestinationFromSheetName(String sheetName) {
        String normalizedName = sheetName.toLowerCase().trim();
        
        // Rechercher la destination par nom
        if (normalizedName.contains("chine") || normalizedName.contains("china")) {
            List<Destination> destinations = destinationRepository.findByNomContainingIgnoreCase("Chine");
            return destinations.isEmpty() ? createDestinationIfNotExists("Chine", "Programmes d'études en Chine") : destinations.get(0);
        } else if (normalizedName.contains("chypre") || normalizedName.contains("cyprus")) {
            List<Destination> destinations = destinationRepository.findByNomContainingIgnoreCase("Chypre");
            return destinations.isEmpty() ? createDestinationIfNotExists("Chypre", "Programmes d'études à Chypre") : destinations.get(0);
        }
        
        return null;
    }

    // Méthode pour créer une destination si elle n'existe pas
    private Destination createDestinationIfNotExists(String nom, String description) {
        Destination destination = new Destination();
        destination.setNom(nom);
        destination.setPays(nom);  // Le pays est le même que le nom
        destination.setVille("Ville principale");  // Valeur par défaut
        destination.setDescription(description);
        destination.setCoutVieMoyen(BigDecimal.valueOf(1000.0));  // Valeur par défaut
        destination.setClimat("Tempéré");  // Valeur par défaut
        destination.setSecurite("Sécurisé");  // Valeur par défaut
        destination.setImageUrl("/images/" + nom.toLowerCase() + ".jpg");
        return destinationRepository.save(destination);
    }
    
    // Méthode pour créer ou récupérer une université
    private Universite getOrCreateUniversite(String universityName, Destination destination) {
        if (universityName == null || universityName.trim().isEmpty()) {
            return null;
        }
        
        // Essayer de trouver l'université existante
        List<Universite> existingUniversities = universiteRepository.findByNomContainingIgnoreCase(universityName.trim());
        if (!existingUniversities.isEmpty()) {
            return existingUniversities.get(0);
        }
        return createUniversiteIfNotExists(universityName.trim(), destination);
    }
    
    // Méthode pour créer une université si elle n'existe pas
    private Universite createUniversiteIfNotExists(String nom, Destination destination) {
        System.out.println("Creating new university: " + nom + " for destination: " + destination.getNom());
        
        if (nom == null || nom.trim().isEmpty()) {
            throw new IllegalArgumentException("Nom de l'université ne peut pas être vide");
        }
        
        if (destination == null) {
            throw new IllegalArgumentException("Destination ne peut pas être null");
        }
        
        Universite universite = new Universite();
        universite.setNom(nom.trim());
        universite.setNomEn(nom.trim());  // Même nom en anglais pour l'instant
        universite.setPays(destination.getPays() != null ? destination.getPays() : "Pays non défini");
        universite.setVille(destination.getVille() != null ? destination.getVille() : "Ville non définie");
        universite.setDescription("Université située à " + universite.getVille() + ", " + universite.getPays());
        universite.setType("Université");
        universite.setLogoUrl("/images/universities/" + nom.toLowerCase().replace(" ", "-") + "-logo.png");
        universite.setImageUrl("/images/universities/" + nom.toLowerCase().replace(" ", "-") + "-campus.jpg");
        
        // Définir la destination
        universite.setDestination(destination);
        System.out.println("Set destination for university: " + universite.getDestination().getNom());
        
        // Définir les dates automatiquement
        LocalDateTime currentDateTime = LocalDateTime.now();
        universite.setCreatedAt(currentDateTime);
        universite.setUpdatedAt(currentDateTime);
        
        // Validation avant sauvegarde
        validateUniversiteBeforeSave(universite);
        
        Universite savedUniversite = universiteRepository.save(universite);
        System.out.println("Saved university with ID: " + savedUniversite.getId() + " and destination ID: " + 
                          (savedUniversite.getDestination() != null ? savedUniversite.getDestination().getId() : "NULL"));
        
        return savedUniversite;
    }
    
    // Méthode de validation pour l'université
    private void validateUniversiteBeforeSave(Universite universite) {
        if (universite.getNom() == null || universite.getNom().trim().isEmpty()) {
            throw new IllegalArgumentException("Nom de l'université est obligatoire");
        }
        if (universite.getNomEn() == null || universite.getNomEn().trim().isEmpty()) {
            throw new IllegalArgumentException("Nom en anglais de l'université est obligatoire");
        }
        if (universite.getPays() == null || universite.getPays().trim().isEmpty()) {
            throw new IllegalArgumentException("Pays de l'université est obligatoire");
        }
        if (universite.getVille() == null || universite.getVille().trim().isEmpty()) {
            throw new IllegalArgumentException("Ville de l'université est obligatoire");
        }
        if (universite.getType() == null || universite.getType().trim().isEmpty()) {
            throw new IllegalArgumentException("Type de l'université est obligatoire");
        }
        if (universite.getDestination() == null) {
            throw new IllegalArgumentException("Destination de l'université est obligatoire");
        }
        if (universite.getCreatedAt() == null) {
            throw new IllegalArgumentException("Date de création est obligatoire");
        }
        if (universite.getUpdatedAt() == null) {
            throw new IllegalArgumentException("Date de mise à jour est obligatoire");
        }
    }
    
    // Méthode de validation pour le programme
    private void validateProgramBeforeSave(Program program) {
        if (program.getCampusCity() == null || program.getCampusCity().trim().isEmpty()) {
            throw new IllegalArgumentException("Campus city est obligatoire");
        }
        if (program.getUniversities() == null || program.getUniversities().trim().isEmpty()) {
            throw new IllegalArgumentException("Nom de l'université est obligatoire");
        }
        if (program.getCategory() == null || program.getCategory().trim().isEmpty()) {
            throw new IllegalArgumentException("Catégorie est obligatoire");
        }
        if (program.getProgram() == null || program.getProgram().trim().isEmpty()) {
            throw new IllegalArgumentException("Nom du programme est obligatoire");
        }
        if (program.getDegreeType() == null || program.getDegreeType().trim().isEmpty()) {
            throw new IllegalArgumentException("Type de diplôme est obligatoire");
        }
        if (program.getDestination() == null) {
            throw new IllegalArgumentException("Destination est obligatoire");
        }
        if (program.getUniversite() == null) {
            throw new IllegalArgumentException("Université est obligatoire");
        }
        if (program.getStatus() == null) {
            throw new IllegalArgumentException("Statut est obligatoire");
        }
        // Les dates de création et mise à jour sont gérées automatiquement par Hibernate
    }
    
    // Méthode pour vérifier si une ligne est vide
    private boolean isRowEmpty(Row row, Map<String, Integer> columnMap) {
        if (row == null) return true;
        
        // Vérifier les premières colonnes importantes
        Integer campusCityCol = columnMap.get("campus city");
        Integer universitiesCol = columnMap.get("universities");
        Integer programCol = columnMap.get("program");
        Integer categoryCol = columnMap.get("category");
        Integer degreeTypeCol = columnMap.get("degree type");
        
        // Si toutes les colonnes importantes sont vides, la ligne est vide
        return (campusCityCol == null || isCellEmpty(row.getCell(campusCityCol))) &&
               (universitiesCol == null || isCellEmpty(row.getCell(universitiesCol))) &&
               (programCol == null || isCellEmpty(row.getCell(programCol))) &&
               (categoryCol == null || isCellEmpty(row.getCell(categoryCol))) &&
               (degreeTypeCol == null || isCellEmpty(row.getCell(degreeTypeCol)));
    }
    
    // Méthode pour vérifier si une cellule est vide
    private boolean isCellEmpty(Cell cell) {
        if (cell == null) return true;
        
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue() == null || cell.getStringCellValue().trim().isEmpty();
            case NUMERIC:
                return false; // Une valeur numérique n'est jamais vide
            case BOOLEAN:
                return false; // Une valeur booléenne n'est jamais vide
            case FORMULA:
                try {
                    String formulaValue = cell.getStringCellValue();
                    return formulaValue == null || formulaValue.trim().isEmpty();
                } catch (Exception e) {
                    return true;
                }
            default:
                return true;
        }
    }
} 
