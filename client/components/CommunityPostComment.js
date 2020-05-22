import React, {useState} from 'react'
import {Image, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Heart from 'react-animated-heart'
import {
  likeCommunityCommentThunk,
  dislikeCommunityCommentThunk,
  deleteCommunityCommentThunk,
  unlikeCommunityCommentThunk
} from '../store/userFeed'
import {connect} from 'react-redux'
import styled from 'styled-components'

// NOTE: Icons only placeholders. Found them on this site: https://icons8.com/icons/set/like-heart
const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2%;
`

function PostComments(props) {
  const [isClick, setClick] = useState(false)

  const {post, openComments} = props
  if (
    post.user !== undefined &&
    post.user !== undefined &&
    post.postComments.length &&
    openComments
  ) {
    return (
      <div className="commentPreviewContainer">
        {post.postComments.map(comment => (
          <div key={comment.user.id} className="singleCommentPreview">
            <CommentHeader>
              <Image
                className="post-pfp"
                src={comment.user.profileImg}
                roundedCircle
              />
              {/* <div className="post-handle"> */}
              <Link to={`/u/${comment.user.username}`}>
                <p className="handle-text">{comment.user.name}</p>
              </Link>
              <Link to={`/u/${comment.user.username}`}>
                <p className="handle-text">@{comment.user.username}</p>
              </Link>
              {/* </div> */}
            </CommentHeader>
            <Link to={`/comments/${comment.id}`}>{comment.comment}</Link>
            <div className="commentShareBar">
              <div>
                {comment.likes >= 1 && (
                  <div style={{paddingLeft: '13px', marginBottom: '-25px'}}>
                    {comment.likes}
                  </div>
                )}
                {isClick ? (
                  <Heart
                    className="likeIcon"
                    isClick={isClick}
                    onClick={() => {
                      setClick(false)
                      props.unlikeComment(comment.id, post.id)
                    }}
                  />
                ) : (
                  <Heart
                    className="likeIcon"
                    isClick={isClick}
                    onClick={() => {
                      setClick(true)
                      props.likeComment(comment.id, post.id)
                    }}
                  />
                )}
              </div>
              <div>
                {comment.dislikes >= 1 && (
                  <div style={{paddingLeft: '13px', marginBottom: '-25px'}}>
                    {comment.dislikes}
                  </div>
                )}
                <img
                  src="https://img.icons8.com/windows/80/000000/dislike.png"
                  className="dislikeIcon"
                  type="button"
                  onClick={() => props.dislikeComment(comment.id, post.id)}
                />
              </div>
              {comment.user.username === props.loggedInUser ? (
                <Button
                  className="delete-button"
                  variant="danger"
                  onClick={() => props.deleteComment(comment.id, post.id)}
                >
                  X
                </Button>
              ) : (
                ''
              )}
            </div>
          </div>
        ))}
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
