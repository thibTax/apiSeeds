const {Car} = require('../dbTest/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
    app.get('/api/cars/:id', auth, (req,res) => {
        Car.findByPk(req.params.id)
        .then(car =>{
            if(car===null){
                const message = 'impossible de retrouver la page demandée !'
                res.status(404).json({message})
            }
            const message = `la voiture ${req.params.id} à bien été trouvée`
            res.json({message,data:car})
        })
        .catch(error =>{
            const message = 'récupération du véhicule impossible'
            res.status(500).json({message, data:error})
        })
    })
}