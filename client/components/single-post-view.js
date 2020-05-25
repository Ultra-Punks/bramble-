/* eslint-disable complexity */
import React, {useState} from 'react'
import {connect} from 'react-redux'
import {fetchSinglePost, deleteTagThunk} from '../store/singlePost'
import {PostComment, FullPicture} from './index'
import {Image} from 'react-bootstrap'
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
                    <p
                      className="individual-labels-delete"
                      onClick={() => {
                        props.deleteTag(tag.id)
                        props.fetchPost()
                      }}
                    >
                      x
                    </p>
                    <p className="individual-labels">{tag.imageTag}</p>
                  </div>
                )
              })
            : ''}
        </div>
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
  componentDidMount() {
    this.props.fetchPost()
  }

  render() {
    const post = this.props.post
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
            <PostComment post={post} openComments={true} />
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    post: state.singlePost
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const postId = ownProps.match.params.postId
  return {
    fetchPost: () => dispatch(fetchSinglePost(postId)),
    deleteTag: tagId => dispatch(deleteTagThunk(tagId))
  }
}

export default connect(mapState, mapDispatch)(SinglePostView)
