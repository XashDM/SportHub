----------------------------------------------------------------
-- Insert admin and user accounts to `User` table
----------------------------------------------------------------
INSERT INTO `SportHub`.`User` (`UserId`, `Email`, `Password`, `FirstName`, `LastName`, `IsAdmin`, `IsActivated`) 
VALUES ('05689d08-13b3-49c1-b919-d01ebb2e0251', 'testUserEmail@gmail.com', 'testUserPassword', 'Oleh', 'User', '0', '1');
INSERT INTO `SportHub`.`User` (`UserId`, `Email`, `Password`, `FirstName`, `LastName`, `IsAdmin`, `IsActivated`) 
VALUES ('17442d08-13b3-49c1-b919-d01ebb2e0251', 'testAdminEmail@gmail.com', 'testAdminPassword', 'Andriy', 'Admin', '1', '1');

----------------------------------------------------------------
-- Insert admin and user refresh tokens to `RefreshToken` table
----------------------------------------------------------------

INSERT INTO `SportHub`.`Token` (`RefreshToken`, `UserId`) 
VALUES ('testUserRefreshToken', '05689d08-13b3-49c1-b919-d01ebb2e0251');
INSERT INTO `SportHub`.`Token` (`RefreshToken`, `UserId`) 
VALUES ('testAdminRefreshToken', '17442d08-13b3-49c1-b919-d01ebb2e0251');

----------------------------------------------------------------
-- Insert languages to `Language` table
----------------------------------------------------------------

INSERT INTO `sporthub`.`language` (`LanguageId`, `ShortTitle`, `IsActive`)
VALUES ('0730ca73-567b-44a6-8a6e-e2edac090e2d', 'en', true);

INSERT INTO `sporthub`.`language` (`LanguageId`, `ShortTitle`, `IsActive`)
VALUES ('30a89530-a01b-48f7-8e39-61ee2b251e1c', 'ua', false);

----------------------------------------------------------------
-- Insert categories to `Categories` table
----------------------------------------------------------------

INSERT INTO `sporthub`.`categories` (`CategoryId`, `CategoryName`)
VALUES ('b652fe1c-626a-4bf8-be17-333d84d35327', 'NBA');

INSERT INTO `sporthub`.`categories` (`CategoryId`, `CategoryName`)
VALUES ('01c40c5f-d849-4a68-b13e-fc8a4b3342cb', 'NFL');

INSERT INTO `sporthub`.`categories` (`CategoryId`, `CategoryName`)
VALUES ('d99a0777-ca67-462a-ac9b-753621a3eec6', 'MLB');

INSERT INTO `sporthub`.`categories` (`CategoryId`, `CategoryName`)
VALUES ('5f5a4869-1276-4e9b-bc09-823aa828600c', 'CBB');

INSERT INTO `sporthub`.`categories` (`CategoryId`, `CategoryName`)
VALUES ('49864433-e285-46f9-8512-0344749a8f13', 'CFB');

INSERT INTO `sporthub`.`categories` (`CategoryId`, `CategoryName`)
VALUES ('160453c6-52b0-4eb9-8dee-47e3df2e7d1e', 'NASCAR');

INSERT INTO `sporthub`.`categories` (`CategoryId`, `CategoryName`)
VALUES ('754459b7-f64f-4824-afdb-e026049fbcac', 'GOLF');

INSERT INTO `sporthub`.`categories` (`CategoryId`, `CategoryName`)
VALUES ('7f3f21a5-a931-40be-9b6d-c698780a8df0', 'SOCCER');

----------------------------------------------------------------
-- Insert subcategories to `SubCategories` table
----------------------------------------------------------------

INSERT INTO `sporthub`.`subcategories` (`SubCategoryId`, `SubCategoryName`, `CategoryId`)
VALUES ('3f9d890f-8bb7-4e3d-a49c-7ff6df45e3a1', 'Eastern Conference', 'b652fe1c-626a-4bf8-be17-333d84d35327');

INSERT INTO `sporthub`.`subcategories` (`SubCategoryId`, `SubCategoryName`, `CategoryId`)
VALUES ('a5e3cbf4-9f8b-4c3d-84fa-2c73b9ae4c65', 'Western Conference', 'b652fe1c-626a-4bf8-be17-333d84d35327');

INSERT INTO `sporthub`.`subcategories` (`SubCategoryId`, `SubCategoryName`, `CategoryId`)
VALUES ('bf204e17-7e9a-4d8e-bd91-523c2d8d51e7', 'Atlantic Division', 'b652fe1c-626a-4bf8-be17-333d84d35327');

INSERT INTO `sporthub`.`subcategories` (`SubCategoryId`, `SubCategoryName`, `CategoryId`)
VALUES ('5d3d5427-958d-4c7e-85fc-c5e8a0eb82cf', 'AFC East', '01c40c5f-d849-4a68-b13e-fc8a4b3342cb');

INSERT INTO `sporthub`.`subcategories` (`SubCategoryId`, `SubCategoryName`, `CategoryId`)
VALUES ('2eef36ce-c167-4a5d-8e4d-df2d7512e274', 'AFC West', '01c40c5f-d849-4a68-b13e-fc8a4b3342cb');

INSERT INTO `sporthub`.`subcategories` (`SubCategoryId`, `SubCategoryName`, `CategoryId`)
VALUES ('a1d1189e-3081-4dd3-9ae9-42c8565cbdfb', 'NFC North', '01c40c5f-d849-4a68-b13e-fc8a4b3342cb');

INSERT INTO `sporthub`.`subcategories` (`SubCategoryId`, `SubCategoryName`, `CategoryId`)
VALUES ('5120134f-03a0-4ed4-a9d2-2a0a5a1dc688', 'American League', 'd99a0777-ca67-462a-ac9b-753621a3eec6');

INSERT INTO `sporthub`.`subcategories` (`SubCategoryId`, `SubCategoryName`, `CategoryId`)
VALUES ('f9e8d2d5-2877-48c5-9b9f-35ff02b38d53', 'National League', 'd99a0777-ca67-462a-ac9b-753621a3eec6');

INSERT INTO `sporthub`.`subcategories` (`SubCategoryId`, `SubCategoryName`, `CategoryId`)
VALUES ('b9f93d5c-1d7d-4a44-8e09-8c72c5f89e99', 'Premier League', '7f3f21a5-a931-40be-9b6d-c698780a8df0');

INSERT INTO `sporthub`.`subcategories` (`SubCategoryId`, `SubCategoryName`, `CategoryId`)
VALUES ('4ecf9769-c726-4f3e-b287-9f5e03a77a13', 'La Liga', '7f3f21a5-a931-40be-9b6d-c698780a8df0');

INSERT INTO `sporthub`.`subcategories` (`SubCategoryId`, `SubCategoryName`, `CategoryId`)
VALUES ('69715a45-8e36-4d44-87f7-c6f7c5b8b388', 'Bundesliga', '7f3f21a5-a931-40be-9b6d-c698780a8df0');

INSERT INTO `sporthub`.`subcategories` (`SubCategoryId`, `SubCategoryName`, `CategoryId`)
VALUES ('dbd9d20b-4d3f-48b7-9d7f-6f09f7f21b22', 'Cup Series', '160453c6-52b0-4eb9-8dee-47e3df2e7d1e');

INSERT INTO `sporthub`.`subcategories` (`SubCategoryId`, `SubCategoryName`, `CategoryId`)
VALUES ('17c36655-6cc6-4d43-a127-9a6923610b32', 'Xfinity Series', '160453c6-52b0-4eb9-8dee-47e3df2e7d1e');

INSERT INTO `sporthub`.`subcategories` (`SubCategoryId`, `SubCategoryName`, `CategoryId`)
VALUES ('f1e27dd1-511e-4e86-bf70-c25a1fe22c35', 'Truck Series', '160453c6-52b0-4eb9-8dee-47e3df2e7d1e');

----------------------------------------------------------------
-- Insert teams to `Teams` table
----------------------------------------------------------------

-- SubCategoryId = '17c36655-6cc6-4d43-a127-9a6923610b32' (Xfinity Series)
INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('ce5ad9e9-4c7b-4f83-89f4-07a9a54ac4cd', 'Team Xfinity 1', 'This is a team in the Xfinity Series.', '17c36655-6cc6-4d43-a127-9a6923610b32');

INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('581fbbf7-9a8a-4f80-8b46-8e89d3a7c396', 'Team Xfinity 2', 'This is another team in the Xfinity Series.', '17c36655-6cc6-4d43-a127-9a6923610b32');

INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('4e791a9e-df7d-4c99-9a86-9ff41864fc1e', 'Team Xfinity 3', 'This is a third team in the Xfinity Series.', '17c36655-6cc6-4d43-a127-9a6923610b32');

-- SubCategoryId = '2eef36ce-c167-4a5d-8e4d-df2d7512e274' (AFC West)
INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('c5a40e4f-2f7a-40d7-8e16-531a04dbf9ce', 'Denver Broncos', 'Denver Broncos is a professional football team based in Denver, Colorado.', '2eef36ce-c167-4a5d-8e4d-df2d7512e274');

INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('a4c26143-6c3e-4a3d-93af-61a2b14b1c75', 'Kansas City Chiefs', 'Kansas City Chiefs is a professional football team based in Kansas City, Missouri.', '2eef36ce-c167-4a5d-8e4d-df2d7512e274');

INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('b9a18041-4b69-45b4-8e46-9b08f31f7c6b', 'Las Vegas Raiders', 'Las Vegas Raiders is a professional football team based in Las Vegas, Nevada.', '2eef36ce-c167-4a5d-8e4d-df2d7512e274');

-- SubCategoryId = '4ecf9769-c726-4f3e-b287-9f5e03a77a13' (La Liga)
INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('7320d6d0-1f11-4f9f-b1a9-3bcdfb5e6b9e', 'Real Madrid', 'Real Madrid is a professional soccer team based in Madrid, Spain.', '4ecf9769-c726-4f3e-b287-9f5e03a77a13');

INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('f4d83655-4ac2-4e8e-8dd2-7c5fb35cbdc2', 'Barcelona', 'Barcelona is a professional soccer team based in Barcelona, Spain.', '4ecf9769-c726-4f3e-b287-9f5e03a77a13');

INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('be1f6db5-ba23-4a0a-8e35-3e55b09a3a48', 'Atletico Madrid', 'Atletico Madrid is a professional soccer team based in Madrid, Spain.', '4ecf9769-c726-4f3e-b287-9f5e03a77a13');

-- SubCategoryId = '5120134f-03a0-4ed4-a9d2-2a0a5a1dc688' (American League)
INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('5f13e9fd-f09b-4a16-b1f6-868e7141e2a9', 'New York Yankees', 'New York Yankees is a professional baseball team based in New York City.', '5120134f-03a0-4ed4-a9d2-2a0a5a1dc688');

INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('a568fa7c-3802-4f39-9e4c-6f3d5b4a56f9', 'Boston Red Sox', 'Boston Red Sox is a professional baseball team based in Boston, Massachusetts.', '5120134f-03a0-4ed4-a9d2-2a0a5a1dc688');

INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('edc6f27e-ee4f-45a0-bd83-cf10e94b29b4', 'Houston Astros', 'Houston Astros is a professional baseball team based in Houston, Texas.', '5120134f-03a0-4ed4-a9d2-2a0a5a1dc688');

-- SubCategoryId = '5d3d5427-958d-4c7e-85fc-c5e8a0eb82cf' (AFC East)
INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('45f60d12-8431-48d6-a127-6d4c3e742be0', 'New England Patriots', 'New England Patriots is a professional American football team based in Foxborough, Massachusetts.', '5d3d5427-958d-4c7e-85fc-c5e8a0eb82cf');

INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('07a7891f-1ef4-4e8b-9e5e-4e5f925ef16f', 'Buffalo Bills', 'Buffalo Bills is a professional American football team based in Buffalo, New York.', '5d3d5427-958d-4c7e-85fc-c5e8a0eb82cf');

INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('9c4ad5ff-f9eb-45f2-a9e1-96874084b2c4', 'Miami Dolphins', 'Miami Dolphins is a professional American football team based in Miami Gardens, Florida.', '5d3d5427-958d-4c7e-85fc-c5e8a0eb82cf');

-- SubCategoryId = '69715a45-8e36-4d44-87f7-c6f7c5b8b388' (Bundesliga)
INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('542af4e5-1090-4862-99dd-3e8591ed5f1b', 'Bayern Munich', 'Bayern Munich is a professional soccer team based in Munich, Germany.', '69715a45-8e36-4d44-87f7-c6f7c5b8b388');

INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('c3a29943-6476-468f-845f-c38ab835f2e6', 'Borussia Dortmund', 'Borussia Dortmund is a professional soccer team based in Dortmund, Germany.', '69715a45-8e36-4d44-87f7-c6f7c5b8b388');

INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('dc36b583-3d7d-4a23-b830-62de6d65bcfe', 'RB Leipzig', 'RB Leipzig is a professional soccer team based in Leipzig, Germany.', '69715a45-8e36-4d44-87f7-c6f7c5b8b388');

-- SubCategoryId = 'a1d1189e-3081-4dd3-9ae9-42c8565cbdfb' (NFC North)
INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('38be6a3f-9d34-4b1e-8ebf-d269ea090aba', 'Green Bay Packers', 'Green Bay Packers is a professional American football team based in Green Bay, Wisconsin.', 'a1d1189e-3081-4dd3-9ae9-42c8565cbdfb');

INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('ec2677ce-8a53-416e-b065-32dfe677b12e', 'Minnesota Vikings', 'Minnesota Vikings is a professional American football team based in Minneapolis, Minnesota.', 'a1d1189e-3081-4dd3-9ae9-42c8565cbdfb');

INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('dcd64263-122a-4e5f-877b-2ef01a201cd9', 'Chicago Bears', 'Chicago Bears is a professional American football team based in Chicago, Illinois.', 'a1d1189e-3081-4dd3-9ae9-42c8565cbdfb');

-- SubCategoryId = 'b9f93d5c-1d7d-4a44-8e09-8c72c5f89e99' (Premier League)
INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('d57d2ee8-2c7e-434d-9b55-55b1e8a2fdef', 'Manchester City', 'Manchester City is a professional soccer team based in Manchester, England.', 'b9f93d5c-1d7d-4a44-8e09-8c72c5f89e99');

INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('9cbbbd0f-7850-4218-a9b4-63efab1e9189', 'Liverpool', 'Liverpool is a professional soccer team based in Liverpool, England.', 'b9f93d5c-1d7d-4a44-8e09-8c72c5f89e99');

INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('40c7a833-6c08-4af0-9973-305d8b11aef2', 'Chelsea', 'Chelsea is a professional soccer team based in London, England.', 'b9f93d5c-1d7d-4a44-8e09-8c72c5f89e99');

-- SubCategoryId = 'bf204e17-7e9a-4d8e-bd91-523c2d8d51e7' (Atlantic Division)
INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('88d3f47c-7da9-4463-a7ed-1b2285d14b09', 'Boston Celtics', 'Boston Celtics is a professional basketball team based in Boston, Massachusetts.', 'bf204e17-7e9a-4d8e-bd91-523c2d8d51e7');

INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('fb8fb0f7-17a7-4dd2-9a61-6b9e272d19c9', 'Philadelphia 76ers', 'Philadelphia 76ers is a professional basketball team based in Philadelphia, Pennsylvania.', 'bf204e17-7e9a-4d8e-bd91-523c2d8d51e7');

INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('51de4a1c-ecb6-4b60-978d-5ab57e8f9357', 'Brooklyn Nets', 'Brooklyn Nets is a professional basketball team based in Brooklyn, New York.', 'bf204e17-7e9a-4d8e-bd91-523c2d8d51e7');

-- SubCategoryId = 'dbd9d20b-4d3f-48b7-9d7f-6f09f7f21b22' (Cup Series)
INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('e00c2e17-6f46-4fda-bc26-cc6e78ebe6c7', 'Team Cup 1', 'This is a team in the Cup Series.', 'dbd9d20b-4d3f-48b7-9d7f-6f09f7f21b22');

INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('6f9b287f-6b6a-4c0e-823e-dc3d2c3d2a8a', 'Team Cup 2', 'This is another team in the Cup Series.', 'dbd9d20b-4d3f-48b7-9d7f-6f09f7f21b22');

INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('3929af36-88bc-4c99-baf9-55454d2a87ed', 'Team Cup 3', 'This is a third team in the Cup Series.', 'dbd9d20b-4d3f-48b7-9d7f-6f09f7f21b22');

-- SubCategoryId = 'f1e27dd1-511e-4e86-bf70-c25a1fe22c35' (Truck Series)
INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('3f65bca6-cd13-47c3-ba0a-9a7b9b1ebe46', 'Truck Team 1', 'This is a team in the Truck Series.', 'f1e27dd1-511e-4e86-bf70-c25a1fe22c35');

INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('3c4a98b9-792f-4e19-9437-49e2be44b2c9', 'Truck Team 2', 'This is another team in the Truck Series.', 'f1e27dd1-511e-4e86-bf70-c25a1fe22c35');

INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('cc801e80-bef6-4bea-87e1-285fe1b7c7d7', 'Truck Team 3', 'This is a third team in the Truck Series.', 'f1e27dd1-511e-4e86-bf70-c25a1fe22c35');

-- SubCategoryId = 'f9e8d2d5-2877-48c5-9b9f-35ff02b38d53' (National League)
INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('7b4ab6d6-5d4f-4fe1-9322-4bc5ed74cc67', 'Team NL 1', 'This is a team in the National League.', 'f9e8d2d5-2877-48c5-9b9f-35ff02b38d53');

INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('963c6e76-56a5-44d4-a883-6e013d82846d', 'Team NL 2', 'This is another team in the National League.', 'f9e8d2d5-2877-48c5-9b9f-35ff02b38d53');

INSERT INTO `sporthub`.`teams` (`TeamId`, `TeamName`, `TeamDescription`, `SubCategoryId`)
VALUES ('e58f80f9-5fc5-48e1-98fe-d83a32efb89b', 'Team NL 3', 'This is a third team in the National League.', 'f9e8d2d5-2877-48c5-9b9f-35ff02b38d53');

----------------------------------------------------------------
-- Insert images to `Images` table
----------------------------------------------------------------

INSERT INTO `sporthub`.`images` (`ImageId`, `Url`, `Alt`)
VALUES ('ff09acfb-7d09-48d5-be1d-de77bae20723', 'https://www.nascar.com/wp-content/uploads/sites/7/2023/06/10/2023-june10-g56-car-2-main-image.jpg', 'Nascar LeMans');

INSERT INTO `sporthub`.`images` (`ImageId`, `Url`, `Alt`)
VALUES ('78d2223d-fd6a-4738-8754-147fa227a535', 'https://cdn.vox-cdn.com/thumbor/gR2KN8aVYMhsQtu-Zl4wDfJm3z4=/0x0:5124x3446/1200x800/filters:focal(2102x1250:2920x2068)/cdn.vox-cdn.com/uploads/chorus_image/image/72137144/1476356948.0.jpg', 'Nascar Truck League');

INSERT INTO `sporthub`.`images` (`ImageId`, `Url`, `Alt`)
VALUES ('57c88fd5-7bd9-4e29-8d0c-478086997c70', 'https://resources.premierleague.com/photos/2022/08/15/38db8684-2f83-48fc-b180-0450d5315751/MCIDM2223_2.jpg?width=1000&height=480', 'Manchester team');

----------------------------------------------------------------
-- Insert locations to `Locations` table
----------------------------------------------------------------

INSERT INTO `sporthub`.`locations` (`LocationId`, `LocationName`)
VALUES ('d6c1b2c7-d2d2-4e94-8e30-bdc9f3dc53f4', 'Daytona');

INSERT INTO `sporthub`.`locations` (`LocationId`, `LocationName`)
VALUES ('e207aa4e-162d-4e06-9c7d-227e54a9e4f3', 'France');

----------------------------------------------------------------
-- Insert articles to `Article` table
----------------------------------------------------------------

INSERT INTO `sporthub`.`articles` (`ArticleId`, `PublishingDate`, `AuthorId`, `ImageId`, `CategoryId`, `SubCategoryId`, `TeamId`, `LocationId`, `Published`, `ShowComments`)
VALUES ('c695cb5a-971e-4a4f-9b85-62f5d1469763', CURRENT_TIMESTAMP, '17442d08-13b3-49c1-b919-d01ebb2e0251', '57c88fd5-7bd9-4e29-8d0c-478086997c70', '7f3f21a5-a931-40be-9b6d-c698780a8df0', 'b9f93d5c-1d7d-4a44-8e09-8c72c5f89e99', 'd57d2ee8-2c7e-434d-9b55-55b1e8a2fdef', null, 1, 1);

INSERT INTO `sporthub`.`articles` (`ArticleId`, `PublishingDate`, `AuthorId`, `ImageId`, `CategoryId`, `SubCategoryId`, `TeamId`, `LocationId`, `Published`, `ShowComments`)
VALUES ('a9596f7b-6a44-4a1e-8f54-9b7a68d3f312', CURRENT_TIMESTAMP, '17442d08-13b3-49c1-b919-d01ebb2e0251', 'ff09acfb-7d09-48d5-be1d-de77bae20723', '160453c6-52b0-4eb9-8dee-47e3df2e7d1e', null, null, 'e207aa4e-162d-4e06-9c7d-227e54a9e4f3', 1, 1);

INSERT INTO `sporthub`.`articles` (`ArticleId`, `PublishingDate`, `AuthorId`, `ImageId`, `CategoryId`, `SubCategoryId`, `TeamId`, `LocationId`, `Published`, `ShowComments`)
VALUES ('a9596f7b-6a44-4a1e-8f14-4b7a68d3f312', CURRENT_TIMESTAMP, '17442d08-13b3-49c1-b919-d01ebb2e0251', '78d2223d-fd6a-4738-8754-147fa227a535', '160453c6-52b0-4eb9-8dee-47e3df2e7d1e', 'f1e27dd1-511e-4e86-bf70-c25a1fe22c35', null, 'd6c1b2c7-d2d2-4e94-8e30-bdc9f3dc53f4', 1, 1);

----------------------------------------------------------------
-- Insert article infos to `ArticleInfos` table
----------------------------------------------------------------

-- Англійська версія новини про Manchester City
INSERT INTO `sporthub`.`articleinfos` (`ArticleId`, `LanguageId`, `Title`, `Subtitle`, `MainText`)
VALUES ('c695cb5a-971e-4a4f-9b85-62f5d1469763', '0730ca73-567b-44a6-8a6e-e2edac090e2d', 'Manchester City Wins Premier League Title', 'Exciting Victory for Manchester City', 'Manchester City clinched the Premier League title with a stunning performance.');

-- Українська версія тієї ж новини про Manchester City
INSERT INTO `sporthub`.`articleinfos` (`ArticleId`, `LanguageId`, `Title`, `Subtitle`, `MainText`)
VALUES ('c695cb5a-971e-4a4f-9b85-62f5d1469763', '30a89530-a01b-48f7-8e39-61ee2b251e1c', 'Манчестер Сіті виграє чемпіонат Англії', 'Захоплива перемога для Манчестер Сіті', 'Манчестер Сіті виборов чемпіонський титул Прем\'єр-ліги захоплюючою грою.');

-- Англійська версія новини про виступ NASCAR авто у 24 годинах Леману
INSERT INTO `sporthub`.`articleinfos` (`ArticleId`, `LanguageId`, `Title`, `Subtitle`, `MainText`)
VALUES ('a9596f7b-6a44-4a1e-8f54-9b7a68d3f312', '0730ca73-567b-44a6-8a6e-e2edac090e2d', 'NASCAR Cars Shine at 24 Hours of Le Mans', 'Exciting Performance by NASCAR Cars', 'The NASCAR cars showcased their speed and endurance at the prestigious 24 Hours of Le Mans race.');

-- Українська версія тієї ж новини про виступ NASCAR авто у 24 годинах Леману
INSERT INTO `sporthub`.`articleinfos` (`ArticleId`, `LanguageId`, `Title`, `Subtitle`, `MainText`)
VALUES ('a9596f7b-6a44-4a1e-8f54-9b7a68d3f312', '30a89530-a01b-48f7-8e39-61ee2b251e1c', 'NASCAR Авто показали себе на 24 годинах Ле-Мана', 'Захоплюючий виступ авто NASCAR', 'Автомобілі NASCAR продемонстрували свою швидкість та витривалість на престижній гонці 24 години Ле-Мана.');

-- Англійська версія новини про гонку NASCAR Truck Series у Дайтоні
INSERT INTO `sporthub`.`articleinfos` (`ArticleId`, `LanguageId`, `Title`, `Subtitle`, `MainText`)
VALUES ('a9596f7b-6a44-4a1e-8f14-4b7a68d3f312', '0730ca73-567b-44a6-8a6e-e2edac090e2d', 'Exciting NASCAR Truck Series Race at Daytona', 'Thrilling Action and Intense Competition', 'The NASCAR Truck Series race at Daytona delivered an adrenaline-filled experience with thrilling action and intense competition.');

-- Українська версія тієї ж новини про гонку NASCAR Truck Series у Дайтоні
INSERT INTO `sporthub`.`articleinfos` (`ArticleId`, `LanguageId`, `Title`, `Subtitle`, `MainText`)
VALUES ('a9596f7b-6a44-4a1e-8f14-4b7a68d3f312', '30a89530-a01b-48f7-8e39-61ee2b251e1c', 'Захоплююча гонка NASCAR Truck Series у Дайтоні', 'Екшн і конкуренція на межі', 'Гонка NASCAR Truck Series у Дайтоні принесла захоплюючі емоції з екстремальним екшном та запеклою конкуренцією.');

