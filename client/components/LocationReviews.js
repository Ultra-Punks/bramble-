import React from 'react'
import {Image} from 'react-bootstrap'
import history from '../history'

// NOTE: Icons only placeholders. Found them on this site: https://icons8.com/icons/set/like-heart
function getStars(rating) {
  const numOfStars = Array(rating).fill('')
  return (
    <div className="stars">
      {/* <p>Rating:</p> */}
      {numOfStars.map((e, i) => (
        <img
          key={i}
          src="https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-star-icon-png-image_4013709.jpg"
        />
      ))}
    </div>
  )
}
export default function LocationReviews(props) {
  const {location} = props
  let numOfStars
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
          <div key={review.id} className="singleCommentPreview location-review">
            <div>
              {review.user &&
                review.user.profileImg && (
                  <div className="location-review-container">
                    <div>
                      <Image
                        onClick={() =>
                          history.push(`/u/${review.user.username}`)
                        }
                        className="post-pfp"
                        src={review.user.profileImg}
                        roundedCircle
                      />
                    </div>
                    <div>
                      <div className="post-handle">
                        <p
                          onClick={() =>
                            history.push(`/u/${review.user.username}`)
                          }
                          className="handle-text"
                        >
                          {review.user.name}
                        </p>

                        <p
                          onClick={() =>
                            history.push(`/u/${review.user.username}`)
                          }
                          className="handle-text"
                        >
                          @{review.user.username}
                        </p>
                      </div>
                      {getStars(review.ratings)}
                      <p className="location-review-text">{review.comments}</p>
                    </div>
                  </div>
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
