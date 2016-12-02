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

INSERT INTO target (title, slug) values ('Jesus' , 'Jesus');

INSERT INTO target (title, slug) values ('UEFA Champions League' , 'UEFA_Champions_League');

INSERT INTO target (title, slug) values ('World Trade Organization' , 'World_Trade_Organization');

INSERT INTO target (title, slug) values ('Skyscraper' , 'Skyscraper');

INSERT INTO target (title, slug) values ('Basketball' , 'Basketball');

INSERT INTO target (title, slug) values ('Hollywood' , 'Hollywood');

INSERT INTO target (title, slug) values ('Albert Einstein' , 'Albert_Einstein');

INSERT INTO target (title, slug) values ('North Pole' , 'North_Pole');

INSERT INTO target (title, slug) values ('Harvard University' , 'Harvard_University');

INSERT INTO target (title, slug) values ('Queen Victoria' , 'Queen_Victoria');

INSERT INTO target (title, slug) values ('Air France' , 'Air_France');

INSERT INTO target (title, slug) values ('Microsoft Windows' , 'Microsoft_Windows');

INSERT INTO target (title, slug) values ('RMS Titanic' , 'RMS_Titanic');

INSERT INTO target (title, slug) values ('Billy Joel' , 'Billy_Joel');

INSERT INTO target (title, slug) values ('Justin Bieber' , 'Justin_Bieber');

INSERT INTO target (title, slug) values ('Falafel' , 'Falafel');

INSERT INTO target (title, slug) values ('Lionel Messi' , 'Lionel_Messi');

INSERT INTO target (title, slug) values ('Giraffe' , 'Giraffe');

INSERT INTO target (title, slug) values ('Book of Genesis' , 'Book_of_Genesis');

INSERT INTO target (title, slug) values ('Heathrow Airport' , 'Heathrow_Airport');

INSERT INTO target (title, slug) values ('SkyTrain (Vancouver)' , 'SkyTrain_(Vancouver)');

INSERT INTO target (title, slug) values ('The Beatles' , 'The_Beatles');

INSERT INTO target (title, slug) values ('Ferrari' , 'Ferrari');

INSERT INTO target (title, slug) values ('Rihana' , 'Rihana');

INSERT INTO target (title, slug) values ('Oxford University' , 'University_of_Oxford');

INSERT INTO target (title, slug) values ('Tea Bag' , 'Tea_bag');

INSERT INTO target (title, slug) values ('Champagne' , 'Champagne');

INSERT INTO target (title, slug) values ('James Bond' , 'James_Bond');

INSERT INTO target (title, slug) values ('Android (Operating System)' , 'Android_(operating_system)');

INSERT INTO target (title, slug) values ('iPhone' , 'IPhone');

INSERT INTO target (title, slug) values ('BMW' , 'BMW');

INSERT INTO target (title, slug) values ('H&M' , 'H%26M');

INSERT INTO target (title, slug) values ('IKEA' , 'IKEA');

INSERT INTO target (title, slug) values ('Lord Of the Rings' , 'The_Lord_of_the_Rings');

INSERT INTO target (title, slug) values ('Facebook' , 'Facebook');

INSERT INTO target (title, slug) values ('Grand Canyon' , 'Grand_Canyon');

INSERT INTO target (title, slug) values ('Taj Mahal' , 'Taj_Mahal');

INSERT INTO target (title, slug) values ('Pasta' , 'Pasta');

INSERT INTO target (title, slug) values ('Jerusalem' , 'Jerusalem');

INSERT INTO target (title, slug) values ('Seinfeld' , 'Seinfeld');

INSERT INTO target (title, slug) values ('Empire State Building' , 'Empire_State_Building');

INSERT INTO target (title, slug) values ('Horsepower' , 'Horsepower');

INSERT INTO target (title, slug) values ('Criminal Law' , 'Criminal_law');

INSERT INTO target (title, slug) values ('Tokyo' , 'Tokyo');

INSERT INTO target (title, slug) values ('Desert' , 'Desert');

INSERT INTO target (title, slug) values ('U2' , 'U2');

INSERT INTO target (title, slug) values ('Tourism' , 'Tourism');

INSERT INTO target (title, slug) values ('The Lion King' , 'The_Lion_King');

INSERT INTO target (title, slug) values ('Psychology' , 'Psychology');

INSERT INTO target (title, slug) values ('Casino' , 'Casino');

INSERT INTO target (title, slug) values ('Andrea Bocelli' , 'Andrea_Bocelli');

INSERT INTO target (title, slug) values ('Saxophone' , 'Saxophone');

INSERT INTO target (title, slug) values ('Celine Dion' , 'Celine_Dion');

INSERT INTO target (title, slug) values ('Julius Caesar' , 'Julius_Caesar');

INSERT INTO target (title, slug) values ('Michael Jordan' , 'Michael_Jordan');

INSERT INTO target (title, slug) values ('Pablo Picasso' , 'Pablo_Picasso');

INSERT INTO target (title, slug) values ('Dan Brown' , 'Dan_Brown');

INSERT INTO target (title, slug) values ('Michael Phelps' , 'Michael_Phelps');

INSERT INTO target (title, slug) values ('Serena Williams' , 'Serena_Williams');

INSERT INTO target (title, slug) values ('Hussein Of Jordan' , 'Hussein_of_Jordan');

INSERT INTO target (title, slug) values ('Martin Luther King Jr. ' , 'Martin_Luther_King_Jr.');

INSERT INTO target (title, slug) values ('Cha-cha-cha_(dance)' , 'Cha-cha-cha_(dance)');

INSERT INTO target (title, slug) values ('Melodica' , 'Melodica');

INSERT INTO target (title, slug) values ('Gliding' , 'Gliding');

INSERT INTO target (title, slug) values ('Goldsmith' , 'Goldsmith');

INSERT INTO target (title, slug) values ('Shrek' , 'Shrek');

INSERT INTO target (title, slug) values ('Stairway to heaven' , 'Stairway_to_Heaven');

INSERT INTO target (title, slug) values ('Rigoletto' , 'Rigoletto');

INSERT INTO target (title, slug) values ('Jeans' , 'Jeans');

INSERT INTO target (title, slug) values ('Arecaceae' , 'Arecaceae');

INSERT INTO target (title, slug) values ('Soybean' , 'Soybean');

INSERT INTO target (title, slug) values ('Raccoon' , 'Raccoon');

INSERT INTO target (title, slug) values ('Nile' , 'Nile');

INSERT INTO target (title, slug) values ('Airbus' , 'Airbus');

INSERT INTO target (title, slug) values ('Chinese New Year' , 'Chinese New Year');

INSERT INTO target (title, slug) values ('Hanukkah' , 'Hanukkah');

INSERT INTO target (title, slug) values ('Solomon' , 'Solomon');

INSERT INTO target (title, slug) values ('Credit Card' , 'Credit_card');

INSERT INTO target (title, slug) values ('Thomas Edison' , 'Thomas_Edison');

INSERT INTO target (title, slug) values ('Boeing 747' , 'Boeing_747');

INSERT INTO target (title, slug) values ('Port of Hong Kong' , 'Port_of_Hong_Kong');

INSERT INTO target (title, slug) values ('Subaru' , 'Subaru');

INSERT INTO target (title, slug) values ('Acupuncture' , 'Acupuncture');

INSERT INTO target (title, slug) values ('Yale University' , 'Yale_University');

INSERT INTO target (title, slug) values ('Alexander the Great' , 'Alexander_the_Great');

INSERT INTO target (title, slug) values ('Passiflora edulis' , 'Passiflora_edulis');

INSERT INTO target (title, slug) values ('Shark' , 'Shark');

INSERT INTO target (title, slug) values ('Kurds' , 'Kurds');

INSERT INTO target (title, slug) values ('Addis Ababa' , 'Addis_Ababa');

INSERT INTO target (title, slug) values ('Adele' , 'Adele');

INSERT INTO target (title, slug) values ('Chris Rock' , 'Chris_Rock');

INSERT INTO target (title, slug) values ('Yoga' , 'Yoga');

INSERT INTO target (title, slug) values ('King David' , 'David');

INSERT INTO target (title, slug) values ('Angela Merkel' , 'Angela_Merkel');

INSERT INTO target (title, slug) values ('USB' , 'USB');

INSERT INTO target (title, slug) values ('Bowling' , 'Bowling');

INSERT INTO target (title, slug) values ('Orchestra' , 'Orchestra');

INSERT INTO target (title, slug) values ('Tuxedo' , 'Tuxedo');

INSERT INTO target (title, slug) values ('Poodle' , 'Poodle');

INSERT INTO target (title, slug) values ('Star Wars' , 'Star_Wars');

INSERT INTO target (title, slug) values ('Physics' , 'Physics');

INSERT INTO target (title, slug) values ('Mount Everest' , 'Mount_Everest');

INSERT INTO target (title, slug) values ('Indian Ocean' , 'Indian_Ocean');

INSERT INTO target (title, slug) values ('Jules Verne' , 'Jules_Verne');

INSERT INTO target (title, slug) values ('Plato' , 'Plato');

INSERT INTO target (title, slug) values ('Casablanca' , 'Casablanca');

INSERT INTO target (title, slug) values ('Belize' , 'Belize');

INSERT INTO target (title, slug) values ('European Union' , 'European_Union');


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
    `title` VARCHAR(255),
    `time` TIMEStAMP,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`gameId`) REFERENCES  `game` (`id`),
    FOREIGN KEY (`playerId`) REFERENCES `player` (`id`)
);



/*This creates a foreign key to the game table */
ALTER TABLE `game` ADD FOREIGN KEY (`finalStep`) REFERENCES `step` (`id`);





/* This space is resevred for some sample data to be added on later */