import { productStore, Product } from '../product'

const things = new productStore()

describe('product model', () => {

    beforeAll( async () => {
        const information: Product = {
            name: "Apple",
            price: 20,
            category: "Fruits"
        }
        const res = await things.create(information)
        expect(res).toBeDefined
    })
    it('show', async () => {
        const res = await things.show('1')
        expect(res.id).toBeCloseTo(1)
    })
    afterAll( async () => {
        const res = await things.index()
        expect(res).toContain({
            id: 1,
            name: "Tomato",
            price: 10,
            category: "Vegetables"
        })
    })
    it('update', async () => {
        const information = {
            id: 1,
            name: "Tomato",
            price: 10,
            category: "Vegetables"
        }
        const res = await things.update(information)
        expect(res.id).toBeCloseTo(1)
    })
    afterAll( async () => {
        const information: Product = {
            name: "Orange",
            price: 18,
            category: "Fruits"
        }
        const add = await things.create(information)
        const res = await things.delete('2')
        expect(res).not.toThrowError
    })
})