import React from 'react'
import {connect} from 'react-redux'
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
import AddPostForm from './add-post-form'
import axios from 'axios'
import {addPostThunk} from '../store/userFeed'
import autosize from 'autosize'

// function makeid(length) {
//   var result = ''
//   var characters =
//     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//   var charactersLength = characters.length
//   for (var i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength))
//   }
//   return result
// }

// function ShowPictures(props) {
//   if (props.image[0] === undefined)
//     return <div className="display-img placeholder" />
//   else return <img className="display-img" src={props.image} />
// }

class AddPost extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = event => {
    event.preventDefault()

    let photo = false

    if (event.target.file.value) {
      photo = true
    }

    const postInfo = {
      username: this.props.user.username,
      description: event.target.description.value,
      photo: photo,
      photoInfo: event.target.file.value
    }
    this.props.addPost(postInfo)
  }

  render() {
    return (
      <Modal
        onHide={this.props.onHide}
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <AddPostForm
          handleSubmit={this.handleSubmit}
          username={this.props.user.username}
        />
      </Modal>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    addPost: postInfo => dispatch(addPostThunk(postInfo))
  }
}

export default connect(null, mapDispatch)(AddPost)
