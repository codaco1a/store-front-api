import s from 'supertest'
import server from '../../try'


const api = s(server)
describe('Products', () => {
    beforeAll( async () => {
        const register = await api.post('/users/sign-up').send({
            "firstName": "Wonder",
            "lastName": "Woman",
            "userName": "WonderWoman",
            "secret": "password"
        })
    })

    it('create', async () => {
        const login = await api.post('/users/login').send({ "userName": "WonderWoman", "secret": "password"})
        const token: string = login.body.token
        const add = await api.post('/products/add').set('Authorization', token).send({ name: "Potato", price: 12, category: "Vegetables"})
        expect(add.body[0]).toBeDefined
    })
    afterAll( async() => {
        const res = await api.get('/products')
        expect(res.body[0]).toBeDefined
    })
    afterAll(async() => {
        const res = await api.get('/products/1')
        expect(res.body.id).toEqual(1)
    })
    afterAll( async () => {
        const login = await api.post('/users/login').send({ "userName": "WonderWoman", "secret": "password"})
        const token: string = login.body.token
        const update = await api.put('/products/update').set('Authorization', token).send({ "id": 1, "name": "Mango", "price": 14, "category": "Fruits"})
        expect(update.status).toBe(200)
    })
    afterAll( async () => {
        const login = await api.post('/users/login').send({ "userName": "WonderWoman", "secret": "password"})
        const token: string = login.body.token
        const add = await api.post('/products/add').set('Authorization', token).send({ name: "Potato", price: 12, category: "Vegetables"})
        const remove = await api.delete('/products/2/delete').set('Authorization', token)
        expect(remove.status).toBe(200)
    })
})