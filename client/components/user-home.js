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
        <div className="imgContentProfContainer">
          <img src={profile.profileImg} className="profilePagePhoto" />
          <ul className="profileBio">Bio: {profile.description}</ul>
        </div>
        <div className="profileMapContainer">MAP PLACEHOLDER</div>

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
