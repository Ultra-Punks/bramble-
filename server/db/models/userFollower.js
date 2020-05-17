const db = require('../db')
const Sequelize = require('sequelize')

const UserFollower = db.define('userFollowers', {
  userId: {
    type: Sequelize.INTEGER
  }
})

module.exports = UserFollower
