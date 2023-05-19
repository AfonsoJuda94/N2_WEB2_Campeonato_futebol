//require('dotenv').config()

//Pacotes importados
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')
//routers
const PersonRouter = require('./routes/PersonRoute')
const PlayerRouter = require('./routes/PlayerRouter')
const TeamRouter = require('./routes/TeamRouter')
const SorteioRouter = require('./routes/Sorteio')
const JodadoresPorTime = require('./routes/JogdoresPorTime')
//midwares
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use('/person',PersonRouter)
app.use('/jogador/',PlayerRouter)
app.use('/time/',TeamRouter)
app.use('/sorteio/',SorteioRouter)
app.use('/jogadoresdotime/',JodadoresPorTime)

app.get('/', (req,res) => {
    res.json({message: 'Oi express'})
})

//register user
/*
app.post('auth/register', async (req,res) =>{
    const {name, password} = req.body
    if(!name){
        return res.status(422).json({msg:'O nome é obrigatório'})
    }
})
*/
// Checar token


//conexão mangoose
mongoose.connect(`mongodb+srv://judah:xa2a2dQQRSVWZWCD@teste.10zb6tc.mongodb.net/?retryWrites=true&w=majority`)
.then(()=> {
    console.log('Conectamos ao mongoDB')
    app.listen(process.env.PORT || 3000)
})
.catch((err)=>{console.log(err)})


module.exports = app

