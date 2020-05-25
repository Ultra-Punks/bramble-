import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {PostCommentInfo} from './index'
import {
  likeCommunityCommentThunk,
  dislikeCommunityCommentThunk,
  deleteCommunityCommentThunk,
  unlikeCommunityCommentThunk
} from '../store/userFeed'

// NOTE: Icons only placeholders. Found them on this site: https://icons8.com/icons/set/like-heart

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
      dispatch(likeCommunityCommentThunk(commentId, postId)),
    unlikeComment: (commentId, postId) =>
      dispatch(unlikeCommunityCommentThunk(commentId, postId)),
    dislikeComment: (commentId, postId) =>
      dispatch(dislikeCommunityCommentThunk(commentId, postId)),
    deleteComment: (commentId, postId) =>
      dispatch(deleteCommunityCommentThunk(commentId, postId))
  }
}

export default connect(null, mapDispatch)(PostComments)
