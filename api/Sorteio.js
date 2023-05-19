const app = require("../apps")
const route = require('../routes/Sorteio')
app.use('/sorteio',route)
module.exports = app