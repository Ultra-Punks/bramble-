import React from 'react'
import {Image} from 'react-bootstrap'
import {connect} from 'react-redux'
import history from '../history'

// import the thunk here...
import {fetchUsers, searchUsers} from '../store/allProfiles'

class AllProfiles extends React.Component {
  constructor() {
    super()
    this.state = {
      profile: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchUsers()
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleKeyPress = () => {
    if (this.state.profile) {
      this.props.search(this.state.profile)
    } else {
      this.props.fetchUsers()
    }
  }

  handleSubmit() {
    event.preventDefault()
    if (this.state.profile) {
      this.props.search(this.state.profile)
    } else {
      this.props.fetchUsers()
    }
  }

  render() {
    const profiles = this.props.profiles
    return (
      <div className="allProfilesContainer">
        <div className="communityPic">
          <div className="community-first-container">
            <p className="community-search-title">Search bramblers</p>
          </div>
          <div className="community-second-container">
            <form onSubmit={this.handleSubmit}>
              <input
                className="searchbar"
                name="profile"
                type="text"
                onChange={this.handleChange}
                onKeyUp={this.handleKeyPress}
                value={this.state.profile}
              />
              <button className="searchCommunitybutton" type="submit">
                <img
                  src="https://image.flaticon.com/icons/svg/1086/1086933.svg"
                  className="community-magPic"
                />
              </button>
            </form>
            <img
              src="https://youmatter.world/app/uploads/sites/2/2020/03/coronavirus-bad-ecology.jpg"
              className="communitySinglePix"
            />
          </div>
        </div>

        {profiles ? (
          profiles.map(user => {
            return (
              <div
                className="main-profile-preview-container"
                key={user.id}
                onClick={() => history.push(`/u/${user.username}`)}
              >
                <Image
                  className="post-pfp"
                  src={user.profileImg}
                  roundedCircle
                />
                <div className="profile-preview">
                  <div className="profile-preview-handle">
                    <p className="profile-preview-name text-hover">
                      {user.name}
                    </p>
                    <p className="profile-preview-username text-hover">
                      @{user.username}
                    </p>
                  </div>
                  <p>{user.description}</p>
                </div>
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
  fetchUsers: () => dispatch(fetchUsers()),
  search: username => dispatch(searchUsers(username))
})

export default connect(mapState, mapDispatch)(AllProfiles)
