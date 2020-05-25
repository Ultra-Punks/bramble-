import React from 'react'
import history from '../history'
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
      locations: [],
      selectedLocation: {},
      displayPopup: false,
      userHomeId: null,
      cId: null,
      username: null,
      message: []
    }
  }
  // eslint-disable-next-line complexity
  componentDidMount() {
    const {userHomeId, cId, username, locations} = this.props

    if (userHomeId) {
      this.props.getSomeLocations(userHomeId, 'homeFeed')
      this.setState({
        userHomeId: userHomeId,
        cId: null,
        username: null,
        locations
      })
    } else if (cId) {
      this.props.getSomeLocations(cId, 'community')
      this.setState({
        cId: cId,
        userHomeId: null,
        username: null,
        locations
      })
    } else if (username) {
      this.props.getSomeLocations(username, 'user')
      this.setState({
        username: username,
        userHomeId: null,
        cId: null,
        locations
      })
    }
    if (typeof locations[0] === 'string') {
      this.setState({
        message: [
          locations[0],
          `Check out some places related to other communities below!`
        ]
      })
      this.props.getAllLocations()
      // console.log('props after getting all locations', this.props)
    }
    // } else {
    //   this.props.getAllLocations()
    //   this.setState({
    //     username: null,
    //     cId: null,
    //     userHomeId: null,
    //     locations,
    //     message: `No locations associated with this community/user ${(
    //       <br />
    //     )} Check out some places related to other communities below!`
    //   })
    // }

    // console.log('these are locations in compdidmount', locations)
    // console.log('this is type of locations[0]', typeof locations[0])
    // console.log('locations.length', locations.length)
    if (locations.length > 1) {
      const randomLocationIdx = Math.floor(
        Math.random() * this.props.locations.length
      )
      // console.log('this is the random location index', randomLocationIdx)
      const coords = this.props.locations[0].geometry.coordinates
      this.setState({
        viewport: {
          ...this.state.viewport,
          latitude: coords[1],
          longitude: coords[0]
        }
      })
    }
  }
  componentWillUnmount() {
    this.setState({
      userHomeId: null,
      cId: null,
      username: null,
      message: []
    })
  }

  //renderPopup is called in the 'locations.map()', therefore takes an index as an argument
  //and creates a <Popup/> component for each location,
  // ANY HTML can go between Popups opening and closing tags
  renderPopup(loc) {
    const long = loc.geometry.coordinates[0]
    const lat = loc.geometry.coordinates[1]
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
        closeButton={false}
        closeOnClick={true}
        onClick={() => {
          // console.log('event in the onclick in popup', event)
        }}
      >
        <div className="popup">
          <p
            className="popup-community-tag"
            onClick={() => history.push(`/community/list/${loc.communityId}`)}
          >
            {loc.community && loc.community.name && loc.community.name}
          </p>
          <div className="popup-header">
            <p
              onClick={() => history.push(`/l/${loc.id}`)}
              className="popup-loc-name"
            >
              {loc.name}
            </p>
          </div>
          <p className="popup-body">
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
    this.setState({
      selectedLocation: {...result, popup: true},
      viewport: {
        ...this.state.viewport,
        latitude: coordinates[1],
        longitude: coordinates[0]
      }
    })
  }
  // eslint-disable-next-line complexity
  render() {
    // console.log('this is state in render', thisx.state)
    if (!this.props.locations[0] || !this.props.locations[0].id) return <div />
    const navStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      padding: '10px'
    }
    return (
      <div className="profileMapContainer sticky">
        {this.state.message[0] && (
          <p id="map-message">
            {`${this.state.message[0]}`} <br /> {`${this.state.message[1]}`}
          </p>
        )}
        <div id="map">
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
                    latitude={
                      this.state.selectedLocation.geometry.coordinates[1]
                    }
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
      </div>
    )
  }
}

const mapState = state => ({
  locations: state.locations
})
const mapDispatch = dispatch => ({
  getAllLocations: () => dispatch(fetchAllLocations()),
  getSomeLocations: (id, type) => dispatch(fetchSomeLocations(id, type))
})
export default connect(mapState, mapDispatch)(MapForProfile)
