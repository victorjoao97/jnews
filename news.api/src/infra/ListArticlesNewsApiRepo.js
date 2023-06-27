const axios = require('axios')

class ListArticlesNewsApiRepo {
    constructor() {
        this.token = '4a6fd0a5f0e345288a4e862df6c20833'
    }
    async getArticles() {
        try {
            const response = await axios.get('https://newsapi.org/v2/everything?domains=wsj.com&apiKey=' + this.token)
            return response.data.articles.map(article => {
                return {
                    title: article.title,
                    description: article.description,
                    author: article.author,
                    content: article.content
                }
            })
        } catch (error) {
            throw new Error('Error on get articles')
        }
    }
    async getArticlesFromCountry(country) {
        try {
            const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${this.token}`)
            return response.data.articles.map(article => {
                return {
                    title: article.title,
                    description: article.description,
                    author: article.author,
                    content: article.content
                }
            })
        } catch (error) {
            throw new Error('Error on get articles')
        }
    }
}

module.exports = {
    ListArticlesNewsApiRepo
}