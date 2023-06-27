const supertest = require('supertest')
const {app} = require('../config/app')

describe('Body Parser Middleware', () => {
    test('Should parse body as json', () => {
        app.post('/test_body_parser', (req, res) => {
            res.send(req.body)
        })
        supertest(app)
            .post('/test_body_parser')
            .send({name: 'Any name'})
            .expect({name: 'Any name'})
    })
})