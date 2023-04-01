CREATE DATABASE IF NOT EXISTS `todosimple`;
USE `todosimple`;

CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(64) NOT NULL,
  `username` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_sb8bbouer5wak8vyiiy4pf2bx` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `task` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2hsytmxysatfvt0p1992cw449` (`user_id`),
  CONSTRAINT `FK2hsytmxysatfvt0p1992cw449` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
