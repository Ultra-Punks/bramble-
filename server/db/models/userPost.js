const Sequelize = require('sequelize')
const db = require('../db')

const UserPost = db.define('userPost', {
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  likes: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  dislikes: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = UserPost
