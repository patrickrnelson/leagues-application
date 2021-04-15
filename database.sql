-- create database 'notn'

CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80) NOT NULL,
    "username" VARCHAR (256) UNIQUE NOT NULL,
    "phone" VARCHAR (64) NOT NULL,
    "authLevel" INTEGER,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "leagues" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR (256),
  "start" DATE,
  "end" DATE
);

CREATE TABLE "teams" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR (256) NOT NULL,
  "captainId" INTEGER,
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
  "climbDate" DATE NOT NULL DEFAULT CURRENT_DATE,
  "isSubmitted" BOOLEAN DEFAULT FALSE,
  "userId" INT REFERENCES "users"
);

CREATE TABLE "usersTeams" (
  "id" SERIAL PRIMARY KEY,
  "userId" INT REFERENCES "users",
  "teamId" INT REFERENCES "teams"
);

CREATE TABLE "leaguesTeams" (
  "id" SERIAL PRIMARY KEY, 
  "teamId" INT REFERENCES "teams",
  "leagueId" INT REFERENCES "leagues",
  "isPaid" BOOLEAN DEFAULT FALSE,
  "byeWeek" DATE
);

--- Test Data

-- League

INSERT INTO "leagues" ("name", "start", "end")
VALUES ('Cullen', '04-12-2021', '06-07-2021'),
        ('Fall', '10-12-2020', '12-10-2020'),
        ('Spring', '3-10-2020', '05-08-2020');

-- User

INSERT INTO "users" ("name", "username", "phone", "password")
VALUES ('Alvin', 'myemail1@myemail.com', '555-555-5555', 'passcode');

INSERT INTO "users" ("name", "username", "phone", "password")
VALUES ('Patrick', 'myemail2@myemail.com', '555-555-5555', 'passcode');

INSERT INTO "users" ("name", "username", "phone", "password")
VALUES ('John', 'myemail3@myemail.com', '555-555-5555', 'passcode');

INSERT INTO "users" ("name", "username", "phone", "password")
VALUES ('Johnny', 'myemail4@myemail.com', '555-555-5555', 'passcode');

INSERT INTO "users" ("name", "username", "phone", "password")
VALUES ('Zach', 'myemail5@myemail.com', '555-555-5555', 'passcode');

INSERT INTO "users" ("name", "username", "phone", "password")
VALUES ('Jon', 'myemail6@myemail.com', '555-555-5555', 'passcode');

-- Team

INSERT INTO "teams" ("name", "captainId", "accessCode")
VALUES ('Boulder Brigade', '1', 'HKGKDN');

INSERT INTO "teams" ("name", "captainId", "accessCode")
VALUES ('Stepping Stones', '6', 'EKFNEG');

INSERT INTO "leaguesTeams" ("teamId", "leagueId", "isPaid")
VALUES ('1', '1', 'TRUE');

INSERT INTO "leaguesTeams" ("teamId", "leagueId", "isPaid")
VALUES ('2', '1', 'FALSE');

INSERT INTO "usersTeams" ("userId", "teamId")
VALUES ('1', '1'), ('2', '1'), ('3', '1'), ('4', '1'), ('5', '1');

INSERT INTO "usersTeams" ("userId", "teamId")
VALUES ('6', '2');

-- Locations

INSERT INTO "locations" ("name")
VALUES ('Overhang'), ('Slight Overhang'), ('Left Barrel'), ('Right Barrel'), ('Slab');

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