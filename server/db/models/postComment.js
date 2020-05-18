const Sequelize = require('sequelize')
const db = require('../db')

const PostComment = db.define('postComment', {
  comment: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
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

PostComment.prototype.increaseLikes = async function() {
  const newLikesCount = this.likes + 1
  await this.update({likes: newLikesCount})
}

PostComment.prototype.decreaseLikes = async function() {
  const newLikesCount = this.likes + 1
  await this.update({dislikes: newLikesCount})
}

module.exports = PostComment
