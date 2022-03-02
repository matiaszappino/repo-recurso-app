-- prepares a MySQL server for the project

CREATE DATABASE IF NOT EXISTS recursos;
CREATE USER IF NOT EXISTS 'recursos_dev'@'localhost' IDENTIFIED BY 'recupass';
GRANT ALL PRIVILEGES ON `recursos`.* TO 'recursos_dev'@'localhost';
GRANT SELECT ON `recursos_schema`.* TO 'recursos_dev'@'localhost';
FLUSH PRIVILEGES;
