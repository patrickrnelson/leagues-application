-- create database 'notn'

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "email" VARCHAR (256) NOT NULL,
    "phone" VARCHAR (64) NOT NULL,
    "handicap" INTEGER,
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
  "captain" INTEGER,
  "is_paid" BOOLEAN DEFAULT FALSE,
  "league_id" INT REFERENCES "league"
);

CREATE TABLE "climbs" (
  "id" SERIAL PRIMARY KEY,
  "location" VARCHAR (256) NOT NULL,
  "color" VARCHAR (256) NOT NULL,
  "level" INTEGER,
  "score" INTEGER,
  "climb_date" DATE,
  "is_submitted" BOOLEAN DEFAULT FALSE,
  "week" VARCHAR (256),
  "user_id" INT REFERENCES "user"
);

CREATE TABLE "users_teams" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT REFERENCES "user",
  "team_id" INT REFERENCES "teams"
);

CREATE TABLE "scores" (
  "id" SERIAL PRIMARY KEY, 
  "team_id" INT REFERENCES "teams",
  "total_scores" INTEGER,
  "week" VARCHAR (256)
);