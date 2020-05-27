const vision = require('@google-cloud/vision')

async function scanner(image) {
  let allLabels = []

  const client = new vision.ImageAnnotatorClient({
    keyFilename: {
      type: 'service_account',
      project_id: process.env.project_id,
      private_key_id: process.env.private_key_id,
      private_key: process.env.private_key,
      client_email: process.env.client_email,
      client_id: process.env.client_id,
      auth_uri: process.env.auth_uri,
      token_uri: process.env.token_uri,
      auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
      client_x509_cert_url: process.env.client_x509_cert_url
    }
  })
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
