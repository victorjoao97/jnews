const supertest = require('supertest')
const {app} = require('../config/app')

describe('Cors Middleware', () => {
    test('Should request success from safe domain', (done) => {
        app.get('/test_cors', (_, res) => {
            return res.json()
        })
        supertest(app)
            .get('/test_cors')
            .set('origin', 'http://sitedovisinho.com')
            .expect('access-control-allow-origin', '*')
            .expect('content-type', /json/)
            .then(_ => {
                done()
            })
    })
})