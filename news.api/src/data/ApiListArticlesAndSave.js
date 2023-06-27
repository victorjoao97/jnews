class ApiListArticlesAndSave {
    constructor(repositoryList, repositorySave) {
        this.repositoryList = repositoryList
        this.repositorySave = repositorySave
    }
    async getArticles() {
        if (await this.repositorySave.countArticles() > 0) {
            return this.repositorySave.getArticles()
        }
        const articles = await this.repositoryList.getArticles()
        await this.repositorySave.saveArticles(articles)
        return articles
    }
}

module.exports = {
    ApiListArticlesAndSave
}