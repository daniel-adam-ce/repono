CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    email text
);


INSERT INTO users (email) VALUES ('test@gmail.com'), ('test2@gmail.com');