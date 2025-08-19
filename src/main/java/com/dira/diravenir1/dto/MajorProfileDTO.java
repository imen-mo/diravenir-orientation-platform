package com.dira.diravenir1.dto;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * DTO représentant le profil idéal d'une majeure
 * Contient les scores sur 100 pour chacun des 17 piliers
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MajorProfileDTO {
    
    // Identifiant de la majeure
    private String majorId;
    private String majorName;
    private String majorCategory; // TECHNIQUE, BUSINESS, SOCIAL, etc.
    
    // Piliers d'Intérêts (5 piliers)
    private int interetScientifiqueTech;        // 0-100
    private int interetArtistiqueCreatif;       // 0-100
    private int interetSocialHumain;            // 0-100
    private int interetBusinessGestion;         // 0-100
    private int interetLogiqueAnalytique;       // 0-100
    
    // Piliers de Compétences (4 piliers)
    private int competenceResolutionProblemes;  // 0-100
    private int competenceCommunication;        // 0-100
    private int competenceOrganisation;         // 0-100
    private int competenceManuelTechnique;      // 0-100
    
    // Piliers de Valeurs/Motivations (4 piliers)
    private int valeurImpactSocietal;           // 0-100
    private int valeurInnovationChallenge;      // 0-100
    private int valeurStabiliteSecurite;        // 0-100
    private int valeurAutonomie;                // 0-100
    
    // Piliers de Préférence de Travail/Personnalité (4 piliers)
    private int prefTravailEquipeCollab;       // 0-100
    private int prefTravailAutonome;           // 0-100
    private int prefPratiqueTerrain;           // 0-100
    private int prefTheorieRecherche;          // 0-100
    
    /**
     * Retourne le score d'un pilier par son nom
     * 
     * @param pillarName Nom du pilier
     * @return Score du pilier (0-100) ou -1 si pilier non trouvé
     */
    public int getPillarScore(String pillarName) {
        switch (pillarName.toLowerCase().replaceAll("[^a-zA-Z0-9]", "")) {
            case "interetscientifiquetech":
                return interetScientifiqueTech;
            case "interetartistiquecreatif":
                return interetArtistiqueCreatif;
            case "interetsocialhumain":
                return interetSocialHumain;
            case "interetbusinessgestion":
                return interetBusinessGestion;
            case "interetlogiqueanalytique":
                return interetLogiqueAnalytique;
            case "competenceresolutionproblemes":
                return competenceResolutionProblemes;
            case "competencecommunication":
                return competenceCommunication;
            case "competenceorganisation":
                return competenceOrganisation;
            case "competencemanueltechnique":
                return competenceManuelTechnique;
            case "valeuimpactsocietal":
                return valeurImpactSocietal;
            case "valeurinnovationchallenge":
                return valeurInnovationChallenge;
            case "valeurstabilitesecurite":
                return valeurStabiliteSecurite;
            case "valeurautonomie":
                return valeurAutonomie;
            case "preftravailequipcollab":
                return prefTravailEquipeCollab;
            case "preftravailautonome":
                return prefTravailAutonome;
            case "prefpratiqueterrain":
                return prefPratiqueTerrain;
            case "preftheorierecherche":
                return prefTheorieRecherche;
            default:
                return -1;
        }
    }
    
    /**
     * Retourne tous les scores des piliers dans un tableau
     * 
     * @return Tableau des 17 scores des piliers
     */
    public int[] getAllPillarScores() {
        return new int[]{
            interetScientifiqueTech,
            interetArtistiqueCreatif,
            interetSocialHumain,
            interetBusinessGestion,
            interetLogiqueAnalytique,
            competenceResolutionProblemes,
            competenceCommunication,
            competenceOrganisation,
            competenceManuelTechnique,
            valeurImpactSocietal,
            valeurInnovationChallenge,
            valeurStabiliteSecurite,
            valeurAutonomie,
            prefTravailEquipeCollab,
            prefTravailAutonome,
            prefPratiqueTerrain,
            prefTheorieRecherche
        };
    }
    
    /**
     * Vérifie si le profil est valide (tous les scores entre 0-100)
     * 
     * @return true si le profil est valide, false sinon
     */
    public boolean isValid() {
        int[] scores = getAllPillarScores();
        for (int score : scores) {
            if (score < 0 || score > 100) {
                return false;
            }
        }
        return true;
    }
    
    /**
     * Retourne le score moyen de tous les piliers
     * 
     * @return Score moyen (0-100)
     */
    public double getAverageScore() {
        int[] scores = getAllPillarScores();
        int sum = 0;
        for (int score : scores) {
            sum += score;
        }
        return (double) sum / scores.length;
    }
}
