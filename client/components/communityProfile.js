import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleCommunity} from '../store/community'
import {fetchAllPhotos} from '../store/photos'
import {fetchCommunityPosts} from '../store/userFeed'
// import {fetchProfile} from '../store/singleProfile'
import {Button} from 'react-bootstrap'
import {CommunityFeed, Map} from './index'

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
    this.props.fetchCommunityPosts()
  }

  postSelector() {
    this.setState({postFeed: true})
  }

  gallerySelector() {
    this.setState({postFeed: false})
  }

  render() {
    // console.log(this.props)
    // const profile = this.props.profile
    const community = this.props.community
    const postClass = this.state.postFeed
      ? 'profileFeedButton selected-feed'
      : 'profileFeedButton'

    const galleryFeed = !this.state.postFeed
      ? 'profileFeedButton selected-feed'
      : 'profileFeedButton'

    return (
      <div className="profileContainer">
        <div className="profileImgContentContainer">
          <img
            src={community.profileImg}
            className="profilePagePhoto-Community"
          />
          <div className="profileInfo">
            {/* <p className="profile-name">{profile.username}</p> */}
            <p className="profile-username"> Community: {community.name}</p>
            {/* <ul>Members: </ul> */}
            {/* <button type="button">Subscribe</button> */}
          </div>
          <div className="underCommunity">
            <p className="communityBio">{community.description}</p>
          </div>
          <div className="profile-follows">
            {/* <p className="first-list">Subscribers: {community.subscribers}</p> */}
            {/* <p className="profile-info-text">Communities</p> */}
          </div>
          <Button className="follow-button" variant="outline-light">
            Subscribe
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
            {/* <div>{this.PostFeed()}</div> */}
            <div>
              <CommunityFeed
                postFeed={this.state.postFeed}
                images={this.props.gallery}
                posts={this.props.posts}
                // profile={this.props.profile}
              />
            </div>
          </div>
        </div>

        <div className="profileMapContainer sticky">
          <Map />
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    community: state.community,
    // profile: state.singleProfile,
    gallery: state.allPhotos,
    posts: state.userPosts
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const id = ownProps.match.params.id
  // const username = ownProps.match.params.username
  return {
    fetchSingleCommunity: () => dispatch(fetchSingleCommunity(id)),
    // fetchProfile: () => dispatch(fetchProfile(id)),
    fetchGallery: () => dispatch(fetchAllPhotos(id)),
    fetchCommunityPosts: () => dispatch(fetchCommunityPosts(id))
  }
}

export default connect(mapState, mapDispatch)(CommunityProfile)
