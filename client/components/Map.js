import React from 'react'
import MapGL, {
  GeolocateControl,
  NavigationControl,
  Marker,
  Popup
} from 'react-map-gl'
// import {AddLocationForm} from './index'
import {connect} from 'react-redux'
import {fetchAllLocations} from '../store/locations'
import {mapboxToken} from '../../secrets'

class Map extends React.Component {
  constructor() {
    super()
    this.addMarker = this.addMarker.bind(this)
    this.setUserLocation = this.setUserLocation.bind(this)
    this.state = {
      viewport: {
        width: 800,
        height: 800,
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
  addMarker(coordsArray) {
    // const long = coordsArray[0]
    // const lat = coordsArray[1]
    const coordinates = [...coordsArray]
    this.setState({
      selectedLocation: {name: 'Temporary', point: {type: 'Point', coordinates}}
    })
  }
  render() {
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
          onClick={() =>
            this.addMarker([
              this.state.userLocation.long,
              this.state.userLocation.lat
            ])
          }
        >
          Add My Location To Map
        </button>
        <MapGL
          {...this.state.viewport}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxApiAccessToken={mapboxToken}
          onViewportChange={viewport => this.setState({viewport})}
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
          {this.state.selectedLocation.point ? (
            <Marker
              longitude={this.state.selectedLocation.point.coordinates[0]}
              latitude={this.state.selectedLocation.point.coordinates[1]}
            >
              {console.log(
                'IN CHECK IF SELECTED LOCATION IS DEFINED',
                this.state
              )}
              <img className="marker" src="temp-map-icon.jpeg" width="50" />
            </Marker>
          ) : (
            ''
          )}
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
                {this.state.displayPopup ? this.renderPopup(idx) : <div />}
              </div>
            )
          })}
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
