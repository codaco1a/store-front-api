import express, { Response, Request, NextFunction } from 'express' // Import express packages
import { Product, productStore } from '../models/product' // import model
import twj, { Secret } from 'jsonwebtoken' // import jwt to use it in sign_in function

const store = new productStore() // new object

const tknSecret: Secret = process.env.TKN as unknown as Secret // secret key from .env

const index = async (req: Request, res: Response) => {
    try {
        const products = await store.index() // async get all products
        res.json(products) // send the data as json
    } catch (error) {
        throw new Error(`${error}`)
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const product = await store.show(req.params.id) // async get a spicific product
        res.json(product) // send the product as json 
    } catch (error) {
        throw new Error(`${error}`)
    }
}

const create = async (req: Request, res: Response) => {
    const p: Product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    } // take info outta request
    try {
    const product = await store.create(p) // pass the info
    res.json(product) // send the response
    } catch (error) {
        throw new Error(`${error}`)
    }
}

const d = async (req: Request, res: Response) => {
    try {
        const deleted = await store.delete(req.params.id) // take the id of row, delete the row
        res.json(deleted) // return its data 
    } catch (error) {
        throw new Error(`${error}`)
    }
}

const update = async (request: Request, respon: Response) => {
    // one of crud operations
    const reqInfo: Product = {
        id: request.body.id,
        name: request.body.name,
        price: request.body.price,
        category: request.body.category
    }
    try {
        const sql = await store.update(reqInfo)
        respon.json(sql)
        return
    } catch (err) {
        throw new Error(`Could not update table. ${err}`)
    }
}

const auth = (req: Request, res: Response, next: NextFunction) => {
    // middleware authentication
    const authHead = req.headers.authorization as unknown as string
    try {
        const verify = twj.verify(authHead, tknSecret)
        if (verify) {
            next()
        }
    } catch (error) {
        res.status(401)
        res.json(`${error}`)
        return
    }
}

const productRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products/add', auth, create)
    app.put('/products/update', auth, update)
    app.delete('/products/:id/delete', auth, d)
}

export default productRoutes // export the function to server