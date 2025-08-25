package com.dira.diravenir1.service.calculators;

import com.dira.diravenir1.dto.UserProfileDTO;
import com.dira.diravenir1.dto.MajorProfileDTO;
import com.dira.diravenir1.dto.MatchingResultDTO;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Calculateur de scores euclidiens pondérés selon les spécifications exactes
 * du "Système d'Orientation des Étudiants".
 * 
 * Implémente l'algorithme de matching avec distance euclidienne pondérée :
 * Score_matching = 100 - √(Σ(DiffP * PoidsP)²)
 * 
 * Où :
 * - DiffP = |Profil_Utilisateur[P] - Profil_Ideal_Majeure[P]|
 * - PoidsP = Score idéal du pilier pour la majeure (0-100)
 */
@Service
@Slf4j
public class EuclideanScoreCalculator implements ScoreCalculator {
    
    @Override
    public List<MatchingResultDTO> calculateMatchingScores(
            UserProfileDTO userProfile, 
            List<MajorProfileDTO> majorProfiles) {
        
        log.info("🧮 Calcul des scores de matching euclidien pondéré selon les spécifications exactes");
        log.info("📊 Profil utilisateur reçu avec {} piliers", getProfilePillarCount(userProfile));
        log.info("🎯 {} profils de majeures à évaluer", majorProfiles.size());
        
        List<MatchingResultDTO> results = new ArrayList<>();
        
        for (MajorProfileDTO majorProfile : majorProfiles) {
            double matchingScore = calculateEuclideanDistance(userProfile, majorProfile);
            
            MatchingResultDTO result = MatchingResultDTO.builder()
                .majorId(majorProfile.getMajorId())
                .program(majorProfile.getProgram())
                .category(majorProfile.getCategory())
                .matchingScore(matchingScore)
                .pillarScores(calculatePillarDifferences(userProfile, majorProfile))
                .build();
            
            results.add(result);
            log.debug("🎯 {} : Score de matching = {:.2f}%", majorProfile.getProgram(), matchingScore);
        }
        
        // Tri par score de matching décroissant (meilleur score en premier)
        results.sort((a, b) -> Double.compare(b.getMatchingScore(), a.getMatchingScore()));
        
        log.info("✅ Calcul des scores de matching terminé. Top 3 : {} ({}%), {} ({}%), {} ({}%)", 
            results.get(0).getProgram(), Math.round(results.get(0).getMatchingScore()),
            results.get(1).getProgram(), Math.round(results.get(1).getMatchingScore()),
            results.get(2).getProgram(), Math.round(results.get(2).getMatchingScore()));
        
        return results;
    }
    
    /**
     * Calcule le score de matching euclidien pondéré selon les spécifications exactes
     * Score_matching = 100 - √(Σ(DiffP * PoidsP)²)
     */
    private double calculateEuclideanDistance(UserProfileDTO userProfile, MajorProfileDTO majorProfile) {
        double weightedSumSquared = 0.0;
        int totalPillars = 0;
        
        // Calcul pour chaque pilier selon les spécifications exactes
        weightedSumSquared += calculatePillarWeightedDifference(
            userProfile.getInteretScientifiqueTech(), 
            majorProfile.getInteretScientifiqueTech(), 
            majorProfile.getInteretScientifiqueTech()
        );
        totalPillars++;
        
        weightedSumSquared += calculatePillarWeightedDifference(
            userProfile.getInteretArtistiqueCreatif(), 
            majorProfile.getInteretArtistiqueCreatif(), 
            majorProfile.getInteretArtistiqueCreatif()
        );
        totalPillars++;
        
        weightedSumSquared += calculatePillarWeightedDifference(
            userProfile.getInteretSocialHumain(), 
            majorProfile.getInteretSocialHumain(), 
            majorProfile.getInteretSocialHumain()
        );
        totalPillars++;
        
        weightedSumSquared += calculatePillarWeightedDifference(
            userProfile.getInteretBusinessGestion(), 
            majorProfile.getInteretBusinessGestion(), 
            majorProfile.getInteretBusinessGestion()
        );
        totalPillars++;
        
        weightedSumSquared += calculatePillarWeightedDifference(
            userProfile.getInteretLogiqueAnalytique(), 
            majorProfile.getInteretLogiqueAnalytique(), 
            majorProfile.getInteretLogiqueAnalytique()
        );
        totalPillars++;
        
        weightedSumSquared += calculatePillarWeightedDifference(
            userProfile.getCompetenceResolutionProblemes(), 
            majorProfile.getCompetenceResolutionProblemes(), 
            majorProfile.getCompetenceResolutionProblemes()
        );
        totalPillars++;
        
        weightedSumSquared += calculatePillarWeightedDifference(
            userProfile.getCompetenceCommunication(), 
            majorProfile.getCompetenceCommunication(), 
            majorProfile.getCompetenceCommunication()
        );
        totalPillars++;
        
        weightedSumSquared += calculatePillarWeightedDifference(
            userProfile.getCompetenceOrganisation(), 
            majorProfile.getCompetenceOrganisation(), 
            majorProfile.getCompetenceOrganisation()
        );
        totalPillars++;
        
        weightedSumSquared += calculatePillarWeightedDifference(
            userProfile.getCompetenceManuelTechnique(), 
            majorProfile.getCompetenceManuelTechnique(), 
            majorProfile.getCompetenceManuelTechnique()
        );
        totalPillars++;
        
        weightedSumSquared += calculatePillarWeightedDifference(
            userProfile.getValeurImpactSocietal(), 
            majorProfile.getValeurImpactSocietal(), 
            majorProfile.getValeurImpactSocietal()
        );
        totalPillars++;
        
        weightedSumSquared += calculatePillarWeightedDifference(
            userProfile.getValeurInnovationChallenge(), 
            majorProfile.getValeurInnovationChallenge(), 
            majorProfile.getValeurInnovationChallenge()
        );
        totalPillars++;
        
        weightedSumSquared += calculatePillarWeightedDifference(
            userProfile.getValeurStabiliteSecurite(), 
            majorProfile.getValeurStabiliteSecurite(), 
            majorProfile.getValeurStabiliteSecurite()
        );
        totalPillars++;
        
        weightedSumSquared += calculatePillarWeightedDifference(
            userProfile.getValeurAutonomie(), 
            majorProfile.getValeurAutonomie(), 
            majorProfile.getValeurAutonomie()
        );
        totalPillars++;
        
        weightedSumSquared += calculatePillarWeightedDifference(
            userProfile.getPrefTravailEquipeCollab(), 
            majorProfile.getPrefTravailEquipeCollab(), 
            majorProfile.getPrefTravailEquipeCollab()
        );
        totalPillars++;
        
        weightedSumSquared += calculatePillarWeightedDifference(
            userProfile.getPrefTravailAutonome(), 
            majorProfile.getPrefTravailAutonome(), 
            majorProfile.getPrefTravailAutonome()
        );
        totalPillars++;
        
        weightedSumSquared += calculatePillarWeightedDifference(
            userProfile.getPrefPratiqueTerrain(), 
            majorProfile.getPrefPratiqueTerrain(), 
            majorProfile.getPrefPratiqueTerrain()
        );
        totalPillars++;
        
        weightedSumSquared += calculatePillarWeightedDifference(
            userProfile.getPrefTheorieRecherche(), 
            majorProfile.getPrefTheorieRecherche(), 
            majorProfile.getPrefTheorieRecherche()
        );
        totalPillars++;
        
        // Vérification que tous les 17 piliers ont été traités
        if (totalPillars != 17) {
            log.warn("⚠️ Nombre de piliers traité ({}) différent de 17 attendus", totalPillars);
        }
        
        // Calcul du score final selon la formule : Score_matching = 100 - √(Σ(DiffP * PoidsP)²)
        double euclideanDistance = Math.sqrt(weightedSumSquared);
        double matchingScore = Math.max(0, 100 - euclideanDistance);
        
        // Normalisation sur 0-100 avec arrondi à 2 décimales
        matchingScore = Math.round(matchingScore * 100.0) / 100.0;
        
        log.debug("🔍 {} : Distance euclidienne = {:.2f}, Score final = {:.2f}%", 
            majorProfile.getProgram(), euclideanDistance, matchingScore);
        
        return matchingScore;
    }
    
    /**
     * Calcule la différence pondérée pour un pilier spécifique
     * DiffP * PoidsP où PoidsP est le score idéal du pilier pour la majeure
     */
    private double calculatePillarWeightedDifference(Integer userScore, Integer majorScore, Integer majorIdealScore) {
        if (userScore == null || majorScore == null || majorIdealScore == null) {
            return 0.0;
        }
        
        // DiffP = |Profil_Utilisateur[P] - Profil_Ideal_Majeure[P]|
        double difference = Math.abs(userScore - majorScore);
        
        // PoidsP = Score idéal du pilier pour la majeure (0-100)
        double weight = majorIdealScore;
        
        // Calcul de la différence pondérée au carré : (DiffP * PoidsP)²
        double weightedDifference = difference * weight;
        return weightedDifference * weightedDifference;
    }
    
    /**
     * Calcule les différences détaillées par pilier pour l'analyse
     */
    private Map<String, Double> calculatePillarDifferences(UserProfileDTO userProfile, MajorProfileDTO majorProfile) {
        Map<String, Double> differences = new HashMap<>();
        
        differences.put("Interet_Scientifique_Tech", 
            calculatePillarDifference(userProfile.getInteretScientifiqueTech(), majorProfile.getInteretScientifiqueTech()));
        differences.put("Interet_Artistique_Creatif", 
            calculatePillarDifference(userProfile.getInteretArtistiqueCreatif(), majorProfile.getInteretArtistiqueCreatif()));
        differences.put("Interet_Social_Humain", 
            calculatePillarDifference(userProfile.getInteretSocialHumain(), majorProfile.getInteretSocialHumain()));
        differences.put("Interet_Business_Gestion", 
            calculatePillarDifference(userProfile.getInteretBusinessGestion(), majorProfile.getInteretBusinessGestion()));
        differences.put("Interet_Logique_Analytique", 
            calculatePillarDifference(userProfile.getInteretLogiqueAnalytique(), majorProfile.getInteretLogiqueAnalytique()));
        differences.put("Competence_Resolution_Problemes", 
            calculatePillarDifference(userProfile.getCompetenceResolutionProblemes(), majorProfile.getCompetenceResolutionProblemes()));
        differences.put("Competence_Communication", 
            calculatePillarDifference(userProfile.getCompetenceCommunication(), majorProfile.getCompetenceCommunication()));
        differences.put("Competence_Organisation", 
            calculatePillarDifference(userProfile.getCompetenceOrganisation(), majorProfile.getCompetenceOrganisation()));
        differences.put("Competence_Manuel_Technique", 
            calculatePillarDifference(userProfile.getCompetenceManuelTechnique(), majorProfile.getCompetenceManuelTechnique()));
        differences.put("Valeur_Impact_Societal", 
            calculatePillarDifference(userProfile.getValeurImpactSocietal(), majorProfile.getValeurImpactSocietal()));
        differences.put("Valeur_Innovation_Challenge", 
            calculatePillarDifference(userProfile.getValeurInnovationChallenge(), majorProfile.getValeurInnovationChallenge()));
        differences.put("Valeur_Stabilite_Securite", 
            calculatePillarDifference(userProfile.getValeurStabiliteSecurite(), majorProfile.getValeurStabiliteSecurite()));
        differences.put("Valeur_Autonomie", 
            calculatePillarDifference(userProfile.getValeurAutonomie(), majorProfile.getValeurAutonomie()));
        differences.put("Pref_Travail_Equipe_Collab", 
            calculatePillarDifference(userProfile.getPrefTravailEquipeCollab(), majorProfile.getPrefTravailEquipeCollab()));
        differences.put("Pref_Travail_Autonome", 
            calculatePillarDifference(userProfile.getPrefTravailAutonome(), majorProfile.getPrefTravailAutonome()));
        differences.put("Pref_Pratique_Terrain", 
            calculatePillarDifference(userProfile.getPrefPratiqueTerrain(), majorProfile.getPrefPratiqueTerrain()));
        differences.put("Pref_Theorie_Recherche", 
            calculatePillarDifference(userProfile.getPrefTheorieRecherche(), majorProfile.getPrefTheorieRecherche()));
        
        return differences;
    }
    
    /**
     * Calcule la différence simple entre deux scores
     */
    private double calculatePillarDifference(Integer userScore, Integer majorScore) {
        if (userScore == null || majorScore == null) {
            return 0.0;
        }
        return Math.abs(userScore - majorScore);
    }
    
    /**
     * Compte le nombre de piliers dans le profil utilisateur
     */
    private int getProfilePillarCount(UserProfileDTO userProfile) {
        int count = 0;
        if (userProfile.getInteretScientifiqueTech() > 0) count++;
        if (userProfile.getInteretArtistiqueCreatif() > 0) count++;
        if (userProfile.getInteretSocialHumain() > 0) count++;
        if (userProfile.getInteretBusinessGestion() > 0) count++;
        if (userProfile.getInteretLogiqueAnalytique() > 0) count++;
        if (userProfile.getCompetenceResolutionProblemes() > 0) count++;
        if (userProfile.getCompetenceCommunication() > 0) count++;
        if (userProfile.getCompetenceOrganisation() > 0) count++;
        if (userProfile.getCompetenceManuelTechnique() > 0) count++;
        if (userProfile.getValeurImpactSocietal() > 0) count++;
        if (userProfile.getValeurInnovationChallenge() > 0) count++;
        if (userProfile.getValeurStabiliteSecurite() > 0) count++;
        if (userProfile.getValeurAutonomie() > 0) count++;
        if (userProfile.getPrefTravailEquipeCollab() > 0) count++;
        if (userProfile.getPrefTravailAutonome() > 0) count++;
        if (userProfile.getPrefPratiqueTerrain() > 0) count++;
        if (userProfile.getPrefTheorieRecherche() > 0) count++;
        return count;
    }
    
    /**
     * Génère un rapport détaillé du calcul pour le debugging
     */
    public String generateCalculationReport(UserProfileDTO userProfile, MajorProfileDTO majorProfile) {
        StringBuilder report = new StringBuilder();
        report.append("📊 RAPPORT DE CALCUL EUCLIDIEN PONDÉRÉ\n");
        report.append("🎯 Majeure : ").append(majorProfile.getProgram()).append("\n");
        report.append("👤 Profil utilisateur : ").append(getProfilePillarCount(userProfile)).append(" piliers\n\n");
        
        // Calcul détaillé par pilier
        double totalWeightedSum = 0.0;
        
        totalWeightedSum += addPillarReport(report, "Interet_Scientifique_Tech", 
            userProfile.getInteretScientifiqueTech(), 
            majorProfile.getInteretScientifiqueTech(), 
            majorProfile.getInteretScientifiqueTech());
        
        totalWeightedSum += addPillarReport(report, "Interet_Artistique_Creatif", 
            userProfile.getInteretArtistiqueCreatif(), 
            majorProfile.getInteretArtistiqueCreatif(), 
            majorProfile.getInteretArtistiqueCreatif());
        
        // ... autres piliers similaires
        
        report.append("\n📈 SOMME TOTALE PONDÉRÉE : ").append(String.format("%.2f", totalWeightedSum));
        report.append("\n🔢 DISTANCE EUCLIDIENNE : ").append(String.format("%.2f", Math.sqrt(totalWeightedSum)));
        report.append("\n🏆 SCORE FINAL : ").append(String.format("%.2f", Math.max(0, 100 - Math.sqrt(totalWeightedSum))));
        
        return report.toString();
    }
    
    private double addPillarReport(StringBuilder report, String pillarName, 
                                 Integer userScore, Integer majorScore, Integer majorIdealScore) {
        if (userScore == null || majorScore == null || majorIdealScore == null) {
            report.append(String.format("❌ %s : Données manquantes\n", pillarName));
            return 0.0;
        }
        
        double difference = Math.abs(userScore - majorScore);
        double weight = majorIdealScore;
        double weightedDifference = difference * weight;
        double weightedDifferenceSquared = weightedDifference * weightedDifference;
        
        report.append(String.format("✅ %s : Diff=%d, Poids=%d, DiffPond=%d, DiffPond²=%.2f\n", 
            pillarName, (int)difference, (int)weight, (int)weightedDifference, weightedDifferenceSquared));
        
        return weightedDifferenceSquared;
    }
    
    @Override
    public String getAlgorithmName() {
        return "Euclidean Distance Weighted Matching";
    }
    
    @Override
    public String getAlgorithmVersion() {
        return "2.0";
    }
    
    @Override
    public String getCalculatorName() {
        return "EuclideanScoreCalculator";
    }
    
    @Override
    public double getWeight() {
        return 1.0; // Poids par défaut
    }
    
    @Override
    public String getDescription() {
        return "Calculateur de scores basé sur la distance euclidienne pondérée";
    }
    
    @Override
    public boolean isEnabled() {
        return true; // Toujours activé par défaut
    }
    
    @Override
    public double calculate(UserProfileDTO userProfile, MajorProfileDTO majorProfile) {
        return calculateEuclideanDistance(userProfile, majorProfile);
    }
}
