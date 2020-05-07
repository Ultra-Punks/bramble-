const Sequelize = require('sequelize')
const db = require('../db')

const Photos = db.define('photos', {
  imgFile: {
    type: Sequelize.BLOB,
    allowNull: false,
  },
})

module.exports = Photos
