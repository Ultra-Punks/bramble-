import React, {useState} from 'react'
import {Image, Button} from 'react-bootstrap'
import Heart from 'react-animated-heart'
import {Link} from 'react-router-dom'
import TimeAgo from 'react-timeago'
import history from '../history'

// NOTE: Icons only placeholders. Found them on this site: https://icons8.com/icons/set/like-heart

export default function PostCommentInfo(props) {
  const {
    comment,
    postId,
    likeComment,
    unlikeComment,
    dislikeComment,
    deleteComment,
    loggedInUser,
    undislikeComment
  } = props
  const [isClick, setClick] = useState(false)
  const [isDislike, setDislike] = useState(false)

  const likeClass = isClick ? 'likes-number-active' : 'likes-number-unactive'
  return (
    <div key={comment.id} className="singleCommentPreview">
      <div className="pfp-col">
        <Image
          className="post-pfp"
          src={comment.user.profileImg}
          roundedCircle
          onClick={() => history.push(`/u/${comment.user.username}`)}
        />
      </div>
      <div className="post-header">
        <div className="post-handle">
          <div className="post-info-inner">
            <p
              className="handle-text"
              onClick={() => history.push(`/u/${comment.user.username}`)}
            >
              {comment.user.name}
            </p>
            <p
              className="handle-text"
              onClick={() => history.push(`/u/${comment.user.username}`)}
            >
              @{comment.user.username}
            </p>
          </div>
          {comment.user.username === loggedInUser ? (
            <Button
              className="delete-button"
              variant="secondary"
              onClick={() => deleteComment(comment.id, postId)}
            >
              X
            </Button>
          ) : (
            ''
          )}
        </div>
        <div className="post-feed-preview-info">
          {/* <Link className="link-to-post" to={`/comments/${comment.id}`}> */}
          <TimeAgo className="time-ago" date={comment.createdAt} live={false} />
          <p className="post-text">{comment.comment}</p>
          {/* </Link> */}
        </div>
        {props.isLoggedIn ? (
          <div className="commentsAndShares">
            <div className="likes">
              {comment.likes >= 1 && (
                <p className={likeClass}>{comment.likes}</p>
              )}
              {isClick ? (
                <Heart
                  className="likeIcon"
                  isClick={isClick}
                  onClick={() => {
                    setClick(false)
                    unlikeComment(comment.id, postId)
                  }}
                />
              ) : (
                <Heart
                  className="likeIcon"
                  isClick={isClick}
                  onClick={() => {
                    setClick(true)
                    likeComment(comment.id, postId)
                  }}
                />
              )}
            </div>
            <div>
              {comment.dislikes >= 1 && (
                <p className="dislikes-number">{comment.dislikes}</p>
              )}
              {isDislike ? (
                <img
                  src="https://image.flaticon.com/icons/svg/2107/2107616.svg"
                  className="dislikeIcon"
                  type="button"
                  onClick={() => {
                    undislikeComment(comment.id, postId)
                    setDislike(false)
                  }}
                />
              ) : (
                <img
                  src="https://image.flaticon.com/icons/svg/2107/2107616.svg"
                  className="dislikeIcon"
                  type="button"
                  onClick={() => {
                    dislikeComment(comment.id, postId)
                    setDislike(true)
                  }}
                />
              )}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
