CREATE TABLE order_things(id SERIAL PRIMARY KEY, quantity INTEGER, order_id INTEGER REFERENCES orders(id), things_id INTEGER REFERENCES things(id));