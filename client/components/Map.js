import React from 'react'

const mapboxgl = require('mapbox-gl')
mapboxgl.accessToken =
  'pk.eyJ1Ijoicm9idTkiLCJhIjoiY2s3dXBocG9vMGw4cjNrbzNwcms3NXNxciJ9.30FuloDeMi1IiNTY-bJLRw'

export class Map extends React.Component {
  constructor() {
    super()
    this.addMarker = this.addMarker.bind(this)
  }
  componentDidMount() {
    const map = new mapboxgl.Map({
      container: 'map',
      center: [-74.009, 40.705], // FullStack NY coordinates; alternatively, use [-87.6354, 41.8885] for Chicago
      zoom: 12, // starting zoom
      style: 'mapbox://styles/mapbox/streets-v10' // mapbox has lots of different map styles available.
    })
    const cPark = new mapboxgl.Marker().setLngLat([40.7829, 73.9654]).addTo(map)
    var marker = new mapboxgl.Marker().setLngLat([30.5, 50.5]).addTo(map)
    // const centralPark = new mapboxgl.LngLat([40.7829, 73.9654])
  }
  addMarker() {}
  render() {
    // if (cPark)  console.log("cpark>>>>>", cPark)
    return <div id="map">textytextytextytextytextytextytextytexty</div>
  }
}
