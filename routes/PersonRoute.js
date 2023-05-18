const router = require('express').Router()
const Person = require('../models/Person')


//criação de dados
router.post('/',async (req,res)=>{
    const {name,salary,approved} = req.body
    if(!name){
        res.status(422).json({error: 'O nome é obrigatório'})
    }
    if(!salary){
        res.status(422).json({error: 'O salário é obrigatório'})
    }
    
    const person = {
        name,salary,approved
    }
    try{
        await Person.create(person)
        res.status(201).json({mensagem: 'Pessoa inserida no sistema com sucesso'})
    }
    catch(error){
        res.status(500).json({error: error})
    }
})

//leitura de dados
router.get('/', async (req,res)=>{
    try{
        //retorna todos os dados
        const people = await Person.find()
        res.status(200).json(people)
    }catch(error){

    }
})
//Atualização de dados (PUT, PATCH)
router.patch('/:id', async(req,res) =>{
    const id = req.params.id
    const {name,salary,approved} = req.body
    const person = {
        name, salary, approved
    }
    try{
        const upate_person = await Person.updateOne({_id: id},person)
        if(update_person.matchedCount === 0){
            res.status(422).json({message: "Usuário não encontrado"})
        }
        res.status(200).json(person)
    }catch(error){
        res.status(500).json({error: error})
    }
})
//Deleção de dados
router.delete('/:id',async (req,res)=>{
    const id  = req.params.id
    const person = await Person.updateOne({_id: id})
        if(!person){
            res.status(422).json({message: "Usuário não encontrado"})
        }
        try{
            await Person.deleteOne({_id:id})
            res.status(200).json({message: 'Usuário removido com sucesso'})
        }
        catch(error){
            res.json({error:error})
        }
})

module.exports = router