SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS=0;

DROP DATABASE IF EXISTS ofraud;
CREATE DATABASE ofraud CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ofraud;

CREATE TABLE user (
    id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(64) NOT NULL,
    last_name_1 VARCHAR(64) NOT NULL,
    last_name_2 VARCHAR(64) NOT NULL,
    email VARCHAR(128) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    active BOOL DEFAULT TRUE,
    refresh_token VARCHAR(100)
);

CREATE TABLE category( 
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(32) NOT NULL UNIQUE
);

CREATE TABLE status (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(32) NOT NULL UNIQUE
);

CREATE TABLE admin (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username VARCHAR(32) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    refresh_token VARCHAR(100)
);

CREATE TABLE risk( 
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	level VARCHAR(32)
);

CREATE TABLE report (
    id BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_user BIGINT,
    id_category INT,
    id_status INT,
    id_risk INT,
    created_at DATETIME DEFAULT NOW(),
    title VARCHAR(64) NOT NULL,
    description TINYTEXT NOT NULL,
    image TINYTEXT,
    url TEXT,
    application VARCHAR(30),
    website VARCHAR(256),
    username VARCHAR(32),
    email VARCHAR(128),
    phone_number VARCHAR(16),
    anonymous BOOL NOT NULL DEFAULT FALSE,
    FOREIGN KEY (id_user) REFERENCES user(id),
    FOREIGN KEY (id_category) REFERENCES category(id),
    FOREIGN KEY (id_status) REFERENCES status(id),
    FOREIGN KEY (id_risk) REFERENCES risk(id)
);

CREATE TABLE `like` (
    id_user BIGINT,
    id_report BIGINT,
    PRIMARY KEY (id_user, id_report),
    FOREIGN KEY (id_user) REFERENCES user(id),
    FOREIGN KEY (id_report) REFERENCES report(id)
);

CREATE TABLE comment(
	id BIGINT PRIMARY KEY NOT NULL auto_increment,
    id_user BIGINT,
    id_report BIGINT,
    content VARCHAR(128) NOT NULL,
    created_at DATETIME DEFAULT NOW(),
    FOREIGN KEY (id_user) REFERENCES user(id),
    FOREIGN KEY (id_report) REFERENCES report(id)
);

SET FOREIGN_KEY_CHECKS=1;

