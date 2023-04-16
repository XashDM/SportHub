-- -----------------------------------------------------
-- Insert admin and user accounts to `User` table
-- -----------------------------------------------------
INSERT INTO `SportHub`.`User` (`UserId`, `Email`, `Password`, `FirstName`, `LastName`, `IsAdmin`, `IsActivated`) VALUES ('testUserId', 'testUserEmail@gmail.com', 'testUserPassword', 'Oleh', 'User', '0', '0');
INSERT INTO `SportHub`.`User` (`UserId`, `Email`, `Password`, `FirstName`, `LastName`, `IsAdmin`, `IsActivated`) VALUES ('testAdminId', 'testAdminEmail@gmail.com', 'testAdminPassword', 'Andriy', 'Admin', '1', '0');

-- -----------------------------------------------------
-- Insert admin and user refresh tokens to `RefreshToken` table
-- -----------------------------------------------------

INSERT INTO `SportHub`.`Token` (`RefreshToken`, `UserId`) VALUES ('testUserRefreshToken', 'testUserId');
INSERT INTO `SportHub`.`Token` (`RefreshToken`, `UserId`) VALUES ('testAdminRefreshToken', 'testAdminId');
