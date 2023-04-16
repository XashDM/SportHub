DROP SCHEMA IF EXISTS `SportHub`;

CREATE SCHEMA IF NOT EXISTS `SportHub` DEFAULT CHARACTER SET utf8 ;
USE `SportHub` ;

-- Default username : user
-- Default password : root
-- Default database : SportHub
-- Connection port : 3306

CREATE USER IF NOT EXISTS'user'@'localhost' IDENTIFIED BY 'password' ;

CREATE TABLE IF NOT EXISTS `SportHub`.`UserAccount` (
  `UserId` INT NOT NULL AUTO_INCREMENT,
  `FirstName` VARCHAR(45) NOT NULL,
  `LastName` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(255) NOT NULL,
  `IsAdmin` TINYINT(1) NOT NULL DEFAULT 0,
  `IsBlocked` TINYINT(1) NOT NULL,
  PRIMARY KEY (`UserId`),
  UNIQUE INDEX `id_UNIQUE` (`UserId` ASC) VISIBLE,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE,
  UNIQUE INDEX `Password_UNIQUE` (`Password` ASC) VISIBLE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `SportHub`.`Category` (
  `CategoryId` INT NOT NULL,
  `CategoryName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`CategoryId`),
  UNIQUE INDEX `CategoryId_UNIQUE` (`CategoryId` ASC) VISIBLE,
  UNIQUE INDEX `CategoryName_UNIQUE` (`CategoryName` ASC) VISIBLE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `SportHub`.`Teams` (
  `TeamId` INT NOT NULL,
  `TeamName` VARCHAR(45) NOT NULL,
  `TeamDescription` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`TeamId`),
  UNIQUE INDEX `TeamId_UNIQUE` (`TeamId` ASC) VISIBLE,
  UNIQUE INDEX `TeamName_UNIQUE` (`TeamName` ASC) VISIBLE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `SportHub`.`Articles` (
  `ArticleId` INT NOT NULL AUTO_INCREMENT,
  `PublishingDate` DATETIME NOT NULL DEFAULT now(),
  `AuthorId` INT NOT NULL,
  `CategoryId` INT NOT NULL,
  `TeamId` INT NOT NULL,
  PRIMARY KEY (`ArticleId`),
  INDEX `fk_Articles_UserAccount1_idx` (`AuthorId` ASC) VISIBLE,
  INDEX `fk_Articles_Category1_idx` (`CategoryId` ASC) VISIBLE,
  INDEX `fk_Articles_Teams1_idx` (`TeamId` ASC) VISIBLE,
  CONSTRAINT `fk_Articles_UserAccount1`
    FOREIGN KEY (`AuthorId`)
    REFERENCES `SportHub`.`UserAccount` (`UserId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Articles_Category1`
    FOREIGN KEY (`CategoryId`)
    REFERENCES `SportHub`.`Category` (`CategoryId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Articles_Teams1`
    FOREIGN KEY (`TeamId`)
    REFERENCES `SportHub`.`Teams` (`TeamId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `SportHub`.`ArticleInfo` (
  `Language` CHAR(10) NOT NULL,
  `ArticleId` INT NOT NULL,
  `Title` CHAR(45) NOT NULL,
  `Subtitle` CHAR(100) NULL,
  `MainText` TEXT NOT NULL,
  PRIMARY KEY (`Language`, `ArticleId`),
  UNIQUE INDEX `Language_UNIQUE` (`Language` ASC) VISIBLE,
  INDEX `fk_ArticleInfo_Articles1_idx` (`ArticleId` ASC) VISIBLE,
  CONSTRAINT `fk_ArticleInfo_Articles1`
    FOREIGN KEY (`ArticleId`)
    REFERENCES `SportHub`.`Articles` (`ArticleId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `SportHub`.`SubCategory` (
  `SubCategoryId` INT NOT NULL AUTO_INCREMENT,
  `SubCategoryName` VARCHAR(45) NOT NULL,
  `CategoryId` INT NOT NULL,
  PRIMARY KEY (`SubCategoryId`),
  INDEX `fk_SubCategory_Category1_idx` (`CategoryId` ASC) VISIBLE,
  CONSTRAINT `fk_SubCategory_Category1`
    FOREIGN KEY (`CategoryId`)
    REFERENCES `SportHub`.`Category` (`CategoryId`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;