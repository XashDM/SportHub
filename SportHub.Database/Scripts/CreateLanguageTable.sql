USE `SportHub` ;

CREATE TABLE IF NOT EXISTS `SportHub`.`Language` (
  `LanguageId` INT NOT NULL AUTO_INCREMENT,
  `ShortTitle` CHAR(2) NOT NULL,
  `IsActive` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`LanguageId`),
  UNIQUE INDEX `LanguageId_UNIQUE` (`LanguageId` ASC) VISIBLE,
  UNIQUE INDEX `ShortTitle_UNIQUE` (`ShortTitle` ASC) VISIBLE)
ENGINE = InnoDB;

INSERT INTO Language (ShortTitle, IsActive)
VALUES ('en', 1);
