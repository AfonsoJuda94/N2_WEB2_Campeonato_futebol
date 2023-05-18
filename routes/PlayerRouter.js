const mongoose = require('mongoose')
const Team = require('../models/Team')
const Player = require('../models/Player')

const router = require('express').Router()
//Inserção de jogador
router.post('/',async (req,res)=>{
    const {name, foto, posicao, altura, peso, numero,idade,time} = req.body
    const person = {
        name, foto,posicao, altura, peso, numero,idade,time
    }
    if(!name){
        res.status(422).json({error: 'O nome é obrigatório'})
    }
    try{
        await Player.create(person)
        res.status(201).json({mensagem: 'Jogador inserido no sistema com sucesso'})
    }catch(error){
        res.status(500).json({error: error})
    }
})
//leitura de dados
router.get('/', async (req,res)=>{
    try{
        //retorna todos os dados
        const people = await Player.find()
        res.status(200).json(people)
    }catch(error){

    }
})
//Deleção de dados
router.delete('/:id',async (req,res)=>{
    const id  = req.params.id
    const person = await Player.findOne({_id: id})
    if(!person){
        res.status(422).json({message: "Jogador não encontrado"})
    }
    try{
        await Player.deleteOne({_id:id})
        res.status(200).json({message: 'Jogador removido com sucesso'})
    }
    catch(error){
        res.json({error:error})
    }   
})
//Atualização de dados (PUT, PATCH)
router.patch('/:id', async(req,res) =>{
    const id = req.params.id
    const {name, foto, posicao, altura, peso, numero,idade,time} = req.body

    const person = {
        name, foto, posicao, altura, peso, numero,idade,time
    }
    try{
        const update_person = await Player.updateOne({_id: id},person)
        if(update_person.matchedCount === 0){
            res.status(422).json({message: "Jogador não encontrado"})
        }
        res.status(200).json("Jogador atualizado com sucesso!")
    }catch(error){
        res.status(500).json({error: error})
    }
})
module.exports = router