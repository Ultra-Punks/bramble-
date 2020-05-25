//Official Docs: https://github.com/visgl/react-map-gl/tree/master/docs/api-reference
//Tutorial (Viewport, Markers, Popups): https://medium.com/@walkingtreetech/play-with-maps-in-react-using-mapbox-f74fdf386c8a
//Geocoder example: https://codesandbox.io/s/l7p179qr6m & Docs: https://github.com/SamSamskies/react-map-gl-geocoder
import React from 'react'
import MapGL, {
  GeolocateControl,
  NavigationControl,
  Marker,
  Popup,
  Source,
  Layer
} from 'react-map-gl'
import {Button} from 'react-bootstrap'
import Geocoder from 'react-map-gl-geocoder'
import RedPin from './RedPin'
import {Link} from 'react-router-dom'
import {AddLocationForm, AddLocation} from './index'
import {connect} from 'react-redux'
import {
  fetchAllLocations,
  fetchSomeLocations,
  fetchHomeFeedLocations
} from '../store/locations'
import {fetchOneLocation} from '../store/singleLocation'
import {mapboxToken} from '../../secrets'

class Map extends React.Component {
  constructor() {
    super()
    this.addMarker = this.addMarker.bind(this)
    this.setUserLocation = this.setUserLocation.bind(this)
    this.handleResult = this.handleResult.bind(this)
    //state contains viewport information, boolean value to toggle popups being displayed,
    //userLocation is the user's current location and selectedLocation is a temporary location
    //for when the user wants to add a location that they are not currently at
    this.state = {
      show: false,
      viewport: {
        width: window.innerWidth * 0.8,
        height: window.innerHeight * 0.8,
        latitude: 40.705112,
        longitude: -74.009123,
        zoom: 12
      },
      selectedLocation: {}
    }
  }

  componentDidMount() {
    this.props.getAllLocations()
    this.setState({selectedLocation: {}})
  }

  handleShowForm() {
    this.setState({show: true})
  }

  handleHideForm() {
    this.setState({show: false})
  }

  //create a reference to be passed to <Geocoder/> and <MapGL/>
  mapRef = React.createRef()
  setUserLocation() {
    //using below function from react-map-gl to get the current position and set new viewport around those coords
    navigator.geolocation.getCurrentPosition(position => {
      let currentLocation = {
        lat: position.coords.latitude,
        long: position.coords.longitude
      }
      let newViewport = {
        height: '100vh',
        width: '100vw',
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 10
      }
      this.setState({viewport: newViewport, userLocation: currentLocation})
    })
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
    const dbCheck = typeof loc.id === 'number'
    const numOfNextLocation = this.props.locations.length

    return (
      <Popup
        className="popup-main"
        tipSize={7}
        anchor="bottom-right"
        longitude={long}
        latitude={lat}
        sortByDepth={true}
        // onMouseLeave={(e) => {
        //   this.setState({displayPopup: false})
        //   console.log('event in the onmouseleave func', e)
        // }}
        // onClose={(e) => {
        //   console.log('event in the onclose func', e)
        //   loc.popup = false
        //   this.setState({displayPopup: false})
        // }}
        closeButton={false}
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
            {loc.address && `${loc.address}`}
            {loc.city && `${loc.city}`}
            {loc.description && `${loc.description}`}
          </p>
          {!dbCheck ? (
            <div>
              <Button
                type="submit"
                variant="danger"
                onClick={() => this.handleShowForm()}
              >
                Add Location Form
              </Button>
              <AddLocation
                nextLocId={numOfNextLocation}
                show={this.state.show}
                location={this.state.selectedLocation}
                onHide={() => this.handleHideForm()}
              />
            </div>
          ) : (
            ''
          )}
        </div>
      </Popup>
    )
  }
  //takes coordinate array as an argument, and sets selectedLocation on state
  addMarker(coordinates, result) {
    // console.log('result in addMarker func', result)
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
  handleResult(event) {
    this.addMarker(event.result.geometry.coordinates, event.result)
  }
  render() {
    // if (!this.props.locations[0] || !this.props.locations[0].id
    //   || !this.props.singleLocation || !this.props.singleLocation.geometry) return <div />

    //styles for geolocated and navigation
    const geolocateStyle = {
      float: 'left',
      margin: '50px',
      padding: '10px'
    }
    const navStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      padding: '10px'
    }
    return (
      <div id="map">
        {/* <button
          type="submit"
          onClick={() => {
            //if state.userLocation exists, addMarker is called with the
            // coordinates from userLocation
            this.state.userLocation.lat &&
              this.addMarker([
                this.state.userLocation.long,
                this.state.userLocation.lat
              ])
          }}
        >
          Add My Location To Map
        </button> */}

        {/* our main interactive map component */}
        <MapGL
          ref={this.mapRef}
          {...this.state.viewport}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxApiAccessToken={mapboxToken}
          onViewportChange={viewport => this.setState({viewport})}
          // take coordinates from event passed to click handling function and set selectedLocation
          // to those coordinates
          onClick={e => {
            // this.addMarker(e.lngLat)
            // console.log('state in onClick', this.state)
          }}
        >
          <Geocoder
            className="geocoder"
            mapRef={this.mapRef}
            mapboxApiAccessToken={mapboxToken}
            placeholder="Search for places in the NYC area"
            onViewportChange={viewport => this.setState({viewport})}
            onResult={this.handleResult}
            //bounding box coordinates in [minX, minY, maxX, maxY] format,
            //from South Amboy NJ(SW) to Hempstead (E) and White Plains (N)
            bbox={[-74.272562, 40.488076, -73.609777, 41.064978]}
            //this function has the search query as an argument, and when it returns an array
            //of GeoJSON features will add them to the search results bar
            filter={loc => {
              // console.log('this is in the geocoder filter', loc)
              return !this.props.locations.some(l => l.mapId === loc.id)
            }}
            localGeocoder={query => {
              return this.props.locations
                .filter(l => l.name.toLowerCase().startsWith(query))
                .map(l => ({
                  ...l,
                  type: 'feature',
                  text: l.name,
                  place_name: l.name,
                  place_type: l.id,
                  center: l.geometry.coordinates,
                  context: [
                    {id: l.id, text: l.name},
                    {},
                    {},
                    {id: l.id, text: l.city}
                  ],
                  properties: {address: l.address}
                }))
            }}
          />
          <div className="nav" style={navStyle}>
            <NavigationControl
              onViewportChange={viewport => this.setState({viewport})}
            />
          </div>
          {/* GeolocateControl component, which calls setUserLocation when it gets clicked */}
          <GeolocateControl
            style={geolocateStyle}
            positionOptions={{enableHighAccuracy: true}}
            trackUserLocation={true}
            onGeolocate={() => this.setUserLocation()}
          />
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
                  {/* <img className="marker" src="temp-map-icon.jpeg" width="50" /> */}
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
          {/* map() through locations and create Markers for all of them */}
          {/* {!this.props.locations[0] ? '' :''} */}
          {this.props.locations[0] &&
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
export default connect(mapState, mapDispatch)(Map)
