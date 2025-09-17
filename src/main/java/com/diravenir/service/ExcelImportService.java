package com.diravenir.service;

import com.diravenir.Entities.Program;
import com.diravenir.Entities.Universite;
import com.diravenir.Entities.Destination;
import com.diravenir.repository.ProgramRepository;
import com.diravenir.repository.UniversiteRepository;
import com.diravenir.repository.DestinationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class ExcelImportService {

    private final ProgramRepository programRepository;
    private final UniversiteRepository universiteRepository;
    private final DestinationRepository destinationRepository;

    /**
     * Import des programmes depuis un fichier Excel avec support multi-feuilles
     */
    public Map<String, Object> importProgramsFromExcel(MultipartFile file) {
        Map<String, Object> result = new HashMap<>();
        List<String> errors = new ArrayList<>();
        List<String> warnings = new ArrayList<>();
        int successCount = 0;
        int errorCount = 0;
        int warningCount = 0;
        int totalSheets = 0;

        try {
            // Vérifier le type de fichier
            if (!isValidExcelFile(file)) {
                errors.add("Le fichier doit être un fichier Excel (.xlsx)");
                result.put("success", false);
                result.put("errors", errors);
                return result;
            }

            // Charger le workbook
            Workbook workbook = new XSSFWorkbook(file.getInputStream());
            totalSheets = workbook.getNumberOfSheets();
            
            log.info("Import de {} feuille(s) Excel", totalSheets);

            // Traiter chaque feuille
            for (int sheetIndex = 0; sheetIndex < totalSheets; sheetIndex++) {
                Sheet sheet = workbook.getSheetAt(sheetIndex);
                String sheetName = sheet.getSheetName();
                
                log.info("Traitement de la feuille: {}", sheetName);

                if (sheet.getLastRowNum() < 1) {
                    warnings.add(String.format("Feuille '%s': Aucune donnée (doit contenir au moins une ligne d'en-tête et une ligne de données)", sheetName));
                    warningCount++;
                    continue;
                }

                // Déterminer la destination basée sur le nom de la feuille
                Destination destination = determineDestinationFromSheetName(sheetName);
                if (destination == null) {
                    warnings.add(String.format("Feuille '%s': Nom de feuille non reconnu. Utilisez 'Chine', 'Chypre', 'Cyprus' ou 'China'", sheetName));
                    warningCount++;
                    continue;
                }

                // Vérifier les en-têtes
                Row headerRow = sheet.getRow(0);
                if (headerRow == null) {
                    errors.add(String.format("Feuille '%s': Aucun en-tête trouvé", sheetName));
                    errorCount++;
                    continue;
                }

                // Valider les colonnes requises
                Map<String, Integer> columnIndexes = validateHeaders(headerRow, sheetName);
                if (columnIndexes.isEmpty()) {
                    errors.add(String.format("Feuille '%s': Colonnes requises manquantes. Vérifiez le format du fichier.", sheetName));
                    errorCount++;
                    continue;
                }

                int sheetSuccessCount = 0;
                int sheetErrorCount = 0;
                int sheetWarningCount = 0;

                // Traiter chaque ligne de la feuille
                for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                    Row row = sheet.getRow(i);
                    if (row == null) continue;

                    // Vérifier si la ligne est vide
                    if (isRowEmpty(row, columnIndexes)) {
                        continue;
                    }

                    try {
                        Program program = createProgramFromRow(row, columnIndexes, destination, sheetName);
                        if (program != null) {
                            // Vérifier si le programme existe déjà
                            List<Program> existingPrograms = programRepository.findByProgramContainingIgnoreCase(program.getProgram());
                            Optional<Program> existingProgram = existingPrograms.stream()
                                .filter(p -> p.getUniversite().getNom().equalsIgnoreCase(program.getUniversite().getNom()))
                                .findFirst();
                            
                            if (existingProgram.isPresent()) {
                                warnings.add(String.format("Feuille '%s' - Ligne %d: Programme '%s' existe déjà", sheetName, i + 1, program.getProgram()));
                                sheetWarningCount++;
                            } else {
                                programRepository.save(program);
                                sheetSuccessCount++;
                                log.info("Programme importé depuis feuille '{}': {}", sheetName, program.getProgram());
                            }
                        }
                    } catch (Exception e) {
                        sheetErrorCount++;
                        errors.add(String.format("Feuille '%s' - Ligne %d: %s", sheetName, i + 1, e.getMessage()));
                        log.error("Erreur import feuille '{}' ligne {}: {}", sheetName, i + 1, e.getMessage());
                    }
                }

                successCount += sheetSuccessCount;
                errorCount += sheetErrorCount;
                warningCount += sheetWarningCount;

                log.info("Feuille '{}' terminée - Succès: {}, Erreurs: {}, Avertissements: {}", 
                        sheetName, sheetSuccessCount, sheetErrorCount, sheetWarningCount);
            }

            workbook.close();

        } catch (IOException e) {
            log.error("Erreur lecture fichier Excel", e);
            errors.add("Erreur lors de la lecture du fichier: " + e.getMessage());
        }

        // Résultats
        result.put("success", errorCount == 0);
        result.put("totalSheets", totalSheets);
        result.put("totalRows", successCount + errorCount + warningCount);
        result.put("successCount", successCount);
        result.put("errorCount", errorCount);
        result.put("warningCount", warningCount);
        result.put("errors", errors);
        result.put("warnings", warnings);

        log.info("Import terminé - Feuilles: {}, Succès: {}, Erreurs: {}, Avertissements: {}", 
                totalSheets, successCount, errorCount, warningCount);

        return result;
    }

    /**
     * Vérifier si le fichier est un Excel valide
     */
    private boolean isValidExcelFile(MultipartFile file) {
        String contentType = file.getContentType();
        String fileName = file.getOriginalFilename();
        
        return (contentType != null && contentType.equals("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) ||
               (fileName != null && fileName.toLowerCase().endsWith(".xlsx"));
    }

    /**
     * Valider les en-têtes et retourner les index des colonnes (support ancien et nouveau format)
     */
    private Map<String, Integer> validateHeaders(Row headerRow, String sheetName) {
        Map<String, Integer> columnIndexes = new HashMap<>();
        
        // Créer un map des en-têtes
        Map<String, Integer> headerMap = new HashMap<>();
        for (Cell cell : headerRow) {
            if (cell.getCellType() == CellType.STRING) {
                String headerName = cell.getStringCellValue().trim().toLowerCase();
                headerMap.put(headerName, cell.getColumnIndex());
            }
        }

        // Nouveau format (colonnes flexibles)
        Map<String, String> newFormatColumns = Map.of(
            "nom", "Nom du programme",
            "universite", "Université", 
            "destination", "Destination",
            "duree", "Durée",
            "prix", "Prix",
            "description", "Description"
        );

        // Ancien format (colonnes spécifiques)
        String[] oldFormatColumns = {"campus city", "universities", "program", "category", "degree type"};

        // Essayer d'abord le nouveau format
        boolean newFormatFound = false;
        for (Map.Entry<String, String> entry : newFormatColumns.entrySet()) {
            for (Map.Entry<String, Integer> header : headerMap.entrySet()) {
                if (header.getKey().contains(entry.getKey()) || 
                    header.getKey().contains(entry.getValue().toLowerCase())) {
                    columnIndexes.put(entry.getKey(), header.getValue());
                    newFormatFound = true;
                    break;
                }
            }
        }

        // Si nouveau format trouvé, utiliser celui-ci
        if (newFormatFound && columnIndexes.size() >= 3) {
            log.info("Format nouveau détecté pour la feuille: {}", sheetName);
            return columnIndexes;
        }

        // Sinon, essayer l'ancien format
        columnIndexes.clear();
        boolean oldFormatFound = true;
        for (String requiredColumn : oldFormatColumns) {
            if (!headerMap.containsKey(requiredColumn)) {
                oldFormatFound = false;
                break;
            }
            columnIndexes.put(requiredColumn, headerMap.get(requiredColumn));
        }

        if (oldFormatFound) {
            log.info("Format ancien détecté pour la feuille: {}", sheetName);
            return columnIndexes;
        }

        // Aucun format reconnu
        log.warn("Aucun format reconnu pour la feuille: {}", sheetName);
        return new HashMap<>();
    }

    /**
     * Créer un programme à partir d'une ligne Excel (support ancien et nouveau format)
     */
    private Program createProgramFromRow(Row row, Map<String, Integer> columnIndexes, Destination destination, String sheetName) {
        try {
            Program program = new Program();

            // Déterminer le format utilisé
            boolean isOldFormat = columnIndexes.containsKey("campus city");
            
            if (isOldFormat) {
                // ANCIEN FORMAT
                return createProgramFromOldFormat(row, columnIndexes, destination, sheetName);
            } else {
                // NOUVEAU FORMAT
                return createProgramFromNewFormat(row, columnIndexes, destination);
            }

        } catch (Exception e) {
            throw new IllegalArgumentException("Erreur création programme: " + e.getMessage());
        }
    }

    /**
     * Créer un programme avec l'ancien format
     */
    private Program createProgramFromOldFormat(Row row, Map<String, Integer> columnIndexes, Destination destination, String sheetName) {
        Program program = new Program();

        // Campus city (obligatoire)
        String campusCity = getCellValueAsString(row, columnIndexes.get("campus city"));
        if (campusCity == null || campusCity.trim().isEmpty()) {
            throw new IllegalArgumentException("Campus city est obligatoire");
        }
        program.setCampusCity(campusCity.trim());

        // Université (obligatoire)
        String universityName = getCellValueAsString(row, columnIndexes.get("universities"));
        if (universityName == null || universityName.trim().isEmpty()) {
            throw new IllegalArgumentException("Nom de l'université est obligatoire");
        }
        program.setUniversities(universityName.trim());
        
        // Créer ou récupérer l'université
        Universite universite = getOrCreateUniversite(universityName.trim(), destination);
        program.setUniversite(universite);

        // Autres champs de l'ancien format
        program.setUniversityRanking(getCellValueAsString(row, columnIndexes.get("university ranking")));
        program.setApplyBefore(getCellValueAsString(row, columnIndexes.get("apply before")));
        
        String category = getCellValueAsString(row, columnIndexes.get("category"));
        if (category == null || category.trim().isEmpty()) {
            throw new IllegalArgumentException("Catégorie est obligatoire");
        }
        program.setCategory(category.trim());
        
        String programName = getCellValueAsString(row, columnIndexes.get("program"));
        if (programName == null || programName.trim().isEmpty()) {
            throw new IllegalArgumentException("Nom du programme est obligatoire");
        }
        program.setProgram(programName.trim());
        
        String degreeType = getCellValueAsString(row, columnIndexes.get("degree type"));
        if (degreeType == null || degreeType.trim().isEmpty()) {
            throw new IllegalArgumentException("Type de diplôme est obligatoire");
        }
        program.setDegreeType(degreeType.trim());
        
        program.setTuitionFees(getCellValueAsString(row, columnIndexes.get("tuition fees")));
        program.setDuration(getIntSafely(row, columnIndexes.get("duration")));
        program.setLanguage(getCellValueAsString(row, columnIndexes.get("language")));
        program.setScholarship(getCellValueAsString(row, columnIndexes.get("scholarship")));
        program.setDescription(getCellValueAsString(row, columnIndexes.get("description")));
        program.setAboutThisProgram(getCellValueAsString(row, columnIndexes.get("about this program")));
        program.setWhyThisProgram(getCellValueAsString(row, columnIndexes.get("why this program")));
        program.setAboutTheUniversity(getCellValueAsString(row, columnIndexes.get("about the university")));

        // Associer la destination
        program.setDestination(destination);

        // Statut par défaut
        program.setStatus(Program.ProgramStatus.OPENED);
        program.setIsActive(true);
        program.setApplicationCount(0L);
        // Les dates sont gérées automatiquement par @CreationTimestamp et @UpdateTimestamp

        return program;
    }

    /**
     * Créer un programme avec le nouveau format
     */
    private Program createProgramFromNewFormat(Row row, Map<String, Integer> columnIndexes, Destination destination) {
        Program program = new Program();

        // Nom du programme (obligatoire)
        String nom = getCellValueAsString(row, columnIndexes.get("nom"));
        if (nom == null || nom.trim().isEmpty()) {
            throw new IllegalArgumentException("Le nom du programme est obligatoire");
        }
        program.setProgram(nom.trim());

        // Université (obligatoire)
        String universiteNom = getCellValueAsString(row, columnIndexes.get("universite"));
        if (universiteNom == null || universiteNom.trim().isEmpty()) {
            throw new IllegalArgumentException("Le nom de l'université est obligatoire");
        }
        
        Universite universite = findOrCreateUniversite(universiteNom.trim(), destination);
        program.setUniversite(universite);
        program.setUniversities(universiteNom.trim());

        // Destination
        program.setDestination(destination);

        // Durée
        String duree = getCellValueAsString(row, columnIndexes.get("duree"));
        if (duree != null && !duree.trim().isEmpty()) {
            // Extraire le nombre d'années de la chaîne
            Integer duration = extractNumberFromString(duree);
            if (duration != null) {
                program.setDuration(duration);
            }
        }

        // Prix
        BigDecimal prix = getCellValueAsBigDecimal(row, columnIndexes.get("prix"));
        if (prix != null) {
            program.setTuitionFees(prix.toString());
        }

        // Description
        String description = getCellValueAsString(row, columnIndexes.get("description"));
        if (description != null && !description.trim().isEmpty()) {
            program.setDescription(description.trim());
        }

        // Valeurs par défaut
        program.setStatus(Program.ProgramStatus.OPENED);
        program.setIsActive(true);
        program.setApplicationCount(0L);
        // Les dates sont gérées automatiquement par @CreationTimestamp et @UpdateTimestamp

        return program;
    }

    /**
     * Trouver ou créer une université (nouveau format)
     */
    private Universite findOrCreateUniversite(String nom, Destination destination) {
        Optional<Universite> existing = universiteRepository.findByNom(nom);
        if (existing.isPresent()) {
            return existing.get();
        }

        Universite universite = new Universite();
        universite.setNom(nom);
        universite.setNomEn(nom);
        universite.setPays(destination.getPays() != null ? destination.getPays() : "Pays non défini");
        universite.setVille(destination.getVille() != null ? destination.getVille() : "Ville non définie");
        universite.setDescription("Université située à " + universite.getVille() + ", " + universite.getPays());
        universite.setType("Université");
        universite.setLogoUrl("/images/universities/" + nom.toLowerCase().replace(" ", "-") + "-logo.png");
        universite.setImageUrl("/images/universities/" + nom.toLowerCase().replace(" ", "-") + "-campus.jpg");
        universite.setDestination(destination);
        universite.setCreatedAt(LocalDateTime.now());
        universite.setUpdatedAt(LocalDateTime.now());
        
        return universiteRepository.save(universite);
    }

    /**
     * Trouver ou créer une université (ancien format)
     */
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
    
    /**
     * Créer une université si elle n'existe pas (ancien format)
     */
    private Universite createUniversiteIfNotExists(String nom, Destination destination) {
        log.info("Creating new university: {} for destination: {}", nom, destination.getNom());
        
        if (nom == null || nom.trim().isEmpty()) {
            throw new IllegalArgumentException("Nom de l'université ne peut pas être vide");
        }
        
        if (destination == null) {
            throw new IllegalArgumentException("Destination ne peut pas être null");
        }
        
        Universite universite = new Universite();
        universite.setNom(nom.trim());
        universite.setNomEn(nom.trim());
        universite.setPays(destination.getPays() != null ? destination.getPays() : "Pays non défini");
        universite.setVille(destination.getVille() != null ? destination.getVille() : "Ville non définie");
        universite.setDescription("Université située à " + universite.getVille() + ", " + universite.getPays());
        universite.setType("Université");
        universite.setLogoUrl("/images/universities/" + nom.toLowerCase().replace(" ", "-") + "-logo.png");
        universite.setImageUrl("/images/universities/" + nom.toLowerCase().replace(" ", "-") + "-campus.jpg");
        universite.setDestination(destination);
        universite.setCreatedAt(LocalDateTime.now());
        universite.setUpdatedAt(LocalDateTime.now());
        
        Universite savedUniversite = universiteRepository.save(universite);
        log.info("Saved university with ID: {} and destination ID: {}", 
                savedUniversite.getId(), 
                savedUniversite.getDestination() != null ? savedUniversite.getDestination().getId() : "NULL");
        
        return savedUniversite;
    }

    /**
     * Trouver ou créer une destination
     */
    private Destination findOrCreateDestination(String nom) {
        Optional<Destination> existing = destinationRepository.findByNom(nom);
        if (existing.isPresent()) {
            return existing.get();
        }

        Destination destination = new Destination();
        destination.setNom(nom);
        destination.setCreatedAt(LocalDateTime.now());
        destination.setUpdatedAt(LocalDateTime.now());
        
        return destinationRepository.save(destination);
    }

    /**
     * Déterminer la destination basée sur le nom de la feuille
     */
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

    /**
     * Créer une destination si elle n'existe pas
     */
    private Destination createDestinationIfNotExists(String nom, String description) {
        Destination destination = new Destination();
        destination.setNom(nom);
        destination.setPays(nom);
        destination.setVille("Ville principale");
        destination.setDescription(description);
        destination.setCoutVieMoyen(BigDecimal.valueOf(1000.0));
        destination.setClimat("Tempéré");
        destination.setSecurite("Sécurisé");
        destination.setImageUrl("/images/" + nom.toLowerCase() + ".jpg");
        destination.setCreatedAt(LocalDateTime.now());
        destination.setUpdatedAt(LocalDateTime.now());
        return destinationRepository.save(destination);
    }

    /**
     * Vérifier si une ligne est vide
     */
    private boolean isRowEmpty(Row row, Map<String, Integer> columnIndexes) {
        if (row == null) return true;
        
        // Vérifier les premières colonnes importantes
        Integer campusCityCol = columnIndexes.get("campus city");
        Integer universitiesCol = columnIndexes.get("universities");
        Integer programCol = columnIndexes.get("program");
        Integer categoryCol = columnIndexes.get("category");
        Integer degreeTypeCol = columnIndexes.get("degree type");
        Integer nomCol = columnIndexes.get("nom");
        Integer universiteCol = columnIndexes.get("universite");
        
        // Si toutes les colonnes importantes sont vides, la ligne est vide
        return (campusCityCol == null || isCellEmpty(row.getCell(campusCityCol))) &&
               (universitiesCol == null || isCellEmpty(row.getCell(universitiesCol))) &&
               (programCol == null || isCellEmpty(row.getCell(programCol))) &&
               (categoryCol == null || isCellEmpty(row.getCell(categoryCol))) &&
               (degreeTypeCol == null || isCellEmpty(row.getCell(degreeTypeCol))) &&
               (nomCol == null || isCellEmpty(row.getCell(nomCol))) &&
               (universiteCol == null || isCellEmpty(row.getCell(universiteCol)));
    }
    
    /**
     * Vérifier si une cellule est vide
     */
    private boolean isCellEmpty(Cell cell) {
        if (cell == null) return true;
        
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue() == null || cell.getStringCellValue().trim().isEmpty();
            case NUMERIC:
                return false;
            case BOOLEAN:
                return false;
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

    /**
     * Obtenir la valeur d'une cellule comme Integer
     */
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
                    return extractNumberFromString(value);
                default:
                    return null;
            }
        } catch (NumberFormatException e) {
            return null;
        }
    }
    
    /**
     * Extraire un nombre depuis une chaîne (ex: "6 years" -> 6)
     */
    private Integer extractNumberFromString(String text) {
        if (text == null || text.isEmpty()) return null;
        
        String numericPart = text.replaceAll("[^0-9.,]", "");
        
        if (numericPart.isEmpty()) return null;
        
        try {
            String cleanNumber = numericPart.replace(",", ".");
            double doubleValue = Double.parseDouble(cleanNumber);
            return (int) doubleValue;
        } catch (NumberFormatException e) {
            return null;
        }
    }

    /**
     * Obtenir la valeur d'une cellule comme String
     */
    private String getCellValueAsString(Row row, Integer columnIndex) {
        if (columnIndex == null) return null;
        
        Cell cell = row.getCell(columnIndex);
        if (cell == null) return null;

        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getDateCellValue().toString();
                } else {
                    return String.valueOf((long) cell.getNumericCellValue());
                }
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case FORMULA:
                return cell.getCellFormula();
            default:
                return null;
        }
    }

    /**
     * Obtenir la valeur d'une cellule comme BigDecimal
     */
    private BigDecimal getCellValueAsBigDecimal(Row row, Integer columnIndex) {
        if (columnIndex == null) return null;
        
        Cell cell = row.getCell(columnIndex);
        if (cell == null) return null;

        switch (cell.getCellType()) {
            case NUMERIC:
                return BigDecimal.valueOf(cell.getNumericCellValue());
            case STRING:
                try {
                    return new BigDecimal(cell.getStringCellValue().replace(",", "."));
                } catch (NumberFormatException e) {
                    return null;
                }
            default:
                return null;
        }
    }

    /**
     * Générer un template Excel avec support multi-feuilles
     */
    public byte[] generateTemplate() {
        try {
            Workbook workbook = new XSSFWorkbook();
            
            // Feuille 1: Nouveau format
            Sheet newFormatSheet = workbook.createSheet("Nouveau Format");
            createNewFormatTemplate(newFormatSheet, workbook);
            
            // Feuille 2: Ancien format - Chine
            Sheet chinaSheet = workbook.createSheet("Chine");
            createOldFormatTemplate(chinaSheet, workbook, "Chine");
            
            // Feuille 3: Ancien format - Chypre
            Sheet cyprusSheet = workbook.createSheet("Chypre");
            createOldFormatTemplate(cyprusSheet, workbook, "Chypre");

            // Convertir en byte array
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);
            workbook.close();

            return outputStream.toByteArray();

        } catch (IOException e) {
            log.error("Erreur génération template", e);
            throw new RuntimeException("Erreur lors de la génération du template", e);
        }
    }

    /**
     * Créer le template pour le nouveau format
     */
    private void createNewFormatTemplate(Sheet sheet, Workbook workbook) {
        Row headerRow = sheet.createRow(0);
        String[] headers = {
            "Nom du programme", "Université", "Destination", "Durée", 
            "Prix", "Description", "Statut", "Niveau"
        };

        CellStyle headerStyle = workbook.createCellStyle();
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerStyle.setFont(headerFont);

        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headerStyle);
        }

        // Exemples de données
        String[][] examples = {
            {"Master Informatique", "Université de Paris", "France", "2 ans", "5000", "Programme de master en informatique", "OPENED", "MASTER"},
            {"Bachelor Business", "London Business School", "Royaume-Uni", "3 ans", "15000", "Programme de bachelor en business", "OPENED", "BACHELOR"},
            {"PhD Engineering", "MIT", "États-Unis", "4 ans", "25000", "Programme de doctorat en ingénierie", "COMING_SOON", "PHD"}
        };

        for (int i = 0; i < examples.length; i++) {
            Row row = sheet.createRow(i + 1);
            for (int j = 0; j < examples[i].length; j++) {
                row.createCell(j).setCellValue(examples[i][j]);
            }
        }

        // Ajuster la largeur des colonnes
        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i);
        }
    }

    /**
     * Créer le template pour l'ancien format
     */
    private void createOldFormatTemplate(Sheet sheet, Workbook workbook, String destination) {
        Row headerRow = sheet.createRow(0);
        String[] headers = {
            "campus city", "universities", "program", "category", "degree type",
            "university ranking", "apply before", "tuition fees", "duration", 
            "language", "scholarship", "description", "about this program",
            "why this program", "about the university"
        };

        CellStyle headerStyle = workbook.createCellStyle();
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerStyle.setFont(headerFont);

        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headerStyle);
        }

        // Exemples de données selon la destination
        String[][] examples;
        if ("Chine".equals(destination)) {
            examples = new String[][]{
                {"Beijing", "Université de Pékin", "Master Informatique", "Technologie", "Master", "1", "2024-12-31", "5000", "2", "Chinois", "Oui", "Programme en Chine", "Excellente formation", "Opportunités", "Université prestigieuse"},
                {"Shanghai", "Université Fudan", "Bachelor Business", "Commerce", "Bachelor", "2", "2024-11-30", "8000", "4", "Anglais", "Non", "Programme business", "Formation complète", "Carrière", "Université renommée"}
            };
        } else {
            examples = new String[][]{
                {"Nicosia", "Université de Chypre", "Master Engineering", "Ingénierie", "Master", "1", "2024-12-31", "3000", "2", "Anglais", "Oui", "Programme à Chypre", "Formation européenne", "Qualité", "Université européenne"},
                {"Limassol", "Université européenne", "Bachelor Arts", "Arts", "Bachelor", "3", "2024-10-31", "4000", "3", "Anglais", "Partiel", "Programme arts", "Créativité", "Culture", "Université créative"}
            };
        }

        for (int i = 0; i < examples.length; i++) {
            Row row = sheet.createRow(i + 1);
            for (int j = 0; j < examples[i].length; j++) {
                row.createCell(j).setCellValue(examples[i][j]);
            }
        }

        // Ajuster la largeur des colonnes
        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i);
        }
    }
}
