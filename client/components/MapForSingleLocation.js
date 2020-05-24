import React from 'react'
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
        height: window.innerHeight * 0.4,
        latitude: 40.705112,
        longitude: -74.009123,
        zoom: 12
      },
      selectedLocation: {}
    }
  }
  // eslint-disable-next-line complexity
  componentDidMount() {
    const {singleLocation} = this.props

    console.log('props in compdidmount', this.props)
    console.log(
      'selected location in compdidmount',
      this.state.selectedLocation
    )
    // console.log('cIdS ', cIdS)
    console.log('state in compdidmount', this.state)

    //check if the prop equals the state, and if so reset it
    // if (userHomeId === userHomeIdS) this.setState({userHomeIdS: null})
    // if (singleLocation.id === singleLocationIdS){
    //   console.log('In check if singlelocation ids match')
    //   this.setState({singleLocationIdS: null})
    // }
    // if (cId === cIdS) this.setState({cIdS: null})
    // if (username === usernameS) this.setState({username: null})
    // console.log('state after equality checks', this.state)

    if (singleLocation && singleLocation.id) {
      this.props.fetchLocation(singleLocation.id)
      this.setState({
        selectedLocation: singleLocation
        // viewport: {
        //   ...this.state.viewport,
        //   latitude: singleLocation.geometry.coordinates[1],
        //   longitude: singleLocation.geometry.coordinates[0]
        // }
      })

      this.addMarker(
        this.props.singleLocation.geometry.coordinates,
        this.props.singleLocation
      )
    }

    console.log('state at end of compdidmount', this.state)
  }
  componentWillUnmount() {
    this.setState({singleLocationId: null, selectedLocation: {}})
    console.log('COMPONENT UNMOUNTING', this.state)
  }

  //renderPopup is called in the 'locations.map()', therefore takes an index as an argument
  //and creates a <Popup/> component for each location,
  // ANY HTML can go between Popups opening and closing tags
  renderPopup(loc) {
    const long = loc.geometry.coordinates[0]
    const lat = loc.geometry.coordinates[1]
    console.log('loc in renderpopup', loc)

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
            <div>
              <strong>{loc.name && loc.name}</strong>
              <Link to={`/community/list/${loc.communityId}`}>
                {loc.community && loc.community.name && loc.community.name}
              </Link>
            </div>
          </div>
          <p className="popup-body">
            {/* {`${loc.address} ${loc.city}`} */}
            {loc.address && `${loc.address}`}
            {loc.city && `${loc.city}`}
            {loc.description && `${loc.description}`}
          </p>
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

          {this.state.selectedLocation.geometry &&
            this.state.selectedLocation.geometry.type && (
              <div>
                <Marker
                  longitude={
                    this.state.selectedLocation.geometry.coordinates[0]
                  }
                  latitude={this.state.selectedLocation.geometry.coordinates[1]}
                >
                  <RedPin />
                </Marker>
                {this.state.selectedLocation.popup &&
                  this.renderPopup(this.state.selectedLocation)}
              </div>
            )}
        </MapGL>
      </div>
    )
  }
}

const mapState = state => ({
  singleLocation: state.singleLocation
})
const mapDispatch = dispatch => ({
  fetchLocation: id => dispatch(fetchOneLocation(id))
})
export default connect(mapState, mapDispatch)(MapForSingleLocation)
