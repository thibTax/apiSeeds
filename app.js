const express = require('express')
const sequelize = require('./src/dbTest/sequelize')
const bodyParser = require ('body-parser')

/* a mettre dans package.json NODE_ENV=production / NODE_ENV=development*/

const app = express()
const port = process.env.PORT || 3001

//midleware
app
    .use(bodyParser.json())

//initialiser la bdd avec sequelize
sequelize.initDb()

app.get('/',(req,res)=>{
    res.json('hello heroku !')
})


// endpoint for CRUD
require('./src/routes/findAllCars')(app)
require('./src/routes/findByPk')(app)
require('./src/routes/createCar')(app)
require('./src/routes/updateCar')(app)
require('./src/routes/deleteByPk')(app)
require('./src/routes/login')(app)

// gestion d'erreurs 404
app.use(({res})=>{
    const message = 'impossible de retrouver la page demandée !'
    res.status(404).json({message})
})

app.listen(port,()=> console.log(`App node demarée sur le port : ${port}`))