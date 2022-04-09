import humanBeing from '../database' // importing the connection with the database
import crpt from 'bcrypt' // to keep the secret
import env from 'dotenv' // rubric required 
import twj, { Secret } from 'jsonwebtoken' // importing the jwts packages
import { Pool } from 'pg';

const db = humanBeing as unknown as Pool;


env.config() // this happens to be at the very beginning

const tknSecret: Secret = process.env.TKN as unknown as Secret // gets the token signiture from .env file
const saltSpoons: string = process.env.SALTSPOONS as string // SaltRounds
const sugar = process.env.SUGAR as unknown as string // to make sweet password

export type human = {
    id?: number;
    stName?: string;
    ndName?: string;
    usName: string;
    secret?: string;
} // matches the table's scheema

export class humanDB {
    async users(): Promise<human[]> {
        // function that gets all users, token required
        try {
            const wire = await db.connect() // making a connection
            const syntax = 'SELECT id, first_name, last_name, user_name FROM users' // NO PASSWORD RETURNED
            const info = await wire.query(syntax) // this gets the resault from the db
            wire.release() // end the connection
            return info.rows // returning an array of users
        } catch (err) {
            throw new Error(`cannot get users ${err}`) // handling err, that sends 'token required'
        }
    }

    async info(id: string): Promise<human> {
        // function that gets a spicific user, token required, returns an object of user's scheema
        try {
            const wire = await db.connect() // samething goes
            const syntax = 'SELECT id, first_name, last_name, user_name FROM users WHERE id=($1)' // NO PASSOWRD RETURNED
            const info = await wire.query(syntax, [id]) // etc
            wire.release()
            return info.rows[0]
        } catch (err) {
            throw new Error(`cannot get user of id:${id}. Erro ${err}`)
        }
    }

    async sign_up(user: human): Promise<string> {
        // functin that creates a user and sends the token from here, unlike the sing-in route
        try {
            const wire = await db.connect()
            // Does not return password, to avoid passing it into token
            const syntax = 'INSERT INTO users (first_name, last_name, user_name, pass) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, user_name'
            const password: string = user.secret + sugar
            const hashMe = crpt.hashSync(password, parseInt(saltSpoons));
            const info = await wire.query(syntax, [user.stName, user.ndName, user.usName, hashMe])
            wire.release()
            const token = twj.sign({ username: info.rows[0].user_name }, tknSecret)
            return token
        } catch (err) {
            throw new Error(`Could not add new user. Error: ${err}`)
        }
    }
    async sign_in(user: human): Promise<string | null> {
        // function that authenticate the users data with that in the db
        try {
            const wire = await db.connect()
            const syntax = 'SELECT pass FROM users WHERE user_name=($1)'
            const info = await wire.query(syntax, [user.usName])
            if (info.rows.length) {
                const psw = info.rows[0]
                if (crpt.compareSync(user.secret + sugar, psw.pass)) {
                    const token = twj.sign({ username: user.usName }, tknSecret)
                    return token
                }
            }
            return null            
        } catch (error) {
            throw new Error(`${error}`)
        }
    }
}