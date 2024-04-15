-- tftest.Likes definition

CREATE TABLE `Likes` (
  `user` varchar(100) NOT NULL,
  `idea` varchar(50) NOT NULL,
  PRIMARY KEY (`user`,`idea`),
  KEY `Likes_Ideas_FK` (`idea`),
  KEY `Likes_Users_FK` (`user`),
  CONSTRAINT `Likes_Ideas_FK` FOREIGN KEY (`idea`) REFERENCES `Ideas` (`hash`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Likes_Users_FK` FOREIGN KEY (`user`) REFERENCES `Users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;