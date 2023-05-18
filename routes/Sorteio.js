mongoose = require('mongoose')
const router = require('express').Router()
const Team = require('../models/Team')
const jsonConverter = require('json-array-converter')
router.get('/', async (req,res)=>{
    //Obtendo times
    const times = await Team.find()
    const lista_times = []
    times.forEach(element => {
        lista_times.push(element.name)
    });
    //Montando partidas 
    let partidas = []
    let p_copia = lista_times
    if(lista_times.length == 8){
        //Selecionar 4 times. Descartar se os dois forem iguais ou se já tiverem sido escolhidos
        while(partidas.length != 4){
            let x = Math.floor(Math.random() * p_copia.length)
            let y = Math.floor(Math.random() * p_copia.length)
            var teamA = p_copia[x]
            var teamB = p_copia[y]
            if(teamA!=teamB && (teamA!=0 && teamB!=0)){
                p_copia[x]=0
                p_copia[y]=0
                partidas.push(teamA+" VS "+teamB)
            }      
        }
        res.json(partidas)
    }
    
})

module.exports = router