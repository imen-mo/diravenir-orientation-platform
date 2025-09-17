package com.diravenir.service;

import com.diravenir.dto.OrientationRequestDTO;
import com.diravenir.dto.OrientationResultDTO;
import com.diravenir.dto.MajorRecommendationDto;
import com.diravenir.Entities.OrientationMajor;
import com.diravenir.Entities.IdealProfile;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrientationCalculationService {
    
    private final ObjectMapper objectMapper;
    private final OrientationScoringService scoringService;
    private final IdealProfilesService idealProfilesService;
    
    /**
     * Calcule le profil complet de l'utilisateur basé sur ses réponses
     */
    public Map<String, Integer> calculateUserProfile(OrientationRequestDTO request) {
        log.info("🧮 Calcul du profil utilisateur avec le nouveau service de scoring");
        
        // Convertir les réponses en format Map pour le service de scoring
        Map<String, String> answers = new HashMap<>();
        answers.put("q1", request.getQ1());
        answers.put("q2", request.getQ2());
        answers.put("q3", request.getQ3());
        answers.put("q4", request.getQ4());
        answers.put("q5", request.getQ5());
        answers.put("q6", request.getQ6());
        answers.put("q7", request.getQ7());
        answers.put("q8", request.getQ8());
        answers.put("q9", request.getQ9());
        answers.put("q10", request.getQ10());
        answers.put("q11", request.getQ11());
        answers.put("q12", request.getQ12());
        answers.put("q13", request.getQ13());
        answers.put("q14", request.getQ14());
        
        // Utiliser le service de scoring centralisé
        return scoringService.calculateUserProfile(answers);
    }
    
    /**
     * Calcule les recommandations de majeures avec scores de correspondance
     */
    public List<MajorRecommendationDto> calculateRecommendations(
            Map<String, Integer> userProfile, 
            List<OrientationMajor> majors, 
            List<IdealProfile> idealProfiles) {
        
        List<MajorRecommendationDto> recommendations = new ArrayList<>();
        
        for (OrientationMajor major : majors) {
            // Récupérer le profil idéal de cette majeure
            Map<String, Integer> idealProfile = getIdealProfileForMajor(major.getId(), idealProfiles);
            
            if (idealProfile.isEmpty()) {
                log.warn("Aucun profil idéal trouvé pour la majeure: {}", major.getMajorName());
                continue;
            }
            
            // Calculer le score de correspondance avec la nouvelle formule de normalisation
            double matchingScore = idealProfilesService.calculateMatchingScore(userProfile, idealProfile);
            
            // Générer les raisons personnalisées
            String whyThisMajor = generateWhyThisMajor(userProfile, idealProfile);
            
            // Obtenir la description de la majeure
            String description = getMajorDescription(major.getMajorCode());
            
            // Créer la recommandation
            MajorRecommendationDto recommendation = MajorRecommendationDto.builder()
                    .majorCode(major.getMajorCode())
                    .majorName(major.getMajorName())
                    .matchingScore(matchingScore)
                    .matchingPercentage(String.format("%.1f%%", matchingScore).replace(",", "."))
                    .category(major.getCategory())
                    .description(description)
                    .reasoning(whyThisMajor)
                    .whyThisMajor(whyThisMajor)
                    .pillarScores(convertToDoubleMap(idealProfile))
                    .build();
            
            recommendations.add(recommendation);
        }
        
        // Trier par score de correspondance décroissant
        return recommendations.stream()
                .sorted((r1, r2) -> Double.compare(r2.getMatchingScore(), r1.getMatchingScore()))
                .collect(Collectors.toList());
    }
    
    /**
     * Calcule le score de correspondance avec Distance Euclidienne Pondérée
     * Formule: Score_matching = 100 - sqrt(sum((DiffP * PoidsP)^2)) / facteur_normalisation
     * où DiffP = |Profil_Utilisateur[P] - Profil_Ideal_Majeure[P]|
     * et PoidsP = score idéal du pilier pour la majeure
     */
    private double calculateWeightedEuclideanDistance(Map<String, Integer> userProfile, Map<String, Integer> idealProfile) {
        double sumWeightedSquaredDifferences = 0.0;
        int validPillars = 0;
        
        for (String pillar : userProfile.keySet()) {
            int userScore = userProfile.get(pillar);
            int idealScore = idealProfile.getOrDefault(pillar, 0);
            
            // Ne considérer que les piliers avec un score idéal > 0
            if (idealScore > 0) {
                // DiffP = différence absolue entre profil utilisateur et profil idéal
                double diffP = Math.abs(userScore - idealScore);
                
                // PoidsP = score idéal du pilier pour la majeure (normalisé sur 1.0)
                double poidsP = idealScore / 100.0;
                
                // Calculer (DiffP * PoidsP)^2 et l'ajouter à la somme
                sumWeightedSquaredDifferences += Math.pow(diffP * poidsP, 2);
                validPillars++;
            }
        }
        
        if (validPillars == 0) return 0.0;
        
        // Score_matching = 100 - sqrt(sum((DiffP * PoidsP)^2)) * facteur_normalisation
        double euclideanDistance = Math.sqrt(sumWeightedSquaredDifferences);
        
        // Facteur de normalisation pour obtenir des scores réalistes (0-100%)
        // Plus le facteur est élevé, plus les scores seront élevés
        double normalizationFactor = 2.0; // Ajusté selon les recommandations des .md
        double matchingScore = 100 - (euclideanDistance * normalizationFactor);
        
        // S'assurer que le score reste dans la plage [0, 100]
        double normalizedScore = Math.max(0, Math.min(100, matchingScore));
        
        log.debug("Calcul Distance Euclidienne Pondérée: somme={}, distance={}, facteur={}, score={}", 
                 sumWeightedSquaredDifferences, euclideanDistance, normalizationFactor, normalizedScore);
        
        return normalizedScore;
    }
    
    /**
     * Obtient la description d'une majeure
     */
    private String getMajorDescription(String majorCode) {
        Map<String, String> descriptions = new HashMap<>();
        
        // Ajouter toutes les descriptions
        descriptions.put("CS", "L'informatique est la science qui révolutionne notre monde numérique, combinant logique, créativité et innovation pour créer des solutions technologiques.");
        descriptions.put("ELECTRICAL", "Le génie électrique est au cœur de l'innovation technologique, couvrant la conception, l'analyse et la fabrication de systèmes électriques.");
        descriptions.put("CIVIL", "Le génie civil est une discipline qui combine créativité et rigueur technique pour concevoir et construire les infrastructures qui façonnent notre environnement.");
        descriptions.put("MECH", "Le génie mécanique est au cœur de l'innovation industrielle, couvrant la conception, l'analyse et la fabrication de systèmes mécaniques.");
        descriptions.put("FOODSCI", "Les sciences et ingénierie alimentaires combinent technologie et nutrition pour développer des solutions alimentaires innovantes et durables.");
        descriptions.put("ARCH", "L'architecture est la discipline qui façonne notre environnement bâti, combinant créativité artistique et rigueur technique pour concevoir des espaces fonctionnels et esthétiques.");
        descriptions.put("DATASCI", "La science des données transforme l'information en connaissances exploitables, utilisant l'analyse statistique et l'intelligence artificielle pour résoudre des problèmes complexes.");
        descriptions.put("SE", "Le génie logiciel est l'art de concevoir, développer et maintenir des systèmes logiciels robustes et efficaces qui répondent aux besoins des utilisateurs.");
        descriptions.put("CHEM", "La chimie appliquée explore les propriétés et transformations de la matière pour créer des solutions innovantes dans l'industrie et la recherche.");
        descriptions.put("ECONOMICS", "L'économie analyse les mécanismes de production, distribution et consommation des richesses pour comprendre et améliorer le fonctionnement des sociétés.");
        descriptions.put("AI", "L'intelligence artificielle développe des systèmes capables d'apprendre, de raisonner et de prendre des décisions autonomes pour révolutionner notre quotidien.");
        descriptions.put("INTECON", "L'économie et commerce international explore les échanges commerciaux mondiaux et les stratégies d'expansion des entreprises sur les marchés internationaux.");
        descriptions.put("INTPOL", "La politique internationale analyse les relations entre États, les organisations internationales et les enjeux géopolitiques qui façonnent notre monde.");
        descriptions.put("MATERIALS", "La science et ingénierie des matériaux développe de nouveaux matériaux aux propriétés exceptionnelles pour répondre aux défis technologiques du futur.");
        descriptions.put("CHEMICAL", "Le génie chimique transforme les matières premières en produits utiles, optimisant les processus industriels pour un développement durable.");
        descriptions.put("PHARMACY", "La pharmacie combine sciences pharmaceutiques et soins de santé pour développer des médicaments sûrs et efficaces qui améliorent la qualité de vie.");
        descriptions.put("FINANCE", "La finance analyse les marchés financiers et développe des stratégies d'investissement pour optimiser la gestion des ressources et créer de la valeur.");
        descriptions.put("ELECTRONIC_INFO", "L'ingénierie électronique et de l'information conçoit les systèmes électroniques et informatiques qui sont au cœur de la révolution numérique.");
        descriptions.put("HYDRAULIC", "L'ingénierie hydraulique développe des solutions pour la gestion de l'eau, l'irrigation et l'énergie hydraulique, essentiels au développement durable.");
        descriptions.put("BIOTECH", "La biotechnologie utilise les organismes vivants pour créer des produits innovants dans les domaines de la santé, l'agriculture et l'environnement.");
        descriptions.put("LAW", "Le droit établit les règles qui régissent les relations sociales et économiques, garantissant la justice et l'équité dans notre société.");
        descriptions.put("TRANSPORT", "L'ingénierie des transports conçoit des systèmes de mobilité efficaces et durables pour connecter les personnes et les biens dans un monde globalisé.");
        descriptions.put("NEWENERGY", "Les sciences et ingénierie des nouvelles énergies développent des solutions énergétiques propres et renouvelables pour un avenir durable.");
        descriptions.put("BIOENG", "La bioingénierie applique les principes d'ingénierie aux systèmes biologiques pour créer des solutions innovantes en médecine et biotechnologie.");
        descriptions.put("BUSADM", "L'administration des affaires forme des leaders capables de gérer efficacement les organisations et de créer de la valeur dans un environnement concurrentiel.");
        descriptions.put("PETROLEUM", "L'ingénierie pétrolière optimise l'extraction et la transformation des ressources énergétiques fossiles tout en développant des alternatives durables.");
        descriptions.put("MECH_DESIGN", "La conception mécanique, fabrication et automatisation révolutionne la production industrielle grâce à l'innovation technologique et l'automatisation.");
        descriptions.put("INTBUS", "Le commerce international développe des stratégies d'expansion mondiale et optimise les chaînes d'approvisionnement pour conquérir les marchés internationaux.");
        descriptions.put("ROBOTICS", "L'ingénierie robotique crée des systèmes autonomes intelligents qui révolutionnent l'industrie, la médecine et notre quotidien.");
        descriptions.put("BIOMEDICAL", "L'ingénierie biomédicale développe des technologies médicales innovantes pour améliorer les diagnostics et les traitements de santé.");
        descriptions.put("SAFETY", "L'ingénierie de la sécurité protège les personnes et les biens en développant des systèmes et procédures qui minimisent les risques industriels.");
        descriptions.put("ECOMMERCE", "L'e-commerce révolutionne le commerce en ligne en créant des plateformes digitales innovantes qui connectent consommateurs et entreprises.");
        descriptions.put("NURSING", "Les soins infirmiers offrent des soins de santé complets et compassionnels, jouant un rôle essentiel dans le bien-être des patients et des communautés.");
        descriptions.put("MINING", "L'ingénierie minière optimise l'extraction responsable des ressources minérales tout en préservant l'environnement et en assurant la sécurité des travailleurs.");
        descriptions.put("MARKET", "Le marketing et management développe des stratégies commerciales innovantes pour créer de la valeur et satisfaire les besoins des consommateurs.");
        descriptions.put("PR", "Les relations publiques construisent et maintiennent l'image positive des organisations en développant des stratégies de communication efficaces.");
        descriptions.put("AERONAUTICAL", "L'ingénierie aéronautique conçoit des aéronefs performants et sûrs qui révolutionnent le transport aérien et l'exploration spatiale.");
        descriptions.put("TOURISM", "La gestion du tourisme développe des expériences touristiques mémorables tout en préservant les patrimoines culturels et naturels.");
        descriptions.put("AEROSPACE", "L'ingénierie aérospatiale explore les frontières de l'espace en développant des technologies de pointe pour l'aviation et l'astronautique.");
        descriptions.put("MBBS", "La médecine forme des professionnels de santé dévoués qui diagnostiquent, traitent et préviennent les maladies pour améliorer la qualité de vie.");
        descriptions.put("MEDICINE", "La médecine allie science et humanité pour soigner les patients, prévenir les maladies et améliorer la santé publique.");
        descriptions.put("DENTISTRY", "La médecine dentaire préserve et restaure la santé bucco-dentaire en combinant expertise technique et soins personnalisés.");
        descriptions.put("PSYCHOLOGY", "La psychologie explore le comportement humain et développe des thérapies pour améliorer le bien-être mental et émotionnel des individus.");
        descriptions.put("ENGLISH", "Les études anglaises approfondissent la langue et la culture anglophones pour développer des compétences de communication et d'analyse critique.");
        
        return descriptions.getOrDefault(majorCode, "Cette majeure correspond bien à votre profil général et offre de nombreuses opportunités de carrière.");
    }
    
    /**
     * Génère le texte "Pourquoi cette majeure est faite pour vous"
     */
    private String generateWhyThisMajor(Map<String, Integer> userProfile, Map<String, Integer> idealProfile) {
        List<String> strongMatches = new ArrayList<>();
        
        for (String pillar : userProfile.keySet()) {
            int userScore = userProfile.get(pillar);
            int idealScore = idealProfile.getOrDefault(pillar, 0);
            
            // Identifier les correspondances fortes (score élevé et différence faible)
            if (userScore >= 70 && idealScore >= 70 && Math.abs(userScore - idealScore) <= 15) {
                strongMatches.add(pillar);
            }
        }
        
        if (strongMatches.isEmpty()) {
            return "Votre profil présente une correspondance générale avec cette majeure.";
        }
        
        // Générer un texte basé sur les correspondances fortes
        StringBuilder text = new StringBuilder("Vos points forts qui correspondent particulièrement à cette majeure : ");
        
        for (int i = 0; i < Math.min(3, strongMatches.size()); i++) {
            String pillar = strongMatches.get(i);
            String pillarText = getPillarDisplayName(pillar);
            
            if (i > 0) {
                text.append(i == strongMatches.size() - 1 ? " et " : ", ");
            }
            text.append(pillarText);
        }
        
        text.append(".");
        return text.toString();
    }
    
    /**
     * Convertit une Map<String, Integer> en Map<String, Double>
     */
    private Map<String, Double> convertToDoubleMap(Map<String, Integer> intMap) {
        Map<String, Double> doubleMap = new HashMap<>();
        for (Map.Entry<String, Integer> entry : intMap.entrySet()) {
            doubleMap.put(entry.getKey(), entry.getValue().doubleValue());
        }
        return doubleMap;
    }
    
    /**
     * Récupère le profil idéal d'une majeure
     */
    private Map<String, Integer> getIdealProfileForMajor(Long majorId, List<IdealProfile> idealProfiles) {
        Map<String, Integer> profile = new HashMap<>();
        
        for (IdealProfile idealProfile : idealProfiles) {
            if (idealProfile.getMajor().getId().equals(majorId)) {
                profile.put(idealProfile.getPillarName(), idealProfile.getIdealScore());
            }
        }
        
        return profile;
    }
    
    /**
     * Initialise les scores des piliers à 0
     */
    private void initializePillarScores(Map<String, Integer> pillarScores) {
        String[] pillars = {
            "Interet_Scientifique_Tech", "Interet_Artistique_Creatif", "Interet_Social_Humain",
            "Interet_Business_Gestion", "Interet_Logique_Analytique", "Competence_Resolution_Problemes",
            "Competence_Communication", "Competence_Organisation", "Competence_Manuel_Technique",
            "Valeur_Impact_Societal", "Valeur_Innovation_Challenge", "Valeur_Stabilite_Securite",
            "Valeur_Autonomie", "Pref_Travail_Equipe_Collab", "Pref_Travail_Autonome",
            "Pref_Pratique_Terrain", "Pref_Theorie_Recherche"
        };
        
        for (String pillar : pillars) {
            pillarScores.put(pillar, 0);
        }
    }
    
    /**
     * Normalise les scores sur une échelle de 0 à 100
     */
    private void normalizeScores(Map<String, Integer> pillarScores) {
        int maxScore = pillarScores.values().stream().mapToInt(Integer::intValue).max().orElse(1);
        
        pillarScores.replaceAll((pillar, score) -> {
            if (maxScore > 0) {
                return (int) Math.round((double) score / maxScore * 100);
            }
            return 0;
        });
    }
    
    /**
     * Convertit le nom technique du pilier en nom d'affichage
     */
    private String getPillarDisplayName(String pillar) {
        Map<String, String> pillarNames = new HashMap<>();
        pillarNames.put("Interet_Scientifique_Tech", "intérêt pour les sciences et technologies");
        pillarNames.put("Interet_Artistique_Creatif", "créativité artistique");
        pillarNames.put("Interet_Social_Humain", "intérêt pour les relations humaines");
        pillarNames.put("Interet_Business_Gestion", "intérêt pour le business et la gestion");
        pillarNames.put("Interet_Logique_Analytique", "pensée logique et analytique");
        pillarNames.put("Competence_Resolution_Problemes", "capacité de résolution de problèmes");
        pillarNames.put("Competence_Communication", "compétences en communication");
        pillarNames.put("Competence_Organisation", "compétences organisationnelles");
        pillarNames.put("Competence_Manuel_Technique", "compétences manuelles et techniques");
        pillarNames.put("Valeur_Impact_Societal", "désir d'impact sociétal");
        pillarNames.put("Valeur_Innovation_Challenge", "goût pour l'innovation et les défis");
        pillarNames.put("Valeur_Stabilite_Securite", "recherche de stabilité et sécurité");
        pillarNames.put("Valeur_Autonomie", "désir d'autonomie");
        pillarNames.put("Pref_Travail_Equipe_Collab", "préférence pour le travail en équipe");
        pillarNames.put("Pref_Travail_Autonome", "préférence pour le travail autonome");
        pillarNames.put("Pref_Pratique_Terrain", "préférence pour le travail pratique");
        pillarNames.put("Pref_Theorie_Recherche", "préférence pour la théorie et la recherche");
        
        return pillarNames.getOrDefault(pillar, pillar);
    }
    
    // Méthodes de traitement des questions individuelles selon les spécifications exactes
    
    private void processQuestion1(String answer, Map<String, Integer> pillarScores) {
        if (answer == null) return;
        
        switch (answer) {
            case "A": // Créer
                addScore(pillarScores, "Interet_Scientifique_Tech", 5);
                addScore(pillarScores, "Interet_Artistique_Creatif", 3);
                addScore(pillarScores, "Valeur_Innovation_Challenge", 4);
                addScore(pillarScores, "Competence_Manuel_Technique", 2);
                break;
            case "B": // Comprendre
                addScore(pillarScores, "Interet_Scientifique_Tech", 4);
                addScore(pillarScores, "Interet_Logique_Analytique", 5);
                addScore(pillarScores, "Competence_Resolution_Problemes", 4);
                addScore(pillarScores, "Pref_Theorie_Recherche", 3);
                break;
            case "C": // Aider
                addScore(pillarScores, "Interet_Social_Humain", 5);
                addScore(pillarScores, "Valeur_Impact_Societal", 5);
                addScore(pillarScores, "Competence_Communication", 4);
                break;
            case "D": // Organiser
                addScore(pillarScores, "Interet_Business_Gestion", 5);
                addScore(pillarScores, "Competence_Organisation", 5);
                addScore(pillarScores, "Pref_Travail_Equipe_Collab", 3);
                break;
            case "E": // Créativité
                addScore(pillarScores, "Interet_Artistique_Creatif", 5);
                addScore(pillarScores, "Valeur_Innovation_Challenge", 2);
                addScore(pillarScores, "Pref_Travail_Autonome", 3);
                break;
        }
    }
    
    private void processQuestion2(String answer, Map<String, Integer> pillarScores) {
        if (answer == null) return;
        
        // Question 2 single-choice selon les spécifications
        switch (answer) {
            case "scientific":
                addScore(pillarScores, "Interet_Scientifique_Tech", 3);
                addScore(pillarScores, "Valeur_Innovation_Challenge", 2);
                break;
            case "art":
                addScore(pillarScores, "Interet_Artistique_Creatif", 3);
                break;
            case "social":
                addScore(pillarScores, "Interet_Social_Humain", 3);
                addScore(pillarScores, "Valeur_Impact_Societal", 2);
                break;
            case "business":
                addScore(pillarScores, "Interet_Business_Gestion", 3);
                break;
            case "organization":
                addScore(pillarScores, "Competence_Organisation", 3);
                break;
            case "sports":
                addScore(pillarScores, "Competence_Manuel_Technique", 3);
                break;
        }
    }
    
    private void processQuestion3(String answer, Map<String, Integer> pillarScores) {
        if (answer == null) return;
        
        switch (answer) {
            case "A": // Électronique
                addScore(pillarScores, "Interet_Scientifique_Tech", 3);
                addScore(pillarScores, "Competence_Manuel_Technique", 2);
                break;
            case "B": // Livres
                addScore(pillarScores, "Interet_Logique_Analytique", 3);
                addScore(pillarScores, "Pref_Theorie_Recherche", 2);
                break;
            case "C": // Art
                addScore(pillarScores, "Interet_Artistique_Creatif", 3);
                break;
            case "D": // Jeux
                addScore(pillarScores, "Interet_Social_Humain", 3);
                break;
            case "E": // Mode
                addScore(pillarScores, "Interet_Business_Gestion", 3);
                addScore(pillarScores, "Interet_Artistique_Creatif", 2);
                break;
        }
    }
    
    private void processQuestion4(String answer, Map<String, Integer> pillarScores) {
        if (answer == null) return;
        
        switch (answer) {
            case "A": // Décomposer
                addScore(pillarScores, "Competence_Resolution_Problemes", 4);
                addScore(pillarScores, "Interet_Logique_Analytique", 4);
                break;
            case "B": // Chercher faits
                addScore(pillarScores, "Interet_Scientifique_Tech", 3);
                addScore(pillarScores, "Interet_Logique_Analytique", 3);
                addScore(pillarScores, "Pref_Theorie_Recherche", 2);
                break;
            case "C": // Imaginer
                addScore(pillarScores, "Interet_Artistique_Creatif", 4);
                addScore(pillarScores, "Valeur_Innovation_Challenge", 4);
                break;
            case "D": // Autres
                addScore(pillarScores, "Competence_Communication", 4);
                addScore(pillarScores, "Pref_Travail_Equipe_Collab", 4);
                addScore(pillarScores, "Interet_Social_Humain", 2);
                break;
        }
    }
    
    private void processQuestion5(String answer, Map<String, Integer> pillarScores) {
        if (answer == null) return;
        
        // Question 5 single-choice avec scores selon spécifications
        switch (answer) {
            case "budget":
                addScore(pillarScores, "Interet_Business_Gestion", 4);
                addScore(pillarScores, "Competence_Organisation", 4);
                addScore(pillarScores, "Interet_Logique_Analytique", 3);
                break;
            case "event":
                addScore(pillarScores, "Competence_Organisation", 4);
                addScore(pillarScores, "Pref_Travail_Equipe_Collab", 4);
                addScore(pillarScores, "Competence_Communication", 3);
                break;
            case "writing":
                addScore(pillarScores, "Competence_Communication", 4);
                addScore(pillarScores, "Interet_Artistique_Creatif", 4);
                break;
            case "repair":
                addScore(pillarScores, "Competence_Manuel_Technique", 4);
                addScore(pillarScores, "Interet_Scientifique_Tech", 4);
                break;
            case "drawing":
                addScore(pillarScores, "Interet_Artistique_Creatif", 4);
                addScore(pillarScores, "Competence_Manuel_Technique", 4);
                break;
            case "equation":
                addScore(pillarScores, "Interet_Logique_Analytique", 4);
                addScore(pillarScores, "Interet_Scientifique_Tech", 4);
                break;
            case "convince":
                addScore(pillarScores, "Competence_Communication", 4);
                addScore(pillarScores, "Interet_Business_Gestion", 4);
                break;
            case "counsel":
                addScore(pillarScores, "Interet_Social_Humain", 4);
                addScore(pillarScores, "Competence_Communication", 4);
                break;
        }
    }
    
    private void processQuestion6(String answer, Map<String, Integer> pillarScores) {
        if (answer == null) return;
        
        switch (answer) {
            case "A": // Lire
                addScore(pillarScores, "Pref_Theorie_Recherche", 4);
                addScore(pillarScores, "Interet_Logique_Analytique", 3);
                break;
            case "B": // Vidéo
                addScore(pillarScores, "Interet_Scientifique_Tech", 3);
                break;
            case "C": // Essayer
                addScore(pillarScores, "Competence_Manuel_Technique", 4);
                addScore(pillarScores, "Pref_Pratique_Terrain", 4);
                break;
            case "D": // Discuter
                addScore(pillarScores, "Competence_Communication", 4);
                addScore(pillarScores, "Pref_Travail_Equipe_Collab", 4);
                break;
        }
    }
    
    private void processQuestion7(String answer, Map<String, Integer> pillarScores) {
        if (answer == null) return;
        
        switch (answer) {
            case "A": // Améliorer vie
                addScore(pillarScores, "Valeur_Impact_Societal", 5);
                addScore(pillarScores, "Interet_Social_Humain", 4);
                break;
            case "B": // Systèmes efficaces
                addScore(pillarScores, "Valeur_Innovation_Challenge", 4);
                addScore(pillarScores, "Interet_Scientifique_Tech", 3);
                break;
            case "C": // Beauté
                addScore(pillarScores, "Interet_Artistique_Creatif", 5);
                break;
            case "D": // Justice
                addScore(pillarScores, "Valeur_Impact_Societal", 5);
                addScore(pillarScores, "Interet_Social_Humain", 3);
                break;
        }
    }
    
    private void processQuestion8(String answer, Map<String, Integer> pillarScores) {
        if (answer == null) return;
        
        switch (answer) {
            case "A": // Labo
                addScore(pillarScores, "Pref_Theorie_Recherche", 4);
                addScore(pillarScores, "Interet_Scientifique_Tech", 3);
                break;
            case "B": // Bureau coll.
                addScore(pillarScores, "Pref_Travail_Equipe_Collab", 4);
                addScore(pillarScores, "Interet_Business_Gestion", 2);
                break;
            case "C": // Studio
                addScore(pillarScores, "Interet_Artistique_Creatif", 4);
                addScore(pillarScores, "Competence_Manuel_Technique", 3);
                break;
            case "D": // Chantier
                addScore(pillarScores, "Pref_Pratique_Terrain", 4);
                addScore(pillarScores, "Competence_Manuel_Technique", 3);
                break;
            case "E": // Calme
                addScore(pillarScores, "Pref_Travail_Autonome", 4);
                addScore(pillarScores, "Pref_Theorie_Recherche", 2);
                break;
        }
    }
    
    private void processQuestion9(String answer, Map<String, Integer> pillarScores) {
        if (answer == null) return;
        
        // Question 9 single-choice avec scores selon spécifications
        switch (answer) {
            case "security":
                addScore(pillarScores, "Valeur_Stabilite_Securite", 5);
                break;
            case "innovation":
                addScore(pillarScores, "Valeur_Innovation_Challenge", 5);
                break;
            case "autonomy":
                addScore(pillarScores, "Valeur_Autonomie", 5);
                break;
            case "salary":
                addScore(pillarScores, "Interet_Business_Gestion", 5);
                break;
        }
    }
    
    private void processQuestion10(String answer, Map<String, Integer> pillarScores) {
        if (answer == null) return;
        
        switch (answer) {
            case "A": // Comprendre
                addScore(pillarScores, "Interet_Logique_Analytique", 4);
                addScore(pillarScores, "Competence_Resolution_Problemes", 3);
                break;
            case "B": // Solution concrète
                addScore(pillarScores, "Pref_Pratique_Terrain", 4);
                addScore(pillarScores, "Competence_Resolution_Problemes", 3);
                break;
            case "C": // Rallier gens
                addScore(pillarScores, "Competence_Communication", 4);
                addScore(pillarScores, "Pref_Travail_Equipe_Collab", 3);
                break;
            case "D": // Techno avancée
                addScore(pillarScores, "Valeur_Innovation_Challenge", 4);
                addScore(pillarScores, "Interet_Scientifique_Tech", 3);
                break;
        }
    }
    
    private void processQuestion11(String answer, Map<String, Integer> pillarScores) {
        if (answer == null) return;
        
        switch (answer) {
            case "A": // Seul
                addScore(pillarScores, "Pref_Travail_Autonome", 5);
                addScore(pillarScores, "Valeur_Autonomie", 4);
                break;
            case "B": // Petite équipe
                addScore(pillarScores, "Pref_Travail_Equipe_Collab", 5);
                break;
            case "C": // Grande structure
                addScore(pillarScores, "Valeur_Stabilite_Securite", 4);
                addScore(pillarScores, "Competence_Organisation", 3);
                break;
        }
    }
    
    private void processQuestion12(String answer, Map<String, Integer> pillarScores) {
        if (answer == null) return;
        
        switch (answer) {
            case "A": // Faits
                addScore(pillarScores, "Competence_Organisation", 4);
                addScore(pillarScores, "Interet_Logique_Analytique", 3);
                break;
            case "B": // Histoire
                addScore(pillarScores, "Competence_Communication", 4);
                addScore(pillarScores, "Interet_Artistique_Creatif", 3);
                break;
            case "C": // Interagir
                addScore(pillarScores, "Competence_Communication", 4);
                addScore(pillarScores, "Interet_Social_Humain", 3);
                addScore(pillarScores, "Pref_Travail_Equipe_Collab", 2);
                break;
        }
    }
    
    private void processQuestion13(String answer, Map<String, Integer> pillarScores) {
        if (answer == null) return;
        
        switch (answer) {
            case "A": // Logique
                addScore(pillarScores, "Interet_Logique_Analytique", 5);
                break;
            case "B": // Intuition
                addScore(pillarScores, "Interet_Artistique_Creatif", 4);
                addScore(pillarScores, "Pref_Travail_Autonome", 3);
                break;
            case "C": // Avis autres
                addScore(pillarScores, "Interet_Social_Humain", 4);
                addScore(pillarScores, "Pref_Travail_Equipe_Collab", 3);
                break;
        }
    }
    
    private void processQuestion14(String answer, Map<String, Integer> pillarScores) {
        if (answer == null) return;
        
        // Question 14 single-choice selon spécifications
        switch (answer) {
            case "sciences":
                addScore(pillarScores, "Interet_Scientifique_Tech", 4);
                addScore(pillarScores, "Interet_Logique_Analytique", 4);
                break;
            case "literature":
                addScore(pillarScores, "Interet_Social_Humain", 3);
                addScore(pillarScores, "Competence_Communication", 3);
                break;
            case "social":
                addScore(pillarScores, "Interet_Social_Humain", 4);
                addScore(pillarScores, "Pref_Theorie_Recherche", 2);
                break;
            case "arts":
                addScore(pillarScores, "Interet_Artistique_Creatif", 4);
                break;
            case "technology":
                addScore(pillarScores, "Interet_Scientifique_Tech", 4);
                addScore(pillarScores, "Interet_Logique_Analytique", 3);
                break;
            case "management":
                addScore(pillarScores, "Interet_Business_Gestion", 4);
                addScore(pillarScores, "Competence_Organisation", 3);
                break;
        }
    }
    
    /**
     * Ajoute un score à un pilier
     */
    private void addScore(Map<String, Integer> pillarScores, String pillar, int score) {
        pillarScores.put(pillar, pillarScores.getOrDefault(pillar, 0) + score);
    }
    
    /**
     * Obtient les recommandations basées sur le profil utilisateur avec les vrais profils idéaux
     */
    public List<MajorRecommendationDto> getRecommendationsWithIdealProfiles(Map<String, Integer> userProfile) {
        log.info("🎯 Calcul des recommandations avec les profils idéaux réels du IdealProfilesService");
        
        // Récupérer tous les profils idéaux du service
        Map<String, Map<String, Integer>> allIdealProfiles = idealProfilesService.getAllIdealProfiles();
        
        log.info("📊 Trouvé {} profils idéaux dans le service", allIdealProfiles.size());
        
        List<MajorRecommendationDto> recommendations = new ArrayList<>();
        
        // Calculer le score de correspondance pour chaque majeure
        for (Map.Entry<String, Map<String, Integer>> entry : allIdealProfiles.entrySet()) {
            String majorCode = entry.getKey();
            Map<String, Integer> idealProfile = entry.getValue();
            
            // Calculer le score de correspondance avec Distance Euclidienne Pondérée
            double matchingScore = idealProfilesService.calculateMatchingScore(userProfile, idealProfile);
            
            // Générer les raisons personnalisées
            String whyThisMajor = idealProfilesService.generateWhyThisMajor(userProfile, idealProfile);
            

            // Obtenir la description de la majeure
            String description = getMajorDescription(majorCode);
            
            // Créer la recommandation
            MajorRecommendationDto recommendation = MajorRecommendationDto.builder()
                    .majorCode(majorCode)
                    .majorName(getMajorDisplayName(majorCode))
                    .matchingScore(matchingScore)
                    .matchingPercentage(String.format("%.1f%%", matchingScore).replace(",", "."))
                    .category(getMajorCategory(majorCode))
                    .description(description)
                    .reasoning(whyThisMajor)
                    .whyThisMajor(whyThisMajor)
                    .pillarScores(convertToDoubleMap(idealProfile))
                    .build();
            
            recommendations.add(recommendation);
            
            log.debug("📊 {}: score={:.1f}%", majorCode, matchingScore);
        }
        
        // Trier par score de correspondance décroissant et limiter aux top 3
        List<MajorRecommendationDto> sortedRecommendations = recommendations.stream()
                .sorted((r1, r2) -> Double.compare(r2.getMatchingScore(), r1.getMatchingScore()))
                .limit(3) // Limiter aux top 3 comme demandé
                .collect(Collectors.toList());
        
        log.info("✅ Calcul terminé. Top 3 recommandations générées avec des scores réalistes");
        
        return sortedRecommendations;
    }
    
    /**
     * Obtient le nom d'affichage d'une majeure
     */
    private String getMajorDisplayName(String majorCode) {
        Map<String, String> majorNames = new HashMap<>();
        majorNames.put("CIVIL", "Génie Civil");
        majorNames.put("MECH", "Génie Mécanique");
        majorNames.put("ARCH", "Architecture");
        majorNames.put("INTBUS", "Commerce International");
        majorNames.put("BUSADM", "Administration des Affaires");
        majorNames.put("INTECON", "Économie et Commerce International");
        majorNames.put("MARKET", "Marketing et Management");
        majorNames.put("CS", "Informatique");
        majorNames.put("SE", "Génie Logiciel");
        majorNames.put("AI", "Intelligence Artificielle");
        majorNames.put("TOURISM", "Gestion du Tourisme");
        majorNames.put("NURSING", "Soins Infirmiers");
        majorNames.put("PHARMACY", "Pharmacie");
        majorNames.put("ELECTRICAL", "Génie Électrique");
        majorNames.put("FOODSCI", "Sciences et Ingénierie Alimentaires");
        majorNames.put("FINANCE", "Finance");
        majorNames.put("MECH_DESIGN", "Conception Mécanique, Fabrication et Automatisation");
        majorNames.put("LAW", "Science du Droit");
        majorNames.put("INTPOL", "Politique Internationale");
        majorNames.put("MBBS", "MBBS (Médecine)");
        majorNames.put("PR", "Relations Publiques");
        majorNames.put("CHEM", "Chimie Appliquée");
        majorNames.put("ENGLISH", "Études Anglaises");
        majorNames.put("DENTISTRY", "Médecine Dentaire");
        majorNames.put("NEWENERGY", "Sciences et Ingénierie des Nouvelles Énergies");
        majorNames.put("HYDRAULIC", "Ingénierie Hydraulique");
        majorNames.put("TRANSPORT", "Ingénierie des Transports");
        majorNames.put("BIOENG", "Bioingénierie");
        majorNames.put("BIOTECH", "Biotechnologie");
        majorNames.put("MATERIALS", "Science et Ingénierie des Matériaux");
        majorNames.put("ECOMMERCE", "E-Commerce");
        majorNames.put("ROBOTICS", "Ingénierie Robotique");
        majorNames.put("BIOMEDICAL", "Ingénierie Biomédicale");
        majorNames.put("DATASCI", "Science des Données");
        majorNames.put("ECONOMICS", "Économie");
        majorNames.put("CHEMICAL", "Génie Chimique");
        majorNames.put("PETROLEUM", "Ingénierie Pétrolière");
        majorNames.put("ELECTRONIC_INFO", "Ingénierie Électronique et de l'Information");
        majorNames.put("SAFETY", "Ingénierie de la Sécurité");
        majorNames.put("MINING", "Ingénierie Minière");
        majorNames.put("PSYCHOLOGY", "Psychologie");
        majorNames.put("AERONAUTICAL", "Ingénierie Aéronautique");
        majorNames.put("AEROSPACE", "Ingénierie Aérospatiale");
        majorNames.put("MEDICINE", "Médecine");
        
        return majorNames.getOrDefault(majorCode, majorCode);
    }
    
    /**
     * Obtient la catégorie d'une majeure
     */
    private String getMajorCategory(String majorCode) {
        Map<String, String> categories = new HashMap<>();
        categories.put("CIVIL", "Ingénierie");
        categories.put("MECH", "Ingénierie");
        categories.put("ARCH", "Architecture");
        categories.put("INTBUS", "Commerce");
        categories.put("BUSADM", "Commerce");
        categories.put("INTECON", "Commerce");
        categories.put("MARKET", "Commerce");
        categories.put("CS", "Informatique");
        categories.put("SE", "Informatique");
        categories.put("AI", "Informatique");
        categories.put("TOURISM", "Commerce");
        categories.put("NURSING", "Santé");
        categories.put("PHARMACY", "Santé");
        categories.put("ELECTRICAL", "Ingénierie");
        categories.put("FOODSCI", "Ingénierie");
        categories.put("FINANCE", "Commerce");
        categories.put("MECH_DESIGN", "Ingénierie");
        categories.put("LAW", "Droit");
        categories.put("INTPOL", "Sciences Politiques");
        categories.put("MBBS", "Santé");
        categories.put("PR", "Communication");
        categories.put("CHEM", "Sciences");
        categories.put("ENGLISH", "Lettres");
        categories.put("DENTISTRY", "Santé");
        categories.put("NEWENERGY", "Ingénierie");
        categories.put("HYDRAULIC", "Ingénierie");
        categories.put("TRANSPORT", "Ingénierie");
        categories.put("BIOENG", "Ingénierie");
        categories.put("BIOTECH", "Sciences");
        categories.put("MATERIALS", "Ingénierie");
        categories.put("ECOMMERCE", "Commerce");
        categories.put("ROBOTICS", "Ingénierie");
        categories.put("BIOMEDICAL", "Ingénierie");
        categories.put("DATASCI", "Informatique");
        categories.put("ECONOMICS", "Commerce");
        categories.put("CHEMICAL", "Ingénierie");
        categories.put("PETROLEUM", "Ingénierie");
        categories.put("ELECTRONIC_INFO", "Ingénierie");
        categories.put("SAFETY", "Ingénierie");
        categories.put("MINING", "Ingénierie");
        categories.put("PSYCHOLOGY", "Sciences Humaines");
        categories.put("AERONAUTICAL", "Ingénierie");
        categories.put("AEROSPACE", "Ingénierie");
        categories.put("MEDICINE", "Santé");
        
        return categories.getOrDefault(majorCode, "Général");
    }
    
    
    /**
     * Obtient les recommandations basées sur le profil utilisateur (méthode de fallback)
     */
    public List<MajorRecommendationDto> getRecommendations(Map<String, Integer> userProfile) {
        // Méthode de fallback avec des données simulées
        return List.of(
            MajorRecommendationDto.builder()
                .majorCode("CS")
                .majorName("Informatique")
                .matchingScore(85.5)
                .matchingPercentage("85.5%")
                .category("Informatique")
                .reasoning("Vos compétences techniques et votre logique analytique correspondent parfaitement à cette filière.")
                .build(),
            MajorRecommendationDto.builder()
                .majorCode("MECH")
                .majorName("Génie Mécanique")
                .matchingScore(78.2)
                .matchingPercentage("78.2%")
                .category("Ingénierie")
                .reasoning("Votre intérêt pour les sciences et les compétences manuelles font de vous un candidat idéal.")
                .build(),
            MajorRecommendationDto.builder()
                .majorCode("BUSADM")
                .majorName("Administration des Affaires")
                .matchingScore(72.1)
                .matchingPercentage("72.1%")
                .category("Commerce")
                .reasoning("Vos compétences organisationnelles et votre intérêt pour le business sont des atouts.")
                .build()
        );
    }
}

