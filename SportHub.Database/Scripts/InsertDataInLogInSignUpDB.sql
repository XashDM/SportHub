-- -----------------------------------------------------
-- Insert admin and user accounts to `User` table
-- -----------------------------------------------------
INSERT INTO `SportHub`.`User` (`UserId`, `Email`, `Password`, `FirstName`, `LastName`, `IsAdmin`, `IsActivated`) VALUES ('testUserId', 'testUserEmail@gmail.com', 'testUserPassword', 'Oleh', 'User', '0', '1');
INSERT INTO `SportHub`.`User` (`UserId`, `Email`, `Password`, `FirstName`, `LastName`, `IsAdmin`, `IsActivated`) VALUES ('testAdminId', 'testAdminEmail@gmail.com', '12f3e4347b22b51fee888de9d2cb2f57c804076735cc63701f88662b5775451c', 'Andriy', 'Admin', '1', '1');

-- -----------------------------------------------------
-- Insert admin and user refresh tokens to `RefreshToken` table
-- -----------------------------------------------------

INSERT INTO `SportHub`.`Token` (`RefreshToken`, `UserId`) VALUES ('testUserRefreshToken', 'testUserId');
INSERT INTO `SportHub`.`Token` (`RefreshToken`, `UserId`) VALUES ('testAdminRefreshToken', 'testAdminId');
