const supertest = require('supertest')
const {app} = require('../config/app')

describe('Cors Middleware', () => {
    test('Should request success from safe domain', () => {
        app.get('/test_cors', (req, res) => {
            return res.json()
        })
        supertest(app)
            .get('/test_cors')
            .send()
            .set('origin', 'http://sitedovisinho.com')
            .expect('access-control-allow-origin', '*')
            .expect('access-control-allow-headers', '*')
            .expect('access-control-allow-methods', '*')
            .expect('content-type', /json/)
            .expect(res => {
                console.log(res.headers)
                expect(res.headers).toHaveProperty('access-control-allow-methods', '*')
            })
    })
})