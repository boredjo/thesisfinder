-- thesisfinder.AuthTokens definition
CREATE TABLE `AuthTokens` (
  `token` varchar(100) NOT NULL,
  `user` varchar(100) NOT NULL,
  `valid` tinyint(1) DEFAULT 1,
  `created_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`token`),
  KEY `AuthTokens_User_FK` (`user`),
  CONSTRAINT `AuthTokens_User_FK` FOREIGN KEY (`user`) REFERENCES `Users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;