const router = require('express').Router()
const {Location} = require('../db/models')
const Op = require('sequelize').Op
module.exports = router

// single location routes
router.post('/add', async (req, res, next) => {
  try {
    const {
      place_type,
      properties,
      text,
      place_name,
      center,
      geometry,
      context,
      name,
      city,
      address
    } = req.body
    const location = await Location.create({
      place_type,
      properties,
      text,
      place_name,
      center,
      geometry,
      context,
      name,
      city,
      address,
      popup: false
    })
    res.json(location)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const location = await Location.findByPk(req.params.id)
    res.json(location)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    //below will only return locations with coordinates
    const locations = await Location.findAll({
      where: {geometry: {[Op.ne]: null}}
    })
    res.json(locations)
  } catch (err) {
    next(err)
  }
})
