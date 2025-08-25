-- ========================================
-- Mise à jour des descriptions des majeures
-- Système d'Orientation des Étudiants
-- ========================================

-- Mise à jour des descriptions avec le contenu final complet
UPDATE orientation_majors SET 
    description = 'Civil Engineering is a field focused on the design and construction of infrastructure. It combines scientific theory with practical application to create the bridges, roads, and buildings that shape our environment.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Génie Civil';

UPDATE orientation_majors SET 
    description = 'Mechanical Engineering is the heart of industrial innovation. It covers the design, analysis, and manufacturing of mechanical systems, from car engines to industrial robots, using physics and mathematics to create efficient and sustainable solutions.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Génie Mécanique';

UPDATE orientation_majors SET 
    description = 'Architecture is the discipline that shapes our built environment. It combines artistic creativity with engineering rigor to design functional, aesthetic, and environmentally friendly spaces.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Architecture';

UPDATE orientation_majors SET 
    description = 'International Business prepares you to become a player in global markets. This major focuses on the economic, legal, and cultural aspects of cross-border trade, and teaches you how to operate in a complex international environment.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Commerce International';

UPDATE orientation_majors SET 
    description = 'Business Administration is the ideal major for leading organizations. You will learn the fundamental principles of management, finance, marketing, and human resources to make strategic decisions.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Administration des Affaires';

UPDATE orientation_majors SET 
    description = 'This major allows you to understand the forces that drive the global economy. It combines economic theory with the realities of international trade to solve complex problems on a planetary scale.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Économie et Commerce International';

UPDATE orientation_majors SET 
    description = 'Marketing and Management are at the core of business growth. This major teaches you to understand consumer behavior, design impactful campaigns, and lead teams.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Marketing et Management';

UPDATE orientation_majors SET 
    description = 'Computer Science is the science that studies computers and their applications. This major explores programming, artificial intelligence, and network security to design the technologies of tomorrow.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Informatique';

UPDATE orientation_majors SET 
    description = 'Software Engineering is the art and science of designing, developing, and maintaining quality software. It is the ideal major for building reliable and efficient computer systems.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Génie Logiciel';

UPDATE orientation_majors SET 
    description = 'Artificial Intelligence is the frontier of technological innovation. This major explores machine learning and deep learning to design systems capable of solving complex problems autonomously.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Intelligence Artificielle';

UPDATE orientation_majors SET 
    description = 'Tourism Management is a major that combines the commercial aspect with strong customer service. It teaches you how to organize trips and promote destinations to create memorable experiences for others.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Gestion du Tourisme';

UPDATE orientation_majors SET 
    description = 'Nursing is a calling. It''s a major for those with deep empathy and a desire to help others, working in a team to ensure the well-being of patients.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Soins Infirmiers';

UPDATE orientation_majors SET 
    description = 'Pharmacy is the major for scientific minds who want to contribute to people''s health through the science of medicine. It explores chemistry, biology, and the mechanisms of drug action.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Pharmacie';

UPDATE orientation_majors SET 
    description = 'Electrical Engineering is the driving force of modern technology. This major allows you to design electrical and electronic systems for everything from phones to power grids.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Génie Électrique';

UPDATE orientation_majors SET 
    description = 'Food Science and Engineering is the meeting point of science and gastronomy. This major allows you to understand the composition of food and ensure its safety and quality, by developing new products and sustainable production methods.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Sciences et Ingénierie Alimentaires';

UPDATE orientation_majors SET 
    description = 'Finance is the major for analytical and ambitious minds. This field gives you the keys to understand and influence the economic world, by managing assets and evaluating risks.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Finance';

UPDATE orientation_majors SET 
    description = 'This major is the meeting point of creativity and production. It allows you to design machines and systems, while mastering CAD tools, robotics, and manufacturing processes to automate industry.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Conception Mécanique, Fabrication et Automatisation';

UPDATE orientation_majors SET 
    description = 'The Science of Law is the foundation of justice. It requires great logical rigor and a capacity for complex text analysis, preparing you to defend rights and promote justice.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Science du Droit';

UPDATE orientation_majors SET 
    description = 'International Politics is a major for those who want to understand and influence relations between nations. It gives you the keys to analyze conflicts, foreign policies, and international organizations.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Politique Internationale';

UPDATE orientation_majors SET 
    description = 'MBBS is the path to medicine. It is a demanding field that prepares you to diagnose, treat, and prevent diseases, dedicating yourself to the health and well-being of others.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'MBBS';

UPDATE orientation_majors SET 
    description = 'Public Relations is the art of building and maintaining a good image. This major teaches you how to manage an organization''s reputation, interact with the media, and create impactful campaigns.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Relations Publiques';

UPDATE orientation_majors SET 
    description = 'Applied Chemistry is the major for scientific minds who want to transform the physical world. It uses the principles of chemistry to solve practical problems, by developing new medicines, creating innovative materials, or purifying the environment.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Chimie Appliquée';

UPDATE orientation_majors SET 
    description = 'The English major is for those passionate about literature, languages, and culture. It allows you to explore the richness of language and thought to develop critical thinking and persuasive communication.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Études Anglaises';

UPDATE orientation_majors SET 
    description = 'Dentistry is a health science focused on the mouth and teeth. It combines sharp scientific knowledge with great dexterity to diagnose and treat oral diseases.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Médecine Dentaire';

UPDATE orientation_majors SET 
    description = 'This major is the future of energy. It prepares you to design, develop, and implement sustainable energy systems for a cleaner and more efficient world.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Sciences et Ingénierie des Nouvelles Énergies';

UPDATE orientation_majors SET 
    description = 'Hydraulic Engineering is the science of water management. This major offers you the opportunity to solve crucial problems for society, by designing dams or water management systems for irrigation and power generation.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Ingénierie Hydraulique';

UPDATE orientation_majors SET 
    description = 'Transportation Engineering is an essential major for the development of cities. It teaches you how to design road, rail, and airport networks to improve mobility and create sustainable infrastructure for the population.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Ingénierie des Transports';

UPDATE orientation_majors SET 
    description = 'Bioengineering is the convergence of engineering and biology. It applies the principles of engineering to solve medical and biological problems, by designing prostheses, medical implants, or new treatment technologies.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Bioingénierie';

UPDATE orientation_majors SET 
    description = 'Biotechnology uses living organisms to create new products and technologies. This major is for those who want to push the boundaries of science to solve global problems in genetics, microbiology, or biochemistry.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Biotechnologie';

UPDATE orientation_majors SET 
    description = 'Materials Science and Engineering is the discipline that gives life to the objects around us. This major allows you to understand the structure of materials and to design new ones, lighter and more efficient, for applications in aerospace, medicine, or electronics.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Science et Ingénierie des Matériaux';

UPDATE orientation_majors SET 
    description = 'E-Commerce is the engine of modern commerce. This major will give you the keys to create and manage online stores by mastering digital marketing, logistics, and data analysis.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'E-Commerce';

UPDATE orientation_majors SET 
    description = 'Robot Engineering is the convergence of computer science, mechanics, and electronics. It is the major for creative and analytical minds who want to design and build intelligent robots.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Ingénierie Robotique';

UPDATE orientation_majors SET 
    description = 'Biomedical Engineering is the link between engineering and medicine. It applies the principles of engineering to solve clinical problems and improve human health.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Ingénierie Biomédicale';

UPDATE orientation_majors SET 
    description = 'Data Science is the discipline that makes sense of massive amounts of information. This major allows you to extract knowledge from data to predict trends and make informed decisions.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Science des Données';

UPDATE orientation_majors SET 
    description = 'Economics is the science that studies the production, distribution, and consumption of wealth. It gives you the tools to analyze markets and public policies, and to solve social and economic problems using data and logic.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Économie';

UPDATE orientation_majors SET 
    description = 'Chemical Engineering is the major that transforms science into production. You will learn to design processes to produce chemicals, fuels, plastics, or medicines on a large scale.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Génie Chimique';

UPDATE orientation_majors SET 
    description = 'Petroleum Engineering is the major that immerses you in the heart of the energy industry. You will study the techniques of exploration, extraction, and processing of oil and gas.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Génie Pétrolier';

UPDATE orientation_majors SET 
    description = 'This major is at the heart of the digital revolution. It allows you to design electronic chips, communication systems, and information technologies to create the innovations of tomorrow.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Génie Électronique et Informatique';

UPDATE orientation_majors SET 
    description = 'Safety Engineering is the discipline that protects people and property. This major teaches you to design safe systems and environments by analyzing risks and developing protocols.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Génie de la Sécurité';

UPDATE orientation_majors SET 
    description = 'Mining Engineering is essential for the extraction of Earth''s resources. It teaches you to design mines, manage operations, and ensure safety in demanding environments.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Génie Minier';

UPDATE orientation_majors SET 
    description = 'Psychology is the study of the mind and human behavior. This major teaches you to analyze behaviors, conduct research, and help individuals improve their well-being.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Psychologie';

UPDATE orientation_majors SET 
    description = 'Aeronautical Engineering is the science of flight. This major prepares you to design, develop, and test airplanes and helicopters, applying the principles of mechanics, physics, and electronics.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Génie Aéronautique';

UPDATE orientation_majors SET 
    description = 'Aerospace Engineering is the major for those who want to explore space. It is a discipline that goes beyond the Earth''s atmosphere, designing rockets, satellites, and spacecraft.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Génie Aérospatial';

UPDATE orientation_majors SET 
    description = 'Medicine is a noble path for those who want to dedicate their lives to the health and well-being of others. This major gives you a deep understanding of the human body and its diseases.',
    updated_at = CURRENT_TIMESTAMP
WHERE major_name = 'Médecine';

-- Vérification des mises à jour
SELECT 'Mise à jour des descriptions terminée' AS status;
SELECT COUNT(*) AS 'Nombre de majeures mises à jour' FROM orientation_majors WHERE updated_at >= CURRENT_TIMESTAMP - INTERVAL 1 MINUTE;
