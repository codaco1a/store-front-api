import { Pool } from 'pg';
import humanBeing from '../database';

const db = humanBeing as unknown as Pool;


export type Product = {
    id?: number;
    name?: string;
    price?: number;
    category?: string;
} // as schema shape

export class productStore {
    async index(): Promise<Product[]> {
        // function that show all products in db
        try {
            const wire = await db.connect() // making a connection to the db
            const syntax = 'SELECT * FROM things' // sql syntax
            const info = await wire.query(syntax) // this gets the resault from the db
            wire.release() // end the connection with the db
            return info.rows // returning all resault
        } catch (err) {
            throw new Error(`cannot get products ${err}`) // handling http error
        }
    }

    async show(id: string): Promise<Product> {
        // function that gets a spicific product using its id
        try {
            const wire = await db.connect()
            const syntax = 'SELECT * FROM things WHERE id=($1)'
            const info = await wire.query(syntax, [id])
            wire.release()
            return info.rows[0]
        } catch (err) {
            throw new Error(`cannot get product of id:${id}. Erro ${err}`)
        }
    }

    async create(product: Product) {
        // function that creates a new product, inserts it into the db
        try {
            const wire = await db.connect()
            const syntax = 'INSERT INTO things (name, price, category) VALUES ($1, $2, $3) RETURNING *'
            const info = await wire.query(syntax, [product.name, product.price, product.category])
            wire.release()
            return info.rows[0]
        } catch (err) {
            throw new Error(`Could ont add new product. Error: ${err}`)
        }
    }

    async update(product: Product) {
        // function that override an existing row
        try {
            const wire = await db.connect()
            const syntax = 'UPDATE things SET name=($1), price=($2), category=($3) WHERE id=($4) RETURNING *' // this was pain
            const info = await wire.query(syntax, [product.name, product.price, product.category, product.id]) // passing the parametars
            return info.rows[0]
        } catch (err) {
            throw new Error(`Could not update things table: ${err}`)
        }
    }

    async delete(id: string): Promise<Product> {
        // function that delets a row from the database
        try {
            const wire = await db.connect()
            const syntax = 'DELETE FROM things WHERE id=($1) RETURNING *'
            const info = await wire.query(syntax, [id]) // log the user
            wire.release()
            return  info.rows[0] // returning an object
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`) // handling an error as miss instructor
        }
    }
}