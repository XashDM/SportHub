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

CREATE TABLE IF NOT EXISTS `SportHub`.`Categories` (
  `CategoryId` VARCHAR(45) NOT NULL,
  `CategoryName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`CategoryId`),
  UNIQUE INDEX `CategoryId_UNIQUE` (`CategoryId` ASC) VISIBLE,
  UNIQUE INDEX `CategoryName_UNIQUE` (`CategoryName` ASC) VISIBLE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `SportHub`.`SubCategories` (
  `SubCategoryId` VARCHAR(45) NOT NULL,
  `SubCategoryName` VARCHAR(45) NOT NULL,
  `CategoryId` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`SubCategoryId`),
  INDEX `fk_Category_idx` (`CategoryId` ASC) VISIBLE,
   CONSTRAINT `fk_Categories`
    FOREIGN KEY (`CategoryId`)
    REFERENCES `SportHub`.`Categories` (`CategoryId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  UNIQUE INDEX `SubCategoryId_UNIQUE` (`SubCategoryId` ASC) VISIBLE,
  UNIQUE INDEX `SubCategoryName_UNIQUE` (`SubCategoryName` ASC) VISIBLE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `SportHub`.`Locations` (
  `LocationId` VARCHAR(45) NOT NULL,
  `LocationName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`LocationId`),
  UNIQUE INDEX `LocationId_UNIQUE` (`LocationId` ASC) VISIBLE,
  UNIQUE INDEX `LocationName_UNIQUE` (`LocationName` ASC) VISIBLE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `SportHub`.`Images` (
  `ImageId` VARCHAR(45) NOT NULL,
  `Url` VARCHAR(255) NOT NULL,
  `Alt` VARCHAR(100) NOT NULL DEFAULT 'image',
  PRIMARY KEY (`ImageId`),
  UNIQUE INDEX `ImageId_UNIQUE` (`ImageId` ASC) VISIBLE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `SportHub`.`Teams` (
  `TeamId` VARCHAR(45) NOT NULL,
  `TeamName` VARCHAR(45) NOT NULL,
  `TeamDescription` VARCHAR(45) NOT NULL,
  `SubCategoryId` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`TeamId`),
  UNIQUE INDEX `TeamId_UNIQUE` (`TeamId` ASC) VISIBLE,
  UNIQUE INDEX `TeamName_UNIQUE` (`TeamName` ASC) VISIBLE,
  INDEX `fk_Teams_SubCategories_idx` (`SubCategoryId` ASC) VISIBLE,
  CONSTRAINT `fk_Teams_SubCategories`
    FOREIGN KEY (`SubCategoryId`)
    REFERENCES `SportHub`.`SubCategories` (`SubCategoryId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `SportHub`.`Language` (
  `LanguageId` VARCHAR(150) NOT NULL,
  `ShortTitle` CHAR(2) NOT NULL,
  `IsActive` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`LanguageId`),
  UNIQUE INDEX `LanguageId_UNIQUE` (`LanguageId` ASC) VISIBLE,
  UNIQUE INDEX `ShortTitle_UNIQUE` (`ShortTitle` ASC) VISIBLE)
  ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `SportHub`.`Articles` (
  `ArticleId` VARCHAR(150) NOT NULL,
  `PublishingDate` DATETIME NOT NULL DEFAULT now(),
  `AuthorId` VARCHAR(150) NOT NULL,
  `ImageId` VARCHAR(45) NOT NULL,
  `SubCategoryId` VARCHAR(45) NOT NULL,
  `TeamId` VARCHAR(45) NOT NULL,
  `LocationId` VARCHAR(45) NOT NULL,
  `Published` TINYINT(2) NOT NULL DEFAULT 0,
  `ShowComments` TINYINT(2) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ArticleId`),
  INDEX `fk_Articles_Images_idx` (`ImageId` ASC) VISIBLE,
  INDEX `fk_Articles_User_idx` (`AuthorId` ASC) VISIBLE,
  INDEX `fk_Articles_SubCategory_idx` (`SubCategoryId` ASC) VISIBLE,
  INDEX `fk_Articles_Team_idx` (`TeamId` ASC) VISIBLE,
  INDEX `fk_Articles_Location_idx` (`LocationId` ASC) VISIBLE,
  CONSTRAINT `fk_Articles_Images`
    FOREIGN KEY (`ImageId`)
    REFERENCES `SportHub`.`Images` (`ImageId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Articles_UserAccount`
    FOREIGN KEY (`AuthorId`)
    REFERENCES `SportHub`.`User` (`UserId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Articles_SubCategory`
    FOREIGN KEY (`SubCategoryId`)
    REFERENCES `SportHub`.`SubCategories` (`SubCategoryId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Articles_Team`
    FOREIGN KEY (`TeamId`)
    REFERENCES `SportHub`.`Teams` (`TeamId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
CONSTRAINT `fk_Articles_Location`
    FOREIGN KEY (`LocationId`)
    REFERENCES `SportHub`.`Locations` (`LocationId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `SportHub`.`ArticleInfos` (
  `ArticleId` VARCHAR(120) NOT NULL,
  `LanguageId` VARCHAR(150) NOT NULL,
  `Title` VARCHAR(100) NOT NULL,
  `Subtitle` VARCHAR(100) NOT NULL,
  `MainText` TEXT NOT NULL,
  PRIMARY KEY (`ArticleId`, `LanguageId`),
  INDEX `fk_Articles_idx` (`ArticleId` ASC) VISIBLE,
  INDEX `fk_Language_idx` (`LanguageId` ASC) VISIBLE,
  CONSTRAINT `fk_Articles`
    FOREIGN KEY (`ArticleId`)
    REFERENCES `SportHub`.`Articles` (`ArticleId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Languages`
    FOREIGN KEY (`LanguageId`)
    REFERENCES `SportHub`.`Language` (`LanguageId`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `SportHub`.`Comments` (
  `CommentId` VARCHAR(45) NOT NULL,
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