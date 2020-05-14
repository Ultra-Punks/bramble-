const router = require('express').Router()
const {LocationReview} = require('../db/models')

module.exports = router

// get all reviews
router.get('/', async (req, res, next) => {
  try {
    const allReviews = await LocationReview.findAll()
    res.json(allReviews)
  } catch (error) {
    next(error)
  }
})

// get single review according to reviewId
router.get('/:reviewId', async (req, res, next) => {
  try {
    const singleReview = await LocationReview.findByPk(req.params.reviewId)
    res.json(singleReview)
  } catch (error) {
    next(error)
  }
})
