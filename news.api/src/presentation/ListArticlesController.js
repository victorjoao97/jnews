class ListArticlesController {
    constructor(listArticles) {
        this.listArticles = listArticles
    }
    async handle(httpRequest) {
        const response = await this.listArticles.getArticles()
        return {
            statusCode: 200,
            body: response
        }
    }
}

module.exports = {
    ListArticlesController
}