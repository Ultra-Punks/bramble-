const Sequelize = require('sequelize')
const db = require('../db')

const Photos = db.define('photos', {
  imgFile: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
})

module.exports = Photos
