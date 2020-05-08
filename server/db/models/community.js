const Sequelize = require('sequelize')
const db = require('../db')

const Community = db.define('community', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isAlphanumeric: true,
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  profileImg: {
    type: Sequelize.TEXT,
    defaultValue: 'https://image.shutterstock.com/image-vector/group-five-people-community-icon-260nw-455816902.jpg'
  },
})

module.exports = Community
