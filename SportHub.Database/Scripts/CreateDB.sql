CREATE SCHEMA IF NOT EXISTS `SportHub` DEFAULT CHARACTER SET utf8mb4 ;
USE `SportHub` ;

-- -----------------------------------------------------
-- Table `SportHub`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SportHub`.`User` (
  `UserId` VARCHAR(150) NOT NULL,
  `Email` VARCHAR(70) NOT NULL,
  `Password` VARCHAR(255),
  `FirstName` VARCHAR(100) NOT NULL,
  `LastName` VARCHAR(100) NOT NULL,
  `IsAdmin` TINYINT NOT NULL DEFAULT '0',
  `IsActivated` TINYINT NOT NULL DEFAULT '0',
  PRIMARY KEY (`UserId`),
  UNIQUE INDEX `UserId_UNIQUE` (`UserId` ASC) VISIBLE,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE)
  ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `SportHub`.`Token`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `SportHub`.`Token` (
  `RefreshToken` VARCHAR(500) NOT NULL,
  `UserId` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`RefreshToken`),
  UNIQUE INDEX `UserId_UNIQUE` (`UserId` ASC) VISIBLE,
  CONSTRAINT `fk_UserId`
  FOREIGN KEY (`UserId`)
  REFERENCES `SportHub`.`User` (`UserId`)
  ON DELETE CASCADE
  ON UPDATE CASCADE)
  ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `SportHub`.`Category` (
  `CategoryId` INT NOT NULL,
  `CategoryName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`CategoryId`),
  UNIQUE INDEX `CategoryId_UNIQUE` (`CategoryId` ASC) VISIBLE,
  UNIQUE INDEX `CategoryName_UNIQUE` (`CategoryName` ASC) VISIBLE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `SportHub`.`Images` (
  `ImageId` INT NOT NULL,
  `Image` VARCHAR(255) NOT NULL,
  `Alt` VARCHAR(100) NOT NULL DEFAULT 'image',
  PRIMARY KEY (`ImageId`),
  UNIQUE INDEX `ImageId_UNIQUE` (`ImageId` ASC) VISIBLE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `SportHub`.`Articles` (
  `ArticleId` INT NOT NULL AUTO_INCREMENT,
  `Title` CHAR(45) NOT NULL,
  `Subtitle` CHAR(100) NULL,
  `MainText` TEXT NOT NULL,
  `PublishingDate` DATETIME NOT NULL DEFAULT now(),
  `ImageId` INT NOT NULL,
  `AuthorId` VARCHAR(150) NOT NULL,
  `CategoryId` INT NOT NULL,
  PRIMARY KEY (`ArticleId`),
  INDEX `fk_Articles_Images_idx` (`ImageId` ASC) VISIBLE,
  INDEX `fk_Articles_User_idx` (`AuthorId` ASC) VISIBLE,
  INDEX `fk_Articles_Category_idx` (`CategoryId` ASC) VISIBLE,
  CONSTRAINT `fk_Articles_Images`
    FOREIGN KEY (`ImageId`)
    REFERENCES `SportHub`.`Images` (`ImageId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Articles_User`
    FOREIGN KEY (`AuthorId`)
    REFERENCES `SportHub`.`User` (`UserId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Articles_Category`
    FOREIGN KEY (`CategoryId`)
    REFERENCES `SportHub`.`Category` (`CategoryId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `SportHub`.`Teams` (
  `TeamId` INT NOT NULL,
  `TeamName` VARCHAR(45) NOT NULL,
  `TeamDescription` VARCHAR(45) NOT NULL,
  `ArticlesId` INT NOT NULL,
  PRIMARY KEY (`TeamId`),
  UNIQUE INDEX `TeamId_UNIQUE` (`TeamId` ASC) VISIBLE,
  UNIQUE INDEX `TeamName_UNIQUE` (`TeamName` ASC) VISIBLE,
  INDEX `fk_Teams_Articles1_idx` (`ArticlesId` ASC) VISIBLE,
  CONSTRAINT `fk_Teams_Articles`
    FOREIGN KEY (`ArticlesId`)
    REFERENCES `SportHub`.`Articles` (`ArticleId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `SportHub`.`Comments` (
  `CommentId` INT NOT NULL,
  `Message` VARCHAR(1000) NOT NULL,
  `AuthorId` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`CommentId`),
  UNIQUE INDEX `CommentId_UNIQUE` (`CommentId` ASC) VISIBLE,
  INDEX `fk_Comments_User_idx` (`AuthorId` ASC) VISIBLE,
  CONSTRAINT `fk_Comments_User`
    FOREIGN KEY (`AuthorId`)
    REFERENCES `SportHub`.`User` (`UserId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;