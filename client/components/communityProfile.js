import React from 'react'
import {connect} from 'react-redux'
import {
  fetchSingleCommunity,
  subToCommunity,
  unSubToCommunity
} from '../store/community'
import {me} from '../store/user'
import {fetchAllPhotos} from '../store/photos'
import {fetchCommunityPosts} from '../store/userFeed'
import {Button} from 'react-bootstrap'
import {CommunityFeed, Map} from './index'
import ShowMembers from './ShowMembers'
import DisplaySubUnsub from './DisplaySubUnsub'

class CommunityProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      postFeed: true,
      showMembers: false,
      postlikes: false,
      commentLikes: false
    }
    this.postSelector = this.postSelector.bind(this)
    this.gallerySelector = this.gallerySelector.bind(this)
    this.showMembersOnClick = this.showMembersOnClick.bind(this)
    this.hideMembers = this.hideMembers.bind(this)
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

  showMembersOnClick() {
    this.setState({showMembers: true})
  }

  hideMembers() {
    this.setState({showMembers: false})
  }

  like() {
    this.setState({wasLiked: true})
  }

  disliked() {
    this.setState({wasliked: true})
  }

  render() {
    const community = this.props.community.communityProfile
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
            <p className="profile-username"> Community: {community.name}</p>
          </div>
          <div className="underCommunity">
            <p className="communityBio">{community.description}</p>
          </div>
          <div className="profile-follows" />
          <p className="first-list" onClick={() => this.showMembersOnClick()}>
            {community.subscribers} members
          </p>
          <ShowMembers
            show={this.state.showMembers}
            onHide={() => this.hideMembers()}
            community={community}
          />
          {this.props.isLoggedIn ? (
            <DisplaySubUnsub
              unsubscribe={this.props.unsubscribe}
              subscribe={this.props.subscribe}
              isSubscribed={this.props.community.isSubscribed}
              updateUser={this.props.updateUser}
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
              <CommunityFeed
                postFeed={this.state.postFeed}
                images={this.props.gallery}
                posts={this.props.posts.communityPosts}
                // profile={this.props.profile}
              />
            </div>
          </div>
        </div>

        <div className="profileMapContainer sticky">
          <Map cId={this.props.match.params.id} />
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    community: state.community,
    isLoggedIn: !!state.user.id,
    gallery: state.allPhotos,
    posts: state.userPosts
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const id = ownProps.match.params.id
  return {
    fetchSingleCommunity: () => dispatch(fetchSingleCommunity(id)),
    fetchGallery: () => dispatch(fetchAllPhotos(id)),
    fetchCommunityPosts: () => dispatch(fetchCommunityPosts(id)),
    subscribe: () => {
      dispatch(subToCommunity(id))
      setTimeout(() => dispatch(me()), 500)
    },
    unsubscribe: () => {
      dispatch(unSubToCommunity(id))
      setTimeout(() => dispatch(me()), 500)
    }
  }
}

export default connect(mapState, mapDispatch)(CommunityProfile)
