import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProfile} from '../store/singleProfile'
import {fetchUserPosts} from '../store/userFeed'
import {PostFeed, Map, PopUpDisplay} from './index'
import {Image, Button} from 'react-bootstrap'

class ProfileView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      postFeed: true,
      showFollowers: false,
      showFollowing: false
    }
    this.postSelector = this.postSelector.bind(this)
    this.gallerySelector = this.gallerySelector.bind(this)
    this.showFollowersOnClick = this.showFollowersOnClick.bind(this)
    this.hideFollowers = this.hideFollowers.bind(this)
  }
  componentDidMount() {
    this.props.fetchProfile()
    this.props.fetchUserPosts()
  }

  postSelector() {
    this.setState({postFeed: true})
  }

  gallerySelector() {
    this.setState({postFeed: false})
  }

  showFollowersOnClick() {
    this.setState({showFollowers: true})
  }

  hideFollowers() {
    this.setState({showFollowers: false})
  }

  showFollowingOnClick() {
    this.setState({showFollowers: true})
  }

  hideFollowing() {
    this.setState({showFollowers: false})
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
            <p
              onClick={() => this.showFollowersOnClick()}
              className="first-list"
            >
              Followers: {profile.followerCount}
            </p>
            <PopUpDisplay
              show={this.state.showFollowers}
              onHide={() => this.hideFollowers()}
              type="followers"
              profile={profile}
            />
            <p className="profile-info-text">
              Following: {profile.followingCount}
            </p>
            <p className="profile-info-text">Communities</p>
          </div>
          <Button className="follow-button" variant="outline-light">
            Follow
          </Button>
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
                handleComments={this.handleComments}
                openComments={this.state.openComments}
              />
            </div>
          </div>
        </div>
        <div className="profileMapContainer sticky">
          <Map />
          {/* <img
          src="https://miro.medium.com/max/4064/1*qYUvh-EtES8dtgKiBRiLsA.png"
          className="profileMapContainer sticky"
        /> */}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    profile: state.singleProfile,
    posts: state.userPosts
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const username = ownProps.match.params.username

  return {
    fetchProfile: () => dispatch(fetchProfile(username)),
    fetchUserPosts: () => dispatch(fetchUserPosts(username))
  }
}

export default connect(mapState, mapDispatch)(ProfileView)
