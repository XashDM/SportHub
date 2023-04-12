-- -----------------------------------------------------
-- Insert admin and user accounts to `user` table
-- -----------------------------------------------------
INSERT INTO `SportHub`.`user` (`Id`, `Email`, `Password`, `FirstName`, `LastName`, `isAdmin`, `isActivated`) VALUES ('testUserId', 'testUserEmail@gmail.com', 'testUserPassword', 'Oleh', 'User', '0', '0');
INSERT INTO `SportHub`.`user` (`Id`, `Email`, `Password`, `FirstName`, `LastName`, `isAdmin`, `isActivated`) VALUES ('testAdminId', 'testAdminEmail', 'testAdminPassword', 'Andriy', 'Admin', '1', '0');

-- -----------------------------------------------------
-- Insert admin and user refresh tokens to `refreshToken` table
-- -----------------------------------------------------

INSERT INTO `SportHub`.`token` (`refreshToken`, `UserId`) VALUES ('testUserRefreshToken', 'testUserId');
INSERT INTO `SportHub`.`token` (`refreshToken`, `UserId`) VALUES ('testAdminRefreshToken', 'testAdminId');
