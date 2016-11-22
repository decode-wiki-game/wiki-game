/*This file creates the whole databse architecture for the Wikirace game. We have 6 tables in total
storing the necessary data to operate the game.*/

/*(1) This creates the player table that holds information about the players.
id is the primary key, and userame must be unique (it could be randomly generated if needed)*/
CREATE TABLE `player` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `sessionId` VARCHAR(255) ,
    `username` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`)
);

/*This creates a table with the a few of the top referenced titles on Wikipedia so 
we can use them as destination pages */
CREATE TABLE `target` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255),
    `slug` VARCHAR(255),
    PRIMARY KEY (`id`)
);

/* Populate wiki_destination */
 
INSERT INTO target (title, slug) values ('Geographic coordinate system' , 'Geographic_coordinate_system');

INSERT INTO target (title, slug) values ('World War II' , 'World_War_II');

INSERT INTO target (title, slug) values ('New York City' , 'New_York_City');

INSERT INTO target (title, slug) values ('Marriage' , 'Marriage');

INSERT INTO target (title, slug) values ('Rock Music' , 'Rock_music');

INSERT INTO target (title, slug) values ('Population Density' , 'Population_density');

INSERT INTO target (title, slug) values ('Midfielder' , 'Midfielder');
 
INSERT INTO target (title, slug) values ('BBC' , 'BBC');

INSERT INTO target (title, slug) values ('United States Navy' , 'United_States_Navy');

INSERT INTO target (title, slug) values ('ZIP Code' , 'ZIP_Code');

INSERT INTO target (title, slug) values ('Ice Hockey' , 'Ice_hockey');

INSERT INTO target (title, slug) values ('Pinyin' , 'Pinyin');

INSERT INTO target (title, slug) values ('Jazz' , 'Jazz');

/*(2) This creates the game table that holds information about each and every game played.
finalStep is referenced from the step table in order to allow for easy querying of the winner.*/

CREATE TABLE `game` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `adminId` INT(11),
    `slug` VARCHAR(255),
    `isPublic` TINYINT(0),
    `gameStarted` DATETIME,
    `startTitle` VARCHAR(255),
    `startSlug` VARCHAR(255),
    `targetTitle` VARCHAR(255),
    `targetSlug` VARCHAR(255),
    `finalStep` INT(11),
    `createdAt` TIMESTAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`adminId`) REFERENCES `player` (`id`)
    
);

/*(3) This creates the status table that holds information about the possible statuses for each game.
They can be either 'not started' -1 , 'in progress'-2 , or 'finished' -3.*/
CREATE TABLE `status` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(255),
    PRIMARY KEY (`id`)
);

/*(4) This creates the connector game_status to describe the status of each game. */
CREATE TABLE `game_status` (
    `gameId` INT(11),
    `statusId` INT(11),
    FOREIGN KEY (`gameId`) REFERENCES  `game` (`id`),
    FOREIGN KEY (`statusId`) REFERENCES `status` (`id`)
);

/*(5) This creates the steps table that stores information about the steps taken by the players. */
CREATE TABLE `step` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `gameId` INT(11),
    `playerId` INT(11),
    `url` VARCHAR(255),
    `time` TIMEStAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`gameId`) REFERENCES  `game` (`id`),
    FOREIGN KEY (`playerId`) REFERENCES `player` (`id`)
);



/*This creates a foreign key to the game table */
ALTER TABLE `game` ADD FOREIGN KEY (`finalStep`) REFERENCES `step` (`id`);





/* This space is resevred for some sample data to be added on later */