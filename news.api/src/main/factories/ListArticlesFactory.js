const { ListArticlesController } = require('../../presentation/ListArticlesController')
const {ApiListArticles} = require('../../data/ApiListArticles')
const {ListArticlesNewsApiRepo} = require('../../infra/ListArticlesNewsApiRepo')
const { ApiListArticlesAndSave } = require('../../data/ApiListArticlesAndSave')
const { ListArticlesMysqlRepo } = require('../../infra/ListArticlesMysqlRepo')

module.exports = () => {
    const listArticlesRepository = new ListArticlesNewsApiRepo()
    const apiListArticles = new ApiListArticles(listArticlesRepository)
    const listArticlesController = new ListArticlesController(apiListArticles)
    return listArticlesController
}