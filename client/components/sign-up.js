import React from 'react'
import {connect} from 'react-redux'
import {Modal} from 'react-bootstrap'
import {SignupForm} from './index'

class SignupButton extends React.Component {
  constructor() {
    super()
    // this.handleSubmit = this.handleSubmit.bind(this)
  }

  //   handleSubmit = (event) => {
  //     event.preventDefault()

  //     let photo = false

  //     if (event.target.file.value) {
  //       photo = true
  //     }

  //     const postInfo = {
  //       username: this.props.user.username,
  //       description: event.target.description.value,
  //       photo: photo,
  //       photoInfo: event.target.file.value,
  //     }
  //     this.props.addPost(postInfo)
  //   }

  render() {
    return (
      <Modal
        onHide={this.props.onHide}
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <SignupForm />
      </Modal>
    )
  }
}

// const mapDispatch = (dispatch) => {
//   return {}
// }

// export default connect(null, null)(SignupButton)
export default SignupButton
