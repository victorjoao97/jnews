const supertest = require('supertest')
const {app} = require('../config/app')

describe('List articles in route', () => {
    test('Should return a list with a news', async () => {
        const response = await supertest(app)
            .get('/api/articles')
            .expect(200)
        expect(response.body.length).toBeGreaterThan(0)
        const body = response.body
        expect(body[0]).toHaveProperty('title')
        expect(body[0]).toHaveProperty('description')
        expect(body[0]).toHaveProperty('author')
        expect(body[0]).toHaveProperty('content')
    })
    test('Should return a list with a news from country', async () => {
        const response = await supertest(app)
            .get('/api/articles_from_country/br')
            .expect(200)
        expect(response.body.length).toBeGreaterThan(0)
        const body = response.body
        expect(body[0]).toHaveProperty('title')
        expect(body[0]).toHaveProperty('description')
        expect(body[0]).toHaveProperty('author')
        expect(body[0]).toHaveProperty('content')
    })
})