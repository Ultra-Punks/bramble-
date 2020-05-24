/* eslint-disable complexity */
import React, {useState} from 'react'
import PostComment from './PostComment'
import {Link} from 'react-router-dom'
import {FullPicture} from './index'
import {Image, Button} from 'react-bootstrap'
import TimeAgo from 'react-timeago'
import ReactPlayer from 'react-player'
import Heart from 'react-animated-heart'
import history from '../history'
import AddCommentForm from './AddCommentForm'
import {connect} from 'react-redux'
import {
  likePostThunk,
  removelikePostThunk,
  dislikePostThunk,
  deletePostThunk
} from '../store/userFeed'

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
  } else if (post.photos[0] !== undefined) {
    return (
      <div>
        <img
          src={post.photos[0].imgFile}
          className="post-images"
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

function PostPreview(props) {
  const [openComments, setOpenComment] = useState(false)
  const [commentForm, setCommentForm] = useState(false)
  const [isClick, setClick] = useState(false)

  function handleComments() {
    if (openComments) {
      setOpenComment(false)
    } else {
      setOpenComment(true)
    }
  }

  const {post, profile} = props
  const likeClass = isClick ? 'likes-number-active' : 'likes-number-unactive'
  return (
    <div className="single-post-preview-container">
      {post.communityId &&
      post.community &&
      post.community.name !== undefined ? (
        <Link
          className="link-to-community"
          to={`/community/list/${post.communityId}`}
        >
          <div className="community-post-label">{post.community.name}</div>
        </Link>
      ) : (
        ''
      )}
      <div key={post.id} className="single-post">
        <div className="inner-single-post">
          <div className="pfp-col">
            <Image
              className="post-pfp"
              src={profile.profileImg}
              roundedCircle
              onClick={() => history.push(`/u/${profile.username}`)}
            />
          </div>
          <div className="post-header">
            <div>
              <div className="post-info">
                <div className="post-handle">
                  <div className="post-info-inner">
                    <p
                      className="handle-text"
                      onClick={() => history.push(`/u/${profile.username}`)}
                    >
                      {profile.name}
                    </p>
                    <p
                      className="handle-text"
                      onClick={() => history.push(`/u/${profile.username}`)}
                    >
                      @{profile.username}
                    </p>
                  </div>
                  {profile.username === props.loggedInUser ? (
                    <Button
                      className="delete-button"
                      variant="secondary"
                      onClick={() => props.deletePost(post.id)}
                    >
                      X
                    </Button>
                  ) : (
                    ''
                  )}
                </div>
                <div className="post-feed-preview-info">
                  <Link className="link-to-post" to={`/p/${post.id}`}>
                    <TimeAgo
                      className="time-ago"
                      date={post.createdAt}
                      live={false}
                    />
                    <p className="post-text">{post.description}</p>
                  </Link>
                </div>
              </div>
            </div>

            <div className="post-photos">
              <PostingPictures post={post} />
            </div>
            <div className="commentsAndShares">
              <img
                src="https://img.icons8.com/all/500/comments.png"
                className="commentIcon"
                type="button"
                onClick={() => setCommentForm(true)}
              />
              <AddCommentForm
                show={commentForm}
                onHide={() => setCommentForm(false)}
                postId={post.id}
              />

              <div className="likes">
                {post.likes >= 1 && <p className={likeClass}>{post.likes}</p>}
                {isClick ? (
                  <Heart
                    className="likeIcon"
                    isClick={isClick}
                    onClick={() => {
                      setClick(false)
                      props.unlikePost(post.id)
                    }}
                  />
                ) : (
                  <Heart
                    className="likeIcon"
                    isClick={isClick}
                    onClick={() => {
                      setClick(true)
                      props.likePost(post.id)
                    }}
                  />
                )}
              </div>
              <div className="dislikes">
                {post.dislikes >= 1 && (
                  <p className="dislikes-number">{post.dislikes}</p>
                )}
                <img
                  src="https://image.flaticon.com/icons/svg/2107/2107616.svg"
                  className="dislikeIcon"
                  type="button"
                  onClick={() => props.dislikePost(post.id)}
                />
              </div>
            </div>

            {post.postComments !== undefined && post.postComments.length ? (
              <div className="see-replies-container" onClick={handleComments}>
                <p className="seeReplies" type="button">
                  {post.postComments.length > 1
                    ? `${post.postComments.length} replies`
                    : '1 reply'}
                </p>
                <img
                  className="replies-button"
                  src="https://image.flaticon.com/icons/svg/271/271210.svg"
                />
              </div>
            ) : (
              <div className="see-replies-container">
                <p className="seeReplies">0 replies</p>
              </div>
            )}
          </div>
        </div>
        <PostComment
          post={post}
          openComments={openComments}
          postId={post.id}
          loggedInUser={props.loggedInUser}
        />
      </div>
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    likePost: postId => dispatch(likePostThunk(postId)),
    unlikePost: postId => dispatch(removelikePostThunk(postId)),
    dislikePost: postId => dispatch(dislikePostThunk(postId)),
    deletePost: postId => dispatch(deletePostThunk(postId))
  }
}

export default connect(null, mapDispatch)(PostPreview)
