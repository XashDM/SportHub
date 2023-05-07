USE `SportHub` ;

CREATE TABLE IF NOT EXISTS `SportHub`.`Language` (
  `LanguageId` VARCHAR(150) NOT NULL,
  `ShortTitle` CHAR(2) NOT NULL,
  `IsActive` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`LanguageId`),
  UNIQUE INDEX `LanguageId_UNIQUE` (`LanguageId` ASC) VISIBLE,
  UNIQUE INDEX `ShortTitle_UNIQUE` (`ShortTitle` ASC) VISIBLE)
ENGINE = InnoDB;


INSERT INTO Language (LanguageId, ShortTitle, IsActive)
VALUES (UUID(), 'en', 1);
