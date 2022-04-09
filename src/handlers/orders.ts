import e, { Response, Request, NextFunction, response, request } from 'express' // next() to use a middleware token autherization
import { Order, orderFunctions } from '../models/order' // import form model file
import denv from 'dotenv'
import twj, { Secret } from 'jsonwebtoken' // used in log-in, on the other hand sign-up token generated from the model file


denv.config() // has to be at the very top
const tknSecret: Secret = process.env.TKN as unknown as Secret // keep the secret
const orderFuncs = new orderFunctions() // new object


const createOrder = async (request: Request, respone: Response) => {
    const bodyData = {
        human_id: request.body.userID,
        status: request.body.status
    } // to match the same scheema
    try {
        const data = await orderFuncs.create_order(bodyData) // pass the object
        respone.json(data) // send the data, can be sent as json
    } catch (error) {
        throw new Error(`${error}`)
    }
}

const placeOrder = async (request: Request, respon: Response) => {
    const id = request.params.id
    const thingsID = request.body.thingsID
    const quantity: number = request.body.quantity as unknown as number
    try {
        const info = await orderFuncs.place_order(quantity, id, thingsID)
        respon.json(info)
        return
    } catch (err) {
        respon.status(400)
        respon.json(err)
        return
    }
}

const auth = (req: Request, res: Response, next: NextFunction) => {
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

const ordersRoute = (app: e.Application) => {
    app.post('/orders/create', auth, createOrder)
    app.post('/orders/:id/products', auth, placeOrder)
} // server will user these routes

export default ordersRoute  // export them to server