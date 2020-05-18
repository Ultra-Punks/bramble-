import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchFollowingPosts} from '../store/generalUserFeed'
import {PostFeed} from './index'
import FollowingFeed from './FollowingFeed'

class UserHome extends React.Component {
  componentDidMount() {
    this.props.fetchFollowingFeed(this.props.username)
  }

  render() {
    const {username} = this.props
    console.log('PROPS', this.props)
    return (
      <div>
        <h3>Welcome {username}!</h3>
        <FollowingFeed posts={this.props.followingFeed} />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // email: state.user.email,
    username: state.user.username,
    followingFeed: state.followingFeed
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
