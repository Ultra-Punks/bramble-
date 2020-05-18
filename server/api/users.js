const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// router.get('/', async (req, res, next) => {
//   try {
//     const users = await User.findAll({
//       // explicitly select only the id and email fields - even though
//       // users' passwords are encrypted, it won't help if we just
//       // send everything to anyone who asks!
//       attributes: ['id', 'email']
//     })
//     res.json(users)
//   } catch (err) {
//     next(err)
//   }
// })

// get ALL users
router.get('/', async (req, res, next) => {
  try {
    const allUsers = await User.findAll()
    res.json(allUsers)
  } catch (error) {
    next(error)
  }
})

// get single user (by id)
router.get('/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username
      },
      include: [{model: User, as: 'follower'}]
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// update an existing user (according to ID)
router.put('/:userId', async (req, res, next) => {
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
router.delete('/:userId', async (req, res, next) => {
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
