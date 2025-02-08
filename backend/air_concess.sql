-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 06 fév. 2025 à 13:10
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `air_concess`
--

-- --------------------------------------------------------

--
-- Structure de la table `agency`
--

DROP TABLE IF EXISTS `agency`;
CREATE TABLE IF NOT EXISTS `agency` (
  `agency_id` int NOT NULL AUTO_INCREMENT,
  `agency_name` varchar(30) NOT NULL,
  `agency_country` varchar(15) NOT NULL,
  `agency_city` varchar(20) NOT NULL,
  `agency_address` varchar(30) NOT NULL,
  PRIMARY KEY (`agency_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `agency`
--

INSERT INTO `agency` (`agency_id`, `agency_name`, `agency_country`, `agency_city`, `agency_address`) VALUES
(1, 'AirC Paris', 'France', 'Paris', '12 Avenue des Pilotes'),
(3, 'AirC LA', 'United States', 'Los Angeles', '500 Jetstream Blvd'),
(4, 'AirC Toronto', 'Canada', 'Toronto', '75 Airfield Road'),
(5, 'AirC London', 'United Kingdom', 'London', '22 Pilot Street'),
(6, 'AirC Berlin', 'Germany', 'Berlin', '10 Flughafenstraße');

-- --------------------------------------------------------

--
-- Structure de la table `aircraft`
--

DROP TABLE IF EXISTS `aircraft`;
CREATE TABLE IF NOT EXISTS `aircraft` (
  `aircraft_id` int NOT NULL AUTO_INCREMENT,
  `model_id` int NOT NULL,
  `serial_number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `manufacture_year` year DEFAULT NULL,
  `flight_hours` int DEFAULT NULL,
  `configuration` text,
  `recent_maintenance` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `typical_routes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `owner` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `cost_per_km` text,
  `monthly_maintenance_cost` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `estimated_price` int DEFAULT NULL,
  `isAvailable` tinyint NOT NULL DEFAULT '1',
  `description` varchar(500) NOT NULL,
  `last_location_update` datetime DEFAULT NULL,
  `last_location_longitude` float DEFAULT NULL,
  `last_location_latitude` float DEFAULT NULL,
  PRIMARY KEY (`aircraft_id`),
  UNIQUE KEY `serial_number` (`serial_number`),
  KEY `fk_aircraft_model_id` (`model_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `aircraft`
--

INSERT INTO `aircraft` (`aircraft_id`, `model_id`, `serial_number`, `manufacture_year`, `flight_hours`, `configuration`, `recent_maintenance`, `typical_routes`, `owner`, `cost_per_km`, `monthly_maintenance_cost`, `estimated_price`, `isAvailable`, `description`, `last_location_update`, `last_location_longitude`, `last_location_latitude`) VALUES
(7, 2, 'SN 6205', '2020', 3500, '14 sièges / 3 zones distinctes (salon, salle de conférence, chambre privée)', 'Révision complète effectuée à 3 000 heures de vol', 'New York - Dubaï / Londres - Tokyo', 'Grande entreprise multinationale (fictif)', 'X €', 'X €', 66000000, 1, 'Le Gulfstream G650ER est un jet d’affaires ultramoderne offrant une autonomie exceptionnelle de 13 890 km, idéal pour les vols intercontinentaux. Avec une vitesse maximale de Mach 0.925, il allie rapidité et confort. Sa cabine spacieuse et luxueuse accueille jusqu’à 19 passagers, proposant un environnement lumineux et connecté. C’est le choix parfait pour les voyageurs exigeants en quête de performance, de style et d’efficacité.', '2025-02-20 14:20:14', 2.5479, 49.0097),
(15, 4, 'PH795', '2002', 1200, 'Monoplace avec cabine ergonomique et tableau de bord minimaliste, équipé d\'un train d’atterrissage rétractable, ailes en fibre de carbone, et commandes de vol précises pour maximiser la performance en vol.', '15 janvier 2025', 'Vols de distance dans des environnements montagneux (Alpes, Andes).\r\n', NULL, '0,20 € / km', '150 € / mois', 50000, 1, 'Le SparrowHawk est un planeur léger, performant et moderne, conçu pour maximiser la glisse et les performances en compétition. Sa structure en fibre de carbone lui confère une légèreté exceptionnelle, facilitant le transport et l’assemblage. Il est idéal pour les pilotes cherchant un planeur rapide, agile et capable de voler de longues distances avec une grande efficacité. Avec son cockpit confortable et ses commandes précises, le SparrowHawk est un choix privilégié pour les amateurs de vol', '2024-12-10 06:11:18', 5.0811, 45.7256),
(16, 5, 'F-HATZ', '1977', 5000, 'Monomoteur à hélice avec cabine fermée, tableau de bord équipé de Garmin G1000 ou autres instruments numériques modernes. Réservoirs de carburant situés dans les ailes.', '15 décembre 2024', 'Saint-Etienne - Brest', 'AirConcess', '0,20 €/km', '500 € ', 400000, 0, 'Le Cessna 172 Skyhawk est un avion polyvalent, robuste et idéal pour les pilotes privés ou les écoles de pilotage. Connu pour sa stabilité, sa maniabilité et son coût d\'exploitation abordable, il convient parfaitement aux courtes distances, aux vols d\'entraînement et aux loisirs aériens.', '2024-11-04 18:21:08', -73.741, 45.467),
(17, 6, 'I-POVO', '2015', 15000, 'Cabine pressurisée avec une configuration de sièges flexible, incluant des fauteuils pivotants, des tables pliantes et un espace de rangement optimisé. Le poste de pilotage est équipé d’avionique avancée (Garmin G1000 ou similaire).', '5 janvier 2025', 'Rome - Madrid', 'AirConcess', '2.15€/km', '7500 €', 8000000, 1, 'Le Piaggio Avanti EVO est connu pour son design aérodynamique unique, avec une configuration à ailes canard et des hélices arrière. Cette conception offre une vitesse proche de celle des jets légers, tout en conservant une efficacité énergétique exceptionnelle. Il est également célèbre pour son faible niveau sonore dans la cabine et son confort, faisant de lui un choix prisé pour les trajets régionaux et continentaux.', '2025-02-03 14:21:26', -73.7781, 40.6413),
(18, 7, 'SNW123', '2020', 750, 'Cabine spacieuse configurée pour le confort, avec des sièges en cuir inclinables, des tables escamotables et un espace optimisé pour le travail ou la détente.\r\n\r\n', '12 Janvier 2025', 'Paris - Moscow', 'AirConcess', '4€/km', '20 000 €/mois', 9900000, 1, 'Le Learjet 75 Liberty est conçu pour les professionnels cherchant un équilibre parfait entre luxe, performance et efficacité. Avec son autonomie suffisante pour des vols régionaux et transcontinentaux courts, il offre une cabine silencieuse et un espace de travail confortable. C\'est l\'un des jets légers les plus rapides de sa catégorie, parfait pour les déplacements d\'affaires ou privés.', '2025-02-13 09:15:48', -118.409, 33.9416),
(19, 8, 'HB-VSA', '2015', 1500, 'Cabine configurable avec des options pour sièges VIP, transport médical ou cargo.\r\nPoste de pilotage doté d’un système avionique avancé, le Pilatus ACE™, pour une gestion intuitive et simplifiée.\r\nGrande porte cargo (unique dans sa catégorie) permettant un chargement aisé d\'équipements volumineux.', '26 décembre 2024', 'Istanbul-Londres', 'AirConcess', '3 €/km', '20 000 €/mois', 10000000, 0, 'Le Pilatus PC-24, surnommé le \"Super Versatile Jet\", est un avion conçu pour combiner les performances d’un jet privé avec la capacité d’atterrir sur des pistes courtes ou non préparées (graviers, herbe, etc.). Il est idéal pour des missions variées, telles que les vols d\'affaires, les transports médicaux, ou les opérations sur des sites éloignés. Connu pour sa robustesse suisse et son confort, il est un choix privilégié pour les clients recherchant à la fois luxe et polyvalence.', '2025-02-05 17:22:10', -0.4543, 51.47),
(20, 9, 'T-OMUSS', '1965', 10000, 'Cabine avec 4 sièges en cuir ou tissu.\r\nCockpit simple et ergonomique, souvent équipé d’une avionique de base (certains modèles modernisés disposent du Garmin G1000).', '7 septembre 2024', 'Lilles - Bordeaux', 'AirConcess', '0,50 €/km', '750 €/mois', 400000, 1, 'Le Piper PA-28 Cherokee est l’un des avions légers les plus fiables et accessibles du marché. Conçu pour les vols d’apprentissage, de loisir ou de transport privé, il est apprécié pour sa simplicité, sa maniabilité, et ses faibles coûts d’exploitation. Son design classique et robuste en fait un choix populaire parmi les pilotes et aéroclubs.', '2025-02-27 06:38:23', 55.3657, 25.2532),
(21, 10, 'DA40-NG', '1997', 4560, 'Cabine spacieuse avec des sièges en cuir et une visibilité exceptionnelle grâce à son cockpit vitré.\r\nCockpit équipé d’un système avionique avancé Garmin G1000 NXi, facilitant la navigation et la gestion des vols.', '1 décembre 2024', 'Strasbourg - Grenoble', 'AirConcess', '0,45 €/km', '1 500 €/mois', 500000, 1, 'Le Diamond DA40 est un avion léger moderne, alliant performances, sécurité et économie. Construit avec des matériaux composites, il offre une aérodynamique optimisée et une grande fiabilité. Le DA40 est particulièrement populaire auprès des écoles de pilotage et des pilotes privés pour sa maniabilité, ses faibles coûts d’exploitation et son excellent confort de vol.', '2024-12-18 18:22:42', 139.78, 35.5494),
(22, 11, 'I-PTFD', '2012', 562, 'Cabine spacieuse et lumineuse avec des sièges en cuir, offrant un confort supérieur pour un avion léger.\r\nCompartiment à bagages généreux, idéal pour les déplacements en famille ou pour des escapades prolongées.', '11 novembre 2024', 'Paris - Marseille', 'AirConcess', '0,55 €/km', '1 200 €/mois', 450000, 1, 'Le Tecnam P2010 est un avion léger moderne qui combine l’élégance italienne avec des performances fiables. Doté d’une conception en matériaux composites et d’une aile haute, il offre une excellente visibilité et une stabilité remarquable. Il est particulièrement adapté aux pilotes privés recherchant un avion confortable, moderne et efficace pour des vols locaux ou nationaux.', '2024-12-17 13:22:58', 151.175, -33.9399),
(23, 12, 'ZS-GCH', '2012', 450, 'Cockpit ergonomique et confortable, conçu pour des vols de longue durée.\r\nInstruments modernes pour le vol à voile, souvent équipés de systèmes de navigation avancés tels que LXNAV ou Cambridge Aero Instruments.\r\nAiles en composite avec des winglets pour maximiser l’efficacité aérodynamique.', '2 janvier 2025', 'Lyon - Grenoble', 'AirConcess', '0,10 €/km', '500 €/mois', 200000, 1, 'Le Jonker JS1 Revelation est un planeur haut de gamme conçu pour offrir des performances exceptionnelles en vol de distance et en compétition. Grâce à son design aérodynamique avancé et ses matériaux composites, il est capable de voler sur de longues distances en utilisant efficacement les courants ascendants thermiques. Le JS1 peut être configuré avec des ailes de 18 ou 21 mètres, selon les préférences du pilote et les conditions de vol. ', '2024-04-25 10:23:17', 116.585, 40.0801),
(24, 13, 'US-4240', '2019', 50, 'Cabine ouverte, offrant une visibilité exceptionnelle pour les vols panoramiques.\r\nSièges en tandem (pilote à l’avant, passager à l’arrière) pour une expérience immersive en vol.\r\nOption flotteurs pour l’amphibie, permettant des décollages et atterrissages sur l’eau.', '21 janvier 2025', 'Exploration de paysages naturels', 'Airconcess', '0,35 €/km', '1 000 €', 160000, 1, 'L’AirCam est un avion biplan unique, conçu pour les vols d’exploration, les missions de photographie aérienne, et les aventures en plein air. Sa conception à double moteur offre une sécurité accrue et la capacité de continuer à voler même en cas de panne moteur. Avec son cockpit ouvert et sa maniabilité exceptionnelle, il est idéal pour explorer des zones reculées, des rivières, des lacs, ou des côtes.', '2025-02-26 14:23:35', NULL, NULL),
(25, 14, 'GD-5658', '1994', 9999, 'Cockpit compact avec des sièges en tandem (pilote à l’avant, passager à l’arrière).\r\nOption pour flotteurs (hydravion) ou skis (atterrissages sur neige).\r\nConçu pour des opérations sur des pistes courtes ou non aménagées.', '31 décembre 2020', 'Balades aquatique', 'AirConcess', '0,40 €/km', '1 000 €', 250000, 0, 'Le Piper Super Cub PA-18 est un avion léger tout-terrain extrêmement polyvalent et robuste. Avec sa capacité à décoller et atterrir sur des pistes courtes, sur l’eau ou sur la neige, il est un favori des pilotes qui aiment explorer des endroits reculés. Facile à piloter et à entretenir, il est aussi très populaire dans les régions montagneuses ou isolées. Sa conception légère et ses ailes hautes lui permettent de voler à basse vitesse.', '2024-11-05 14:23:46', NULL, NULL),
(26, 4, 'PC123', '2002', 1568, 'Monoplace avec cabine ergonomique et tableau de bord minimaliste, équipé d\'un train d’atterrissage rétractable, ailes en fibre de carbone, et commandes de vol précises pour maximiser la performance en vol.', '13 janvier 2025', 'Vols de distance dans des environnements montagneux (Alpes, Andes).\r\n', 'AirConcess', '0,20 € / km', '150 € / mois', 50000, 1, 'Le SparrowHawk est un planeur léger, performant et moderne, conçu pour maximiser la glisse et les performances en compétition. Sa structure en fibre de carbone lui confère une légèreté exceptionnelle, facilitant le transport et l’assemblage. Il est idéal pour les pilotes cherchant un planeur rapide, agile et capable de voler de longues distances avec une grande efficacité. Avec son cockpit confortable et ses commandes précises, le SparrowHawk est un choix privilégié pour les amateurs de vol', NULL, NULL, NULL),
(27, 4, 'ZT-239', '2002', 1568, 'Monoplace avec cabine ergonomique et tableau de bord minimaliste, équipé d\'un train d’atterrissage rétractable, ailes en fibre de carbone, et commandes de vol précises pour maximiser la performance en vol.', '13 janvier 2025', 'Vols de distance dans des environnements montagneux (Alpes, Andes).\r\n', 'AirConcess', '0,20 € / km', '150 € / mois', 50000, 1, 'Le SparrowHawk est un planeur léger, performant et moderne, conçu pour maximiser la glisse et les performances en compétition. Sa structure en fibre de carbone lui confère une légèreté exceptionnelle, facilitant le transport et l’assemblage. Il est idéal pour les pilotes cherchant un planeur rapide, agile et capable de voler de longues distances avec une grande efficacité. Avec son cockpit confortable et ses commandes précises, le SparrowHawk est un choix privilégié pour les amateurs de vol', '2025-02-25 14:23:54', NULL, NULL),
(28, 13, 'WA-865', '2019', 155, 'Cabine ouverte, offrant une visibilité exceptionnelle pour les vols panoramiques.\r\nSièges en tandem (pilote à l’avant, passager à l’arrière) pour une expérience immersive en vol.\r\nOption flotteurs pour l’amphibie, permettant des décollages et atterrissages sur l’eau.', '14 janvier 2025', 'Exploration de paysages naturels', 'Airconcess', '0,35 €/km', '1 000 €', 160000, 1, 'L’AirCam est un avion biplan unique, conçu pour les vols d’exploration, les missions de photographie aérienne, et les aventures en plein air. Sa conception à double moteur offre une sécurité accrue et la capacité de continuer à voler même en cas de panne moteur. Avec son cockpit ouvert et sa maniabilité exceptionnelle, il est idéal pour explorer des zones reculées, des rivières, des lacs, ou des côtes.', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
CREATE TABLE IF NOT EXISTS `appointment` (
  `appt_id` int NOT NULL AUTO_INCREMENT,
  `aircraftConcerned_id` int NOT NULL,
  `userConcerned_id` int NOT NULL,
  `customer_firstName` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `customer_lastName` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `customer_phone` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `customer_email` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `customer_country` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `customer_city` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `customer_address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `customer_postalCode` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `customer_idCard_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `customer_incomeProof_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `appt_reason` enum('purchase','rent') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `appt_timestamp` datetime DEFAULT NULL,
  `appt_agency_id` int NOT NULL,
  PRIMARY KEY (`appt_id`),
  UNIQUE KEY `appt_timestamp` (`appt_timestamp`,`appt_agency_id`),
  KEY `fk_appt_agency_id` (`appt_agency_id`),
  KEY `fk_appt_aircraft_id` (`aircraftConcerned_id`),
  KEY `fk_appt_user_id` (`userConcerned_id`)
) ENGINE=InnoDB AUTO_INCREMENT=204 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `appointment`
--

INSERT INTO `appointment` (`appt_id`, `aircraftConcerned_id`, `userConcerned_id`, `customer_firstName`, `customer_lastName`, `customer_phone`, `customer_email`, `customer_country`, `customer_city`, `customer_address`, `customer_postalCode`, `customer_idCard_url`, `customer_incomeProof_url`, `appt_reason`, `appt_timestamp`, `appt_agency_id`) VALUES
(192, 18, 35, 'Mathéo', 'Flores', '+3666', 'matheoflores26@gmail.com', 'AF', 'Andkhoy', '141 rue Barthélémy de laffemas', NULL, NULL, NULL, 'purchase', '2025-02-08 10:45:00', 1),
(193, 18, 35, 'a', 'Flores', '+656', 'matheoflores26@gmail.com', 'DZ', 'Adrar', '141 rue Barthélémy de laffemas', '', NULL, NULL, 'purchase', '2025-02-08 10:30:00', 3),
(194, 18, 35, 'Mathéo', 'Flores', '+3666', 'matheoflores26@gmail.com', 'AF', 'Andkhoy', '141 rue Barthélémy de laffemas', NULL, NULL, NULL, 'purchase', '2025-02-08 10:30:00', 1),
(195, 18, 35, 'Mathéo', 'Flores', '+66', 'matheoflores26@gmail.com', 'AL', 'Bajram Curri', '141 rue Barthélémy de laffemas', NULL, NULL, NULL, 'purchase', '2025-02-08 10:15:00', 1),
(196, 18, 35, 'Mathéo', 'Flores', '+66', 'matheoflores26@gmail.com', 'AL', 'Bajram Curri', '141 rue Barthélémy de laffemas', NULL, NULL, NULL, 'purchase', '2025-02-08 14:15:00', 1),
(197, 18, 35, 'Mathéo', 'Flores', '+66', 'matheoflores26@gmail.com', 'AL', 'Bajram Curri', '141 rue Barthélémy de laffemas', NULL, NULL, NULL, 'purchase', '2025-02-08 08:30:00', 1),
(198, 18, 35, 'Mathéo', 'Flores', '+66', 'matheoflores26@gmail.com', 'AL', 'Bajram Curri', '141 rue Barthélémy de laffemas', NULL, NULL, NULL, 'purchase', '2025-02-08 09:45:00', 1),
(199, 18, 35, 'Mathéo', 'Flores', '+33', 'matheoflores26@gmail.com', 'AF', 'Andkhoy', '141 rue Barthélémy de laffemas', '', NULL, NULL, 'purchase', '2025-02-08 14:45:00', 1),
(200, 18, 35, 'Mathéo', 'Flores', '+633', 'matheoflores26@gmail.com', 'AF', 'Andkhoy', '141 rue Barthélémy de laffemas', '', NULL, NULL, 'purchase', '2025-02-22 12:45:00', 1),
(201, 18, 35, 'Mathéo', 'Flores', '+633', 'matheoflores26@gmail.com', 'AF', 'Andkhoy', '141 rue Barthélémy de laffemas', '', 'Capture d’écran (49).png', NULL, 'purchase', '2025-02-22 08:15:00', 1),
(202, 18, 35, 'Mathéo', 'Flores', '+33', 'matheoflores26@gmail.com', 'AF', 'Andkhoy', '141 rue Barthélémy de laffemas', '', 'Capture d’écran (52).png', 'Capture d\'écran 2024-09-18 190014.png', 'purchase', '2025-02-12 09:45:00', 6),
(203, 7, 35, 'Mathéo', 'Flores', '+33565', 'matheoflores26@gmail.com', 'AF', 'Andkhoy', '141 rue Barthélémy de laffemas', '26240', 'CV_01-2025.pdf', 'CV.pdf', 'purchase', '2025-02-21 10:45:00', 5);

-- --------------------------------------------------------

--
-- Structure de la table `estimate`
--

DROP TABLE IF EXISTS `estimate`;
CREATE TABLE IF NOT EXISTS `estimate` (
  `idEstimate` int NOT NULL AUTO_INCREMENT,
  `idClient` int DEFAULT NULL,
  `id_Aircraft` int DEFAULT NULL,
  `PaymentStatus` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`idEstimate`),
  KEY `id_Aircraft` (`id_Aircraft`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `image`
--

DROP TABLE IF EXISTS `image`;
CREATE TABLE IF NOT EXISTS `image` (
  `img_id` int NOT NULL AUTO_INCREMENT,
  `role` enum('icon','main','slider') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'slider',
  `aircraft_id` int NOT NULL,
  `img_URL` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`img_id`),
  KEY `id_Aircraft` (`aircraft_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `image`
--

INSERT INTO `image` (`img_id`, `role`, `aircraft_id`, `img_URL`) VALUES
(11, 'main', 7, '/assets/image.png'),
(12, 'slider', 7, '/assets/image1.jpg'),
(13, 'slider', 7, '/assets/image2.jpg'),
(14, 'icon', 7, '../assets/catalog/gulfstreamG650.svg'),
(16, 'icon', 15, '../assets/catalog/Sparrowhawk.png'),
(17, 'icon', 16, '../assets/catalog/Cessna.png'),
(18, 'icon', 17, '../assets/catalog/piaggio.png'),
(19, 'icon', 18, '../assets/catalog/Learjet.png'),
(20, 'icon', 19, '../assets/catalog/Pilatus.png'),
(21, 'icon', 20, '../assets/catalog/piper.png'),
(22, 'icon', 21, '../assets/catalog/diamond.png'),
(23, 'icon', 22, '../assets/catalog/tecnam.png'),
(24, 'icon', 23, '../assets/catalog/jonker.png'),
(25, 'icon', 24, '../assets/catalog/Aircam.png'),
(26, 'icon', 25, '../assets/catalog/piperSuper.png'),
(27, 'icon', 26, '../assets/catalog/Sparrowhawk.png'),
(28, 'icon', 27, '../assets/catalog/Sparrowhawk.png'),
(29, 'icon', 28, '../assets/catalog/piperSuper.png');

-- --------------------------------------------------------

--
-- Structure de la table `model`
--

DROP TABLE IF EXISTS `model`;
CREATE TABLE IF NOT EXISTS `model` (
  `model_id` int NOT NULL AUTO_INCREMENT,
  `model_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `range_type` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `manufacturer` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `passenger_capacity` int DEFAULT NULL,
  `engines` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `speed_avg` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `max_range` int DEFAULT NULL,
  `max_altitude` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `crew_size` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `length` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `wingspan` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `height` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `max_takeoff_weight` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`model_id`),
  UNIQUE KEY `model_name` (`model_name`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `model`
--

INSERT INTO `model` (`model_id`, `model_name`, `range_type`, `manufacturer`, `passenger_capacity`, `engines`, `speed_avg`, `max_range`, `max_altitude`, `crew_size`, `length`, `wingspan`, `height`, `max_takeoff_weight`) VALUES
(2, 'Gulfstream G650ER', 'International', 'Gulfstream Aerospace', 19, 'Rolls-Royce BR725 A1-12 (x2)', '± 904 km/h', 13890, '15 545 mètres', '2 pilotes', '30,41m', '30,36m', '7,82m', '47000kg'),
(4, 'SparrowHawk', 'Local', 'Windward Performance', 1, 'Aucun (planeur pur, sans moteur)', ' 80-100 km/h ', 100, '3 048 mètres', '1 pilote', '5,74 m', '13,1 m', 'Environ 1,5 m ', '227 kg'),
(5, 'Cessna 172 Skyhawk', 'Regional', 'Textron Aviation', 4, '1 moteur à piston Lycoming IO-360-L2A', '226 km/h', 1287, '4 115 mètres', '1 pilote', '8,28 m', '11 m', '2,72 m', '1 111 kg'),
(6, 'Piaggio Avanti EVO', 'International', 'Piaggio Aerospace', 9, '2 turbopropulseurs Pratt & Whitney PT6A-66B', '745 km/h', 2800, '12 500 mètres', '2 pilotes', '14,41 m', '14,04 m', '3,98 m', '5 489 kg'),
(7, 'Learjet 75 Liberty', 'International', 'Bombardier Aerospace', 9, '2 turboréacteurs Honeywell TFE731-40BR', '860 km/h', 3778, '15 545 m', '2 pilotes', '17,68 m', '14,56 m', '4,31 m\r\n', '9 752 kg'),
(8, 'Pilatus PC-24', 'International', 'Pilatus Aircraft', 8, '2 turboréacteurs Williams FJ44-4A-QPM', '815 km/h', 3610, '13 716 mètres', '2 pilotes', '16,85 m', '17 m', '5,35 m', '8 005 kg'),
(9, 'Piper PA-28 Cherokee', 'Regional', 'Piper Aircraft', 4, '1 moteur à pistons Lycoming O-360', '200 km/h', 1148, '3 962 mètres', '1 pilote', '7,3 m', '10,7 m', '2,2 m', '1 157 kg'),
(10, 'Diamond DA40', 'Regional', 'Diamond Aircraft ', 4, '1 moteur à pistons Lycoming IO-360-M1A ou Austro Engine AE300', '285 km/h', 1700, '5 000 mètres', '1 pilote', '8,06 m', '11,94 m', '1,97 m', '1 280 kg'),
(11, 'Tecnam P2010', 'Regional', 'Tecnam', 4, 'Lycoming IO-390-C3B6', ' 230 km/h', 1300, '4 267 mètres', '1 pilote', '8,08 m', '10,60 m', '2,74 m', '1 160 kg'),
(12, 'Jonker JS1 Revelatio', 'Local', 'Jonker Sailplanes', 1, 'Non motorisé ', '130 km/h', 1500, '5 500 mètres', '1 pilote', '6,84 m', '18 ou 21 m', '1,45 m', '600 kg'),
(13, 'Aircam Amphibian', 'Local', 'Lockwood Aircraft Corp.', 2, '2 moteurs Rotax 912 ULS (100 ch chacun) ou Rotax 914', '190 km/h', 800, '3 048 mètres', '1 pilote', '7,16 m', '11,58 m', '2,8 m', '816 kg'),
(14, 'Piper Super Cub PA-1', 'Local', 'Piper Aircraft', 2, '1 moteur Lycoming O-320 (150 ch)', '180 km/h', 740, '5 800 mètres', '1 pilote', '6,88 m', '10,74 m', '2,03 m', '794 kg');

-- --------------------------------------------------------

--
-- Structure de la table `pilot`
--

DROP TABLE IF EXISTS `pilot`;
CREATE TABLE IF NOT EXISTS `pilot` (
  `idPilot` int NOT NULL AUTO_INCREMENT,
  `lastName` text,
  `firstName` text,
  `salary` tinyint(1) DEFAULT NULL,
  `isAvailable` tinyint(1) DEFAULT NULL,
  `profilePictureURL` text,
  PRIMARY KEY (`idPilot`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `technicalsheet`
--

DROP TABLE IF EXISTS `technicalsheet`;
CREATE TABLE IF NOT EXISTS `technicalsheet` (
  `idTechnicalSheet` int NOT NULL AUTO_INCREMENT,
  `sheetURL` text,
  PRIMARY KEY (`idTechnicalSheet`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `test`
--

DROP TABLE IF EXISTS `test`;
CREATE TABLE IF NOT EXISTS `test` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `test`
--

INSERT INTO `test` (`id`, `content`) VALUES
(1, 'Florian est fort'),
(2, 'Florian est fort'),
(3, 'aaaa'),
(4, 'aaaa'),
(5, 'aaaa'),
(6, 'aaaa'),
(7, 'aaaa');

-- --------------------------------------------------------

--
-- Structure de la table `testimonial`
--

DROP TABLE IF EXISTS `testimonial`;
CREATE TABLE IF NOT EXISTS `testimonial` (
  `id_test` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id_test`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `testimonial`
--

INSERT INTO `testimonial` (`id_test`, `id_user`, `content`) VALUES
(1, 24, 'Air Concess m’a aidé à réaliser mes rêves d’aviation. La fiche technique de l’avion fournissait des informations détaillées sur chaque appareil et l’équipe du service client était toujours là pour répondre à mes questions.'),
(2, 32, 'Air Concess m’a permis de concrétiser mes ambitions dans le monde de l’aviation. Grâce à la fiche technique exhaustive des avions, j\'ai pu comparer les modèles en détail. L\'équipe du service client, toujours disponible et à l\'écoute, m’a guidé à chaque étape de mon projet et a répondu à toutes mes interrogations.');

-- --------------------------------------------------------

--
-- Structure de la table `trainer`
--

DROP TABLE IF EXISTS `trainer`;
CREATE TABLE IF NOT EXISTS `trainer` (
  `id_trainer` int NOT NULL,
  `country_assignment` text NOT NULL,
  `city_assignment` text NOT NULL,
  `address_assignment` text NOT NULL,
  PRIMARY KEY (`id_trainer`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `training`
--

DROP TABLE IF EXISTS `training`;
CREATE TABLE IF NOT EXISTS `training` (
  `id_training` int NOT NULL AUTO_INCREMENT,
  `id_final_proposal` int DEFAULT NULL,
  PRIMARY KEY (`id_training`),
  KEY `fk_training_id_final_proposal` (`id_final_proposal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `training_proposal`
--

DROP TABLE IF EXISTS `training_proposal`;
CREATE TABLE IF NOT EXISTS `training_proposal` (
  `id_proposal` int NOT NULL,
  `id_concerned_training` int NOT NULL,
  PRIMARY KEY (`id_proposal`),
  KEY `fk_training_proposal_id_concerned_training` (`id_concerned_training`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `password` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `firstName` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `lastName` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `location` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `profilePictureURL` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `isVerified` tinyint(1) DEFAULT NULL,
  `isTrainer` tinyint(1) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  `inscriptionDate` date DEFAULT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`idUser`, `password`, `firstName`, `lastName`, `email`, `location`, `profilePictureURL`, `isVerified`, `isTrainer`, `isAdmin`, `inscriptionDate`) VALUES
(24, '$2y$10$NfmvVPDHlL02bgv80ogSLe2xYnabfZ2hpLJqfsiDWpcR6tWjoahH.', 'florian', 'FILLOUX', 'fillouxflorian56@gmail.com', 'Saint-Etienne, France', '/assets/profile/Jack-Sparrow.png', 1, 0, 0, '2024-10-21'),
(32, '$2y$10$M7RME7KjVB9djW3R2wLiaeVMYLBlic9LNytXuvyuiqyP8vccNuxe6', 'Emric', 'Pirrera', 'pemricn2@gmail.com', 'Saint-Chamond, France', '/assets/profile/bgFigma.png', 1, 0, 1, '2025-01-03'),
(35, '$2y$10$dE1rvUQ9IOiVMBSC1P/mBeWk.XLYG7LdJbMm0/CDtJo7WQRd8E0Vu', 'matheo', 'Flores', 'matheoflores26@gmail.com', NULL, NULL, 1, 0, 0, '2025-01-24');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `aircraft`
--
ALTER TABLE `aircraft`
  ADD CONSTRAINT `fk_aircraft_model_id` FOREIGN KEY (`model_id`) REFERENCES `model` (`model_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `appointment`
--
ALTER TABLE `appointment`
  ADD CONSTRAINT `fk_appt_agency_id` FOREIGN KEY (`appt_agency_id`) REFERENCES `agency` (`agency_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_appt_aircraft_id` FOREIGN KEY (`aircraftConcerned_id`) REFERENCES `aircraft` (`aircraft_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_appt_user_id` FOREIGN KEY (`userConcerned_id`) REFERENCES `user` (`idUser`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `estimate`
--
ALTER TABLE `estimate`
  ADD CONSTRAINT `estimate_ibfk_1` FOREIGN KEY (`id_Aircraft`) REFERENCES `aircraft` (`aircraft_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `fk_aircraft_id_img` FOREIGN KEY (`aircraft_id`) REFERENCES `aircraft` (`aircraft_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `trainer`
--
ALTER TABLE `trainer`
  ADD CONSTRAINT `fk_trainer_id` FOREIGN KEY (`id_trainer`) REFERENCES `user` (`idUser`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `training`
--
ALTER TABLE `training`
  ADD CONSTRAINT `fk_training_id_final_proposal` FOREIGN KEY (`id_final_proposal`) REFERENCES `training_proposal` (`id_proposal`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Contraintes pour la table `training_proposal`
--
ALTER TABLE `training_proposal`
  ADD CONSTRAINT `fk_training_proposal_id_concerned_training` FOREIGN KEY (`id_concerned_training`) REFERENCES `training` (`id_training`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
