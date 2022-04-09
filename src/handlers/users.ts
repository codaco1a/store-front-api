import express, { Response, Request, NextFunction } from 'express' // import express packages
import { human, humanDB } from '../models/user' // import model
import twj, { Secret } from 'jsonwebtoken' // import jwt
import denv from 'dotenv'

denv.config()

const tknSecret: Secret = process.env.TKN as unknown as Secret

const usersDB = new humanDB()

const users = async (_req: Request, res: Response) => {
    try {
        // get all users
        const humans = await usersDB.users()
        res.json(humans)
    } catch (error) {
        throw new Error(`${error}`)
    }
}

const info = async (req: Request, res: Response) => {
    try {
        // return a spicific user's information using his id
        const user = await usersDB.info(req.params.id)
        res.json(user)        
    } catch (error) {
        throw new Error(`${error}`)
    }
}

const sign_up = async (req: Request, res: Response) => {
    // create a new user, passing the info in body as json
    const p: human = {
        stName: req.body.firstName,
        ndName: req.body.lastName,
        usName: req.body.userName,
        secret: req.body.secret
    }
    try {
        const token = await usersDB.sign_up(p)
        res.json({token})
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const sign_in = async (req: Request, res: Response) => {
    // login functionality
    const us: human = {
        usName: req.body.userName,
        secret: req.body.secret
    }
    try {
        const token = await usersDB.sign_in(us)
        res.json({token})
    } catch (err) {
        res.status(400)
        res.send(err)
    }
}

const auth = (req: Request, res: Response, next: NextFunction) => {
    // authrization as middlware
    const authhead = req.headers.authorization as unknown as string
    try {
        const verify = twj.verify(authhead, tknSecret)
        if (verify) {
            next()
        }
    } catch (error) {
        res.status(401)
        res.json(`${error}`)
        return
    }
}

const humansRoute = (app: express.Application) => {
    app.get('/users', auth, users)
    app.get('/users/:id', auth, info)
    app.post('/users/sign-up', sign_up)
    app.post('/users/login', sign_in)
}

export default humansRoute // export the function to server
