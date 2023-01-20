const {Car} = require('../dbTest/sequelize')
const { ValidationError } = require('sequelize')
const auth = require('../auth/auth')
  
module.exports = (app) => {
  app.put('/api/cars/:id', auth, (req, res) => {
    const id = req.params.id
    Car.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Car.findByPk(id).then(car => {
        if(car===null){
            const message = 'impossible de retrouver la page demandée !'
            res.status(404).json({message})
        }
        const message = `La voiture ${car.marque} a bien été modifiée.`
        res.json({message, data: car })
      })
    })
    .catch(error =>{
        if(error instanceof ValidationError){
            return res.status(404).json({message:error.message, data: error})
        }
        const message = 'modification du véhicule impossible'
        res.status(500).json({message, data:error})
    })
})
}