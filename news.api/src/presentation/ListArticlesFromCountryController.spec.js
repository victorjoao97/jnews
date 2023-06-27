const {ApiListArticles} = require('../data/ApiListArticles')
const {ListArticlesFromCountryController} = require('./ListArticlesFromCountryController')

class ListArticlesNewsApiRepoStub {
    async getArticlesFromCountry(country) {
        return [{
            title: 'Notícia 1 do Brasil',
            description: 'Descrição da notícia 1 do Brasil',
            author: 'Autor da notícia 1 do Brasil',
            content: 'Conteúdo da notícia 1 do Brasil'
        }]
    }
}

class ApiListArticlesErrorStub {
    async getArticlesFromCountry() {
        throw new Error('Error on get articles from API')
    }
}

const makeSut = () => {
    const listArticlesController = new ListArticlesFromCountryController(new ApiListArticles(new ListArticlesNewsApiRepoStub()))
    return {
        listArticlesController
    }
}

describe('List articles from Country in controller', () => {
    test('Should return a list with a news', async () => {
        const {listArticlesController} = makeSut()
        const httpRequest = {
            params: {
                country: 'br'
            }
        }
        const response = await listArticlesController.handle(httpRequest)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveLength(1)
        const body = response.body
        expect(body[0].title).toBe('Notícia 1 do Brasil')
        expect(body[0].description).toBe('Descrição da notícia 1 do Brasil')
        expect(body[0].author).toBe('Autor da notícia 1 do Brasil')
        expect(body[0].content).toBe('Conteúdo da notícia 1 do Brasil')
    })
    test('Should throw error if ApiListArticles undefined', async () => {
        const listArticlesController = new ListArticlesFromCountryController()
        const httpRequest = {}
        const response = await listArticlesController.handle(httpRequest)
        expect(response.statusCode).toBe(500)
        expect(response.body).toEqual(new Error('ApiListArticles undefined'))
    })
    test.each([null, {}, {params:{}}, {params:{country:null}}])
    ('Should throw error if query params not provide', async (httpRequest) => {
        const listArticlesController = new ListArticlesFromCountryController(true)
        const response = await listArticlesController.handle(httpRequest)
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual(new Error('Country is required'))
    })
    test('Should throw error if ApiListArticles throws', async () => {
        const listArticlesController = new ListArticlesFromCountryController(new ApiListArticlesErrorStub())
        const httpRequest = {
            params: {country: 'br'}
        }
        const response = await listArticlesController.handle(httpRequest)
        expect(response.statusCode).toBe(500)
        expect(response.body).toEqual(new Error('Error on get articles from API'))
    })
})