const axios = require('axios')

class ListArticlesNewsApiRepo {
    async getArticles() {
        const response = await axios.get('https://newsapi.org/v2/everything?domains=wsj.com&apiKey=4a6fd0a5f0e345288a4e862df6c20833')
        return response.data.articles.map(article => {
            return {
                title: article.title,
                description: article.description,
                author: article.author,
                content: article.content
            }
        })
    }
}

module.exports = {
    ListArticlesNewsApiRepo
}