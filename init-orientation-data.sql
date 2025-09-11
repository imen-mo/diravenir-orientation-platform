-- Script d'initialisation des données d'orientation
-- À exécuter si les tables sont vides

-- Vider les tables existantes
DELETE FROM ideal_profiles;
DELETE FROM orientation_majors;

-- Réinitialiser les auto-increment
ALTER TABLE ideal_profiles AUTO_INCREMENT = 1;
ALTER TABLE orientation_majors AUTO_INCREMENT = 1;

-- Insérer les 44 majeures
INSERT INTO orientation_majors (major_name, major_code, description, user_description, category, is_active, display_order, created_at) VALUES
('Génie Civil', 'CIVIL', 'Civil Engineering is a field focused on the design and construction of infrastructure.', 'Design and construction of infrastructure like bridges, roads, and buildings.', 'Engineering', true, 1, NOW()),
('Génie Mécanique', 'MECH', 'Mechanical Engineering is the heart of industrial innovation.', 'Design, analysis, and manufacturing of mechanical systems.', 'Engineering', true, 2, NOW()),
('Architecture', 'ARCH', 'Architecture is the discipline that shapes our built environment.', 'Combines artistic creativity with engineering rigor.', 'Design', true, 3, NOW()),
('Commerce International (International Business)', 'BUS', 'International Business prepares you to become a player in global markets.', 'Economic, legal, and cultural aspects of cross-border trade.', 'Business', true, 4, NOW()),
('Administration des Affaires (Business Administration)', 'BUS_ADMIN', 'Business Administration is the ideal major for leading organizations.', 'Fundamental principles of management, finance, marketing, and human resources.', 'Business', true, 5, NOW()),
('Économie et Commerce International (International Economics and Trade)', 'ECON_TRADE', 'This major allows you to understand the forces that drive the global economy.', 'Economic theory with the realities of international trade.', 'Business', true, 6, NOW()),
('Marketing et Management', 'MARKETING', 'Marketing and Management are at the core of business growth.', 'Understanding consumer behavior, designing impactful campaigns, and leading teams.', 'Business', true, 7, NOW()),
('Informatique (Computer Science)', 'CS', 'Computer Science is the science that studies computers and their applications.', 'Programming, artificial intelligence, and network security.', 'Technology', true, 8, NOW()),
('Génie Logiciel (Software Engineering)', 'IT', 'Software Engineering is the art and science of designing quality software.', 'Designing, developing, and maintaining reliable computer systems.', 'Technology', true, 9, NOW()),
('Intelligence Artificielle (Artificial Intelligence)', 'AI', 'Artificial Intelligence is the frontier of technological innovation.', 'Machine learning and deep learning to design autonomous systems.', 'Technology', true, 10, NOW()),
('Gestion du Tourisme (Tourism Management)', 'TOURISM', 'Tourism Management combines commercial aspect with strong customer service.', 'Organizing trips and promoting destinations to create memorable experiences.', 'Business', true, 11, NOW()),
('Soins Infirmiers (Nursing)', 'NURSING', 'Nursing is a calling for those with deep empathy and desire to help others.', 'Working in a team to ensure the well-being of patients.', 'Health', true, 12, NOW()),
('Pharmacie', 'PHARMACY', 'Pharmacy is the major for scientific minds who want to contribute to people\'s health.', 'Exploring chemistry, biology, and the mechanisms of drug action.', 'Health', true, 13, NOW()),
('Génie Électrique', 'ELECTRICAL', 'Electrical Engineering is the driving force of modern technology.', 'Design electrical and electronic systems for everything from phones to power grids.', 'Engineering', true, 14, NOW()),
('Sciences et Ingénierie Alimentaires (Food Science and Engineering)', 'FOOD_SCIENCE', 'Food Science and Engineering is the meeting point of science and gastronomy.', 'Understanding food composition and ensuring its safety and quality.', 'Engineering', true, 15, NOW()),
('Finance', 'FINANCE', 'Finance is the major for analytical and ambitious minds.', 'Understanding and influencing the economic world by managing assets and evaluating risks.', 'Business', true, 16, NOW()),
('Conception Mécanique, Fabrication et Automatisation (Mechanical Design, Manufacturing and Automation)', 'MECH_DESIGN', 'This major is the meeting point of creativity and production.', 'Designing machines and systems while mastering CAD tools, robotics, and manufacturing processes.', 'Engineering', true, 17, NOW()),
('Science du Droit (Science of Law)', 'LAW', 'The Science of Law is the foundation of justice.', 'Defending rights and promoting justice.', 'Law', true, 18, NOW()),
('Politique Internationale (International Politics)', 'POLITICS', 'International Politics is a major for those who want to understand and influence relations between nations.', 'Analyzing conflicts, foreign policies, and international organizations.', 'Social Sciences', true, 19, NOW()),
('MBBS (Bachelor of Medicine, Bachelor of Surgery)', 'MBBS', 'MBBS is the path to medicine.', 'Diagnosing, treating, and preventing diseases, dedicating yourself to health and well-being.', 'Health', true, 20, NOW()),
('Relations Publiques (Public Relations)', 'PR', 'Public Relations is the art of building and maintaining a good image.', 'Managing an organization\'s reputation, interacting with the media, and creating impactful campaigns.', 'Business', true, 21, NOW()),
('Chimie Appliquée (Applied Chemistry)', 'CHEMISTRY', 'Applied Chemistry is the major for scientific minds who want to transform the physical world.', 'Using chemistry principles to solve practical problems by developing new medicines and materials.', 'Science', true, 22, NOW()),
('Études Anglaises (English)', 'ENGLISH', 'The English major is for those passionate about literature, languages, and culture.', 'Exploring the richness of language and thought to develop critical thinking.', 'Humanities', true, 23, NOW()),
('Médecine Dentaire (Dentistry)', 'DENTISTRY', 'Dentistry is a health science focused on the mouth and teeth.', 'Combining sharp scientific knowledge with great dexterity to diagnose and treat oral diseases.', 'Health', true, 24, NOW()),
('Sciences et Ingénierie des Nouvelles Énergies (New Energy Science and Engineering)', 'ENERGY', 'This major is the future of energy.', 'Designing, developing, and implementing sustainable energy systems for a cleaner world.', 'Engineering', true, 25, NOW()),
('Ingénierie Hydraulique (Hydraulic Engineering)', 'HYDRAULIC', 'Hydraulic Engineering is the science of water management.', 'Solving crucial problems for society by designing dams or water management systems.', 'Engineering', true, 26, NOW()),
('Ingénierie des Transports (Transportation Engineering)', 'TRANSPORT', 'Transportation Engineering is an essential major for the development of cities.', 'Designing road, rail, and airport networks to improve mobility.', 'Engineering', true, 27, NOW()),
('Bioingénierie (Bioengineering)', 'BIOENG', 'Bioengineering is the convergence of engineering and biology.', 'Applying engineering principles to solve medical and biological problems.', 'Engineering', true, 28, NOW()),
('Biotechnologie (Biotechnology)', 'BIOTECH', 'Biotechnology uses living organisms to create new products and technologies.', 'Pushing the boundaries of science to solve global problems in genetics and microbiology.', 'Science', true, 29, NOW()),
('Science et Ingénierie des Matériaux (Materials Science and Engineering)', 'MATERIALS', 'Materials Science and Engineering is the discipline that gives life to the objects around us.', 'Understanding material structure and designing new ones for aerospace, medicine, or electronics.', 'Engineering', true, 30, NOW()),
('E-Commerce', 'ECOMMERCE', 'E-Commerce is the engine of modern commerce.', 'Creating and managing online stores by mastering digital marketing, logistics, and data analysis.', 'Business', true, 31, NOW()),
('Ingénierie Robotique (Robot Engineering)', 'ROBOTICS', 'Robot Engineering is the convergence of computer science, mechanics, and electronics.', 'Designing and building intelligent robots.', 'Engineering', true, 32, NOW()),
('Ingénierie Biomédicale (Biomedical Engineering)', 'BIOMED', 'Biomedical Engineering is the link between engineering and medicine.', 'Applying engineering principles to solve clinical problems and improve human health.', 'Engineering', true, 33, NOW()),
('Science des Données (Data Science)', 'DATA_SCIENCE', 'Data Science is the discipline that makes sense of massive amounts of information.', 'Extracting knowledge from data to predict trends and make informed decisions.', 'Technology', true, 34, NOW()),
('Économie (Economics)', 'ECONOMICS', 'Economics is the science that studies the production, distribution, and consumption of wealth.', 'Analyzing markets and public policies, solving social and economic problems using data and logic.', 'Social Sciences', true, 35, NOW()),
('Génie Chimique (Chemical Engineering)', 'CHEM_ENG', 'Chemical Engineering is the major that transforms science into production.', 'Designing processes to produce chemicals, fuels, plastics, or medicines on a large scale.', 'Engineering', true, 36, NOW()),
('Ingénierie Pétrolière', 'PETROLEUM', 'Petroleum Engineering is the major that immerses you in the heart of the energy industry.', 'Studying exploration, extraction, and processing techniques of oil and gas.', 'Engineering', true, 37, NOW()),
('Ingénierie Électronique et de l\'Information (Electronic and Information Engineering)', 'ELECTRONIC', 'This major is at the heart of the digital revolution.', 'Designing electronic chips, communication systems, and information technologies.', 'Engineering', true, 38, NOW()),
('Ingénierie de la Sécurité (Safety Engineering)', 'SAFETY', 'Safety Engineering is the discipline that protects people and property.', 'Designing safe systems and environments by analyzing risks and developing protocols.', 'Engineering', true, 39, NOW()),
('Ingénierie Minière (Mining Engineering)', 'MINING', 'Mining Engineering is essential for the extraction of Earth\'s resources.', 'Designing mines, managing operations, and ensuring safety in demanding environments.', 'Engineering', true, 40, NOW()),
('Psychologie (Psychology)', 'PSYCHOLOGY', 'Psychology is the study of the mind and human behavior.', 'Analyzing behaviors, conducting research, and helping individuals improve their well-being.', 'Social Sciences', true, 41, NOW()),
('Ingénierie Aéronautique (Aeronautical Engineering)', 'AERONAUTICAL', 'Aeronautical Engineering is the science of flight.', 'Designing, developing, and testing airplanes and helicopters.', 'Engineering', true, 42, NOW()),
('Ingénierie Aérospatiale (Aerospace Engineering)', 'AEROSPACE', 'Aerospace Engineering is the major for those who want to explore space.', 'Designing rockets, satellites, and spacecraft beyond Earth\'s atmosphere.', 'Engineering', true, 43, NOW()),
('Médecine (Medicine)', 'MEDICINE', 'Medicine is a noble path for those who want to dedicate their lives to health.', 'Deep understanding of the human body and its diseases.', 'Health', true, 44, NOW());

-- Insérer les profils idéaux pour Génie Civil (exemple)
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
(1, 'Interet_Scientifique_Tech', 90),
(1, 'Interet_Artistique_Creatif', 40),
(1, 'Interet_Social_Humain', 50),
(1, 'Interet_Business_Gestion', 60),
(1, 'Interet_Logique_Analytique', 90),
(1, 'Competence_Resolution_Problemes', 90),
(1, 'Competence_Communication', 75),
(1, 'Competence_Organisation', 90),
(1, 'Competence_Manuel_Technique', 85),
(1, 'Valeur_Impact_Societal', 80),
(1, 'Valeur_Innovation_Challenge', 85),
(1, 'Valeur_Stabilite_Securite', 80),
(1, 'Valeur_Autonomie', 70),
(1, 'Pref_Travail_Equipe_Collab', 80),
(1, 'Pref_Travail_Autonome', 60),
(1, 'Pref_Pratique_Terrain', 90),
(1, 'Pref_Theorie_Recherche', 60);

-- Insérer les profils idéaux pour Génie Mécanique
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
(2, 'Interet_Scientifique_Tech', 95),
(2, 'Interet_Artistique_Creatif', 30),
(2, 'Interet_Social_Humain', 20),
(2, 'Interet_Business_Gestion', 50),
(2, 'Interet_Logique_Analytique', 95),
(2, 'Competence_Resolution_Problemes', 95),
(2, 'Competence_Communication', 65),
(2, 'Competence_Organisation', 80),
(2, 'Competence_Manuel_Technique', 90),
(2, 'Valeur_Impact_Societal', 70),
(2, 'Valeur_Innovation_Challenge', 90),
(2, 'Valeur_Stabilite_Securite', 70),
(2, 'Valeur_Autonomie', 80),
(2, 'Pref_Travail_Equipe_Collab', 75),
(2, 'Pref_Travail_Autonome', 70),
(2, 'Pref_Pratique_Terrain', 85),
(2, 'Pref_Theorie_Recherche', 70);

-- Insérer les profils idéaux pour Architecture
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
(3, 'Interet_Scientifique_Tech', 60),
(3, 'Interet_Artistique_Creatif', 90),
(3, 'Interet_Social_Humain', 70),
(3, 'Interet_Business_Gestion', 50),
(3, 'Interet_Logique_Analytique', 80),
(3, 'Competence_Resolution_Problemes', 80),
(3, 'Competence_Communication', 85),
(3, 'Competence_Organisation', 85),
(3, 'Competence_Manuel_Technique', 85),
(3, 'Valeur_Impact_Societal', 85),
(3, 'Valeur_Innovation_Challenge', 90),
(3, 'Valeur_Stabilite_Securite', 60),
(3, 'Valeur_Autonomie', 80),
(3, 'Pref_Travail_Equipe_Collab', 80),
(3, 'Pref_Travail_Autonome', 70),
(3, 'Pref_Pratique_Terrain', 70),
(3, 'Pref_Theorie_Recherche', 60);

-- Insérer les profils idéaux pour Commerce International
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
(4, 'Interet_Scientifique_Tech', 40),
(4, 'Interet_Artistique_Creatif', 40),
(4, 'Interet_Social_Humain', 80),
(4, 'Interet_Business_Gestion', 98),
(4, 'Interet_Logique_Analytique', 85),
(4, 'Competence_Resolution_Problemes', 85),
(4, 'Competence_Communication', 95),
(4, 'Competence_Organisation', 90),
(4, 'Competence_Manuel_Technique', 20),
(4, 'Valeur_Impact_Societal', 60),
(4, 'Valeur_Innovation_Challenge', 85),
(4, 'Valeur_Stabilite_Securite', 70),
(4, 'Valeur_Autonomie', 80),
(4, 'Pref_Travail_Equipe_Collab', 90),
(4, 'Pref_Travail_Autonome', 60),
(4, 'Pref_Pratique_Terrain', 70),
(4, 'Pref_Theorie_Recherche', 60);

-- Insérer les profils idéaux pour Informatique
INSERT INTO ideal_profiles (program_id, pillar_name, ideal_score) VALUES
(8, 'Interet_Scientifique_Tech', 98),
(8, 'Interet_Artistique_Creatif', 40),
(8, 'Interet_Social_Humain', 30),
(8, 'Interet_Business_Gestion', 40),
(8, 'Interet_Logique_Analytique', 98),
(8, 'Competence_Resolution_Problemes', 98),
(8, 'Competence_Communication', 70),
(8, 'Competence_Organisation', 80),
(8, 'Competence_Manuel_Technique', 50),
(8, 'Valeur_Impact_Societal', 60),
(8, 'Valeur_Innovation_Challenge', 95),
(8, 'Valeur_Stabilite_Securite', 70),
(8, 'Valeur_Autonomie', 85),
(8, 'Pref_Travail_Equipe_Collab', 70),
(8, 'Pref_Travail_Autonome', 80),
(8, 'Pref_Pratique_Terrain', 40),
(8, 'Pref_Theorie_Recherche', 80);

-- Pour les autres majeures, utiliser des profils par défaut
-- (Vous pouvez les personnaliser selon vos besoins)

COMMIT;
