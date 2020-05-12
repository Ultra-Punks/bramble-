import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'

// import the thunk here...
import {fetchUsers} from '../store/allProfiles'

class AllProfiles extends React.Component {
  componentDidMount() {
    this.props.fetchUsers()
  }
  // const UserHome = (props) => {
  render() {
    return (
      <div className="allProfilesContainer">
        <p>Fellow Bramblers:</p>
        {this.props.profiles ? (
          this.props.profiles.map(user => {
            return (
              <div key={user.id} className="profileSampleView">
                <img src={user.profileImg} className="allProfilePhotos" />
                <p>{user.username}</p>
                <p>INSERT RECENT POST</p>
              </div>
            )
          })
        ) : (
          <p>'loading'</p>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    profiles: state.profiles
  }
}

const mapDispatch = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers())
})

export default connect(mapState, mapDispatch)(AllProfiles)
