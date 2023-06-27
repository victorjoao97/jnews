class ApiListArticles {
    constructor(repository) {
        this.repository = repository
    }

    async getArticles() {
        if (!this.repository) {
            throw new Error('ListArticlesNewsApiRepo is undefined')
        }
        return this.repository.getArticles()
    }

    async getArticlesFromCountry(country) {
        if (!this.repository) {
            throw new Error('ListArticlesNewsApiRepo is undefined')
        }
        return this.repository.getArticlesFromCountry(country)
    }
}

module.exports = {
    ApiListArticles
}