const Sequelize = require('sequelize')
const db = require('../db')

const Location = db.define('location', {
  //below are new geoJSON specific fields, in the same order as this: https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
  //'point' has been renamed 'geometry'
  type: {
    type: Sequelize.STRING,
    defaultValue: 'Feature'
  },
  mapId: {
    type: Sequelize.STRING
  },
  text: {
    type: Sequelize.TEXT
  },
  place_name: {
    type: Sequelize.TEXT
  },
  place_type: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  center: {
    type: Sequelize.ARRAY(Sequelize.FLOAT)
  },
  geometry: {
    type: Sequelize.JSON
  },
  properties: {
    type: Sequelize.JSON
  },
  context: {
    type: Sequelize.ARRAY(Sequelize.JSON)
  },
  //original columns/properties below
  coverImg: {
    type: Sequelize.STRING,
    defaultValue:
      'https://media.gettyimages.com/photos/aerial-view-of-lower-manhattan-new-york-picture-id946087016?s=612x612'
  },
  address: {
    type: Sequelize.STRING
    // allowNull: false,
    //   validate: {
    //     notEmpty: true
    //   }
  },
  city: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
      // isAlphanumeric: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    validate: {
      // isAlphanumeric: true
    }
  },
  //popup controls if popup is being displayed
  popup: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

module.exports = Location
