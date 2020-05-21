import React from 'react'
import {connect} from 'react-redux'
import {Modal} from 'react-bootstrap'
import AddPostForm from './add-post-form'
import {addPostThunk} from '../store/userFeed'

class AddPost extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = event => {
    event.preventDefault()

    const postInfo = {
      username: this.props.user.username,
      description: event.target.description.value,
      file: event.target.file.value,
      communityId: event.target.community.value
    }
    console.log(postInfo)
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
          communities={this.props.user.subscriber}
          closeForm={this.props.onHide}
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
