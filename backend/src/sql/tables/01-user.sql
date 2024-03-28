-- thesisfinder.`User` definition
CREATE TABLE `Users` (
  `username` varchar(100) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `country` varchar(2) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(100) NOT NULL,
  `verified_email` tinyint(1) DEFAULT 0,
  `researcher` tinyint(1) DEFAULT 0,
  `sponsor` tinyint(1) DEFAULT 0,
  `email_verfied` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`username`),
  UNIQUE KEY `Users_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
