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
  "score" INTEGER,
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