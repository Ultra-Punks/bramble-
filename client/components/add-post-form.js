import React, {useState} from 'react'
import axios from 'axios'
import {
  Form,
  Button,
  InputGroup,
  DropdownButton,
  Dropdown
} from 'react-bootstrap'

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
  if (props.image[0] === undefined) return <div />
  else return <img className="add-post-img" src={props.image} />
}

export default function AddPostForm(props) {
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
  return (
    <div>
      <Form className="example" key="submit-form" onSubmit={handleSubmit}>
        <div className="exit-add-post">
          <Form.Group controlId="community">
            <Form.Label>Community</Form.Label>
            <Form.Control name="community" as="select" custom>
              <option value="none">None</option>
              {props.communities ? (
                props.communities.map(community => {
                  return (
                    <option key={community.id} value={community.id}>
                      {community.name}
                    </option>
                  )
                })
              ) : (
                <div />
              )}
            </Form.Control>
          </Form.Group>
        </div>
        <Form.Group controlId="description">
          <Form.Control
            className="description-input"
            name="description"
            placeholder="What's on your mind?"
            as="textarea"
            rows="5"
            style={{color: '#fff'}}
          />
        </Form.Group>
        {/* THIS IS ONLY TO PASS UP THE FILE URL FROM THE INPUT */}
        <Form.Group controlId="file">
          <input name="file" value={url} readOnly style={{display: 'none'}} />
        </Form.Group>
        <div className="input-form-container">
          <ShowPictures image={image} />
        </div>
        <div className="bottom-form-container">
          <Form.File
            id="custom-file"
            className="profileimg-button"
            label=""
            custom
            onChange={uploadImage}
            style={{margin: 0, width: 75}}
          />
          <Button className="post-button" variant="outline-light" type="submit">
            Post
          </Button>
        </div>
      </Form>
    </div>
  )
}
