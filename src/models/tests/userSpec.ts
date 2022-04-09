import { humanDB, human } from '../user'

const user = new humanDB()

describe('user model', () => {
    
    beforeAll( async () => {
        const information: human = {
            "stName": "Spider",
            "ndName": "Man",
            "usName": "SpiderMan",
            "secret": "password"
        }
        const res = await user.sign_up(information)
        expect(res).toContain('')
    })
    it('index', async () => {
        const res = await user.users()
        expect(res).not.toThrowError
    })
    it('show', async () => {
        const res = await user.info('1')
        expect(res.id).toBeCloseTo(1)
    })
    it('login', async () => {
        const information: human = {
            usName: "SpiderMan",
            secret: "password"
        }
        const res = await user.sign_in(information)
        expect(res).not.toEqual(null)
    })
})