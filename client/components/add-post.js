import React, {useState} from 'react'
import {Modal, Button, Image} from 'react-bootstrap'
import axios from 'axios'

function makeid(length) {
  var result = ''
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

function ShowPictures(props) {
  if (props.image[0] === undefined)
    return (
      <img
        className="display-img"
        src="https://www.ivmechicago.com/wp-content/uploads/2017/06/placeholder.gif"
      />
    )
  else return <img className="display-img" src={props.image} />
}

export default function AddPost(props) {
  const [image, setImage] = useState([])
  const [loading, setLoading] = useState(false)

  const uploadImage = async event => {
    const files = event.target.files[0]
    const formData = new FormData()
    formData.append('public_id', `${props.username}/${makeid(6)}`)
    formData.append('upload_preset', 'bramble')
    formData.append('file', files)
    setLoading(true)
    await axios
      .post('https://api.cloudinary.com/v1_1/bramble/upload', formData)
      .then(res => setImage(res.data.secure_url))
      .then(setLoading(false))
      .catch(error => console.error(error))
    setLoading(false)
  }

  console.log(props.username)

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="input-group mt-3">
        <div className="custom-file add-post-container">
          <input
            id="inputGroupFile02"
            type="file"
            multiple
            className="custom-file-input"
            onChange={uploadImage}
          />
          <label className="custom-file-label" htmlFor="inputGroupFile02">
            Select images..
          </label>
          <div>
            {loading ? <h1>Loading...</h1> : <ShowPictures image={image} />}
          </div>
        </div>
      </div>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}
