class ListArticlesFromCountryController {
    constructor (listArticles) {
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
            if (!httpRequest?.params?.country) {
                return {
                    statusCode: 400,
                    body: new Error('Country is required')
                }
            }
            const response = await this.listArticles.getArticlesFromCountry(httpRequest.params.country)
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
    ListArticlesFromCountryController
}