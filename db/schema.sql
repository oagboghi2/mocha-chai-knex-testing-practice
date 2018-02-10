DROP DATABASE IF EXISTS mocha_chai_tv_shows;
CREATE DATABASE mocha_chai_tv_shows;
DROP DATABASE IF EXISTS mocha_chai_tv_shows_test;
CREATE DATABASE mocha_chai_tv_shows_test;
DROP TABLE shows;

\c mocha_chai_tv_shows


CREATE TABLE shows(
          ID  SERIAL PRIMARY KEY,
       name VARCHAR(256),
    channel VARCHAR(256),
      genre VARCHAR(256),
     rating INTEGER,
   explicit BOOLEAN
  );

  \c mocha_chai_tv_shows_test

  CREATE TABLE shows(
            ID  SERIAL PRIMARY KEY,
         name VARCHAR(256),
      channel VARCHAR(256),
        genre VARCHAR(256),
       rating INTEGER,
     explicit BOOLEAN
    );
