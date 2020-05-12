/* eslint-disable camelcase */
const router = require('express').Router()
const {Photo} = require('../db/models')
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: 'bramble',
  api_key: '827947846641161',
  api_secret: 'TM2mXCh1AgICmWW-JxfHob0wlNc'
})

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    // const photos = await Photo.findAll()
    await cloudinary.uploader.upload(
      'server/api/random.jpg',
      {
        folder: 'sample_folder',
        public_id: 'user_1'
      },
      function(error, result) {
        console.log(result, error)
      }
    )

    res.json('TEST')
  } catch (err) {
    next(err)
  }
})

// router.post('/add', (req, res, next) => {})
