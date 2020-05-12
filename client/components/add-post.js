import React, {useState} from 'react'
import {Modal, Button, Image} from 'react-bootstrap'
import axios from 'axios'

export default function AddPost(props) {
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)

  const uploadImage = async event => {
    const files = event.target.files[0]
    const formData = new FormData()
    formData.append('upload_preset', 'bramble')
    formData.append('file', files)
    setLoading(true)
    await axios
      .post('https://api.cloudinary.com/v1_1/bramble/image/upload', formData)
      .then(res => setImage(res.data.secure_url))
      .then(setLoading(false))
      .catch(error => console.error(error))
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="input-group mt-3">
        <div className="custom-file">
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
            {loading ? (
              <h1>Loading...</h1>
            ) : (
              <Image src={`${image}/100px250`} fluid />
              // <img className="display-img" src={image} />
            )}
          </div>
        </div>
      </div>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}
