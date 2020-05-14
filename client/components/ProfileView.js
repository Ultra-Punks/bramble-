import React from 'react'
import {connect} from 'react-redux'
import {fetchProfile} from '../store/singleProfile'
import {fetchAllPhotos} from '../store/photos'
import {fetchUserPosts} from '../store/userFeed'
import {PostFeed} from './index'
import {Image, Button} from 'react-bootstrap'

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
    this.props.fetchGallery()
    this.props.fetchUserPosts()
  }

  postSelector() {
    this.setState({postFeed: true})
  }

  gallerySelector() {
    this.setState({postFeed: false})
  }

  render() {
    const profile = this.props.profile
    const postClass = this.state.postFeed
      ? 'profileFeedButton selected-feed'
      : 'profileFeedButton'

    const galleryFeed = !this.state.postFeed
      ? 'profileFeedButton selected-feed'
      : 'profileFeedButton'
    return (
      <div className="profileContainer">
        <div className="profileImgContentContainer">
          <Image
            className="profilePagePhoto"
            src={profile.profileImg}
            roundedCircle
          />
          <div className="profileInfo">
            <div>
              <p className="profile-name">{profile.name}</p>
              <p className="profile-username">@{profile.username}</p>
            </div>
          </div>
          <div className="underline">
            <p className="profileBio">{profile.description}</p>
          </div>
          <div className="profile-follows">
            <p className="first-list">Followers: {profile.followers}</p>
            <p className="profile-info-text">Following: {profile.following}</p>
            <p className="profile-info-text">Communities</p>
          </div>
          <Button className="follow-button" variant="outline-light">
            Follow
          </Button>{' '}
          <div className="contentContainer">
            <div className="buttonContainer">
              <Button
                variant="link"
                className={postClass}
                onClick={() => this.postSelector()}
              >
                Posts
              </Button>
              <Button
                variant="link"
                className={galleryFeed}
                onClick={() => this.gallerySelector()}
              >
                Gallery
              </Button>
            </div>
            <div>
              <PostFeed
                postFeed={this.state.postFeed}
                images={this.props.gallery}
                posts={this.props.posts}
                profile={this.props.profile}
              />
            </div>
          </div>
        </div>

        <img
          src="https://miro.medium.com/max/4064/1*qYUvh-EtES8dtgKiBRiLsA.png"
          className="profileMapContainer sticky"
        />
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
    gallery: state.allPhotos,
    posts: state.userPosts
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const username = ownProps.match.params.username
  return {
    fetchProfile: () => dispatch(fetchProfile(username)),
    fetchGallery: () => dispatch(fetchAllPhotos(username)),
    fetchUserPosts: () => dispatch(fetchUserPosts(username))
  }
}

export default connect(mapState, mapDispatch)(ProfileView)
