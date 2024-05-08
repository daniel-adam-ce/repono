CREATE TABLE room (
    room_id SERIAL PRIMARY KEY,
    room_name text NOT NULL,
    created_at timestamptz DEFAULT now(),
    created_by integer REFERENCES app_user(user_id),
    house_id integer REFERENCES house ON DELETE CASCADE
);