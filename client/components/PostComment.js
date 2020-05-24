import React from 'react'
import {connect} from 'react-redux'
import {
  likeProfileCommentThunk,
  unlikeProfileCommentThunk,
  dislikeProfileCommentThunk,
  deleteCommentThunk
} from '../store/userFeed'
import {PostCommentInfo} from './index'

function PostComments(props) {
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
      dispatch(likeProfileCommentThunk(commentId, postId)),
    unlikeComment: (commentId, postId) =>
      dispatch(unlikeProfileCommentThunk(commentId, postId)),
    dislikeComment: (commentId, postId) =>
      dispatch(dislikeProfileCommentThunk(commentId, postId)),
    deleteComment: (commentId, postId) =>
      dispatch(deleteCommentThunk(commentId, postId))
  }
}

export default connect(null, mapDispatch)(PostComments)
