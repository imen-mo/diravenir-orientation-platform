-- =====================================================
-- SCRIPT COMPLET : INSERTION DE TOUS LES LOGOS D'UNIVERSITÉS
-- =====================================================
-- Exécutez d'abord : SET SQL_SAFE_UPDATES = 0;

-- =====================================================
-- ÉTAPE 1 : NETTOYAGE DES COLONNES LOGO
-- =====================================================

-- Vérifier l'état initial
SELECT 'État initial des colonnes logo' as info;
SELECT 
    'logoUrl' as colonne,
    COUNT(*) as total,
    COUNT(CASE WHEN logoUrl IS NOT NULL THEN 1 END) as non_vides,
    COUNT(CASE WHEN logoUrl LIKE 'http%' THEN 1 END) as urls_valides
FROM universite
UNION ALL
SELECT 
    'logo_url' as colonne,
    COUNT(*) as total,
    COUNT(CASE WHEN logo_url IS NOT NULL THEN 1 END) as non_vides,
    COUNT(CASE WHEN logo_url LIKE 'http%' THEN 1 END) as urls_valides
FROM universite
UNION ALL
SELECT 
    'image_url' as colonne,
    COUNT(*) as total,
    COUNT(CASE WHEN image_url IS NOT NULL THEN 1 END) as non_vides,
    COUNT(CASE WHEN image_url LIKE 'http%' THEN 1 END) as urls_valides
FROM universite;

-- Nettoyer logoUrl (mettre NULL si pas d'URL valide)
UPDATE universite 
SET logoUrl = NULL 
WHERE id > 0 AND (logoUrl IS NULL OR logoUrl NOT LIKE 'http%');

-- Copier les URLs valides de logoUrl vers logo_url
UPDATE universite 
SET logo_url = logoUrl 
WHERE id > 0 AND logoUrl IS NOT NULL AND logoUrl LIKE 'http%';

-- Nettoyer logo_url (mettre NULL si pas d'URL valide)
UPDATE universite 
SET logo_url = NULL 
WHERE id > 0 AND (logo_url IS NULL OR logo_url NOT LIKE 'http%');

-- Nettoyer image_url (mettre NULL si pas d'URL valide)
UPDATE universite 
SET image_url = NULL 
WHERE id > 0 AND (image_url IS NULL OR image_url NOT LIKE 'http%');

-- Vérifier après nettoyage
SELECT 'Après nettoyage des colonnes logo' as info;
SELECT 
    'logoUrl' as colonne,
    COUNT(*) as total,
    COUNT(CASE WHEN logoUrl IS NOT NULL THEN 1 END) as non_vides,
    COUNT(CASE WHEN logoUrl LIKE 'http%' THEN 1 END) as urls_valides
FROM universite
UNION ALL
SELECT 
    'logo_url' as colonne,
    COUNT(*) as total,
    COUNT(CASE WHEN logo_url IS NOT NULL THEN 1 END) as non_vides,
    COUNT(CASE WHEN logo_url LIKE 'http%' THEN 1 END) as urls_valides
FROM universite
UNION ALL
SELECT 
    'image_url' as colonne,
    COUNT(*) as total,
    COUNT(CASE WHEN image_url IS NOT NULL THEN 1 END) as non_vides,
    COUNT(CASE WHEN image_url LIKE 'http%' THEN 1 END) as urls_valides
FROM universite;

-- =====================================================
-- ÉTAPE 2 : INSERTION DES LOGOS - PARTIE 1 (51 universités)
-- =====================================================

-- 1. Hefei University
UPDATE universite 
SET logo_url = 'https://www.digiedupro.com/media/2020/05/Hefei-University-Logo.png'
WHERE id > 0 AND nom LIKE '%Hefei University%';

-- 2. Hefei University of Technology
UPDATE universite 
SET logo_url = 'https://www.urongda.com/og-images/hefeiuniversity-of-technology.png'
WHERE id > 0 AND nom LIKE '%Hefei University of Technology%';

-- 3. Anhui Normal University
UPDATE universite 
SET logo_url = 'https://tse2.mm.bing.net/th/id/OIP.NrzMu0yeWWuNk-ttkQzx9wAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
WHERE id > 0 AND nom LIKE '%Anhui Normal University%';

-- 4. University of Science and Technology of China
UPDATE universite 
SET logo_url = 'https://cdn1.sorbetoutsourcing.com/1221/1200pxLogo_of_University_of_Science_and_Technology_of_China.svg.png'
WHERE id > 0 AND nom LIKE '%University of Science and Technology of China%';

-- 5. Beijing Jiaotong University
UPDATE universite 
SET logo_url = 'https://www.edarabia.com/wp-content/uploads/2018/03/beijing-jiaotonguniversity-beijing-china.png'
WHERE id > 0 AND nom LIKE '%Beijing Jiaotong University%';

-- 6. Beijing Foreign Studies University
UPDATE universite 
SET logo_url = 'https://i.ytimg.com/vi/6im5oQlr_OM/maxresdefault.jpg'
WHERE id > 0 AND nom LIKE '%Beijing Foreign Studies University%';

-- 7. Beihang University
UPDATE universite 
SET logo_url = 'https://www.chinauniversityjobs.com/wp-content/uploads/2021/09/r%E5%8C%97%E4%BA%AC%E8%88%AA%E7%A9%BA%E8%88%AA%E5%A4%A9%E5%A4%A7%E5%AD%A6logo-min.png'
WHERE id > 0 AND nom LIKE '%Beihang University%';

-- 8. Beijing Institute of Technology
UPDATE universite 
SET logo_url = 'https://bootflare.com/wp-content/uploads/2024/03/Beijing-Institute-ofTechnology-Logo.png'
WHERE id > 0 AND nom LIKE '%Beijing Institute of Technology%';

-- 9. Chongqing Medical University
UPDATE universite 
SET logo_url = 'https://statnano.com/resource/amar_university_world/files/images/21/1/thumbnail_b201199e42664222e3938cd038be92e6.png'
WHERE id > 0 AND nom LIKE '%Chongqing Medical University%';

-- 10. Chongqing Normal University
UPDATE universite 
SET logo_url = 'https://www.chinauniversityjobs.com/wp-content/uploads/2021/07/r%E9%87%8D%E5%BA%86%E5%B8%88%E8%8C%83%E5%A4%A7%E5%AD%A6%E6%B6%89%E5%A4%96%E5%95%86%E5%AD%A6%E9%99%A2logo-min.png'
WHERE id > 0 AND nom LIKE '%Chongqing Normal University%';

-- 11. Chongqing Jiaotong University
UPDATE universite 
SET logo_url = 'https://www.gocnstudy.cn/wp-content/uploads/2023/03/Chongqing-JiaotongUniversity.jpg'
WHERE id > 0 AND nom LIKE '%Chongqing Jiaotong University%';

-- 12. Chongqing University of Posts and Telecommunications
UPDATE universite 
SET logo_url = 'https://open.ieee.org/wp-content/uploads/Chongqing-University-of-Postand-Telecom.png'
WHERE id > 0 AND nom LIKE '%Chongqing University of Posts and Telecommunications%';

-- 13. Southwest University
UPDATE universite 
SET logo_url = 'https://image.pngaaa.com/611/4146611middle.png'
WHERE id > 0 AND nom LIKE '%Southwest University%';

-- 14. Fujian Normal University
UPDATE universite 
SET logo_url = 'https://open.ieee.org/wp-content/uploads/Fujian-Normal-University.png'
WHERE id > 0 AND nom LIKE '%Fujian Normal University%';

-- 15. Fujian University of Technology
UPDATE universite 
SET logo_url = 'https://open.ieee.org/wp-content/uploads/Fujian-University-ofTechnology.png'
WHERE id > 0 AND nom LIKE '%Fujian University of Technology%';

-- 16. Xiamen University
UPDATE universite 
SET logo_url = 'https://www.jagvimal.com/images/university_images/small/Xiamen%20University%20logo.jpg-54571.jpg'
WHERE id > 0 AND nom LIKE '%Xiamen University%';

-- 17. Northwest Normal University
UPDATE universite 
SET logo_url = 'https://tkcom.eu/wp-content/uploads/2018/05/logos-04.png'
WHERE id > 0 AND nom LIKE '%Northwest Normal University%';

-- 18. Lanzhou Jiaotong University
UPDATE universite 
SET logo_url = 'https://open.ieee.org/wp-content/uploads/Lanzhou-JiaotongUniversity.png'
WHERE id > 0 AND nom LIKE '%Lanzhou Jiaotong University%';

-- 19. South China University of Technology
UPDATE universite 
SET logo_url = 'https://open.ieee.org/wp-content/uploads/South-China-University-ofTechnology-300x211.png'
WHERE id > 0 AND nom LIKE '%South China University of Technology%';

-- 20. Jinan University
UPDATE universite 
SET logo_url = 'https://www.educatepulse.com/wp-content/uploads/2021/04/JINAN-UNIVERSITYLogo.png'
WHERE id > 0 AND nom LIKE '%Jinan University%';

-- 21. South China Normal University
UPDATE universite 
SET logo_url = 'https://www.digiedupro.com/media/2020/04/South_China_Normal_University_logo.png'
WHERE id > 0 AND nom LIKE '%South China Normal University%';

-- 22. Shantou University
UPDATE universite 
SET logo_url = 'https://www.asctherapeutics.com/wp-content/uploads/2020/01/Shantou-Logo.jpg'
WHERE id > 0 AND nom LIKE '%Shantou University%';

-- 23. Guilin University of Electronic Technology
UPDATE universite 
SET logo_url = 'https://open.ieee.org/wp-content/uploads/Guilin-University-ofElectronic-Technology.png'
WHERE id > 0 AND nom LIKE '%Guilin University of Electronic Technology%';

-- 24. Guangxi Medical University
UPDATE universite 
SET logo_url = 'https://www.digiedupro.com/media/2019/03/GUANGXI-MEDICALUNIVERSITY_gkworks.in_.jpg'
WHERE id > 0 AND nom LIKE '%Guangxi Medical University%';

-- 25. Guangxi Normal University
UPDATE universite 
SET logo_url = 'https://edurank.org/assets/img/unilogos/guangxi-normal-university-logo.png'
WHERE id > 0 AND nom LIKE '%Guangxi Normal University%';

-- 26. Nanning Normal University
UPDATE universite 
SET logo_url = 'https://edurank.org/assets/img/unilogos/nanjing-normal-university-logo.png'
WHERE id > 0 AND nom LIKE '%Nanning Normal University%';

-- 27. Hainan Normal University
UPDATE universite 
SET logo_url = 'https://www.tropicalhainan.com/wp-content/uploads/2024/01/Hainan-NormalUniversity.jpg'
WHERE id > 0 AND nom LIKE '%Hainan Normal University%';

-- 28. Hainan University
UPDATE universite 
SET logo_url = 'https://upload-chinaadmissions.imgix.net/uploads/school_logos/Hainan_University_-_logo.png'
WHERE id > 0 AND nom LIKE '%Hainan University%';

-- 29. Hebei Normal University
UPDATE universite 
SET logo_url = 'https://www.urongda.com/og-images/hebeinormal-university.png'
WHERE id > 0 AND nom LIKE '%Hebei Normal University%';

-- 30. Hebei Medical University
UPDATE universite 
SET logo_url = 'https://www.gocnstudy.cn/wp-content/uploads/2023/03/Hebei-MedicalUniversity1.jpg'
WHERE id > 0 AND nom LIKE '%Hebei Medical University%';

-- 31. Hebei University of Economics and Business
UPDATE universite 
SET logo_url = 'https://www.urongda.com/og-images/hebeiuniversity-of-economics-and-business.png'
WHERE id > 0 AND nom LIKE '%Hebei University of Economics and Business%';

-- 32. Hebei University of Technology
UPDATE universite 
SET logo_url = 'http://tianjin.ankswb.com/img.ashx?shopid=8613&file=2021041314513892.jpg'
WHERE id > 0 AND nom LIKE '%Hebei University of Technology%';

-- 33. Harbin Normal University
UPDATE universite 
SET logo_url = 'https://edurank.org/assets/img/unilogos/harbin-normal-university-logo.png'
WHERE id > 0 AND nom LIKE '%Harbin Normal University%';

-- 34. Heihe University
UPDATE universite 
SET logo_url = 'https://edurank.org/assets/img/uni-logos/heiheuniversity-logo.png'
WHERE id > 0 AND nom LIKE '%Heihe University%';

-- 35. Harbin University of Science and Technology
UPDATE universite 
SET logo_url = 'https://edurank.org/assets/img/unilogos/harbin-university-of-science-andtechnology-logo.png'
WHERE id > 0 AND nom LIKE '%Harbin University of Science and Technology%';

-- 36. Harbin Engineering University
UPDATE universite 
SET logo_url = 'https://s3-ap-southeast1.amazonaws.com/cdn.buddy4study.com/static/scholarship_logo/logo_ee69da86-3bce451d-a13dbe356aa49ec6_Harbin_Engineering_University_(HEU).jpg'
WHERE id > 0 AND nom LIKE '%Harbin Engineering University%';

-- 37. Harbin Institute of Technology
UPDATE universite 
SET logo_url = 'https://www.bourses-etudiants.ma/wp-content/uploads/2023/06/Harbin-Institute-ofTechnology-bourses-etudiants-768x358.png'
WHERE id > 0 AND nom LIKE '%Harbin Institute of Technology%';

-- 38. Henan University of Chinese Medicine
UPDATE universite 
SET logo_url = 'https://cdn.urongda.com/images/normal/medium/henan-university-of-chinese-medicine-logo1024px.png'
WHERE id > 0 AND nom LIKE '%Henan University of Chinese Medicine%';

-- 39. Henan University of Technology (HAUT)
UPDATE universite 
SET logo_url = 'https://www.digiedupro.com/media/2020/05/Henan_University_of_Technology-logo.jpg'
WHERE id > 0 AND nom LIKE '%Henan University of Technology%';

-- 40. Zhengzhou University
UPDATE universite 
SET logo_url = 'https://cdn.urongda.com/images/normal/medium/zhengzhou-university-logo-1024px.png'
WHERE id > 0 AND nom LIKE '%Zhengzhou University%';

-- 41. Wuhan Institute of Technology
UPDATE universite 
SET logo_url = 'https://edurank.org/assets/img/unilogos/wuhan-institute-of-technology-logo.png'
WHERE id > 0 AND nom LIKE '%Wuhan Institute of Technology%';

-- 42. Wuhan Sports University
UPDATE universite 
SET logo_url = 'https://cdn.urongda.com/images/normal/medium/wuhan-sports-university-logo1024px.png'
WHERE id > 0 AND nom LIKE '%Wuhan Sports University%';

-- 43. Wuhan Polytechnic University
UPDATE universite 
SET logo_url = 'https://cdn.urongda.com/images/normal/medium/wuhan-polytechnic-university-logo1024px.png'
WHERE id > 0 AND nom LIKE '%Wuhan Polytechnic University%';

-- 44. Central China Normal University
UPDATE universite 
SET logo_url = 'https://www.uow.edu.au/assets/logos/offshorepartners/Central-China-Normal-Universitylogo.png'
WHERE id > 0 AND nom LIKE '%Central China Normal University%';

-- 45. Hubei University
UPDATE universite 
SET logo_url = 'https://applyforchina.com/wp-content/uploads/2025/01/logo-21.png.webp'
WHERE id > 0 AND nom LIKE '%Hubei University%';

-- 46. Huazhong University of Science & Technology
UPDATE universite 
SET logo_url = 'https://www.hbeii.cn/static/images/hezuo_04.jpg'
WHERE id > 0 AND nom LIKE '%Huazhong University of Science%';

-- 47. Central South University
UPDATE universite 
SET logo_url = 'https://www.bourses-etudiants.ma/wp-content/uploads/2023/06/Central-SouthUniversity-bourses-etudiants-768x358.png'
WHERE id > 0 AND nom LIKE '%Central South University%';

-- 48. Changsha University of Science and Technology
UPDATE universite 
SET logo_url = 'https://upload-chinaadmissions.imgix.net/uploads/school_logos/Changsha_University_of_Science_and_Technology_logo.png'
WHERE id > 0 AND nom LIKE '%Changsha University of Science and Technology%';

-- 49. XiangTan University
UPDATE universite 
SET logo_url = 'https://www.digiedupro.com/media/2020/04/Xiangtan_University-logo.png'
WHERE id > 0 AND nom LIKE '%XiangTan University%';

-- 50. Hunan Normal University
UPDATE universite 
SET logo_url = 'https://img.eduei.com/uploads/images/school/hunnu.png'
WHERE id > 0 AND nom LIKE '%Hunan Normal University%';

-- 51. Hunan University
UPDATE universite 
SET logo_url = 'https://cumulusassociation.org/wp-content/uploads/2021/10/HunanUniversity.jpeg'
WHERE id > 0 AND nom LIKE '%Hunan University%';

-- =====================================================
-- ÉTAPE 3 : INSERTION DES LOGOS - PARTIE 2 (72 universités)
-- =====================================================

-- 52. China Pharmaceutical University
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/8/8c/China_Pharmaceutical_University_logo.png'
WHERE id > 0 AND nom LIKE '%China Pharmaceutical University%';

-- 53. Jiangsu University
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/0/0a/Jiangsu_University_logo.png'
WHERE id > 0 AND nom LIKE '%Jiangsu University%';

-- 54. Nanjing University of Aeronautics and Astronautics
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/e/ee/NUAA_logo.png'
WHERE id > 0 AND nom LIKE '%Nanjing University of Aeronautics and Astronautics%';

-- 55. China University of Mining and Technology
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/8/82/China_University_of_Mining_and_Technology_logo.png'
WHERE id > 0 AND nom LIKE '%China University of Mining and Technology%';

-- 56. Jiangnan University
UPDATE universite 
SET logo_url = 'https://open.ieee.org/wp-content/uploads/Jiangnan-University.png'
WHERE id > 0 AND nom LIKE '%Jiangnan University%';

-- 57. Jiangsu Normal University
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/3/3e/Jiangsu_Normal_University_logo.png'
WHERE id > 0 AND nom LIKE '%Jiangsu Normal University%';

-- 58. Nanchang University
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/6/6f/Nanchang_University_logo.png'
WHERE id > 0 AND nom LIKE '%Nanchang University%';

-- 59. Jiangxi University of Finance and Economics
UPDATE universite 
SET logo_url = 'https://www.chinauniversityjobs.com/wp-content/uploads/2021/08/r%E6%B1%9F%E8%A5%BF%E8%B4%A2%E7%BB%8F%E5%A4%A7%E5%AD%A6logo-100x100.png'
WHERE id > 0 AND nom LIKE '%Jiangxi University of Finance and Economics%';

-- 60. Jiangxi Normal University
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/c/c5/Jiangxi_Normal_University.svg'
WHERE id > 0 AND nom LIKE '%Jiangxi Normal University%';

-- 61. Nanchang Hangkong University
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/7/73/Nanchang_Hangkong_University_logo.png'
WHERE id > 0 AND nom LIKE '%Nanchang Hangkong University%';

-- 62. Changchun University of Chinese Medicine
UPDATE universite 
SET logo_url = 'https://upload-china-admissions.imgix.net/uploads/school_logos/Changchun_University_of_Chinese_Medicine_(CUCM).png'
WHERE id > 0 AND nom LIKE '%Changchun University of Chinese Medicine%';

-- 63. Changchun University of Science and Technology
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/2/29/Changchun_University_of_Science_and_Technology_logo.png'
WHERE id > 0 AND nom LIKE '%Changchun University of Science and Technology%';

-- 64. Jilin Normal University
UPDATE universite 
SET logo_url = 'https://upload-china-admissions.imgix.net/uploads/school_logos/Jilin-Normal-University-JLNU-Logo.jpg'
WHERE id > 0 AND nom LIKE '%Jilin Normal University%';

-- 65. Jilin University
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/4/47/Jilin_University_logo.png'
WHERE id > 0 AND nom LIKE '%Jilin University%';

-- 66. China Medical University
UPDATE universite 
SET logo_url = 'https://e7.pngegg.com/pngimages/342/676/png-clipart-china-medical-university-national-taiwan-university-higher-education-china-logo-traditional-chinese-medicine.png'
WHERE id > 0 AND nom LIKE '%China Medical University%';

-- 67. Dalian Maritime University
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/3/3a/Dalian_Maritime_University_logo.png'
WHERE id > 0 AND nom LIKE '%Dalian Maritime University%';

-- 68. Dalian Polytechnic University
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/3/3a/Dalian_Maritime_University_logo.png'
WHERE id > 0 AND nom LIKE '%Dalian Polytechnic University%';

-- 69. Dongbei University of Finance and Economics
UPDATE universite 
SET logo_url = 'https://upload-china-admissions.imgix.net/uploads/school_logos/DUFE_Logo.jpg?w=200&h=200_qH0w&s'
WHERE id > 0 AND nom LIKE '%Dongbei University of Finance and Economics%';

-- 70. Dalian Jiaotong University
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/3/3d/Xi%27an_Jiaotong_University.png'
WHERE id > 0 AND nom LIKE '%Dalian Jiaotong University%';

-- 71. Dalian Medical University
UPDATE universite 
SET logo_url = 'https://upload-china-admissions.imgix.net/uploads/school_logos/DMU_Logo.png'
WHERE id > 0 AND nom LIKE '%Dalian Medical University%';

-- 72. Bohai University
UPDATE universite 
SET logo_url = 'https://www.at0086.com/images/university/logo/Bohai_University.png'
WHERE id > 0 AND nom LIKE '%Bohai University%';

-- 73. Anshan Normal University
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/4/4f/Anshan_Normal_University_logo.png'
WHERE id > 0 AND nom LIKE '%Anshan Normal University%';

-- 74. Ningxia Medical University
UPDATE universite 
SET logo_url = 'https://www.nxmu.edu.cn/nxykdyww/dfiles/6027/images/logo.jpg'
WHERE id > 0 AND nom LIKE '%Ningxia Medical University%';

-- 75. Ningxia University
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/6/63/Ningxia_University_logo.png'
WHERE id > 0 AND nom LIKE '%Ningxia University%';

-- 76. Shaanxi Normal University
UPDATE universite 
SET logo_url = 'https://images.squarespace-cdn.com/content/v1/53b0e2a2e4b02125b9194093/1488594389334-FQNDHMAVFU40U0AOHZC3/%E9%99%95%E8%A5%BF%E5%B8%88%E8%8C%83%E5%A4%A7%E5%AD%A6-Logo.jpg'
WHERE id > 0 AND nom LIKE '%Shaanxi Normal University%';

-- 77. Shaanxi University of Chinese Medicine
UPDATE universite 
SET logo_url = 'https://images.squarespace-cdn.com/content/v1/53b0e2a2e4b02125b9194093/1488594760397-PNUOG1TI1G839ZZJJREM/%E9%99%95%E8%A5%BF%E5%B8%88%E8%8C%83%E5%A4%A7%E5%AD%A6-Logo.jpg'
WHERE id > 0 AND nom LIKE '%Shaanxi University of Chinese Medicine%';

-- 78. Chang''an University
UPDATE universite 
SET logo_url = 'https://upload-china-admissions.imgix.net/uploads/school_logos/180px-Changan_University_logo.png'
WHERE id > 0 AND nom LIKE '%Chang''an University%';

-- 79. Northwest University
UPDATE universite 
SET logo_url = 'https://www.commonapp.org/static/ca6a632e1efc338371522c5d1b54c32a/northwest-university_1275.png'
WHERE id > 0 AND nom LIKE '%Northwest University%';

-- 80. Northwestern Polytechincal University
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/3/32/Seal_of_NWPU.png'
WHERE id > 0 AND nom LIKE '%Northwestern Polytechincal University%';

-- 81. Xi''an Jiaotong University
UPDATE universite 
SET logo_url = 'https://ih1.redbubble.net/image.3493496741.7449/raf,750x1000,075,t,fafafa:ca443f4786.jpg'
WHERE id > 0 AND nom LIKE '%Xi''an Jiaotong University%';

-- 82. Qingdao University of Science and Technology
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/3/3c/Qingkeda_university_logo_2.png'
WHERE id > 0 AND nom LIKE '%Qingdao University of Science and Technology%';

-- 83. Ludong University
UPDATE universite 
SET logo_url = 'https://ismac.fr/wp-content/uploads/2025/02/Partner-Logo-1-1024x296.webp'
WHERE id > 0 AND nom LIKE '%Ludong University%';

-- 84. Shandong Normal University
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/f/f4/Shandong_normal_university_logo.jpg'
WHERE id > 0 AND nom LIKE '%Shandong Normal University%';

-- 85. Shandong University of Science and Technology
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/f/f7/Shandong_University_of_Science_and_Technology_logo.png'
WHERE id > 0 AND nom LIKE '%Shandong University of Science and Technology%';

-- 86. China University of Petroleum(East China)
UPDATE universite 
SET logo_url = 'https://upload-china-admissions.imgix.net/uploads/school_logos/China_University_Of_Petroleum_logo.png?w=200&h=200'
WHERE id > 0 AND nom LIKE '%China University of Petroleum%';

-- 87. Shanghai University of Electric Power
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Shanghai_University_of_Electric_Power_logo.png/250px-Shanghai_University_of_Electric_Power_logo.png'
WHERE id > 0 AND nom LIKE '%Shanghai University of Electric Power%';

-- 88. East China University of Science and Technology
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/f/f5/ECUST_university_logo.png'
WHERE id > 0 AND nom LIKE '%East China University of Science and Technology%';

-- 89. East China Normal University
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/2/2a/East_China_Normal_University_logo.svg'
WHERE id > 0 AND nom LIKE '%East China Normal University%';

-- 90. Shanghai Jiao Tong University
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/d/da/Sjtu-logo-standard-red.png'
WHERE id > 0 AND nom LIKE '%Shanghai Jiao Tong University%';

-- 91. Fudan University
UPDATE universite 
SET logo_url = 'https://universitas21.com/wp-content/uploads/2018/03/Fudan-baa.jpg'
WHERE id > 0 AND nom LIKE '%Fudan University%';

-- 92. Shanxi University
UPDATE universite 
SET logo_url = 'https://open.ieee.org/wp-content/uploads/Shanxi-University.png'
WHERE id > 0 AND nom LIKE '%Shanxi University%';

-- 93. Shanxi University of Chinese Medicine
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/6/66/Logo_of_the_Shanxi_University_of_Chinese_Medicine.png'
WHERE id > 0 AND nom LIKE '%Shanxi University of Chinese Medicine%';

-- 94. Taiyuan University of Technology
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/6/63/Taiyuan_University_of_Technology_logo.png'
WHERE id > 0 AND nom LIKE '%Taiyuan University of Technology%';

-- 95. Chengdu University of Traditional Chinese Medicine
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/b/bf/Chengdu_University_of_Traditional_Chinese_Medicine_logo.png'
WHERE id > 0 AND nom LIKE '%Chengdu University of Traditional Chinese Medicine%';

-- 96. Southwestern University of Finance and Economics
UPDATE universite 
SET logo_url = 'https://cdn1.sorbetoutsourcing.com/1756/0.png'
WHERE id > 0 AND nom LIKE '%Southwestern University of Finance and Economics%';

-- 97. Southwest Jiaotong University
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/7/72/SWJTULogo.png'
WHERE id > 0 AND nom LIKE '%Southwest Jiaotong University%';

-- 98. University of Electronic Science and Technology of China
UPDATE universite 
SET logo_url = 'https://www.chinauniversityjobs.com/wp-content/uploads/2021/08/l%E7%94%B5%E5%AD%90%E7%A7%91%E6%8A%80%E5%A4%A7%E5%AD%A6logo.jpg'
WHERE id > 0 AND nom LIKE '%University of Electronic Science and Technology of China%';

-- 99. Sichuan University
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ef/Sichuan_University_logo_%28seal%29.svg/1200px-Sichuan_University_logo_%28seal%29.svg.png'
WHERE id > 0 AND nom LIKE '%Sichuan University%';

-- 100. Tianjin Normal University
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/2/2e/Tianjin_Normal_University_logo_2.png'
WHERE id > 0 AND nom LIKE '%Tianjin Normal University%';

-- 101. Tianjin Medical University
UPDATE universite 
SET logo_url = 'https://www.azoquantum.com/images/suppliers/ImageForSupplier_307_17214462357464626.png'
WHERE id > 0 AND nom LIKE '%Tianjin Medical University%';

-- 102. Tianjin University of Technology and Education
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/3/3b/Tianjin_University_of_Technology_logo.png'
WHERE id > 0 AND nom LIKE '%Tianjin University of Technology and Education%';

-- 103. Tiangong University
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/d/dd/Tiangong_University_Seal.jpg'
WHERE id > 0 AND nom LIKE '%Tiangong University%';

-- 104. Xinjiang Normal University
UPDATE universite 
SET logo_url = 'https://www.digiedupro.com/media/2020/04/Xinjiang-Normal-University-Logo-150x150.png'
WHERE id > 0 AND nom LIKE '%Xinjiang Normal University%';

-- 105. Xinjiang Medical University
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/d/d6/Xinjiang_Medical_University_%28logo%29.png'
WHERE id > 0 AND nom LIKE '%Xinjiang Medical University%';

-- 106. Yunnan Normal University
UPDATE universite 
SET logo_url = 'https://upload-china-admissions.imgix.net/uploads/school_logos/Yunnan_Normal_University_(YNNU).png'
WHERE id > 0 AND nom LIKE '%Yunnan Normal University%';

-- 107. Yunnan University of finance and Economics
UPDATE universite 
SET logo_url = 'https://www.developmentaid.org/files/organizationLogos/yunnan-university-of-finance-and-economics-297891.jpg'
WHERE id > 0 AND nom LIKE '%Yunnan University of finance and Economics%';

-- 108. Dali University
UPDATE universite 
SET logo_url = 'https://cdn.adscientificindex.com/logos/1841.png'
WHERE id > 0 AND nom LIKE '%Dali University%';

-- 109. Kunming Medical University
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/3/3f/Kunming_Medical_University_logo.png'
WHERE id > 0 AND nom LIKE '%Kunming Medical University%';

-- 110. Kunming University of Science and Technology
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/2/22/Kunming_University_of_Science_and_Technology_logo.png'
WHERE id > 0 AND nom LIKE '%Kunming University of Science and Technology%';

-- 111. Yunnan Minzu University
UPDATE universite 
SET logo_url = 'https://keystoneacademic-res.cloudinary.com/image/upload/element/96/96651_thumb.png'
WHERE id > 0 AND nom LIKE '%Yunnan Minzu University%';

-- 112. Hangzhou Dianzi University
UPDATE universite 
SET logo_url = 'https://keystoneacademic-res.cloudinary.com/image/upload/c_pad,w_256,h_142/dpr_auto/f_auto/q_auto/v1/element/92/92864_thumb.jpg'
WHERE id > 0 AND nom LIKE '%Hangzhou Dianzi University%';

-- 113. Zhejiang Normal University
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/thumb/1/17/Zhejiang_Normal_University_logo.svg/1200px-Zhejiang_Normal_University_logo.svg.png'
WHERE id > 0 AND nom LIKE '%Zhejiang Normal University%';

-- 114. Zhejiang Chinese medical university
UPDATE universite 
SET logo_url = 'https://keystoneacademic-res.cloudinary.com/image/upload/c_pad,w_640,h_304/dpr_auto/f_auto/q_auto/v1/element/16/160947_ZHE.png'
WHERE id > 0 AND nom LIKE '%Zhejiang Chinese medical university%';

-- 115. Hangzhou Normal University
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/8/82/HZNU_logo.png'
WHERE id > 0 AND nom LIKE '%Hangzhou Normal University%';

-- 116. Ningbo University of Technology
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/5/5b/Ningbo_University_of_Technology_logo.png'
WHERE id > 0 AND nom LIKE '%Ningbo University of Technology%';

-- 117. Wenzhou Medical University
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/zh/4/4f/Wenzhou_Medical_University_Logo.png'
WHERE id > 0 AND nom LIKE '%Wenzhou Medical University%';

-- 118. Wenzhou University
UPDATE universite 
SET logo_url = 'https://keystoneacademic-res.cloudinary.com/image/upload/element/92/92790_thumb.jpg'
WHERE id > 0 AND nom LIKE '%Wenzhou University%';

-- 119. Near East University
UPDATE universite 
SET logo_url = 'https://www.clipartmax.com/png/small/93-933440_near-east-university-logo.png'
WHERE id > 0 AND nom LIKE '%Near East University%';

-- 120. University of Kyrenia
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/en/f/fa/University_of_Kyrenia.png'
WHERE id > 0 AND nom LIKE '%University of Kyrenia%';

-- 121. Cyprus International University
UPDATE universite 
SET logo_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Uluslararas%C4%B1_K%C4%B1br%C4%B1s_%C3%9Cniversitesi_Resmi_Logo.png/640px-Uluslararas%C4%B1_K%C4%B1br%C4%B1s_%C3%9Cniversitesi_Resmi_Logo.png'
WHERE id > 0 AND nom LIKE '%Cyprus International University%';

-- 122. BAU Cyprus University
UPDATE universite 
SET logo_url = 'https://seeklogo.com/images/B/bahcesehir-universitesi-bau-logo-1E63704E83-seeklogo.com.png'
WHERE id > 0 AND nom LIKE '%BAU Cyprus University%';

-- 123. Final International University
UPDATE universite 
SET logo_url = 'https://keystoneacademic-res.cloudinary.com/image/upload/f_auto/q_auto/g_auto/w_250/dpr_2.0/element/15/152041_FIULOGO.png'
WHERE id > 0 AND nom LIKE '%Final International University%';

-- =====================================================
-- ÉTAPE 4 : VÉRIFICATION FINALE
-- =====================================================

-- Vérifier le résultat final
SELECT 'RÉSULTAT FINAL' as info;
SELECT 
    COUNT(*) as total_universites,
    COUNT(CASE WHEN logo_url IS NOT NULL AND logo_url LIKE 'http%' THEN 1 END) as logos_configures,
    COUNT(CASE WHEN logo_url IS NULL OR logo_url NOT LIKE 'http%' THEN 1 END) as logos_manquants
FROM universite;

-- Afficher le statut de toutes les universités
SELECT 
    id,
    nom,
    CASE 
        WHEN logo_url IS NOT NULL AND logo_url LIKE 'http%' THEN '✅ Logo configuré'
        ELSE '❌ Logo manquant'
    END as statut
FROM universite 
ORDER BY nom;

-- Afficher les universités qui ont encore des logos manquants (devrait être 0)
SELECT 
    'Universités sans logo (devrait être vide)' as info;
SELECT 
    id,
    nom,
    logo_url
FROM universite 
WHERE logo_url IS NULL OR logo_url NOT LIKE 'http%'
ORDER BY nom;

-- =====================================================
-- FIN DU SCRIPT
-- =====================================================
-- N'oubliez pas de remettre le mode safe update :
-- SET SQL_SAFE_UPDATES = 1;
