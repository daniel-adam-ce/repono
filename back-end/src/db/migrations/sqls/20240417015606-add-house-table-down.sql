ALTER TABLE app_user RENAME TO users;
ALTER TABLE users RENAME COLUMN user_id TO id;
ALTER TABLE USERS DROP COLUMN created_at;

DROP TABLE house_user;

DROP TABLE house;
