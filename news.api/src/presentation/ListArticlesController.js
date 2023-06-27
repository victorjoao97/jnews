class ListArticlesController {
    constructor(listArticles) {
        this.listArticles = listArticles
    }
    async handle(httpRequest) {
        if (!this.listArticles) {
            return {
                statusCode: 500,
                body: new Error('ApiListArticles undefined')
            }
        }
        try {
            const response = await this.listArticles.getArticles()
            return {
                statusCode: 200,
                body: response
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: error
            }
        }
    }
}

module.exports = {
    ListArticlesController
}