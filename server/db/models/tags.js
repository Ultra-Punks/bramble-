const Sequelize = require('sequelize')
const db = require('../db')

const Tags = db.define('tags', {
  imageTags: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
})

module.exports = Tags
