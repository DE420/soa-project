CREATE TABLE IF NOT EXISTS guest (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    phone VARCHAR(50),
    address VARCHAR(255)
);