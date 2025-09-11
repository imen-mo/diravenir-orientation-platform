package com.diravenir.service;

import com.diravenir.Entities.*;
import com.diravenir.dto.OrientationRequestDTO;
import com.diravenir.dto.MajorRecommendationDto;
import com.diravenir.dto.OrientationResultDTO;
import com.diravenir.dto.OrientationRecommendationDTO;
import com.diravenir.repository.OrientationTestRepository;
import com.diravenir.repository.OrientationResultRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrientationPersistenceService {
    
    private final OrientationTestRepository testRepository;
    private final OrientationResultRepository resultRepository;
    private final ObjectMapper objectMapper;
    
    /**
     * Sauvegarde les réponses d'un test d'orientation
     */
    @Transactional
    public OrientationTest saveOrientationAnswers(OrientationRequestDTO request) {
        log.info("💾 Sauvegarde des réponses pour l'étudiant: {}", request.getStudentInfo().getEmail());
        
        // Vérifier si un test existe déjà pour cet étudiant (gérer les doublons)
        List<OrientationTest> existingTests = testRepository.findAllByStudentEmail(request.getStudentInfo().getEmail());
        
        OrientationTest test;
        if (!existingTests.isEmpty()) {
            // Supprimer tous les tests existants pour cet étudiant (éviter les doublons)
            log.info("🔄 Suppression de {} test(s) existant(s) pour: {}", existingTests.size(), request.getStudentInfo().getEmail());
            testRepository.deleteAll(existingTests);
            
            // Créer un nouveau test
            LocalDateTime now = LocalDateTime.now();
            test = OrientationTest.builder()
                    .studentEmail(request.getStudentInfo().getEmail())
                    .studentName(request.getStudentInfo().getFullName())
                    .studentPhone(request.getStudentInfo().getPhone())
                    .testStartedAt(now)
                    .testStatus(OrientationTest.TestStatus.IN_PROGRESS)
                    .totalQuestions(14) // Nombre de questions d'orientation
                    .answeredQuestions(0)
                    .studentId(null) // Pas d'étudiant spécifique pour les tests anonymes
                    .build();
            log.info("🆕 Création d'un nouveau test pour: {}", request.getStudentInfo().getEmail());
        } else {
            LocalDateTime now = LocalDateTime.now();
            test = OrientationTest.builder()
                    .studentEmail(request.getStudentInfo().getEmail())
                    .studentName(request.getStudentInfo().getFullName())
                    .studentPhone(request.getStudentInfo().getPhone())
                    .testStartedAt(now)
                    .testStatus(OrientationTest.TestStatus.IN_PROGRESS)
                    .totalQuestions(14) // Nombre de questions d'orientation
                    .answeredQuestions(0)
                    .studentId(null) // Pas d'étudiant spécifique pour les tests anonymes
                    .build();
            log.info("🆕 Création d'un nouveau test pour: {}", request.getStudentInfo().getEmail());
        }
        
        // Sauvegarder le test
        test = testRepository.save(test);
        
        // Créer les réponses
        List<OrientationAnswer> answers = createAnswersFromRequest(request, test);
        test.setAnswers(answers);
        
        // Marquer comme terminé
        test.setTestCompletedAt(LocalDateTime.now());
        test.setTestStatus(OrientationTest.TestStatus.COMPLETED);
        test.setAnsweredQuestions(14); // Toutes les questions sont répondues
        
        // Calculer la durée du test
        if (test.getTestStartedAt() != null) {
            long durationMinutes = java.time.Duration.between(test.getTestStartedAt(), LocalDateTime.now()).toMinutes();
            test.setTestDurationMinutes((int) durationMinutes);
        }
        
        return testRepository.save(test);
    }
    
    /**
     * Sauvegarde les résultats d'orientation
     */
    @Transactional
    public OrientationResultDTO saveOrientationResults(Long testId, Map<String, Integer> userProfile, 
                                                      List<MajorRecommendationDto> recommendations) {
        log.info("💾 Sauvegarde des résultats pour le test: {}", testId);
        
        Optional<OrientationTest> testOpt = testRepository.findById(testId);
        if (testOpt.isEmpty()) {
            throw new IllegalArgumentException("Test non trouvé avec l'ID: " + testId);
        }
        
        OrientationTest test = testOpt.get();
        
        // Supprimer tous les résultats existants pour ce test (au cas où il y en aurait plusieurs)
        List<OrientationResult> existingResults = resultRepository.findAllByOrientationTestId(testId);
        
        if (!existingResults.isEmpty()) {
            log.info("🔄 Suppression de {} résultat(s) existant(s) pour le test: {}", existingResults.size(), testId);
            resultRepository.deleteAll(existingResults);
        }
        
        // Créer un nouveau résultat
        log.info("✨ Création d'un nouveau résultat pour le test: {}", testId);
        OrientationResult result = OrientationResult.builder()
                .orientationTest(test)
                .userProfile(convertUserProfileToJson(userProfile))
                .topRecommendationScore(recommendations.isEmpty() ? 0.0 : recommendations.get(0).getMatchingScore())
                .topRecommendationMajor(recommendations.isEmpty() ? "" : recommendations.get(0).getMajorName())
                .calculationMethod("BACKEND_DYNAMIC")
                .calculatedAt(LocalDateTime.now())
                .build();
        
        // Créer les recommandations (limiter aux top 3)
        List<MajorRecommendationDto> topRecommendations = recommendations.stream()
                .limit(3)
                .collect(Collectors.toList());
        
        List<OrientationRecommendation> recommendationEntities = createRecommendationsFromDto(topRecommendations, result);
        result.setRecommendations(recommendationEntities);
        
        OrientationResult savedResult = resultRepository.save(result);
        
        // Convertir en DTO pour éviter les références circulaires
        return convertToDTO(savedResult);
    }
    
    /**
     * Récupère les résultats d'un étudiant par email
     */
    @Transactional(readOnly = true)
    public Optional<OrientationResultDTO> getResultsByStudentEmail(String email) {
        log.info("📊 Récupération des résultats pour: {}", email);
        Optional<OrientationResult> result = resultRepository.findLatestByStudentEmail(email);
        return result.map(this::convertToDTO);
    }
    
    /**
     * Récupère les statistiques globales
     */
    public Map<String, Object> getGlobalStatistics() {
        log.info("📈 Récupération des statistiques globales");
        
        Long totalTests = testRepository.countCompletedTests();
        Long totalResults = resultRepository.countTotalResults();
        
        return Map.of(
            "totalCompletedTests", totalTests,
            "totalResults", totalResults,
            "lastUpdated", LocalDateTime.now()
        );
    }
    
    /**
     * Crée les réponses à partir de la requête
     */
    private List<OrientationAnswer> createAnswersFromRequest(OrientationRequestDTO request, OrientationTest test) {
        List<OrientationAnswer> answers = new ArrayList<>();
        answers.add(createAnswer(test, 1, "Que préférez-vous faire ?", request.getQ1()));
        answers.add(createAnswer(test, 2, "Centres d'intérêt", request.getQ2()));
        answers.add(createAnswer(test, 3, "Cadeau préféré", request.getQ3()));
        answers.add(createAnswer(test, 4, "Approche des problèmes", request.getQ4()));
        answers.add(createAnswer(test, 5, "Compétences préférées", request.getQ5()));
        answers.add(createAnswer(test, 6, "Méthode d'apprentissage", request.getQ6()));
        answers.add(createAnswer(test, 7, "Valeurs professionnelles", request.getQ7()));
        answers.add(createAnswer(test, 8, "Environnement de travail", request.getQ8()));
        answers.add(createAnswer(test, 9, "Priorités", request.getQ9()));
        answers.add(createAnswer(test, 10, "Approche des défis", request.getQ10()));
        answers.add(createAnswer(test, 11, "Préférence de travail", request.getQ11()));
        answers.add(createAnswer(test, 12, "Méthode de présentation", request.getQ12()));
        answers.add(createAnswer(test, 13, "Style de décision", request.getQ13()));
        answers.add(createAnswer(test, 14, "Matières préférées", request.getQ14()));
        return answers;
    }
    
    private OrientationAnswer createAnswer(OrientationTest test, Integer questionNumber, String questionText, String answerValue) {
        return OrientationAnswer.builder()
                .orientationTest(test)
                .questionNumber(questionNumber)
                .questionText(questionText)
                .answerValue(answerValue)
                .answeredAt(LocalDateTime.now())
                .build();
    }
    
    /**
     * Convertit une entité OrientationResult en DTO
     */
    @Transactional(readOnly = true)
    private OrientationResultDTO convertToDTO(OrientationResult result) {
        List<OrientationRecommendationDTO> recommendationDTOs = result.getRecommendations() != null ?
                result.getRecommendations().stream()
                        .map(rec -> OrientationRecommendationDTO.builder()
                                .id(rec.getId())
                                .majorName(rec.getMajorName())
                                .matchingScore(rec.getMatchingScore())
                                .rankPosition(rec.getRankPosition())
                                .reasoning(rec.getReasoning())
                                .build())
                        .toList() : new ArrayList<>();
        
        // Créer un OrientationTest simplifié pour éviter les problèmes de lazy loading
        OrientationTest simplifiedTest = OrientationTest.builder()
                .id(result.getOrientationTest().getId())
                .studentEmail(result.getOrientationTest().getStudentEmail())
                .studentName(result.getOrientationTest().getStudentName())
                .studentPhone(result.getOrientationTest().getStudentPhone())
                .testUuid(result.getOrientationTest().getTestUuid())
                .testStartedAt(result.getOrientationTest().getTestStartedAt())
                .testCompletedAt(result.getOrientationTest().getTestCompletedAt())
                .testStatus(result.getOrientationTest().getTestStatus())
                .totalQuestions(result.getOrientationTest().getTotalQuestions())
                .answeredQuestions(result.getOrientationTest().getAnsweredQuestions())
                .testDurationMinutes(result.getOrientationTest().getTestDurationMinutes())
                .createdAt(result.getOrientationTest().getCreatedAt())
                .updatedAt(result.getOrientationTest().getUpdatedAt())
                .build();

        return OrientationResultDTO.builder()
                .id(result.getId())
                .userProfile(result.getUserProfile())
                .topRecommendationScore(result.getTopRecommendationScore())
                .topRecommendationMajor(result.getTopRecommendationMajor())
                .calculationMethod(result.getCalculationMethod())
                .calculatedAt(result.getCalculatedAt())
                .orientationTest(simplifiedTest)
                .recommendations(recommendationDTOs)
                .build();
    }
    
    private List<OrientationRecommendation> createRecommendationsFromDto(List<MajorRecommendationDto> recommendations, OrientationResult result) {
        return recommendations.stream()
                .map(rec -> OrientationRecommendation.builder()
                        .orientationResult(result)
                        .majorCode(rec.getMajorCode())
                        .majorName(rec.getMajorName())
                        .matchingScore(rec.getMatchingScore())
                        .matchingPercentage(rec.getMatchingPercentage())
                        .category(rec.getCategory())
                        .description(rec.getDescription())
                        .whyThisMajor(rec.getWhyThisMajor())
                        .reasoning(rec.getReasoning())
                        .rankPosition(recommendations.indexOf(rec) + 1)
                        .build())
                .toList();
    }
    
    private String convertUserProfileToJson(Map<String, Integer> userProfile) {
        try {
            return objectMapper.writeValueAsString(userProfile);
        } catch (JsonProcessingException e) {
            log.error("Erreur lors de la sérialisation du profil utilisateur", e);
            return "{}";
        }
    }
}
