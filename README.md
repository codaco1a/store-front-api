## Creation:

you might need to type: `sudo postgres` in the terminal first, and type your password.

steps:<br>
-`psql postgres`, insert your superuser password
```
-CREATE USER store_front_user with PASSWORD 'your-password';
-CREATE DATABASE store_front_dev WITH OWNER store_front_user;
-CREATE DATABASE store_front_try WITH OWNER store_front_user;
-GRANT ALL PRIVILEGES ON DATABASE store_front_dev TO store_front_user;
-GRANT ALL PRIVILEGES ON DATABASE store_front_try TO store_front_user;
-\c store_front_dev
```
in case of testing
-`\c store_front_try`

## Connect:
```
-psql -h 127.0.0.1 -U store_front_user
-type the password 'password123'
-\c store_front_dev
you are connected
```
other way:
```
psql -U store_front_user store_front_dev
or in case of testing
psql -U store_front_user store_front_try
```

## Port:

Postgres default Port: 5432
host: 127.0.0.1

## Package installation instructions:

just type in terminal: `npm install`
and you're good to go


### About:

server is cors enabled, and authurization as middleware. Returned data from DB doesn't include passwords.

Passwords are hashed.

### JWTs:

jwts are generated from sign-up, and login endpoints. one generated from models and the other one from handlers
