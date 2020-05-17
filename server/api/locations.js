const router = require('express').Router()
const {Location} = require('../db/models')
const Op = require('sequelize').Op
module.exports = router

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
    // const locations = await Location.findAll()
    res.json(locations)
  } catch (err) {
    next(err)
  }
})
