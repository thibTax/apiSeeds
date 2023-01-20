const {Car} = require('../dbTest/sequelize')
const { ValidationError } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.post('/api/cars', auth, (req,res) => {
        Car.create(req.body)
        .then(car =>{
            const message = `la voiture ${req.params.id} à bien été crée`
            res.json({message,data:car})
        })
        .catch(error =>{
            if(error instanceof ValidationError){
                return res.status(404).json({message:error.message, data: error})
            }
            const message = 'récupération du véhicule impossible'
            res.status(500).json({message, data:error})
        })
    })
}