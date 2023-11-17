-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 22 mai 2023 à 00:04
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `relax`
--

-- --------------------------------------------------------

--
-- Structure de la table `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `firstname` varchar(45) NOT NULL,
  `gender` enum('Male','Female','Unknown') NOT NULL,
  `mail` varchar(320) NOT NULL,
  `password` varchar(64) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `creation_date` datetime DEFAULT current_timestamp(),
  `id_address` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `account`
--

INSERT INTO `account` (`id`, `lastname`, `firstname`, `gender`, `mail`, `password`, `phone`, `birth_date`, `creation_date`, `id_address`) VALUES
(2, 'Price', 'John', 'Male', 'price.john@gmail.com', 'pricejohn', '0689458875', '1975-03-05', '2023-02-16 16:26:36', 6),
(3, 'Ross', 'Bob', 'Male', 'ross.bob@gmail.com', 'rossbob', '0653428579', '1962-08-21', '2023-03-08 08:27:13', 7),
(7, 'Wick', 'John', 'Male', 'wick.john@gmail.com', 'wickjohn', '0645897845', '1964-09-02', '2023-05-08 17:53:39', 5);

-- --------------------------------------------------------

--
-- Structure de la table `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `number` int(5) NOT NULL,
  `street` varchar(45) NOT NULL,
  `zip_code` int(6) NOT NULL,
  `city` varchar(45) NOT NULL,
  `country` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `address`
--

INSERT INTO `address` (`id`, `number`, `street`, `zip_code`, `city`, `country`) VALUES
(1, 10, 'Rue Pasteur', 74000, 'Annecy', 'France'),
(2, 15, 'Avenue de la République', 74000, 'Annecy', 'France'),
(3, 12, 'Rue Victor Hugo', 73000, 'Chambéry', 'France'),
(4, 20, 'Rue du Général de Gaulle', 73000, 'Chambéry', 'France'),
(5, 30, 'Boulevard Gambetta', 73000, 'Chambéry', 'France'),
(6, 10, 'Rue des Mazures', 74000, 'Annecy', 'France'),
(7, 2, 'Rue Maréchal Foch', 74000, 'Annecy', 'France');

-- --------------------------------------------------------

--
-- Structure de la table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `firstname` varchar(45) NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `mail` varchar(320) NOT NULL,
  `login` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `birth_date` date NOT NULL,
  `id_service` int(11) NOT NULL,
  `id_address` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `employee`
--

INSERT INTO `employee` (`id`, `lastname`, `firstname`, `gender`, `mail`, `login`, `password`, `phone`, `birth_date`, `id_service`, `id_address`) VALUES
(1, 'Doe', 'John', 'Male', 'doe.john@gmail.com', 'doejohn', 'doejohn', '0642837945', '1980-05-21', 1, 1),
(2, 'Dupont', 'Marc', 'Male', 'dupont.marc@gmail.com', 'dupontmarc', 'dupontmarc', '0645827342', '1985-02-13', 1, 2),
(3, 'Delauw', 'Valentin', 'Male', 'delauw.valentin@gmail.com', 'delauwvalentin', 'delauwvalentin', '0645827542', '2001-06-27', 1, 3),
(4, 'Rousseau', 'Claire', 'Female', 'rousseau.claire@gmail.com', 'rousseauclaire', 'rousseauclaire', '0613428573', '1995-07-12', 2, 4),
(5, 'Daniels', 'Jack', 'Male', 'daniels.jack@gmail.com', 'danielsjack', 'danielsjack', '0689534215', '1976-09-25', 2, 5),
(6, 'A_Nom', 'A_Prenom', 'Male', 'admin@admin.com', 'admin', 'admin', '0606060606', '1980-09-25', 2, 5);

-- --------------------------------------------------------

--
-- Structure de la table `holiday`
--

CREATE TABLE `holiday` (
  `id` int(11) NOT NULL,
  `message` varchar(1000) DEFAULT NULL,
  `time_start` datetime NOT NULL,
  `time_end` datetime NOT NULL,
  `status` enum('Approved','Denied','Pending') NOT NULL,
  `answer` varchar(1000) DEFAULT NULL,
  `creation_date` datetime NOT NULL DEFAULT current_timestamp(),
  `last_modif` datetime NOT NULL DEFAULT current_timestamp(),
  `id_last_modif` int(11) DEFAULT NULL,
  `id_employee` int(11) NOT NULL,
  `id_admin` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `holiday`
--

INSERT INTO `holiday` (`id`, `message`, `time_start`, `time_end`, `status`, `answer`, `creation_date`, `last_modif`, `id_last_modif`, `id_employee`, `id_admin`) VALUES
(21, 'Jour de repos', '2023-05-23 00:00:00', '2023-05-24 00:00:00', 'Approved', 'Accepté', '2023-05-18 12:38:01', '2023-05-19 09:20:08', 3, 1, 3),
(22, 'Déménagement', '2023-05-25 00:00:00', '2023-05-26 00:00:00', 'Approved', 'Accepté', '2023-05-22 06:25:35', '2023-05-30 08:22:41', 3, 4, 3),
(23, 'Rendez-vous médical', '2023-05-27 00:00:00', '2023-05-28 00:00:00', 'Pending', NULL, '2023-05-22 14:50:21', '2023-05-27 00:00:00', NULL, 3, 1);

-- --------------------------------------------------------

--
-- Structure de la table `intervention`
--

CREATE TABLE `intervention` (
  `id` int(11) NOT NULL,
  `id_ticket` int(11) NOT NULL,
  `id_employee` int(11) NOT NULL,
  `time_start` datetime NOT NULL,
  `time_end` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `intervention`
--

INSERT INTO `intervention` (`id`, `id_ticket`, `id_employee`, `time_start`, `time_end`) VALUES
(7, 13, 5, '2023-05-23 05:00:00', '2023-05-23 06:00:00'),
(8, 15, 4, '2023-05-23 08:00:00', '2023-05-23 09:00:00'),
(9, 14, 4, '2023-05-22 15:00:00', '2023-05-22 16:00:00'),
(10, 16, 5, '2023-05-22 21:00:00', '2023-05-22 22:00:00');

-- --------------------------------------------------------

--
-- Structure de la table `period`
--

CREATE TABLE `period` (
  `id` int(11) NOT NULL,
  `type` enum('Working','Holiday','Meeting') NOT NULL,
  `time_start` datetime DEFAULT NULL,
  `time_end` datetime DEFAULT NULL,
  `id_employee` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `period`
--

INSERT INTO `period` (`id`, `type`, `time_start`, `time_end`, `id_employee`) VALUES
(2, 'Working', '2023-05-23 18:00:00', '2023-05-24 06:00:00', 5),
(3, 'Working', '2023-05-24 18:00:00', '2023-05-25 06:00:00', 5),
(4, 'Working', '2023-05-25 18:00:00', '2023-05-26 06:00:00', 5),
(5, 'Working', '2023-05-26 18:00:00', '2023-05-27 06:00:00', 5),
(6, 'Working', '2023-05-27 18:00:00', '2023-05-28 06:00:00', 5),
(7, 'Working', '2023-05-28 18:00:00', '2023-05-29 06:00:00', 5),
(8, 'Working', '2023-05-24 18:00:00', '2023-05-25 06:00:00', 3),
(9, 'Working', '2023-05-25 18:00:00', '2023-05-26 06:00:00', 3),
(10, 'Working', '2023-05-24 06:00:00', '2023-05-24 18:00:00', 1),
(12, 'Working', '2023-05-27 18:00:00', '2023-05-28 06:00:00', 3),
(13, 'Working', '2023-05-28 18:00:00', '2023-05-29 06:00:00', 3),
(14, 'Working', '2023-05-25 06:00:00', '2023-05-25 18:00:00', 2),
(15, 'Working', '2023-05-28 06:00:00', '2023-05-28 18:00:00', 2),
(16, 'Working', '2023-05-26 06:00:00', '2023-05-26 18:00:00', 1),
(17, 'Working', '2023-05-28 06:00:00', '2023-05-28 18:00:00', 1),
(58, 'Holiday', '2023-05-23 00:00:00', '2023-05-24 00:00:00', 1),
(74, 'Working', '2023-05-22 06:00:00', '2023-05-22 18:00:00', 2),
(75, 'Working', '2023-05-22 18:00:00', '2023-05-23 06:00:00', 3),
(76, 'Working', '2023-05-21 18:00:00', '2023-05-22 06:00:00', 3),
(77, 'Working', '2023-05-22 06:00:00', '2023-05-22 18:00:00', 4),
(78, 'Working', '2023-05-22 06:00:00', '2023-05-22 18:00:00', 6),
(79, 'Working', '2023-05-21 18:00:00', '2023-05-22 06:00:00', 5),
(80, 'Working', '2023-05-23 06:00:00', '2023-05-23 18:00:00', 4),
(81, 'Working', '2023-05-23 06:00:00', '2023-05-23 18:00:00', 6),
(82, 'Working', '2023-05-24 06:00:00', '2023-05-24 18:00:00', 4),
(83, 'Working', '2023-05-25 06:00:00', '2023-05-25 18:00:00', 6),
(85, 'Working', '2023-05-26 06:00:00', '2023-05-26 18:00:00', 6),
(86, 'Working', '2023-05-26 06:00:00', '2023-05-26 12:00:00', 4),
(87, 'Working', '2023-05-26 13:30:00', '2023-05-26 18:00:00', 4),
(88, 'Working', '2023-05-27 06:00:00', '2023-05-27 18:00:00', 1),
(89, 'Working', '2023-05-27 06:00:00', '2023-05-27 18:00:00', 4),
(90, 'Working', '2023-05-27 06:00:00', '2023-05-27 18:00:00', 6),
(91, 'Working', '2023-05-28 06:00:00', '2023-05-28 18:00:00', 4),
(92, 'Working', '2023-05-28 06:00:00', '2023-05-28 18:00:00', 6),
(93, 'Working', '2023-05-22 18:00:00', '2023-05-23 06:00:00', 5),
(94, 'Working', '2023-05-23 18:00:00', '2023-05-24 06:00:00', 3),
(95, 'Working', '2023-05-26 18:00:00', '2023-05-27 06:00:00', 2),
(96, 'Working', '2023-05-24 06:00:00', '2023-05-24 18:00:00', 2),
(100, 'Meeting', '2023-05-22 06:00:00', '2023-05-22 07:00:00', 2),
(101, 'Meeting', '2023-05-22 06:00:00', '2023-05-22 07:00:00', 4),
(102, 'Meeting', '2023-05-22 06:00:00', '2023-05-22 07:00:00', 6),
(103, 'Meeting', '2023-05-22 18:00:00', '2023-05-22 19:00:00', 3),
(104, 'Meeting', '2023-05-22 18:00:00', '2023-05-22 19:00:00', 5),
(105, 'Meeting', '2023-05-28 06:00:00', '2023-05-28 07:00:00', 1),
(106, 'Meeting', '2023-05-28 06:00:00', '2023-05-28 07:00:00', 2),
(107, 'Meeting', '2023-05-28 06:00:00', '2023-05-28 07:00:00', 4),
(108, 'Meeting', '2023-05-28 06:00:00', '2023-05-28 07:00:00', 6),
(109, 'Meeting', '2023-05-28 18:00:00', '2023-05-28 19:00:00', 3),
(110, 'Meeting', '2023-05-28 18:00:00', '2023-05-28 19:00:00', 5),
(111, 'Meeting', '2023-05-25 18:00:00', '2023-05-25 19:00:00', 3),
(112, 'Meeting', '2023-05-25 18:00:00', '2023-05-25 19:00:00', 5),
(113, 'Meeting', '2023-05-25 06:00:00', '2023-05-25 07:00:00', 2),
(114, 'Meeting', '2023-05-25 06:00:00', '2023-05-25 07:00:00', 6),
(115, 'Holiday', '2023-05-25 00:00:00', '2023-05-26 00:00:00', 4);

-- --------------------------------------------------------

--
-- Structure de la table `reservation`
--

CREATE TABLE `reservation` (
  `id` int(11) NOT NULL,
  `time_start` datetime NOT NULL,
  `time_end` datetime NOT NULL,
  `nbr_adult` int(3) NOT NULL,
  `nbr_child` int(3) NOT NULL,
  `creation_date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` enum('Approved','Denied','Pending') NOT NULL,
  `id_room` int(11) NOT NULL,
  `id_account` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `reservation`
--

INSERT INTO `reservation` (`id`, `time_start`, `time_end`, `nbr_adult`, `nbr_child`, `creation_date`, `status`, `id_room`, `id_account`) VALUES
(58, '2023-05-22 17:00:00', '2023-05-24 10:00:00', 2, 1, '2023-05-21 23:55:39', 'Approved', 3, 7),
(59, '2023-05-23 17:00:00', '2023-05-25 10:00:00', 2, 0, '2023-05-21 23:56:27', 'Approved', 2, 3),
(60, '2023-05-25 17:00:00', '2023-05-28 10:00:00', 1, 0, '2023-05-21 23:57:27', 'Pending', 1, 2),
(61, '2023-05-22 17:00:00', '2023-05-24 10:00:00', 1, 1, '2023-05-21 23:58:04', 'Approved', 1, 2);

-- --------------------------------------------------------

--
-- Structure de la table `room`
--

CREATE TABLE `room` (
  `id` int(11) NOT NULL,
  `floor` int(3) DEFAULT NULL,
  `number` varchar(45) DEFAULT NULL,
  `capacity` int(3) DEFAULT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `room`
--

INSERT INTO `room` (`id`, `floor`, `number`, `capacity`, `price`) VALUES
(1, 0, '07', 2, 45),
(2, 1, '13', 2, 55),
(3, 1, '09', 4, 80),
(4, 2, '10', 3, 70);

-- --------------------------------------------------------

--
-- Structure de la table `service`
--

CREATE TABLE `service` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Déchargement des données de la table `service`
--

INSERT INTO `service` (`id`, `name`) VALUES
(1, 'Gouvernance'),
(2, 'Conciergerie');

-- --------------------------------------------------------

--
-- Structure de la table `ticket`
--

CREATE TABLE `ticket` (
  `id` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `status` enum('Completed','In Progress','Pending','Canceled') NOT NULL,
  `id_room` int(11) DEFAULT NULL,
  `id_creator` int(11) NOT NULL,
  `creation_date` datetime NOT NULL DEFAULT current_timestamp(),
  `last_modif` datetime NOT NULL DEFAULT current_timestamp(),
  `id_last_modif` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `ticket`
--

INSERT INTO `ticket` (`id`, `description`, `status`, `id_room`, `id_creator`, `creation_date`, `last_modif`, `id_last_modif`) VALUES
(12, 'Problème de plomberie au niveau du lavabo', 'Canceled', 1, 2, '2023-05-22 08:00:47', '2023-05-22 08:20:17', 2),
(13, 'Fuite d\'eau dans la salle de bain', 'In Progress', 1, 2, '2023-05-23 07:37:30', '2023-05-23 08:05:05', 3),
(14, 'Sol sale', 'Completed', 4, 2, '2023-05-22 14:50:26', '2023-05-22 16:25:59', 2),
(15, 'Climatisation cassée', 'In Progress', 2, 2, '2023-05-23 07:15:15', '2023-05-23 07:50:24', 2),
(16, 'Télévision qui ne s\'allume pas', 'Completed', 3, 2, '2023-05-22 20:52:50', '2023-05-22 22:12:24', 2);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mail` (`mail`),
  ADD KEY `fk_account_address` (`id_address`);

--
-- Index pour la table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login` (`login`),
  ADD KEY `fk_employee_address` (`id_address`),
  ADD KEY `id_service` (`id_service`);

--
-- Index pour la table `holiday`
--
ALTER TABLE `holiday`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_last_modif` (`id_last_modif`,`id_employee`,`id_admin`),
  ADD KEY `id_employee` (`id_employee`),
  ADD KEY `id_admin` (`id_admin`);

--
-- Index pour la table `intervention`
--
ALTER TABLE `intervention`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_ticket` (`id_ticket`,`id_employee`),
  ADD KEY `id_employee` (`id_employee`);

--
-- Index pour la table `period`
--
ALTER TABLE `period`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_period_employee` (`id_employee`);

--
-- Index pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_reservation_room` (`id_room`),
  ADD KEY `fk_reservation_account` (`id_account`);

--
-- Index pour la table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_room` (`id_room`,`id_creator`,`id_last_modif`),
  ADD KEY `id_creator` (`id_creator`),
  ADD KEY `id_last_modif` (`id_last_modif`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `address`
--
ALTER TABLE `address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `holiday`
--
ALTER TABLE `holiday`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `intervention`
--
ALTER TABLE `intervention`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `period`
--
ALTER TABLE `period`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- AUTO_INCREMENT pour la table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT pour la table `room`
--
ALTER TABLE `room`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `service`
--
ALTER TABLE `service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `ticket`
--
ALTER TABLE `ticket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `fk_account_address` FOREIGN KEY (`id_address`) REFERENCES `address` (`id`);

--
-- Contraintes pour la table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`id_service`) REFERENCES `service` (`id`),
  ADD CONSTRAINT `fk_employee_address` FOREIGN KEY (`id_address`) REFERENCES `address` (`id`);

--
-- Contraintes pour la table `holiday`
--
ALTER TABLE `holiday`
  ADD CONSTRAINT `holiday_ibfk_1` FOREIGN KEY (`id_last_modif`) REFERENCES `employee` (`id`),
  ADD CONSTRAINT `holiday_ibfk_2` FOREIGN KEY (`id_employee`) REFERENCES `employee` (`id`),
  ADD CONSTRAINT `holiday_ibfk_3` FOREIGN KEY (`id_admin`) REFERENCES `employee` (`id`);

--
-- Contraintes pour la table `intervention`
--
ALTER TABLE `intervention`
  ADD CONSTRAINT `intervention_ibfk_1` FOREIGN KEY (`id_ticket`) REFERENCES `ticket` (`id`),
  ADD CONSTRAINT `intervention_ibfk_2` FOREIGN KEY (`id_employee`) REFERENCES `employee` (`id`);

--
-- Contraintes pour la table `period`
--
ALTER TABLE `period`
  ADD CONSTRAINT `fk_period_employee` FOREIGN KEY (`id_employee`) REFERENCES `employee` (`id`);

--
-- Contraintes pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `fk_reservation_account` FOREIGN KEY (`id_account`) REFERENCES `account` (`id`),
  ADD CONSTRAINT `fk_reservation_room` FOREIGN KEY (`id_room`) REFERENCES `room` (`id`);

--
-- Contraintes pour la table `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`id_creator`) REFERENCES `employee` (`id`),
  ADD CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`id_room`) REFERENCES `room` (`id`),
  ADD CONSTRAINT `ticket_ibfk_3` FOREIGN KEY (`id_last_modif`) REFERENCES `employee` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
