const router = require('express').Router()
const vision = require('@google-cloud/vision')

module.exports = router

async function quickstart(image) {
  const client = new vision.ImageAnnotatorClient({
    keyFilename: 'server/api/bramble-vision.json'
  })
  const [result] = await client.labelDetection(image)
  const labels = result.labelAnnotations
  console.log('Labels:')
  labels.forEach(label => console.log(label))
}

router.get('/', (req, res, next) => {
  try {
    quickstart(
      'https://cdn.fstoppers.com/styles/full/s3/media/2018/06/20/nike_world_cup_2018_photoshoot_england_france_brazil_photos_taken_by_nick_pecori_photographer_tampa_orlando_florida_11.jpg'
    )
    res.send('TEST')
  } catch (err) {
    next(err)
  }
})
