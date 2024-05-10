CREATE TABLE item (
    item_id SERIAL PRIMARY KEY,
    item_name text NOT NULL,
    description text NOT NULL,
    created_at timestamptz DEFAULT now(),
    created_by integer REFERENCES app_user(user_id) NOT NULL,
    house_id integer REFERENCES house ON DELETE CASCADE NOT NULL,
    room_id integer REFERENCES room
);