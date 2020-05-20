import React, {useState} from 'react'
import CommunityPostComment from './CommunityPostComment'
import {Link} from 'react-router-dom'
import {Image} from 'react-bootstrap'
import TimeAgo from 'react-timeago'

function PostingPictures(props) {
  const {post} = props
  if (post.photos && post.photos[0] !== undefined) {
    return <img src={post.photos[0].imgFile} className="post-images" />
  } else {
    return <div />
  }
}

export default function PostPreview(props) {
  const [openComments, setOpenComment] = useState(false)

  function handleComments() {
    if (openComments) {
      setOpenComment(false)
    } else {
      setOpenComment(true)
    }
  }

  const user = props.post.user

  const post = props.post

  return (
    <div className="single-post-preview-container">
      <div key={post.id} className="single-post">
        <div className="pfp-col">
          <Image className="post-pfp" src={user.profileImg} roundedCircle />
        </div>
        <div className="post-header">
          <div className="post-info">
            <div className="post-handle">
              <p className="handle-text">{user.name}</p>
              <p className="handle-text">@{user.username}</p>
            </div>
            <TimeAgo className="time-ago" date={post.createdAt} live={false} />
            <Link to={`/p/${post.id}`}>
              <p className="post-text">{post.description}</p>
            </Link>
            <div />
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
              <img
                src="https://img.icons8.com/ios/64/000000/like.png"
                className="likeIcon"
                type="button"
              />
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
                // onClick={() => this.dislikeComment()}
              />
            </div>
          </div>
          <br />
          <CommunityPostComment post={post} openComments={openComments} />
        </div>
      </div>
    </div>
  )
}
