const routes = require('express').Router()
const PlayerRouter = require('./PlayerRouter')
const TeamRouter = require('./TeamRouter')
const SorteioRouter = require('./Sorteio') 

routes.use('/sorteio',SorteioRouter)
routes.use('/time',TeamRouter)
routes.use('/jogador',PlayerRouter)

module.exports = routes