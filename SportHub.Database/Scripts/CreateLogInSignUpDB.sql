DROP SCHEMA IF EXISTS `SportHub`;

CREATE SCHEMA IF NOT EXISTS `SportHub` DEFAULT CHARACTER SET utf8 ;
USE `SportHub` ;

-- Default username : user
-- Default password : root
-- Default database : SportHub
-- Connection port : 3306

CREATE USER IF NOT EXISTS'user'@'localhost' IDENTIFIED BY 'password' ;
GRANT ALL PRIVILEGES ON SportHub.* TO 'user'@'localhost';
    
-- -----------------------------------------------------
-- Table `SportHub`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SportHub`.`User` (
    `UserId` VARCHAR(150) NOT NULL,
    `Email` VARCHAR(70) NOT NULL,
    `Password` VARCHAR(255) NOT NULL,
    `FirstName` VARCHAR(100) NOT NULL,
    `LastName` VARCHAR(100) NOT NULL,
    `IsAdmin` TINYINT NOT NULL DEFAULT '0',
    `IsActivated` TINYINT NOT NULL DEFAULT '0',
    PRIMARY KEY (`UserId`),
    UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE)
    ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `SportHub`.`Token`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SportHub`.`Token` (
    `RefreshToken` VARCHAR(300) NOT NULL,
    `UserId` VARCHAR(150) NOT NULL,
    PRIMARY KEY (`RefreshToken`),
    UNIQUE INDEX `UserId_UNIQUE` (`UserId` ASC) VISIBLE,
    CONSTRAINT `fk_UserId`
    FOREIGN KEY (`UserId`)
    REFERENCES `SportHub`.`User` (`UserId`))
    ENGINE = InnoDB;
