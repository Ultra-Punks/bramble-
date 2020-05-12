import React from 'react'
import MapGL, {
  GeolocateControl,
  NavigationControl,
  Marker,
  Popup
} from 'react-map-gl'
import {connect} from 'react-redux'
import {fetchAllLocations} from '../store/locations'
import {mapboxToken} from '../../secrets'

//dummy restaurant info
const markerList = [
  {
    lat: 40.653975,
    long: -73.959285,
    name: 'Zen Vegetarian',
    info: "Fucking best chinese food you'll ever eat"
  },
  {
    lat: 40.650774,
    long: -73.956137,
    name: 'Four Seasons Bakery & Juice Bar',
    info: 'Damn good Caribbean food'
  }
]

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
        zoom: 8
      },
      displayPopup: false,
      userLocation: {}
    }
  }
  componentDidMount() {
    // this.props.getAllLocations()
    console.log(this.props)
  }
  setUserLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      let setUserLocation = {
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
      this.setState({viewport: newViewport, userLocation: setUserLocation})
    })
    console.log('state in setUserLocation func', this.state)
  }
  renderPopup(index) {
    return (
      <Popup
        tipSize={5}
        anchor="bottom-right"
        longitude={markerList[index].long}
        latitude={markerList[index].lat}
        onMouseLeave={() => this.setState({displayPopup: false})}
        closeOnClick={true}
      >
        <p>
          <strong>{markerList[index].name}</strong>
          <br />
          {markerList[index].info}
        </p>
      </Popup>
    )
  }
  addMarker(coordsArray) {
    const long = coordsArray[0]
    const lat = coordsArray[1]
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
        <button type="submit" onClick={() => this.setUserLocation()}>
          Add My Location To Map
        </button>
        <MapGL
          {...this.state.viewport}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxApiAccessToken={mapboxToken}
          onViewportChange={viewport => this.setState({viewport})}
          onClick={event => console.log(event)}
        >
          <div className="nav" style={navStyle}>
            <NavigationControl
              onViewportChange={viewport => this.setState({viewport})}
            />
          </div>
          {markerList.map((marker, idx) => {
            return (
              <div key={idx} className="marker">
                {' '}
                <Marker longitude={marker.long} latitude={marker.lat}>
                  <img
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
  getAllLocations: dispatch(fetchAllLocations())
})

export default connect(mapState, mapDispatch)(Map)
