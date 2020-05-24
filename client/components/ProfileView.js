/* eslint-disable complexity */
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {AwesomeButton} from 'react-awesome-button'
import {connect} from 'react-redux'
import {
  fetchProfile,
  addNewFollower,
  unfollowUserThunk
} from '../store/singleProfile'
import {
  PostFeed,
  Map,
  MapForProfile,
  PopUpDisplay,
  ShowFollowing,
  DisplayFollowUnfollow,
  ShowSubscriptions
} from './index'
import {fetchUserPosts} from '../store/userFeed'
import {Image, Button} from 'react-bootstrap'

class ProfileView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      postFeed: true,
      showSubs: false,
      showFollowers: false,
      showFollowing: false
    }
    this.postSelector = this.postSelector.bind(this)
    this.gallerySelector = this.gallerySelector.bind(this)
    this.showFollowersOnClick = this.showFollowersOnClick.bind(this)
    this.hideFollowers = this.hideFollowers.bind(this)
    this.showSubscriptions = this.showSubscriptions.bind(this)
    this.hideSubscriptions = this.hideSubscriptions.bind(this)
  }
  componentDidMount() {
    const username = this.props.match.params.username

    this.props.fetchProfile(username)
    this.props.fetchUserPosts(username)
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

  showSubscriptions() {
    this.setState({showSubs: true})
  }

  hideSubscriptions() {
    this.setState({showSubs: false})
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
            <div className="width-100">
              <div className="profile-top-name">
                <p className="profile-name">{profile.name}</p>
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
              </div>
              <p className="profile-username">@{profile.username}</p>
              {this.props.user.username === profile.username ? (
                <Link to="/edit-profile">
                  <AwesomeButton>Edit Profile</AwesomeButton>
                </Link>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="underline">
            <p className="profileBio">{profile.description}</p>
          </div>
          <div className="profile-follows">
            {profile.followerCount ? (
              <p
                onClick={() => this.showFollowersOnClick()}
                className="first-list text-hover"
              >
                {profile.followerCount} Followers
              </p>
            ) : (
              <p className="first-list text-hover">0 Followers</p>
            )}

            {/* DISPLAY FOR FOLLOWERS */}
            <PopUpDisplay
              show={this.state.showFollowers}
              onHide={() => this.hideFollowers()}
              profile={profile}
            />
            {profile.followingCount ? (
              <p
                className="profile-info-text text-hover"
                onClick={() => this.showFollowingOnClick()}
              >
                {profile.followingCount} Following
              </p>
            ) : (
              <p className="profile-info-text text-hover"> 0 Following</p>
            )}

            {/* DISPLAY FOR FOLLOWING */}
            <ShowFollowing
              show={this.state.showFollowing}
              onHide={() => this.hideFollowing()}
              profile={profile}
            />
            {profile.subscriber !== undefined && profile.subscriber.length ? (
              <p
                className="profile-info-text text-hover"
                onClick={() => this.showSubscriptions()}
              >
                {profile.subscriber.length} Communities
              </p>
            ) : (
              <p className="profile-info-text text-hover">0 Communities</p>
            )}

            <ShowSubscriptions
              show={this.state.showSubs}
              onHide={() => this.hideSubscriptions()}
              profile={profile}
            />
          </div>

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
                loggedInUser={this.props.user.username}
              />
            </div>
          </div>
        </div>
        {/* <div className="profileMapContainer sticky"> */}
        <MapForProfile username={this.props.match.params.username} />
        {/* </div> */}
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
