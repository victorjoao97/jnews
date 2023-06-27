const {ApiListArticles} = require('../../data/ApiListArticles')
const {ListArticlesNewsApiRepo} = require('../../infra/ListArticlesNewsApiRepo')
const { ListArticlesFromCountryController } = require('../../presentation/ListArticlesFromCountryController')

module.exports = () => {
    const listArticlesRepository = new ListArticlesNewsApiRepo()
    const apiListArticles = new ApiListArticles(listArticlesRepository)
    const listArticlesController = new ListArticlesFromCountryController(apiListArticles)
    return listArticlesController
}