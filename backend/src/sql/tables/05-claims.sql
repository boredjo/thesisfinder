-- tftest.Claims definition

CREATE TABLE `Claims` (
  `user` varchar(100) NOT NULL,
  `idea` varchar(30) NOT NULL,
  `date_posted` timestamp NULL DEFAULT NULL,
  KEY `NewTable_Ideas_FK` (`idea`),
  KEY `NewTable_Users_FK` (`user`),
  CONSTRAINT `NewTable_Ideas_FK` FOREIGN KEY (`idea`) REFERENCES `Ideas` (`hash`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `NewTable_Users_FK` FOREIGN KEY (`user`) REFERENCES `Users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;