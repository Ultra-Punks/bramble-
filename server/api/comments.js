const router = require('express').Router()
const {PostComment, UserPost, User} = require('../db/models')
const isCurrentUserMiddleware = require('./middleware')

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
    const singleComment = await PostComment.findByPk(req.params.commentId, {
      include: [{model: User}]
    })
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

// ==============================================
// KEEP WORKING THROUGH THIS...MAY NEED ADJUSTMENT
// create a new comment on a particular UserPost
router.post(
  '/add/:postId/',
  isCurrentUserMiddleware,
  async (req, res, next) => {
    try {
      const newComment = await PostComment.create({
        userPostId: req.params.postId,
        comment: req.body.comment,
        userId: req.session.passport.user
      })

      const userIncludedComment = await PostComment.findByPk(newComment.id, {
        include: [{model: User}]
      })

      res.status(201).json(userIncludedComment)
    } catch (error) {
      next(error)
    }
  }
)
// ==============================================

// increase the nuber of likes on a comment
router.put(
  '/:commentId/likes',
  isCurrentUserMiddleware,
  async (req, res, next) => {
    try {
      let updatedComment = await PostComment.findByPk(req.params.commentId, {
        include: [{model: User}]
      })
      updatedComment.likes++
      await updatedComment.save()
      res.status(200).json(updatedComment)
    } catch (error) {
      next(error)
    }
  }
)

//remove like on post
router.put(
  '/:commentId/likes/remove',
  isCurrentUserMiddleware,
  async (req, res, next) => {
    try {
      let updatedComment = await PostComment.findByPk(req.params.commentId, {
        include: [{model: User}]
      })
      updatedComment.likes--
      await updatedComment.save()
      res.status(200).json(updatedComment)
    } catch (error) {
      next(error)
    }
  }
)

// increase the number of dislikes on a comment
router.put(
  '/:commentId/dislikes',
  isCurrentUserMiddleware,
  async (req, res, next) => {
    try {
      let updatedComment = await PostComment.findByPk(req.params.commentId, {
        include: [{model: User}]
      })
      updatedComment.dislikes++
      await updatedComment.save()
      res.status(200).json(updatedComment)
    } catch (error) {
      next(error)
    }
  }
)

// remove dislike from post
router.put(
  '/:commentId/dislikes/remove',
  isCurrentUserMiddleware,
  async (req, res, next) => {
    try {
      let updatedComment = await PostComment.findByPk(req.params.commentId, {
        include: [{model: User}]
      })
      updatedComment.dislikes--
      await updatedComment.save()
      res.status(200).json(updatedComment)
    } catch (error) {
      next(error)
    }
  }
)

//delete comment by Id
router.delete(
  '/:commentId',
  isCurrentUserMiddleware,
  async (req, res, next) => {
    try {
      const numOfDeleted = await PostComment.destroy({
        where: {id: req.params.commentId}
      })
      res.status(200).json(numOfDeleted)
    } catch (error) {
      next(error)
    }
  }
)
