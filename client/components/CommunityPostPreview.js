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

  const posts = props.post.user

  const post = props.post

  return (
    <div key={posts.id} className="single-post">
      <div className="post-header">
        <Image className="post-pfp" src={posts.profileImg} roundedCircle />
        <div className="post-info">
          <div className="post-handle">
            <p className="handle-text">{posts.name}</p>
            <p className="handle-text">@{posts.username}</p>
          </div>
          <TimeAgo
            className="time-ago"
            date={posts.postComments.createdAt}
            live={false}
          />
          <Link to={`/p/${posts.postComments.id}`}>
            <p className="post-text">{posts.description}</p>
          </Link>
        </div>
      </div>

      <div className="post-photos">
        <PostingPictures post={posts} />
      </div>
      <div className="commentsAndShares">
        <div className="commentRepliesContainer">
          <img
            src="https://img.icons8.com/all/500/comments.png"
            className="commentIcon"
            type="button"
          />
          {posts.postComments !== undefined && posts.postComments.length ? (
            <p className="seeReplies" type="button" onClick={handleComments}>
              {posts.postComments.length > 1
                ? `See ${posts.postComments.length} replies`
                : 'See 1 reply'}
            </p>
          ) : (
            <p className="seeReplies">0 replies</p>
          )}
        </div>
        <div className="likes">
          {posts.postComments.likes >= 1 && (
            <div style={{paddingLeft: '13px', marginBottom: '-25px'}}>
              {posts.postComments.likes}
            </div>
          )}
          <img
            src="https://img.icons8.com/ios/64/000000/like.png"
            className="likeIcon"
            type="button"
          />
        </div>
        <div className="dislikes">
          {posts.postComments.dislikes >= 1 && (
            <div style={{paddingLeft: '13px', marginBottom: '-25px'}}>
              {posts.postComments.dislikes}
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
  )
}
