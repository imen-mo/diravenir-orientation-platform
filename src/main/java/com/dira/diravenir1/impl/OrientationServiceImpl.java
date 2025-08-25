package com.dira.diravenir1.impl;

import com.dira.diravenir1.dto.OrientationResponseDTO;
import com.dira.diravenir1.dto.UserProfileDTO;
import com.dira.diravenir1.dto.MajorRecommendationDTO;
import com.dira.diravenir1.dto.OrientationRequestDTO;
import com.dira.diravenir1.service.OrientationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrientationServiceImpl implements OrientationService {

    @Override
    public OrientationResponseDTO calculateOrientation(OrientationRequestDTO request) {
        try {
            // Convertir les réponses en scores numériques
            List<Integer> answers = convertAnswersToScores(request);
            
            // Créer le profil utilisateur simplifié
            UserProfileDTO profile = UserProfileDTO.builder()
                .profilPrincipal(determineProfilPrincipal(answers))
                .scoreGlobal(calculateScoreGlobal(answers))
                .description(generateDescription(answers))
                .personnalite(determinePersonnalite(answers))
                .interets(determineInterets(answers))
                .competences(determineCompetences(answers))
                .build();

            // Générer les recommandations
            List<MajorRecommendationDTO> recommendations = generateRecommendations(profile);
            
            // Prendre les top 3
            List<MajorRecommendationDTO> top3 = recommendations.size() > 3 ? 
                recommendations.subList(0, 3) : recommendations;

            // Créer la réponse
            OrientationResponseDTO response = OrientationResponseDTO.builder()
                .userProfile(profile)
                .top3Recommendations(top3)
                .allRecommendations(recommendations)
                .summary(generateSummary(profile, top3))
                .build();

            return response;

        } catch (Exception e) {
            throw new RuntimeException("Erreur lors du calcul de l'orientation: " + e.getMessage(), e);
        }
    }

    @Override
    public OrientationResponseDTO calculateOrientationAndSendEmail(OrientationRequestDTO request, String userEmail, String userName) {
        // Pour l'instant, on retourne juste le calcul d'orientation
        // L'envoi d'email sera implémenté plus tard
        return calculateOrientation(request);
    }

    @Override
    public List<String> getAllMajors() {
        // Retourner une liste des majeures disponibles
        List<String> majors = new ArrayList<>();
        majors.add("Informatique");
        majors.add("Génie Civil");
        majors.add("Design Graphique");
        majors.add("Psychologie");
        majors.add("Management");
        majors.add("Mathématiques");
        majors.add("Médecine");
        majors.add("Droit");
        majors.add("Architecture");
        majors.add("Marketing");
        return majors;
    }

    private String determineProfilPrincipal(List<Integer> answers) {
        if (answers == null || answers.size() < 17) {
            return "GÉNÉRAL";
        }
        
        // Logique simplifiée pour déterminer le profil principal
        int totalScore = answers.stream().mapToInt(Integer::intValue).sum();
        
        if (totalScore > 1200) return "SCIENTIFIQUE_TECHNIQUE";
        if (totalScore > 1000) return "ARTISTIQUE_CRÉATIF";
        if (totalScore > 800) return "SOCIAL_HUMAIN";
        if (totalScore > 600) return "BUSINESS_GESTION";
        else return "LOGIQUE_ANALYTIQUE";
    }

    private Integer calculateScoreGlobal(List<Integer> answers) {
        if (answers == null || answers.isEmpty()) return 0;
        return answers.stream().mapToInt(Integer::intValue).sum();
    }

    private String generateDescription(List<Integer> answers) {
        String profil = determineProfilPrincipal(answers);
        switch (profil) {
            case "SCIENTIFIQUE_TECHNIQUE":
                return "Vous avez un profil orienté vers les sciences, la technologie et l'innovation.";
            case "ARTISTIQUE_CRÉATIF":
                return "Votre profil est marqué par la créativité, l'art et l'expression personnelle.";
            case "SOCIAL_HUMAIN":
                return "Vous êtes orienté vers les relations humaines et l'aide aux autres.";
            case "BUSINESS_GESTION":
                return "Votre profil est axé sur la gestion, le commerce et l'entrepreneuriat.";
            case "LOGIQUE_ANALYTIQUE":
                return "Vous avez un esprit logique et analytique, orienté vers la résolution de problèmes.";
            default:
                return "Profil équilibré avec des compétences variées.";
        }
    }

    private String determinePersonnalite(List<Integer> answers) {
        if (answers == null || answers.size() < 17) return "ÉQUILIBRÉE";
        
        // Logique simplifiée pour la personnalité
        int avgScore = answers.stream().mapToInt(Integer::intValue).sum() / answers.size();
        
        if (avgScore > 80) return "EXTROVERTIE";
        if (avgScore > 60) return "ÉQUILIBRÉE";
        else return "INTROVERTIE";
    }

    private String determineInterets(List<Integer> answers) {
        if (answers == null || answers.size() < 17) return "VARIÉS";
        
        String profil = determineProfilPrincipal(answers);
        switch (profil) {
            case "SCIENTIFIQUE_TECHNIQUE":
                return "Sciences, technologie, innovation, recherche";
            case "ARTISTIQUE_CRÉATIF":
                return "Art, design, créativité, expression";
            case "SOCIAL_HUMAIN":
                return "Relations humaines, aide sociale, éducation";
            case "BUSINESS_GESTION":
                return "Commerce, gestion, entrepreneuriat, finance";
            case "LOGIQUE_ANALYTIQUE":
                return "Logique, analyse, résolution de problèmes";
            default:
                return "Intérêts variés et équilibrés";
        }
    }

    private String determineCompetences(List<Integer> answers) {
        if (answers == null || answers.size() < 17) return "GÉNÉRALES";
        
        String profil = determineProfilPrincipal(answers);
        switch (profil) {
            case "SCIENTIFIQUE_TECHNIQUE":
                return "Analyse scientifique, résolution technique, innovation";
            case "ARTISTIQUE_CRÉATIF":
                return "Créativité, expression artistique, design";
            case "SOCIAL_HUMAIN":
                return "Communication, empathie, travail d'équipe";
            case "BUSINESS_GESTION":
                return "Gestion, leadership, stratégie";
            case "LOGIQUE_ANALYTIQUE":
                return "Logique, analyse, résolution de problèmes";
            default:
                return "Compétences générales et adaptables";
        }
    }

    private List<MajorRecommendationDTO> generateRecommendations(UserProfileDTO profile) {
        List<MajorRecommendationDTO> recommendations = new ArrayList<>();
        
        String profil = profile.getProfilPrincipal();
        
        switch (profil) {
            case "SCIENTIFIQUE_TECHNIQUE":
                recommendations.add(MajorRecommendationDTO.builder()
                    .nom("Informatique")
                    .domaine("Technologie")
                    .score(95)
                    .universite("Université Technique")
                    .description("Programmation et développement logiciel")
                    .prerequis("Bac S ou équivalent")
                    .debouches("Développeur, architecte logiciel")
                    .build());
                recommendations.add(MajorRecommendationDTO.builder()
                    .nom("Génie Civil")
                    .domaine("Ingénierie")
                    .score(90)
                    .universite("École d'Ingénieurs")
                    .description("Construction et infrastructure")
                    .prerequis("Bac S ou équivalent")
                    .debouches("Ingénieur civil, chef de projet")
                    .build());
                break;
                
            case "ARTISTIQUE_CRÉATIF":
                recommendations.add(MajorRecommendationDTO.builder()
                    .nom("Design Graphique")
                    .domaine("Arts")
                    .score(95)
                    .universite("École d'Arts")
                    .description("Création visuelle et communication")
                    .prerequis("Bac L ou équivalent")
                    .debouches("Designer graphique, directeur artistique")
                    .build());
                break;
                
            case "SOCIAL_HUMAIN":
                recommendations.add(MajorRecommendationDTO.builder()
                    .nom("Psychologie")
                    .domaine("Sciences Humaines")
                    .score(95)
                    .universite("Université des Sciences Humaines")
                    .description("Étude du comportement humain")
                    .prerequis("Bac L ou équivalent")
                    .debouches("Psychologue, conseiller")
                    .build());
                break;
                
            case "BUSINESS_GESTION":
                recommendations.add(MajorRecommendationDTO.builder()
                    .nom("Management")
                    .domaine("Commerce")
                    .score(95)
                    .universite("École de Commerce")
                    .description("Gestion d'entreprise et leadership")
                    .prerequis("Bac ES ou équivalent")
                    .debouches("Manager, entrepreneur")
                    .build());
                break;
                
            case "LOGIQUE_ANALYTIQUE":
                recommendations.add(MajorRecommendationDTO.builder()
                    .nom("Mathématiques")
                    .domaine("Sciences")
                    .score(95)
                    .universite("Université des Sciences")
                    .description("Logique mathématique et analyse")
                    .prerequis("Bac S ou équivalent")
                    .debouches("Mathématicien, analyste")
                    .build());
                break;
        }
        
        return recommendations;
    }

    private String generateSummary(UserProfileDTO profile, List<MajorRecommendationDTO> top3) {
        StringBuilder summary = new StringBuilder();
        summary.append("Basé sur votre profil ").append(profile.getProfilPrincipal().toLowerCase())
               .append(", nous recommandons les domaines suivants :\n\n");
        
        for (MajorRecommendationDTO rec : top3) {
            summary.append("• ").append(rec.getNom())
                   .append(" (").append(rec.getDomaine()).append(") - Score: ").append(rec.getScore())
                   .append("%\n");
        }
        
        summary.append("\nCes recommandations correspondent à vos intérêts en ").append(profile.getInterets().toLowerCase())
               .append(" et vos compétences en ").append(profile.getCompetences().toLowerCase()).append(".");
        
        return summary.toString();
    }

    /**
     * Convertit les réponses du test d'orientation en scores numériques
     */
    private List<Integer> convertAnswersToScores(OrientationRequestDTO request) {
        List<Integer> scores = new ArrayList<>();
        
        // Question 1 - Activité idéale
        scores.add(convertActivityToScore(request.getQuestion1()));
        
        // Question 2 - Contenu internet/vidéos (prendre le premier)
        if (request.getQuestion2() != null && !request.getQuestion2().isEmpty()) {
            scores.add(convertContentToScore(request.getQuestion2().get(0)));
        } else {
            scores.add(50); // Score par défaut
        }
        
        // Question 3 - Section magasin
        scores.add(convertStoreSectionToScore(request.getQuestion3()));
        
        // Question 4 - Réaction aux problèmes
        scores.add(convertProblemReactionToScore(request.getQuestion4()));
        
        // Question 5 - Activités naturelles (prendre le premier)
        if (request.getQuestion5() != null && !request.getQuestion5().isEmpty()) {
            scores.add(convertNatureActivityToScore(request.getQuestion5().get(0)));
        } else {
            scores.add(50); // Score par défaut
        }
        
        // Question 6 - Apprentissage préféré
        scores.add(convertLearningToScore(request.getQuestion6()));
        
        // Question 7 - Impact dans le monde
        scores.add(convertImpactToScore(request.getQuestion7()));
        
        // Question 8 - Environnement de travail
        scores.add(convertWorkEnvironmentToScore(request.getQuestion8()));
        
        // Question 9 - Critères carrière (moyenne des scores)
        if (request.getQuestion9() != null && !request.getQuestion9().isEmpty()) {
            int avgScore = request.getQuestion9().values().stream()
                .mapToInt(Integer::intValue)
                .sum() / request.getQuestion9().size();
            scores.add(avgScore);
        } else {
            scores.add(50); // Score par défaut
        }
        
        // Question 10 - Motivation résolution problèmes
        scores.add(convertMotivationToScore(request.getQuestion10()));
        
        // Question 11 - Préférence de travail
        scores.add(convertWorkPreferenceToScore(request.getQuestion11()));
        
        // Question 12 - Présentation/exposé
        scores.add(convertPresentationToScore(request.getQuestion12()));
        
        // Question 13 - Prise de décision
        scores.add(convertDecisionMakingToScore(request.getQuestion13()));
        
        // Question 14 - Matières préférées (prendre le premier)
        if (request.getQuestion14() != null && !request.getQuestion14().isEmpty()) {
            scores.add(convertSubjectToScore(request.getQuestion14().get(0)));
        } else {
            scores.add(50); // Score par défaut
        }
        
        return scores;
    }

    // Méthodes de conversion des réponses en scores
    private int convertActivityToScore(String activity) {
        if (activity == null) return 50;
        switch (activity.toLowerCase()) {
            case "programmer": return 90;
            case "dessiner": return 85;
            case "aider les autres": return 80;
            case "gérer un projet": return 75;
            case "analyser des données": return 70;
            default: return 50;
        }
    }

    private int convertContentToScore(String content) {
        if (content == null) return 50;
        switch (content.toLowerCase()) {
            case "tutoriels techniques": return 90;
            case "créations artistiques": return 85;
            case "documentaires sociaux": return 80;
            case "actualités business": return 75;
            case "énigmes logiques": return 70;
            default: return 50;
        }
    }

    private int convertStoreSectionToScore(String section) {
        if (section == null) return 50;
        switch (section.toLowerCase()) {
            case "électronique": return 90;
            case "livres d'art": return 85;
            case "livres de développement personnel": return 80;
            case "livres de management": return 75;
            case "livres de sciences": return 70;
            default: return 50;
        }
    }

    private int convertProblemReactionToScore(String reaction) {
        if (reaction == null) return 50;
        switch (reaction.toLowerCase()) {
            case "analyser méthodiquement": return 90;
            case "proposer des solutions créatives": return 85;
            case "demander l'avis des autres": return 80;
            case "organiser une réunion": return 75;
            case "rechercher des informations": return 70;
            default: return 50;
        }
    }

    private int convertNatureActivityToScore(String activity) {
        if (activity == null) return 50;
        switch (activity.toLowerCase()) {
            case "observation scientifique": return 90;
            case "photographie artistique": return 85;
            case "randonnée en groupe": return 80;
            case "organisation d'événements": return 75;
            case "cartographie": return 70;
            default: return 50;
        }
    }

    private int convertLearningToScore(String learning) {
        if (learning == null) return 50;
        switch (learning.toLowerCase()) {
            case "expérimentation pratique": return 90;
            case "expression créative": return 85;
            case "discussion en groupe": return 80;
            case "étude de cas": return 75;
            case "théorie et concepts": return 70;
            default: return 50;
        }
    }

    private int convertImpactToScore(String impact) {
        if (impact == null) return 50;
        switch (impact.toLowerCase()) {
            case "innovation technologique": return 90;
            case "création artistique": return 85;
            case "aide humanitaire": return 80;
            case "création d'emplois": return 75;
            case "recherche scientifique": return 70;
            default: return 50;
        }
    }

    private int convertWorkEnvironmentToScore(String environment) {
        if (environment == null) return 50;
        switch (environment.toLowerCase()) {
            case "laboratoire": return 90;
            case "atelier créatif": return 85;
            case "centre communautaire": return 80;
            case "bureau moderne": return 75;
            case "bibliothèque": return 70;
            default: return 50;
        }
    }

    private int convertMotivationToScore(String motivation) {
        if (motivation == null) return 50;
        switch (motivation.toLowerCase()) {
            case "défi intellectuel": return 90;
            case "expression personnelle": return 85;
            case "aider les autres": return 80;
            case "réussite professionnelle": return 75;
            case "découverte": return 70;
            default: return 50;
        }
    }

    private int convertWorkPreferenceToScore(String preference) {
        if (preference == null) return 50;
        switch (preference.toLowerCase()) {
            case "travail en équipe": return 80;
            case "travail autonome": return 70;
            case "travail sur le terrain": return 75;
            case "recherche théorique": return 85;
            default: return 50;
        }
    }

    private int convertPresentationToScore(String presentation) {
        if (presentation == null) return 50;
        switch (presentation.toLowerCase()) {
            case "données et statistiques": return 90;
            case "exemples concrets": return 85;
            case "histoires personnelles": return 80;
            case "stratégies et plans": return 75;
            case "concepts abstraits": return 70;
            default: return 50;
        }
    }

    private int convertDecisionMakingToScore(String decision) {
        if (decision == null) return 50;
        switch (decision.toLowerCase()) {
            case "analyse logique": return 90;
            case "intuition créative": return 85;
            case "consensus du groupe": return 80;
            case "critères objectifs": return 75;
            case "expérience passée": return 70;
            default: return 50;
        }
    }

    private int convertSubjectToScore(String subject) {
        if (subject == null) return 50;
        switch (subject.toLowerCase()) {
            case "mathématiques": return 90;
            case "arts plastiques": return 85;
            case "psychologie": return 80;
            case "économie": return 75;
            case "physique": return 70;
            default: return 50;
        }
    }
}
