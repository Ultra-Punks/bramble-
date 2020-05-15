//Official Docs: https://github.com/visgl/react-map-gl/tree/master/docs/api-reference
//Tutorial (Viewport, Markers, Popups): https://medium.com/@walkingtreetech/play-with-maps-in-react-using-mapbox-f74fdf386c8a
//Geocoder example: https://codesandbox.io/s/l7p179qr6m & Docs: https://github.com/SamSamskies/react-map-gl-geocoder
import React from 'react'
import MapGL, {
  GeolocateControl,
  NavigationControl,
  Marker,
  Popup
} from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
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
        latitude: 40.73061,
        longitude: -73.935242,
        zoom: 12
      },
      userLocation: {},
      displayPopup: false,
      selectedLocation: {}
    }
  }
  //create a reference to be passed to <Geocoder/>
  componentDidMount() {
    this.props.getAllLocations()
  }
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
      console.log('state in setUserLocation func', this.state)
    })
  }
  //renderPopup is called in the 'locations.map()', therefore takes an index as an argument
  //and creates a <Popup/> component for each location,
  // ANY HTML can go between Popups opening and closing tags
  renderPopup(loc) {
    const long = loc.point.coordinates[0]
    const lat = loc.point.coordinates[1]
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
          {`${loc.address} ${loc.city} ${loc.description}`}
        </p>
      </Popup>
    )
  }
  //takes coordinate array as an argument, and sets selectedLocation on state
  addMarker(coordinates, result) {
    console.log('coordinates in addMarker func', coordinates)
    // const coordinates = [...coordsArray]
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
        name,
        address,
        city,
        point: {type: 'Point', coordinates},
        description: '',
        popup: true
      }
    })
    console.log('SELECTEDLOC AT END OF ADDMARKER', this.state.selectedLocation)
  }
  handleResult(event) {
    console.log('This is event.result in handleResult', event.result)
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
            console.log('state in onClick', this.state)
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
            //result.context[3].text
            localGeocoder={query =>
              this.props.locations.map(l => ({
                ...l,
                type: 'feature',
                text: l.name,
                place_name: l.name,
                place_type: l.id,
                center: l.point.coordinates,
                geometry: l.point.coordinates,
                context: [
                  {id: l.id, text: l.name},
                  {},
                  {},
                  {id: l.id, text: l.city}
                ],
                properties: {address: l.address}
              }))
            }
          />
          <div className="nav" style={navStyle}>
            <NavigationControl
              onViewportChange={viewport => this.setState({viewport})}
            />
          </div>
          {/* if state.selectedLocation exists, then we create a marker for it */}
          {this.state.selectedLocation.point ? (
            <div>
              <Marker
                longitude={this.state.selectedLocation.point.coordinates[0]}
                latitude={this.state.selectedLocation.point.coordinates[1]}
                onClick={() => {
                  console.log('IN ONCLICK OF SELECTEDLOCATIONMARKER')
                  this.state.selectedLocation.popup
                    ? this.setState({selectedLocation: {popup: false}})
                    : this.setState({selectedLocation: {popup: true}})
                  this.state.displayPopup
                    ? this.setState({displayPopup: false})
                    : this.setState({displayPopup: true})
                }}
              >
                <img
                  className="marker"
                  src="data:image/jpeg;base64,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"
                  width="50"
                />
              </Marker>
              {this.state.selectedLocation.popup
                ? this.renderPopup(this.state.selectedLocation)
                : ''}
            </div>
          ) : (
            ''
          )}

          {/* map() through locations and create Markers for all of them */}
          {this.props.locations.map((loc, idx) => {
            const long = loc.point.coordinates[0]
            const lat = loc.point.coordinates[1]
            return (
              <div key={idx}>
                <Marker longitude={long} latitude={lat}>
                  <img
                    className="marker"
                    src="map-icon.png"
                    width="50"
                    onClick={() => {
                      loc.popup ? (loc.popup = false) : (loc.popup = true)
                      this.state.displayPopup
                        ? this.setState({displayPopup: false})
                        : this.setState({displayPopup: true})
                    }}
                  />
                </Marker>
                {/* also checking if marker.popup boolean is true, then render Popup */}
                {loc.popup ? this.renderPopup(loc) : <div />}
              </div>
            )
          })}
          {/* GeolocateControl component, which calls setUserLocation when it gets clicked */}
          <GeolocateControl
            style={geolocateStyle}
            positionOptions={{enableHighAccuracy: true}}
            trackUserLocation={true}
            onGeolocate={() => this.setUserLocation()}
          />
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
