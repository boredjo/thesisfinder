-- Disable foreign key checks
SET foreign_key_checks = 0;

DROP TABLE IF EXISTS `Users`;
DROP TABLE IF EXISTS `AuthTokens`;
DROP TABLE IF EXISTS `Ideas`;

DROP TRIGGER IF EXISTS created_date;
DROP TRIGGER IF EXISTS ideas_date_posted;

-- Enable foreign key checks
SET foreign_key_checks = 1;