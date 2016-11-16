/* populating player */

/*
INSERT INTO player (sessionId, username) values ('2222','yaronc');

INSERT INTO player (sessionId, username) values ('2233','johnf');

INSERT INTO player (sessionId, username) values ('2244','jill455');

INSERT INTO player (sessionId, username) values ('2255','smithD');

INSERT INTO player (sessionId, username) values ('2266','evan344');

INSERT INTO player (sessionId, username) values ('2277','eltonJ');

INSERT INTO player (sessionId, username) values ('2288','airbiz');

INSERT INTO player (sessionId, username) values ('2299','northJ');
*/

/*populating status */

INSERT INTO status (description) values ('not_started');

INSERT INTO status (description) values ('in_progress');

INSERT INTO status (description) values ('finished');

/*populating game */

INSERT INTO game (adminId, slug, isPublic, startingURL, endURL ) values (1, 'http://www.something.com', 0,  'https://en.wikipedia.org/wiki/Wine', 'https://en.wikipedia.org/wiki/Iraq');

INSERT INTO game (adminId, slug, isPublic, startingURL, endURL ) values (3, 'http://www.something22.com', 1,  'https://en.wikipedia.org/wiki/kiwi', 'https://en.wikipedia.org/wiki/Arianespace');

INSERT INTO game (adminId, slug, isPublic, startingURL, endURL ) values (2, 'http://www.something11.com', 1, 'https://en.wikipedia.org/wiki/Moscow', 'https://en.wikipedia.org/wiki/Nestle');

INSERT INTO game (adminId, slug, isPublic, startingURL, endURL ) values (4, 'http://www.something23.com', 0 ,  'https://en.wikipedia.org/wiki/Disney', 'https://en.wikipedia.org/wiki/AngularJS');