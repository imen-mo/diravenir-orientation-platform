package com.diravenir.service;

import com.diravenir.Entities.Policy;
import com.diravenir.repository.PolicyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class PolicyService {
    
    private final PolicyRepository policyRepository;
    
    /**
     * Récupérer une politique par type
     */
    public Optional<Policy> getPolicyByType(Policy.PolicyType policyType) {
        try {
            log.info("Récupération de la politique: {}", policyType.getDisplayName());
            return policyRepository.findByPolicyTypeAndIsActiveTrue(policyType).stream().findFirst();
            
        } catch (Exception e) {
            log.error("Erreur lors de la récupération de la politique {}: {}", policyType, e.getMessage());
            return Optional.empty();
        }
    }
    
    /**
     * Récupérer toutes les politiques actives
     */
    public List<Policy> getAllActivePolicies() {
        try {
            log.info("Récupération de toutes les politiques actives");
            return policyRepository.findByIsActiveTrue();
            
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des politiques: {}", e.getMessage());
            return List.of();
        }
    }
    
    /**
     * Récupérer les politiques qui nécessitent un consentement
     */
    public List<Policy> getPoliciesRequiringConsent() {
        try {
            log.info("Récupération des politiques nécessitant un consentement");
            return policyRepository.findByRequiresConsentTrueAndIsActiveTrue();
            
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des politiques de consentement: {}", e.getMessage());
            return List.of();
        }
    }
    
    /**
     * Créer une nouvelle politique
     */
    @Transactional
    public Optional<Policy> createPolicy(Policy policy, String createdBy) {
        try {
            // Vérifier qu'il n'y a pas déjà une politique active du même type
            Optional<Policy> existingPolicy = policyRepository.findByPolicyTypeAndIsActiveTrue(policy.getPolicyType()).stream().findFirst();
            if (existingPolicy.isPresent()) {
                log.warn("Une politique active existe déjà pour le type: {}", policy.getPolicyType());
                return Optional.empty();
            }
            
            policy.setLastUpdatedBy(createdBy);
            policy.setIsActive(true);
            policy.setCreatedAt(LocalDateTime.now());
            policy.setUpdatedAt(LocalDateTime.now());
            
            Policy savedPolicy = policyRepository.save(policy);
            
            log.info("Politique créée avec succès: {} par {}", savedPolicy.getTitle(), createdBy);
            return Optional.of(savedPolicy);
            
        } catch (Exception e) {
            log.error("Erreur lors de la création de la politique: {}", e.getMessage());
            return Optional.empty();
        }
    }
    
    /**
     * Mettre à jour une politique existante
     */
    @Transactional
    public Optional<Policy> updatePolicy(Long policyId, Policy updatedPolicy, String updatedBy) {
        try {
            Optional<Policy> existingPolicyOpt = policyRepository.findById(policyId);
            if (existingPolicyOpt.isEmpty()) {
                log.warn("Politique non trouvée: {}", policyId);
                return Optional.empty();
            }
            
            Policy existingPolicy = existingPolicyOpt.get();
            
            // Mettre à jour les champs
            existingPolicy.setTitle(updatedPolicy.getTitle());
            existingPolicy.setContent(updatedPolicy.getContent());
            existingPolicy.setVersion(incrementVersion(existingPolicy.getVersion()));
            existingPolicy.setLastUpdatedBy(updatedBy);
            existingPolicy.setUpdatedAt(LocalDateTime.now());
            
            Policy savedPolicy = policyRepository.save(existingPolicy);
            
            log.info("Politique mise à jour avec succès: {} par {}", savedPolicy.getTitle(), updatedBy);
            return Optional.of(savedPolicy);
            
        } catch (Exception e) {
            log.error("Erreur lors de la mise à jour de la politique: {}", e.getMessage());
            return Optional.empty();
        }
    }
    
    /**
     * Désactiver une politique
     */
    @Transactional
    public boolean deactivatePolicy(Long policyId, String deactivatedBy) {
        try {
            Optional<Policy> policyOpt = policyRepository.findById(policyId);
            if (policyOpt.isEmpty()) {
                log.warn("Politique non trouvée: {}", policyId);
                return false;
            }
            
            Policy policy = policyOpt.get();
            policy.setIsActive(false);
            policy.setLastUpdatedBy(deactivatedBy);
            policy.setUpdatedAt(LocalDateTime.now());
            
            policyRepository.save(policy);
            
            log.info("Politique désactivée: {} par {}", policy.getTitle(), deactivatedBy);
            return true;
            
        } catch (Exception e) {
            log.error("Erreur lors de la désactivation de la politique: {}", e.getMessage());
            return false;
        }
    }
    
    /**
     * Rechercher des politiques par mots-clés
     */
    public List<Policy> searchPolicies(String keyword) {
        try {
            if (keyword == null || keyword.trim().isEmpty()) {
                return getAllActivePolicies();
            }
            
            log.info("Recherche de politiques avec le mot-clé: {}", keyword);
            return policyRepository.searchPoliciesByKeyword(keyword.trim());
            
        } catch (Exception e) {
            log.error("Erreur lors de la recherche de politiques: {}", e.getMessage());
            return List.of();
        }
    }
    
    /**
     * Récupérer les politiques mises à jour récemment
     */
    public List<Policy> getRecentlyUpdatedPolicies(int hours) {
        try {
            LocalDateTime since = LocalDateTime.now().minusHours(hours);
            log.info("Récupération des politiques mises à jour depuis {} heures", hours);
            return policyRepository.findRecentlyUpdatedPolicies(since);
            
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des politiques récentes: {}", e.getMessage());
            return List.of();
        }
    }
    
    /**
     * Compter les politiques actives
     */
    public Long countActivePolicies() {
        try {
            return policyRepository.countActivePolicies();
        } catch (Exception e) {
            log.error("Erreur lors du comptage des politiques: {}", e.getMessage());
            return 0L;
        }
    }
    
    // ===== MÉTHODES PRIVÉES =====
    
    private String incrementVersion(String currentVersion) {
        try {
            if (currentVersion == null || currentVersion.trim().isEmpty()) {
                return "1.0";
            }
            
            String[] parts = currentVersion.split("\\.");
            if (parts.length == 2) {
                int major = Integer.parseInt(parts[0]);
                int minor = Integer.parseInt(parts[1]);
                return (major) + "." + (minor + 1);
            }
            
            return "1.0";
            
        } catch (Exception e) {
            log.warn("Impossible d'incrémenter la version: {}, utilisation de 1.0", currentVersion);
            return "1.0";
        }
    }
    
    // ===== INITIALISATION DES POLITIQUES PAR DÉFAUT =====
    
    /**
     * Initialiser les politiques par défaut si elles n'existent pas
     */
    @Transactional
    public void initializeDefaultPolicies() {
        try {
            // Terms & Conditions
            if (policyRepository.findByPolicyType(Policy.PolicyType.TERMS_AND_CONDITIONS).isEmpty()) {
                createDefaultTermsAndConditions();
            }
            
            // Privacy Policy
            if (policyRepository.findByPolicyType(Policy.PolicyType.PRIVACY_POLICY).isEmpty()) {
                createDefaultPrivacyPolicy();
            }
            
            // Refund Policy
            if (policyRepository.findByPolicyType(Policy.PolicyType.REFUND_POLICY).isEmpty()) {
                createDefaultRefundPolicy();
            }
            
            log.info("Initialisation des politiques par défaut terminée");
            
        } catch (Exception e) {
            log.error("Erreur lors de l'initialisation des politiques par défaut: {}", e.getMessage());
        }
    }
    
    private void createDefaultTermsAndConditions() {
        Policy policy = new Policy();
        policy.setPolicyType(Policy.PolicyType.TERMS_AND_CONDITIONS);
        policy.setTitle("Terms & Conditions");
        policy.setContent(getDefaultTermsContent());
        policy.setVersion("1.0");
        policy.setIsActive(true);
        policy.setRequiresConsent(true);
        policy.setLastUpdatedBy("SYSTEM");
        
        policyRepository.save(policy);
        log.info("Politique Terms & Conditions créée par défaut");
    }
    
    private void createDefaultPrivacyPolicy() {
        Policy policy = new Policy();
        policy.setPolicyType(Policy.PolicyType.PRIVACY_POLICY);
        policy.setTitle("Privacy Policy");
        policy.setContent(getDefaultPrivacyContent());
        policy.setVersion("1.0");
        policy.setIsActive(true);
        policy.setRequiresConsent(true);
        policy.setLastUpdatedBy("SYSTEM");
        
        policyRepository.save(policy);
        log.info("Politique Privacy Policy créée par défaut");
    }
    
    private void createDefaultRefundPolicy() {
        Policy policy = new Policy();
        policy.setPolicyType(Policy.PolicyType.REFUND_POLICY);
        policy.setTitle("Refund Policy");
        policy.setContent(getDefaultRefundContent());
        policy.setVersion("1.0");
        policy.setIsActive(true);
        policy.setRequiresConsent(true);
        policy.setLastUpdatedBy("SYSTEM");
        
        policyRepository.save(policy);
        log.info("Politique Refund Policy créée par défaut");
    }
    
    private String getDefaultTermsContent() {
        return """
            1. Acceptance of Terms – By applying through the portal, you confirm you have read, understood, and agree to these Terms & Conditions.
            2. Eligibility – Applicants must meet the eligibility criteria specified by the university and MalishaEdu; accurate, authentic, and complete information is required.
            3. Application Process – Diravenir facilitates applications to universities. Submission of documents and payment of applicable service charges are mandatory. Applications are subject to review and approval by the university and relevant authorities.
            4. Service Charges – Service charges are non‑refundable unless specified in the Refund Policy. Additional third‑party fees (university, visa, travel) are the applicant's responsibility.
            5. Applicant's Responsibilities – You are responsible for the accuracy of all provided documents and information and for attending interviews or exams as required.
            6. Platform Use – Unauthorized use of the portal (e.g., sharing accounts, fraudulent submissions) is prohibited. Diravenir may suspend or terminate access for misuse.
            7. Liabilities – Diravenir is not liable for circumstances beyond its control, including visa rejections, university decisions, or delays caused by third parties. Users are responsible for complying with local laws and regulations.
            """;
    }
    
    private String getDefaultPrivacyContent() {
        return """
            1. Information Collected – Personal (name, contact, passport details), Academic (transcripts, certificates), and Payment information (bank details or confirmations for service charges).
            2. Usage – Processing university applications; facilitating scholarships; communicating application status; improving services.
            3. Data Sharing – With partner universities, government bodies (visa), and authorized third parties required for processing. No sale of personal data to third parties.
            4. Security – Encryption and secure servers; access limited to authorized personnel.
            5. User Rights – Access, edit, or delete your personal data (not the application itself) by contacting Contact@Diravenir.com. Requests processed within 30 business days.
            6. Cookies – Used to enhance experience; you can disable cookies in your browser.
            7. Compliance – Diravenir complies with international data‑protection laws, including GDPR and relevant regulations in China.
            """;
    }
    
    private String getDefaultRefundContent() {
        return """
            The policy sets conditions for full/partial refunds and scenarios with no refund.
            
            When Diravenir can refund (Full payment):
            - Diravenir fails to provide any admission to students after complete documents were provided.
            - Diravenir issues an admission letter without consulting the student and the student does not agree to go there.
            
            When Diravenir can refund (Partial):
            - The student does not get a visa because of Diravenir's or the university's problem.
            - If the student fails the final examination test (Baccalaureat)
            
            When students do not get any refund:
            - The student gives up at any stage.
            - The student fails a university interview and disagrees with the outcome.
            - The student fails to provide documents on time or does not attend interviews/exams.
            - Visa rejection due to the student's own problems.
            - Any criminal record.
            - Providing fake documents.
            - Refusing to attend required English/Chinese language or interview-prep courses.
            - Already in China and raising disputes/questions that could be resolved before traveling.
            """;
    }
}
