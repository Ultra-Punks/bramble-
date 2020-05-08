const Sequelize = require('sequelize')
const db = require('../db')

const Location = db.define('location', {
  // coordinates: {
  //   type: Sequelize.GEOMETRY('POINT'),
  //   allowNull: true,
  // },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      noteEmpty: true,
      isAlphanumeric: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    validate: {
      isAlphanumeric: true
    }
  }
})

module.exports = Location
