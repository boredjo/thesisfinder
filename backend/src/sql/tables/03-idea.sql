-- thesisfinder.Ideas definition
CREATE TABLE `Ideas` (
  `hash` varchar(30) NOT NULL,
  `title` varchar(200) NOT NULL,
  `date_posted` timestamp NULL DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `views` int(11) NOT NULL DEFAULT 0,
  `tag1` varchar(100) DEFAULT NULL,
  `tag2` varchar(100) DEFAULT NULL,
  `tag3` varchar(100) DEFAULT NULL,
  `tag4` varchar(100) DEFAULT NULL,
  `tag5` varchar(100) DEFAULT NULL,
  `visibile` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`hash`),
  UNIQUE KEY `Ideas_UNIQUE` (`title`),
  KEY `Ideas_Users_FK` (`author`),
  CONSTRAINT `Ideas_Users_FK` FOREIGN KEY (`author`) REFERENCES `Users` (`username`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;