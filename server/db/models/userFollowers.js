const Sequelize = require('sequelize')
const db = require('../db')

const UserFollowers = db.define('userFollowers', {})

module.exports = UserFollowers

