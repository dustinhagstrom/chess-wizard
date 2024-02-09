-- DROP ALL THE TABLES
DROP TABLE IF EXISTS "game";
DROP TABLE IF EXISTS "user_follower";
DROP TABLE IF EXISTS "user_stats";
DROP TABLE IF EXISTS "user";

-- DROP ENUM
DROP TYPE IF EXISTS "game_result";

------------------------------------------------- BEGIN CREATE TABLE ------------------------------------------------
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR(200) UNIQUE NOT NULL,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "avatar_obj_key" VARCHAR(250) DEFAULT 'newUser.png',
    "is_active" BOOLEAN NOT NULL DEFAULT TRUE
);

-- MAKE ENUM FOR THE 'winner' column of "game"
CREATE TYPE "game_result" AS ENUM
	('white', 'black', 'stalemate'); 

CREATE TABLE "game" (
    "id" SERIAL PRIMARY KEY,
    "user_id_white" INTEGER NOT NULL,
    "user_id_black" INTEGER NOT NULL,
    "winner" game_result,
    "moves" VARCHAR(7)[][],
    "session_code" VARCHAR(4) NOT NULL,
    FOREIGN KEY ("user_id_white") REFERENCES "user" ("id"),
    FOREIGN KEY ("user_id_black") REFERENCES "user" ("id")
);

CREATE TABLE "user_stats" (
    "user_id" INTEGER PRIMARY KEY,
    "won" INTEGER DEFAULT 0,
    "lost" INTEGER DEFAULT 0,
    "tied" INTEGER DEFAULT 0,
    FOREIGN KEY ("user_id") REFERENCES "user" ("id")
);

CREATE TABLE "user_follower" (
    "leader_id" INTEGER,
    "follower_id" INTEGER,
    "is_following" BOOL DEFAULT TRUE,
    PRIMARY KEY("leader_id", "follower_id"),
    FOREIGN KEY ("leader_id") REFERENCES "user" ("id"),
    FOREIGN KEY ("follower_id") REFERENCES "user" ("id")
);

-------------------------------------------------- END CREATE TABLE -------------------------------------------------


---------------------------------------------- BEGIN INSERT STATEMENTS ----------------------------------------------

----------------------------------------------- END INSERT STATEMENTS -----------------------------------------------

----------------------------------------------- BEGIN SELECT STATEMENTS ----------------------------------------------
SELECT "U"."username", "US"."won", "US"."lost", "US"."tied"
	FROM "user" AS "U" JOIN "user_stats" AS "US" ON "U"."id" = "US"."user_id"
	ORDER BY "US"."won" DESC LIMIT 10;
------------------------------------------------ END SELECT STATEMENTS -----------------------------------------------

------------------------------------------------ BEGIN PUT STATEMENTS -----------------------------------------------

-- The bracket notation is [lowerbound:upperbound]
-- The first set of brackets is starting element to ending element inclusive
-- This equals the first two elements of the parent array
-- The next brackets target only the first element of the nested array.
-- This targets the first move and sets it to the value listed
UPDATE "game" SET "moves"[1][1:2] = '{"e5", "e4"}'
	WHERE "id" = 1;

------------------------------------------------- END PUT STATEMENTS ------------------------------------------------

----------------------------------------------- BEGIN DELETE STATEMENTS ---------------------------------------------

------------------------------------------------ END DELETE STATEMENTS ----------------------------------------------