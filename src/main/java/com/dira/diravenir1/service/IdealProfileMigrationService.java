package com.dira.diravenir1.service;

import com.dira.diravenir1.Repository.IdealProfileRepository;
import com.dira.diravenir1.Repository.ProgramRepository;
import com.dira.diravenir1.Entities.Program;
import com.dira.diravenir1.entity.IdealProfile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class IdealProfileMigrationService {
    
    @Autowired
    private ProgramRepository programRepository;
    
    @Autowired
    private IdealProfileRepository idealProfileRepository;
    
    // Tous les profils idéaux des programmes (50+ programmes)
    private static final Map<String, Map<String, Integer>> ALL_IDEAL_PROFILES = new HashMap<>();
    
    static {
        // 1. Computer Science
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
        ALL_IDEAL_PROFILES.put("Computer Science", computerScience);
        
        // 2. Software Engineering
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
        ALL_IDEAL_PROFILES.put("Software Engineering", softwareEngineering);
        
        // 3. Artificial Intelligence
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
        ALL_IDEAL_PROFILES.put("Artificial Intelligence", artificialIntelligence);
        
        // 4. Business Administration
        Map<String, Integer> businessAdmin = new HashMap<>();
        businessAdmin.put("Interet_Scientifique_Tech", 30);
        businessAdmin.put("Interet_Artistique_Creatif", 40);
        businessAdmin.put("Interet_Social_Humain", 80);
        businessAdmin.put("Interet_Business_Gestion", 98);
        businessAdmin.put("Interet_Logique_Analytique", 85);
        businessAdmin.put("Competence_Resolution_Problemes", 85);
        businessAdmin.put("Competence_Communication", 95);
        businessAdmin.put("Competence_Organisation", 98);
        businessAdmin.put("Competence_Manuel_Technique", 10);
        businessAdmin.put("Valeur_Impact_Societal", 60);
        businessAdmin.put("Valeur_Innovation_Challenge", 80);
        businessAdmin.put("Valeur_Stabilite_Securite", 70);
        businessAdmin.put("Valeur_Autonomie", 70);
        businessAdmin.put("Pref_Travail_Equipe_Collab", 95);
        businessAdmin.put("Pref_Travail_Autonome", 50);
        businessAdmin.put("Pref_Pratique_Terrain", 60);
        businessAdmin.put("Pref_Theorie_Recherche", 50);
        ALL_IDEAL_PROFILES.put("Business Administration", businessAdmin);
        
        // 5. International Business
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
        ALL_IDEAL_PROFILES.put("International Business", internationalBusiness);
        
        // 6. Civil Engineering
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
        ALL_IDEAL_PROFILES.put("Civil Engineering", civilEngineering);
        
        // 7. Mechanical Engineering
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
        ALL_IDEAL_PROFILES.put("Mechanical Engineering", mechanicalEngineering);
        
        // 8. Architecture
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
        ALL_IDEAL_PROFILES.put("Architecture", architecture);
        
        // 9. Medicine
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
        ALL_IDEAL_PROFILES.put("Medicine", medicine);
        
        // 10. Nursing
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
        ALL_IDEAL_PROFILES.put("Nursing", nursing);
        
        // 11. Pharmacy
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
        ALL_IDEAL_PROFILES.put("Pharmacy", pharmacy);
        
        // 12. Electrical Engineering
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
        ALL_IDEAL_PROFILES.put("Electrical Engineering", electricalEngineering);
        
        // 13. Chemical Engineering
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
        ALL_IDEAL_PROFILES.put("Chemical Engineering", chemicalEngineering);
        
        // 14. Data Science
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
        ALL_IDEAL_PROFILES.put("Data Science", dataScience);
        
        // 15. Finance
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
        ALL_IDEAL_PROFILES.put("Finance", finance);
        
        // 16. Marketing
        Map<String, Integer> marketing = new HashMap<>();
        marketing.put("Interet_Scientifique_Tech", 20);
        marketing.put("Interet_Artistique_Creatif", 80);
        marketing.put("Interet_Social_Humain", 90);
        marketing.put("Interet_Business_Gestion", 95);
        marketing.put("Interet_Logique_Analytique", 70);
        marketing.put("Competence_Resolution_Problemes", 80);
        marketing.put("Competence_Communication", 98);
        marketing.put("Competence_Organisation", 90);
        marketing.put("Competence_Manuel_Technique", 10);
        marketing.put("Valeur_Impact_Societal", 70);
        marketing.put("Valeur_Innovation_Challenge", 95);
        marketing.put("Valeur_Stabilite_Securite", 60);
        marketing.put("Valeur_Autonomie", 70);
        marketing.put("Pref_Travail_Equipe_Collab", 95);
        marketing.put("Pref_Travail_Autonome", 50);
        marketing.put("Pref_Pratique_Terrain", 60);
        marketing.put("Pref_Theorie_Recherche", 50);
        ALL_IDEAL_PROFILES.put("Marketing", marketing);
        
        // 17. Law
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
        ALL_IDEAL_PROFILES.put("Law", law);
        
        // 18. Psychology
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
        ALL_IDEAL_PROFILES.put("Psychology", psychology);
        
        // 19. Tourism Management
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
        ALL_IDEAL_PROFILES.put("Tourism Management", tourismManagement);
        
        // 20. Biotechnology
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
        ALL_IDEAL_PROFILES.put("Biotechnology", biotechnology);
        
        // 21. E-Commerce
        Map<String, Integer> eCommerce = new HashMap<>();
        eCommerce.put("Interet_Scientifique_Tech", 50);
        eCommerce.put("Interet_Artistique_Creatif", 70);
        eCommerce.put("Interet_Social_Humain", 70);
        eCommerce.put("Interet_Business_Gestion", 98);
        eCommerce.put("Interet_Logique_Analytique", 85);
        eCommerce.put("Competence_Resolution_Problemes", 85);
        eCommerce.put("Competence_Communication", 95);
        eCommerce.put("Competence_Organisation", 95);
        eCommerce.put("Competence_Manuel_Technique", 20);
        eCommerce.put("Valeur_Impact_Societal", 60);
        eCommerce.put("Valeur_Innovation_Challenge", 95);
        eCommerce.put("Valeur_Stabilite_Securite", 60);
        eCommerce.put("Valeur_Autonomie", 80);
        eCommerce.put("Pref_Travail_Equipe_Collab", 90);
        eCommerce.put("Pref_Travail_Autonome", 70);
        eCommerce.put("Pref_Pratique_Terrain", 70);
        eCommerce.put("Pref_Theorie_Recherche", 60);
        ALL_IDEAL_PROFILES.put("E-Commerce", eCommerce);
        
        // 22. Robot Engineering
        Map<String, Integer> robotEngineering = new HashMap<>();
        robotEngineering.put("Interet_Scientifique_Tech", 98);
        robotEngineering.put("Interet_Artistique_Creatif", 60);
        robotEngineering.put("Interet_Social_Humain", 20);
        robotEngineering.put("Interet_Business_Gestion", 40);
        robotEngineering.put("Interet_Logique_Analytique", 98);
        robotEngineering.put("Competence_Resolution_Problemes", 98);
        robotEngineering.put("Competence_Communication", 70);
        robotEngineering.put("Competence_Organisation", 85);
        robotEngineering.put("Competence_Manuel_Technique", 95);
        robotEngineering.put("Valeur_Impact_Societal", 75);
        robotEngineering.put("Valeur_Innovation_Challenge", 98);
        robotEngineering.put("Valeur_Stabilite_Securite", 70);
        robotEngineering.put("Valeur_Autonomie", 85);
        robotEngineering.put("Pref_Travail_Equipe_Collab", 80);
        robotEngineering.put("Pref_Travail_Autonome", 70);
        robotEngineering.put("Pref_Pratique_Terrain", 90);
        robotEngineering.put("Pref_Theorie_Recherche", 70);
        ALL_IDEAL_PROFILES.put("Robot Engineering", robotEngineering);
        
        // 23. Biomedical Engineering
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
        ALL_IDEAL_PROFILES.put("Biomedical Engineering", biomedicalEngineering);
        
        // 24. Economics
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
        ALL_IDEAL_PROFILES.put("Economics", economics);
        
        // 25. Petroleum Engineering
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
        ALL_IDEAL_PROFILES.put("Petroleum Engineering", petroleumEngineering);
        
        // 26. Electronic and Information Engineering
        Map<String, Integer> electronicInfoEngineering = new HashMap<>();
        electronicInfoEngineering.put("Interet_Scientifique_Tech", 98);
        electronicInfoEngineering.put("Interet_Artistique_Creatif", 20);
        electronicInfoEngineering.put("Interet_Social_Humain", 20);
        electronicInfoEngineering.put("Interet_Business_Gestion", 40);
        electronicInfoEngineering.put("Interet_Logique_Analytique", 98);
        electronicInfoEngineering.put("Competence_Resolution_Problemes", 98);
        electronicInfoEngineering.put("Competence_Communication", 70);
        electronicInfoEngineering.put("Competence_Organisation", 85);
        electronicInfoEngineering.put("Competence_Manuel_Technique", 80);
        electronicInfoEngineering.put("Valeur_Impact_Societal", 75);
        electronicInfoEngineering.put("Valeur_Innovation_Challenge", 98);
        electronicInfoEngineering.put("Valeur_Stabilite_Securite", 75);
        electronicInfoEngineering.put("Valeur_Autonomie", 85);
        electronicInfoEngineering.put("Pref_Travail_Equipe_Collab", 80);
        electronicInfoEngineering.put("Pref_Travail_Autonome", 70);
        electronicInfoEngineering.put("Pref_Pratique_Terrain", 80);
        electronicInfoEngineering.put("Pref_Theorie_Recherche", 85);
        ALL_IDEAL_PROFILES.put("Electronic and Information Engineering", electronicInfoEngineering);
        
        // 27. Safety Engineering
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
        ALL_IDEAL_PROFILES.put("Safety Engineering", safetyEngineering);
        
        // 28. Mining Engineering
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
        ALL_IDEAL_PROFILES.put("Mining Engineering", miningEngineering);
        
        // 29. Aeronautical Engineering
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
        ALL_IDEAL_PROFILES.put("Aeronautical Engineering", aeronauticalEngineering);
        
        // 30. Aerospace Engineering
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
        ALL_IDEAL_PROFILES.put("Aerospace Engineering", aerospaceEngineering);
        
        // 31. Dentistry
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
        ALL_IDEAL_PROFILES.put("Dentistry", dentistry);
        
        // 32. New Energy Science and Engineering
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
        ALL_IDEAL_PROFILES.put("New Energy Science and Engineering", newEnergyEngineering);
        
        // 33. Hydraulic Engineering
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
        ALL_IDEAL_PROFILES.put("Hydraulic Engineering", hydraulicEngineering);
        
        // 34. Transportation Engineering
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
        ALL_IDEAL_PROFILES.put("Transportation Engineering", transportationEngineering);
        
        // 35. Bioengineering
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
        ALL_IDEAL_PROFILES.put("Bioengineering", bioengineering);
        
        // 36. Materials Science and Engineering
        Map<String, Integer> materialsScienceEngineering = new HashMap<>();
        materialsScienceEngineering.put("Interet_Scientifique_Tech", 98);
        materialsScienceEngineering.put("Interet_Artistique_Creatif", 50);
        materialsScienceEngineering.put("Interet_Social_Humain", 20);
        materialsScienceEngineering.put("Interet_Business_Gestion", 40);
        materialsScienceEngineering.put("Interet_Logique_Analytique", 95);
        materialsScienceEngineering.put("Competence_Resolution_Problemes", 95);
        materialsScienceEngineering.put("Competence_Communication", 60);
        materialsScienceEngineering.put("Competence_Organisation", 80);
        materialsScienceEngineering.put("Competence_Manuel_Technique", 90);
        materialsScienceEngineering.put("Valeur_Impact_Societal", 75);
        materialsScienceEngineering.put("Valeur_Innovation_Challenge", 95);
        materialsScienceEngineering.put("Valeur_Stabilite_Securite", 70);
        materialsScienceEngineering.put("Valeur_Autonomie", 75);
        materialsScienceEngineering.put("Pref_Travail_Equipe_Collab", 70);
        materialsScienceEngineering.put("Pref_Travail_Autonome", 70);
        materialsScienceEngineering.put("Pref_Pratique_Terrain", 90);
        materialsScienceEngineering.put("Pref_Theorie_Recherche", 80);
        ALL_IDEAL_PROFILES.put("Materials Science and Engineering", materialsScienceEngineering);
        
        // 37. Food Science and Engineering
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
        ALL_IDEAL_PROFILES.put("Food Science and Engineering", foodScienceEngineering);
        
        // 38. International Economics and Trade
        Map<String, Integer> internationalEconomicsTrade = new HashMap<>();
        internationalEconomicsTrade.put("Interet_Scientifique_Tech", 50);
        internationalEconomicsTrade.put("Interet_Artistique_Creatif", 20);
        internationalEconomicsTrade.put("Interet_Social_Humain", 70);
        internationalEconomicsTrade.put("Interet_Business_Gestion", 95);
        internationalEconomicsTrade.put("Interet_Logique_Analytique", 98);
        internationalEconomicsTrade.put("Competence_Resolution_Problemes", 90);
        internationalEconomicsTrade.put("Competence_Communication", 85);
        internationalEconomicsTrade.put("Competence_Organisation", 85);
        internationalEconomicsTrade.put("Competence_Manuel_Technique", 10);
        internationalEconomicsTrade.put("Valeur_Impact_Societal", 75);
        internationalEconomicsTrade.put("Valeur_Innovation_Challenge", 80);
        internationalEconomicsTrade.put("Valeur_Stabilite_Securite", 75);
        internationalEconomicsTrade.put("Valeur_Autonomie", 70);
        internationalEconomicsTrade.put("Pref_Travail_Equipe_Collab", 80);
        internationalEconomicsTrade.put("Pref_Travail_Autonome", 60);
        internationalEconomicsTrade.put("Pref_Pratique_Terrain", 50);
        internationalEconomicsTrade.put("Pref_Theorie_Recherche", 85);
        ALL_IDEAL_PROFILES.put("International Economics and Trade", internationalEconomicsTrade);
        
        // 39. International Politics
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
        ALL_IDEAL_PROFILES.put("International Politics", internationalPolitics);
        
        // 40. Public Relations
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
        ALL_IDEAL_PROFILES.put("Public Relations", publicRelations);
        
        // 41. Applied Chemistry
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
        ALL_IDEAL_PROFILES.put("Applied Chemistry", appliedChemistry);
        
        // 42. English Studies
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
        ALL_IDEAL_PROFILES.put("English Studies", englishStudies);
        
        // 43. Mechanical Design, Manufacturing and Automation
        Map<String, Integer> mechanicalDesignManufacturing = new HashMap<>();
        mechanicalDesignManufacturing.put("Interet_Scientifique_Tech", 95);
        mechanicalDesignManufacturing.put("Interet_Artistique_Creatif", 60);
        mechanicalDesignManufacturing.put("Interet_Social_Humain", 20);
        mechanicalDesignManufacturing.put("Interet_Business_Gestion", 50);
        mechanicalDesignManufacturing.put("Interet_Logique_Analytique", 95);
        mechanicalDesignManufacturing.put("Competence_Resolution_Problemes", 95);
        mechanicalDesignManufacturing.put("Competence_Communication", 70);
        mechanicalDesignManufacturing.put("Competence_Organisation", 85);
        mechanicalDesignManufacturing.put("Competence_Manuel_Technique", 95);
        mechanicalDesignManufacturing.put("Valeur_Impact_Societal", 60);
        mechanicalDesignManufacturing.put("Valeur_Innovation_Challenge", 95);
        mechanicalDesignManufacturing.put("Valeur_Stabilite_Securite", 75);
        mechanicalDesignManufacturing.put("Valeur_Autonomie", 80);
        mechanicalDesignManufacturing.put("Pref_Travail_Equipe_Collab", 80);
        mechanicalDesignManufacturing.put("Pref_Travail_Autonome", 70);
        mechanicalDesignManufacturing.put("Pref_Pratique_Terrain", 95);
        mechanicalDesignManufacturing.put("Pref_Theorie_Recherche", 60);
        ALL_IDEAL_PROFILES.put("Mechanical Design, Manufacturing and Automation", mechanicalDesignManufacturing);
    }
    
    /**
     * Migre tous les profils idéaux en base de données
     */
    @Transactional
    public void migrateAllIdealProfiles() {
        System.out.println("🚀 Début de la migration des profils idéaux...");
        
        int totalMigrated = 0;
        int totalErrors = 0;
        
        for (Map.Entry<String, Map<String, Integer>> entry : ALL_IDEAL_PROFILES.entrySet()) {
            String programName = entry.getKey();
            Map<String, Integer> profile = entry.getValue();
            
            try {
                // Vérifier si le programme existe en base
                List<Program> programs = programRepository.findByProgramContainingIgnoreCase(programName);
                
                if (programs.isEmpty()) {
                    System.out.println("⚠️ Programme non trouvé: " + programName + " - Création d'un programme temporaire");
                    // Créer un programme temporaire pour les tests
                    Program tempProgram = createTemporaryProgram(programName);
                    programs = List.of(tempProgram);
                }
                
                // Insérer le profil idéal pour chaque programme trouvé
                for (Program program : programs) {
                    int migrated = migrateIdealProfileForProgram(program, profile);
                    totalMigrated += migrated;
                }
                
                System.out.println("✅ Profil migré pour: " + programName);
                
            } catch (Exception e) {
                System.err.println("❌ Erreur lors de la migration de " + programName + ": " + e.getMessage());
                totalErrors++;
            }
        }
        
        System.out.println("🎉 Migration terminée!");
        System.out.println("📊 Résultats:");
        System.out.println("   - Profils migrés: " + totalMigrated);
        System.out.println("   - Erreurs: " + totalErrors);
        System.out.println("   - Programmes traités: " + ALL_IDEAL_PROFILES.size());
    }
    
    /**
     * Migre le profil idéal pour un programme spécifique
     */
    private int migrateIdealProfileForProgram(Program program, Map<String, Integer> profile) {
        int migrated = 0;
        
        // Supprimer les anciens profils s'ils existent
        idealProfileRepository.deleteByProgramId(program.getId());
        
        // Insérer tous les piliers du profil
        for (Map.Entry<String, Integer> pillar : profile.entrySet()) {
            IdealProfile idealProfile = new IdealProfile(program, pillar.getKey(), pillar.getValue());
            idealProfileRepository.save(idealProfile);
            migrated++;
        }
        
        return migrated;
    }
    
    /**
     * Crée un programme temporaire pour les tests
     */
    private Program createTemporaryProgram(String programName) {
        Program program = new Program();
        program.setProgram(programName);
        program.setCategory("Engineering"); // Catégorie par défaut
        program.setDescription("Programme temporaire pour les tests d'orientation");
        program.setDegreeType("Bachelor");
        program.setLanguage("English");
        program.setStatus(Program.ProgramStatus.OPENED);
        
        return programRepository.save(program);
    }
    
    /**
     * Vérifie le statut de la migration
     */
    public Map<String, Object> getMigrationStatus() {
        Map<String, Object> status = new HashMap<>();
        
        long totalPrograms = idealProfileRepository.count();
        long expectedProfiles = ALL_IDEAL_PROFILES.size() * 17; // 17 piliers par programme
        
        status.put("totalProfilesInDB", totalPrograms);
        status.put("expectedProfiles", expectedProfiles);
        status.put("migrationComplete", totalPrograms >= expectedProfiles);
        status.put("completionPercentage", Math.round((double) totalPrograms / expectedProfiles * 100));
        
        return status;
    }
    
    /**
     * Nettoie tous les profils idéaux (pour les tests)
     */
    @Transactional
    public void clearAllIdealProfiles() {
        System.out.println("🧹 Nettoyage de tous les profils idéaux...");
        idealProfileRepository.deleteAll();
        System.out.println("✅ Nettoyage terminé");
    }
}
