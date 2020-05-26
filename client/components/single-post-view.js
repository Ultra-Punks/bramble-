/* eslint-disable complexity */
import React, {useState} from 'react'
import {connect} from 'react-redux'
import {
  fetchSinglePost,
  deleteTagThunk,
  likedPost,
  unlikedPost,
  dislikedPost,
  undislikedPost,
  addCommentThunk
} from '../store/singlePost'
import {PostCommentSingle, FullPicture, AddCommentSingle} from './index'
import {Image} from 'react-bootstrap'
import TimeAgo from 'react-timeago'
import Heart from 'react-animated-heart'
import ReactPlayer from 'react-player'
import history from '../history'

function PostingPictures(props) {
  const {post} = props
  const [showPicture, setShowPicture] = useState(false)
  if (post.videoUrl !== null) {
    return (
      <div className="vid-container">
        <ReactPlayer
          controls={true}
          width="100%"
          height="100%"
          url={post.videoUrl}
        />
      </div>
    )
  } else if (
    post !== undefined &&
    post.photos !== undefined &&
    post.photos.length
  ) {
    return (
      <div className="single-post-img-container">
        <img
          src={post.photos[0].imgFile}
          className="single-post-view-img"
          onClick={() => setShowPicture(true)}
        />

        <FullPicture
          show={showPicture}
          image={post.photos[0].imgFile}
          onHide={() => setShowPicture(false)}
        />
      </div>
    )
  } else {
    return <div />
  }
}

function ImageRec(props) {
  const {post, deleteTag, fetchPost, loggedInUser, isLoggedIn} = props

  if (post !== undefined && post.photos !== undefined && post.photos.length) {
    return (
      <div>
        {post.photos[0].tags !== undefined && post.photos[0].tags.length ? (
          <p className="suggested-tags">Suggested Tags</p>
        ) : (
          ''
        )}
        <div className="tags-container">
          {post.photos[0].tags !== undefined && post.photos[0].tags.length
            ? post.photos[0].tags.map(tag => {
                return (
                  <div key={tag.id} className="labels-container">
                    {isLoggedIn &&
                      post.user !== undefined &&
                      loggedInUser === post.user.username && (
                        <p
                          className="individual-labels-delete"
                          onClick={() => {
                            props.deleteTag(tag.id)
                            props.fetchPost()
                          }}
                        >
                          x
                        </p>
                      )}

                    <p className="individual-labels">{tag.imageTag}</p>
                  </div>
                )
              })
            : ''}
        </div>
      </div>
    )
  } else {
    return <div />
  }
}

function UserPFP(props) {
  const {post} = props

  if (post !== undefined && post.user !== undefined) {
    return (
      <Image
        className="post-pfp"
        src={post.user.profileImg}
        roundedCircle
        onClick={() => history.push(`/u/${post.user.username}`)}
      />
    )
  } else {
    return <div />
  }
}

function UserInformation(props) {
  const {post} = props
  if (post !== undefined && post.user !== undefined) {
    const user = post.user
    return (
      <div className="post-handle">
        <div className="single-post-handle">
          <p
            className="handle-text"
            onClick={() => history.push(`/u/${user.username}`)}
          >
            {user.name}
          </p>
          <p
            className="handle-text"
            onClick={() => history.push(`/u/${user.username}`)}
          >
            @{user.username}
          </p>
        </div>
      </div>
    )
  } else {
    return <div />
  }
}

class SinglePostView extends React.Component {
  constructor() {
    super()
    this.state = {
      isClick: false,
      commentForm: false,
      isDislike: false
    }
    this.handleFormOpen = this.handleFormOpen.bind(this)
    this.handleLike = this.handleLike.bind(this)
    this.handleDislike = this.handleDislike.bind(this)
  }

  componentDidMount() {
    this.props.fetchPost()
  }

  handleLike() {
    if (this.state.isClick) {
      this.setState({isClick: false})
    } else {
      this.setState({isClick: true})
    }
  }

  handleDislike() {
    if (this.state.isDislike) {
      this.setState({isDislike: false})
    } else {
      this.setState({isDislike: true})
    }
  }

  handleFormOpen() {
    if (this.state.commentForm) {
      this.setState({commentForm: false})
    } else {
      this.setState({commentForm: true})
    }
  }

  render() {
    const isClick = this.state.isClick
    const isDislike = this.state.isDislike
    const post = this.props.post
    const likeClass = isClick ? 'likes-number-active' : 'likes-number-unactive'
    return (
      <div className="page-container">
        <div className="single-post-view-container">
          <div key={post.id} className="single-post-view">
            <div className="single-post-flex">
              <div>
                <UserPFP post={post} />
              </div>
              <div className="post-header">
                <div className="post-info">
                  <UserInformation post={post} />
                  <div className="description-container">
                    <p className="post-text">{post.description}</p>
                  </div>
                </div>

                <PostingPictures
                  className="post-photos"
                  post={post}
                  deleteTag={this.props.deleteTag}
                  fetchPost={this.props.fetchPost}
                />
                {this.props.isLoggedIn && (
                  <div className="commentsAndShares">
                    <img
                      src="https://img.icons8.com/all/500/comments.png"
                      className="commentIcon"
                      type="button"
                      onClick={() => this.handleFormOpen()}
                    />
                    <AddCommentSingle
                      show={this.state.commentForm}
                      onHide={() => this.handleFormOpen()}
                      postId={post.id}
                      addComment={this.props.addComment}
                      closeForm={this.handleFormOpen}
                    />

                    <div className="likes">
                      {post.likes >= 1 && (
                        <p className={likeClass}>{post.likes}</p>
                      )}
                      {isClick ? (
                        <Heart
                          className="likeIcon"
                          isClick={isClick}
                          onClick={() => {
                            this.handleLike()
                            this.props.unlikePost()
                          }}
                        />
                      ) : (
                        <Heart
                          className="likeIcon"
                          isClick={isClick}
                          onClick={() => {
                            this.handleLike()
                            this.props.likePost()
                          }}
                        />
                      )}
                    </div>
                    <div className="dislikes">
                      {post.dislikes >= 1 && (
                        <p className="dislikes-number">{post.dislikes}</p>
                      )}
                      {isDislike ? (
                        <img
                          src="https://image.flaticon.com/icons/svg/2107/2107616.svg"
                          className="dislikeIcon"
                          type="button"
                          onClick={() => {
                            this.props.undislikePost()
                            this.handleDislike()
                          }}
                        />
                      ) : (
                        <img
                          src="https://image.flaticon.com/icons/svg/2107/2107616.svg"
                          className="dislikeIcon"
                          type="button"
                          onClick={() => {
                            this.props.dislikePost()
                            this.handleDislike()
                          }}
                        />
                      )}
                    </div>
                  </div>
                )}
                <ImageRec
                  post={post}
                  deleteTag={this.props.deleteTag}
                  fetchPost={this.props.fetchPost}
                  isLoggedIn={this.props.isLoggedIn}
                  loggedInUser={this.props.loggedInUser}
                />
                <div className="single-post-feedback" />
                <div className="single-post-break" />
                {post !== undefined &&
                post.postComments !== undefined &&
                post.postComments.length ? (
                  <div className="replies">Replies</div>
                ) : (
                  <div className="replies"> No Replies</div>
                )}
              </div>
            </div>
            <PostCommentSingle
              post={post}
              openComments={true}
              isLoggedIn={this.props.isLoggedIn}
              loggedInUser={this.props.loggedInUser}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    post: state.singlePost,
    isLoggedIn: !!state.user.id,
    loggedInUser: state.user.username
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const postId = ownProps.match.params.postId
  return {
    fetchPost: () => dispatch(fetchSinglePost(postId)),
    deleteTag: tagId => dispatch(deleteTagThunk(tagId)),
    likePost: () => dispatch(likedPost(postId)),
    unlikePost: () => dispatch(unlikedPost(postId)),
    addComment: comment => dispatch(addCommentThunk(postId, comment)),
    dislikePost: () => dispatch(dislikedPost(postId)),
    undislikePost: () => dispatch(undislikedPost(postId))
  }
}

export default connect(mapState, mapDispatch)(SinglePostView)
