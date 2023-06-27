const adapterRouter = require('../adapters/ExpressRouteAdapter')
const makeListArticlesController = require('../factories/ListArticlesFactory')

module.exports = (router) => {
    router.get('/articles', adapterRouter(makeListArticlesController()))
}