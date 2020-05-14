const router = require('express').Router()
const {Location} = require('../db/models')
const Op = require('sequelize').Op
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const locations = await Location.findAll({
      where: {point: {[Op.ne]: null}}
    })
    res.json(locations)
  } catch (err) {
    next(err)
  }
})
