const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/locations', require('./locations'))
router.use('/posts', require('./posts'))
router.use('/test', require('./google-vision'))
router.use('/community', require('./community'))
router.use('/photos', require('./photos'))
router.use('/reviews', require('./locationReviews'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
