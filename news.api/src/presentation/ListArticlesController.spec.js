const {ApiListArticles} = require('../data/ApiListArticles')
const {ListArticlesController} = require('./ListArticlesController')

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

class ApiListArticlesErrorStub {
    async getArticles() {
        throw new Error('Error on get articles from API')
    }
}

const makeSut = () => {
    const listArticlesController = new ListArticlesController(new ApiListArticles(new ListArticlesNewsApiRepoStub()))
    return {
        listArticlesController
    }
}

describe('List articles in controller', () => {
    test('Should return a list with a news', async () => {
        const {listArticlesController} = makeSut()
        const httpRequest = {}
        const response = await listArticlesController.handle(httpRequest)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveLength(1)
        const body = response.body
        expect(body[0].title).toBe('Notícia 1')
        expect(body[0].description).toBe('Descrição da notícia 1')
        expect(body[0].author).toBe('Autor da notícia 1')
        expect(body[0].content).toBe('Conteúdo da notícia 1')
    })
    test('Should throw error if ApiListArticles undefined', async () => {
        const listArticlesController = new ListArticlesController()
        const httpRequest = {}
        const response = await listArticlesController.handle(httpRequest)
        expect(response.statusCode).toBe(500)
        expect(response.body).toEqual(new Error('ApiListArticles undefined'))
    })
    test('Should throw error if ApiListArticles throws', async () => {
        const listArticlesController = new ListArticlesController(new ApiListArticlesErrorStub())
        const httpRequest = {}
        const response = await listArticlesController.handle(httpRequest)
        expect(response.statusCode).toBe(500)
        expect(response.body).toEqual(new Error('Error on get articles from API'))
    })
})