/* eslint-disable complexity */
import React from 'react'
import {Modal} from 'react-bootstrap'

class FullPicture extends React.Component {
  render() {
    return (
      <Modal
        onHide={this.props.onHide}
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="testing"
      >
        <img className="testing" src={this.props.image} />
      </Modal>
    )
  }
}

export default FullPicture
