import React from 'react'
import {connect} from 'react-redux'

export class AddLocationForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      address: '',
      description: '',
      coordinates: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    if (this.props.location) {
      this.setState({
        name: this.props.location.name,
        address: this.props.location.address,
        description: this.props.location.description,
        coordinates: this.props.location.coordinates
      })
    }
    console.log('props in compdidmount', this.props)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log('handlechangestate', this.state)
  }
  handleSubmit = event => {
    event.preventDefault()
    //this.props.addLocationThunk or whatever
    this.setState({
      name: '',
      address: '',
      description: '',
      coordinates: []
    })
  }
  render() {
    console.log(this.state)
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Product Name:</label>
        <input
          name="name"
          type="text"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <label htmlFor="address">Address</label>
        <input
          name="address"
          type="text"
          value={this.state.address}
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
  add: function(product) {
    // dispatch(addProductThunk(product))
    // dispatch(fetchProducts())
  }
})
export default connect(null, mapDispatch)(AddLocationForm)
