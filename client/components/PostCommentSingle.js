import React from 'react'
import {connect} from 'react-redux'
import {
  likeComment,
  unlikeComment,
  dislikeComment,
  undislikeComment,
  deleteCommentSingleThunk
} from '../store/singlePost'
import {PostCommentInfo} from './index'

function PostCommentSingle(props) {
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
              undislikeComment={props.undislikeComment}
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
      dispatch(likeComment(commentId, postId)),
    unlikeComment: (commentId, postId) =>
      dispatch(unlikeComment(commentId, postId)),
    dislikeComment: (commentId, postId) =>
      dispatch(dislikeComment(commentId, postId)),
    undislikeComment: (commentId, postId) =>
      dispatch(undislikeComment(commentId, postId)),
    deleteComment: commentId => dispatch(deleteCommentSingleThunk(commentId))
  }
}

export default connect(null, mapDispatch)(PostCommentSingle)
