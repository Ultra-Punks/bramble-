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

class MapForProfile extends React.Component {
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
      allLocations: [],
      displayPopup: false,
      selectedLocation: {},
      userHomeIdS: null,
      singleLocationIdS: null,
      cIdS: null,
      usernameS: null,
      message: null
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

    if (userHomeId) {
      this.props.getSomeLocations(userHomeId, 'homeFeed')
      this.setState({
        selectedLocation: {},
        userHomeIdS: userHomeId,
        singleLocationIdS: null,
        cIdS: null,
        usernameS: null,
        locations
      })
    } else if (singleLocation.id && singleLocation.id !== singleLocationIdS) {
      this.props.fetchLocation(singleLocation.id)
      this.setState({
        selectedLocation: singleLocation,
        singleLocationIdS: singleLocation.id,
        userHomeIdS: null,
        cIdS: null,
        usernameS: null,
        locations: []
      })

      this.addMarker(
        this.props.singleLocation.geometry.coordinates,
        this.props.singleLocation
      )
    } else if (cId) {
      this.props.getSomeLocations(cId, 'community')

      this.setState({
        selectedLocation: {},
        cIdS: cId,
        singleLocationIdS: null,
        userHomeIdS: null,
        usernameS: null,
        locations
      })
    } else if (username) {
      this.props.getSomeLocations(username, 'user')

      this.setState({
        selectedLocation: {},
        usernameS: username,
        singleLocationIdS: null,
        userHomeIdS: null,
        cIdS: null,
        locations
      })
    } else {
      this.props.getAllLocations()

      this.setState({
        selectedLocation: {},
        usernameS: null,
        cIdS: null,
        singleLocationIdS: null,
        userHomeIdS: null,
        locations,
        message:
          'No locations associated with this community/user - check out some places related to other communities below!'
      })
    }
    console.log('state at end of compdidmount', this.state)
  }
  componentWillUnmount() {
    this.setState({
      userHomeIdS: null,
      singleLocationIdS: null,
      cIdS: null,
      usernameS: null,
      selectedLocation: {}
    })

    console.log('singlelocationidS', this.state.singleLocationIdS)
    console.log('COMPONENT UNMOUNTING', this.state)
  }

  // eslint-disable-next-line complexity
  // componentDidUpdate(prevProps) {
  //   const {userHomeId, singleLocation, cId, username, locations} = this.props

  //   const userHomeIdP = prevProps.userHomeId
  //   const singleLocationIdP = prevProps.singleLocation.id
  //   const cIdP = prevProps.cId
  //   const usernameP = prevProps.username

  //   console.log('props in compdidupdate', userHomeId, singleLocation.id, cId, username)
  //   // console.log('singleLocationIdS', singleLocationIdS)
  //   // console.log('cIdS ', cIdS)
  //   console.log('prevprops in compdidupdate', prevProps)

  //   //check if the prop equals the prevProp, and if so reset it
  //   if (userHomeId === userHomeIdP && userHomeId !== null) this.setState({userHomeIdS: null})
  //   if (singleLocation.id === singleLocationIdP && singleLocationIdP !== null) this.setState({singleLocationIdS: null})
  //   if (cId === cIdP && cId !== null) this.setState({cIdS: null})
  //   if (username === usernameP && username !== null) this.setState({username: null})
  //   console.log('state after equality checks in update', this.state)
  // }

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
    const dbCheck = typeof loc.id === 'number'

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
            {dbCheck ? (
              <div>
                <Link to={`/l/${loc.id}`}>
                  <strong>{loc.name}</strong>
                </Link>
                <Link to={`/community/list/${loc.communityId}`}>
                  {loc.community && loc.community.name && loc.community.name}
                </Link>
              </div>
            ) : (
              <strong>{loc.name}</strong>
            )}
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
          {this.props.locations &&
            this.props.locations[0] &&
            this.props.locations.map((loc, idx) => {
              const long = loc.geometry.coordinates[0]
              const lat = loc.geometry.coordinates[1]
              return (
                <div key={idx}>
                  <Marker longitude={long} latitude={lat}>
                    <div
                      onClick={() => {
                        loc.popup = !loc.popup
                        this.setState({displayPopup: loc.popup})
                      }}
                    >
                      <RedPin />
                    </div>
                  </Marker>
                  {/* also checking if marker.popup boolean is true, then render Popup */}
                  {loc.popup ? this.renderPopup(loc) : <div />}
                </div>
              )
            })}
        </MapGL>
      </div>
    )
  }
}

const mapState = state => ({
  locations: state.locations,
  singleLocation: state.singleLocation
})
const mapDispatch = dispatch => ({
  fetchLocation: id => dispatch(fetchOneLocation(id)),
  getAllLocations: () => dispatch(fetchAllLocations()),
  getSomeLocations: (id, type) => dispatch(fetchSomeLocations(id, type))
})
export default connect(mapState, mapDispatch)(MapForProfile)
