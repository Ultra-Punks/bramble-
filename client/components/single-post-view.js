import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchSinglePost} from '../store/singlePost'
import {Image} from 'react-bootstrap'

function PostingPictures(props) {
  const {post} = props
  if (post !== undefined && post.photos !== undefined && post.photos.length) {
    return (
      <div className="img-container">
        <img src={post.photos[0].imgFile} className="single-post-view-img" />
      </div>
    )
  } else {
    return <div />
  }
}

function ImageRec(props) {
  const {post} = props

  if (
    post !== undefined &&
    post.photos !== undefined &&
    post.photos.length > 0
  ) {
    return (
      <div className="image-rec-container">
        {post.photos[0].tags.map(tag => {
          return <p key={tag.id}>{tag.imageTag}</p>
        })}
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
      <Image className="post-pfp" src={post.user.profileImg} roundedCircle />
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
        <Link to={`/u/${user.username}`}>
          <p className="handle-text">{user.name}</p>
          <p className="handle-text">@{user.username}</p>
        </Link>
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
          <div key={post.id} className="single-post">
            <div className="post-header">
              <UserPFP post={post} />
              <div className="post-info">
                <UserInformation post={post} />
                <div className="description-container">
                  <p className="post-text">{post.description}</p>
                </div>
              </div>
            </div>
            <PostingPictures className="post-photos" post={post} />
            <div className="single-post-feedback">
              <img
                className="reply-comment-button"
                src="https://cdn4.iconfinder.com/data/icons/pictype-free-vector-icons/16/reply-512.png"
              />
              <p>Reply</p>
            </div>
          </div>
        </div>
        <div className="rec-container">
          <ImageRec post={post} />
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
    fetchPost: () => dispatch(fetchSinglePost(postId))
  }
}

export default connect(mapState, mapDispatch)(SinglePostView)
