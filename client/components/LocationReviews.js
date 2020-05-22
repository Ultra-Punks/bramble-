import React, {Component} from 'react'
import {Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'

// NOTE: Icons only placeholders. Found them on this site: https://icons8.com/icons/set/like-heart

export default function LocationReviews(props) {
  const {location} = props
  if (
    location !== undefined &&
    location.locationReviews !== undefined &&
    location.locationReviews.length &&
    location.user !== undefined //&&
    // location.user.profileImg !== undefined
  ) {
    const locationReviews = location.locationReviews
    return (
      <div className="commentPreviewContainer">
        {locationReviews.map(review => (
          <div key={review.id} className="singleCommentPreview">
            <div>
              {review.user &&
                review.user.profileImg && (
                  <div>
                    <Image
                      className="post-pfp"
                      src={review.user.profileImg}
                      roundedCircle
                    />
                    <div className="post-handle">
                      <Link to={`/u/${review.user.username}`}>
                        <p className="handle-text">{review.user.name}</p>
                      </Link>
                      <Link to={`/u/${review.user.username}`}>
                        <p className="handle-text">@{review.user.username}</p>
                      </Link>
                    </div>
                  </div>
                )}
            </div>
            <p>{review.ratings}</p>
            <p>{review.comments}</p>
          </div>
        ))}
      </div>
    )
  } else {
    return <div />
  }
}
