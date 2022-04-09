import s from 'supertest'
import server from '../../try'


const api = s(server)
describe('Orders', () => {
    beforeAll( async () => {
        const register = await api.post('/users/sign-up').send({
            "firstName": "Wonder",
            "lastName": "Woman",
            "userName": "WonderWoman",
            "secret": "password"
        })
    })
    it('', async () => {
        const login = await api.post('/users/login').send({ "userName": "WonderWoman", "secret": "password"})
        const token: string = login.body.token
        const res = await api.post('/orders/create').set('Authorization', token).send({ userID: 1, status: "Active"})
        expect(res.body.human_id).toEqual(1)
    })
    it('order_things', async () => {
        const login = await api.post('/users/login').send({ "userName": "WonderWoman", "secret": "password"})
        const token: string = login.body.token
        const add = await api.post('/orders/create').set('Authorization', token).send({ userID: 1, status: "Active"})
        const res = await api.post('/orders/1/products').set('Authorization', token).send({ thingsID: 1, quantity: 5 })
        expect(res.body.quantity).toBe(5)
    })
})