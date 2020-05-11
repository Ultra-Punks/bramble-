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

  const [textResults] = await client.textDetection(image)
  const detections = textResults.textAnnotations
  console.log('Text:')
  detections.forEach(text => console.log(text))

  const [logoResult] = await client.logoDetection(image)
  const logos = logoResult.logoAnnotations
  console.log('Logos:')
  logos.forEach(logo => console.log(logo))
}

router.get('/', (req, res, next) => {
  try {
    quickstart('https://anf.scene7.com/is/image/anf/hol_284783_ugc1?')
    res.send('TEST')
  } catch (err) {
    next(err)
  }
})
