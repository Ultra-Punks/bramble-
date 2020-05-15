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
    console.error(error)
  }
})

//////////////////////////
// CLOUDINARY REQUEST!!!//
//////////////////////////

// gets all of a user's photos
// router.get('/:username', async (req, res, next) => {
//   try {
//     const user = req.params.username
//     console.log(user)
//     await cloudinary.search
//       .expression(`user_uploads/${user}`)
//       .with_field('context')
//       .with_field('tags')
//       .max_results(10)
//       .execute()
//       .then((result) => res.json(result.resources))
//   } catch (err) {
//     next(err)
//   }
// })
