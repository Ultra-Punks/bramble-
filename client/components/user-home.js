import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchFollowingPosts} from '../store/generalUserFeed'
import {MapForProfile} from './index'
import FollowingFeed from './FollowingFeed'

class UserHome extends React.Component {
  componentDidMount() {
    this.props.fetchFollowingFeed(this.props.username)
  }

  render() {
    return (
      <div className="home-feed-container">
        <div className="welcome-container" />
        <FollowingFeed
          posts={this.props.followingFeed}
          loggedInUser={this.props.username}
          isLoggedIn={this.props.isLoggedIn}
        />
        <div className="map-container">
          <MapForProfile userHomeId={this.props.id} />
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.user.username,
    followingFeed: state.followingFeed,
    id: state.user.id,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    fetchFollowingFeed: username => dispatch(fetchFollowingPosts(username))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string,
// }
