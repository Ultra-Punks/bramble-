import React from 'react'
import {EditProfileForm} from './index'
import {connect} from 'react-redux'
import {updateUserThunk} from '../store'

class EditProfile extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = event => {
    event.preventDefault()

    const profileInfo = {
      description: event.target.bio.value,
      profileImg: event.target.file.value,
      name: event.target.name.value,
      password: event.target.password.value || null,
      email: event.target.email.value
    }
    this.props.updateUser(this.props.user.username, profileInfo)
  }

  render() {
    const user = this.props.user
    return (
      <div>
        <EditProfileForm
          profileImg={user.profileImg}
          handleSubmit={this.handleSubmit}
          user={user}
        />
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    updateUser: (username, info) => dispatch(updateUserThunk(username, info))
  }
}

export default connect(mapState, mapDispatch)(EditProfile)
