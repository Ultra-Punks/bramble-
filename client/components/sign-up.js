import React from 'react'
import {Modal} from 'react-bootstrap'
import {SignupForm} from './index'

class SignupButton extends React.Component {
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

export default SignupButton
