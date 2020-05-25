import React from 'react'
import {connect} from 'react-redux'
import {
  fetchSingleCommunity,
  subToCommunity,
  unSubToCommunity,
  fetchCommunityLocations
} from '../store/community'
import {me} from '../store/user'
import {fetchAllCommunityPhotos} from '../store/photos'
import {fetchCommunityPosts} from '../store/userFeed'
import {Button} from 'react-bootstrap'
import {CommunityFeed, MapForProfile} from './index'
import ShowMembers from './ShowMembers'
import DisplaySubUnsub from './DisplaySubUnsub'

class CommunityProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      postFeed: 'posts',
      showMembers: false,
      postlikes: false,
      commentLikes: false
    }
    this.showMembersOnClick = this.showMembersOnClick.bind(this)
    this.hideMembers = this.hideMembers.bind(this)
    this.viewSelector = this.viewSelector.bind(this)
  }
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.fetchSingleCommunity(id)
    this.props.fetchGallery()
    this.props.fetchCommunityPosts()
    this.props.fetchLocations()
  }

  viewSelector(view) {
    this.setState({postFeed: view})
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
    const postClass =
      this.state.postFeed === 'posts'
        ? 'profileFeedButton selected-feed'
        : 'profileFeedButton'

    const galleryFeed =
      this.state.postFeed === 'gallery'
        ? 'profileFeedButton selected-feed'
        : 'profileFeedButton'

    const locationFeed =
      this.state.postFeed === 'locations'
        ? 'profileFeedButton selected-feed'
        : 'profileFeedButton'

    return (
      <div className="profileContainer">
        <div className="profileImgContentContainer">
          <img
            src={community.profileImg}
            className="profilePagePhoto-Community"
          />
          <div className="profile-top-name">
            <p className="profile-name">{community.name}</p>
            {this.props.isLoggedIn ? (
              <DisplaySubUnsub
                unsubscribe={this.props.unsubscribe}
                subscribe={this.props.subscribe}
                isSubscribed={this.props.community.isSubscribed}
                updateUser={this.props.updateUser}
              />
            ) : (
              ''
            )}
          </div>
          <div className="underCommunity">
            <p className="profileBio">{community.description}</p>
          </div>
          <div className="profile-follows" />
          {community.users !== undefined && community.users.length ? (
            <p
              className="first-list text-hover"
              onClick={() => this.showMembersOnClick()}
            >
              {community.subscribers} Members
            </p>
          ) : (
            <p className="first-list text-hover">0 Members</p>
          )}

          <ShowMembers
            show={this.state.showMembers}
            onHide={() => this.hideMembers()}
            community={community}
          />
          <div className="contentContainer">
            <div className="buttonContainer">
              <Button
                variant="link"
                className={postClass}
                onClick={() => this.viewSelector('posts')}
              >
                Posts
              </Button>
              <Button
                variant="link"
                className={locationFeed}
                onClick={() => this.viewSelector('locations')}
              >
                Locations
              </Button>
              <Button
                variant="link"
                className={galleryFeed}
                onClick={() => this.viewSelector('gallery')}
              >
                Gallery
              </Button>
            </div>
            <div>
              <CommunityFeed
                postFeed={this.state.postFeed}
                images={this.props.gallery}
                posts={this.props.posts.communityPosts}
                loggedInUser={this.props.user.username}
                isLoggedIn={this.props.isLoggedIn}
                locations={this.props.community.locations}
              />
            </div>
          </div>
        </div>

        <div className="profileMapContainer sticky">
          <MapForProfile cId={this.props.match.params.id} />
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
    posts: state.userPosts,
    user: state.user
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const id = ownProps.match.params.id
  return {
    fetchSingleCommunity: () => dispatch(fetchSingleCommunity(id)),
    fetchGallery: () => dispatch(fetchAllCommunityPhotos(id)),
    fetchCommunityPosts: () => dispatch(fetchCommunityPosts(id)),
    subscribe: () => {
      dispatch(subToCommunity(id))
      setTimeout(() => dispatch(me()), 500)
    },
    unsubscribe: () => {
      dispatch(unSubToCommunity(id))
      setTimeout(() => dispatch(me()), 500)
    },
    fetchLocations: () => dispatch(fetchCommunityLocations(id))
  }
}

export default connect(mapState, mapDispatch)(CommunityProfile)
