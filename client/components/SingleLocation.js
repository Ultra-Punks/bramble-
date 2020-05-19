import React from 'react'
import {connect} from 'react-redux'
import {fetchOneLocation} from '../store/singleLocation'

// class SingleLocation extends React.Component {
class SingleLocationView extends React.Component {
  componentDidMount() {
    this.props.fetchLocation()
  }

  render() {
    console.log('THIS IS PROPS', this.props)
    return <div>TEST</div>
  }
}

const mapState = state => {
  return {
    singleLocation: state.singleLocation
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const id = ownProps.match.params.id
  return {
    fetchLocation: () => dispatch(fetchOneLocation(id))
  }
}

export default connect(mapState, mapDispatch)(SingleLocationView)
