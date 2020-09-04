CREATE DATABASE foodtruckdb;

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "full_name" varchar,
  "google_id" varchar,
  "badge" JSON,
  "profile_photo_url" varchar,
  "created_at" timestamp
);

CREATE TABLE "trucks" (
  "id" SERIAL PRIMARY KEY,
  "full_name" varchar,
  "phone_number" int,
  "google_id" varchar,
  "qr_code" varchar,
  "logo" varchar,
  "food_genre" varchar,
  "blurb" varchar,
  "star_average" int,
  "open_time" datetime,
  "close_time" datetime,
  "latitude" "decimal(10, 8)",
  "longitude" "decimal(11, 8)",
  "created_at" timestamp
);

CREATE TABLE "upvotes" (
  "id_review" int,
  "id_user" int
);

CREATE TABLE "posts" (
  "id" SERIAL PRIMARY KEY,
  "id_truck" int,
  "title" varchar,
  "message" varchar,
  "photo" varchar,
  "created_at" timestamp
);

CREATE TABLE "reviews" (
  "id_user" int,
  "id_truck" int,
  "favorite" boolean,
  "review_title" varchar,
  "review_description" varchar,
  "review_star" int,
  "review_photo" varchar,
  "upvotes" int,
  "review_date" timestamp
);

CREATE TABLE "photos" (
  "id" SERIAL PRIMARY KEY,
  "id_truck" varchar,
  "url" varchar,
  "caption" varchar,
  "created_at" datetime
);

ALTER TABLE "posts" ADD FOREIGN KEY ("id_truck") REFERENCES "trucks" ("id");

ALTER TABLE "reviews" ADD FOREIGN KEY ("id_user") REFERENCES "users" ("id");

ALTER TABLE "reviews" ADD FOREIGN KEY ("id_truck") REFERENCES "trucks" ("id");

ALTER TABLE "photos" ADD FOREIGN KEY ("id_truck") REFERENCES "trucks" ("id");
