const { ListArticlesNewsApiRepo } = require('./ListArticlesNewsApiRepo')
const axios = require('axios')

describe('List News from API', () => {
    test('Should return a list with a news', async () => {
        const sut =  new ListArticlesNewsApiRepo()
        const response = await sut.getArticles()
        expect(response).not.toBeNull()
        expect(response.length).toBeGreaterThan(0)
        expect(response[0]).toHaveProperty('title')
        expect(response[0]).toHaveProperty('description')
        expect(response[0]).toHaveProperty('author')
        expect(response[0]).toHaveProperty('content')
    })
    test('Should return a list with a news from Country', async () => {
        const sut =  new ListArticlesNewsApiRepo()
        const response = await sut.getArticlesFromCountry('br')
        expect(response).not.toBeNull()
        expect(response.length).toBeGreaterThan(0)
        expect(response[0]).toHaveProperty('title')
        expect(response[0]).toHaveProperty('description')
        expect(response[0]).toHaveProperty('author')
        expect(response[0]).toHaveProperty('content')
    })
    test('Should throw error if ListArticlesNewsApiRepo throws', async () => {
        const sut =  new ListArticlesNewsApiRepo()

        jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.reject(new Error('Internal error')))

        const promise = sut.getArticles()
        expect(promise).rejects.toThrow('Error on get articles')
    })
})