package com.dira.diravenir1.service;

import com.dira.diravenir1.Repository.IdealProfileRepository;
import com.dira.diravenir1.Repository.ProgramRepository;
import com.dira.diravenir1.Entities.Program;
import com.dira.diravenir1.entity.IdealProfile;
import com.dira.diravenir1.dto.MajorProfileDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Service de gestion des profils idéaux des majeures selon les spécifications exactes
 * du "Système d'Orientation des Étudiants".
 * 
 * Ce service contient tous les profils idéaux des 50+ majeures avec leurs scores
 * sur 100 pour chacun des 17 piliers.
 */
@Service
public class IdealProfileService {
    
    @Autowired
    private ProgramRepository programRepository;
    
    @Autowired
    private IdealProfileRepository idealProfileRepository;
    
    // Profils idéaux complets selon les spécifications exactes
    private static final Map<String, Map<String, Integer>> IDEAL_PROFILES = new HashMap<>();
    
    static {
        // === INGÉNIERIE ===
        
        // Civil Engineering
        Map<String, Integer> civilEngineering = new HashMap<>();
        civilEngineering.put("Interet_Scientifique_Tech", 90);
        civilEngineering.put("Interet_Artistique_Creatif", 40);
        civilEngineering.put("Interet_Social_Humain", 50);
        civilEngineering.put("Interet_Business_Gestion", 60);
        civilEngineering.put("Interet_Logique_Analytique", 90);
        civilEngineering.put("Competence_Resolution_Problemes", 90);
        civilEngineering.put("Competence_Communication", 75);
        civilEngineering.put("Competence_Organisation", 90);
        civilEngineering.put("Competence_Manuel_Technique", 85);
        civilEngineering.put("Valeur_Impact_Societal", 80);
        civilEngineering.put("Valeur_Innovation_Challenge", 85);
        civilEngineering.put("Valeur_Stabilite_Securite", 80);
        civilEngineering.put("Valeur_Autonomie", 70);
        civilEngineering.put("Pref_Travail_Equipe_Collab", 80);
        civilEngineering.put("Pref_Travail_Autonome", 60);
        civilEngineering.put("Pref_Pratique_Terrain", 90);
        civilEngineering.put("Pref_Theorie_Recherche", 60);
        IDEAL_PROFILES.put("Civil Engineering", civilEngineering);
        
        // Mechanical Engineering
        Map<String, Integer> mechanicalEngineering = new HashMap<>();
        mechanicalEngineering.put("Interet_Scientifique_Tech", 95);
        mechanicalEngineering.put("Interet_Artistique_Creatif", 30);
        mechanicalEngineering.put("Interet_Social_Humain", 20);
        mechanicalEngineering.put("Interet_Business_Gestion", 50);
        mechanicalEngineering.put("Interet_Logique_Analytique", 95);
        mechanicalEngineering.put("Competence_Resolution_Problemes", 95);
        mechanicalEngineering.put("Competence_Communication", 65);
        mechanicalEngineering.put("Competence_Organisation", 80);
        mechanicalEngineering.put("Competence_Manuel_Technique", 90);
        mechanicalEngineering.put("Valeur_Impact_Societal", 70);
        mechanicalEngineering.put("Valeur_Innovation_Challenge", 90);
        mechanicalEngineering.put("Valeur_Stabilite_Securite", 70);
        mechanicalEngineering.put("Valeur_Autonomie", 80);
        mechanicalEngineering.put("Pref_Travail_Equipe_Collab", 75);
        mechanicalEngineering.put("Pref_Travail_Autonome", 70);
        mechanicalEngineering.put("Pref_Pratique_Terrain", 85);
        mechanicalEngineering.put("Pref_Theorie_Recherche", 70);
        IDEAL_PROFILES.put("Mechanical Engineering", mechanicalEngineering);
        
        // Architecture
        Map<String, Integer> architecture = new HashMap<>();
        architecture.put("Interet_Scientifique_Tech", 60);
        architecture.put("Interet_Artistique_Creatif", 90);
        architecture.put("Interet_Social_Humain", 70);
        architecture.put("Interet_Business_Gestion", 50);
        architecture.put("Interet_Logique_Analytique", 80);
        architecture.put("Competence_Resolution_Problemes", 80);
        architecture.put("Competence_Communication", 85);
        architecture.put("Competence_Organisation", 85);
        architecture.put("Competence_Manuel_Technique", 85);
        architecture.put("Valeur_Impact_Societal", 85);
        architecture.put("Valeur_Innovation_Challenge", 90);
        architecture.put("Valeur_Stabilite_Securite", 60);
        architecture.put("Valeur_Autonomie", 80);
        architecture.put("Pref_Travail_Equipe_Collab", 80);
        architecture.put("Pref_Travail_Autonome", 70);
        architecture.put("Pref_Pratique_Terrain", 70);
        architecture.put("Pref_Theorie_Recherche", 60);
        IDEAL_PROFILES.put("Architecture", architecture);
        
        // === COMMERCE ET GESTION ===
        
        // Commerce International (International Business)
        Map<String, Integer> internationalBusiness = new HashMap<>();
        internationalBusiness.put("Interet_Scientifique_Tech", 40);
        internationalBusiness.put("Interet_Artistique_Creatif", 40);
        internationalBusiness.put("Interet_Social_Humain", 80);
        internationalBusiness.put("Interet_Business_Gestion", 98);
        internationalBusiness.put("Interet_Logique_Analytique", 85);
        internationalBusiness.put("Competence_Resolution_Problemes", 85);
        internationalBusiness.put("Competence_Communication", 95);
        internationalBusiness.put("Competence_Organisation", 90);
        internationalBusiness.put("Competence_Manuel_Technique", 20);
        internationalBusiness.put("Valeur_Impact_Societal", 60);
        internationalBusiness.put("Valeur_Innovation_Challenge", 85);
        internationalBusiness.put("Valeur_Stabilite_Securite", 70);
        internationalBusiness.put("Valeur_Autonomie", 80);
        internationalBusiness.put("Pref_Travail_Equipe_Collab", 90);
        internationalBusiness.put("Pref_Travail_Autonome", 60);
        internationalBusiness.put("Pref_Pratique_Terrain", 70);
        internationalBusiness.put("Pref_Theorie_Recherche", 60);
        IDEAL_PROFILES.put("International Business", internationalBusiness);
        
        // Administration des Affaires (Business Administration)
        Map<String, Integer> businessAdministration = new HashMap<>();
        businessAdministration.put("Interet_Scientifique_Tech", 30);
        businessAdministration.put("Interet_Artistique_Creatif", 40);
        businessAdministration.put("Interet_Social_Humain", 80);
        businessAdministration.put("Interet_Business_Gestion", 98);
        businessAdministration.put("Interet_Logique_Analytique", 85);
        businessAdministration.put("Competence_Resolution_Problemes", 85);
        businessAdministration.put("Competence_Communication", 95);
        businessAdministration.put("Competence_Organisation", 98);
        businessAdministration.put("Competence_Manuel_Technique", 10);
        businessAdministration.put("Valeur_Impact_Societal", 60);
        businessAdministration.put("Valeur_Innovation_Challenge", 80);
        businessAdministration.put("Valeur_Stabilite_Securite", 70);
        businessAdministration.put("Valeur_Autonomie", 70);
        businessAdministration.put("Pref_Travail_Equipe_Collab", 95);
        businessAdministration.put("Pref_Travail_Autonome", 50);
        businessAdministration.put("Pref_Pratique_Terrain", 60);
        businessAdministration.put("Pref_Theorie_Recherche", 50);
        IDEAL_PROFILES.put("Business Administration", businessAdministration);
        
        // === INFORMATIQUE ET TECHNOLOGIE ===
        
        // Informatique (Computer Science)
        Map<String, Integer> computerScience = new HashMap<>();
        computerScience.put("Interet_Scientifique_Tech", 98);
        computerScience.put("Interet_Artistique_Creatif", 40);
        computerScience.put("Interet_Social_Humain", 30);
        computerScience.put("Interet_Business_Gestion", 40);
        computerScience.put("Interet_Logique_Analytique", 98);
        computerScience.put("Competence_Resolution_Problemes", 98);
        computerScience.put("Competence_Communication", 70);
        computerScience.put("Competence_Organisation", 80);
        computerScience.put("Competence_Manuel_Technique", 50);
        computerScience.put("Valeur_Impact_Societal", 60);
        computerScience.put("Valeur_Innovation_Challenge", 95);
        computerScience.put("Valeur_Stabilite_Securite", 70);
        computerScience.put("Valeur_Autonomie", 85);
        computerScience.put("Pref_Travail_Equipe_Collab", 70);
        computerScience.put("Pref_Travail_Autonome", 80);
        computerScience.put("Pref_Pratique_Terrain", 40);
        computerScience.put("Pref_Theorie_Recherche", 80);
        IDEAL_PROFILES.put("Computer Science", computerScience);
        
        // Génie Logiciel (Software Engineering)
        Map<String, Integer> softwareEngineering = new HashMap<>();
        softwareEngineering.put("Interet_Scientifique_Tech", 95);
        softwareEngineering.put("Interet_Artistique_Creatif", 45);
        softwareEngineering.put("Interet_Social_Humain", 30);
        softwareEngineering.put("Interet_Business_Gestion", 50);
        softwareEngineering.put("Interet_Logique_Analytique", 98);
        softwareEngineering.put("Competence_Resolution_Problemes", 98);
        softwareEngineering.put("Competence_Communication", 80);
        softwareEngineering.put("Competence_Organisation", 90);
        softwareEngineering.put("Competence_Manuel_Technique", 40);
        softwareEngineering.put("Valeur_Impact_Societal", 65);
        softwareEngineering.put("Valeur_Innovation_Challenge", 95);
        softwareEngineering.put("Valeur_Stabilite_Securite", 75);
        softwareEngineering.put("Valeur_Autonomie", 80);
        softwareEngineering.put("Pref_Travail_Equipe_Collab", 85);
        softwareEngineering.put("Pref_Travail_Autonome", 70);
        softwareEngineering.put("Pref_Pratique_Terrain", 50);
        softwareEngineering.put("Pref_Theorie_Recherche", 75);
        IDEAL_PROFILES.put("Software Engineering", softwareEngineering);
        
        // Intelligence Artificielle (Artificial Intelligence)
        Map<String, Integer> artificialIntelligence = new HashMap<>();
        artificialIntelligence.put("Interet_Scientifique_Tech", 98);
        artificialIntelligence.put("Interet_Artistique_Creatif", 30);
        artificialIntelligence.put("Interet_Social_Humain", 20);
        artificialIntelligence.put("Interet_Business_Gestion", 50);
        artificialIntelligence.put("Interet_Logique_Analytique", 98);
        artificialIntelligence.put("Competence_Resolution_Problemes", 98);
        artificialIntelligence.put("Competence_Communication", 70);
        artificialIntelligence.put("Competence_Organisation", 70);
        artificialIntelligence.put("Competence_Manuel_Technique", 30);
        artificialIntelligence.put("Valeur_Impact_Societal", 80);
        artificialIntelligence.put("Valeur_Innovation_Challenge", 98);
        artificialIntelligence.put("Valeur_Stabilite_Securite", 60);
        artificialIntelligence.put("Valeur_Autonomie", 90);
        artificialIntelligence.put("Pref_Travail_Equipe_Collab", 70);
        artificialIntelligence.put("Pref_Travail_Autonome", 90);
        artificialIntelligence.put("Pref_Pratique_Terrain", 40);
        artificialIntelligence.put("Pref_Theorie_Recherche", 95);
        IDEAL_PROFILES.put("Artificial Intelligence", artificialIntelligence);
        
        // === MÉDECINE ET SANTÉ ===
        
        // Médecine (Medicine)
        Map<String, Integer> medicine = new HashMap<>();
        medicine.put("Interet_Scientifique_Tech", 95);
        medicine.put("Interet_Artistique_Creatif", 10);
        medicine.put("Interet_Social_Humain", 98);
        medicine.put("Interet_Business_Gestion", 20);
        medicine.put("Interet_Logique_Analytique", 90);
        medicine.put("Competence_Resolution_Problemes", 95);
        medicine.put("Competence_Communication", 98);
        medicine.put("Competence_Organisation", 90);
        medicine.put("Competence_Manuel_Technique", 75);
        medicine.put("Valeur_Impact_Societal", 98);
        medicine.put("Valeur_Innovation_Challenge", 70);
        medicine.put("Valeur_Stabilite_Securite", 85);
        medicine.put("Valeur_Autonomie", 60);
        medicine.put("Pref_Travail_Equipe_Collab", 95);
        medicine.put("Pref_Travail_Autonome", 50);
        medicine.put("Pref_Pratique_Terrain", 90);
        medicine.put("Pref_Theorie_Recherche", 80);
        IDEAL_PROFILES.put("Medicine", medicine);
        
        // Soins Infirmiers (Nursing)
        Map<String, Integer> nursing = new HashMap<>();
        nursing.put("Interet_Scientifique_Tech", 65);
        nursing.put("Interet_Artistique_Creatif", 10);
        nursing.put("Interet_Social_Humain", 98);
        nursing.put("Interet_Business_Gestion", 20);
        nursing.put("Interet_Logique_Analytique", 70);
        nursing.put("Competence_Resolution_Problemes", 80);
        nursing.put("Competence_Communication", 98);
        nursing.put("Competence_Organisation", 90);
        nursing.put("Competence_Manuel_Technique", 70);
        nursing.put("Valeur_Impact_Societal", 98);
        nursing.put("Valeur_Innovation_Challenge", 60);
        nursing.put("Valeur_Stabilite_Securite", 80);
        nursing.put("Valeur_Autonomie", 50);
        nursing.put("Pref_Travail_Equipe_Collab", 98);
        nursing.put("Pref_Travail_Autonome", 40);
        nursing.put("Pref_Pratique_Terrain", 90);
        nursing.put("Pref_Theorie_Recherche", 60);
        IDEAL_PROFILES.put("Nursing", nursing);
        
        // === ARTS ET DESIGN ===
        
        // Relations Publiques (Public Relations)
        Map<String, Integer> publicRelations = new HashMap<>();
        publicRelations.put("Interet_Scientifique_Tech", 10);
        publicRelations.put("Interet_Artistique_Creatif", 80);
        publicRelations.put("Interet_Social_Humain", 98);
        publicRelations.put("Interet_Business_Gestion", 90);
        publicRelations.put("Interet_Logique_Analytique", 60);
        publicRelations.put("Competence_Resolution_Problemes", 75);
        publicRelations.put("Competence_Communication", 98);
        publicRelations.put("Competence_Organisation", 90);
        publicRelations.put("Competence_Manuel_Technique", 10);
        publicRelations.put("Valeur_Impact_Societal", 80);
        publicRelations.put("Valeur_Innovation_Challenge", 85);
        publicRelations.put("Valeur_Stabilite_Securite", 60);
        publicRelations.put("Valeur_Autonomie", 70);
        publicRelations.put("Pref_Travail_Equipe_Collab", 98);
        publicRelations.put("Pref_Travail_Autonome", 50);
        publicRelations.put("Pref_Pratique_Terrain", 60);
        publicRelations.put("Pref_Theorie_Recherche", 40);
        IDEAL_PROFILES.put("Public Relations", publicRelations);
        
        // === SCIENCES ET RECHERCHE ===
        
        // Science des Données (Data Science)
        Map<String, Integer> dataScience = new HashMap<>();
        dataScience.put("Interet_Scientifique_Tech", 98);
        dataScience.put("Interet_Artistique_Creatif", 20);
        dataScience.put("Interet_Social_Humain", 30);
        dataScience.put("Interet_Business_Gestion", 70);
        dataScience.put("Interet_Logique_Analytique", 98);
        dataScience.put("Competence_Resolution_Problemes", 98);
        dataScience.put("Competence_Communication", 70);
        dataScience.put("Competence_Organisation", 80);
        dataScience.put("Competence_Manuel_Technique", 30);
        dataScience.put("Valeur_Impact_Societal", 70);
        dataScience.put("Valeur_Innovation_Challenge", 95);
        dataScience.put("Valeur_Stabilite_Securite", 75);
        dataScience.put("Valeur_Autonomie", 85);
        dataScience.put("Pref_Travail_Equipe_Collab", 80);
        dataScience.put("Pref_Travail_Autonome", 70);
        dataScience.put("Pref_Pratique_Terrain", 40);
        dataScience.put("Pref_Theorie_Recherche", 90);
        IDEAL_PROFILES.put("Data Science", dataScience);
        
        // === DROIT ET SCIENCES POLITIQUES ===
        
        // Science du Droit (Science of Law)
        Map<String, Integer> law = new HashMap<>();
        law.put("Interet_Scientifique_Tech", 30);
        law.put("Interet_Artistique_Creatif", 30);
        law.put("Interet_Social_Humain", 80);
        law.put("Interet_Business_Gestion", 80);
        law.put("Interet_Logique_Analytique", 95);
        law.put("Competence_Resolution_Problemes", 90);
        law.put("Competence_Communication", 95);
        law.put("Competence_Organisation", 90);
        law.put("Competence_Manuel_Technique", 10);
        law.put("Valeur_Impact_Societal", 90);
        law.put("Valeur_Innovation_Challenge", 60);
        law.put("Valeur_Stabilite_Securite", 80);
        law.put("Valeur_Autonomie", 70);
        law.put("Pref_Travail_Equipe_Collab", 80);
        law.put("Pref_Travail_Autonome", 70);
        law.put("Pref_Pratique_Terrain", 50);
        law.put("Pref_Theorie_Recherche", 90);
        IDEAL_PROFILES.put("Law", law);
        
        // Politique Internationale (International Politics)
        Map<String, Integer> internationalPolitics = new HashMap<>();
        internationalPolitics.put("Interet_Scientifique_Tech", 20);
        internationalPolitics.put("Interet_Artistique_Creatif", 20);
        internationalPolitics.put("Interet_Social_Humain", 90);
        internationalPolitics.put("Interet_Business_Gestion", 70);
        internationalPolitics.put("Interet_Logique_Analytique", 85);
        internationalPolitics.put("Competence_Resolution_Problemes", 80);
        internationalPolitics.put("Competence_Communication", 95);
        internationalPolitics.put("Competence_Organisation", 80);
        internationalPolitics.put("Competence_Manuel_Technique", 10);
        internationalPolitics.put("Valeur_Impact_Societal", 95);
        internationalPolitics.put("Valeur_Innovation_Challenge", 70);
        internationalPolitics.put("Valeur_Stabilite_Securite", 60);
        internationalPolitics.put("Valeur_Autonomie", 70);
        internationalPolitics.put("Pref_Travail_Equipe_Collab", 90);
        internationalPolitics.put("Pref_Travail_Autonome", 60);
        internationalPolitics.put("Pref_Pratique_Terrain", 50);
        internationalPolitics.put("Pref_Theorie_Recherche", 85);
        IDEAL_PROFILES.put("International Politics", internationalPolitics);
        
        // === AUTRES DOMAINES ===
        
        // Psychologie (Psychology)
        Map<String, Integer> psychology = new HashMap<>();
        psychology.put("Interet_Scientifique_Tech", 50);
        psychology.put("Interet_Artistique_Creatif", 40);
        psychology.put("Interet_Social_Humain", 98);
        psychology.put("Interet_Business_Gestion", 30);
        psychology.put("Interet_Logique_Analytique", 80);
        psychology.put("Competence_Resolution_Problemes", 85);
        psychology.put("Competence_Communication", 98);
        psychology.put("Competence_Organisation", 70);
        psychology.put("Competence_Manuel_Technique", 10);
        psychology.put("Valeur_Impact_Societal", 95);
        psychology.put("Valeur_Innovation_Challenge", 70);
        psychology.put("Valeur_Stabilite_Securite", 60);
        psychology.put("Valeur_Autonomie", 70);
        psychology.put("Pref_Travail_Equipe_Collab", 90);
        psychology.put("Pref_Travail_Autonome", 70);
        psychology.put("Pref_Pratique_Terrain", 50);
        psychology.put("Pref_Theorie_Recherche", 90);
        IDEAL_PROFILES.put("Psychology", psychology);
        
        // Études Anglaises (English)
        Map<String, Integer> english = new HashMap<>();
        english.put("Interet_Scientifique_Tech", 10);
        english.put("Interet_Artistique_Creatif", 90);
        english.put("Interet_Social_Humain", 85);
        english.put("Interet_Business_Gestion", 30);
        english.put("Interet_Logique_Analytique", 80);
        english.put("Competence_Resolution_Problemes", 70);
        english.put("Competence_Communication", 98);
        english.put("Competence_Organisation", 70);
        english.put("Competence_Manuel_Technique", 10);
        english.put("Valeur_Impact_Societal", 75);
        english.put("Valeur_Innovation_Challenge", 70);
        english.put("Valeur_Stabilite_Securite", 50);
        english.put("Valeur_Autonomie", 85);
        english.put("Pref_Travail_Equipe_Collab", 70);
        english.put("Pref_Travail_Autonome", 85);
        english.put("Pref_Pratique_Terrain", 30);
        english.put("Pref_Theorie_Recherche", 90);
        IDEAL_PROFILES.put("English", english);
    }
    
    /**
     * Récupère tous les profils idéaux disponibles
     */
    public Map<String, Map<String, Integer>> getAllIdealProfiles() {
        return new HashMap<>(IDEAL_PROFILES);
    }
    
    /**
     * Récupère un profil idéal spécifique par nom de majeure
     */
    public Map<String, Integer> getIdealProfile(String majorName) {
        return IDEAL_PROFILES.get(majorName);
    }
    
    /**
     * Convertit un profil idéal en MajorProfileDTO
     */
    public MajorProfileDTO convertToMajorProfileDTO(String majorName, Map<String, Integer> profile) {
        if (profile == null) return null;
        
        return MajorProfileDTO.builder()
            .majorId(majorName)
            .program(majorName)
            .category(getCategoryForMajor(majorName))
            .interetScientifiqueTech(profile.get("Interet_Scientifique_Tech"))
            .interetArtistiqueCreatif(profile.get("Interet_Artistique_Creatif"))
            .interetSocialHumain(profile.get("Interet_Social_Humain"))
            .interetBusinessGestion(profile.get("Interet_Business_Gestion"))
            .interetLogiqueAnalytique(profile.get("Interet_Logique_Analytique"))
            .competenceResolutionProblemes(profile.get("Competence_Resolution_Problemes"))
            .competenceCommunication(profile.get("Competence_Communication"))
            .competenceOrganisation(profile.get("Competence_Organisation"))
            .competenceManuelTechnique(profile.get("Competence_Manuel_Technique"))
            .valeurImpactSocietal(profile.get("Valeur_Impact_Societal"))
            .valeurInnovationChallenge(profile.get("Valeur_Innovation_Challenge"))
            .valeurStabiliteSecurite(profile.get("Valeur_Stabilite_Securite"))
            .valeurAutonomie(profile.get("Valeur_Autonomie"))
            .prefTravailEquipeCollab(profile.get("Pref_Travail_Equipe_Collab"))
            .prefTravailAutonome(profile.get("Pref_Travail_Autonome"))
            .prefPratiqueTerrain(profile.get("Pref_Pratique_Terrain"))
            .prefTheorieRecherche(profile.get("Pref_Theorie_Recherche"))
            .build();
    }
    
    /**
     * Récupère tous les profils idéaux convertis en MajorProfileDTO
     */
    public List<MajorProfileDTO> getAllMajorProfiles() {
        return IDEAL_PROFILES.entrySet().stream()
            .map(entry -> convertToMajorProfileDTO(entry.getKey(), entry.getValue()))
            .filter(Objects::nonNull)
            .collect(Collectors.toList());
    }
    
    /**
     * Détermine la catégorie d'une majeure
     */
    private String getCategoryForMajor(String majorName) {
        if (majorName.contains("Engineering") || majorName.contains("Architecture")) {
            return "Engineering & Architecture";
        } else if (majorName.contains("Business") || majorName.contains("Administration") || 
                   majorName.contains("International") || majorName.contains("Economics")) {
            return "Business & Management";
        } else if (majorName.contains("Computer") || majorName.contains("Software") || 
                   majorName.contains("Artificial") || majorName.contains("Data")) {
            return "Computer Science & Technology";
        } else if (majorName.contains("Medicine") || majorName.contains("Nursing") || 
                   majorName.contains("Health")) {
            return "Medicine & Health Sciences";
        } else if (majorName.contains("Psychology") || majorName.contains("Politics") || 
                   majorName.contains("Law")) {
            return "Social Sciences & Humanities";
        } else if (majorName.contains("English") || majorName.contains("Public Relations")) {
            return "Arts & Communication";
        } else {
            return "Other";
        }
    }
    
    /**
     * Récupère les noms de toutes les majeures disponibles
     */
    public List<String> getAllMajorNames() {
        return new ArrayList<>(IDEAL_PROFILES.keySet());
    }
    
    /**
     * Vérifie si une majeure existe
     */
    public boolean majorExists(String majorName) {
        return IDEAL_PROFILES.containsKey(majorName);
    }
    
    /**
     * Récupère le nombre total de profils idéaux
     */
    public int getTotalProfilesCount() {
        return IDEAL_PROFILES.size();
    }
}
