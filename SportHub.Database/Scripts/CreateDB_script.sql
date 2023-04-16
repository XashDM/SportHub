CREATE SCHEMA IF NOT EXISTS `SportHub` DEFAULT CHARACTER SET utf8 ;
USE `SportHub` ;

CREATE TABLE IF NOT EXISTS `SportHub`.`UserAccount` (
  `UserId` INT NOT NULL AUTO_INCREMENT,
  `FirstName` CHAR(55) NOT NULL,
  `LastName` CHAR(55) NOT NULL,
  `Email` VARCHAR(255) NOT NULL,
  `Password` VARCHAR(255) NOT NULL,
  `IsAdmin` TINYINT(2) NOT NULL DEFAULT 0,
  `IsDelete` TINYINT(2) NOT NULL,
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
  `AuthorId` INT NOT NULL,
  `CategoryId` INT NOT NULL,
  PRIMARY KEY (`ArticleId`),
  INDEX `fk_Articles_Images1_idx` (`ImageId` ASC) VISIBLE,
  INDEX `fk_Articles_UserAccount1_idx` (`AuthorId` ASC) VISIBLE,
  INDEX `fk_Articles_Category1_idx` (`CategoryId` ASC) VISIBLE,
  CONSTRAINT `fk_Articles_Images1`
    FOREIGN KEY (`ImageId`)
    REFERENCES `SportHub`.`Images` (`ImageId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Articles_UserAccount1`
    FOREIGN KEY (`AuthorId`)
    REFERENCES `SportHub`.`UserAccount` (`UserId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Articles_Category1`
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
  CONSTRAINT `fk_Teams_Articles1`
    FOREIGN KEY (`ArticlesId`)
    REFERENCES `SportHub`.`Articles` (`ArticleId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `SportHub`.`Comments` (
  `CommentId` INT NOT NULL,
  `Message` VARCHAR(1000) NOT NULL,
  `AuthorId` INT NOT NULL,
  PRIMARY KEY (`CommentId`),
  UNIQUE INDEX `CommentId_UNIQUE` (`CommentId` ASC) VISIBLE,
  INDEX `fk_Comments_UserAccount_idx` (`AuthorId` ASC) VISIBLE,
  CONSTRAINT `fk_Comments_UserAccount`
    FOREIGN KEY (`AuthorId`)
    REFERENCES `SportHub`.`UserAccount` (`UserId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;