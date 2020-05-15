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
import {AddLocationForm} from './index'
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
  renderPopup(index) {
    console.log('IN RENDERPOPUP FUNC')
    const long = this.props.locations[index].point.coordinates[0]
    const lat = this.props.locations[index].point.coordinates[1]
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
          <strong>{this.props.locations[index].name}</strong>
          <br />
          {this.props.locations[index].description}
        </p>
      </Popup>
    )
  }
  //takes coordinate array as an argument, and sets selectedLocation on state
  addMarker(coordsArray, result) {
    console.log('coordsArray in addMarker func', coordsArray)
    const coordinates = [...coordsArray]
    let name, address, city
    if (result) {
      name = result.place_name.split(',')[0]
      address = result.place_name.split(',')[1]
      city = result.place_name.split(',')[2]
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
            onResult={this.handleResult}
            //bounding box coordinates in [minX, minY, maxX, maxY] format,
            //from South Amboy NJ(SW) to Hempstead (E) and White Plains (N)
            bbox={[-74.272562, 40.488076, -73.609777, 41.064978]}
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
                <img className="marker" src="temp-map-icon.jpeg" width="50" />
              </Marker>
              {this.state.selectedLocation.popup ? (
                <Popup
                  tipSize={5}
                  anchor="bottom-right"
                  longitude={this.state.selectedLocation.point.coordinates[0]}
                  latitude={this.state.selectedLocation.point.coordinates[1]}
                  onMouseLeave={() => this.setState({displayPopup: false})}
                  closeOnClick={true}
                >
                  <AddLocationForm location={this.state.selectedLocation} />
                </Popup>
              ) : (
                ''
              )}
            </div>
          ) : (
            ''
          )}

          {/* map() through locations and create Markers for all of them */}
          {this.props.locations.map((marker, idx) => {
            // console.log('locations in map', idx, marker)
            const long = marker.point.coordinates[0]
            const lat = marker.point.coordinates[1]
            return (
              <div key={idx}>
                <Marker longitude={long} latitude={lat}>
                  <img
                    className="marker"
                    src="map-icon.png"
                    width="50"
                    onClick={() => {
                      marker.popup
                        ? (marker.popup = false)
                        : (marker.popup = true)
                      this.state.displayPopup
                        ? this.setState({displayPopup: false})
                        : this.setState({displayPopup: true})
                    }}
                  />
                </Marker>
                {/* also checking if displayPopup is true, then render Popup */}
                {marker.popup ? this.renderPopup(idx) : <div />}
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
