package com.diravenir.service;

import com.diravenir.Entities.OrientationMajor;
import com.diravenir.Entities.IdealProfile;
import com.diravenir.repository.OrientationMajorRepository;
import com.diravenir.repository.IdealProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
@Slf4j
public class DataInitializationService implements CommandLineRunner {

    private final OrientationMajorRepository majorRepository;
    private final IdealProfileRepository idealProfileRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        log.info("🚀 Initialisation des données d'orientation...");
        
        // Vérifier si les données existent déjà
        long majorCount = majorRepository.count();
        long idealProfileCount = idealProfileRepository.count();
        
        log.info("📊 Nombre de majeures en base: {}", majorCount);
        log.info("📊 Nombre de profils idéaux en base: {}", idealProfileCount);
        
        if (majorCount == 0 || idealProfileCount == 0) {
            log.info("📝 Données manquantes détectées, initialisation complète...");
            
            // Nettoyer les données existantes si elles sont incomplètes
            if (idealProfileCount > 0) {
                log.info("🧹 Nettoyage des profils idéaux existants...");
                idealProfileRepository.deleteAll();
            }
            if (majorCount > 0) {
                log.info("🧹 Nettoyage des majeures existantes...");
                majorRepository.deleteAll();
            }
            
            initializeAllMajors();
            initializeAllIdealProfiles();
        } else {
            log.info("✅ Les données d'orientation sont déjà présentes et complètes");
        }
        
        log.info("🎯 Initialisation terminée");
    }

    private void initializeAllMajors() {
        List<OrientationMajor> majors = Arrays.asList(
            createMajor("Génie Civil", "CIVIL", "Engineering", 1),
            createMajor("Génie Mécanique", "MECH", "Engineering", 2),
            createMajor("Architecture", "ARCH", "Design", 3),
            createMajor("Commerce International (International Business)", "BUS", "Business", 4),
            createMajor("Administration des Affaires (Business Administration)", "BUS_ADMIN", "Business", 5),
            createMajor("Économie et Commerce International (International Economics and Trade)", "ECON_TRADE", "Business", 6),
            createMajor("Marketing et Management", "MARKETING", "Business", 7),
            createMajor("Informatique (Computer Science)", "CS", "Technology", 8),
            createMajor("Génie Logiciel (Software Engineering)", "IT", "Technology", 9),
            createMajor("Intelligence Artificielle (Artificial Intelligence)", "AI", "Technology", 10),
            createMajor("Gestion du Tourisme (Tourism Management)", "TOURISM", "Business", 11),
            createMajor("Soins Infirmiers (Nursing)", "NURSING", "Health", 12),
            createMajor("Pharmacie", "PHARMACY", "Health", 13),
            createMajor("Génie Électrique", "ELECTRICAL", "Engineering", 14),
            createMajor("Sciences et Ingénierie Alimentaires (Food Science and Engineering)", "FOOD_SCIENCE", "Engineering", 15),
            createMajor("Finance", "FINANCE", "Business", 16),
            createMajor("Conception Mécanique, Fabrication et Automatisation (Mechanical Design, Manufacturing and Automation)", "MECH_DESIGN", "Engineering", 17),
            createMajor("Science du Droit (Science of Law)", "LAW", "Law", 18),
            createMajor("Politique Internationale (International Politics)", "POLITICS", "Social Sciences", 19),
            createMajor("MBBS (Bachelor of Medicine, Bachelor of Surgery)", "MBBS", "Health", 20),
            createMajor("Relations Publiques (Public Relations)", "PR", "Business", 21),
            createMajor("Chimie Appliquée (Applied Chemistry)", "CHEMISTRY", "Science", 22),
            createMajor("Études Anglaises (English)", "ENGLISH", "Humanities", 23),
            createMajor("Médecine Dentaire (Dentistry)", "DENTISTRY", "Health", 24),
            createMajor("Sciences et Ingénierie des Nouvelles Énergies (New Energy Science and Engineering)", "ENERGY", "Engineering", 25),
            createMajor("Ingénierie Hydraulique (Hydraulic Engineering)", "HYDRAULIC", "Engineering", 26),
            createMajor("Ingénierie des Transports (Transportation Engineering)", "TRANSPORT", "Engineering", 27),
            createMajor("Bioingénierie (Bioengineering)", "BIOENG", "Engineering", 28),
            createMajor("Biotechnologie (Biotechnology)", "BIOTECH", "Science", 29),
            createMajor("Science et Ingénierie des Matériaux (Materials Science and Engineering)", "MATERIALS", "Engineering", 30),
            createMajor("E-Commerce", "ECOMMERCE", "Business", 31),
            createMajor("Ingénierie Robotique (Robot Engineering)", "ROBOTICS", "Engineering", 32),
            createMajor("Ingénierie Biomédicale (Biomedical Engineering)", "BIOMED", "Engineering", 33),
            createMajor("Science des Données (Data Science)", "DATA_SCIENCE", "Technology", 34),
            createMajor("Économie (Economics)", "ECONOMICS", "Social Sciences", 35),
            createMajor("Génie Chimique (Chemical Engineering)", "CHEM_ENG", "Engineering", 36),
            createMajor("Ingénierie Pétrolière", "PETROLEUM", "Engineering", 37),
            createMajor("Ingénierie Électronique et de l'Information (Electronic and Information Engineering)", "ELECTRONIC", "Engineering", 38),
            createMajor("Ingénierie de la Sécurité (Safety Engineering)", "SAFETY", "Engineering", 39),
            createMajor("Ingénierie Minière (Mining Engineering)", "MINING", "Engineering", 40),
            createMajor("Psychologie (Psychology)", "PSYCHOLOGY", "Social Sciences", 41),
            createMajor("Ingénierie Aéronautique (Aeronautical Engineering)", "AERONAUTICAL", "Engineering", 42),
            createMajor("Ingénierie Aérospatiale (Aerospace Engineering)", "AEROSPACE", "Engineering", 43),
            createMajor("Médecine (Medicine)", "MEDICINE", "Health", 44)
        );

        majorRepository.saveAll(majors);
        log.info("✅ {} majeures initialisées", majors.size());
    }

    private OrientationMajor createMajor(String name, String code, String category, int order) {
        return OrientationMajor.builder()
            .majorName(name)
            .majorCode(code)
            .description(name + " description")
            .userDescription(name + " user description")
            .category(category)
            .isActive(true)
            .displayOrder(order)
            .createdAt(LocalDateTime.now())
            .build();
    }

    private void initializeAllIdealProfiles() {
        // Récupérer les majeures pour créer les profils idéaux
        List<OrientationMajor> majors = majorRepository.findAll();
        
        // Définir les profils idéaux pour chaque majeure
        Map<String, Map<String, Integer>> idealProfilesData = getIdealProfilesData();
        
        for (OrientationMajor major : majors) {
            Map<String, Integer> profile = idealProfilesData.get(major.getMajorCode());
            if (profile != null) {
                List<IdealProfile> profiles = Arrays.asList(
                    createIdealProfile(major, "Interet_Scientifique_Tech", profile.get("Interet_Scientifique_Tech")),
                    createIdealProfile(major, "Interet_Artistique_Creatif", profile.get("Interet_Artistique_Creatif")),
                    createIdealProfile(major, "Interet_Social_Humain", profile.get("Interet_Social_Humain")),
                    createIdealProfile(major, "Interet_Business_Gestion", profile.get("Interet_Business_Gestion")),
                    createIdealProfile(major, "Interet_Logique_Analytique", profile.get("Interet_Logique_Analytique")),
                    createIdealProfile(major, "Competence_Resolution_Problemes", profile.get("Competence_Resolution_Problemes")),
                    createIdealProfile(major, "Competence_Communication", profile.get("Competence_Communication")),
                    createIdealProfile(major, "Competence_Organisation", profile.get("Competence_Organisation")),
                    createIdealProfile(major, "Competence_Manuel_Technique", profile.get("Competence_Manuel_Technique")),
                    createIdealProfile(major, "Valeur_Impact_Societal", profile.get("Valeur_Impact_Societal")),
                    createIdealProfile(major, "Valeur_Innovation_Challenge", profile.get("Valeur_Innovation_Challenge")),
                    createIdealProfile(major, "Valeur_Stabilite_Securite", profile.get("Valeur_Stabilite_Securite")),
                    createIdealProfile(major, "Valeur_Autonomie", profile.get("Valeur_Autonomie")),
                    createIdealProfile(major, "Pref_Travail_Equipe_Collab", profile.get("Pref_Travail_Equipe_Collab")),
                    createIdealProfile(major, "Pref_Travail_Autonome", profile.get("Pref_Travail_Autonome")),
                    createIdealProfile(major, "Pref_Pratique_Terrain", profile.get("Pref_Pratique_Terrain")),
                    createIdealProfile(major, "Pref_Theorie_Recherche", profile.get("Pref_Theorie_Recherche"))
                );
                
                idealProfileRepository.saveAll(profiles);
            }
        }
        
        log.info("✅ Profils idéaux initialisés pour {} majeures", majors.size());
    }

    private Map<String, Map<String, Integer>> getIdealProfilesData() {
        Map<String, Map<String, Integer>> data = new HashMap<>();
        
        // Génie Civil
        Map<String, Integer> civilProfile = new HashMap<>();
        civilProfile.put("Interet_Scientifique_Tech", 90);
        civilProfile.put("Interet_Artistique_Creatif", 40);
        civilProfile.put("Interet_Social_Humain", 50);
        civilProfile.put("Interet_Business_Gestion", 60);
        civilProfile.put("Interet_Logique_Analytique", 90);
        civilProfile.put("Competence_Resolution_Problemes", 90);
        civilProfile.put("Competence_Communication", 75);
        civilProfile.put("Competence_Organisation", 90);
        civilProfile.put("Competence_Manuel_Technique", 85);
        civilProfile.put("Valeur_Impact_Societal", 80);
        civilProfile.put("Valeur_Innovation_Challenge", 85);
        civilProfile.put("Valeur_Stabilite_Securite", 80);
        civilProfile.put("Valeur_Autonomie", 70);
        civilProfile.put("Pref_Travail_Equipe_Collab", 80);
        civilProfile.put("Pref_Travail_Autonome", 60);
        civilProfile.put("Pref_Pratique_Terrain", 90);
        civilProfile.put("Pref_Theorie_Recherche", 60);
        data.put("CIVIL", civilProfile);
        
        // Génie Mécanique
        Map<String, Integer> mechProfile = new HashMap<>();
        mechProfile.put("Interet_Scientifique_Tech", 95);
        mechProfile.put("Interet_Artistique_Creatif", 30);
        mechProfile.put("Interet_Social_Humain", 20);
        mechProfile.put("Interet_Business_Gestion", 50);
        mechProfile.put("Interet_Logique_Analytique", 95);
        mechProfile.put("Competence_Resolution_Problemes", 95);
        mechProfile.put("Competence_Communication", 65);
        mechProfile.put("Competence_Organisation", 80);
        mechProfile.put("Competence_Manuel_Technique", 90);
        mechProfile.put("Valeur_Impact_Societal", 70);
        mechProfile.put("Valeur_Innovation_Challenge", 90);
        mechProfile.put("Valeur_Stabilite_Securite", 70);
        mechProfile.put("Valeur_Autonomie", 80);
        mechProfile.put("Pref_Travail_Equipe_Collab", 75);
        mechProfile.put("Pref_Travail_Autonome", 70);
        mechProfile.put("Pref_Pratique_Terrain", 85);
        mechProfile.put("Pref_Theorie_Recherche", 70);
        data.put("MECH", mechProfile);
        
        // Architecture
        Map<String, Integer> archProfile = new HashMap<>();
        archProfile.put("Interet_Scientifique_Tech", 60);
        archProfile.put("Interet_Artistique_Creatif", 90);
        archProfile.put("Interet_Social_Humain", 70);
        archProfile.put("Interet_Business_Gestion", 50);
        archProfile.put("Interet_Logique_Analytique", 80);
        archProfile.put("Competence_Resolution_Problemes", 80);
        archProfile.put("Competence_Communication", 85);
        archProfile.put("Competence_Organisation", 85);
        archProfile.put("Competence_Manuel_Technique", 85);
        archProfile.put("Valeur_Impact_Societal", 85);
        archProfile.put("Valeur_Innovation_Challenge", 90);
        archProfile.put("Valeur_Stabilite_Securite", 60);
        archProfile.put("Valeur_Autonomie", 80);
        archProfile.put("Pref_Travail_Equipe_Collab", 80);
        archProfile.put("Pref_Travail_Autonome", 70);
        archProfile.put("Pref_Pratique_Terrain", 70);
        archProfile.put("Pref_Theorie_Recherche", 60);
        data.put("ARCH", archProfile);
        
        // Commerce International
        Map<String, Integer> busProfile = new HashMap<>();
        busProfile.put("Interet_Scientifique_Tech", 40);
        busProfile.put("Interet_Artistique_Creatif", 40);
        busProfile.put("Interet_Social_Humain", 80);
        busProfile.put("Interet_Business_Gestion", 98);
        busProfile.put("Interet_Logique_Analytique", 85);
        busProfile.put("Competence_Resolution_Problemes", 85);
        busProfile.put("Competence_Communication", 95);
        busProfile.put("Competence_Organisation", 90);
        busProfile.put("Competence_Manuel_Technique", 20);
        busProfile.put("Valeur_Impact_Societal", 60);
        busProfile.put("Valeur_Innovation_Challenge", 85);
        busProfile.put("Valeur_Stabilite_Securite", 70);
        busProfile.put("Valeur_Autonomie", 80);
        busProfile.put("Pref_Travail_Equipe_Collab", 90);
        busProfile.put("Pref_Travail_Autonome", 60);
        busProfile.put("Pref_Pratique_Terrain", 70);
        busProfile.put("Pref_Theorie_Recherche", 60);
        data.put("BUS", busProfile);
        
        // Informatique
        Map<String, Integer> csProfile = new HashMap<>();
        csProfile.put("Interet_Scientifique_Tech", 98);
        csProfile.put("Interet_Artistique_Creatif", 40);
        csProfile.put("Interet_Social_Humain", 30);
        csProfile.put("Interet_Business_Gestion", 40);
        csProfile.put("Interet_Logique_Analytique", 98);
        csProfile.put("Competence_Resolution_Problemes", 98);
        csProfile.put("Competence_Communication", 70);
        csProfile.put("Competence_Organisation", 80);
        csProfile.put("Competence_Manuel_Technique", 50);
        csProfile.put("Valeur_Impact_Societal", 60);
        csProfile.put("Valeur_Innovation_Challenge", 95);
        csProfile.put("Valeur_Stabilite_Securite", 70);
        csProfile.put("Valeur_Autonomie", 85);
        csProfile.put("Pref_Travail_Equipe_Collab", 70);
        csProfile.put("Pref_Travail_Autonome", 80);
        csProfile.put("Pref_Pratique_Terrain", 40);
        csProfile.put("Pref_Theorie_Recherche", 80);
        data.put("CS", csProfile);
        
        // Ajouter d'autres majeures avec des profils par défaut
        String[] otherMajors = {"BUS_ADMIN", "ECON_TRADE", "MARKETING", "IT", "AI", "TOURISM", "NURSING", 
                               "PHARMACY", "ELECTRICAL", "FOOD_SCIENCE", "FINANCE", "MECH_DESIGN", "LAW", 
                               "POLITICS", "MBBS", "PR", "CHEMISTRY", "ENGLISH", "DENTISTRY", "ENERGY", 
                               "HYDRAULIC", "TRANSPORT", "BIOENG", "BIOTECH", "MATERIALS", "ECOMMERCE", 
                               "ROBOTICS", "BIOMED", "DATA_SCIENCE", "ECONOMICS", "CHEM_ENG", "PETROLEUM", 
                               "ELECTRONIC", "SAFETY", "MINING", "PSYCHOLOGY", "AERONAUTICAL", "AEROSPACE", "MEDICINE"};
        
        for (String majorCode : otherMajors) {
            Map<String, Integer> defaultProfile = new HashMap<>();
            defaultProfile.put("Interet_Scientifique_Tech", 70);
            defaultProfile.put("Interet_Artistique_Creatif", 50);
            defaultProfile.put("Interet_Social_Humain", 60);
            defaultProfile.put("Interet_Business_Gestion", 60);
            defaultProfile.put("Interet_Logique_Analytique", 80);
            defaultProfile.put("Competence_Resolution_Problemes", 80);
            defaultProfile.put("Competence_Communication", 75);
            defaultProfile.put("Competence_Organisation", 80);
            defaultProfile.put("Competence_Manuel_Technique", 60);
            defaultProfile.put("Valeur_Impact_Societal", 70);
            defaultProfile.put("Valeur_Innovation_Challenge", 80);
            defaultProfile.put("Valeur_Stabilite_Securite", 70);
            defaultProfile.put("Valeur_Autonomie", 70);
            defaultProfile.put("Pref_Travail_Equipe_Collab", 80);
            defaultProfile.put("Pref_Travail_Autonome", 60);
            defaultProfile.put("Pref_Pratique_Terrain", 70);
            defaultProfile.put("Pref_Theorie_Recherche", 70);
            data.put(majorCode, defaultProfile);
        }
        
        return data;
    }

    private IdealProfile createIdealProfile(OrientationMajor major, String pillarName, Integer score) {
        return IdealProfile.builder()
            .major(major)
            .pillarName(pillarName)
            .idealScore(score)
            .build();
    }
}
