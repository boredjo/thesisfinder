-- tftest.Sponsorships definition

CREATE TABLE `Sponsors` (
  `id` varchar(50) NOT NULL,
  `author` varchar(100) DEFAULT NULL,
  `idea` varchar(50) DEFAULT NULL,
  `amount` decimal(10,0) NOT NULL,
  `views` bigint(20) NOT NULL DEFAULT 0,
  `description` text DEFAULT NULL,
  `date_posted` timestamp DEFAULT NULL,
  `deadline` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Sponsors_Ideas_FK` (`idea`),
  KEY `Sponsors_Users_FK` (`author`),
  CONSTRAINT `Sponsors_Ideas_FK` FOREIGN KEY (`idea`) REFERENCES `Ideas` (`hash`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Sponsors_Users_FK` FOREIGN KEY (`author`) REFERENCES `Users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;