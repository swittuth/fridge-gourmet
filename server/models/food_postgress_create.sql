-- DROP TABLE IF EXISTS ingredients;
-- DROP TABLE IF EXISTS meal;
-- DROP TABLE IF EXISTS meal_ingred;
-- DROP TABLE IF EXISTS food_categories;
-- DROP TABLE IF EXISTS ingred_categories;

CREATE TABLE ingredients (
  "id" int NOT NULL,
  "name" varchar NOT NULL,
  CONSTRAINT "ingredients_pk0" PRIMARY KEY ("id")
);

CREATE TABLE meal (
  "id" int NOT NULL,
  "name" varchar NOT NULL,
  "category" varchar,
  "area" varchar,
  "image" varchar,
  "youtube" varchar,
  "source" varchar,
  "instructions" varchar,
  CONSTRAINT "meal_pk0" PRIMARY KEY ("id")
);

CREATE TABLE meal_ingred (
  "meal_id" int NOT NULL,
  "ingred_id" int NOT NULL,
  "measuremant" varchar,
  CONSTRAINT "meal_ingred_fk0" FOREIGN KEY ("ingred_id") REFERENCES ingredients("id"),
  CONSTRAINT "meal_ingred_fk1" FOREIGN KEY ("meal_id") REFERENCES meal("id")
);

CREATE TABLE food_categories (
  "id" int NOT NULL,
  "name" varchar NOT NULL,
  CONSTRAINT "food_categories_pk0" PRIMARY KEY ("id")
);

CREATE TABLE ingred_categories (
  "ingred_id" int NOT NULL,
  "category_id" int NOT NULL,
  CONSTRAINT "ingred_categories_fk0" FOREIGN KEY ("ingred_id") REFERENCES ingredients("id"),
  CONSTRAINT "ingred_categories_fk1" FOREIGN KEY ("category_id") REFERENCES food_categories("id")
)

-- Create database for User information
CREATE TABLE users (
  "id" varchar NOT NULL,
  "name" varchar NOT NULL,
  CONSTRAINT "users_pk0" PRIMARY KEY ("id")
)