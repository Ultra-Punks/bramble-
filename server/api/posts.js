/* eslint-disable max-statements */
/* eslint-disable camelcase */
const router = require('express').Router()
const scanner = require('../../imageRec')
const {Op} = require('sequelize')
const isCurrentUserMiddleware = require('./middleware')

const {
  UserPost,
  User,
  Photo,
  Community,
  Tag,
  PostComment,
  Location
} = require('../db/models')

module.exports = router

//gets all posts
router.get('/', async (req, res, next) => {
  try {
    const allPosts = await UserPost.findAll({
      include: [{model: Photo, include: [{model: Tag}]}]
    })
    res.json(allPosts)
  } catch (error) {
    next(error)
  }
})

//gets single post according to postId
router.get('/:postId', async (req, res, next) => {
  try {
    const singlePost = await UserPost.findByPk(req.params.postId, {
      include: [
        {model: Photo, include: {model: Tag}},
        {model: User},
        {model: Community, attributes: ['name']},
        {
          model: PostComment,
          include: [{model: User}]
        }
      ],
      order: [[{model: PostComment}, 'createdAt', 'ASC']]
    })
    res.json(singlePost)
  } catch (error) {
    next(error)
  }
})

//gets all posts from specific user
router.get('/from/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username
      }
    })

    const allUserPosts = await UserPost.findAll({
      where: {
        userId: user.id
      },
      include: [
        {model: Photo, include: [{model: Tag}]},
        {model: Community, attributes: ['name']},
        {
          model: PostComment,
          include: [{model: User}]
        }
      ],
      order: [['createdAt', 'DESC'], [{model: PostComment}, 'createdAt', 'ASC']]
    })

    res.json(allUserPosts)
  } catch (error) {
    next(error)
  }
})

router.get('/from/:username/following', async (req, res, next) => {
  try {
    const loggedInUser = await User.findOne({
      where: {
        username: req.params.username
      }
    })

    const allFollowing = await loggedInUser.getFollowing()
    const allSubs = await loggedInUser.getSubscriber()

    let arrOfIds = allFollowing.map(user => {
      return user.id
    })

    //WIP ARR OF COMMUNITY IDS USER IS SUBBED TO
    let arrOfComIds = allSubs.map(sub => {
      return sub.id
    })

    arrOfIds.push(loggedInUser.id)

    const feed = await UserPost.findAll({
      where: {[Op.or]: [{userId: arrOfIds}, {communityId: arrOfComIds}]},
      include: [
        {model: User},
        {model: Community, attributes: ['name']},
        {model: Photo, include: [{model: Tag}]},
        {
          model: PostComment,
          include: [{model: User}]
        }
      ],
      order: [['createdAt', 'DESC'], [{model: PostComment}, 'createdAt', 'ASC']]
    })

    const allLocations = await Location.findAll({
      where: {[Op.or]: [{userId: arrOfIds}, {communityId: arrOfComIds}]},
      include: [{model: User}, {model: Community}],
      order: [['createdAt', 'DESC']]
    })

    let results = []

    feed.forEach(post => {
      results.push(post)
    })

    allLocations.forEach(location => {
      results.push(location)
    })

    results.sort((a, b) => b.createdAt - a.createdAt)

    res.json(results)
  } catch (error) {
    next(error)
  }
})

//gets all posts for user by community
router.get('/for/:id', async (req, res, next) => {
  try {
    const feed = await UserPost.findAll({
      where: {communityId: req.params.id},
      include: [
        {model: User},
        {model: Community, attributes: ['name']},
        {model: Photo, include: [{model: Tag}]},
        {
          model: PostComment,
          include: [{model: User}]
        }
      ],
      order: [['createdAt', 'DESC'], [{model: PostComment}, 'createdAt', 'ASC']]
    })

    res.json(feed)
  } catch (error) {
    next(error)
  }
})

const videoTypes = ['.mp4', '.avi', '.mov', '.flv', '.wmv']

//creates new post according to user
router.post(
  '/add/:username',
  isCurrentUserMiddleware,
  async (req, res, next) => {
    try {
      const user = await User.findOne({
        where: {
          username: req.params.username
        }
      })

      //check to see if body has a file url
      if (req.body.file) {
        const file = req.body.file
        const fileType = file.slice(file.lastIndexOf('.'))

        //check to see if the url type is a video
        if (videoTypes.includes(fileType)) {
          let comId = req.body.communityId
          if (comId === 'none') comId = null
          let newPost = await UserPost.create({
            userId: user.id,
            description: req.body.description,
            communityId: comId,
            videoUrl: req.body.file
          })

          newPost = await UserPost.findByPk(newPost.id, {
            include: [
              {model: User},
              {model: Community, attributes: ['name']},
              {model: Photo, include: [{model: Tag}]},
              {
                model: PostComment,
                include: [{model: User}]
              }
            ],
            order: [[{model: PostComment}, 'createdAt', 'ASC']]
          })

          res.json(newPost)
        } else {
          //file is an image
          let comId = req.body.communityId
          if (comId === 'none') comId = null
          let newPost = await UserPost.create({
            userId: user.id,
            description: req.body.description,
            communityId: comId
          })

          const newPhoto = await Photo.create({
            userPostId: newPost.id,
            userId: user.id,
            imgFile: req.body.file
          })

          const scannedLabels = await scanner(req.body.file)

          scannedLabels.forEach(label => {
            Tag.create({
              imageTag: label,
              userPostId: newPost.id,
              photoId: newPhoto.id,
              userId: user.id
            })
          })

          const postWithPics = await UserPost.findByPk(newPost.id, {
            include: [
              {model: User},
              {model: Community, attributes: ['name']},
              {model: Photo, include: [{model: Tag}]},
              {
                model: PostComment,
                include: [{model: User}]
              }
            ],
            order: [[{model: PostComment}, 'createdAt', 'ASC']]
          })

          res.json(postWithPics)
        }
      } else {
        //body has no file url
        let comId = req.body.communityId
        if (comId === 'none') comId = null
        let newPost = await UserPost.create({
          userId: user.id,
          description: req.body.description,
          communityId: comId
        })

        newPost = await UserPost.findByPk(newPost.id, {
          include: [
            {model: User},
            {model: Community, attributes: ['name']},
            {model: Photo, include: [{model: Tag}]},
            {
              model: PostComment,
              include: [{model: User}]
            }
          ],
          order: [[{model: PostComment}, 'createdAt', 'ASC']]
        })

        res.json(newPost)
      }
    } catch (error) {
      next(error)
    }
  }
)

// increase the number of likes on a post
router.put(
  '/:postId/likes',
  isCurrentUserMiddleware,
  async (req, res, next) => {
    try {
      let updatedPostLikes = await UserPost.findByPk(req.params.postId, {
        include: [
          {model: User},
          {model: Community, attributes: ['name']},
          {model: Photo, include: [{model: Tag}]},
          {
            model: PostComment,
            include: [{model: User}]
          }
        ],
        order: [[{model: PostComment}, 'createdAt', 'ASC']]
      })
      updatedPostLikes.likes++
      await updatedPostLikes.save()
      res.status(200).json(updatedPostLikes)
    } catch (error) {
      next(error)
    }
  }
)

// remove like on a post
router.put(
  '/:postId/likes/remove',
  isCurrentUserMiddleware,
  async (req, res, next) => {
    try {
      let updatedPostLikes = await UserPost.findByPk(req.params.postId, {
        include: [
          {model: User},
          {model: Community, attributes: ['name']},
          {model: Photo, include: [{model: Tag}]},
          {
            model: PostComment,
            include: [{model: User}]
          }
        ],
        order: [[{model: PostComment}, 'createdAt', 'ASC']]
      })
      updatedPostLikes.likes--
      await updatedPostLikes.save()
      res.status(200).json(updatedPostLikes)
    } catch (error) {
      next(error)
    }
  }
)

// increase the number of dislikes on a post
router.put(
  '/:postId/dislikes',
  isCurrentUserMiddleware,
  async (req, res, next) => {
    try {
      let updatedPostDislikes = await UserPost.findByPk(req.params.postId, {
        include: [
          {model: User},
          {model: Community, attributes: ['name']},
          {model: Photo, include: [{model: Tag}]},
          {
            model: PostComment,
            include: [{model: User}]
          }
        ],
        order: [[{model: PostComment}, 'createdAt', 'ASC']]
      })
      updatedPostDislikes.dislikes++
      await updatedPostDislikes.save()
      res.status(200).json(updatedPostDislikes)
    } catch (error) {
      next(error)
    }
  }
)

// remove dislike on a post
router.put(
  '/:postId/dislikes/remove',
  isCurrentUserMiddleware,
  async (req, res, next) => {
    try {
      let updatedPostDislikes = await UserPost.findByPk(req.params.postId, {
        include: [
          {model: User},
          {model: Community, attributes: ['name']},
          {model: Photo, include: [{model: Tag}]},
          {
            model: PostComment,
            include: [{model: User}]
          }
        ],
        order: [[{model: PostComment}, 'createdAt', 'ASC']]
      })
      updatedPostDislikes.dislikes--
      await updatedPostDislikes.save()
      res.status(200).json(updatedPostDislikes)
    } catch (error) {
      next(error)
    }
  }
)

//delete post by Id
router.delete('/:postId', isCurrentUserMiddleware, async (req, res, next) => {
  try {
    const numOfDeleted = await UserPost.destroy({
      where: {id: req.params.postId}
    })
    res.status(200).json(numOfDeleted)
  } catch (error) {
    next(error)
  }
})

// get random posts
router.put('/random', async (req, res, next) => {
  try {
    const arrOfIds = req.body.postIds
    const randomPosts = await UserPost.findAll({
      where: {id: arrOfIds}
    })
    res.json(randomPosts)
  } catch (error) {
    next(error)
  }
})
