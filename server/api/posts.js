/* eslint-disable camelcase */
const router = require('express').Router()
const {scanner} = require('../imageRec')
const {Op} = require('sequelize')

const {
  UserPost,
  User,
  Photo,
  Community,
  Tag,
  PostComment
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
      include: [{model: Photo, include: {model: Tag}}, {model: User}]
    })
    res.json(singlePost)
  } catch (error) {
    next(error)
  }
})

//gets all posts from specific user
router.get('/from/:username', async (req, res, next) => {
  // order: [['createdAt', 'DESC']],
  try {
    // const allUserPosts = await User.findOne({
    //   where: {
    //     username: req.params.username,
    //   },
    //   include: [
    //     {
    //       model: UserPost,
    //       include: [
    //         {model: Photo, include: [{model: Tag}]},
    //         {model: PostComment, include: [{model: User}]},
    //       ],
    //     },
    //   ],
    // })

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
        {model: PostComment, include: [{model: User}]}
      ],
      order: [['createdAt', 'DESC']]
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

    console.log(Object.keys(User.prototype))

    let arrOfIds = allFollowing.map(user => {
      return user.id
    })

    //WIP ARR OF COMMUNITY IDS USER IS SUBBED TO
    let arrOfComIds = allSubs.map(sub => {
      return sub.id
    })

    arrOfIds.push(loggedInUser.id)

    const feed = await UserPost.findAll({
      where: {userId: arrOfIds},
      include: [
        {model: User},
        {model: Photo, include: [{model: Tag}]},
        {model: PostComment, include: [{model: User}]}
      ],
      order: [['createdAt', 'DESC']]
    })

    res.json(feed)
  } catch (error) {
    next(error)
  }
})

//gets all posts for user by community
router.get('/for/:id', async (req, res, next) => {
  try {
    const allCommunityPosts = await Community.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: UserPost,
          include: [
            {
              model: User,
              include: [{model: PostComment, include: [{model: User}]}]
            },
            {model: PostComment, include: [{model: User}]}
          ]
        }
      ]
    })
    res.json(allCommunityPosts)
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

    let newPost = await UserPost.create({
      userId: user.id,
      description: req.body.description
    })

    if (req.body.photo) {
      const newPhoto = await Photo.create({
        userPostId: newPost.id,
        userId: user.id,
        imgFile: req.body.photoInfo
      })

      const scannedLabels = await scanner(req.body.photoInfo)

      scannedLabels.forEach(label => {
        Tag.create({
          imageTag: label,
          userPostId: newPost.id,
          photoId: newPhoto.id,
          userId: user.id
        })
      })

      const postWithPics = await UserPost.findByPk(newPost.id, {
        include: [{model: Photo, include: [{model: Tag}]}]
      })

      res.json(postWithPics)
    } else {
      newPost = await UserPost.findByPk(newPost.id, {
        include: [{model: Photo}]
      })

      res.json(newPost)
    }
  } catch (error) {
    next(error)
  }
})

// increase the nuber of likes on a post
router.put('/:postId/likes', async (req, res, next) => {
  try {
    let updatedPostLikes = await UserPost.findByPk(req.params.postId)
    updatedPostLikes.likes++
    await updatedPostLikes.save()
    res.status(200).json(updatedPostLikes)
  } catch (error) {
    next(error)
  }
})

// increase the number of dislikes on a post
router.put('/:postId/dislikes', async (req, res, next) => {
  try {
    let updatedPostDislikes = await UserPost.findByPk(req.params.postId)
    await updatedPostDislikes.increaseDislikes()
    // await updatedPostDislikes.save()
    res.status(200).json(updatedPostDislikes)
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
