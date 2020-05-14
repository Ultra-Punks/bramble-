import React, {useState} from 'react'
import {
  Modal,
  Button,
  Form,
  InputGroup,
  Dropdown,
  DropdownButton,
  FormControl,
  Image
} from 'react-bootstrap'
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
    return <div className="display-img placeholder" />
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
    formData.append('tags', ['post_2'])
    setLoading(true)
    await axios
      .post('https://api.cloudinary.com/v1_1/bramble/upload', formData)
      .then(res => setImage(res.data.secure_url))
      .then(setLoading(false))
      .catch(error => console.error(error))
    setLoading(false)
  }
  console.log('THIS IS PROPS >>>', props)
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="modal-post-container">
        <div className="exit-add-post">
          <InputGroup className="mb-3">
            <DropdownButton
              as={InputGroup.Prepend}
              variant="outline-secondary"
              title="Community"
              id="input-group-dropdown-1"
            >
              <Dropdown.Item href="#">None</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#">Communities</Dropdown.Item>
              <Dropdown.Item href="#">Communities</Dropdown.Item>
              <Dropdown.Item href="#">Communities</Dropdown.Item>
            </DropdownButton>
            <FormControl aria-describedby="basic-addon1" />
          </InputGroup>
          <Button variant="link" className="exit-btn" onClick={props.onHide}>
            X
          </Button>
        </div>
        <div>
          <Image className="post-pfp" src={props.profileImg} roundedCircle />{' '}
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control
              placeholder="What's on your mind?"
              as="textarea"
              rows="7"
              style={{color: '#fff'}}
            />
          </Form.Group>
          <Form className="input-form-container">
            <Form.File
              id="custom-file"
              label="Custom file input"
              custom
              onChange={uploadImage}
              style={{margin: 0, width: 400}}
            />
          </Form>
        </div>
        <div>{/* <ShowPictures image={image} /> */}</div>
        <div className="post-btn-container">
          <Button className="post-button" variant="outline-light">
            Post
          </Button>{' '}
        </div>
      </div>
    </Modal>
  )
}
