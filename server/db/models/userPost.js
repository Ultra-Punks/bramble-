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

UserPost.prototype.increaseLikes = async function() {
  const newLikesCount = this.likes + 1
  await this.update({likes: newLikesCount})
}

UserPost.prototype.decreaseLikes = async function() {
  const newLikesCount = this.likes + 1
  await this.update({dislikes: newLikesCount})
}

module.exports = UserPost
