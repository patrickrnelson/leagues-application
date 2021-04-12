-- create database 'notn'

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80) NOT NULL,
    "username" VARCHAR (256) UNIQUE NOT NULL,
    "phone" VARCHAR (64) NOT NULL,
    "authLevel" INTEGER,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "league" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR (256),
  "start" DATE,
  "end" DATE
);

CREATE TABLE "teams" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR (256) NOT NULL,
  "captainId" INTEGER,
  "leagueId" INT REFERENCES "league",
  "accessCode" TEXT
);

CREATE TABLE "locations" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR (256)
);

CREATE TABLE "climbs" (
  "id" SERIAL PRIMARY KEY,
  "locationId" INT REFERENCES "locations",
  "color" VARCHAR (256) NOT NULL,
  "level" INTEGER,
  "attempts" INTEGER,
  "climbDate" DATE,
  "isSubmitted" BOOLEAN DEFAULT FALSE,
  "userId" INT REFERENCES "user"
);

CREATE TABLE "usersTeams" (
  "id" SERIAL PRIMARY KEY,
  "userId" INT REFERENCES "user",
  "teamId" INT REFERENCES "teams"
);

CREATE TABLE "leagueTeams" (
  "id" SERIAL PRIMARY KEY, 
  "teamId" INT REFERENCES "teams",
  "leagueId" INT REFERENCES "league",
  "isPaid" BOOLEAN DEFAULT FALSE
);

--- Test Data

-- League

INSERT INTO "league" ("name", "start", "end")
VALUES ('Cullen', '04-12-2021', '06-07-2021');

-- User

INSERT INTO "user" ("name", "username", "phone", "password")
VALUES ('Alvin', 'myemail1@myemail.com', '555-555-5555', 'passcode');

INSERT INTO "user" ("name", "username", "phone", "password")
VALUES ('Patrick', 'myemail2@myemail.com', '555-555-5555', 'passcode');

INSERT INTO "user" ("name", "username", "phone", "password")
VALUES ('John', 'myemail3@myemail.com', '555-555-5555', 'passcode');

INSERT INTO "user" ("name", "username", "phone", "password")
VALUES ('Johnny', 'myemail4@myemail.com', '555-555-5555', 'passcode');

INSERT INTO "user" ("name", "username", "phone", "password")
VALUES ('Zach', 'myemail5@myemail.com', '555-555-5555', 'passcode');

INSERT INTO "user" ("name", "username", "phone", "password")
VALUES ('Jon', 'myemail6@myemail.com', '555-555-5555', 'passcode');

-- Team

INSERT INTO "teams" ("name", "captainId", "leagueId", "accessCode")
VALUES ('Boulder Brigade', '1', '1', 'egdav15ea2v5e12af');

INSERT INTO "teams" ("name", "captainId", "leagueId", "accessCode")
VALUES ('Stepping Stones', '6', '1', 'fe123da58ef15gn5u');

INSERT INTO "leagueTeams" ("teamId", "leagueId", "isPaid")
VALUES ('1', '1', 'TRUE');

INSERT INTO "leagueTeams" ("teamId", "leagueId", "isPaid")
VALUES ('2', '1', 'FALSE');

INSERT INTO "usersTeams" ("userId", "teamId")
VALUES ('1', '1'), ('2', '1'), ('3', '1'), ('4', '1'), ('5', '1');

INSERT INTO "usersTeams" ("userId", "teamId")
VALUES ('6', '2');

-- Locations

INSERT INTO "locations" ("name")
VALUES ('overhang'), ('slight overhang'), ('left barrel'), ('right barrel'), ('slab');

-- climbs

INSERT INTO "climbs" ("locationId", "color", "level", "attempts", "climbDate", "userId")
VALUES ('1', 'red', '6', '5', '04-23-2021', '1'),
		('2', 'blue', '7', '9', '04-23-2021', '1'),
		('3', 'green', '5', '4', '04-23-2021', '2'),
		('4', 'blue', '6', '10', '04-23-2021', '2'),
		('1', 'red', '8', '8', '04-23-2021', '3'),
		('2', 'green', '9', '4', '04-23-2021', '3'),
		('5', 'red', '4', '2', '04-23-2021', '4'),
		('3', 'blue', '3', '1', '04-23-2021', '4'),
		('4', 'green', '7', '12', '04-23-2021', '5'),
		('1', 'blue', '5', '4', '04-23-2021', '5');