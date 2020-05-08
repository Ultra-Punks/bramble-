const Sequelize = require('sequelize')
const db = require('../db')

const LocationReviews = db.define('locationReviews', {
  ratings: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  comments: {
    type: Sequelize.TEXT,

  },
})

module.exports = LocationReviews
