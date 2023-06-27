const { ListArticlesNewsApiRepo } = require('./ListArticlesNewsApiRepo')

describe.skip('List News from API', () => {
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
})