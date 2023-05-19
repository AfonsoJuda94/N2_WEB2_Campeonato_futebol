const app = require("../apps")
const route = require('../routes/PlayerRouter')
app.use('/jogador',route)
module.exports = app