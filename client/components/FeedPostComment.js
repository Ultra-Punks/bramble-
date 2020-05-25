import React from 'react'
import {PostCommentInfo} from './index'
import {connect} from 'react-redux'
import {
  likeCommentThunk,
  dislikeCommentThunk,
  deleteCommentThunk,
  unlikeCommentThunk
} from '../store/generalUserFeed'

// NOTE: Icons only placeholders. Found them on this site: https://icons8.com/icons/set/like-heart

function FeedPostComment(props) {
  const {post, openComments, loggedInUser} = props

  if (
    post !== undefined &&
    post.postComments !== undefined &&
    post.postComments.length &&
    openComments
  ) {
    const postComments = post.postComments
    return (
      <div className="commentPreviewContainer">
        {postComments.map(comment => {
          return (
            <PostCommentInfo
              key={comment.id}
              comment={comment}
              postId={post.id}
              likeComment={props.likeComment}
              unlikeComment={props.unlikeComment}
              dislikeComment={props.dislikeComment}
              deleteComment={props.deleteComment}
              loggedInUser={loggedInUser}
              isLoggedIn={props.isLoggedIn}
            />
          )
        })}
      </div>
    )
  } else {
    return <div />
  }
}

const mapDispatch = dispatch => {
  return {
    likeComment: (commentId, postId) =>
      dispatch(likeCommentThunk(commentId, postId)),
    unlikeComment: (commentId, postId) =>
      dispatch(unlikeCommentThunk(commentId, postId)),
    dislikeComment: (commentId, postId) =>
      dispatch(dislikeCommentThunk(commentId, postId)),
    deleteComment: (commentId, postId) =>
      dispatch(deleteCommentThunk(commentId, postId))
  }
}

export default connect(null, mapDispatch)(FeedPostComment)
