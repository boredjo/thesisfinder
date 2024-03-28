CREATE DEFINER=`tf`@`%` TRIGGER sponsor_date_trigger
BEFORE INSERT
ON Sponsors FOR EACH ROW
BEGIN
    SET NEW.date_posted = UTC_TIMESTAMP();
END