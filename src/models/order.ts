import { Pool } from 'pg';
import humanBeing from '../database'; // importing the connection with the database

const db = humanBeing as unknown as Pool;

export type Order = {
    id?: number;
    human_id: string;
    status: string;
} // same shape as the schema

export type order_thing = {
    quantity: number;
    order_id: string;
    things_id: string;
} // same shape as the schema

export class orderFunctions {
    async create_order(ordr: Order) {
        // function that does create an order an insert it into the database
        try {
            const wire = await db.connect()
            const syntax = 'INSERT INTO orders (human_id, stat) VALUES ($1, $2) RETURNING *'
            const info = await wire.query(syntax, [ordr.human_id, ordr.status])
            wire.release()
            return info.rows[0]
        } catch (err) {
            throw new Error(`Could ont add new order. Error: ${err}`)
        }
    }

    async place_order(qunatity: number, orderID: string, things_id: string) {
        // function that does create a join table row and inserts it into the database
    try {
        const wire = await db.connect()
        const info = await wire.query('INSERT INTO order_things(quantity, order_id, things_id) VALUES ($1, $2, $3) RETURNING *', [qunatity, orderID, things_id])
        const information = info.rows[0]
        wire.release()
        return information
    } catch(err: unknown) {
        throw new Error(`${err}`)
    }
}
}
