const Sequelize = require('sequelize')
const db = require('../db')

const Location = db.define('location', {
  point: {
    type: Sequelize.GEOMETRY,
    allowNull: true
  },
  address: {
    type: Sequelize.STRING,
    // allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
      // isAlphanumeric: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    validate: {
      // isAlphanumeric: true
    }
  },
  //popup controls if popup is being displayed
  popup: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

module.exports = Location
