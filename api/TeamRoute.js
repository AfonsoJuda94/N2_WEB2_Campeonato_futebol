const app = require("../apps")
const route = require('../routes/TeamRouter')
app.use('/time',route)
module.exports = app