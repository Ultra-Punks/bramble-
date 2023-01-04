import React, {useState} from 'react'
import axios from 'axios'
import {Form, Button} from 'react-bootstrap'
import {AwesomeButton} from 'react-awesome-button'

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
      <div>
        <img src={props.profileImg} className="display-img-edit" />
        <p className="profile-pic-form-text">Profile Picture</p>
      </div>
    )
  else return <img className="display-img-edit" src={props.image} />
}

export default function EditProfileForm(props) {
  const {handleSubmit} = props

  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState('')
  const [url, setUrl] = useState('')

  const uploadImage = async event => {
    const files = event.target.files[0]
    const formData = new FormData()
    formData.append('public_id', `${props.username}/${makeid(6)}`)
    formData.append('upload_preset', 'bramble')
    formData.append('file', files)
    setLoading(true)
    await axios
      .post('https://api.cloudinary.com/v1_1/bramble/upload', formData)
      .then(res => {
        setImage(res.data.secure_url)
        setUrl(res.data.secure_url)
      })
      .then(setLoading(false))
      .catch(error => console.error(error))
    setLoading(false)
  }
  const user = props.user
  return (
    <div className="edit-profile-form-container">
      <Form
        className="edit-form-container-outer"
        key="submit-form"
        onSubmit={handleSubmit}
      >
        {/* THIS IS ONLY TO PASS UP THE FILE URL FROM THE INPUT */}
        <div className="edit-form-container">
          <div className="edit-profileimg-form">
            <ShowPictures image={image} profileImg={props.profileImg} />
            <div className="profileimg-button">
              <Form.File
                id="custom-file"
                className="profileimg-button"
                label=""
                custom
                onChange={uploadImage}
                style={{margin: 0, width: 75}}
              />
            </div>
          </div>
          <div className="edit-form-inner-middle-container">
            <div>
              <Form.Label htmlFor="name" className="signup-label">
                Name
              </Form.Label>
              <Form.Control
                className="signup-input"
                type="text"
                placeholder="Enter name"
                defaultValue={user.name}
                name="name"
              />
            </div>
            <div>
              <Form.Label htmlFor="email" className="signup-label">
                Email address
              </Form.Label>
              <Form.Control
                className="signup-input"
                type="email"
                placeholder="Enter email"
                name="email"
                defaultValue={user.email}
              />
            </div>
            <div>
              <Form.Label htmlFor="email" className="signup-label">
                Password
              </Form.Label>
              <Form.Control
                className="signup-input"
                type="password"
                placeholder="New password"
                name="password"
              />
            </div>
          </div>
          <div className="bio-input-container">
            <div>
              <div className="bio-box">
                <Form.Label htmlFor="bio" className="signup-label">
                  Bio
                </Form.Label>
                <Form.Control
                  className="signup-input"
                  as="textarea"
                  rows="5"
                  type="bio"
                  placeholder="Something interesting"
                  name="bio"
                  defaultValue={user.description}
                />
              </div>
            </div>
            <Form.Group controlId="file">
              <input
                name="file"
                value={url}
                readOnly
                style={{display: 'none'}}
              />
            </Form.Group>
          </div>
        </div>
        <AwesomeButton
          className="post-button"
          variant="outline-light"
          type="primary"
        >
          Save Changes
        </AwesomeButton>
      </Form>
    </div>
  )
}
