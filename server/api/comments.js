const router = require('express').Router()
const {PostComment} = require('../db/models')

module.exports = router

// get all comments
router.get('/', async (req, res, next) => {
  try {
    const allComments = await PostComment.findAll()
    res.json(allComments)
  } catch (error) {
    next(error)
  }
})

// get single comment according to commentId
router.get('/:commentId', async (req, res, next) => {
  try {
    const singleComment = await PostComment.findByPk(req.params.commentId)
    res.json(singleComment)
  } catch (error) {
    next(error)
  }
})
