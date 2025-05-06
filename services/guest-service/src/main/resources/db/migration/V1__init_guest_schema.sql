CREATE TABLE IF NOT EXISTS guest (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    phone VARCHAR(50),
    address VARCHAR(255)
);

-- Set the starting value for the sequence used by the 'id' column
ALTER SEQUENCE guest_id_seq RESTART WITH 10000001;