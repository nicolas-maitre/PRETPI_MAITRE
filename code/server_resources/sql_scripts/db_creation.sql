-- MySQL Script generated by MySQL Workbench
-- Wed Mar 27 08:39:19 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema messaging_web_app_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `messaging_web_app_db` DEFAULT CHARACTER SET utf8 ;
USE `messaging_web_app_db` ;

-- -----------------------------------------------------
-- Table `messaging_web_app_db`.`files`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `messaging_web_app_db`.`files` ;

CREATE TABLE IF NOT EXISTS `messaging_web_app_db`.`files` (
  `id` VARCHAR(36) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `subtype` VARCHAR(45) NOT NULL,
  `extension` VARCHAR(5) NOT NULL,
  `location` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `messaging_web_app_db`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `messaging_web_app_db`.`users` ;

CREATE TABLE IF NOT EXISTS `messaging_web_app_db`.`users` (
  `id` VARCHAR(36) NOT NULL,
  `files_id` VARCHAR(36) NULL,
  `pseudo` VARCHAR(200) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `first_name` VARCHAR(200) NULL,
  `last_name` VARCHAR(200) NULL,
  `creation_time` TIMESTAMP NOT NULL,
  `active` TINYINT(1) NOT NULL,
  `enabled` TINYINT(1) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_users_files1_idx` (`files_id` ASC),
  CONSTRAINT `fk_users_files1`
    FOREIGN KEY (`files_id`)
    REFERENCES `messaging_web_app_db`.`files` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `messaging_web_app_db`.`groups`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `messaging_web_app_db`.`groups` ;

CREATE TABLE IF NOT EXISTS `messaging_web_app_db`.`groups` (
  `id` VARCHAR(36) NOT NULL,
  `files_id` VARCHAR(36) NULL,
  `creation_time` TIMESTAMP NOT NULL,
  `active` TINYINT(1) NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  `administrator` VARCHAR(36) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_groups_files1_idx` (`files_id` ASC),
  INDEX `fk_groups_users1_idx` (`administrator` ASC),
  CONSTRAINT `fk_groups_files1`
    FOREIGN KEY (`files_id`)
    REFERENCES `messaging_web_app_db`.`files` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_groups_users1`
    FOREIGN KEY (`administrator`)
    REFERENCES `messaging_web_app_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `messaging_web_app_db`.`messages`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `messaging_web_app_db`.`messages` ;

CREATE TABLE IF NOT EXISTS `messaging_web_app_db`.`messages` (
  `id` VARCHAR(36) NOT NULL,
  `groups_id` VARCHAR(36) NOT NULL,
  `users_id` VARCHAR(36) NOT NULL,
  `files_id` VARCHAR(36) NULL,
  `text` LONGTEXT NULL,
  `creation_time` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_messages_groups_idx` (`groups_id` ASC),
  INDEX `fk_messages_users1_idx` (`users_id` ASC),
  INDEX `fk_messages_files1_idx` (`files_id` ASC),
  CONSTRAINT `fk_messages_groups`
    FOREIGN KEY (`groups_id`)
    REFERENCES `messaging_web_app_db`.`groups` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_messages_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `messaging_web_app_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_messages_files1`
    FOREIGN KEY (`files_id`)
    REFERENCES `messaging_web_app_db`.`files` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `messaging_web_app_db`.`user_groups`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `messaging_web_app_db`.`user_groups` ;

CREATE TABLE IF NOT EXISTS `messaging_web_app_db`.`user_groups` (
  `users_id` VARCHAR(36) NOT NULL,
  `groups_id` VARCHAR(36) NOT NULL,
  `creation_time` TIMESTAMP NOT NULL,
  `active` TINYINT(1) NOT NULL,
  `role` VARCHAR(45) NULL,
  PRIMARY KEY (`users_id`, `groups_id`),
  INDEX `fk_users_has_groups_groups1_idx` (`groups_id` ASC),
  INDEX `fk_users_has_groups_users1_idx` (`users_id` ASC),
  CONSTRAINT `fk_users_has_groups_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `messaging_web_app_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_groups_groups1`
    FOREIGN KEY (`groups_id`)
    REFERENCES `messaging_web_app_db`.`groups` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `messaging_web_app_db`.`friends`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `messaging_web_app_db`.`friends` ;

CREATE TABLE IF NOT EXISTS `messaging_web_app_db`.`friends` (
  `user_id_0` VARCHAR(36) NOT NULL,
  `user_id_1` VARCHAR(36) NOT NULL,
  `creation_time` TIMESTAMP NOT NULL,
  `deletion_time` TIMESTAMP NULL,
  `active` TINYINT(1) NOT NULL,
  PRIMARY KEY (`user_id_0`, `user_id_1`),
  INDEX `fk_users_has_users_users2_idx` (`user_id_1` ASC),
  INDEX `fk_users_has_users_users1_idx` (`user_id_0` ASC),
  CONSTRAINT `fk_users_has_users_users1`
    FOREIGN KEY (`user_id_0`)
    REFERENCES `messaging_web_app_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_users_users2`
    FOREIGN KEY (`user_id_1`)
    REFERENCES `messaging_web_app_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `messaging_web_app_db`.`tokens`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `messaging_web_app_db`.`tokens` ;

CREATE TABLE IF NOT EXISTS `messaging_web_app_db`.`tokens` (
  `id` VARCHAR(36) NOT NULL,
  `value` VARCHAR(36) NOT NULL,
  `type` VARCHAR(10) NOT NULL,
  `expiration_time` TIMESTAMP NOT NULL,
  `active` VARCHAR(45) NOT NULL,
  `user_id` VARCHAR(36) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tokens_users1_idx` (`user_id` ASC),
  CONSTRAINT `fk_tokens_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `messaging_web_app_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


-- DEFAULT DATA
INSERT INTO friends		SET user_id_0="bb686737-5080-11e9-809c-b827eb4f1633", user_id_1="f319ca59-5080-11e9-809c-b827eb4f1633", creation_time=CURRENT_TIMESTAMP(), active=1;
INSERT INTO groups 		SET id="0000-0000-0000-0000-0000", creation_time=CURRENT_TIMESTAMP(), name="Nicolas Maitre, Nicolas Glassey", type="private", active=1;
INSERT INTO user_groups SET users_id="bb686737-5080-11e9-809c-b827eb4f1633", groups_id="0000-0000-0000-0000-0000", creation_time=CURRENT_TIMESTAMP(), active=1;
INSERT INTO user_groups SET users_id="f319ca59-5080-11e9-809c-b827eb4f1633", groups_id="0000-0000-0000-0000-0000", creation_time=CURRENT_TIMESTAMP(), active=1;
INSERT INTO tokens SET id=UUID(), value='2345-2345-2345-2345-2345', type='session', expiration_time=0, active=1, user_id='f319ca59-5080-11e9-809c-b827eb4f1633';