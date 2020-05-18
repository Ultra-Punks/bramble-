/* eslint-disable camelcase */
const router = require('express').Router()

const {User, UserPost} = require('../db/models')

module.exports = router

router.get('/:username', async (req, res, next) => {
  try {
    let user = await User.findOne({
      where: {
        username: req.params.username
      }
    })
    res.json(await user.getFollower())
  } catch (error) {
    console.error(error)
  }
})
