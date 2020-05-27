const vision = require('@google-cloud/vision')
const config = require('./config')

async function scanner(image) {
  let allLabels = []

  const client = new vision.ImageAnnotatorClient(config)
  const [result] = await client.labelDetection(image)
  const labels = result.labelAnnotations
  labels.forEach(label => {
    if (label.score > 0.65) {
      allLabels.push(label.description)
    }
  })

  const [textResults] = await client.textDetection(image)
  const detections = textResults.textAnnotations
  detections.forEach(text => {
    allLabels.push(text.description)
  })

  const [logoResult] = await client.logoDetection(image)
  const logos = logoResult.logoAnnotations
  logos.forEach(logo => {
    if (logo.score > 0.65) {
      allLabels.push(logo.description)
    }
  })

  return allLabels
}

module.exports = scanner
