const router = require('express').Router()
const {User, Community} = require('../db/models')
module.exports = router

// get ALL users
router.get('/', async (req, res, next) => {
  try {
    const allUsers = await User.findAll({
      attributes: [
        'id',
        'name',
        'email',
        'username',
        'description',
        'profileImg'
      ]
    })
    res.json(allUsers)
  } catch (error) {
    next(error)
  }
})

// get single user (by username)
router.get('/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username
      },
      include: [
        {model: User, as: 'follower'},
        {model: User, as: 'following'},
        {model: Community, as: 'subscriber'}
      ]
    })

    if (req.session.passport) {
      const loggedIn = await User.findByPk(req.session.passport.user)
      const isFollowing = await loggedIn.hasFollowing(user)
      res.json({profile: user, isFollowing})
    } else {
      res.json({profile: user, isFollowing: false})
    }
  } catch (error) {
    next(error)
  }
})

// update an existing user (according to ID)
router.put('/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username
      }
    })
    if (user) {
      const updatedUser = user.update({
        name: req.body.name,
        email: req.body.email,
        imageUrl: req.body.imageUrl,
        password: req.body.password,
        description: req.body.description
      })
      res.json(updatedUser)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

// delete an existing user by id
router.delete('/:username', async (req, res, next) => {
  try {
    const deletedUser = await User.findOne({
      where: {
        username: req.params.username
      }
    })
    if (deletedUser) {
      await deletedUser.destroy()
      res.status(204).json(deletedUser)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

// increase the number of followers && follow a new user
router.put('/follow/user', async (req, res, next) => {
  try {
    let loggedInUser = await User.findByPk(req.session.passport.user)

    let newFollowing = await User.findOne({
      where: {
        username: req.body.username
      }
    })

    loggedInUser.addFollowing(newFollowing.id) //magic method
    loggedInUser.increaseFollowing() // instance method
    newFollowing.increaseFollowers() // instance method

    await loggedInUser.save()
    await newFollowing.save()

    const updatedUser = await User.findOne({
      where: {
        username: req.body.username
      },
      include: [{model: User, as: 'follower'}, {model: User, as: 'following'}]
    })
    const isFollowing = loggedInUser.hasFollowing(newFollowing)

    res.json({profile: updatedUser, isFollowing: isFollowing})
  } catch (error) {
    next(error)
  }
})

// decrease the number of followers && unfollow a user
router.put('/unfollow/user', async (req, res, next) => {
  try {
    let loggedInUser = await User.findByPk(req.session.passport.user)

    let newUnfollowing = await User.findOne({
      where: {
        username: req.body.username
      }
    })

    loggedInUser.removeFollowing(newUnfollowing.id) //magic method
    loggedInUser.decreaseFollowing() // instance method
    newUnfollowing.decreaseFollowers() // instance method

    await loggedInUser.save()
    await newUnfollowing.save()

    const updatedUser = await User.findOne({
      where: {
        username: req.body.username
      },
      include: [{model: User, as: 'follower'}, {model: User, as: 'following'}]
    })

    const isFollowing = await loggedInUser.hasFollowing(updatedUser)

    res.json({profile: updatedUser, isFollowing: isFollowing})
  } catch (error) {
    next(error)
  }
})
