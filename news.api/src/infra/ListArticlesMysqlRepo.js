const { Sequelize, DataTypes } = require('sequelize')

class ListArticlesMysqlRepo {
    #ArticleModel = null
    #sequelize = null
    #connected = false
    constructor(connectionString) {
        this.#sequelize = new Sequelize(connectionString);
    }

    async connect() {
        if (this.#connected) return
        await this.#sequelize.authenticate()
        this.#ArticleModel = this.#sequelize.define('Article', {
            title: {
              type: DataTypes.STRING,
              allowNull: false
            },
            description: {
              type: DataTypes.STRING,
              allowNull: false
            },
            author: {
              type: DataTypes.STRING
            },
            content: {
                type: DataTypes.STRING
            }
          }, {
            // Other model options go here
          });
        await this.#ArticleModel.sync({ force: true })
        this.#connected = true
    }

    async saveArticles(articles) {
        await this.connect()
        await this.#ArticleModel.bulkCreate(articles.map(article => ({
            title: article.title,
            description: article.description,
            author: article.author,
            content: article.content
        })))
    }

    async countArticles() {
        await this.connect()
        return this.#ArticleModel.count()
    }

    async getArticles() {
        await this.connect()
        const articles = await this.#ArticleModel.findAll()
        return articles.map(article => ({
            title: article.title,
            description: article.description,
            author: article.author,
            content: article.content
        }))
    }
}

module.exports = {
    ListArticlesMysqlRepo
}