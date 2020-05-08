const Sequelize = require('sequelize')
const db = require('../db')

const PostComment = db.define('postComment', {
  comment: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      isAlphanumeric: true
    }
  },
})

module.exports = PostComment
