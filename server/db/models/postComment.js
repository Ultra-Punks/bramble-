const Sequelize = require('sequelize')
const db = require('../db')

const PostComment = db.define('postComment', {
  imgFile: {
    type: Sequelize.BLOB,
    allowNull: false,
  },
})

module.exports = PostComment
