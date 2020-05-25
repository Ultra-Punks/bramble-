/* eslint-disable camelcase */
const router = require('express').Router()
const {Tag} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allTags = await Tag.findAll()

    res.json(allTags)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const tag = await Tag.findByPk(req.params.id)

    res.json(tag)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const tag = await Tag.destroy({
      where: {id: req.params.id}
    })

    res.json(tag)
  } catch (error) {
    next(error)
  }
})
