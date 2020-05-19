import React from 'react'
import {connect} from 'react-redux'
import {Modal} from 'react-bootstrap'
import {AddLocationForm} from './index'
import {addLocationThunk, fetchAllLocations} from '../store/locations'

class AddLocation extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      address: '',
      city: '',
      description: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.location) {
      this.setState({
        name: this.props.location.name,
        address: this.props.location.address,
        city: this.props.location.city,
        description: this.props.location.description
      })
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.add(this.props.location)
    this.setState({
      name: '',
      address: '',
      city: '',
      description: ''
    })
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
