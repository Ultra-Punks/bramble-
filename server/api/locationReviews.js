const router = require('express').Router()
const {LocationReview, Location, User} = require('../db/models')

module.exports = router

// NOTE: reviews are mounted on /api/reviews

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

// get all reviews of a specific location
router.get('/of/:locationId', async (req, res, next) => {
  try {
    const locationReviews = await Location.findOne({
      where: {
        id: req.params.locationId
      }
    })
    res.json(locationReviews)
  } catch (error) {
    next(error)
  }
})

// get all reviews from a specific user
router.get('/from/:username', async (req, res, next) => {
  try {
    const allUserReviews = await User.findOne({
      where: {
        username: req.params.username
      },
      include: [{model: LocationReview}]
    })
    res.json(allUserReviews.locationReviews)
  } catch (error) {
    next(error)
  }
})

// add a new review
router.post('/of/:locationId', async (req, res, next) => {
  try {
    const {ratings, comments} = req.body
    const newReview = await LocationReview.create({
      locationId: req.params.locationId,
      userId: req.user.id,
      ratings,
      comments
    })
    const location = await Location.findByPk(req.params.locationId, {
      include: [{model: LocationReview}, {model: User}]
    })
    // console.log('new review', newReview)
    res.json(location)
  } catch (error) {
    next(error)
  }
})

// delete a review by Id
router.delete('/:reviewId', async (req, res, next) => {
  try {
    const numOfDeleted = await LocationReview.destroy({
      where: {id: req.params.reviewId}
    })
    res.status(200).json(numOfDeleted)
  } catch (error) {
    next(error)
  }
})
