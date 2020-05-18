/* eslint-disable camelcase */
const router = require('express').Router()

const {User} = require('../db/models')

module.exports = router

router.get('/:username', async (req, res, next) => {
  try {
    let user = await User.findOne({
      where: {
        username: req.params.username
      },
      include: [
        {
          model: User,
          as: 'following'
        }
      ]
    })

    res.json(user)
  } catch (error) {
    console.error(error)
  }
})
