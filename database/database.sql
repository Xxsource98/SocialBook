CREATE DATABASE IF NOT EXISTS `socialbook-db`;
USE `socialbook-db`;

CREATE TABLE IF NOT EXISTS `users` (
    `ID` int NOT NULL AUTO_INCREMENT,
    `username` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `password` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `email` varchar(80) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `firstName` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `lastName` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `bio` tinytext COLLATE utf8mb4_unicode_ci,
    `profilePicture` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `users_friends` (
    `senderID` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `receiverID` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `friends` TINYINT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `users_posts` (
    `ID` int NOT NULL AUTO_INCREMENT,
    `posterID` int NOT NULL, 
    `firstName` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `lastName` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `createDate` datetime DEFAULT NULL,
    `title` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `description` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `users_comments` (
    `ID` int NOT NULL AUTO_INCREMENT,
    `postID` int DEFAULT NULL,
    `posterID` int NOT NULL, 
    `firstName` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `lastName` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `comment` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
    `createDate` datetime DEFAULT NULL,
    PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `users_likes` (
    `postID` int DEFAULT NULL,
    `userID` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;