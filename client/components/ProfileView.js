import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  fetchProfile,
  addNewFollower,
  unfollowUserThunk
} from '../store/singleProfile'
import {fetchUserPosts} from '../store/userFeed'
import {PostFeed, Map, PopUpDisplay} from './index'
import {Image, Button} from 'react-bootstrap'
import {checkIfFollowing} from '../store/isFollowing'
import ShowFollowing from './ShowFollowing'
import DisplayFollowUnfollow from './DisplayFollowUnfollow'

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
    const username = this.props.match.params.username

    this.props.fetchProfile(username)
    this.props.fetchUserPosts(username)

    // this.props.checkFollowing(username)
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
    this.setState({showFollowing: true})
  }

  hideFollowing() {
    this.setState({showFollowing: false})
  }

  followUser() {
    let info = {
      loggedInUser: this.props.user.username,
      username: this.props.profile.username
    }
    this.props.followUserThunk(info)
  }

  render() {
    const profile = this.props.profile.profile
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
            {/* DISPLAY FOR FOLLOWERS */}
            <PopUpDisplay
              show={this.state.showFollowers}
              onHide={() => this.hideFollowers()}
              profile={profile}
            />
            <p
              className="profile-info-text"
              onClick={() => this.showFollowingOnClick()}
            >
              Following: {profile.followingCount}
            </p>
            {/* DISPLAY FOR FOLLOWING */}
            <ShowFollowing
              show={this.state.showFollowing}
              onHide={() => this.hideFollowing()}
              profile={profile}
            />
            <p className="profile-info-text">Communities</p>
          </div>
          {this.props.isLoggedIn &&
          this.props.user.username !== profile.username ? (
            <DisplayFollowUnfollow
              following={this.props.profile.isFollowing}
              followUser={this.props.followUserThunk}
              unfollowUser={this.props.unfollowUserThunk}
              username={this.props.match.params.username}
            />
          ) : (
            <div />
          )}

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
                posts={this.props.posts.profilePosts}
                profile={this.props.profile.profile}
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
    posts: state.userPosts,
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProfile: username => dispatch(fetchProfile(username)),
    fetchUserPosts: username => dispatch(fetchUserPosts(username)),
    followUserThunk: info => dispatch(addNewFollower(info)),
    unfollowUserThunk: info => dispatch(unfollowUserThunk(info))
  }
}

export default connect(mapState, mapDispatch)(ProfileView)
