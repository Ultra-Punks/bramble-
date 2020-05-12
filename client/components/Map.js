import React from 'react'
import MapGL, {GeolocateControl} from 'react-map-gl'

import {mapboxToken} from '../../secrets'

export class Map extends React.Component {
  constructor() {
    super()
    this.addMarker = this.addMarker.bind(this)
    this.state = {
      viewport: {
        width: 800,
        height: 800,
        latitude: 40.73061,
        longitude: -73.935242,
        zoom: 8
      }
    }
  }

  addMarker() {}
  render() {
    const geolocateStyle = {
      float: 'left',
      margin: '50px',
      padding: '10px'
    }
    return (
      <div>
        <MapGL
          {...this.state.viewport}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxApiAccessToken={mapboxToken}
          onViewportChange={viewport => this.setState({viewport})}
        >
          <GeolocateControl
            style={geolocateStyle}
            positionOptions={{enableHighAccuracy: true}}
            trackUserLocation={true}
          />
        </MapGL>
      </div>
    )
  }
}
