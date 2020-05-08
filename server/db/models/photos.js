const Sequelize = require('sequelize')
const db = require('../db')

const Photo = db.define('photo', {
  imgFile: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
})

module.exports = Photo
