-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 11, 2024 at 08:49 PM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `plateforme_scolaire`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `prenom` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `login` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `mot_de_passe` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `nom`, `prenom`, `login`, `mot_de_passe`) VALUES
(1, 'Med', 'med', 'admin', '$2y$10$Sk3GQt3C2o6KIXeJBl6.CuYF0XJb9BZc/I9r1kXTAL.49O3kjRNCW');

-- --------------------------------------------------------

--
-- Table structure for table `chat_logs`
--

DROP TABLE IF EXISTS `chat_logs`;
CREATE TABLE IF NOT EXISTS `chat_logs` (
  `sender_id` int NOT NULL,
  `recipient_id` int NOT NULL,
  `time_stamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `msg` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `chat_logs`
--

INSERT INTO `chat_logs` (`sender_id`, `recipient_id`, `time_stamp`, `msg`) VALUES
(37, 20, '2024-05-11 09:15:32', 'Hey, are you available to discuss the project?'),
(20, 37, '2024-05-11 09:16:45', 'Yes, I just finished my part. Let\'s discuss it.'),
(37, 20, '2024-05-11 09:18:09', 'Great! Did you encounter any issues with the last module?'),
(20, 37, '2024-05-11 09:19:33', 'No, it all went smoothly. How about on your end?'),
(37, 20, '2024-05-11 09:20:21', 'I had some challenges, but I managed to solve them.'),
(37, 20, '2024-05-11 12:32:58', 'test'),
(37, 20, '2024-05-11 12:42:10', 'test tt'),
(37, 0, '2024-05-11 12:42:53', 'ttrrr'),
(20, 37, '2024-05-11 14:19:27', 'test'),
(20, 40, '2024-05-11 14:19:27', 'test'),
(20, 38, '2024-05-11 14:19:28', 'test'),
(20, 37, '2024-05-11 14:19:43', 'test'),
(20, 40, '2024-05-11 14:19:43', 'test'),
(20, 38, '2024-05-11 14:19:43', 'test'),
(20, 37, '2024-05-11 14:20:11', 'anonce'),
(20, 40, '2024-05-11 14:20:11', 'anonce'),
(20, 38, '2024-05-11 14:20:11', 'anonce'),
(20, 38, '2024-05-11 14:23:17', 'yyy'),
(20, 39, '2024-05-11 14:23:17', 'yyy'),
(20, 40, '2024-05-11 14:23:17', 'yyy'),
(20, 37, '2024-05-11 19:01:55', 'psfka dadfadf'),
(20, 37, '2024-05-11 19:03:15', 'yrrrtwefd s vs'),
(20, 37, '2024-05-11 19:03:52', 'ad aegs addfd'),
(37, 20, '2024-05-11 19:05:48', 'fd'),
(37, 20, '2024-05-11 19:05:52', 'ggegdv'),
(37, 21, '2024-05-11 19:06:01', 'ggegdv'),
(20, 37, '2024-05-11 19:07:18', 'TEST ANNONCE JS'),
(20, 40, '2024-05-11 19:07:18', 'TEST ANNONCE JS'),
(20, 38, '2024-05-11 19:07:18', 'TEST ANNONCE JS'),
(20, 37, '2024-05-11 19:07:27', 'TEST ANNONCE JS'),
(20, 40, '2024-05-11 19:07:27', 'TEST ANNONCE JS'),
(20, 38, '2024-05-11 19:07:27', 'TEST ANNONCE JS'),
(20, 37, '2024-05-11 19:07:41', 'TEST ANNONCE JS'),
(20, 40, '2024-05-11 19:07:41', 'TEST ANNONCE JS'),
(20, 38, '2024-05-11 19:07:41', 'TEST ANNONCE JS'),
(20, 37, '2024-05-11 19:07:55', 'TEST ANNONCE JS'),
(20, 40, '2024-05-11 19:07:55', 'TEST ANNONCE JS'),
(20, 38, '2024-05-11 19:07:55', 'TEST ANNONCE JS'),
(20, 37, '2024-05-11 19:10:22', 'rttg fhfg'),
(20, 40, '2024-05-11 19:10:22', 'rttg fhfg'),
(20, 38, '2024-05-11 19:10:22', 'rttg fhfg'),
(20, 37, '2024-05-11 19:11:17', 'TEST ANNONCE JS'),
(20, 40, '2024-05-11 19:11:17', 'TEST ANNONCE JS'),
(20, 38, '2024-05-11 19:11:17', 'TEST ANNONCE JS'),
(20, 37, '2024-05-11 19:11:41', 'TEST ANNONCE JS'),
(20, 37, '2024-05-11 19:12:02', 'bla'),
(20, 37, '2024-05-11 19:13:34', 'grrg'),
(20, 37, '2024-05-11 19:15:08', 'etst'),
(20, 0, '2024-05-11 19:15:08', 'etst'),
(20, 37, '2024-05-11 19:16:40', 'trttr'),
(20, 37, '2024-05-11 19:18:08', 'tst reload'),
(20, 37, '2024-05-11 19:21:00', 'adjkfjkab afjdnlkfn'),
(20, 37, '2024-05-11 19:21:15', 'afadfa afdfad f'),
(20, 37, '2024-05-11 19:22:02', 'fsgsg gasdgs'),
(20, 37, '2024-05-11 19:22:58', 'efasfgf gsf'),
(20, 37, '2024-05-11 19:24:29', 'wafe'),
(20, 37, '2024-05-11 19:32:20', 'aefklf akladak'),
(20, 37, '2024-05-11 19:32:24', 'aefklf akladaka ad;; amd;lfm'),
(37, 20, '2024-05-11 19:32:30', 'afdsfhfd'),
(20, 37, '2024-05-11 19:32:41', 'TEST ANN JS'),
(20, 40, '2024-05-11 19:32:41', 'TEST ANN JS'),
(20, 38, '2024-05-11 19:32:41', 'TEST ANN JS'),
(20, 37, '2024-05-11 19:33:34', 'TEST ANN JS NO STD'),
(20, 40, '2024-05-11 19:33:34', 'TEST ANN JS NO STD'),
(20, 38, '2024-05-11 19:33:34', 'TEST ANN JS NO STD'),
(20, 37, '2024-05-11 19:34:33', 'tetr hh'),
(20, 40, '2024-05-11 19:34:33', 'tetr hh'),
(20, 38, '2024-05-11 19:34:33', 'tetr hh');

-- --------------------------------------------------------

--
-- Table structure for table `enrollement`
--

DROP TABLE IF EXISTS `enrollement`;
CREATE TABLE IF NOT EXISTS `enrollement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_cours` int NOT NULL,
  `id_etd` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_etd` (`id_etd`),
  KEY `id_cours` (`id_cours`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `enrollement`
--

INSERT INTO `enrollement` (`id`, `id_cours`, `id_etd`) VALUES
(4, 1, 37),
(7, 9, 37),
(12, 16, 37),
(14, 3, 38),
(16, 7, 38),
(17, 7, 37),
(18, 16, 38),
(22, 1, 40),
(24, 9, 41),
(32, 7, 39),
(33, 1, 38),
(35, 3, 39),
(36, 3, 40);

-- --------------------------------------------------------

--
-- Table structure for table `enrollment_requests`
--

DROP TABLE IF EXISTS `enrollment_requests`;
CREATE TABLE IF NOT EXISTS `enrollment_requests` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NOT NULL,
  `cours_id` int NOT NULL,
  `prof_id` int NOT NULL,
  PRIMARY KEY (`request_id`),
  KEY `student` (`student_id`),
  KEY `cours` (`cours_id`),
  KEY `prof_request` (`prof_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `etudiant`
--

DROP TABLE IF EXISTS `etudiant`;
CREATE TABLE IF NOT EXISTS `etudiant` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `prenom` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `adresse` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `mot_de_passe` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `request` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `etudiant`
--

INSERT INTO `etudiant` (`id`, `nom`, `prenom`, `adresse`, `email`, `mot_de_passe`, `request`) VALUES
(37, 'med', 'bens', 'ff', 'test@gmail.com', 'ff', 0),
(38, 'hh', 'ff', 'ff', 'test3@gmail.com', 'ff', 0),
(39, 'Espinoza', 'Leslie', '207 Erin Well, West Andreamouth, TN 60441', 'leslie.espinoza@example.com', 'MlH%^U)yH3O', 0),
(40, 'Wood', 'Julie', '601 Sandra Knolls, Freemanfort, HI 57222', 'julie.wood@example.com', '@k0ytSS$mMSpo', 0),
(41, 'Cole', 'James', '718 Pope Plaza, Hillmouth, MS 84362', 'james.cole@example.com', 'kVt8nxnzrc', 0),
(43, 'Drake', 'Joseph', '24244 Nicole Rapids Suite 892, Jessicaville, AK 03618', 'joseph.drake@example.com', 'LgUpXuPsY9Dim2o', 0),
(44, 'Summers', 'Ann', '696 Townsend Brook Suite 548, Lake Nicoleshire, CO 35311', 'ann.summers@example.com', 'c%)mgZ0o(ZtreJ', 0),
(45, 'Gates', 'Rebecca', '629 Clements Loop, Fosterland, MT 89118', 'rebecca.gates@example.com', 'C*BZq51B4k%%', 0),
(46, 'Brown', 'Keith', '319 Natalie Creek, Shahmouth, NH 90479', 'keith.brown@example.com', 'bniQ1zLZll', 0),
(47, 'English', 'Trevor', '858 Sullivan Lakes Apt. 060, Nealberg, NJ 45590', 'trevor.english@example.com', 'jYIyUvzDiZS', 0),
(48, 'Ellison', 'Teresa', '5522 Angela Ports Suite 989, West Natalie, NM 09164', 'teresa.ellison@example.com', 'STq3YM6NC*', 0),
(51, 'Porter', 'Angela', '37790 Raymond Forest Apt. 064, Janiceborough, IL 97440', 'angela.porter@example.com', 'ldmruy', 0),
(52, 'Montes', 'Samantha', '346 Natalie Lock, South Tannerbury, WY 10297', 'samantha.montes@example.com', 'ylrbqw', 0),
(53, 'Nolan', 'Sean', 'PSC 8987, Box 9629, APO AP 00803', 'sean.nolan@example.com', 'nyazxs', 0),
(54, 'Moore', 'William', 'USNS Haynes, FPO AE 37471', 'william.moore@example.com', 'unddde', 0),
(55, 'gg', 'gg', 'gg', 'testAdmin@gg.gg', 'gg', 0),
(56, 'gg', 'gg', 'gg', 'testAdmin2@gg.gg', 'gg', 0),
(57, 'gg', 'gg', 'gg', 'testAdmin3@gg.gg', 'gg', 0),
(58, 'gg', 'gg', 'gg', 'testAdmin4@gg.gg', 'gg', 0),
(60, 'test', 'test', 'test', 'testhash@gmail.com', '$2y$10$vRmMJM55bS9w4tOJ33xMS.ybdPaHbIRPTi.5nFQhBa6S.ZgKqw/Uq', 0);

-- --------------------------------------------------------

--
-- Table structure for table `modules`
--

DROP TABLE IF EXISTS `modules`;
CREATE TABLE IF NOT EXISTS `modules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `prof_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `prof` (`prof_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `modules`
--

INSERT INTO `modules` (`id`, `nom`, `description`, `prof_id`) VALUES
(1, 'JavaScript', 'Cours de JavaScript', 20),
(3, 'ENGLISH', 'Cours de ENGLISH', 20),
(7, 'PYTHON', 'Cours de PYTHON', 20),
(8, 'c#', 'Cours de c#', 21),
(9, 'Français', 'Cours de français', 20),
(13, 'controle de gestion', 'Cours de marketing', 20),
(16, 'rr', 'rr', 21),
(23, 'test', 'test', 21),
(27, 'test', 'adjnvjknvj nvjadnvl', 20),
(30, 'ff', 'ff', 20);

-- --------------------------------------------------------

--
-- Table structure for table `parties`
--

DROP TABLE IF EXISTS `parties`;
CREATE TABLE IF NOT EXISTS `parties` (
  `id_part` int NOT NULL AUTO_INCREMENT,
  `id_cours` int NOT NULL,
  `title_part` varchar(100) NOT NULL,
  `path_part` varchar(255) NOT NULL,
  `view_flag` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_part`),
  KEY `part_cours` (`id_cours`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `parties`
--

INSERT INTO `parties` (`id_part`, `id_cours`, `title_part`, `path_part`, `view_flag`) VALUES
(1, 1, 'Introduction to Module 1', '/uploads/introduction_module_1.pdf', 1),
(2, 3, 'Advanced Concepts Module 3', '/uploads/advanced_concepts_module_3.pdf', 1),
(3, 7, 'Beginner Guide Module 7', '/uploads/beginner_guide_module_7.pdf', 0),
(4, 8, 'Historical Overview Module 8', '/uploads/historical_overview_module_8.pdf', 1),
(5, 9, 'Practical Applications Module 9', '/uploads/practical_applications_module_9.pdf', 0),
(7, 13, 'Module 13 Summary', '/uploads/module_13_summary.pdf', 0),
(8, 16, 'Detailed Analysis Module 16', '/uploads/detailed_analysis_module_16.pdf', 1),
(9, 23, 'Module 23 Explained', '/uploads/module_23_explained.pdf', 0),
(11, 1, 'Introduction to Module 2', '/uploads/introduction_module_2.pdf', 1),
(12, 1, 'Introduction to Module 3', '/uploads/introduction_module_3.pdf', 1),
(13, 1, 'Introduction to Module 4', '/uploads/introduction_module_4.pdf', 1),
(26, 1, 'test', '/uploads/parts/PW1-slides-partie11.pdf', 1),
(31, 1, 'test 3', '/uploads/parts/Intro Reseaux Info 1-Partie 3-3.pdf', 0);

-- --------------------------------------------------------

--
-- Table structure for table `professeurs`
--

DROP TABLE IF EXISTS `professeurs`;
CREATE TABLE IF NOT EXISTS `professeurs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `prenom` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `adresse` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `mot_de_passe` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `request` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `professeurs`
--

INSERT INTO `professeurs` (`id`, `nom`, `prenom`, `adresse`, `email`, `mot_de_passe`, `request`) VALUES
(20, 'med', 'bens', 'dd', 'test@gmial.com', '$2y$10$0X3hYZprrPKjA1ZA2OCjSuL.9DLrWTC8QQRA6/VPytvkzH62oihRC', 0),
(21, 'ff', 'ff', 'ff', 'test2@gmial.com', '$2y$10$0X3hYZprrPKjA1ZA2OCjSuL.9DLrWTC8QQRA6/VPytvkzH62oihRC', 0),
(23, 'rr', 'rr', 'rr', 'test3@gmail.com', '$2y$10$0X3hYZprrPKjA1ZA2OCjSuL.9DLrWTC8QQRA6/VPytvkzH62oihRC', 0),
(24, 'ff', 'ff', 'ff', 'test6@gmial.com', '$2y$10$0X3hYZprrPKjA1ZA2OCjSuL.9DLrWTC8QQRA6/VPytvkzH62oihRC', 0),
(25, 'gg', 'ggg', 'gg', 'testADmin@gg.gg', '$2y$10$0X3hYZprrPKjA1ZA2OCjSuL.9DLrWTC8QQRA6/VPytvkzH62oihRC', 0),
(26, 'gg', 'gg', 'gg', 'testadmin2@gg.gg', '$2y$10$0X3hYZprrPKjA1ZA2OCjSuL.9DLrWTC8QQRA6/VPytvkzH62oihRC', 0),
(27, 'gg', 'gg', 'gg', 'testadmin3@gg.gg', '$2y$10$0X3hYZprrPKjA1ZA2OCjSuL.9DLrWTC8QQRA6/VPytvkzH62oihRC', 0),
(28, 'gg', 'gg', 'gg', 'testAdmin4@gg.gg', '$2y$10$0X3hYZprrPKjA1ZA2OCjSuL.9DLrWTC8QQRA6/VPytvkzH62oihRC', 0),
(29, 'test', 'test', 'test', 'testhash@gmail.com', '$2y$10$0X3hYZprrPKjA1ZA2OCjSuL.9DLrWTC8QQRA6/VPytvkzH62oihRC', 0);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `enrollement`
--
ALTER TABLE `enrollement`
  ADD CONSTRAINT `id_cours` FOREIGN KEY (`id_cours`) REFERENCES `modules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_etd` FOREIGN KEY (`id_etd`) REFERENCES `etudiant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `enrollment_requests`
--
ALTER TABLE `enrollment_requests`
  ADD CONSTRAINT `cours` FOREIGN KEY (`cours_id`) REFERENCES `modules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `prof_request` FOREIGN KEY (`prof_id`) REFERENCES `professeurs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student` FOREIGN KEY (`student_id`) REFERENCES `etudiant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `modules`
--
ALTER TABLE `modules`
  ADD CONSTRAINT `prof` FOREIGN KEY (`prof_id`) REFERENCES `professeurs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `parties`
--
ALTER TABLE `parties`
  ADD CONSTRAINT `part_cours` FOREIGN KEY (`id_cours`) REFERENCES `modules` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
