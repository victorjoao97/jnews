const adapterRouter = require('../adapters/ExpressRouteAdapter')
const makeListArticlesController = require('../factories/ListArticlesFactory')
const makeListArticlesFromCountryController = require('../factories/ListArticlesFromCountryFactory')

module.exports = (router) => {
    router.get('/articles', adapterRouter(makeListArticlesController()))
    router.get('/articles_from_country/:country', adapterRouter(makeListArticlesFromCountryController()))
}