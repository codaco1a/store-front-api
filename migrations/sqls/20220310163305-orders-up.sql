CREATE TABLE orders (id SERIAL PRIMARY KEY, human_id INTEGER REFERENCES users(id), stat VARCHAR(50));