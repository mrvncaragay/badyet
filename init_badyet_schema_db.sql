-- MySQL Workbench Synchronization
-- Generated: 2019-05-21 11:37
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: Marv

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `badyet` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE IF NOT EXISTS `badyet`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `user_username_UNIQUE` (`username` ASC) INVISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `username_idx` (`username` ASC) INVISIBLE,
  INDEX `email_idx` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `badyet`.`categories` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `users_id` INT(11) NOT NULL,
  `title` VARCHAR(45) NULL DEFAULT 'UNTITLED',
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `income_id` INT(11) NOT NULL,
  `income_users_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `users_id`, `income_id`, `income_users_id`),
  INDEX `fk_categories_users_idx` (`users_id` ASC) VISIBLE,
  INDEX `fk_categories_income1_idx` (`income_id` ASC, `income_users_id` ASC) VISIBLE,
  CONSTRAINT `fk_categories_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `badyet`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_categories_income1`
    FOREIGN KEY (`income_id` , `income_users_id`)
    REFERENCES `badyet`.`income` (`id` , `users_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `badyet`.`items` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `label` VARCHAR(45) NULL DEFAULT 'Label",
  `planned_to_save` DECIMAL(4,2) NULL DEFAULT 00.00,
  `spent` DECIMAL(4,2) NULL DEFAULT 00.00,
  `items_col` VARCHAR(45) NULL DEFAULT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `categories_id` INT(11) NOT NULL,
  `categories_users_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `categories_id`, `categories_users_id`),
  INDEX `fk_items_categories1_idx` (`categories_id` ASC, `categories_users_id` ASC) VISIBLE,
  CONSTRAINT `fk_items_categories1`
    FOREIGN KEY (`categories_id` , `categories_users_id`)
    REFERENCES `badyet`.`categories` (`id` , `users_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `badyet`.`transactions` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `value` DECIMAL(1,2) NULL DEFAULT 0.00,
  `type` VARCHAR(3) NOT NULL,
  `transacton_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `items_id` INT(11) NOT NULL,
  `items_categories_id` INT(11) NOT NULL,
  `items_categories_users_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `items_id`, `items_categories_id`, `items_categories_users_id`),
  INDEX `fk_transactions_items1_idx` (`items_id` ASC, `items_categories_id` ASC, `items_categories_users_id` ASC) VISIBLE,
  CONSTRAINT `fk_transactions_items1`
    FOREIGN KEY (`items_id` , `items_categories_id` , `items_categories_users_id`)
    REFERENCES `badyet`.`items` (`id` , `categories_id` , `categories_users_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `badyet`.`income` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `month` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'budget for this Month',
  `users_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `users_id`),
  INDEX `fk_income_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_income_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `badyet`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
