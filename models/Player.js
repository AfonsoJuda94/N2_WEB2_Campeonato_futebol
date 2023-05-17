const mongoose = require('mongoose')
const Player = mongoose.model('Player',{
    name: String,
    foto: String,
    posicao: String,
    altura: Number,
    peso: Number,
    numero: Number,
    idade: Number,
    time: String
})

module.exports = Player