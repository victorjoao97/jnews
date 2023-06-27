const {ApiListArticles} = require('./ApiListArticles')

class ListArticlesNewsApiRepoMock {
    async getArticles() {
        return [{
            title: 'Notícia 1',
            description: 'Descrição da notícia 1',
            author: 'Autor da notícia 1',
            content: 'Conteúdo da notícia 1'
        }]
    }
}

describe('List News from API', () => {
    test('Should return a list with a news', async () => {
        const listNewsUC = new ApiListArticles(new ListArticlesNewsApiRepoMock())
        const response = await listNewsUC.getArticles()
        expect(response).toHaveLength(1)
        expect(response[0].title).toBe('Notícia 1')
        expect(response[0].description).toBe('Descrição da notícia 1')
        expect(response[0].author).toBe('Autor da notícia 1')
        expect(response[0].content).toBe('Conteúdo da notícia 1')
    })
})