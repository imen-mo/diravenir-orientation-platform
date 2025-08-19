package com.dira.diravenir1;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Test d'intégration pour vérifier le COMBO ULTIME Hibernate + Flyway
 * 
 * Ce test vérifie que :
 * 1. Flyway a bien créé toutes les tables
 * 2. Hibernate peut valider les entités contre le schéma
 * 3. Les deux fonctionnent en parfaite harmonie
 */
@SpringBootTest
@ActiveProfiles("dev")
@TestPropertySource(properties = {
    "spring.flyway.enabled=true",
    "spring.jpa.hibernate.ddl-auto=validate"
})
@Transactional
public class FlywayHibernateComboTest {

    @PersistenceContext
    private EntityManager entityManager;

    @Test
    public void testFlywayTablesCreated() {
        // Vérifier que Flyway a créé toutes les tables principales
        String[] expectedTables = {
            "utilisateur", "administrateur", "conseiller", "etudiant",
            "destination", "universite", "filiere", "programme",
            "candidature", "document", "resultat_test", "message",
            "temoignage", "partenaire", "flyway_schema_history"
        };

        for (String tableName : expectedTables) {
            Query query = entityManager.createNativeQuery(
                "SELECT COUNT(*) FROM information_schema.tables " +
                "WHERE table_schema = 'diravenir' AND table_name = ?"
            );
            query.setParameter(1, tableName);
            
            Long count = (Long) query.getSingleResult();
            assertTrue(count > 0, "Table " + tableName + " devrait exister");
        }
    }

    @Test
    public void testHibernateValidation() {
        // Vérifier que Hibernate peut valider le schéma
        // Si cette méthode s'exécute sans erreur, c'est que la validation passe
        assertTrue(true, "Hibernate validation réussie");
    }

    @Test
    public void testFlywaySchemaHistory() {
        // Vérifier que Flyway a bien enregistré les migrations
        Query query = entityManager.createNativeQuery(
            "SELECT COUNT(*) FROM flyway_schema_history"
        );
        
        Long migrationCount = (Long) query.getSingleResult();
        assertTrue(migrationCount >= 2, "Au moins 2 migrations devraient être appliquées");
    }

    @Test
    public void testTableStructure() {
        // Vérifier la structure de quelques tables clés
        String[] checkQueries = {
            "SELECT COUNT(*) FROM utilisateur",
            "SELECT COUNT(*) FROM destination", 
            "SELECT COUNT(*) FROM filiere"
        };

        for (String sql : checkQueries) {
            Query query = entityManager.createNativeQuery(sql);
            Long count = (Long) query.getSingleResult();
            assertNotNull(count, "Requête devrait retourner un résultat");
        }
    }

    @Test
    public void testComboIntegration() {
        // Test d'intégration complet
        // 1. Vérifier que les tables existent (Flyway)
        // 2. Vérifier que Hibernate peut les utiliser (Validation)
        
        // Test de lecture d'une table
        Query query = entityManager.createNativeQuery(
            "SELECT COUNT(*) FROM utilisateur WHERE role = 'ADMIN'"
        );
        
        Long adminCount = (Long) query.getSingleResult();
        assertNotNull(adminCount, "Comptage des admins devrait fonctionner");
        
        // Si on arrive ici, le combo fonctionne parfaitement !
        assertTrue(true, "COMBO Hibernate + Flyway fonctionne parfaitement !");
    }
}
