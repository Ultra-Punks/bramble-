import React from 'react'
import {connect} from 'react-redux'
import {fetchProfile} from '../store/singleProfile'
import {fetchAllPhotos} from '../store/photos'
import {PostFeed} from './index'

class ProfileView extends React.Component {
  constructor(props) {
    super(props)
    console.log('from constructor>>>>>>', this.props)
    this.state = {
      postFeed: true
    }
    this.postSelector = this.postSelector.bind(this)
    this.gallerySelector = this.gallerySelector.bind(this)
  }
  componentDidMount() {
    this.props.fetchProfile()
    this.props.fetchGallery(this.props.profile.username)
  }

  postSelector() {
    this.setState({postFeed: true})
  }

  gallerySelector() {
    this.setState({postFeed: false})
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
              <button
                type="button"
                className="profileFeedButton"
                onClick={() => this.postSelector()}
              >
                All Posts
              </button>
              <button
                type="button"
                className="profileFeedButton"
                onClick={() => this.gallerySelector()}
              >
                Gallery
              </button>
            </div>
            <div>
              <PostFeed
                postFeed={this.state.postFeed}
                images={this.props.gallery}
              />
            </div>
          </div>
        </div>

        <div className="profileMapContainer sticky">MAP PLACEHOLDER</div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    profile: state.singleProfile,
    gallery: state.allPhotos
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const username = ownProps.match.params.username
  return {
    fetchProfile: () => dispatch(fetchProfile(username)),
    fetchGallery: () => dispatch(fetchAllPhotos(username))
  }
}

export default connect(mapState, mapDispatch)(ProfileView)
