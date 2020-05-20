import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchSinglePost} from '../store/singlePost'
import {PostComment, FullPicture} from './index'
import {Image} from 'react-bootstrap'

function PostingPictures(props) {
  const {post} = props
  const [showPicture, setShowPicture] = useState(false)
  if (post !== undefined && post.photos !== undefined && post.photos.length) {
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
  const {post} = props

  if (
    post !== undefined &&
    post.photos !== undefined &&
    post.photos.length > 0
  ) {
    return (
      <div className="label-container">
        <div className="label-container-header">Labels</div>
        <div className="image-rec-container">
          {post.photos[0].tags.map(tag => {
            return (
              <div className="individual-labels" key={tag.id}>
                {tag.imageTag}
              </div>
            )
          })}
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

              <PostingPictures className="post-photos" post={post} />
              <div className="single-post-feedback" />
              <div className="single-post-break" />
              {post !== undefined &&
              post.postComments !== undefined &&
              post.postComments.length ? (
                <div className="replies">Replies</div>
              ) : (
                <div className="replies"> No Replies</div>
              )}

              <PostComment post={post} openComments={true} />
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
