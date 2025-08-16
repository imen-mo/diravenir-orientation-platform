package com.dira.diravenir1.dto;

/**
 * DTO pour le profil utilisateur calculé
 * Contient les 17 piliers normalisés sur 100
 */
public class UserProfileDTO {
    
    // Piliers d'Intérêts
    private int interetScientifiqueTech;
    private int interetArtistiqueCreatif;
    private int interetSocialHumain;
    private int interetBusinessGestion;
    private int interetLogiqueAnalytique;
    
    // Piliers de Compétences
    private int competenceResolutionProblemes;
    private int competenceCommunication;
    private int competenceOrganisation;
    private int competenceManuelTechnique;
    
    // Piliers de Valeurs / Motivations
    private int valeurImpactSocietal;
    private int valeurInnovationChallenge;
    private int valeurStabiliteSecurite;
    private int valeurAutonomie;
    
    // Piliers de Préférence de Travail / Personnalité
    private int prefTravailEquipeCollab;
    private int prefTravailAutonome;
    private int prefPratiqueTerrain;
    private int prefTheorieRecherche;

    // Constructeurs
    public UserProfileDTO() {}

    // Getters et Setters
    public int getInteretScientifiqueTech() { return interetScientifiqueTech; }
    public void setInteretScientifiqueTech(int interetScientifiqueTech) { this.interetScientifiqueTech = interetScientifiqueTech; }

    public int getInteretArtistiqueCreatif() { return interetArtistiqueCreatif; }
    public void setInteretArtistiqueCreatif(int interetArtistiqueCreatif) { this.interetArtistiqueCreatif = interetArtistiqueCreatif; }

    public int getInteretSocialHumain() { return interetSocialHumain; }
    public void setInteretSocialHumain(int interetSocialHumain) { this.interetSocialHumain = interetSocialHumain; }

    public int getInteretBusinessGestion() { return interetBusinessGestion; }
    public void setInteretBusinessGestion(int interetBusinessGestion) { this.interetBusinessGestion = interetBusinessGestion; }

    public int getInteretLogiqueAnalytique() { return interetLogiqueAnalytique; }
    public void setInteretLogiqueAnalytique(int interetLogiqueAnalytique) { this.interetLogiqueAnalytique = interetLogiqueAnalytique; }

    public int getCompetenceResolutionProblemes() { return competenceResolutionProblemes; }
    public void setCompetenceResolutionProblemes(int competenceResolutionProblemes) { this.competenceResolutionProblemes = competenceResolutionProblemes; }

    public int getCompetenceCommunication() { return competenceCommunication; }
    public void setCompetenceCommunication(int competenceCommunication) { this.competenceCommunication = competenceCommunication; }

    public int getCompetenceOrganisation() { return competenceOrganisation; }
    public void setCompetenceOrganisation(int competenceOrganisation) { this.competenceOrganisation = competenceOrganisation; }

    public int getCompetenceManuelTechnique() { return competenceManuelTechnique; }
    public void setCompetenceManuelTechnique(int competenceManuelTechnique) { this.competenceManuelTechnique = competenceManuelTechnique; }

    public int getValeurImpactSocietal() { return valeurImpactSocietal; }
    public void setValeurImpactSocietal(int valeurImpactSocietal) { this.valeurImpactSocietal = valeurImpactSocietal; }

    public int getValeurInnovationChallenge() { return valeurInnovationChallenge; }
    public void setValeurInnovationChallenge(int valeurInnovationChallenge) { this.valeurInnovationChallenge = valeurInnovationChallenge; }

    public int getValeurStabiliteSecurite() { return valeurStabiliteSecurite; }
    public void setValeurStabiliteSecurite(int valeurStabiliteSecurite) { this.valeurStabiliteSecurite = valeurStabiliteSecurite; }

    public int getValeurAutonomie() { return valeurAutonomie; }
    public void setValeurAutonomie(int valeurAutonomie) { this.valeurAutonomie = valeurAutonomie; }

    public int getPrefTravailEquipeCollab() { return prefTravailEquipeCollab; }
    public void setPrefTravailEquipeCollab(int prefTravailEquipeCollab) { this.prefTravailEquipeCollab = prefTravailEquipeCollab; }

    public int getPrefTravailAutonome() { return prefTravailAutonome; }
    public void setPrefTravailAutonome(int prefTravailAutonome) { this.prefTravailAutonome = prefTravailAutonome; }

    public int getPrefPratiqueTerrain() { return prefPratiqueTerrain; }
    public void setPrefPratiqueTerrain(int prefPratiqueTerrain) { this.prefPratiqueTerrain = prefPratiqueTerrain; }

    public int getPrefTheorieRecherche() { return prefTheorieRecherche; }
    public void setPrefTheorieRecherche(int prefTheorieRecherche) { this.prefTheorieRecherche = prefTheorieRecherche; }

    @Override
    public String toString() {
        return "UserProfileDTO{" +
                "interetScientifiqueTech=" + interetScientifiqueTech +
                ", interetArtistiqueCreatif=" + interetArtistiqueCreatif +
                ", interetSocialHumain=" + interetSocialHumain +
                ", interetBusinessGestion=" + interetBusinessGestion +
                ", interetLogiqueAnalytique=" + interetLogiqueAnalytique +
                ", competenceResolutionProblemes=" + competenceResolutionProblemes +
                ", competenceCommunication=" + competenceCommunication +
                ", competenceOrganisation=" + competenceOrganisation +
                ", competenceManuelTechnique=" + competenceManuelTechnique +
                ", valeurImpactSocietal=" + valeurImpactSocietal +
                ", valeurInnovationChallenge=" + valeurInnovationChallenge +
                ", valeurStabiliteSecurite=" + valeurStabiliteSecurite +
                ", valeurAutonomie=" + valeurAutonomie +
                ", prefTravailEquipeCollab=" + prefTravailEquipeCollab +
                ", prefTravailAutonome=" + prefTravailAutonome +
                ", prefPratiqueTerrain=" + prefPratiqueTerrain +
                ", prefTheorieRecherche=" + prefTheorieRecherche +
                '}';
    }
}
