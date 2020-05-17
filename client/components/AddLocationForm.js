import React from 'react'
import {connect} from 'react-redux'
import {addLocationThunk} from '../store/singleLocation'

export class AddLocationForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      address: '',
      city: '',
      description: '',
      geometry: {}
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
        description: this.props.location.description,
        geometry: this.props.location.geometry
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
      description: '',
      geometry: {}
    })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          name="name"
          type="text"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <label htmlFor="address">Street Address</label>
        <input
          name="address"
          type="text"
          value={this.state.address}
          onChange={this.handleChange}
        />
        <label htmlFor="city">City</label>
        <input
          name="city"
          type="text"
          value={this.state.city}
          onChange={this.handleChange}
        />
        <label htmlFor="description">Description</label>
        <input
          name="description"
          type="text"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <button type="submit" onClick={this.handleSubmit}>
          Submit
        </button>
      </form>
    )
  }
}
const mapDispatch = dispatch => ({
  add: location => dispatch(addLocationThunk(location))
})
export default connect(null, mapDispatch)(AddLocationForm)
