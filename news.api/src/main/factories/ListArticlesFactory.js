const { ListArticlesController } = require('../../presentation/ListArticlesController')
const {ApiListArticles} = require('../../data/ApiListArticles')
const {ListArticlesNewsApiRepo} = require('../../infra/ListArticlesNewsApiRepo')

module.exports = () => {
    const listArticlesRepository = new ListArticlesNewsApiRepo()
    const apiListArticles = new ApiListArticles(listArticlesRepository)
    const listArticlesController = new ListArticlesController(apiListArticles)
    return listArticlesController
}