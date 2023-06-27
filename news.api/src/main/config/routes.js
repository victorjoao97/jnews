const { Router } = require('express')
const ListArticlesRoute = require("../routes/ListArticlesRoute")

module.exports = (app) => {
    const router = new Router()
    app.use('/api', router)
    ListArticlesRoute(router)
}