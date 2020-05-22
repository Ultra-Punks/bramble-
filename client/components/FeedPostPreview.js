/* eslint-disable complexity */
import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {Image, Button} from 'react-bootstrap'
import TimeAgo from 'react-timeago'
import {FullPicture, FeedPostComment} from './index'
import AddCommentFormFeed from './AddCommentFormFeed'
import ReactPlayer from 'react-player'
import Heart from 'react-animated-heart'
import history from '../history'
import {
  likeUserPostThunk,
  dislikeUserPostThunk,
  deletePostThunk
} from '../store/generalUserFeed'
import {connect} from 'react-redux'

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

function FeedPostPreview(props) {
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

  const {post} = props

  return (
    <div className="single-post-preview-container">
      {post.communityId ? (
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
        <div className="pfp-col">
          <Image
            className="post-pfp"
            src={post.user.profileImg}
            roundedCircle
          />
        </div>
        <div className="post-header">
          <div>
            <div className="post-info">
              <div className="post-handle">
                <p className="handle-text">{post.user.name}</p>
                <p className="handle-text">@{post.user.username}</p>
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
            <div className="commentRepliesContainer">
              <img
                src="https://img.icons8.com/all/500/comments.png"
                className="commentIcon"
                type="button"
                onClick={() => setCommentForm(true)}
              />
              <AddCommentFormFeed
                show={commentForm}
                onHide={() => setCommentForm(false)}
                postId={post.id}
              />
              {post.postComments !== undefined && post.postComments.length ? (
                <p
                  className="seeReplies"
                  type="button"
                  onClick={handleComments}
                >
                  {post.postComments.length > 1
                    ? `See ${post.postComments.length} replies`
                    : 'See 1 reply'}
                </p>
              ) : (
                <p className="seeReplies">0 replies</p>
              )}
            </div>
            <div className="likes">
              {post.likes >= 1 && (
                <div style={{paddingLeft: '13px', marginBottom: '-25px'}}>
                  {post.likes}
                </div>
              )}
              {isClick ? (
                <Heart
                  className="likeIcon"
                  isClick={isClick}
                  onClick={() => {
                    setClick(false)
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
                <div style={{paddingLeft: '13px', marginBottom: '-25px'}}>
                  {post.dislikes}
                </div>
              )}
              <img
                src="https://img.icons8.com/windows/80/000000/dislike.png"
                className="dislikeIcon"
                type="button"
                onClick={() => props.dislikePost(post.id)}
              />
            </div>
            {post.user.username === props.loggedInUser ? (
              <Button
                className="delete-button"
                variant="danger"
                onClick={() => props.deletePost(post.id)}
              >
                X
              </Button>
            ) : (
              ''
            )}
          </div>
          <FeedPostComment
            post={post}
            openComments={openComments}
            postId={post.id}
            loggedInUser={props.loggedInUser}
          />
        </div>
      </div>
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    likePost: postId => dispatch(likeUserPostThunk(postId)),
    dislikePost: postId => dispatch(dislikeUserPostThunk(postId)),
    deletePost: postId => dispatch(deletePostThunk(postId))
  }
}

export default connect(null, mapDispatch)(FeedPostPreview)
