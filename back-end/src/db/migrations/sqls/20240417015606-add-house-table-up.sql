ALTER TABLE users RENAME TO app_user;
ALTER TABLE app_user RENAME COLUMN id TO user_id;
ALTER TABLE app_user ADD COLUMN created_at timestamptz;
ALTER TABLE app_user ALTER COLUMN created_at SET DEFAULT now();
ALTER TABLE app_user DROP COLUMN test;

CREATE TABLE house (
    house_id SERIAL PRIMARY KEY,
    house_name text NOT NULL,
    house_owner integer REFERENCES app_user(user_id),
    created_at timestamptz DEFAULT now()
);

CREATE TABLE house_user (
    user_id integer REFERENCES app_user ON DELETE CASCADE,
    house_id integer REFERENCES house ON DELETE CASCADE,
    created_at timestamptz DEFAULT now()
);

