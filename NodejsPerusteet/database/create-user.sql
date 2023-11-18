CREATE USER 'mediauser'@'localhost' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON `MediaShare`.* TO 'mediashare'@'localhost';
FLUSH PRIVILEGES;