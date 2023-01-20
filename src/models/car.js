const validTypes = ['voiture', 'utilitaire', 'camion', 'moto', 'scooter', 'mobylette']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Car', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      marque: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          notEmpty:{msg:'la marque ne peux pas être vide'},
          notNull:{msg:'la marque est une propriété requise'}
        }
      },
      modele: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          notEmpty:{msg:'le modele ne peux pas être vide'},
          notNull:{msg:'le modele est une propriété requise'}
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        /* validate:{
          isUrl:{msg:'Utiliser uniquement Url valide pour l\'image'},
          notNull:{msg:'l\'image est une propriété requise'}
        } */
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
          notEmpty:{msg:'le type de peux pas être vide'},
          notNull:{msg:'le type est une propriété requise'},
          isTypesValid(value){
              if(!validTypes.includes(value)){
                throw new Error(`le type de la voiture doit appartenir à la liste suivante : ${validTypes}`)
              }
            }
          }
        },
        /* puissance:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt:{msg:'la puissance ne peut être que des chiffres'},
          min:{
            args:[0],
            msg:'la puissance doit être supérieur ou égale à 0'
          },
          max:{
            args:[2000],
            msg:'la puissance doit être inférieur ou égale à 2000'
          },
          notNull:{msg:'le type est une propriété requise'}
        }
      }, */
      },
      
    {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }