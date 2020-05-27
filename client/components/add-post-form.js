import React, {useState} from 'react'
import axios from 'axios'
import {Form} from 'react-bootstrap'
import {AwesomeButton} from 'react-awesome-button'
import ReactPlayer from 'react-player'

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

const videoTypes = ['.mp4', '.avi', '.mov', '.flv', '.wmv']

function ShowPictures(props) {
  if (props.image[0] === undefined) return <div />
  else {
    const fileType = props.image.slice(props.image.lastIndexOf('.'))

    if (videoTypes.includes(fileType)) {
      return (
        <div className="vid-container">
          <ReactPlayer
            controls={true}
            width="100%"
            height="100%"
            url={props.image}
          />
        </div>
      )
    } else {
      return <img className="add-post-img" src={props.image} />
    }
  }
}

export default function AddPostForm(props) {
  const {handleSubmit} = props

  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState('')
  const [url, setUrl] = useState('')
  const [scan, setScan] = useState(false)

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
          <Form.Group controlId="community" className="choose-community">
            <Form.Label className="choose-community-label">
              Community
            </Form.Label>
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
          {image === '' ? (
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                name="scan"
                type="checkbox"
                label="Scan Image"
                value="false"
                disabled
                onClick={() => setScan(true)}
              />
            </Form.Group>
          ) : (
            <div className="width-250">
              {scan ? (
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Text className="text-muted sub">
                    Avoid scanning large amounts of text!
                  </Form.Text>
                  <Form.Check
                    readOnly
                    name="scan"
                    type="checkbox"
                    label="Scan Image"
                    value="true"
                    checked="checked"
                    onClick={() => setScan(false)}
                  />
                </Form.Group>
              ) : (
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    name="scan"
                    readOnly
                    type="checkbox"
                    label="Scan Image"
                    value="false"
                    onClick={() => setScan(true)}
                  />
                </Form.Group>
              )}
            </div>
          )}
        </div>
        <Form.Group controlId="description">
          <Form.Control
            className="description-input"
            name="description"
            placeholder="What's on your mind?"
            as="textarea"
            rows="5"
            style={{color: 'black'}}
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
          <AwesomeButton
            onPress={() => {
              props.closeForm()
              props.loading(true)
            }}
          >
            Post
          </AwesomeButton>
        </div>
      </Form>
    </div>
  )
}
