import React from 'react'
import {connect} from 'react-redux'
import {Modal} from 'react-bootstrap'
import {AddLocationForm} from './index'
import {addLocationThunk, fetchAllLocations} from '../store/locations'

class AddLocation extends React.Component {
  render() {
    return (
      <Modal
        onHide={this.props.onHide}
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <AddLocationForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          location={this.props.location}
        />
      </Modal>
    )
  }
}

const mapDispatch = dispatch => ({
  add: location => {
    dispatch(addLocationThunk(location))
    dispatch(fetchAllLocations())
  }
})

export default connect(null, mapDispatch)(AddLocation)
