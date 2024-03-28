-- Disable foreign key checks
SET foreign_key_checks = 0;

DROP TABLE IF EXISTS `Users`;
DROP TABLE IF EXISTS `AuthTokens`;
DROP TABLE IF EXISTS `Ideas`;
DROP TABLE IF EXISTS `Tags`;
DROP TABLE IF EXISTS `Claims`;
DROP TABLE IF EXISTS `Sponsors`;

DROP TRIGGER IF EXISTS created_date;
DROP TRIGGER IF EXISTS ideas_date_posted;
DROP TRIGGER IF EXISTS claims_date_posted;
DROP TRIGGER IF EXISTS ideas_date_trigger;
DROP TRIGGER IF EXISTS claims_date_trigger;
DROP TRIGGER IF EXISTS sponsors_date_trigger;

-- Enable foreign key checks
SET foreign_key_checks = 1;