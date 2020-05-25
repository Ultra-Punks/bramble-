/* eslint-disable camelcase */
const router = require('express').Router()
const cloudinary = require('cloudinary').v2
const {cloudName, apiKey, apiSecret} = require('../../secrets')
const {User, Photo} = require('../db/models')

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret
})

module.exports = router

router.get('/from/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {username: req.params.username}})

    let allPhotos = await Photo.findAll({where: {userId: user.id}})

    res.json(allPhotos)
  } catch (error) {
    next(error)
  }
})

router.get('/from/community/:id', async (req, res, next) => {
  try {
    let allPhotos = await Photo.findAll({where: {communityId: req.params.id}})

    res.json(allPhotos)
  } catch (error) {
    next(error)
  }
})
