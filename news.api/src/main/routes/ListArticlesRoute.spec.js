const supertest = require('supertest')
const {app} = require('../config/app')

describe('List articles in route', () => {
    test('Should return a list with a news', async () => {
        const response = await supertest(app)
            .get('/api/articles')
            .expect(200)
        expect(response.body).toHaveLength(1)
        const body = response.body
        expect(body[0].title).toBe('Notícia 1')
        expect(body[0].description).toBe('Descrição da notícia 1')
        expect(body[0].author).toBe('Autor da notícia 1')
        expect(body[0].content).toBe('Conteúdo da notícia 1')
    })
})