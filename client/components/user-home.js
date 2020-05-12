import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'

// import the thunk here...
// import {fetchProfile} from '../store/user'
import {fetchProfile} from '../store/singleProfile'

class UserHome extends React.Component {
  constructor(props) {
    super(props)
    console.log('from constructor>>>>>>', this.props)
    // bind methods here...
  }
  componentDidMount() {
    this.props.fetchProfile()
  }
  render() {
    const profile = this.props.profile
    return (
      <div className="profileContainer">
        <div className="profileImgContentContainer">
          <img src={profile.profileImg} className="profilePagePhoto" />
          <div className="profileInfo">
            <ul>{profile.username}</ul>
            <ul>Followers: {profile.followers}</ul>
            <ul>Following: {profile.following}</ul>
            <ul>Communities: (button / num?)</ul>
            <button type="button" className="followButton">
              Follow
            </button>
          </div>
          <ul className="profileBio">Bio: {profile.description}</ul>
          <div className="contentContainer">
            <div className="buttonContainer">
              <button type="button" className="profileFeedButton">
                All Posts
              </button>
              <button type="button" className="profileFeedButton">
                Gallery
              </button>
            </div>
            <br />
            <br />
            (RENDER POSTS IN HERE)
          </div>
        </div>

        <div className="profileMapContainer">
          <br />
          <br />
          MAP PLACEHOLDER
        </div>

        {/* {this.props.singleProfile.email} */}
        {/* <p>Users {this.props.profile.userName}</p> */}
        {/* {this.props.profile ? (
          <p>Brambler: {this.props.profile.name}</p>
        ) : (
          <p>'loading'</p>
        )} */}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    profile: state.singleProfile
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const userId = ownProps.match.params.id
  return {
    fetchProfile: () => dispatch(fetchProfile(userId))
  }
}

export default connect(mapState, mapDispatch)(UserHome)
