import React from 'react'
import MapGL, {
  NavigationControl,
  Marker,
  Popup,
  Source,
  Layer
} from 'react-map-gl'
import {Button} from 'react-bootstrap'
import RedPin from './RedPin'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchAllLocations, fetchSomeLocations} from '../store/locations'
import {fetchOneLocation} from '../store/singleLocation'
import {mapboxToken} from '../../secrets'

class MapForSingleLocation extends React.Component {
  constructor() {
    super()
    this.addMarker = this.addMarker.bind(this)
    this.state = {
      show: false,
      viewport: {
        width: window.innerWidth * 0.4,
        height: window.innerHeight * 0.4,
        latitude: 40.705112,
        longitude: -74.009123,
        zoom: 12
      },
      selectedLocation: {}
    }
  }
  // eslint-disable-next-line complexity
  componentDidMount() {
    const {userHomeId, singleLocation, cId, username, locations} = this.props

    const userHomeIdS = this.state.userHomeIdS
    const singleLocationIdS = this.state.singleLocationIdS
    const cIdS = this.state.cIdS
    const usernameS = this.state.usernameS

    console.log(
      'props in compdidmount',
      userHomeId,
      singleLocation.id,
      cId,
      username
    )
    console.log('singleLocationIdS in compdidmount', singleLocationIdS)
    console.log(
      'selected location in compdidmount',
      this.state.selectedLocation
    )
    // console.log('cIdS ', cIdS)
    console.log('state in compdidmount', this.state)

    //check if the prop equals the state, and if so reset it
    // if (userHomeId === userHomeIdS) this.setState({userHomeIdS: null})
    // if (singleLocation.id === singleLocationIdS){
    //   console.log('In check if singlelocation ids match')
    //   this.setState({singleLocationIdS: null})
    // }
    // if (cId === cIdS) this.setState({cIdS: null})
    // if (username === usernameS) this.setState({username: null})
    // console.log('state after equality checks', this.state)

    if (singleLocation.id && singleLocation.id !== singleLocationIdS) {
      this.props.fetchLocation(singleLocation.id)
      this.setState({
        selectedLocation: singleLocation,
        singleLocationIdS: singleLocation.id,
        viewport: {
          ...this.state.viewport,
          latitude: singleLocation.geometry.coordinates[1],
          longitude: singleLocation.geometry.coordinates[0]
        }
      })

      this.addMarker(
        this.props.singleLocation.geometry.coordinates,
        this.props.singleLocation
      )
    }

    console.log('state at end of compdidmount', this.state)
  }
  componentWillUnmount() {
    this.setState({singleLocationIdS: null})
    console.log('COMPONENT UNMOUNTING', this.state)
  }

  //renderPopup is called in the 'locations.map()', therefore takes an index as an argument
  //and creates a <Popup/> component for each location,
  // ANY HTML can go between Popups opening and closing tags
  renderPopup(loc) {
    const long = loc.geometry.coordinates[0]
    const lat = loc.geometry.coordinates[1]
    // console.log('loc in renderpopup', loc)
    // this checks if the id of the location is a number, since
    // locations not from our database will have an id that is a string.
    // conditionally rendering links and the addlocation button based on this variable

    return (
      <Popup
        tipSize={7}
        anchor="bottom-right"
        longitude={long}
        latitude={lat}
        // onMouseLeave={() => this.setState({displayPopup: false})}
        // onClose={() => {
        //   console.log('in the onclose func', loc)
        //   loc.popup = false
        //   this.setState({displayPopup: false})
        // }}
        closeButton={true}
        closeOnClick={true}
      >
        <div className="popup">
          <div className="popup-header">
            <div>
              <strong>{loc.name}</strong>
              <Link to={`/community/list/${loc.communityId}`}>
                {loc.community && loc.community.name && loc.community.name}
              </Link>
            </div>
          </div>
          <p className="popup-body">
            {/* {`${loc.address} ${loc.city}`} */}
            {loc.address && `${loc.address}`}
            {loc.city && `${loc.city}`}
            {loc.description && `${loc.description}`}
          </p>
        </div>
      </Popup>
    )
  }
  //takes coordinate array as an argument, and sets selectedLocation on state
  addMarker(coordinates, result) {
    // console.log('coordinates in addMarker func', coordinates)
    let name,
      address,
      city = ''
    if (result) {
      name = result.text
      if (result.properties) address = result.properties.address
      if (result.context && result.context[3]) city = result.context[3].text
    }
    this.setState({
      selectedLocation: {
        ...result,
        popup: true,
        name,
        city,
        address: address
      },
      viewport: {
        ...this.state.viewport,
        latitude: coordinates[1],
        longitude: coordinates[0]
      }
    })
    // console.log(
    //   'selectedLocation in addMarker func',
    //   this.state.selectedLocation
    // )
  }
  render() {
    // if (!this.props.locations[0] || !this.props.locations[0].id
    //   || !this.props.singleLocation || !this.props.singleLocation.geometry) return <div />
    const navStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      padding: '10px'
    }
    console.log('state in the render', this.state)
    return (
      <div id="map">
        {this.state.message}

        {/* our main interactive map component */}
        <MapGL
          {...this.state.viewport}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxApiAccessToken={mapboxToken}
          onViewportChange={viewport => this.setState({viewport})}
        >
          <div className="nav" style={navStyle}>
            <NavigationControl
              onViewportChange={viewport => this.setState({viewport})}
            />
          </div>

          {/* if state.selectedLocation exists, then we create a marker for it */}
          {this.state.selectedLocation.geometry &&
            this.state.selectedLocation.geometry.type && (
              <div>
                <Marker
                  longitude={
                    this.state.selectedLocation.geometry.coordinates[0]
                  }
                  latitude={this.state.selectedLocation.geometry.coordinates[1]}
                >
                  <div
                    onClick={() => {
                      // const oldDisplay = this.state.selectedLocation.displayPopup
                      // this.setState({selectedLocation: {popup: !oldDisplay}})
                    }}
                  >
                    <RedPin />
                  </div>
                </Marker>
                {this.state.selectedLocation.popup &&
                  this.renderPopup(this.state.selectedLocation)}
              </div>
            )}
        </MapGL>
      </div>
    )
  }
}

const mapState = state => ({
  singleLocation: state.singleLocation
})
const mapDispatch = dispatch => ({
  fetchLocation: id => dispatch(fetchOneLocation(id))
})
export default connect(mapState, mapDispatch)(MapForSingleLocation)
