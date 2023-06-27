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
class ListArticlesDbRepoStub {
    #articles = []

    async saveArticles(articles) {
        this.#articles.push(...articles)
    }

    async countArticles() {
        return this.#articles.length
    }

    async getArticles() {
        return this.#articles.map(article => ({
            id: article.id.replace('any', 'cached'),
            title: article.title.replace('any', 'cached'),
            description: article.description.replace('any', 'cached'),
            author: article.author.replace('any', 'cached'),
            content: article.content.replace('any', 'cached')
        }))
    }
}
class ListArticlesNewsApiRepoStub {
    async getArticles() {
        return [{
            id: 'any_id',
            title: 'any_title',
            description: 'any_description',
            author: 'any_author',
            content: 'any_content'
        }]
    }
}

describe('List Articles From API and Save', () => {
    test('should return a list of articles', async () => {
        const sut = new ApiListArticlesAndSave(new ListArticlesNewsApiRepoStub(), new ListArticlesDbRepoStub())
        const articles = await sut.getArticles()
        expect(articles).toEqual([{
            id: 'any_id',
            title: 'any_title',
            description: 'any_description',
            author: 'any_author',
            content: 'any_content'
        }])
        const articlesCached = await sut.getArticles()
        expect(articlesCached).toEqual([{
            id: 'cached_id',
            title: 'cached_title',
            description: 'cached_description',
            author: 'cached_author',
            content: 'cached_content'
        }])
    })
})