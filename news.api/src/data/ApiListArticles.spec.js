const {ApiListArticles} = require('./ApiListArticles')

class ListArticlesNewsApiRepoStub {
    async getArticles() {
        return [{
            title: 'Notícia 1',
            description: 'Descrição da notícia 1',
            author: 'Autor da notícia 1',
            content: 'Conteúdo da notícia 1'
        }]
    }
}

class ListArticlesNewsApiRepoErrorStub {
    async getArticles() {
        throw new Error('Error on get articles from News API')
    }
}

describe('List News from API', () => {
    test('Should return a list with a news', async () => {
        const listNewsUC = new ApiListArticles(new ListArticlesNewsApiRepoStub())
        const response = await listNewsUC.getArticles()
        expect(response).toHaveLength(1)
        expect(response[0].title).toBe('Notícia 1')
        expect(response[0].description).toBe('Descrição da notícia 1')
        expect(response[0].author).toBe('Autor da notícia 1')
        expect(response[0].content).toBe('Conteúdo da notícia 1')
    })
    test('Should throw error if ListArticlesNewsApiRepo undefined', async () => {
        const listNewsUC = new ApiListArticles()
        const promise = listNewsUC.getArticles()
        expect(promise).rejects.toThrow('ListArticlesNewsApiRepo is undefined')
    })
    test('Should throw error if ListArticlesNewsApiRepo throws exception', async () => {
        const listNewsUC = new ApiListArticles(new ListArticlesNewsApiRepoErrorStub())
        const promise = listNewsUC.getArticles()
        expect(promise).rejects.toThrow('Error on get articles from News API')
    })
})
