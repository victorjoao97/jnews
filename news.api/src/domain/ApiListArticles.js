class ApiListArticles {
    constructor(repository) {
        this.repository = repository
    }

    async getArticles() {
        return this.repository.getArticles()
    }
}

module.exports = {
    ApiListArticles
}