import React from 'react'
import history from '../history'
import MapGL, {
  NavigationControl,
  Marker,
  Popup,
  Source,
  Layer
} from 'react-map-gl'
import {Button} from 'react-bootstrap'
import RedPin from './RedPin'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchAllLocations, fetchSomeLocations} from '../store/locations'
import {fetchOneLocation} from '../store/singleLocation'
import {mapboxToken} from '../../secrets'

class MapForSingleLocation extends React.Component {
  constructor() {
    super()
    this.addMarker = this.addMarker.bind(this)
    this.state = {
      show: false,
      viewport: {
        width: window.innerWidth * 0.4,
        height: window.innerHeight * 0.75,
        latitude: 40.705112,
        longitude: -74.009123,
        zoom: 12
      }
    }
  }
  // eslint-disable-next-line complexity
  componentDidMount() {
    const {location} = this.props
    if (location && location.id) {
      const coordinates = location.geometry.coordinates
      this.setState({
        viewport: {
          ...this.state.viewport,
          latitude: coordinates[1],
          longitude: coordinates[0]
        }
      })

      // this.addMarker(
      //   this.props.singleLocation.geometry.coordinates,
      //   this.props.singleLocation
      // )
    }
  }

  //renderPopup is called in the 'locations.map()', therefore takes an index as an argument
  //and creates a <Popup/> component for each location,
  // ANY HTML can go between Popups opening and closing tags
  renderPopup(loc) {
    const long = loc.geometry.coordinates[0]
    const lat = loc.geometry.coordinates[1]

    return (
      <Popup
        tipSize={7}
        anchor="bottom-right"
        longitude={long}
        latitude={lat}
        // onMouseLeave={() => this.setState({displayPopup: false})}
        // onClose={() => {
        //   console.log('in the onclose func', loc)
        //   loc.popup = false
        //   this.setState({displayPopup: false})
        // }}
        closeButton={false}
        // closeOnClick={true}
      >
        <div className="popup">
          <div className="popup-header">
            <div className="width-100">
              <p
                className="popup-community-tag"
                onClick={() =>
                  history.push(`/community/list/${loc.communityId}`)
                }
              >
                {loc.community && loc.community.name && loc.community.name}
              </p>
              <div className="popup-header">
                <p
                  onClick={() => history.push(`/l/${loc.id}`)}
                  className="popup-loc-name"
                >
                  {loc.name}
                </p>
              </div>
            </div>
          </div>
          <div className="popup-body">
            <p className="popup-body-text">{loc.address && `${loc.address}`}</p>
            <p className="popup-body-text">{loc.city && `${loc.city}`}</p>
            <p className="popup-body-text">
              {loc.description && `${loc.description}`}
            </p>
          </div>
        </div>
      </Popup>
    )
  }
  //takes coordinate array as an argument, and sets selectedLocation on state
  addMarker(coordinates, result) {
    this.setState({
      selectedLocation: {...result, popup: true},
      viewport: {
        ...this.state.viewport,
        latitude: coordinates[1],
        longitude: coordinates[0]
      }
    })
  }
  render() {
    const navStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      padding: '10px'
    }
    return (
      <div id="map">
        <p>{this.state.message}</p>

        {/* our main interactive map component */}
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

          {/* {this.state.selectedLocation.geometry &&
            this.state.selectedLocation.geometry.type && ( */}
          {this.props.location.geometry &&
            this.props.location.geometry.type && (
              <div>
                <Marker
                  longitude={this.props.location.geometry.coordinates[0]}
                  latitude={this.props.location.geometry.coordinates[1]}
                >
                  <RedPin />
                </Marker>
                {this.props.location && this.renderPopup(this.props.location)}
              </div>
            )}
        </MapGL>
      </div>
    )
  }
}

const mapState = state => ({
  // location: state.singleLocation
})
const mapDispatch = dispatch => ({
  fetchLocation: id => dispatch(fetchOneLocation(id))
})
export default connect(mapState, mapDispatch)(MapForSingleLocation)
