import React from 'react'
import {Modal} from 'react-bootstrap'
import {LoginForm} from './index'

class PopUpDisplay extends React.Component {
  render() {
    return (
      <Modal
        onHide={this.props.onHide}
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      />
    )
  }
}

export default PopUpDisplay
