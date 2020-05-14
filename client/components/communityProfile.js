import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleCommunity} from '../store/community'
import {fetchAllPhotos} from '../store/photos'
import {fetchUserPosts} from '../store/userFeed'
import {fetchProfile} from '../store/singleProfile'

import {PostFeed} from './index'

class CommunityProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      postFeed: true
    }
    this.postSelector = this.postSelector.bind(this)
    this.gallerySelector = this.gallerySelector.bind(this)
  }
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.fetchSingleCommunity(id)
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
    const community = this.props.community
    const postClass = this.state.postFeed
      ? 'profileFeedButton selected-feed'
      : 'profileFeedButton'

    const galleryFeed = !this.state.postFeed
      ? 'profileFeedButton selected-feed'
      : 'profileFeedButton'

    return (
      <div>
        <div className="profileContainer">
          <div className="profileImgContentContainer">
            <img src={community.profileImg} className="profilePagePhoto" />
            <div className="profileInfo">
              <ul>{profile.username}</ul>
              <ul>Community: {community.name}</ul>
              <ul>Members: </ul>
              <button type="button">Subscribe</button>
            </div>
            <ul className="profileBio">Bio: {community.description}</ul>
            <div className="contentContainer">
              <div className="buttonContainer">
                <button
                  type="button"
                  className="profileFeedButton"
                  onClick={() => this.postSelector()}
                >
                  Posts
                </button>
                <button
                  type="button"
                  className={galleryFeed}
                  onClick={() => this.gallerySelector()}
                >
                  Gallery
                </button>
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

          {/* <div className="profileMapContainer sticky">MAP PLACEHOLDER</div> */}
        </div>

        <br />
        <br />
        <br />
      </div>
    )
  }
}

const mapState = state => {
  return {
    community: state.community,
    profile: state.singleProfile,
    gallery: state.allPhotos
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const username = ownProps.match.params.username
  return {
    fetchSingleCommunity: id => dispatch(fetchSingleCommunity(id)),
    fetchProfile: () => dispatch(fetchProfile(username)),
    fetchGallery: () => dispatch(fetchAllPhotos(username)),
    fetchUserPosts: () => dispatch(fetchUserPosts(username))
  }
}

export default connect(mapState, mapDispatch)(CommunityProfile)
