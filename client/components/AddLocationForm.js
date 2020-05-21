import React from 'react'
import {connect} from 'react-redux'
import {addLocationThunk, fetchAllLocations} from '../store/locations'
import {InputGroup, Form, Button} from 'react-bootstrap'

const communities = [
  'Food',
  'Fitness',
  'Skating',
  'Fashion',
  'blah',
  'hello',
  'something',
  'something else'
]

export class AddLocationForm extends React.Component {
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
      console.log('in the if in compdidmount addLocation', this.props.location)
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
    const newLocation = {
      ...this.props.location,
      ...this.state
    }
    this.props.add(newLocation)
    this.setState({
      name: '',
      address: '',
      city: '',
      description: ''
    })
  }
  render() {
    console.log('location in addlocation form', this.props.location)
    return (
      <form onSubmit={this.handleSubmit} className="location-modal">
        {/* copied for dropdown menu */}
        <div className="exit-add-post">
          <Form.Group controlId="community">
            <Form.Label>Community</Form.Label>
            <Form.Control name="community" as="select" custom>
              <option value="none">None</option>
              {this.props.subscribedCommunities &&
                this.props.subscribedCommunities.map(community => {
                  return (
                    <option key={community.id} value={community.id}>
                      {community.name}
                    </option>
                  )
                })}
            </Form.Control>
          </Form.Group>
        </div>

        <Form.Label htmlFor="name" className="signup-label">
          Name
        </Form.Label>
        <Form.Control
          className="signup-input"
          type="text"
          placeholder="Location Name"
          value={this.state.name}
          onChange={this.handleChange}
          name="name"
        />
        <Form.Label htmlFor="address" className="signup-label">
          Street Address
        </Form.Label>
        <Form.Control
          className="signup-input"
          type="text"
          placeholder="Street Address"
          value={this.state.address}
          onChange={this.handleChange}
          name="address"
        />
        <Form.Label htmlFor="city" className="signup-label">
          City
        </Form.Label>
        <Form.Control
          className="signup-input"
          type="text"
          placeholder="City"
          value={this.state.city}
          onChange={this.handleChange}
          name="city"
        />
        <Form.Label htmlFor="description" className="signup-label">
          Description
        </Form.Label>
        <Form.Control
          className="signup-input"
          type="text"
          placeholder="Description"
          value={this.state.description}
          onChange={this.handleChange}
          name="description"
        />
        <Button
          className="post-button-location"
          variant="outline-light"
          type="submit"
        >
          Submit
        </Button>
      </form>
    )
  }
}

const mapState = state => ({
  subscribedCommunities: state.user.subscriber
})
const mapDispatch = dispatch => ({
  add: location => {
    dispatch(addLocationThunk(location))
    dispatch(fetchAllLocations())
  }
})
export default connect(mapState, mapDispatch)(AddLocationForm)
