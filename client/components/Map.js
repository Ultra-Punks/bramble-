import React from 'react'
import MapGL, {
  GeolocateControl,
  NavigationControl,
  Marker,
  Popup
} from 'react-map-gl'
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

export class Map extends React.Component {
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
      popupInfo: false,
      userLocation: {}
    }
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
      this.state.popupInfo && (
        <Popup
          tipSize={5}
          anchor="bottom-right"
          longitude={markerList[index].long}
          latitude={markerList[index].lat}
          onMouseLeave={() => this.setState({popupInfo: null})}
          closeOnClick={true}
        >
          <p>
            <strong>{markerList[index].name}</strong>
            <br />
            {markerList[index].info}
          </p>
        </Popup>
      )
    )
  }
  addMarker() {}
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
      <div>
        <button type="submit" onClick={this.setUserLocation}>
          My Location
        </button>
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
          {Object.keys(this.state.userLocation).length ? (
            <Marker
              latitude={this.state.userLocation.lat}
              longitude={this.state.userLocation.long}
            />
          ) : (
            <div />
          )}
          {markerList.map((marker, idx) => {
            return (
              <div key={idx}>
                {' '}
                <Marker longitude={marker.long} latitude={marker.lat}>
                  <img
                    src="map-icon.png"
                    width="50"
                    onClick={() => this.setState({popupInfo: true})}
                  />
                </Marker>
                {this.renderPopup(idx)}
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
