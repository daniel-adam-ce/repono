ALTER TABLE house_user ADD CONSTRAINT unique_user UNIQUE (user_id, house_id);
ALTER TABLE app_user ADD CONSTRAINT unique_email UNIQUE (email);