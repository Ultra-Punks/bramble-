import React, {Component} from 'react'
import {Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'

// NOTE: Icons only placeholders. Found them on this site: https://icons8.com/icons/set/like-heart

export default function LocationReviews(props) {
  const {post} = props
  if (
    post !== undefined &&
    post.locationReviews !== undefined &&
    post.locationReviews.length
  ) {
    const locationReviews = post.locationReviews
    return (
      <div className="commentPreviewContainer">
        {locationReviews.map(comment => (
          <div key={comment.id} className="singleCommentPreview">
            <div>
              <Image
                className="post-pfp"
                src={comment.user.profileImg}
                roundedCircle
              />
              <div className="post-handle">
                <Link to={`/u/${comment.user.username}`}>
                  <p className="handle-text">{comment.user.name}</p>
                </Link>
                <Link to={`/u/${comment.user.username}`}>
                  <p className="handle-text">@{comment.user.username}</p>
                </Link>
              </div>
            </div>
            <p>{comment.ratings}</p>
            <p>{comment.comments}</p>
          </div>
        ))}
      </div>
    )
  } else {
    return <div />
  }
}
