-- create database 'notn'


CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (80) NOT NULL,
    "username" VARCHAR (256) UNIQUE NOT NULL,
    "phone" VARCHAR (64) NOT NULL,
    "authLevel" VARCHAR (64),
    "password" VARCHAR (1000) NOT NULL
);

--DROP TABLE "leagues";

CREATE TABLE "leagues" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR (256),
  "start" DATE,
  "end" DATE
);

--DROP TABLE "teams";

CREATE TABLE "teams" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR (256) NOT NULL,
  "captainId" INTEGER,
  "accessCode" TEXT
);

--DROP TABLE "locations";

CREATE TABLE "locations" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR (256)
);

--DROP TABLE "climbs";

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

--DROP TABLE "usersTeams";

CREATE TABLE "usersTeams" (
  "id" SERIAL PRIMARY KEY,
  "userId" INT REFERENCES "users",
  "teamId" INT REFERENCES "teams"
);

--DROP TABLE "leaguesTeams";

CREATE TABLE "leaguesTeams" (
  "id" SERIAL PRIMARY KEY, 
  "teamId" INT REFERENCES "teams",
  "leagueId" INT REFERENCES "leagues" ON DELETE CASCADE,
  "isPaid" BOOLEAN DEFAULT FALSE,
  "byeWeek" INTEGER
);

-- Locations

INSERT INTO "locations" ("name")
VALUES ('Overhang'), ('Slight Overhang'), ('Left Barrel'), ('Right Barrel'), ('Slab');


