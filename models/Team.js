const mongoose = require('mongoose')
const Team = mongoose.model('Team',{
    name: String,
    img: String, //Vou utilizar a URL de alguma imagem do time
    cidade: String,
    tecnico: String,
    site: String,
    jogadores: Array
})

module.exports = Team