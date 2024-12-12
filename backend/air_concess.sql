-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 10 déc. 2024 à 16:39
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
-- Structure de la table `aircraft`
--

DROP TABLE IF EXISTS `aircraft`;
CREATE TABLE IF NOT EXISTS `aircraft` (
  `aircraft_id` int NOT NULL AUTO_INCREMENT,
  `model_id` int NOT NULL,
  `serial_number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `manufacture_year` year DEFAULT NULL,
  `flight_hours` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `configuration` text,
  `recent_maintenance` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `typical_routes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `owner` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `cost_per_km` text,
  `monthly_maintenance_cost` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `estimated_price` text,
  `isAvailable` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`aircraft_id`),
  UNIQUE KEY `serial_number` (`serial_number`),
  KEY `fk_aircraft_model_id` (`model_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `aircraft`
--

INSERT INTO `aircraft` (`aircraft_id`, `model_id`, `serial_number`, `manufacture_year`, `flight_hours`, `configuration`, `recent_maintenance`, `typical_routes`, `owner`, `cost_per_km`, `monthly_maintenance_cost`, `estimated_price`, `isAvailable`) VALUES
(7, 2, 'SN 6205', '2020', '3 500 heures', '14 sièges / 3 zones distinctes (salon, salle de conférence, chambre privée)', 'Révision complète effectuée à 3 000 heures de vol', 'New York - Dubaï / Londres - Tokyo', 'Grande entreprise multinationale (fictif)', 'X €', 'X €', '66.000.000 $', 1);

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
  `appt_agency` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`appt_id`),
  UNIQUE KEY `appointmentTimestamp` (`appt_timestamp`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `appointment`
--

INSERT INTO `appointment` (`appt_id`, `aircraftConcerned_id`, `userConcerned_id`, `customer_firstName`, `customer_lastName`, `customer_phone`, `customer_email`, `customer_country`, `customer_city`, `customer_address`, `customer_postalCode`, `customer_idCard_url`, `customer_incomeProof_url`, `appt_reason`, `appt_timestamp`, `appt_agency`) VALUES
(54, 0, 0, 'Mathéo', 'Flores', '+33644038323', 'matheoflores26@gmail.com', 'FR', 'Beausemblant', '141 rue Barthélémy de laffemas', '26240', 'Array', 'Array', 'purchase', '2024-12-11 09:45:00', 'A2'),
(58, 0, 0, 'aaaaa', 'z', '+6', 'matheoflores26@gmail.com', 'AF', 'Andkhoy', '141 rue Barthélémy de laffemas', '4', 'Array', 'Array', 'purchase', '2024-12-18 11:00:00', 'A1'),
(59, 0, 0, 'aaaaa', 'z', '+6', 'matheoflores26@gmail.com', 'AF', 'Andkhoy', '141 rue Barthélémy de laffemas', '4', 'Array', 'Array', 'purchase', '2024-12-18 11:30:00', 'A1');

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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `image`
--

INSERT INTO `image` (`img_id`, `role`, `aircraft_id`, `img_URL`) VALUES
(11, 'main', 7, '/assets/image.png'),
(12, 'slider', 7, '/assets/image1.jpg'),
(13, 'slider', 7, '/assets/image2.jpg');

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
  `passenger_capacity` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `engines` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `speed_avg` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `max_range` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `max_altitude` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `crew_size` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `length` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `wingspan` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `height` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `max_takeoff_weight` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`model_id`),
  UNIQUE KEY `model_name` (`model_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `model`
--

INSERT INTO `model` (`model_id`, `model_name`, `range_type`, `manufacturer`, `passenger_capacity`, `engines`, `speed_avg`, `max_range`, `max_altitude`, `crew_size`, `length`, `wingspan`, `height`, `max_takeoff_weight`) VALUES
(2, 'Gulfstream G650ER', 'Internationale', 'Gulfstream Aerospace', 'Jusqu\'à 19 passagers', 'Rolls-Royce BR725 A1-12 (x2)', '± 904 km/h', '13 890 km avec 8 passagers', '15 545 mètres', '2 pilotes', '30,41 m', '30,36 m', '7,82 m', '47 000 kg');

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
-- Structure de la table `training`
--

DROP TABLE IF EXISTS `training`;
CREATE TABLE IF NOT EXISTS `training` (
  `idTraining` int NOT NULL AUTO_INCREMENT,
  `price` decimal(10,2) DEFAULT NULL,
  `trainingType` text,
  `cardIdentity` text,
  PRIMARY KEY (`idTraining`)
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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`idUser`, `password`, `firstName`, `lastName`, `email`, `location`, `profilePictureURL`, `isVerified`, `isTrainer`, `isAdmin`, `inscriptionDate`) VALUES
(24, '$2y$10$NfmvVPDHlL02bgv80ogSLe2xYnabfZ2hpLJqfsiDWpcR6tWjoahH.', 'florian', 'FILLOUX', 'fillouxflorian56@gmail.com', NULL, NULL, 1, 0, 0, '2024-10-21'),
(25, '$2y$10$zucMXl1CCH.kK3Grmljma.m9Sb3y3LBrt7i1VnO86WO8yInEesqJu', 'Mathéo', 'Flores', 'matheoflores26@gmail.com', NULL, NULL, 1, 0, 0, '2024-12-01');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `aircraft`
--
ALTER TABLE `aircraft`
  ADD CONSTRAINT `fk_aircraft_model_id` FOREIGN KEY (`model_id`) REFERENCES `model` (`model_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
