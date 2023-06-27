const {bodyParser} = require("../middlewares/body-parser")
const cors = require('cors')

module.exports = (app) => {
    app.use(bodyParser)
    app.use(cors())
}