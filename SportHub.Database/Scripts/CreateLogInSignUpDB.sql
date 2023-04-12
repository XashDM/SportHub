DROP SCHEMA IF EXISTS `SportHub`;

CREATE SCHEMA IF NOT EXISTS `SportHub` DEFAULT CHARACTER SET utf8 ;
USE `SportHub` ;

-- Default username : user
-- Default password : root
-- Default database : SportHub
-- Connection port : 3306

CREATE USER IF NOT EXISTS'user'@'localhost' IDENTIFIED BY 'password' ;

-- -----------------------------------------------------
-- Table `SportHub`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SportHub`.`user` (
    `Id` VARCHAR(150) NOT NULL,
    `Email` VARCHAR(70) NOT NULL,
    `Password` VARCHAR(255) NOT NULL,
    `FirstName` VARCHAR(100) NOT NULL,
    `LastName` VARCHAR(100) NOT NULL,
    `isAdmin` TINYINT NOT NULL DEFAULT '0',
    `isActivated` TINYINT NOT NULL DEFAULT '0',
    PRIMARY KEY (`Id`),
    UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE)
    ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `SportHub`.`token`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SportHub`.`token` (
    `refreshToken` VARCHAR(300) NOT NULL,
    `UserId` VARCHAR(150) NOT NULL,
    PRIMARY KEY (`refreshToken`),
    UNIQUE INDEX `UserId_UNIQUE` (`UserId` ASC) VISIBLE,
    CONSTRAINT `fk_UserId`
    FOREIGN KEY (`UserId`)
    REFERENCES `SportHub`.`user` (`Id`))
    ENGINE = InnoDB;
