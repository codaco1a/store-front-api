import s from 'supertest'
import server from '../../try'


const api = s(server)
describe('Users', () => {
    beforeAll( async () => {
        const register = await api.post('/users/sign-up').send({
            "firstName": "Super",
            "lastName": "Mario",
            "userName": "SuperMario",
            "secret": "password"
        }).set('Accept', 'application/json')
        expect(register.statusCode).toBe(200)
    })
    it('login, index', async () => {
        const login = await api.post('/users/login').send({ "userName": "SuperMario", "secret": "password"})
        const token: string = login.body.token
        const res = await api.get('/users').set('Authorization', token)
        expect(res.body[0]).toBeDefined
    })
    // show
    afterAll( async () => {
        const register = await api.post('/users/sign-up').send({
            "firstName": "Wonder",
            "lastName": "Woman",
            "userName": "WonderWoman",
            "secret": "password"
        }).set('Accept', 'application/json')
        const token = register.body.token
        const res = await api.get('/users/2').set('Authorization', token)
        expect(res.body.id).toBeCloseTo(2)
    })
})