CREATE TABLE "houses" (
    "id" bigserial PRIMARY KEY,
    "owner" bigint NOT NULL,
    "name" varchar NOT NULL,
    "created_at" timestamptz DEFAULT now()
);

CREATE TABLE "houses_users_map" (
    "user_id" bigint UNIQUE NOT NULL
);

CREATE TABLE "house_users" (
    "id" bigserial PRIMARY KEY,
    "user_id" bigint NOT NULL,
    "house_id" bigint NOT NULL,
    "created_at" timestamptz DEFAULT now()
);

CREATE INDEX ON "houses" ("owner");
CREATE INDEX ON "house_users" ("user_id");
CREATE INDEX ON "house_users" ("house_id");

ALTER TABLE "houses" ADD FOREIGN KEY ("owner") REFERENCES "houses_users_map" ("user_id");
ALTER TABLE "house_users" ADD FOREIGN KEY ("user_id") REFERENCES "houses_users_map" ("user_id");
ALTER TABLE "house_users" ADD FOREIGN KEY ("house_id") REFERENCES "houses" ("id");