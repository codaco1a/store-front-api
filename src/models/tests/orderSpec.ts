import { orderFunctions, order_thing, Order } from '../order'
import { humanDB, human } from '../user'
import { productStore, Product } from '../product'

const order = new orderFunctions()
const product = new productStore()
const user = new humanDB()

describe('', () => {

    beforeAll( async () => {
        const addUser = await user.sign_up({
            stName: "Super",
            ndName: "Man",
            usName: "SuperMan",
            secret: "password"
        })
        const addProduct = await product.create({
            name: "Banana",
            price: 13,
            category: "Fruits"
        })
    })

    it('create', async () => {
        const res = await order.create_order({ human_id: '1', status: "Active" })
        expect(res).not.toThrowError
    })

    afterAll( async () => {
        const res = await order.place_order(3, '1', '1')
        expect(res.quantity).toEqual(3)
    })

})