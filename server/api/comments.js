const router = require('express').Router()
const {PostComment, UserPost, User} = require('../db/models')

module.exports = router

// NOTE: comments are mounted on /api/comments

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

// get all comments of a specific user post
router.get('/on/:userPostId', async (req, res, next) => {
  try {
    const userPostComments = await UserPost.findOne({
      where: {
        id: req.params.userPostId
      },
      include: [{model: PostComment}]
    })
    res.json(userPostComments)
  } catch (error) {
    next(error)
  }
})

// get all comments from a specific user
router.get('/from/:username', async (req, res, next) => {
  try {
    const allUserComments = await User.findOne({
      where: {
        username: req.params.username
      },
      include: [{model: PostComment}]
    })
    res.json(allUserComments.postComments)
  } catch (error) {
    next(error)
  }
})