const {Car} = require('../dbTest/sequelize')
const {Op} =require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/cars', auth, (req,res) => {
        if(req.query.marque){
            const marque = req.query.marque
            return Car.findAndCountAll({where:{marque:{
                [Op.like]: `%${marque}%`}}})
            .then(count, rows =>{
                const message = `Il y a ${count} voiture qui correspondent à la recherche`
                res.json({message,data:rows})
            })
        }
        Car.findAll()
        .then(cars =>{
            const message = 'la liste des voitures est bien récupérée'
            res.json({message,data:cars})
        })
        .catch(error =>{
            const message = 'récupération du véhicule impossible'
            res.status(500).json({message, data:error})
        })
    })
}