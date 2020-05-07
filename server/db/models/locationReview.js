const Sequelize = require('sequelize')
const db = require('../db')

const LocationReviews = db.define('locationReviews', {
  ratings: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  comments: {
    type: Sequelize.TEXT,

  },
})

module.exports = LocationReviews
