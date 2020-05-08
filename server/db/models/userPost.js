const Sequelize = require('sequelize')
const db = require('../db')

const UserPost = db.define('userPost', {
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
})

module.exports = UserPost
