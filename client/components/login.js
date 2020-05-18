import React from 'react'
import {Modal} from 'react-bootstrap'
import {LoginForm} from './index'

class LoginButton extends React.Component {
  render() {
    return (
      <Modal
        onHide={this.props.onHide}
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <LoginForm />
      </Modal>
    )
  }
}

export default LoginButton
