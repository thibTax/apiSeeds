const {Car} = require('../dbTest/sequelize')
const auth = require('../auth/auth')
  
module.exports = (app) => {
  app.delete('/api/cars/:id', auth, (req, res) => {
    Car.findByPk(req.params.id).then(car => {
      if(car===null){
        const message = 'impossible de retrouver la page demandée !'
        return res.status(404).json({message})
    }
      const carDeleted = car;
      return Car.destroy({
        where: { id: car.id }
      })
      .then(_ => {
        const message = `La voiture avec l'identifiant n°${carDeleted.id} a bien été supprimé.`
        res.json({message, data: carDeleted })
      })
    })
    .catch(error =>{
      const message = 'impossible de supprimer le véhicule'
      res.status(500).json({message, data:error})
  })
  })
}