import dotenv from "dotenv";
import { Pool, PoolClient } from 'pg' // Importing pool

dotenv.config() // This has to be at the very top as possible

const {
    DB_HOST,
    DB_NAME,
    USER_NAME,
    USER_PASSWORD,
    TRY_DB_NAME,
    ENV
} = process.env // defining environment variables

let connection: unknown;

console.log(ENV)

if (ENV === 'dev') {
  connection = new Pool({
    host: DB_HOST,
    database: DB_NAME,
    user: USER_NAME,
    password: USER_PASSWORD
  })
} else if (ENV === 'try') {
  connection = new Pool({
    host: DB_HOST,
    database: TRY_DB_NAME,
    user: USER_NAME,
    password: USER_PASSWORD
  })
}

export default connection
