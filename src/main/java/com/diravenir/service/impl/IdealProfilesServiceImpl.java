package com.diravenir.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class IdealProfilesService {
    
    /**
     * Profils idéaux réels pour les 44 majeures
     * Basés sur les spécifications exactes fournies par l'utilisateur
     */
    private static final Map<String, Map<String, Integer>> IDEAL_PROFILES = new HashMap<>();
    
    static {
        initializeIdealProfiles();
    }
    
    /**
     * Initialise tous les profils idéaux avec les scores réels
     */
    private static void initializeIdealProfiles() {
        // Génie Civil
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
        IDEAL_PROFILES.put("CIVIL", civilEngineering);
        
        // Génie Mécanique
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
        IDEAL_PROFILES.put("MECH", mechanicalEngineering);
        
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
        IDEAL_PROFILES.put("ARCH", architecture);
        
        // Commerce International
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
        IDEAL_PROFILES.put("INTBUS", internationalBusiness);
        
        // Administration des Affaires
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
        IDEAL_PROFILES.put("BUSADM", businessAdministration);
        
        // Économie et Commerce International
        Map<String, Integer> internationalEconomics = new HashMap<>();
        internationalEconomics.put("Interet_Scientifique_Tech", 50);
        internationalEconomics.put("Interet_Artistique_Creatif", 20);
        internationalEconomics.put("Interet_Social_Humain", 70);
        internationalEconomics.put("Interet_Business_Gestion", 95);
        internationalEconomics.put("Interet_Logique_Analytique", 98);
        internationalEconomics.put("Competence_Resolution_Problemes", 90);
        internationalEconomics.put("Competence_Communication", 85);
        internationalEconomics.put("Competence_Organisation", 85);
        internationalEconomics.put("Competence_Manuel_Technique", 10);
        internationalEconomics.put("Valeur_Impact_Societal", 75);
        internationalEconomics.put("Valeur_Innovation_Challenge", 80);
        internationalEconomics.put("Valeur_Stabilite_Securite", 75);
        internationalEconomics.put("Valeur_Autonomie", 70);
        internationalEconomics.put("Pref_Travail_Equipe_Collab", 80);
        internationalEconomics.put("Pref_Travail_Autonome", 60);
        internationalEconomics.put("Pref_Pratique_Terrain", 50);
        internationalEconomics.put("Pref_Theorie_Recherche", 85);
        IDEAL_PROFILES.put("INTECON", internationalEconomics);
        
        // Marketing et Management
        Map<String, Integer> marketingManagement = new HashMap<>();
        marketingManagement.put("Interet_Scientifique_Tech", 20);
        marketingManagement.put("Interet_Artistique_Creatif", 80);
        marketingManagement.put("Interet_Social_Humain", 90);
        marketingManagement.put("Interet_Business_Gestion", 95);
        marketingManagement.put("Interet_Logique_Analytique", 70);
        marketingManagement.put("Competence_Resolution_Problemes", 80);
        marketingManagement.put("Competence_Communication", 98);
        marketingManagement.put("Competence_Organisation", 90);
        marketingManagement.put("Competence_Manuel_Technique", 10);
        marketingManagement.put("Valeur_Impact_Societal", 70);
        marketingManagement.put("Valeur_Innovation_Challenge", 95);
        marketingManagement.put("Valeur_Stabilite_Securite", 60);
        marketingManagement.put("Valeur_Autonomie", 70);
        marketingManagement.put("Pref_Travail_Equipe_Collab", 95);
        marketingManagement.put("Pref_Travail_Autonome", 50);
        marketingManagement.put("Pref_Pratique_Terrain", 60);
        marketingManagement.put("Pref_Theorie_Recherche", 50);
        IDEAL_PROFILES.put("MARKET", marketingManagement);
        
        // Informatique
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
        IDEAL_PROFILES.put("CS", computerScience);
        
        // Génie Logiciel
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
        IDEAL_PROFILES.put("SE", softwareEngineering);
        
        // Intelligence Artificielle
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
        IDEAL_PROFILES.put("AI", artificialIntelligence);
        
        // Gestion du Tourisme
        Map<String, Integer> tourismManagement = new HashMap<>();
        tourismManagement.put("Interet_Scientifique_Tech", 20);
        tourismManagement.put("Interet_Artistique_Creatif", 60);
        tourismManagement.put("Interet_Social_Humain", 95);
        tourismManagement.put("Interet_Business_Gestion", 90);
        tourismManagement.put("Interet_Logique_Analytique", 70);
        tourismManagement.put("Competence_Resolution_Problemes", 80);
        tourismManagement.put("Competence_Communication", 98);
        tourismManagement.put("Competence_Organisation", 95);
        tourismManagement.put("Competence_Manuel_Technique", 30);
        tourismManagement.put("Valeur_Impact_Societal", 85);
        tourismManagement.put("Valeur_Innovation_Challenge", 80);
        tourismManagement.put("Valeur_Stabilite_Securite", 60);
        tourismManagement.put("Valeur_Autonomie", 70);
        tourismManagement.put("Pref_Travail_Equipe_Collab", 95);
        tourismManagement.put("Pref_Travail_Autonome", 50);
        tourismManagement.put("Pref_Pratique_Terrain", 80);
        tourismManagement.put("Pref_Theorie_Recherche", 40);
        IDEAL_PROFILES.put("TOURISM", tourismManagement);
        
        // Soins Infirmiers
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
        IDEAL_PROFILES.put("NURSING", nursing);
        
        // Pharmacie
        Map<String, Integer> pharmacy = new HashMap<>();
        pharmacy.put("Interet_Scientifique_Tech", 90);
        pharmacy.put("Interet_Artistique_Creatif", 10);
        pharmacy.put("Interet_Social_Humain", 80);
        pharmacy.put("Interet_Business_Gestion", 30);
        pharmacy.put("Interet_Logique_Analytique", 85);
        pharmacy.put("Competence_Resolution_Problemes", 85);
        pharmacy.put("Competence_Communication", 90);
        pharmacy.put("Competence_Organisation", 95);
        pharmacy.put("Competence_Manuel_Technique", 60);
        pharmacy.put("Valeur_Impact_Societal", 90);
        pharmacy.put("Valeur_Innovation_Challenge", 70);
        pharmacy.put("Valeur_Stabilite_Securite", 85);
        pharmacy.put("Valeur_Autonomie", 70);
        pharmacy.put("Pref_Travail_Equipe_Collab", 85);
        pharmacy.put("Pref_Travail_Autonome", 60);
        pharmacy.put("Pref_Pratique_Terrain", 70);
        pharmacy.put("Pref_Theorie_Recherche", 80);
        IDEAL_PROFILES.put("PHARMACY", pharmacy);
        
        // Génie Électrique
        Map<String, Integer> electricalEngineering = new HashMap<>();
        electricalEngineering.put("Interet_Scientifique_Tech", 95);
        electricalEngineering.put("Interet_Artistique_Creatif", 20);
        electricalEngineering.put("Interet_Social_Humain", 30);
        electricalEngineering.put("Interet_Business_Gestion", 40);
        electricalEngineering.put("Interet_Logique_Analytique", 95);
        electricalEngineering.put("Competence_Resolution_Problemes", 95);
        electricalEngineering.put("Competence_Communication", 65);
        electricalEngineering.put("Competence_Organisation", 80);
        electricalEngineering.put("Competence_Manuel_Technique", 80);
        electricalEngineering.put("Valeur_Impact_Societal", 70);
        electricalEngineering.put("Valeur_Innovation_Challenge", 90);
        electricalEngineering.put("Valeur_Stabilite_Securite", 75);
        electricalEngineering.put("Valeur_Autonomie", 80);
        electricalEngineering.put("Pref_Travail_Equipe_Collab", 75);
        electricalEngineering.put("Pref_Travail_Autonome", 70);
        electricalEngineering.put("Pref_Pratique_Terrain", 80);
        electricalEngineering.put("Pref_Theorie_Recherche", 75);
        IDEAL_PROFILES.put("ELECTRICAL", electricalEngineering);
        
        // Sciences et Ingénierie Alimentaires
        Map<String, Integer> foodScienceEngineering = new HashMap<>();
        foodScienceEngineering.put("Interet_Scientifique_Tech", 90);
        foodScienceEngineering.put("Interet_Artistique_Creatif", 50);
        foodScienceEngineering.put("Interet_Social_Humain", 40);
        foodScienceEngineering.put("Interet_Business_Gestion", 50);
        foodScienceEngineering.put("Interet_Logique_Analytique", 85);
        foodScienceEngineering.put("Competence_Resolution_Problemes", 85);
        foodScienceEngineering.put("Competence_Communication", 70);
        foodScienceEngineering.put("Competence_Organisation", 85);
        foodScienceEngineering.put("Competence_Manuel_Technique", 75);
        foodScienceEngineering.put("Valeur_Impact_Societal", 85);
        foodScienceEngineering.put("Valeur_Innovation_Challenge", 80);
        foodScienceEngineering.put("Valeur_Stabilite_Securite", 80);
        foodScienceEngineering.put("Valeur_Autonomie", 70);
        foodScienceEngineering.put("Pref_Travail_Equipe_Collab", 80);
        foodScienceEngineering.put("Pref_Travail_Autonome", 60);
        foodScienceEngineering.put("Pref_Pratique_Terrain", 85);
        foodScienceEngineering.put("Pref_Theorie_Recherche", 70);
        IDEAL_PROFILES.put("FOODSCI", foodScienceEngineering);
        
        // Finance
        Map<String, Integer> finance = new HashMap<>();
        finance.put("Interet_Scientifique_Tech", 40);
        finance.put("Interet_Artistique_Creatif", 10);
        finance.put("Interet_Social_Humain", 50);
        finance.put("Interet_Business_Gestion", 98);
        finance.put("Interet_Logique_Analytique", 98);
        finance.put("Competence_Resolution_Problemes", 90);
        finance.put("Competence_Communication", 85);
        finance.put("Competence_Organisation", 98);
        finance.put("Competence_Manuel_Technique", 10);
        finance.put("Valeur_Impact_Societal", 40);
        finance.put("Valeur_Innovation_Challenge", 80);
        finance.put("Valeur_Stabilite_Securite", 85);
        finance.put("Valeur_Autonomie", 70);
        finance.put("Pref_Travail_Equipe_Collab", 80);
        finance.put("Pref_Travail_Autonome", 70);
        finance.put("Pref_Pratique_Terrain", 50);
        finance.put("Pref_Theorie_Recherche", 80);
        IDEAL_PROFILES.put("FINANCE", finance);
        
        // Conception Mécanique, Fabrication et Automatisation
        Map<String, Integer> mechanicalDesign = new HashMap<>();
        mechanicalDesign.put("Interet_Scientifique_Tech", 95);
        mechanicalDesign.put("Interet_Artistique_Creatif", 60);
        mechanicalDesign.put("Interet_Social_Humain", 20);
        mechanicalDesign.put("Interet_Business_Gestion", 50);
        mechanicalDesign.put("Interet_Logique_Analytique", 95);
        mechanicalDesign.put("Competence_Resolution_Problemes", 95);
        mechanicalDesign.put("Competence_Communication", 70);
        mechanicalDesign.put("Competence_Organisation", 85);
        mechanicalDesign.put("Competence_Manuel_Technique", 95);
        mechanicalDesign.put("Valeur_Impact_Societal", 60);
        mechanicalDesign.put("Valeur_Innovation_Challenge", 95);
        mechanicalDesign.put("Valeur_Stabilite_Securite", 75);
        mechanicalDesign.put("Valeur_Autonomie", 80);
        mechanicalDesign.put("Pref_Travail_Equipe_Collab", 80);
        mechanicalDesign.put("Pref_Travail_Autonome", 70);
        mechanicalDesign.put("Pref_Pratique_Terrain", 95);
        mechanicalDesign.put("Pref_Theorie_Recherche", 60);
        IDEAL_PROFILES.put("MECH_DESIGN", mechanicalDesign);
        
        // Science du Droit
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
        IDEAL_PROFILES.put("LAW", law);
        
        // Politique Internationale
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
        IDEAL_PROFILES.put("INTPOL", internationalPolitics);
        
        // MBBS (Médecine)
        Map<String, Integer> mbbs = new HashMap<>();
        mbbs.put("Interet_Scientifique_Tech", 95);
        mbbs.put("Interet_Artistique_Creatif", 10);
        mbbs.put("Interet_Social_Humain", 98);
        mbbs.put("Interet_Business_Gestion", 20);
        mbbs.put("Interet_Logique_Analytique", 90);
        mbbs.put("Competence_Resolution_Problemes", 95);
        mbbs.put("Competence_Communication", 98);
        mbbs.put("Competence_Organisation", 90);
        mbbs.put("Competence_Manuel_Technique", 75);
        mbbs.put("Valeur_Impact_Societal", 98);
        mbbs.put("Valeur_Innovation_Challenge", 70);
        mbbs.put("Valeur_Stabilite_Securite", 85);
        mbbs.put("Valeur_Autonomie", 60);
        mbbs.put("Pref_Travail_Equipe_Collab", 95);
        mbbs.put("Pref_Travail_Autonome", 50);
        mbbs.put("Pref_Pratique_Terrain", 90);
        mbbs.put("Pref_Theorie_Recherche", 80);
        IDEAL_PROFILES.put("MBBS", mbbs);
        
        // Relations Publiques
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
        IDEAL_PROFILES.put("PR", publicRelations);
        
        // Chimie Appliquée
        Map<String, Integer> appliedChemistry = new HashMap<>();
        appliedChemistry.put("Interet_Scientifique_Tech", 98);
        appliedChemistry.put("Interet_Artistique_Creatif", 20);
        appliedChemistry.put("Interet_Social_Humain", 30);
        appliedChemistry.put("Interet_Business_Gestion", 40);
        appliedChemistry.put("Interet_Logique_Analytique", 95);
        appliedChemistry.put("Competence_Resolution_Problemes", 95);
        appliedChemistry.put("Competence_Communication", 60);
        appliedChemistry.put("Competence_Organisation", 85);
        appliedChemistry.put("Competence_Manuel_Technique", 85);
        appliedChemistry.put("Valeur_Impact_Societal", 80);
        appliedChemistry.put("Valeur_Innovation_Challenge", 90);
        appliedChemistry.put("Valeur_Stabilite_Securite", 70);
        appliedChemistry.put("Valeur_Autonomie", 70);
        appliedChemistry.put("Pref_Travail_Equipe_Collab", 70);
        appliedChemistry.put("Pref_Travail_Autonome", 60);
        appliedChemistry.put("Pref_Pratique_Terrain", 90);
        appliedChemistry.put("Pref_Theorie_Recherche", 80);
        IDEAL_PROFILES.put("CHEM", appliedChemistry);
        
        // Études Anglaises
        Map<String, Integer> englishStudies = new HashMap<>();
        englishStudies.put("Interet_Scientifique_Tech", 10);
        englishStudies.put("Interet_Artistique_Creatif", 90);
        englishStudies.put("Interet_Social_Humain", 85);
        englishStudies.put("Interet_Business_Gestion", 30);
        englishStudies.put("Interet_Logique_Analytique", 80);
        englishStudies.put("Competence_Resolution_Problemes", 70);
        englishStudies.put("Competence_Communication", 98);
        englishStudies.put("Competence_Organisation", 70);
        englishStudies.put("Competence_Manuel_Technique", 10);
        englishStudies.put("Valeur_Impact_Societal", 75);
        englishStudies.put("Valeur_Innovation_Challenge", 70);
        englishStudies.put("Valeur_Stabilite_Securite", 50);
        englishStudies.put("Valeur_Autonomie", 85);
        englishStudies.put("Pref_Travail_Equipe_Collab", 70);
        englishStudies.put("Pref_Travail_Autonome", 85);
        englishStudies.put("Pref_Pratique_Terrain", 30);
        englishStudies.put("Pref_Theorie_Recherche", 90);
        IDEAL_PROFILES.put("ENGLISH", englishStudies);
        
        // Médecine Dentaire
        Map<String, Integer> dentistry = new HashMap<>();
        dentistry.put("Interet_Scientifique_Tech", 90);
        dentistry.put("Interet_Artistique_Creatif", 40);
        dentistry.put("Interet_Social_Humain", 90);
        dentistry.put("Interet_Business_Gestion", 40);
        dentistry.put("Interet_Logique_Analytique", 85);
        dentistry.put("Competence_Resolution_Problemes", 90);
        dentistry.put("Competence_Communication", 95);
        dentistry.put("Competence_Organisation", 90);
        dentistry.put("Competence_Manuel_Technique", 95);
        dentistry.put("Valeur_Impact_Societal", 98);
        dentistry.put("Valeur_Innovation_Challenge", 70);
        dentistry.put("Valeur_Stabilite_Securite", 80);
        dentistry.put("Valeur_Autonomie", 70);
        dentistry.put("Pref_Travail_Equipe_Collab", 90);
        dentistry.put("Pref_Travail_Autonome", 60);
        dentistry.put("Pref_Pratique_Terrain", 95);
        dentistry.put("Pref_Theorie_Recherche", 60);
        IDEAL_PROFILES.put("DENTISTRY", dentistry);
        
        // Sciences et Ingénierie des Nouvelles Énergies
        Map<String, Integer> newEnergyEngineering = new HashMap<>();
        newEnergyEngineering.put("Interet_Scientifique_Tech", 98);
        newEnergyEngineering.put("Interet_Artistique_Creatif", 20);
        newEnergyEngineering.put("Interet_Social_Humain", 40);
        newEnergyEngineering.put("Interet_Business_Gestion", 50);
        newEnergyEngineering.put("Interet_Logique_Analytique", 95);
        newEnergyEngineering.put("Competence_Resolution_Problemes", 95);
        newEnergyEngineering.put("Competence_Communication", 70);
        newEnergyEngineering.put("Competence_Organisation", 85);
        newEnergyEngineering.put("Competence_Manuel_Technique", 80);
        newEnergyEngineering.put("Valeur_Impact_Societal", 95);
        newEnergyEngineering.put("Valeur_Innovation_Challenge", 98);
        newEnergyEngineering.put("Valeur_Stabilite_Securite", 70);
        newEnergyEngineering.put("Valeur_Autonomie", 80);
        newEnergyEngineering.put("Pref_Travail_Equipe_Collab", 80);
        newEnergyEngineering.put("Pref_Travail_Autonome", 70);
        newEnergyEngineering.put("Pref_Pratique_Terrain", 85);
        newEnergyEngineering.put("Pref_Theorie_Recherche", 80);
        IDEAL_PROFILES.put("NEWENERGY", newEnergyEngineering);
        
        // Ingénierie Hydraulique
        Map<String, Integer> hydraulicEngineering = new HashMap<>();
        hydraulicEngineering.put("Interet_Scientifique_Tech", 95);
        hydraulicEngineering.put("Interet_Artistique_Creatif", 20);
        hydraulicEngineering.put("Interet_Social_Humain", 50);
        hydraulicEngineering.put("Interet_Business_Gestion", 60);
        hydraulicEngineering.put("Interet_Logique_Analytique", 95);
        hydraulicEngineering.put("Competence_Resolution_Problemes", 95);
        hydraulicEngineering.put("Competence_Communication", 70);
        hydraulicEngineering.put("Competence_Organisation", 90);
        hydraulicEngineering.put("Competence_Manuel_Technique", 85);
        hydraulicEngineering.put("Valeur_Impact_Societal", 90);
        hydraulicEngineering.put("Valeur_Innovation_Challenge", 85);
        hydraulicEngineering.put("Valeur_Stabilite_Securite", 80);
        hydraulicEngineering.put("Valeur_Autonomie", 70);
        hydraulicEngineering.put("Pref_Travail_Equipe_Collab", 80);
        hydraulicEngineering.put("Pref_Travail_Autonome", 60);
        hydraulicEngineering.put("Pref_Pratique_Terrain", 90);
        hydraulicEngineering.put("Pref_Theorie_Recherche", 60);
        IDEAL_PROFILES.put("HYDRAULIC", hydraulicEngineering);
        
        // Ingénierie des Transports
        Map<String, Integer> transportationEngineering = new HashMap<>();
        transportationEngineering.put("Interet_Scientifique_Tech", 90);
        transportationEngineering.put("Interet_Artistique_Creatif", 20);
        transportationEngineering.put("Interet_Social_Humain", 60);
        transportationEngineering.put("Interet_Business_Gestion", 70);
        transportationEngineering.put("Interet_Logique_Analytique", 95);
        transportationEngineering.put("Competence_Resolution_Problemes", 90);
        transportationEngineering.put("Competence_Communication", 80);
        transportationEngineering.put("Competence_Organisation", 95);
        transportationEngineering.put("Competence_Manuel_Technique", 70);
        transportationEngineering.put("Valeur_Impact_Societal", 90);
        transportationEngineering.put("Valeur_Innovation_Challenge", 80);
        transportationEngineering.put("Valeur_Stabilite_Securite", 80);
        transportationEngineering.put("Valeur_Autonomie", 70);
        transportationEngineering.put("Pref_Travail_Equipe_Collab", 90);
        transportationEngineering.put("Pref_Travail_Autonome", 60);
        transportationEngineering.put("Pref_Pratique_Terrain", 85);
        transportationEngineering.put("Pref_Theorie_Recherche", 60);
        IDEAL_PROFILES.put("TRANSPORT", transportationEngineering);
        
        // Bioingénierie
        Map<String, Integer> bioengineering = new HashMap<>();
        bioengineering.put("Interet_Scientifique_Tech", 95);
        bioengineering.put("Interet_Artistique_Creatif", 30);
        bioengineering.put("Interet_Social_Humain", 70);
        bioengineering.put("Interet_Business_Gestion", 40);
        bioengineering.put("Interet_Logique_Analytique", 95);
        bioengineering.put("Competence_Resolution_Problemes", 95);
        bioengineering.put("Competence_Communication", 70);
        bioengineering.put("Competence_Organisation", 80);
        bioengineering.put("Competence_Manuel_Technique", 85);
        bioengineering.put("Valeur_Impact_Societal", 95);
        bioengineering.put("Valeur_Innovation_Challenge", 95);
        bioengineering.put("Valeur_Stabilite_Securite", 70);
        bioengineering.put("Valeur_Autonomie", 80);
        bioengineering.put("Pref_Travail_Equipe_Collab", 85);
        bioengineering.put("Pref_Travail_Autonome", 60);
        bioengineering.put("Pref_Pratique_Terrain", 85);
        bioengineering.put("Pref_Theorie_Recherche", 80);
        IDEAL_PROFILES.put("BIOENG", bioengineering);
        
        // Biotechnologie
        Map<String, Integer> biotechnology = new HashMap<>();
        biotechnology.put("Interet_Scientifique_Tech", 98);
        biotechnology.put("Interet_Artistique_Creatif", 20);
        biotechnology.put("Interet_Social_Humain", 40);
        biotechnology.put("Interet_Business_Gestion", 40);
        biotechnology.put("Interet_Logique_Analytique", 95);
        biotechnology.put("Competence_Resolution_Problemes", 95);
        biotechnology.put("Competence_Communication", 70);
        biotechnology.put("Competence_Organisation", 80);
        biotechnology.put("Competence_Manuel_Technique", 85);
        biotechnology.put("Valeur_Impact_Societal", 90);
        biotechnology.put("Valeur_Innovation_Challenge", 98);
        biotechnology.put("Valeur_Stabilite_Securite", 60);
        biotechnology.put("Valeur_Autonomie", 80);
        biotechnology.put("Pref_Travail_Equipe_Collab", 80);
        biotechnology.put("Pref_Travail_Autonome", 70);
        biotechnology.put("Pref_Pratique_Terrain", 85);
        biotechnology.put("Pref_Theorie_Recherche", 85);
        IDEAL_PROFILES.put("BIOTECH", biotechnology);
        
        // Science et Ingénierie des Matériaux
        Map<String, Integer> materialsScience = new HashMap<>();
        materialsScience.put("Interet_Scientifique_Tech", 98);
        materialsScience.put("Interet_Artistique_Creatif", 50);
        materialsScience.put("Interet_Social_Humain", 20);
        materialsScience.put("Interet_Business_Gestion", 40);
        materialsScience.put("Interet_Logique_Analytique", 95);
        materialsScience.put("Competence_Resolution_Problemes", 95);
        materialsScience.put("Competence_Communication", 60);
        materialsScience.put("Competence_Organisation", 80);
        materialsScience.put("Competence_Manuel_Technique", 90);
        materialsScience.put("Valeur_Impact_Societal", 75);
        materialsScience.put("Valeur_Innovation_Challenge", 95);
        materialsScience.put("Valeur_Stabilite_Securite", 70);
        materialsScience.put("Valeur_Autonomie", 75);
        materialsScience.put("Pref_Travail_Equipe_Collab", 70);
        materialsScience.put("Pref_Travail_Autonome", 70);
        materialsScience.put("Pref_Pratique_Terrain", 90);
        materialsScience.put("Pref_Theorie_Recherche", 80);
        IDEAL_PROFILES.put("MATERIALS", materialsScience);
        
        // E-Commerce
        Map<String, Integer> ecommerce = new HashMap<>();
        ecommerce.put("Interet_Scientifique_Tech", 50);
        ecommerce.put("Interet_Artistique_Creatif", 70);
        ecommerce.put("Interet_Social_Humain", 70);
        ecommerce.put("Interet_Business_Gestion", 98);
        ecommerce.put("Interet_Logique_Analytique", 85);
        ecommerce.put("Competence_Resolution_Problemes", 85);
        ecommerce.put("Competence_Communication", 95);
        ecommerce.put("Competence_Organisation", 95);
        ecommerce.put("Competence_Manuel_Technique", 20);
        ecommerce.put("Valeur_Impact_Societal", 60);
        ecommerce.put("Valeur_Innovation_Challenge", 95);
        ecommerce.put("Valeur_Stabilite_Securite", 60);
        ecommerce.put("Valeur_Autonomie", 80);
        ecommerce.put("Pref_Travail_Equipe_Collab", 90);
        ecommerce.put("Pref_Travail_Autonome", 70);
        ecommerce.put("Pref_Pratique_Terrain", 70);
        ecommerce.put("Pref_Theorie_Recherche", 60);
        IDEAL_PROFILES.put("ECOMMERCE", ecommerce);
        
        // Ingénierie Robotique
        Map<String, Integer> roboticsEngineering = new HashMap<>();
        roboticsEngineering.put("Interet_Scientifique_Tech", 98);
        roboticsEngineering.put("Interet_Artistique_Creatif", 60);
        roboticsEngineering.put("Interet_Social_Humain", 20);
        roboticsEngineering.put("Interet_Business_Gestion", 40);
        roboticsEngineering.put("Interet_Logique_Analytique", 98);
        roboticsEngineering.put("Competence_Resolution_Problemes", 98);
        roboticsEngineering.put("Competence_Communication", 70);
        roboticsEngineering.put("Competence_Organisation", 85);
        roboticsEngineering.put("Competence_Manuel_Technique", 95);
        roboticsEngineering.put("Valeur_Impact_Societal", 75);
        roboticsEngineering.put("Valeur_Innovation_Challenge", 98);
        roboticsEngineering.put("Valeur_Stabilite_Securite", 70);
        roboticsEngineering.put("Valeur_Autonomie", 85);
        roboticsEngineering.put("Pref_Travail_Equipe_Collab", 80);
        roboticsEngineering.put("Pref_Travail_Autonome", 70);
        roboticsEngineering.put("Pref_Pratique_Terrain", 90);
        roboticsEngineering.put("Pref_Theorie_Recherche", 70);
        IDEAL_PROFILES.put("ROBOTICS", roboticsEngineering);
        
        // Ingénierie Biomédicale
        Map<String, Integer> biomedicalEngineering = new HashMap<>();
        biomedicalEngineering.put("Interet_Scientifique_Tech", 98);
        biomedicalEngineering.put("Interet_Artistique_Creatif", 20);
        biomedicalEngineering.put("Interet_Social_Humain", 70);
        biomedicalEngineering.put("Interet_Business_Gestion", 40);
        biomedicalEngineering.put("Interet_Logique_Analytique", 98);
        biomedicalEngineering.put("Competence_Resolution_Problemes", 98);
        biomedicalEngineering.put("Competence_Communication", 80);
        biomedicalEngineering.put("Competence_Organisation", 85);
        biomedicalEngineering.put("Competence_Manuel_Technique", 80);
        biomedicalEngineering.put("Valeur_Impact_Societal", 95);
        biomedicalEngineering.put("Valeur_Innovation_Challenge", 95);
        biomedicalEngineering.put("Valeur_Stabilite_Securite", 75);
        biomedicalEngineering.put("Valeur_Autonomie", 80);
        biomedicalEngineering.put("Pref_Travail_Equipe_Collab", 90);
        biomedicalEngineering.put("Pref_Travail_Autonome", 60);
        biomedicalEngineering.put("Pref_Pratique_Terrain", 80);
        biomedicalEngineering.put("Pref_Theorie_Recherche", 85);
        IDEAL_PROFILES.put("BIOMEDICAL", biomedicalEngineering);
        
        // Science des Données
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
        IDEAL_PROFILES.put("DATASCI", dataScience);
        
        // Économie
        Map<String, Integer> economics = new HashMap<>();
        economics.put("Interet_Scientifique_Tech", 40);
        economics.put("Interet_Artistique_Creatif", 20);
        economics.put("Interet_Social_Humain", 80);
        economics.put("Interet_Business_Gestion", 90);
        economics.put("Interet_Logique_Analytique", 98);
        economics.put("Competence_Resolution_Problemes", 90);
        economics.put("Competence_Communication", 85);
        economics.put("Competence_Organisation", 80);
        economics.put("Competence_Manuel_Technique", 10);
        economics.put("Valeur_Impact_Societal", 85);
        economics.put("Valeur_Innovation_Challenge", 70);
        economics.put("Valeur_Stabilite_Securite", 75);
        economics.put("Valeur_Autonomie", 70);
        economics.put("Pref_Travail_Equipe_Collab", 80);
        economics.put("Pref_Travail_Autonome", 60);
        economics.put("Pref_Pratique_Terrain", 40);
        economics.put("Pref_Theorie_Recherche", 90);
        IDEAL_PROFILES.put("ECONOMICS", economics);
        
        // Génie Chimique
        Map<String, Integer> chemicalEngineering = new HashMap<>();
        chemicalEngineering.put("Interet_Scientifique_Tech", 98);
        chemicalEngineering.put("Interet_Artistique_Creatif", 20);
        chemicalEngineering.put("Interet_Social_Humain", 30);
        chemicalEngineering.put("Interet_Business_Gestion", 50);
        chemicalEngineering.put("Interet_Logique_Analytique", 95);
        chemicalEngineering.put("Competence_Resolution_Problemes", 95);
        chemicalEngineering.put("Competence_Communication", 70);
        chemicalEngineering.put("Competence_Organisation", 90);
        chemicalEngineering.put("Competence_Manuel_Technique", 80);
        chemicalEngineering.put("Valeur_Impact_Societal", 80);
        chemicalEngineering.put("Valeur_Innovation_Challenge", 90);
        chemicalEngineering.put("Valeur_Stabilite_Securite", 80);
        chemicalEngineering.put("Valeur_Autonomie", 70);
        chemicalEngineering.put("Pref_Travail_Equipe_Collab", 85);
        chemicalEngineering.put("Pref_Travail_Autonome", 60);
        chemicalEngineering.put("Pref_Pratique_Terrain", 90);
        chemicalEngineering.put("Pref_Theorie_Recherche", 70);
        IDEAL_PROFILES.put("CHEMICAL", chemicalEngineering);
        
        // Ingénierie Pétrolière
        Map<String, Integer> petroleumEngineering = new HashMap<>();
        petroleumEngineering.put("Interet_Scientifique_Tech", 95);
        petroleumEngineering.put("Interet_Artistique_Creatif", 10);
        petroleumEngineering.put("Interet_Social_Humain", 20);
        petroleumEngineering.put("Interet_Business_Gestion", 60);
        petroleumEngineering.put("Interet_Logique_Analytique", 95);
        petroleumEngineering.put("Competence_Resolution_Problemes", 95);
        petroleumEngineering.put("Competence_Communication", 70);
        petroleumEngineering.put("Competence_Organisation", 90);
        petroleumEngineering.put("Competence_Manuel_Technique", 90);
        petroleumEngineering.put("Valeur_Impact_Societal", 50);
        petroleumEngineering.put("Valeur_Innovation_Challenge", 80);
        petroleumEngineering.put("Valeur_Stabilite_Securite", 90);
        petroleumEngineering.put("Valeur_Autonomie", 80);
        petroleumEngineering.put("Pref_Travail_Equipe_Collab", 80);
        petroleumEngineering.put("Pref_Travail_Autonome", 70);
        petroleumEngineering.put("Pref_Pratique_Terrain", 95);
        petroleumEngineering.put("Pref_Theorie_Recherche", 60);
        IDEAL_PROFILES.put("PETROLEUM", petroleumEngineering);
        
        // Ingénierie Électronique et de l'Information
        Map<String, Integer> electronicInformationEngineering = new HashMap<>();
        electronicInformationEngineering.put("Interet_Scientifique_Tech", 98);
        electronicInformationEngineering.put("Interet_Artistique_Creatif", 20);
        electronicInformationEngineering.put("Interet_Social_Humain", 20);
        electronicInformationEngineering.put("Interet_Business_Gestion", 40);
        electronicInformationEngineering.put("Interet_Logique_Analytique", 98);
        electronicInformationEngineering.put("Competence_Resolution_Problemes", 98);
        electronicInformationEngineering.put("Competence_Communication", 70);
        electronicInformationEngineering.put("Competence_Organisation", 85);
        electronicInformationEngineering.put("Competence_Manuel_Technique", 80);
        electronicInformationEngineering.put("Valeur_Impact_Societal", 75);
        electronicInformationEngineering.put("Valeur_Innovation_Challenge", 98);
        electronicInformationEngineering.put("Valeur_Stabilite_Securite", 75);
        electronicInformationEngineering.put("Valeur_Autonomie", 85);
        electronicInformationEngineering.put("Pref_Travail_Equipe_Collab", 80);
        electronicInformationEngineering.put("Pref_Travail_Autonome", 70);
        electronicInformationEngineering.put("Pref_Pratique_Terrain", 80);
        electronicInformationEngineering.put("Pref_Theorie_Recherche", 85);
        IDEAL_PROFILES.put("ELECTRONIC_INFO", electronicInformationEngineering);
        
        // Ingénierie de la Sécurité
        Map<String, Integer> safetyEngineering = new HashMap<>();
        safetyEngineering.put("Interet_Scientifique_Tech", 90);
        safetyEngineering.put("Interet_Artistique_Creatif", 10);
        safetyEngineering.put("Interet_Social_Humain", 70);
        safetyEngineering.put("Interet_Business_Gestion", 60);
        safetyEngineering.put("Interet_Logique_Analytique", 95);
        safetyEngineering.put("Competence_Resolution_Problemes", 95);
        safetyEngineering.put("Competence_Communication", 85);
        safetyEngineering.put("Competence_Organisation", 98);
        safetyEngineering.put("Competence_Manuel_Technique", 70);
        safetyEngineering.put("Valeur_Impact_Societal", 95);
        safetyEngineering.put("Valeur_Innovation_Challenge", 70);
        safetyEngineering.put("Valeur_Stabilite_Securite", 98);
        safetyEngineering.put("Valeur_Autonomie", 70);
        safetyEngineering.put("Pref_Travail_Equipe_Collab", 90);
        safetyEngineering.put("Pref_Travail_Autonome", 60);
        safetyEngineering.put("Pref_Pratique_Terrain", 80);
        safetyEngineering.put("Pref_Theorie_Recherche", 60);
        IDEAL_PROFILES.put("SAFETY", safetyEngineering);
        
        // Ingénierie Minière
        Map<String, Integer> miningEngineering = new HashMap<>();
        miningEngineering.put("Interet_Scientifique_Tech", 95);
        miningEngineering.put("Interet_Artistique_Creatif", 10);
        miningEngineering.put("Interet_Social_Humain", 20);
        miningEngineering.put("Interet_Business_Gestion", 60);
        miningEngineering.put("Interet_Logique_Analytique", 95);
        miningEngineering.put("Competence_Resolution_Problemes", 95);
        miningEngineering.put("Competence_Communication", 70);
        miningEngineering.put("Competence_Organisation", 90);
        miningEngineering.put("Competence_Manuel_Technique", 95);
        miningEngineering.put("Valeur_Impact_Societal", 60);
        miningEngineering.put("Valeur_Innovation_Challenge", 80);
        miningEngineering.put("Valeur_Stabilite_Securite", 95);
        miningEngineering.put("Valeur_Autonomie", 80);
        miningEngineering.put("Pref_Travail_Equipe_Collab", 85);
        miningEngineering.put("Pref_Travail_Autonome", 70);
        miningEngineering.put("Pref_Pratique_Terrain", 98);
        miningEngineering.put("Pref_Theorie_Recherche", 60);
        IDEAL_PROFILES.put("MINING", miningEngineering);
        
        // Psychologie
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
        IDEAL_PROFILES.put("PSYCHOLOGY", psychology);
        
        // Ingénierie Aéronautique
        Map<String, Integer> aeronauticalEngineering = new HashMap<>();
        aeronauticalEngineering.put("Interet_Scientifique_Tech", 98);
        aeronauticalEngineering.put("Interet_Artistique_Creatif", 50);
        aeronauticalEngineering.put("Interet_Social_Humain", 20);
        aeronauticalEngineering.put("Interet_Business_Gestion", 40);
        aeronauticalEngineering.put("Interet_Logique_Analytique", 98);
        aeronauticalEngineering.put("Competence_Resolution_Problemes", 98);
        aeronauticalEngineering.put("Competence_Communication", 70);
        aeronauticalEngineering.put("Competence_Organisation", 90);
        aeronauticalEngineering.put("Competence_Manuel_Technique", 90);
        aeronauticalEngineering.put("Valeur_Impact_Societal", 75);
        aeronauticalEngineering.put("Valeur_Innovation_Challenge", 98);
        aeronauticalEngineering.put("Valeur_Stabilite_Securite", 95);
        aeronauticalEngineering.put("Valeur_Autonomie", 80);
        aeronauticalEngineering.put("Pref_Travail_Equipe_Collab", 90);
        aeronauticalEngineering.put("Pref_Travail_Autonome", 60);
        aeronauticalEngineering.put("Pref_Pratique_Terrain", 85);
        aeronauticalEngineering.put("Pref_Theorie_Recherche", 80);
        IDEAL_PROFILES.put("AERONAUTICAL", aeronauticalEngineering);
        
        // Ingénierie Aérospatiale
        Map<String, Integer> aerospaceEngineering = new HashMap<>();
        aerospaceEngineering.put("Interet_Scientifique_Tech", 98);
        aerospaceEngineering.put("Interet_Artistique_Creatif", 50);
        aerospaceEngineering.put("Interet_Social_Humain", 20);
        aerospaceEngineering.put("Interet_Business_Gestion", 40);
        aerospaceEngineering.put("Interet_Logique_Analytique", 98);
        aerospaceEngineering.put("Competence_Resolution_Problemes", 98);
        aerospaceEngineering.put("Competence_Communication", 70);
        aerospaceEngineering.put("Competence_Organisation", 90);
        aerospaceEngineering.put("Competence_Manuel_Technique", 90);
        aerospaceEngineering.put("Valeur_Impact_Societal", 80);
        aerospaceEngineering.put("Valeur_Innovation_Challenge", 98);
        aerospaceEngineering.put("Valeur_Stabilite_Securite", 95);
        aerospaceEngineering.put("Valeur_Autonomie", 80);
        aerospaceEngineering.put("Pref_Travail_Equipe_Collab", 90);
        aerospaceEngineering.put("Pref_Travail_Autonome", 60);
        aerospaceEngineering.put("Pref_Pratique_Terrain", 85);
        aerospaceEngineering.put("Pref_Theorie_Recherche", 80);
        IDEAL_PROFILES.put("AEROSPACE", aerospaceEngineering);
        
        // Médecine
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
        IDEAL_PROFILES.put("MEDICINE", medicine);
        
        log.info("✅ Profils idéaux initialisés pour {} majeures", IDEAL_PROFILES.size());
    }
    
    /**
     * Obtient le profil idéal d'une majeure par son code
     */
    public Map<String, Integer> getIdealProfile(String majorCode) {
        Map<String, Integer> profile = IDEAL_PROFILES.get(majorCode);
        if (profile == null) {
            log.warn("⚠️ Profil idéal non trouvé pour la majeure: {}", majorCode);
            return new HashMap<>();
        }
        return new HashMap<>(profile);
    }
    
    /**
     * Obtient tous les profils idéaux disponibles
     */
    public Map<String, Map<String, Integer>> getAllIdealProfiles() {
        return new HashMap<>(IDEAL_PROFILES);
    }
    
    /**
     * Calcule le score de correspondance avec la MÉTHODE DISTANCE EUCLIDIENNE PONDÉRÉE
     * Formule: Score_matching = 100 - √(∑(DiffP * PoidsP)²)
     * où DiffP = |Profil_Utilisateur[P] - Profil_Idéal_Majeure[P]|
     * et PoidsP = score idéal du pilier pour la majeure
     */
    public double calculateMatchingScore(Map<String, Integer> userProfile, Map<String, Integer> idealProfile) {
        
        double sumWeightedSquaredDifferences = 0.0;
        int validPillars = 0;
        
        for (String pillar : userProfile.keySet()) {
            int userScore = userProfile.get(pillar);
            int idealScore = idealProfile.getOrDefault(pillar, 0);
            
            // Ne considérer que les piliers avec un score idéal > 0
            if (idealScore > 0) {
                // DiffP = différence absolue entre profil utilisateur et profil idéal
                double diffP = Math.abs(userScore - idealScore);
                
                // PoidsP = score idéal du pilier pour la majeure (directement)
                double poidsP = idealScore;
                
                // Calculer (DiffP * PoidsP)²
                sumWeightedSquaredDifferences += Math.pow(diffP * poidsP, 2);
                
                validPillars++;
            }
        }
        
        if (validPillars == 0) return 0.0;
        
        // Calculer la distance euclidienne pondérée
        double euclideanDistance = Math.sqrt(sumWeightedSquaredDifferences);
        
        // Score de correspondance = 100 - distance
        // CORRECTION: Facteur de normalisation pour des scores entre 60-95% avec bonne différenciation
        double normalizationFactor = 80000.0; // Facteur optimisé pour différenciation et plage 60-95%
        double normalizedDistance = Math.min(euclideanDistance / normalizationFactor, 1.0);
        
        double matchingScore = 100 - (normalizedDistance * 100);
        
        // S'assurer que le score reste dans la plage [0, 100]
        double normalizedScore = Math.max(0, Math.min(100, matchingScore));
        
        log.debug("Distance Euclidienne Pondérée: distance={}, factor={}, normalized={}, score={}", 
                 euclideanDistance, normalizationFactor, normalizedDistance, normalizedScore);
        
        return normalizedScore;
    }
    
    /**
     * Génère le texte "Pourquoi cette majeure est faite pour vous"
     */
    public String generateWhyThisMajor(Map<String, Integer> userProfile, Map<String, Integer> idealProfile) {
        Map<String, String> pillarNames = getPillarDisplayNames();
        StringBuilder reasons = new StringBuilder();
        
        // Identifier les correspondances fortes
        int strongMatches = 0;
        for (String pillar : userProfile.keySet()) {
            int userScore = userProfile.get(pillar);
            int idealScore = idealProfile.getOrDefault(pillar, 0);
            
            if (idealScore >= 80 && Math.abs(userScore - idealScore) <= 15) {
                if (strongMatches > 0) {
                    reasons.append(", ");
                }
                reasons.append(pillarNames.getOrDefault(pillar, pillar));
                strongMatches++;
                
                if (strongMatches >= 3) break; // Limiter à 3 raisons principales
            }
        }
        
        if (strongMatches == 0) {
            return "Cette majeure correspond bien à votre profil général et offre de nombreuses opportunités de carrière.";
        }
        
        return "Vos points forts qui correspondent particulièrement à cette majeure : " + reasons.toString() + ".";
    }
    
    /**
     * Obtient les noms d'affichage des piliers
     */
    private Map<String, String> getPillarDisplayNames() {
        Map<String, String> names = new HashMap<>();
        names.put("Interet_Scientifique_Tech", "intérêt pour les sciences et technologies");
        names.put("Interet_Artistique_Creatif", "créativité artistique");
        names.put("Interet_Social_Humain", "intérêt pour les relations humaines");
        names.put("Interet_Business_Gestion", "intérêt pour le business et la gestion");
        names.put("Interet_Logique_Analytique", "pensée logique et analytique");
        names.put("Competence_Resolution_Problemes", "capacité de résolution de problèmes");
        names.put("Competence_Communication", "compétences en communication");
        names.put("Competence_Organisation", "compétences organisationnelles");
        names.put("Competence_Manuel_Technique", "compétences manuelles et techniques");
        names.put("Valeur_Impact_Societal", "désir d'impact sociétal");
        names.put("Valeur_Innovation_Challenge", "goût pour l'innovation et les défis");
        names.put("Valeur_Stabilite_Securite", "recherche de stabilité et sécurité");
        names.put("Valeur_Autonomie", "désir d'autonomie");
        names.put("Pref_Travail_Equipe_Collab", "préférence pour le travail en équipe");
        names.put("Pref_Travail_Autonome", "préférence pour le travail autonome");
        names.put("Pref_Pratique_Terrain", "préférence pour le travail pratique");
        names.put("Pref_Theorie_Recherche", "préférence pour la théorie et la recherche");
        return names;
    }
}
