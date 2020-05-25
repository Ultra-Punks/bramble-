const router = require('express').Router()
const vision = require('@google-cloud/vision')

module.exports = router

async function quickstart(image) {
  let allLabels = []

  const client = new vision.ImageAnnotatorClient({
    keyFilename: 'server/api/GoogleVisionSecret.json'
  })
  const [result] = await client.labelDetection(image)
  const labels = result.labelAnnotations
  labels.forEach(label => allLabels.push(label.description))

  const [textResults] = await client.textDetection(image)
  const detections = textResults.textAnnotations
  detections.forEach(text => allLabels.push(text.description))

  const [logoResult] = await client.logoDetection(image)
  const logos = logoResult.logoAnnotations
  logos.forEach(logo => allLabels.push(logo.description))

  return allLabels
}

router.get('/', async (req, res, next) => {
  try {
    let labels = await quickstart(
      'https://res.cloudinary.com/bramble/image/upload/v1589609673/user_uploads/franco/ddqs36.jpg'
    )

    res.send('TEST')
  } catch (err) {
    next(err)
  }
})
