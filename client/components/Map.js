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
import Geocoder from 'react-map-gl-geocoder'
import RedPin from './RedPin'
import {Link} from 'react-router-dom'
import {AddLocationForm, SingleLocation} from './index'
import {connect} from 'react-redux'
import {fetchAllLocations} from '../store/locations'
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
      viewport: {
        width: 1000,
        height: 700,
        latitude: 40.705112,
        longitude: -74.009123,
        zoom: 12
      },
      userLocation: {},
      displayPopup: false,
      selectedLocation: {},
      displayForm: false
    }
  }
  componentDidMount() {
    this.props.getAllLocations()
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
    return (
      <Popup
        tipSize={5}
        anchor="bottom-right"
        longitude={long}
        latitude={lat}
        onMouseLeave={() => this.setState({displayPopup: false})}
        closeOnClick={true}
      >
        <p>
          <strong>{loc.name}</strong>
          <br />
          {`${loc.address} ${loc.city}`}
          {loc.description && `${loc.description}`}
        </p>
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
      address = result.properties.address
      city = result.context[3].text
    }
    this.setState({
      selectedLocation: {
        ...result,
        popup: true,
        name,
        city,
        address: address
      }
    })
  }
  handleResult(event) {
    this.addMarker(event.result.geometry.coordinates, event.result)
  }
  render() {
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
        <button
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
        </button>
        {this.state.displayForm && (
          <AddLocationForm location={this.state.selectedLocation} />
        )}
        <button
          type="submit"
          onClick={() => {
            const display = this.state.displayForm
            this.setState({displayForm: !display})
          }}
        >
          Display Add Location Form
        </button>
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
                  // {...console.log(
                  //   'hello from in the sL point check',
                  //   this.state.selectedLocation
                  // )}
                  longitude={
                    this.state.selectedLocation.geometry.coordinates[0]
                  }
                  latitude={this.state.selectedLocation.geometry.coordinates[1]}
                  onClick={() => {
                    this.state.selectedLocation.popup
                      ? this.setState({selectedLocation: {popup: false}})
                      : this.setState({selectedLocation: {popup: true}})
                    this.state.displayPopup
                      ? this.setState({displayPopup: false})
                      : this.setState({displayPopup: true})
                  }}
                >
                  {/* <img className="marker" src="temp-map-icon.jpeg" width="50" /> */}
                  <RedPin />
                </Marker>
                {this.state.selectedLocation.popup
                  ? this.renderPopup(this.state.selectedLocation)
                  : ''}
              </div>
            )}
          {/* map() through locations and create Markers for all of them */}

          {this.props.locations.map((loc, idx) => {
            const long = loc.geometry.coordinates[0]
            const lat = loc.geometry.coordinates[1]
            return (
              <div key={idx}>
                <Marker longitude={long} latitude={lat}>
                  {/* <img
                    className="marker"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Map_pin_icon.svg/1200px-Map_pin_icon.svg.png"
                    width="50"
                    onClick={() => {
                      loc.popup ? (loc.popup = false) : (loc.popup = true)
                      this.state.displayPopup
                        ? this.setState({displayPopup: false})
                        : this.setState({displayPopup: true})
                    }}
                  /> */}
                  <RedPin />
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

const mapState = state => ({locations: state.locations})
const mapDispatch = dispatch => ({
  getAllLocations: () => dispatch(fetchAllLocations())
})

export default connect(mapState, mapDispatch)(Map)
