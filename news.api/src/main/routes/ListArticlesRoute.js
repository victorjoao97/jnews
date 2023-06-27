module.exports = (router) => {
    router.get('/articles', (req, res) => {
        res.json([{
                title: 'Notícia 1',
                description: 'Descrição da notícia 1',
                author: 'Autor da notícia 1',
                content: 'Conteúdo da notícia 1'
            }])
    })
}