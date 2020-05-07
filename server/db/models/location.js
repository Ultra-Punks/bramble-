const Sequelize = require('sequelize')
const db = require('../db')

const Location = db.define('location', {
  coodinates: {
    type: Sequelize.GEOMETRY,
    allowNull: true,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  
  }
})

module.exports = Location
