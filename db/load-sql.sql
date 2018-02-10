\c mocha_chai_tv_shows_test

INSERT INTO shows(name, channel, genre, rating, explicit) VALUES ('Suits', 'USA Network', 'Drama', 3, false);
INSERT INTO shows(name, channel, genre, rating, explicit) VALUES ('Game of Thrones', 'HBO', 'Fantasy', 5, true);
INSERT INTO shows(name, channel, genre, rating, explicit) VALUES ('South Park', 'Comedy Central', 'Comedy', 4, true);
INSERT INTO shows(name, channel, genre, rating, explicit) VALUES ('Mad Men', 'AMC', 'Drama', 3, false);

\c mocha_chai_tv_shows

INSERT INTO shows(name, channel, genre, rating, explicit) VALUES ('Suits', 'USA Network', 'Drama', 3, false);
INSERT INTO shows(name, channel, genre, rating, explicit) VALUES ('Game of Thrones', 'HBO', 'Fantasy', 5, true);
INSERT INTO shows(name, channel, genre, rating, explicit) VALUES ('South Park', 'Comedy Central', 'Comedy', 4, true);
INSERT INTO shows(name, channel, genre, rating, explicit) VALUES ('Mad Men', 'AMC', 'Drama', 3, false);
