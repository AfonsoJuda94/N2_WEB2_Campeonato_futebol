const mongoose = require('mongoose')
const Team = require('../models/Team')
const Player = require('../models/Player')
const router = require('express').Router()
//Inserção de time
router.post('/',async (req,res)=>{
    const {name, img, cidade,tecnico, site} = req.body
    //Identificando todos os jogadores cadastrados que sejam do time
    let jogadores = await Player.find()
    let jogadores_time = []
    jogadores.forEach(element => {
        if(element.time == name){
            console.log(element.time,name)
            jogadores_time.push(element.name)
        }
        console.log(jogadores_time)
    });
    
    if(!name){
        res.status(422).json({error: 'O nome é obrigatório'})
    }
    jogadores = jogadores_time
    const time = {
        name, img, cidade,tecnico, site, jogadores
    }
    try{
        if(jogadores.length >= 11){

            await Team.create(time)
            res.status(201).json({mensagem: 'Time inserido no sistema com sucesso'})
        }else{
            res.json({message:'Não foram regisrados 22 jogadores'})
        }
        
    }catch(error){
        res.status(500).json({error: error})
    }
})
//leitura de dados
router.get('/', async (req,res)=>{
    try{
        //retorna todos os dados
        const people = await Team.find()
        res.status(200).json(people)
    }catch(error){
        res.json({error: error})
    }
})
//Deleção de dados
router.delete('/:id',async (req,res)=>{
    const id  = req.params.id
    const person = await Team.findOne({_id: id})
    if(!person){
        res.status(422).json({message: "Time não encontrado"})
    }
    try{
        await Team.deleteOne({_id:id})
        res.status(200).json({message: 'Time removido com sucesso'})
    }
    catch(error){
        res.json({error:error})
    }   
})
    
//Atualização de dados (PUT, PATCH)
router.patch('/', async(req,res) =>{
    const id = req.body
    const {name, img, cidade,tecnico, site, jogadores} = req.body
    const person = {
        name, img, cidade,tecnico, site, jogadores
    }
    try{
        const update_person = await Team.updateOne({_id: id},person)
        if(update_person.matchedCount === 0){
            res.status(422).json({message: "Time não encontrado"})
        }
        res.status(200).json("Time atualizado com sucesso!")
    }catch(error){
        res.status(500).json({error: error})
    }
})


module.exports = router
