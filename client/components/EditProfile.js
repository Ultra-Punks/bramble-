import React from 'react'
import {connect} from 'react-redux'
import {EditProfileForm} from './index'

class EditProfile extends React.Component {
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
      photoInfo: event.target.file.value,
      communityId: event.target.community.value
    }
    this.props.addPost(postInfo)
  }

  render() {
    return (
      <div>
        <EditProfileForm handleSubmit={this.handleSubmit} username="example" />
      </div>
    )
  }
}

export default EditProfile
