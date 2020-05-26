import React from 'react'
import {connect} from 'react-redux'
import {
  likeCommentThunkFeed,
  dislikeCommentThunkFeed,
  deleteCommentThunkFeed,
  unlikeCommentThunkFeed,
  undislikeCommentThunkFeed,
  fetchFollowingPosts
} from '../store/generalUserFeed'
import {PostCommentInfo} from './index'

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

const mapDispatch = (dispatch, ownProps) => {
  return {
    likeComment: (commentId, postId) => {
      dispatch(likeCommentThunkFeed(commentId, postId))
      dispatch(fetchFollowingPosts(ownProps.loggedInUser))
    },
    unlikeComment: (commentId, postId) => {
      dispatch(unlikeCommentThunkFeed(commentId, postId))
      dispatch(fetchFollowingPosts(ownProps.loggedInUser))
    },
    dislikeComment: (commentId, postId) => {
      dispatch(dislikeCommentThunkFeed(commentId, postId))
      dispatch(fetchFollowingPosts(ownProps.loggedInUser))
    },
    deleteComment: (commentId, postId) =>
      dispatch(deleteCommentThunkFeed(commentId, postId)),
    undislikeComment: (commentId, postId) => {
      dispatch(undislikeCommentThunkFeed(commentId, postId))
      dispatch(fetchFollowingPosts(ownProps.loggedInUser))
    }
  }
}

export default connect(null, mapDispatch)(FeedPostComment)
