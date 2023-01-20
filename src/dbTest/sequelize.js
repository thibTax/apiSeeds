const {Sequelize, DataTypes} = require('sequelize')
const CarModel =require('../models/car')
const UserModel = require('../models/users')
const cars = require('../dbTest/dbCar')
const bcrypt = require ('bcrypt')

//Instance of sequelize
const sequelize = new Sequelize(
    'cardb',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions :{
            timezone: 'Etc/GMT-2'
        },
        loggin :false 
    }
)

// auth sequelize 
sequelize.authenticate()
    .then(_=> console.log('database is auth'))
    .catch(error => console.log(`la bdd n'est pas établie : ${error}`))

// create the model of table
const Car = CarModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

// synch sequelize avec xamp
const initDb = () =>{
    return sequelize.sync({force:true}).then(_  => {
    
    cars.map(car=>{
        Car.create({
            marque:car.marque,
            modele:car.modele,
            picture:car.picture,
            types:car.types
        })
        .then(test => console.log(test.toJSON()))
    })
    bcrypt.hash('load', 10)
    .then(hash=> User.create({username:'load', password:hash}))
    .then(user=> console.log(user.toJSON()))
   
    console.log('la bdd est synchronisée')
})
}

module.exports={initDb, Car, User}