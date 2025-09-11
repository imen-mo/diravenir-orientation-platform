-- Script pour ajouter la colonne answer_value manquante
-- Résout l'erreur: Schema-validation: missing column [answer_value] in table [orientation_answers]

USE diravenir;

-- Ajouter la colonne answer_value à la table orientation_answers
ALTER TABLE orientation_answers ADD COLUMN answer_value VARCHAR(255) NOT NULL DEFAULT '';

-- Vérifier la structure de la table après modification
DESCRIBE orientation_answers;

-- Afficher le message de confirmation
SELECT 'Colonne answer_value ajoutée avec succès à la table orientation_answers' AS Status;
