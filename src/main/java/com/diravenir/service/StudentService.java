package com.diravenir.service;

import com.diravenir.Entities.Utilisateur;
import com.diravenir.repository.ApplicationRepository;
import com.diravenir.repository.UtilisateurRepository;
import com.diravenir.repository.OrientationResultRepository;
import com.diravenir.repository.OrientationTestRepository;
import com.diravenir.repository.SavedProgramRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class StudentService {

    private final ApplicationRepository applicationRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final OrientationResultRepository orientationResultRepository;
    private final OrientationTestRepository orientationTestRepository;
    private final SavedProgramRepository savedProgramRepository;

    /**
     * Récupérer l'ID de l'utilisateur connecté
     */
    private Long getCurrentUserId() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            log.info("🔍 StudentService - Authentication: {}", authentication != null ? authentication.getName() : "null");
            log.info("🔍 StudentService - Is authenticated: {}", authentication != null ? authentication.isAuthenticated() : "false");
            
            if (authentication != null && authentication.isAuthenticated()) {
                String userEmail = authentication.getName();
                log.info("🔍 StudentService - User email: {}", userEmail);
                
                Optional<Utilisateur> userOpt = utilisateurRepository.findByEmail(userEmail);
                if (userOpt.isPresent()) {
                    Long userId = userOpt.get().getId();
                    log.info("✅ StudentService - User ID found: {}", userId);
                    return userId;
                } else {
                    log.warn("⚠️ StudentService - User not found in database: {}", userEmail);
                }
            } else {
                log.warn("⚠️ StudentService - No authentication found");
            }
        } catch (Exception e) {
            log.error("❌ StudentService - Erreur lors de la récupération de l'ID utilisateur", e);
        }
        return null;
    }

    /**
     * Récupérer l'email de l'utilisateur connecté
     */
    private String getCurrentUserEmail() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.isAuthenticated()) {
                return authentication.getName();
            }
        } catch (Exception e) {
            log.error("Erreur lors de la récupération de l'email utilisateur", e);
        }
        return null;
    }

    /**
     * Récupérer les statistiques de l'étudiant connecté
     */
    public Map<String, Object> getStudentStats() {
        try {
            Long userId = getCurrentUserId();
            if (userId == null) {
                throw new RuntimeException("Utilisateur non authentifié");
            }
            
            Map<String, Object> stats = new HashMap<>();
            
            // Compter les applications
            long totalApplications = applicationRepository.countByUserId(userId);
            
            // Compter les tests d'orientation complétés
            long completedTests = orientationResultRepository.countByStudentId(userId);
            long totalTests = orientationTestRepository.countByStudentId(userId); // Tests réels uniquement
            
            // Compter les programmes sauvegardés
            long savedPrograms = savedProgramRepository.countByEtudiantId(userId);
            
            // Calculer le pourcentage de complétion du profil
            int profileCompletion = calculateProfileCompletion(userId);
            
            stats.put("totalApplications", totalApplications);
            stats.put("completedTests", completedTests);
            stats.put("totalTests", totalTests); // Données réelles uniquement
            stats.put("savedPrograms", savedPrograms);
            stats.put("profileCompletion", profileCompletion);
            
            return stats;
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des statistiques étudiant", e);
            throw new RuntimeException("Erreur lors de la récupération des statistiques", e);
        }
    }

    /**
     * Récupérer les applications de l'étudiant connecté
     */
    public Map<String, Object> getStudentApplications() {
        try {
            Long userId = getCurrentUserId();
            if (userId == null) {
                throw new RuntimeException("Utilisateur non authentifié");
            }
            
            List<Map<String, Object>> applications = new ArrayList<>();
            
            // Récupérer les applications de l'utilisateur
            applicationRepository.findByUserId(userId).forEach(app -> {
                Map<String, Object> appData = new HashMap<>();
                appData.put("id", app.getId());
                appData.put("program", app.getProgramName() != null ? app.getProgramName() : "N/A");
                appData.put("university", app.getProgramme() != null && app.getProgramme().getUniversite() != null 
                    ? app.getProgramme().getUniversite().getNom() : "N/A");
                appData.put("destination", app.getProgramme() != null && app.getProgramme().getDestination() != null 
                    ? app.getProgramme().getDestination().getNom() : "N/A");
                appData.put("status", app.getStatus());
                appData.put("date", app.getCreatedAt() != null ? app.getCreatedAt().toString() : "N/A");
                appData.put("tuitionFees", app.getProgramme() != null ? app.getProgramme().getTuitionFees() : "0");
                
                applications.add(appData);
            });
            
            Map<String, Object> result = new HashMap<>();
            result.put("applications", applications);
            result.put("total", applications.size());
            
            return result;
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des applications étudiant", e);
            throw new RuntimeException("Erreur lors de la récupération des applications", e);
        }
    }

    /**
     * Récupérer les résultats de tests de l'étudiant connecté
     */
    public Map<String, Object> getStudentTestResults() {
        try {
            Long userId = getCurrentUserId();
            if (userId == null) {
                throw new RuntimeException("Utilisateur non authentifié");
            }
            
            List<Map<String, Object>> testResults = new ArrayList<>();
            
            // Récupérer les résultats d'orientation
            if (userId != null) {
                orientationResultRepository.findByStudentId(userId).forEach(result -> {
                Map<String, Object> testData = new HashMap<>();
                testData.put("id", result.getId());
                testData.put("testName", "Test d'Orientation");
                testData.put("score", result.getTopRecommendationScore() != null ? result.getTopRecommendationScore() : 0);
                testData.put("date", result.getCalculatedAt() != null ? result.getCalculatedAt().toString() : "N/A");
                testData.put("status", "COMPLETED");
                
                testResults.add(testData);
                });
            }
            
            Map<String, Object> result = new HashMap<>();
            result.put("testResults", testResults);
            result.put("total", testResults.size());
            
            return result;
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des résultats de tests", e);
            throw new RuntimeException("Erreur lors de la récupération des résultats de tests", e);
        }
    }

    /**
     * Récupérer les données de timeline de l'étudiant connecté
     */
    public Map<String, Object> getStudentTimeline() {
        try {
            Long userId = getCurrentUserId();
            if (userId == null) {
                throw new RuntimeException("Utilisateur non authentifié");
            }
            
            List<Map<String, Object>> timeline = new ArrayList<>();
            
            // Générer les données des 6 derniers mois
            LocalDateTime now = LocalDateTime.now();
            DateTimeFormatter monthFormatter = DateTimeFormatter.ofPattern("MMM");
            
            for (int i = 5; i >= 0; i--) {
                LocalDateTime month = now.minusMonths(i);
                
                // Compter les applications pour ce mois
                long applicationsCount = applicationRepository.countByUserIdAndMonth(userId, month.getYear(), month.getMonthValue());
                
                // Compter les tests pour ce mois
                String userEmail = getCurrentUserEmail();
                long testsCount = userEmail != null ? orientationResultRepository.countByUserEmailAndMonth(userEmail, month.getYear(), month.getMonthValue()) : 0;
                
                Map<String, Object> monthData = new HashMap<>();
                monthData.put("month", month.format(monthFormatter));
                monthData.put("applications", applicationsCount);
                monthData.put("tests", testsCount);
                
                timeline.add(monthData);
            }
            
            Map<String, Object> result = new HashMap<>();
            result.put("timeline", timeline);
            
            return result;
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des données timeline", e);
            throw new RuntimeException("Erreur lors de la récupération des données timeline", e);
        }
    }

    /**
     * Récupérer le profil de l'étudiant connecté
     */
    public Map<String, Object> getStudentProfile() {
        try {
            Long userId = getCurrentUserId();
            if (userId == null) {
                throw new RuntimeException("Utilisateur non authentifié");
            }
            
            return utilisateurRepository.findById(userId)
                .map(user -> {
                    Map<String, Object> profile = new HashMap<>();
                    profile.put("id", user.getId());
                    profile.put("nom", user.getNom());
                    profile.put("prenom", user.getPrenom());
                    profile.put("email", user.getEmail());
                    profile.put("telephone", user.getTelephone());
                    profile.put("dateNaissance", user.getDateNaissance());
                    profile.put("nationalite", user.getNationalite());
                    profile.put("adresse", user.getAdresse());
                    profile.put("ville", user.getVille());
                    profile.put("pays", user.getPays());
                    profile.put("compteActif", user.isCompteActif());
                    profile.put("dateCreation", user.getDateCreation());
                    profile.put("derniereConnexion", user.getDerniereConnexion());
                    
                    return profile;
                })
                .orElse(new HashMap<>());
        } catch (Exception e) {
            log.error("Erreur lors de la récupération du profil étudiant", e);
            throw new RuntimeException("Erreur lors de la récupération du profil", e);
        }
    }

    /**
     * Mettre à jour le profil de l'étudiant connecté
     */
    public Map<String, Object> updateStudentProfile(Map<String, Object> profileData) {
        try {
            Long userId = getCurrentUserId();
            if (userId == null) {
                throw new RuntimeException("Utilisateur non authentifié");
            }
            
            return utilisateurRepository.findById(userId)
                .map(user -> {
                    // Mettre à jour les champs fournis
                    if (profileData.containsKey("nom")) {
                        user.setNom((String) profileData.get("nom"));
                    }
                    if (profileData.containsKey("prenom")) {
                        user.setPrenom((String) profileData.get("prenom"));
                    }
                    if (profileData.containsKey("telephone")) {
                        user.setTelephone((String) profileData.get("telephone"));
                    }
                    if (profileData.containsKey("adresse")) {
                        user.setAdresse((String) profileData.get("adresse"));
                    }
                    if (profileData.containsKey("ville")) {
                        user.setVille((String) profileData.get("ville"));
                    }
                    if (profileData.containsKey("pays")) {
                        user.setPays((String) profileData.get("pays"));
                    }
                    
                    user.setDerniereConnexion(LocalDateTime.now());
                    
                    utilisateurRepository.save(user);
                    
                    Map<String, Object> updatedProfile = new HashMap<>();
                    updatedProfile.put("id", user.getId());
                    updatedProfile.put("nom", user.getNom());
                    updatedProfile.put("prenom", user.getPrenom());
                    updatedProfile.put("email", user.getEmail());
                    updatedProfile.put("telephone", user.getTelephone());
                    updatedProfile.put("adresse", user.getAdresse());
                    updatedProfile.put("ville", user.getVille());
                    updatedProfile.put("pays", user.getPays());
                    updatedProfile.put("derniereConnexion", user.getDerniereConnexion());
                    
                    return updatedProfile;
                })
                .orElse(new HashMap<>());
        } catch (Exception e) {
            log.error("Erreur lors de la mise à jour du profil étudiant", e);
            throw new RuntimeException("Erreur lors de la mise à jour du profil", e);
        }
    }

    /**
     * Calculer le pourcentage de complétion du profil
     */
    private int calculateProfileCompletion(Long userId) {
        try {
            return utilisateurRepository.findById(userId)
                .map(user -> {
                    int completedFields = 0;
                    int totalFields = 8; // Nombre de champs importants
                    
                    if (user.getNom() != null && !user.getNom().trim().isEmpty()) completedFields++;
                    if (user.getPrenom() != null && !user.getPrenom().trim().isEmpty()) completedFields++;
                    if (user.getEmail() != null && !user.getEmail().trim().isEmpty()) completedFields++;
                    if (user.getTelephone() != null && !user.getTelephone().trim().isEmpty()) completedFields++;
                    if (user.getDateNaissance() != null) completedFields++;
                    if (user.getNationalite() != null && !user.getNationalite().trim().isEmpty()) completedFields++;
                    if (user.getAdresse() != null && !user.getAdresse().trim().isEmpty()) completedFields++;
                    if (user.getVille() != null && !user.getVille().trim().isEmpty()) completedFields++;
                    
                    return (completedFields * 100) / totalFields;
                })
                .orElse(0);
        } catch (Exception e) {
            log.error("Erreur lors du calcul de complétion du profil", e);
            return 0;
        }
    }

    /**
     * Récupérer les programmes sauvegardés de l'étudiant connecté
     */
    public Map<String, Object> getSavedPrograms() {
        try {
            Long userId = getCurrentUserId();
            if (userId == null) {
                throw new RuntimeException("Utilisateur non authentifié");
            }
            
            List<Map<String, Object>> savedPrograms = new ArrayList<>();
            
            // Récupérer les programmes sauvegardés de l'utilisateur
            savedProgramRepository.findByEtudiantId(userId).forEach(savedProgram -> {
                Map<String, Object> programData = new HashMap<>();
                programData.put("id", savedProgram.getProgram().getId());
                programData.put("name", savedProgram.getProgram().getProgram());
                programData.put("university", savedProgram.getProgram().getUniversities());
                programData.put("country", savedProgram.getProgram().getCampusCity());
                programData.put("field", savedProgram.getProgram().getCategory());
                programData.put("duration", savedProgram.getProgram().getDuration() + " ans");
                programData.put("tuition", savedProgram.getProgram().getTuitionFees());
                programData.put("language", savedProgram.getProgram().getLanguage());
                programData.put("description", "Programme " + savedProgram.getProgram().getProgram() + " à " + savedProgram.getProgram().getUniversities());
                programData.put("savedAt", savedProgram.getSavedAt().toString());
                programData.put("notes", savedProgram.getNotes());
                
                savedPrograms.add(programData);
            });
            
            Map<String, Object> result = new HashMap<>();
            result.put("programs", savedPrograms);
            result.put("total", savedPrograms.size());
            
            return result;
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des programmes sauvegardés", e);
            throw new RuntimeException("Erreur lors de la récupération des programmes sauvegardés", e);
        }
    }
}
