import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {AllProfiles} from './index'  // TESTER COMP ONLY...

// bring in thunks here
import {fetchOneCommunity} from '../store/community'
import {fetchUsers} from '../store/allProfiles'

import {fetchUserPosts} from '../store/userFeed'
import {fetchProfile} from '../store/singleProfile'
import {fetchSinglePost} from '../store/singlePost'

class LandingPage extends Component {
  constructor() {
    super()
    this.state = {
      community: ''
    }
  }

  componentDidMount() {
    this.props.fetchCommunity(this.state.community)
    this.props.fetchUsers()
    // const username = this.props.match.params.username
    // this.props.fetchUserPosts(username)
  }

  render() {
    console.log('this.props>>>>>', this.props)
    return (
      <div className="landingPage">
        <div>
          <ul>THIS IS LANDING PAGE</ul>
          {/* <AllProfiles /> */}
          <img src="https://avsmindfulness.com/wp-content/uploads/2018/03/5-Health-Benefits-of-Socialization-1.jpg" />
        </div>
      </div>
    )
  }
}

const mapToState = state => {
  return {
    community: state.community,
    profiles: state.profiles
    // posts: state.userPosts,
  }
}

const mapToDispatch = (dispatch, ownProps) => {
  return {
    fetchCommunity: name => dispatch(fetchOneCommunity(name)),
    fetchUsers: () => dispatch(fetchUsers())
    // fetchUserPosts: (username) => dispatch(fetchUserPosts(username)),
  }
}

export default connect(mapToState, mapToDispatch)(LandingPage)
