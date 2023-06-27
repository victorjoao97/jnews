const { ListArticlesController } = require('../../presentation/ListArticlesController')
const {ApiListArticles} = require('../../data/ApiListArticles')
const {ListArticlesNewsApiRepo} = require('../../infra/ListArticlesNewsApiRepo')
const { ApiListArticlesAndSave } = require('../../data/ApiListArticlesAndSave')
const { ListArticlesMysqlRepo } = require('../../infra/ListArticlesMysqlRepo')

module.exports = () => {
    const listArticlesRepository = new ListArticlesNewsApiRepo()
    const listArticlesMysqlRepository = new ListArticlesMysqlRepo(process.env.DATABASE_URL)
    const apiListArticlesAndSave = new ApiListArticlesAndSave(listArticlesMysqlRepository)
    const apiListArticles = new ApiListArticles(listArticlesRepository)
    const listArticlesController = new ListArticlesController(apiListArticlesAndSave)
    return listArticlesController
}