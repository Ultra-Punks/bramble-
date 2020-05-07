const Sequelize = require('sequelize')
const db = require('../db')

const Community = db.define('community', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  profileImg: {
    type: Sequelize.BLOB,
  },
})

module.exports = Community
