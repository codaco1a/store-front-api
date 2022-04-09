## Routes:

    app.get('/users', auth, users)
    app.get('/users/:id', auth, info)
    app.post('/users/sign-up', sign_up)
    app.post('/users/login', sign_in)

    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products/add', auth, create)
    app.put('/products/update', auth, update)
    app.delete('/products/:id/delete', auth, d)

    app.post('/orders/create', auth, createOrder)
    app.post('/orders/:id/products', auth, placeOrder)

## DB Schema:

orders (id SERIAL PRIMARY KEY, human_id INTEGER REFERENCES users(id), stat VARCHAR(50))

order_things(id SERIAL PRIMARY KEY, quantity INTEGER, order_id INTEGER REFERENCES orders(id), things_id INTEGER REFERENCES things(id))

things (id SERIAL PRIMARY KEY, name VARCHAR(50), price INTEGER, category VARCHAR(50))

users (id SERIAL PRIMARY KEY, first_name VARCHAR(50), last_name VARCHAR(50), user_name VARCHAR(100), pass VARCHAR)