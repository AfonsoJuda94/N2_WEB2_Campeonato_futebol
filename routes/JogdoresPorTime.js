const mongoose= require('mongoose')
const router = require('express').Router()
const Team = require('../models/Team')

//Função para listar jogadores de um time 
router.get('/:id',async (req,res)=>{
    const id = req.params.id
    try{
        const team = await Team.findById(id) 
        let jogadores = team.jogadores
        res.json(jogadores)
    }catch(e){
        res.json({error: e})
    }
})

module.exports = router