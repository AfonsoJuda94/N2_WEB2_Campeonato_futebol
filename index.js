//*******************************************************
//        Não implementei a autenticação com JWT
//*******************************************************
require('dotenv').config()

//Pacotes importados
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
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
//credenciais
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS
//register user
app.post('auth/register', async (req,res) =>{
    const {name, password} = req.body
    if(!name){
        return res.status(422).json({msg:'O nome é obrigatório'})
    }
})
// Checar token
function checkToken(req,res,next){
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if(!token){
        return res.json({msg: "Acesso negado"})
    }
}

//conexão mangoose
mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@teste.10zb6tc.mongodb.net/?retryWrites=true&w=majority`)
.then(()=> {
    console.log('Conectamos ao mongoDB')
    app.listen(3000)
})
.catch((err)=>{console.log(err)})




