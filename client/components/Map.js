//Official Docs: https://github.com/visgl/react-map-gl/tree/master/docs/api-reference
//Tutorial (Viewport, Markers, Popups): https://medium.com/@walkingtreetech/play-with-maps-in-react-using-mapbox-f74fdf386c8a

import React from 'react'
import MapGL, {
  GeolocateControl,
  NavigationControl,
  Marker,
  Popup
} from 'react-map-gl'
import {AddLocationForm} from './index'
import {connect} from 'react-redux'
import {fetchAllLocations} from '../store/locations'
import {mapboxToken} from '../../secrets'

class Map extends React.Component {
  constructor() {
    super()
    this.addMarker = this.addMarker.bind(this)
    this.setUserLocation = this.setUserLocation.bind(this)
    //state contains viewport information, boolean value to toggle popups being displayed,
    //userLocation is the user's current location and selectedLocation is a temporary location
    //for when the user wants to add a location that they are not currently at
    this.state = {
      viewport: {
        width: 1000,
        height: 700,
        latitude: 40.73061,
        longitude: -73.935242,
        zoom: 15
      },
      displayPopup: false,
      userLocation: {},
      selectedLocation: {}
    }
  }
  componentDidMount() {
    this.props.getAllLocations()
  }
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
  addMarker(coordsArray) {
    console.log('coordsArray in addMarker func', coordsArray)
    const coordinates = [...coordsArray]
    this.setState({
      selectedLocation: {
        name: 'Temporary',
        point: {type: 'Point', coordinates}
      }
    })
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
            //if state.userLocation exists, addMarker is called with the coordinates from
            //userLocation
            this.state.userLocation.lat &&
              this.addMarker([
                this.state.userLocation.long,
                this.state.userLocation.lat
              ])
          }}
        >
          Add My Location To Map
        </button>
        <button type="submit">Add Selected Location to Bramble</button>
        {/* our main interactive map component */}
        <MapGL
          {...this.state.viewport}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxApiAccessToken={mapboxToken}
          onViewportChange={viewport => this.setState({viewport})}
          // take coordinates from event passed to click handling function and set selectedLocation
          // to those coordinates
          onClick={e => {
            // this.addMarker(e.lngLat)
            this.setState({
              selectedLocation: {
                name: 'Temporary',
                point: {type: 'Point', coordinates: [e.lngLat[0], e.lngLat[1]]}
              }
            })
            console.log('state in onClick', this.state)
          }}
        >
          <div className="nav" style={navStyle}>
            <NavigationControl
              onViewportChange={viewport => this.setState({viewport})}
            />
          </div>
          {/* if state.selectedLocation exists, then we create a marker for it */}
          {this.state.selectedLocation.point ? (
            <Marker
              longitude={this.state.selectedLocation.point.coordinates[0]}
              latitude={this.state.selectedLocation.point.coordinates[1]}
            >
              <img className="marker" src="temp-map-icon.jpeg" width="50" />
            </Marker>
          ) : (
            ''
          )}
          {/* map() through locations and create Markers for all of them */}
          {this.props.locations.map((marker, idx) => {
            console.log('locations in map', idx, marker)
            const long = marker.point.coordinates[0]
            const lat = marker.point.coordinates[1]
            return (
              <div key={idx}>
                <Marker longitude={long} latitude={lat}>
                  <img
                    className="marker"
                    src="map-icon.png"
                    width="50"
                    onClick={() =>
                      this.state.displayPopup
                        ? this.setState({displayPopup: false})
                        : this.setState({displayPopup: true})
                    }
                  />
                </Marker>
                {/* also checking if displayPopup is true, then render Popup */}
                {this.state.displayPopup ? this.renderPopup(idx) : <div />}
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
