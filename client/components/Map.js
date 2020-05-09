import React from 'react'
// const mapboxgl = require('mapbox-gl')
import MapGL, {GeolocateControl} from 'react-map-gl'

import {mapboxToken} from '../../secrets'
// mapboxgl.accessToken = mapboxToken

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
      //40.7128° N, 74.0060° W
    }
  }
  componentDidMount() {
    // const map = new mapboxgl.Map({
    //   container: 'map',
    //   center: [-74.009, 40.705], // FullStack NY coordinates; alternatively, use [-87.6354, 41.8885] for Chicago
    //   zoom: 12, // starting zoom
    //   style: 'mapbox://styles/mapbox/streets-v10' // mapbox has lots of different map styles available.
    // })
    // const cPark = new mapboxgl.Marker().setLngLat([40.7829, 73.9654]).addTo(map)
    // var marker = new mapboxgl.Marker().setLngLat([30.5, 50.5]).addTo(map)
    // const centralPark = new mapboxgl.LngLat([40.7829, 73.9654])
  }
  addMarker() {}
  render() {
    const geolocateStyle = {
      float: 'left',
      margin: '50px',
      padding: '10px'
    }
    console.log('THIS IS STATE >>>>>', this.state)
    // const _onViewportChange = viewport => this.setState.viewport({...viewport, transitionDuration: 3000 })
    return (
      <div>
        {/* <MapGL {...this.state.viewport} mapboxApiAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={_onViewportChange}/> */}
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
