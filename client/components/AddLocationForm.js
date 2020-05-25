import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {addLocationThunk, fetchAllLocations} from '../store/locations'
import {InputGroup, Form, Button} from 'react-bootstrap'

export class AddLocationForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      address: '',
      city: '',
      description: '',
      communityId: null,
      redirect: false
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
    // console.log('state in handlechange', this.state)
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
      description: '',
      communityId: null,
      redirect: true
    })
  }
  render() {
    // const nextLocId = this.props.nextLocId
    const nextLocId = this.props.nextLocId
    // console.log('id of next location', nextLocId)

    if (this.state.redirect) {
      return (
        <Redirect
          // to="/map"
          //the below will work to redirect to the new location if all of the locations
          //in the database have coordinates and aren't being excluded from props.locations
          //like they are now - for now just redirecting to the map
          to={`/l/${nextLocId}`}
        />
      )
    }
    return (
      <form onSubmit={this.handleSubmit} className="location-modal">
        {/* copied for dropdown menu */}
        <div className="exit-add-post">
          <Form.Group controlId="community">
            <Form.Label>
              Which Community Are You Adding This Place To?
            </Form.Label>
            <Form.Control
              value={this.state.communityId}
              onChange={this.handleChange}
              name="communityId"
              as="select"
              custom
            >
              <option value={null}>None</option>
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
  subscribedCommunities: state.user.subscriber,
  singleLocation: state.singleLocation,
  locations: state.locations
})
const mapDispatch = dispatch => ({
  add: location => {
    dispatch(addLocationThunk(location))
    // dispatch(fetchAllLocations())
  }
})
export default connect(mapState, mapDispatch)(AddLocationForm)
