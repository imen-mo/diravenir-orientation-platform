package com.dira.diravenir1.service.calculators;

import com.dira.diravenir1.dto.UserProfileDTO;
import com.dira.diravenir1.dto.MajorProfileDTO;
import com.dira.diravenir1.dto.MatchingResultDTO;
import com.dira.diravenir1.service.calculators.ScoreCalculator;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.Slf4j;
import java.util.List;
import java.util.ArrayList;

/**
 * Calculateur de score basé sur la correspondance des piliers critiques.
 * 
 * Ce calculateur respecte le principe OCP en étant extensible sans modification :
 * - Identifie les piliers critiques pour chaque type de majeure
 * - Calcule la correspondance spécifique sur ces piliers
 * - Applique des pénalités pour les incompatibilités critiques
 * 
 * Avantages :
 * - Met l'accent sur les exigences essentielles
 * - Évite les mauvaises correspondances critiques
 * - Prend en compte les spécificités des domaines
 * 
 * Inconvénients :
 * - Nécessite une définition précise des piliers critiques
 * - Peut être trop strict dans certains cas
 */
@Component
@Slf4j
public class CriticalPillarCalculator implements ScoreCalculator {
    
    @Override
    public List<MatchingResultDTO> calculateMatchingScores(UserProfileDTO userProfile, List<MajorProfileDTO> majorProfiles) {
        List<MatchingResultDTO> results = new ArrayList<>();
        
        for (MajorProfileDTO majorProfile : majorProfiles) {
            try {
                log.debug("🔑 Analyse des piliers critiques pour {}", majorProfile.getProgram());
                
                // Récupération des scores des piliers
                int[] userScores = getUserPillarScores(userProfile);
                int[] majorScores = getMajorPillarScores(majorProfile);
                
                // Identification des piliers critiques pour cette majeure
                int[] criticalPillars = getCriticalPillarsForMajor(majorProfile.getProgram());
                
                if (criticalPillars.length == 0) {
                    log.debug("⚠️ Aucun pilier critique défini pour {}, score neutre", majorProfile.getProgram());
                    // Score neutre si pas de piliers critiques
                    MatchingResultDTO neutralResult = MatchingResultDTO.builder()
                        .majorId(majorProfile.getMajorId())
                        .program(majorProfile.getProgram())
                        .category(majorProfile.getCategory())
                        .matchingScore(50.0)
                        .calculationMethod("Critical Pillar (Neutral)")
                        .algorithmVersion("2.0")
                        .build();
                    results.add(neutralResult);
                    continue;
                }
                
                // Calcul du score des piliers critiques
                double criticalScore = calculateCriticalPillarScore(userScores, majorScores, criticalPillars);
                
                // Application des pénalités pour incompatibilités majeures
                double penaltyScore = calculatePenaltyScore(userScores, majorScores, criticalPillars);
                
                // Score final avec pénalités
                double finalScore = Math.max(0.0, criticalScore - penaltyScore);
                
                // Conversion en score sur 100
                double score100 = finalScore * 100;
                
                log.debug("🎯 Score piliers critiques : {:.1f}%, Pénalités : {:.1f}%, Final : {:.1f}%", 
                    criticalScore * 100, penaltyScore * 100, score100);
                
                // Création du résultat
                MatchingResultDTO result = MatchingResultDTO.builder()
                    .majorId(majorProfile.getMajorId())
                    .program(majorProfile.getProgram())
                    .category(majorProfile.getCategory())
                    .matchingScore(score100)
                    .calculationMethod("Critical Pillar")
                    .algorithmVersion("2.0")
                    .build();
                
                results.add(result);
                
            } catch (Exception e) {
                log.error("❌ Erreur lors de l'analyse des piliers critiques pour {} : {}", 
                    majorProfile.getProgram(), e.getMessage(), e);
                
                // Résultat par défaut en cas d'erreur
                MatchingResultDTO errorResult = MatchingResultDTO.builder()
                    .majorId(majorProfile.getMajorId())
                    .program(majorProfile.getProgram())
                    .category(majorProfile.getCategory())
                    .matchingScore(0.0)
                    .calculationMethod("Critical Pillar (Error)")
                    .algorithmVersion("2.0")
                    .build();
                
                results.add(errorResult);
            }
        }
        
        // Tri par score décroissant
        results.sort((a, b) -> Double.compare(b.getMatchingScore(), a.getMatchingScore()));
        
        return results;
    }
    
    /**
     * Calcule le score des piliers critiques
     */
    private double calculateCriticalPillarScore(int[] userScores, int[] majorScores, int[] criticalPillars) {
        double totalScore = 0.0;
        int validPillars = 0;
        
        for (int pillarIndex : criticalPillars) {
            if (pillarIndex >= 0 && pillarIndex < userScores.length && pillarIndex < majorScores.length) {
                double pillarScore = calculatePillarCorrespondence(
                    userScores[pillarIndex], 
                    majorScores[pillarIndex]
                );
                totalScore += pillarScore;
                validPillars++;
            }
        }
        
        return validPillars > 0 ? totalScore / validPillars : 0.0;
    }
    
    /**
     * Calcule les pénalités pour incompatibilités majeures
     */
    private double calculatePenaltyScore(int[] userScores, int[] majorScores, int[] criticalPillars) {
        double totalPenalty = 0.0;
        int criticalMismatches = 0;
        
        for (int pillarIndex : criticalPillars) {
            if (pillarIndex >= 0 && pillarIndex < userScores.length && pillarIndex < majorScores.length) {
                int userScore = userScores[pillarIndex];
                int majorScore = majorScores[pillarIndex];
                
                // Pénalité pour incompatibilité critique
                if (isCriticalMismatch(userScore, majorScore)) {
                    totalPenalty += 0.3; // Pénalité de 30%
                    criticalMismatches++;
                }
            }
        }
        
        // Pénalité supplémentaire si plusieurs incompatibilités critiques
        if (criticalMismatches > 1) {
            totalPenalty += 0.2; // Pénalité supplémentaire de 20%
        }
        
        return Math.min(0.8, totalPenalty); // Pénalité maximale de 80%
    }
    
    /**
     * Détermine si une incompatibilité est critique
     */
    private boolean isCriticalMismatch(int userScore, int majorScore) {
        int diff = Math.abs(userScore - majorScore);
        
        // Incompatibilité critique si :
        // - L'utilisateur a un score très bas (1-2) pour un pilier important (4-5)
        // - L'utilisateur a un score très haut (4-5) pour un pilier non-important (1-2)
        if (diff >= 3) {
            if ((userScore <= 2 && majorScore >= 4) || (userScore >= 4 && majorScore <= 2)) {
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * Calcule la correspondance pour un pilier spécifique
     */
    private double calculatePillarCorrespondence(int userScore, int majorScore) {
        int diff = Math.abs(userScore - majorScore);
        
        if (diff == 0) return 1.0;      // Correspondance parfaite
        if (diff == 1) return 0.9;      // Très proche
        if (diff == 2) return 0.7;      // Proche
        if (diff == 3) return 0.4;      // Éloigné
        return 0.1;                      // Très éloigné
    }
    
    /**
     * Définit les piliers critiques pour chaque type de majeure
     * 
     * Les piliers sont indexés comme suit :
     * 0: Scientifique/Tech, 1: Artistique/Créatif, 2: Social/Humain, 3: Business/Gestion
     * 4: Logique/Analytique, 5: Résolution problèmes, 6: Communication, 7: Organisation
     * 8: Manuel/Technique, 9: Impact sociétal, 10: Innovation/Challenge, 11: Stabilité/Sécurité
     * 12: Autonomie, 13: Travail équipe, 14: Travail autonome, 15: Pratique/Terrain, 16: Théorie/Recherche
     */
    private int[] getCriticalPillarsForMajor(String majorName) {
        if (majorName == null) return new int[0];
        
        String majorLower = majorName.toLowerCase();
        
        // Informatique et technologies
        if (majorLower.contains("informatique") || majorLower.contains("computer") || 
            majorLower.contains("software") || majorLower.contains("programming")) {
            return new int[]{0, 4, 5, 8}; // Scientifique, Logique, Résolution, Manuel
        }
        
        // Arts et design
        if (majorLower.contains("art") || majorLower.contains("design") || 
            majorLower.contains("créatif") || majorLower.contains("artistique")) {
            return new int[]{1, 8, 10, 15}; // Artistique, Manuel, Innovation, Pratique
        }
        
        // Business et gestion
        if (majorLower.contains("business") || majorLower.contains("gestion") || 
            majorLower.contains("management") || majorLower.contains("commerce")) {
            return new int[]{3, 6, 7, 13}; // Business, Communication, Organisation, Équipe
        }
        
        // Médecine et santé
        if (majorLower.contains("médecine") || majorLower.contains("santé") || 
            majorLower.contains("medical") || majorLower.contains("health")) {
            return new int[]{2, 6, 9, 15}; // Social, Communication, Impact sociétal, Pratique
        }
        
        // Ingénierie
        if (majorLower.contains("ingénieur") || majorLower.contains("engineering") || 
            majorLower.contains("génie")) {
            return new int[]{0, 4, 5, 8}; // Scientifique, Logique, Résolution, Manuel
        }
        
        // Sciences sociales
        if (majorLower.contains("psychologie") || majorLower.contains("sociologie") || 
            majorLower.contains("anthropologie")) {
            return new int[]{2, 6, 9, 16}; // Social, Communication, Impact sociétal, Théorie
        }
        
        // Sciences naturelles
        if (majorLower.contains("biologie") || majorLower.contains("chimie") || 
            majorLower.contains("physique") || majorLower.contains("mathématiques")) {
            return new int[]{0, 4, 5, 16}; // Scientifique, Logique, Résolution, Théorie
        }
        
        // Communication et médias
        if (majorLower.contains("communication") || majorLower.contains("journalisme") || 
            majorLower.contains("médias")) {
            return new int[]{1, 6, 10, 15}; // Artistique, Communication, Innovation, Pratique
        }
        
        // Éducation et formation
        if (majorLower.contains("éducation") || majorLower.contains("enseignement") || 
            majorLower.contains("formation")) {
            return new int[]{2, 6, 9, 13}; // Social, Communication, Impact sociétal, Équipe
        }
        
        // Architecture et urbanisme
        if (majorLower.contains("architecture") || majorLower.contains("urbanisme")) {
            return new int[]{0, 1, 8, 15}; // Scientifique, Artistique, Manuel, Pratique
        }
        
        return new int[0]; // Pas de piliers critiques spécifiques
    }
    
    /**
     * Extrait les scores des piliers du profil utilisateur
     */
    private int[] getUserPillarScores(UserProfileDTO userProfile) {
        return new int[]{
            userProfile.getInteretScientifiqueTech(),
            userProfile.getInteretArtistiqueCreatif(),
            userProfile.getInteretSocialHumain(),
            userProfile.getInteretBusinessGestion(),
            userProfile.getInteretLogiqueAnalytique(),
            userProfile.getCompetenceResolutionProblemes(),
            userProfile.getCompetenceCommunication(),
            userProfile.getCompetenceOrganisation(),
            userProfile.getCompetenceManuelTechnique(),
            userProfile.getValeurImpactSocietal(),
            userProfile.getValeurInnovationChallenge(),
            userProfile.getValeurStabiliteSecurite(),
            userProfile.getValeurAutonomie(),
            userProfile.getPrefTravailEquipeCollab(),
            userProfile.getPrefTravailAutonome(),
            userProfile.getPrefPratiqueTerrain(),
            userProfile.getPrefTheorieRecherche()
        };
    }
    
    /**
     * Extrait les scores des piliers du profil majeure
     */
    private int[] getMajorPillarScores(MajorProfileDTO majorProfile) {
        return new int[]{
            majorProfile.getInteretScientifiqueTech(),
            majorProfile.getInteretArtistiqueCreatif(),
            majorProfile.getInteretSocialHumain(),
            majorProfile.getInteretBusinessGestion(),
            majorProfile.getInteretLogiqueAnalytique(),
            majorProfile.getCompetenceResolutionProblemes(),
            majorProfile.getCompetenceCommunication(),
            majorProfile.getCompetenceOrganisation(),
            majorProfile.getCompetenceManuelTechnique(),
            majorProfile.getValeurImpactSocietal(),
            majorProfile.getValeurInnovationChallenge(),
            majorProfile.getValeurStabiliteSecurite(),
            majorProfile.getValeurAutonomie(),
            majorProfile.getPrefTravailEquipeCollab(),
            majorProfile.getPrefTravailAutonome(),
            majorProfile.getPrefPratiqueTerrain(),
            majorProfile.getPrefTheorieRecherche()
        };
    }
    
    @Override
    public String getAlgorithmName() {
        return "Critical Pillar Calculator";
    }
    
    @Override
    public String getAlgorithmVersion() {
        return "2.0";
    }
    
    @Override
    public String getCalculatorName() {
        return "CriticalPillarCalculator";
    }
    
    @Override
    public double getWeight() {
        return 0.6; // Poids pour les piliers critiques
    }
    
    @Override
    public String getDescription() {
        return "Calculateur basé sur l'analyse des piliers critiques";
    }
    
    @Override
    public boolean isEnabled() {
        return true; // Toujours activé
    }
    
    @Override
    public double calculate(UserProfileDTO userProfile, MajorProfileDTO majorProfile) {
        try {
            // Récupération des scores des piliers
            int[] userScores = getUserPillarScores(userProfile);
            int[] majorScores = getMajorPillarScores(majorProfile);
            
            // Identification des piliers critiques pour cette majeure
            int[] criticalPillars = getCriticalPillarsForMajor(majorProfile.getProgram());
            
            if (criticalPillars.length == 0) {
                return 50.0; // Score neutre si pas de piliers critiques
            }
            
            // Calcul du score des piliers critiques
            double criticalScore = calculateCriticalPillarScore(userScores, majorScores, criticalPillars);
            
            // Application des pénalités pour incompatibilités majeures
            double penaltyScore = calculatePenaltyScore(userScores, majorScores, criticalPillars);
            
            // Score final avec pénalités
            double finalScore = Math.max(0.0, criticalScore - penaltyScore);
            
            // Conversion en score sur 100
            return finalScore * 100;
            
        } catch (Exception e) {
            log.error("❌ Erreur lors du calcul pour {} : {}", 
                majorProfile.getProgram(), e.getMessage(), e);
            return 0.0;
        }
    }
}
