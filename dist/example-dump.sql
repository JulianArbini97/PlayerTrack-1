DROP DATABASE IF EXISTS playerTrack_db;
CREATE DATABASE IF NOT EXISTS playerTrack_db;
CREATE USER IF NOT EXISTS `your-name`@`localhost`;
SET PASSWORD FOR `your-name`@`localhost` = 'your-pwd';
GRANT ALL PRIVILEGES ON `playerTrack_db`.* TO `your-name`@`localhost`;
FLUSH PRIVILEGES;

USE playerTrack_db;

/* CREATE PLAYERS TABLE */
DROP TABLE IF EXISTS `players`;
CREATE TABLE `players` (
    `id` int NOT NULL AUTO_INCREMENT,
    `first_name` varchar(128) NOT NULL,
    `last_name` varchar(128) NOT NULL,
    `position` varchar(128) NOT NULL,
    `user` varchar(128) NOT NULL,
    `password` varchar(128) NOT NULL,
    PRIMARY KEY (`id`)
);

LOCK TABLES `players` WRITE;
INSERT INTO `players` (`id`, `first_name`, `last_name`, `position`, `user`, `password`)
VALUES
/*  insert your values here */
();
UNLOCK TABLES;

/* CREATE STAFF TABLE */
DROP TABLE IF EXISTS `staff`;
CREATE TABLE `staff` (
  `id` varchar(60) NOT NULL,
  `first_name` varchar(128) NOT NULL,
  `last_name` varchar(128) NOT NULL,
  `user` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
);

LOCK TABLES `staff` WRITE;
INSERT INTO `staff` (`id`, `first_name`, `last_name`, `user`, `password`)
VALUES
/*  insert your values here */
();
UNLOCK TABLES

/* CREATE TOURNAMENT MATCHES TABLE */
DROP TABLE IF EXISTS `all_matches`;
CREATE TABLE `all_matches` (
  `id` int NOT NULL AUTO_INCREMENT,
  `player_id` int NOT NULL,
  `opponent` varchar(60) NOT NULL,
  `date` datetime NOT NULL,
  `minutes` int,
  `distance` int,
  `HSR` int,
  `HMLD` int,
  `accelerations` int,
  `decelerations` int,
  `max-speed` float,
  `collisions` int,
  PRIMARY KEY (`id`)
);

LOCK TABLES `all_matches` WRITE;
INSERT INTO `all_matches` (`player_id`, `opponent`, `date`, `minutes`, `distance`, `HSR`, `HMLD`, `accelerations`, `decelerations`, `max-speed`, `collisions`)
VALUES
/*  insert your values here */
();
UNLOCK TABLES;

/* CREATE INJURY TABLE */
DROP TABLE IF EXISTS `injuries`;
CREATE TABLE `injuries` (
    `id` int NOT NULL AUTO_INCREMENT,
    `date` datetime NOT NULL,
    `description` varchar(255) NOT NULL,
    `date_recovered` datetime DEFAULT NULL,
    `player_id` int NOT NULL,
    PRIMARY KEY (`id`)
);

LOCK TABLES `injuries` WRITE;
INSERT INTO `injuries` (`id`, `date`, `description`, `date_recovered`, `player_id`)
VALUES
/*  insert your values here */
();
UNLOCK TABLES;

/* CREATE DAILY RECORDS TABLE FOR ONE USER */
DROP TABLE IF EXISTS `daily_` + username;
CREATE TABLE `daily_` + username (
    `id` int NOT NULL,
    `date` datetime NOT NULL,
    `weight` float NOT NULL,
    `energy` float NOT NULL,
    `sleep` float NOT NULL,
    `pain` float NOT NULL,
    `description` varchar(255) NOT NULL,
    PRIMARY KEY (`date`)
);

LOCK TABLES `daily_` + username WRITE;
INSERT INTO `daily_` + username (`id`, `date`, `weight`, `energy`, `sleep`, `pain`, `description`)
VALUES
/*  insert your values here */
();
UNLOCK TABLES;