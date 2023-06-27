const mysqlSetup = require('@databases/mysql-test/jest/globalSetup')
const mysqlTeardown = require('@databases/mysql-test/jest/globalTeardown')
require('../../node_modules/mysql2/node_modules/iconv-lite/lib').encodingExists('foo')

const { ListArticlesMysqlRepo } = require('./ListArticlesMysqlRepo')

describe('List Articles From DB', () => {
    beforeAll(async () => {
        await mysqlSetup()
    }, 30000)
    afterAll(async () => {
        await mysqlTeardown()
    }, 30000)
    test('should return a list of articles', async () => {
        const sut = new ListArticlesMysqlRepo(process.env.DATABASE_URL)
        await sut.connect()
        await sut.saveArticles([{
            title: 'cached_title',
            description: 'cached_description',
            author: 'cached_author',
            content: 'cached_content'
        }])
        const articles = await sut.getArticles()
        expect(articles).toEqual([{
            title: 'cached_title',
            description: 'cached_description',
            author: 'cached_author',
            content: 'cached_content'
        }])
    })
})