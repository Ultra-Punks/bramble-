/* eslint-disable camelcase */
const router = require('express').Router()
const {UserPost, User} = require('../db/models')

module.exports = router

//gets all posts
router.get('/', async (req, res, next) => {
  try {
    const allPosts = await UserPost.findAll()
    res.json(allPosts)
  } catch (error) {
    next(error)
  }
})

//gets single post according to postId
router.get('/:postId', async (req, res, next) => {
  try {
    const singlePost = await UserPost.findByPk(req.params.postId)
    res.json(singlePost)
  } catch (error) {
    next(error)
  }
})

//gets all posts from specific user
router.get('/from/:username', async (req, res, next) => {
  try {
    const allUserPosts = await User.findOne({
      where: {
        username: req.params.username
      },
      include: [{model: UserPost}]
    })
    res.json(allUserPosts.userPosts)
  } catch (error) {
    next(error)
  }
})

//creates new post according to user
router.post('/add/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username
      }
    })

    const newPost = await UserPost.create(
      {userId: user.id, description: req.body.description}
      // {include: [{model: User}]}
    )

    res.json(newPost)
  } catch (error) {
    next(error)
  }
})

//delete post by Id
router.delete('/:postId', async (req, res, next) => {
  try {
    const numOfDeleted = await UserPost.destroy({
      where: {id: req.params.postId}
    })
    res.status(200).json(numOfDeleted)
  } catch (error) {
    next(error)
  }
})
